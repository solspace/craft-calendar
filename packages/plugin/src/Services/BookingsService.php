<?php

namespace Solspace\Calendar\Services;

use craft\base\Component;
use craft\db\Query;
use craft\db\Table;
use craft\elements\User;
use craft\fields\Checkboxes;
use craft\fields\Dropdown;
use craft\fields\Number;
use craft\fields\PlainText;
use craft\fields\RadioButtons;
use craft\helpers\Db;
use craft\helpers\Json;
use craft\helpers\Queue;
use craft\helpers\StringHelper;
use craft\models\FieldLayout;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Booking;
use Solspace\Calendar\Jobs\SendBookingNotification;
use Solspace\Calendar\Library\Helpers\DateFormatHelper;
use Solspace\Calendar\Library\Scheduling\Availability;
use Solspace\Calendar\Library\Scheduling\BookingConflictException;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Calendar\Models\SchedulingSettings;
use Solspace\Calendar\Records\CalendarRecord;
use yii\db\Expression;

class BookingsService extends Component
{
    public function canManage(?CalendarModel $calendar, ?User $user = null): bool
    {
        $user ??= \Craft::$app->getUser()->getIdentity();

        return $calendar?->getIsScheduling() && $user && ($user->admin || $user->can(Calendar::PERMISSION_BOOKINGS) || $user->can(Calendar::PERMISSION_BOOKINGS_INDIVIDUAL.':'.$calendar->uid));
    }

    public function getManageableCalendars(): array
    {
        return array_filter(Calendar::getInstance()->calendars->getAllCalendars(), fn ($calendar) => $this->canManage($calendar));
    }

    public function getPublicCalendars(): array
    {
        $siteId = \Craft::$app->sites->getCurrentSite()->id;

        return array_filter(Calendar::getInstance()->calendars->getAllCalendars(), static function ($calendar) use ($siteId) {
            if (!$calendar->getIsScheduling() || !$calendar->getSiteSettingsForSite($siteId)) {
                return false;
            }
            $settings = $calendar->getSchedulingSettings();
            if (!$settings->active || !$settings->allowGuests || Availability::configurationErrors($settings->toArray())) {
                return false;
            }
            $today = (new \DateTimeImmutable('now', new \DateTimeZone($settings->timezone)))->format('Y-m-d');

            return !$settings->availableUntil || $settings->availableUntil >= $today;
        });
    }

    public function getFieldLayout(): FieldLayout
    {
        return \Craft::$app->getFields()->getLayoutByType(Booking::class) ?? new FieldLayout(['type' => Booking::class]);
    }

    public function getAvailablePublicFields(): array
    {
        $fields = [];
        foreach ($this->getFieldLayout()->getCustomFieldElements() as $element) {
            $field = $element->getField();
            if ($field instanceof PlainText || $field instanceof Number || $field instanceof Dropdown || $field instanceof RadioButtons || $field instanceof Checkboxes) {
                $fields[$element->uid] = $element;
            }
        }

        return $fields;
    }

    public function getPublicFields(): array
    {
        $uids = \Craft::$app->projectConfig->get('solspace.calendar.bookingPublicFields') ?? [];

        return array_intersect_key($this->getAvailablePublicFields(), array_fill_keys($uids, true));
    }

    public function getPublicFormFields(Booking $booking): array
    {
        $fields = [];
        foreach ($this->getPublicFields() as $element) {
            $field = $element->getField();
            $type = $field instanceof Number ? 'number' : ($field instanceof Checkboxes ? 'checkboxes' : (($field instanceof Dropdown || $field instanceof RadioButtons) ? 'select' : ($field->multiline ? 'textarea' : 'text')));
            $value = $booking->getFieldValue($field->handle);
            $options = [];
            $selected = [];
            if ($field instanceof Checkboxes) {
                foreach ($value?->getOptions() ?? [] as $option) {
                    if ($option->selected) {
                        $selected[] = (string) $option->value;
                    }
                }
            }
            if ($field instanceof Dropdown || $field instanceof RadioButtons || $field instanceof Checkboxes) {
                foreach ($field->options as $option) {
                    if (isset($option['value'])) {
                        $options[] = ['label' => $option['label'], 'value' => (string) $option['value']];
                    }
                }
            }
            $fields[] = ['handle' => $field->handle, 'label' => $element->label ?: $field->name, 'type' => $type, 'required' => $element->required, 'options' => $options, 'value' => 'checkboxes' === $type ? '' : (string) $value, 'selected' => $selected];
        }

        return $fields;
    }

