<?php

namespace Solspace\Calendar\Bundles\Occurrences;

use Carbon\Carbon;
use craft\base\Element;
use craft\events\ElementEvent;
use craft\helpers\Db;
use craft\helpers\ElementHelper;
use craft\services\Elements;
use RRule\RRuleInterface;
use Solspace\Calendar\Elements\Event as CalendarEvent;
use Solspace\Calendar\Library\Bundles\BundleInterface;
use Solspace\Calendar\Library\Helpers\DateHelper;
use Solspace\Calendar\Records\OccurrenceRecord;
use yii\base\Event;

class OccurrencePersistence implements BundleInterface
{
    private const BATCH_INSERT_SIZE = 500;

    public function __construct()
    {
        Event::on(
            Elements::class,
            Elements::EVENT_AFTER_SAVE_ELEMENT,
            [$this, 'persistOccurrences']
        );

        Event::on(
            CalendarEvent::class,
            Element::EVENT_AFTER_DELETE,
            [$this, 'deleteOccurrences']
        );

        Event::on(
            CalendarEvent::class,
            Element::EVENT_AFTER_RESTORE,
            [$this, 'restoreOccurrences']
        );
    }

    public function persistOccurrences(ElementEvent $event): void
    {
        $element = $event->element;
        if (!$element instanceof CalendarEvent) {
            return;
        }

        if (ElementHelper::isDraftOrRevision($element)) {
            return;
        }

        $this->persistEventOccurrences($element);
    }

    public function deleteOccurrences(Event $event): void
    {
        $element = $event->sender;
        if (!$element instanceof CalendarEvent) {
            return;
        }

        OccurrenceRecord::deleteAll(['eventId' => $element->id]);
    }

    public function restoreOccurrences(Event $event): void
    {
        $element = $event->sender;
        if (!$element instanceof CalendarEvent) {
            return;
        }

        $this->persistEventOccurrences($element);
    }

    private function persistEventOccurrences(CalendarEvent $element): void
    {
        if ($element->propagating) {
            return;
        }

        $timeDelta = $element->startDate->diff($element->endDate);

        OccurrenceRecord::deleteAll(['eventId' => $element->id]);

        $rrule = $element->getRRuleObject();
        if (null === $rrule) {
            $this->insertOccurrenceRows([
                $this->createOccurrenceRow($element, $element->startDate, $timeDelta),
            ]);

            return;
        }

        $rows = [];
        foreach ($this->getOccurrenceDates($rrule) as $occurrence) {
            $rows[] = $this->createOccurrenceRow($element, $occurrence, $timeDelta);

            if (\count($rows) >= self::BATCH_INSERT_SIZE) {
                $this->insertOccurrenceRows($rows);
                $rows = [];
            }
        }

        if ($rows) {
            $this->insertOccurrenceRows($rows);
        }
    }

    private function getOccurrenceDates(RRuleInterface $rrule): iterable
    {
        $hardLimit = $rrule->isInfinite() ? new Carbon('+50 years', DateHelper::UTC) : null;

        foreach ($rrule as $occurrence) {
            $occurrence = new Carbon($occurrence->format('Y-m-d H:i:s'), DateHelper::UTC);

            if ($hardLimit && $occurrence >= $hardLimit) {
                break;
            }

            yield $occurrence;
        }
    }

    private function createOccurrenceRow(
        CalendarEvent $element,
        Carbon $startDate,
        \DateInterval $timeDelta,
    ): array {
        $endDate = $startDate->clone()->add($timeDelta);

        return [
            (int) $element->id,
            (int) $element->calendarId,
            Db::prepareDateForDb($startDate),
            Db::prepareDateForDb($endDate),
            (bool) $element->allDay,
        ];
    }

    private function insertOccurrenceRows(array $rows): void
    {
        if (!$rows) {
            return;
        }

        \Craft::$app->db
            ->createCommand()
            ->batchInsert(
                OccurrenceRecord::TABLE,
                ['eventId', 'calendarId', 'startDate', 'endDate', 'allDay'],
                $rows,
            )
            ->execute()
        ;
    }
}
