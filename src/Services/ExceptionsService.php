<?php

namespace Solspace\Calendar\Services;

use Carbon\Carbon;
use craft\base\Component;
use craft\db\Query;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Library\DateHelper;
use Solspace\Calendar\Models\ExceptionModel;
use Solspace\Calendar\Records\ExceptionRecord;

class ExceptionsService extends Component
{
    private static $cachedExceptions;

    /**
     * Returns a list of Calendar_ExceptionModel's if any are found
     *
     * @param Event $event
     *
     * @return ExceptionModel[]
     */
    public function getExceptionsForEvent(Event $event): array
    {
        if (!$event->id || !$event->repeats()) {
            return [];
        }

        return $this->getExceptionsForEventId($event->id);
    }

    /**
     * @param int $eventId
     *
     * @return ExceptionModel[]
     */
    public function getExceptionsForEventId(int $eventId): array
    {
        if (null === self::$cachedExceptions) {
            /** @var ExceptionModel[] $models */
            $models  = [];
            $results = $this->getQuery()->all();
            foreach ($results as $data) {
                $models[] = $this->createModel($data);
            }

            $cache = [];
            foreach ($models as $model) {
                $exceptionEventId = $model->eventId;
                if (!isset($cache[$exceptionEventId])) {
                    $cache[$exceptionEventId] = [];
                }
                $cache[$exceptionEventId][] = $model;
            }

            self::$cachedExceptions = $cache;
        }

        if (isset(self::$cachedExceptions[$eventId])) {
            return self::$cachedExceptions[$eventId];
        }

        return [];
    }

    /**
     * @param int $eventId
     *
     * @return array
     */
    public function getExceptionDatesForEventId($eventId): array
    {
        $exceptions = $this->getExceptionsForEventId($eventId);

        $dates = [];
        foreach ($exceptions as $exception) {
            $dates[] = Carbon::createFromTimestampUTC($exception->date->getTimestamp())->toDateString();
        }

        return $dates;
    }

    /**
     * @param Event $event
     * @param array $exceptions
     */
    public function saveExceptions(Event $event, array $exceptions)
    {
        $query = \Craft::$app->db
            ->createCommand()
            ->delete(ExceptionRecord::TABLE, ['eventId' => $event->id])
            ->execute();

        foreach ($exceptions as $exceptionDate) {
            $exceptionDate = preg_replace('/^(\d{4}\-\d{2}\-\d{2}).*/', '$1', $exceptionDate);

            $exceptionRecord          = new ExceptionRecord();
            $exceptionRecord->eventId = $event->id;
            $exceptionRecord->date    = Carbon::createFromFormat(
                'Y-m-d',
                $exceptionDate,
                DateHelper::UTC
            )
            ->setTime(0, 0, 0);

            $exceptionRecord->save();
        }
    }

    /**
     * @param Event     $event
     * @param \DateTime $date
     */
    public function saveException(Event $event, \DateTime $date)
    {
        $exceptionRecord          = new ExceptionRecord();
        $exceptionRecord->eventId = $event->id;
        $exceptionRecord->date    = $date;

        $exceptionRecord->save();
    }

    /**
     * @param array|ExceptionModel[] $exceptions
     */
    public function updateExceptions(array $exceptions)
    {
        $transaction = \Craft::$app->db->beginTransaction();
        try {
            foreach ($exceptions as $exception) {
                $exceptionRecord = new ExceptionRecord();
                ExceptionRecord::populateRecord($exceptionRecord, $exception);
                $exceptionRecord->validate();

                $exceptionRecord->save(false);
            }

            if ($transaction !== null) {
                $transaction->commit();
            }
        } catch (\Exception $e) {
            if ($transaction !== null) {
                $transaction->rollBack();
            }
        }
    }

    /**
     * @return Query
     */
    private function getQuery(): Query
    {
        return (new Query())
            ->select(
                [
                    'e.id',
                    'e.eventId',
                    'e.date',
                ]
            )
            ->from(ExceptionRecord::TABLE . ' e');
    }

    /**
     * @param array $data
     *
     * @return ExceptionModel
     */
    private function createModel(array $data): ExceptionModel
    {
        if ($data['date']) {
            $data['date'] = new Carbon($data['date']);
        }

        return new ExceptionModel($data);
    }
}