    public function availableSlots(CalendarModel $calendar, string $date, bool $public = true, ?int $except = null, ?int $duration = null): array
    {
        if (!$calendar->getIsScheduling() || ($public && !isset($this->getPublicCalendars()[$calendar->id]))) {
            return [];
        }

        $settings = $calendar->getSchedulingSettings()->toArray();
        if (!$public && null !== $duration) {
            $settings['duration'] = $duration;
        }

        if (!Availability::slots($settings, $date, [], null, $public, true)) {
            return [];
        }

        $slots = Availability::slots($settings, $date, $this->busy($calendar->id, $public ? null : $except, false, $date, $settings['timezone']), null, $public);
        foreach ($slots as &$slot) {
            $slot['label'] = DateFormatHelper::formatTimeRange(new \DateTimeImmutable($slot['start']), new \DateTimeImmutable($slot['end']), $settings['timezone']);
        }
        unset($slot);

        return $slots;
    }

    public function nextAvailableSlot(CalendarModel $calendar, ?\DateTimeImmutable $now = null): ?array
    {
        if (!$calendar->getIsScheduling()) {
            return null;
        }
        $settings = $calendar->getSchedulingSettings();
        if (!$settings->active || Availability::configurationErrors($settings->toArray())) {
            return null;
        }
        $zone = new \DateTimeZone($settings->timezone);
        $now = ($now ?? new \DateTimeImmutable('now', $zone))->setTimezone($zone);
        $day = $now->setTime(0, 0);
        $lastDay = $day->modify('+'.$settings->maximumAdvance.' days');
        if ($settings->availableFrom) {
            $day = max($day, new \DateTimeImmutable($settings->availableFrom, $zone));
        }
        if ($settings->availableUntil) {
            $lastDay = min($lastDay, new \DateTimeImmutable($settings->availableUntil, $zone));
        }
        $loadedThrough = null;
        $busy = [];
        while ($day <= $lastDay) {
            $date = $day->format('Y-m-d');
            // Skip closed days without a database read or building every possible slot.
            if (Availability::slots($settings->toArray(), $date, [], $now, false, true, $now)) {
                if (!$loadedThrough || $day > $loadedThrough) {
                    $loadedThrough = min($day->modify('+30 days'), $lastDay);
                    $busy = $this->busy($calendar->id, null, false, $date, $settings->timezone, $loadedThrough->format('Y-m-d'));
                }
                $slots = Availability::slots($settings->toArray(), $date, $busy, $now, false, true, $now);
                if ($slots) {
                    $slot = $slots[0];
                    $slot['label'] = DateFormatHelper::formatTimeRange(new \DateTimeImmutable($slot['start']), new \DateTimeImmutable($slot['end']), $settings->timezone);

                    return $slot;
                }
            }
            $day = $day->modify('+1 day');
        }

        return null;
    }

