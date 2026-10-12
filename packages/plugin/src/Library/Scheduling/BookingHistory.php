<?php

namespace Solspace\Calendar\Library\Scheduling;

use craft\db\Query;
use craft\db\Table;
use craft\helpers\Db;
use craft\helpers\StringHelper;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Booking;
use Solspace\Calendar\Services\BookingsService;
use yii\web\ForbiddenHttpException;
use yii\web\NotFoundHttpException;

/** User-bound booking snapshots; replay uses ordinary saves and current availability rules. */
class BookingHistory
{
    private const TTL = 7200;

    public function __construct(private BookingsService $bookings) {}

    public function move(int $id, \DateTimeImmutable $start): ?string
    {
        return $this->locked($id, function (Booking $booking) use ($id, $start): ?string {
            $this->bookings->assertPermission($booking->getCalendar(), 'reschedule');
            $before = $this->snapshot($booking);
            $duration = $booking->endDate->getTimestamp() - $booking->startDate->getTimestamp();
            $booking->startDate = $start;
            $booking->endDate = $start->setTimestamp($start->getTimestamp() + $duration);
            if ($before === $this->snapshot($booking)) {
                return null;
            }
            $this->save($booking);
            $token = StringHelper::randomString(40);
            $this->retain($token, ['bookingId' => $id, 'before' => $before, 'after' => $this->snapshot($booking), 'direction' => 'undo']);

            return $token;
        });
    }

    public function replay(string $token, string $direction): void
    {
        $entry = \Craft::$app->getCache()->get($this->key($token));
        if (!\is_array($entry) || !\in_array($direction, ['undo', 'redo'], true)) {
            throw new \RuntimeException(Calendar::t('This change is no longer available. Reload the calendar to continue.'));
        }
        $this->locked($entry['bookingId'], function (Booking $booking) use ($token, $direction): void {
            $entry = \Craft::$app->getCache()->get($this->key($token));
            if (!\is_array($entry) || $entry['direction'] !== $direction) {
                throw new \RuntimeException(Calendar::t('This change is no longer available. Reload the calendar to continue.'));
            }
            $expected = 'undo' === $direction ? 'after' : 'before';
            $target = 'undo' === $direction ? 'before' : 'after';
            if ($this->snapshot($booking) !== $entry[$expected]) {
                throw new \RuntimeException(Calendar::t('This booking has changed since your last action. Reload the schedule to continue.'));
            }
            $action = ($entry['moderation'] ?? false) ? 'status' : 'reschedule';
            $this->bookings->assertPermission($booking->getCalendar(), $action);
            $moved = array_diff_assoc(array_intersect_key($entry[$target], array_flip(['calendarId', 'startDate', 'endDate'])), $entry[$expected]);
            if ($moved) {
                $this->bookings->assertPermission($booking->getCalendar(), 'reschedule');
            }
            // Preserve current contact details, notes, custom fields, and status attribution.
            $booking->calendarId = $entry[$target]['calendarId'];
            $booking->startDate = new \DateTimeImmutable($entry[$target]['startDate'], new \DateTimeZone('UTC'));
            $booking->endDate = new \DateTimeImmutable($entry[$target]['endDate'], new \DateTimeZone('UTC'));
            if ($entry['moderation'] ?? false) {
                $booking->bookingStatus = $entry[$target]['bookingStatus'];
            }
            $this->bookings->assertPermission($booking->getCalendar(), $action);
            if ($moved) {
                $this->bookings->assertPermission($booking->getCalendar(), 'reschedule');
            }
            $this->save($booking);
            $entry[$target] = $this->snapshot($booking);
            $entry['direction'] = 'undo' === $direction ? 'redo' : 'undo';
            $this->retain($token, $entry);
        });
    }

    /** Serialize moderation with native saves, rejecting stale decisions and times. */
    public function moderate(int $id, string $status, array $expected, ?\DateTimeImmutable $start = null, ?int $calendarId = null): string
    {
        if (!\in_array($status, [Booking::CONFIRMED, Booking::DECLINED], true)) {
            throw new \InvalidArgumentException();
        }

        return $this->locked($id, function (Booking $booking) use ($id, $status, $expected, $start, $calendarId): string {
            $this->bookings->assertPermission($booking->getCalendar(), 'status');
            $source = $booking->getCalendar();
            $before = $this->snapshot($booking);
            if (Booking::REQUESTED !== $booking->bookingStatus || array_diff_assoc($expected, $before)) {
                throw new \RuntimeException(Calendar::t('This request has changed. Reload the requests queue before reviewing it again.'));
            }
            if (Booking::CONFIRMED === $status && $calendarId !== null) {
                $booking->calendarId = $calendarId;
            }
            if ($start && Booking::CONFIRMED === $status) {
                $duration = $booking->endDate->getTimestamp() - $booking->startDate->getTimestamp();
                $booking->startDate = $start;
                $booking->endDate = $start->setTimestamp($start->getTimestamp() + $duration);
            }
            $booking->bookingStatus = $status;
            $this->bookings->assertPermission($booking->getCalendar(), 'status');
            if (array_diff_assoc(array_intersect_key($this->snapshot($booking), array_flip(['calendarId', 'startDate', 'endDate'])), $before)) {
                $this->bookings->assertPermission($source, 'reschedule');
                $this->bookings->assertPermission($booking->getCalendar(), 'reschedule');
            }
            $this->save($booking);
            $token = StringHelper::randomString(40);
            $this->retain($token, ['bookingId' => $id, 'before' => $before, 'after' => $this->snapshot($booking), 'direction' => 'undo', 'moderation' => true]);

            return $token;
        });
    }

    protected function booking(int $id): Booking
    {
        return Booking::find()->id($id)->status(null)->one() ?? throw new NotFoundHttpException();
    }

    private function snapshot(Booking $booking): array
    {
        return [
            'calendarId' => $booking->calendarId,
            'startDate' => Db::prepareDateForDb($booking->startDate),
            'endDate' => Db::prepareDateForDb($booking->endDate),
            'bookingStatus' => $booking->bookingStatus,
            'buffer' => $booking->buffer,
        ];
    }

    private function save(Booking $booking): void
    {
        if (!$this->bookings->save($booking)) {
            throw new \RuntimeException(implode(' ', $booking->getErrorSummary(true)) ?: Calendar::t('Could not move booking.'));
        }
    }

    private function retain(string $token, array $entry): void
    {
        if (!\Craft::$app->getCache()->set($this->key($token), $entry, self::TTL)) {
            throw new \RuntimeException(Calendar::t('Could not retain the booking change for Undo.'));
        }
    }

    private function key(string $token): string
    {
        return 'calendar:booking-history:'.\Craft::$app->getUser()->getId().':'.$token;
    }

    private function locked(int $id, callable $action): mixed
    {
        $transaction = \Craft::$app->getDb()->beginTransaction();

        try {
            $db = \Craft::$app->getDb();
            if (\in_array($db->getDriverName(), ['mysql', 'pgsql'], true)) {
                // Match native element saves: lock the element before the calendar/booking row.
                $command = (new Query())->select(['id'])->from(Table::ELEMENTS)->where(['id' => $id])->createCommand();
                $db->createCommand($command->getSql().' FOR UPDATE', $command->params)->queryOne();
            }
            $booking = $this->booking($id);
            if (!$this->bookings->can($booking->getCalendar(), 'view')) {
                throw new ForbiddenHttpException();
            }
            $result = $action($booking);
            $transaction->commit();

            return $result;
        } catch (\Throwable $exception) {
            $transaction->rollBack();

            throw $exception;
        }
    }
}