    /** Every element save, including native saves, must pass this inside its transaction. */
    public function assertSaveAllowed(Booking $booking, bool $restoring = false): void
    {
        $db = \Craft::$app->getDb();
        // Serialize writers and read the current resource settings, including under
        // MySQL REPEATABLE READ, until Craft commits the element transaction.
        $command = (new Query())->select(['type', 'scheduling'])->from(CalendarRecord::TABLE)->where(['id' => $booking->calendarId])->createCommand();
        if (\in_array($db->getDriverName(), ['mysql', 'pgsql'], true)) {
            $command = $db->createCommand($command->getSql().' FOR UPDATE', $command->params);
        }
        $record = $command->queryOne();
        Calendar::getInstance()->calendars->clearCaches();
        if (!$record || CalendarModel::TYPE_SCHEDULING !== $record['type'] || !$booking->startDate || !$booking->endDate || $booking->endDate <= $booking->startDate) {
            throw new BookingConflictException(Calendar::t('Choose a scheduling calendar and valid booking times.'));
        }
        if (!\in_array($booking->bookingStatus, array_keys(Booking::statusOptions()), true)) {
            throw new BookingConflictException(Calendar::t('Choose a valid booking status.'));
        }
        $settings = (new SchedulingSettings(Json::decodeIfJson($record['scheduling']) ?: []))->toArray();
        $zone = new \DateTimeZone($settings['timezone']);
        $date = $booking->startDate->setTimezone($zone)->format('Y-m-d');
        $released = \in_array($booking->bookingStatus, [Booking::DECLINED, Booking::CANCELLED], true);
        if (!Availability::dateIsAvailable($settings, $date)) {
            // Permit unchanged bookings and cancellations without reopening a disabled resource.
            $previous = $booking->id ? (new Query())->select(['calendarId', 'startDate', 'endDate', 'bookingStatus'])->from(Booking::TABLE)->where(['id' => $booking->id])->one() : null;
            $current = array_intersect_key($booking->getRecordData(), array_flip(['calendarId', 'startDate', 'endDate', 'bookingStatus']));
            $comparison = $released ? array_intersect_key($current, array_flip(['calendarId', 'startDate', 'endDate'])) : $current;
            if (!$previous || array_diff_assoc($comparison, $previous) || (!$released && $restoring)) {
                throw new BookingConflictException(Calendar::t('This calendar is inactive or the booking falls outside its available dates.'));
            }
            $settings['active'] = true;
            $settings['availableFrom'] = $settings['availableUntil'] = null;
        }
        if ($released) {
            return;
        }
        $seconds = $booking->endDate->getTimestamp() - $booking->startDate->getTimestamp();
        if ($seconds % 60 || $seconds > 86400) {
            throw new BookingConflictException(Calendar::t('Bookings must use whole minutes and last no longer than one day.'));
        }
        $settings['duration'] = (int) ($seconds / 60);
        $booking->buffer = $settings['buffer'];
        $slots = Availability::slots($settings, $date, $this->busy($booking->calendarId, $booking->id, true, $date, $settings['timezone']), null, false);
        foreach ($slots as $slot) {
            if ((new \DateTimeImmutable($slot['start']))->getTimestamp() === $booking->startDate->getTimestamp()) {
                return;
            }
        }

        throw new BookingConflictException(Calendar::t('This time is unavailable. Check opening hours, exceptions, and existing bookings.'));
    }

    public function save(Booking $booking): bool
    {
        $oldId = $booking->id;

        try {
            if (!\Craft::$app->getElements()->saveElement($booking)) {
                return false;
            }
        } catch (BookingConflictException $exception) {
            // Craft rolled back the entire element save; a failed create must remain a create.
            $booking->id = $oldId;
            $booking->addError('startDate', $exception->getMessage());

            return false;
        }

        return true;
    }

    /** Called from the element lifecycle, including native Craft saves and restores. */
    public function scheduleNotification(Booking $booking, ?array $previous): void
    {
        $record = $booking->getRecordData();
        if ($previous && !array_diff_assoc(array_intersect_key($record, array_flip(['calendarId', 'startDate', 'endDate', 'bookingStatus'])), $previous)) {
            return;
        }
        // A persisted marker distinguishes committed changes from rolled-back savepoints.
        // Multiple changes within one transaction only notify about its final state.
        $token = StringHelper::randomString(40);
        Db::update(Booking::TABLE, ['notificationUid' => $token], ['id' => $booking->id]);
        $snapshot = clone $booking;
        \Craft::$app->getDb()->onAfterTransaction(function () use ($snapshot, $token): void {
            try {
                $persisted = (new Query())->from(Booking::TABLE)->where(['id' => $snapshot->id, 'notificationUid' => $token])
                    ->andWhere(['exists', (new Query())->select(new Expression('1'))->from(Table::ELEMENTS)->where(['id' => $snapshot->id, 'dateDeleted' => null])])->exists()
                ;
                if ($persisted) {
                    $this->notify($snapshot);
                }
            } catch (\Throwable $exception) {
                // A notification failure must not report a committed booking as a failed save.
                \Craft::error('Could not queue booking notification: '.$exception->getMessage(), __METHOD__);
            }
        });
    }

    protected function busy(int $calendarId, ?int $except = null, bool $lock = false, ?string $date = null, string $timezone = 'UTC', ?string $dateTo = null): array
    {
        $query = (new Query())->select(['b.startDate AS start', 'b.endDate AS end', 'b.buffer'])
            ->from(['b' => Booking::TABLE])
            ->where(['b.calendarId' => $calendarId, 'b.bookingStatus' => Booking::CONFIRMED])
            // Keep element rows out of the locking read: another native save may
            // already hold its element lock while waiting for the calendar lock.
            ->andWhere(['exists', (new Query())->select(new Expression('1'))->from(['e' => Table::ELEMENTS])->where('[[e.id]] = [[b.id]]')->andWhere(['e.dateDeleted' => null])])
        ;
        if ($date) {
            $day = new \DateTimeImmutable($date, new \DateTimeZone($timezone));
            $query->andWhere(['>=', 'b.startDate', Db::prepareDateForDb($day->modify('-2 days'))]);
            $lastDay = $dateTo ? new \DateTimeImmutable($dateTo, new \DateTimeZone($timezone)) : $day;
            $query->andWhere(['<', 'b.startDate', Db::prepareDateForDb($lastDay->modify('+2 days'))]);
        }
        if ($except) {
            $query->andWhere(['not', ['b.id' => $except]]);
        }
        $command = $query->createCommand();
        if ($lock && \in_array(\Craft::$app->db->getDriverName(), ['mysql', 'pgsql'], true)) {
            // A locking read sees the latest committed bookings even under MySQL REPEATABLE READ.
            $command = \Craft::$app->db->createCommand($command->getSql().' FOR UPDATE', $command->params);
        }

        return $command->queryAll();
    }

    private function notify(Booking $booking): void
    {
        $calendar = $booking->getCalendar();
        $settings = $calendar->getSchedulingSettings();
        $zone = new \DateTimeZone($settings->timezone);
        $status = Booking::statusOptions()[$booking->bookingStatus];
        $body = Calendar::t('Booking: {calendar}\nStatus: {status}\nName: {name}\nDate: {date}\nTime: {start}–{end}\nTimezone: {timezone}', [
            'calendar' => $calendar->name, 'status' => $status, 'name' => $booking->customerName,
            'date' => $booking->startDate->setTimezone($zone)->format('Y-m-d'),
            'start' => $booking->startDate->setTimezone($zone)->format('H:i'),
            'end' => $booking->endDate->setTimezone($zone)->format('H:i'), 'timezone' => $settings->timezone,
        ]);
        $body = str_replace('\n', "\n", $body);
        if (Booking::REQUESTED === $booking->bookingStatus) {
            $body .= "\n\n".Calendar::t('This is a booking request. Your time is reserved only after confirmation.');
        }
        $recipients = [$booking->customerEmail];
        if ($settings->notificationEmail) {
            $recipients[] = $settings->notificationEmail;
        }
        foreach (array_unique($recipients) as $recipient) {
            try {
                Queue::push(new SendBookingNotification([
                    'recipient' => $recipient, 'subject' => $calendar->name.' — '.$status, 'body' => $body,
                ]));
            } catch (\Throwable $exception) {
                \Craft::error('Could not queue booking notification: '.$exception->getMessage(), __METHOD__);
            }
        }
    }
}
