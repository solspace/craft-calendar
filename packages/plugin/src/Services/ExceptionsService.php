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
     * Returns a list of Calendar_ExceptionModel's if any are found.
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
     * @return ExceptionModel[]
     */
    public function getExceptionsForEventId(int $eventId): array
    {
        if (null === self::$cachedExceptions) {
            /** @var ExceptionModel[] $models */
            $models = [];
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

    public function saveException(Event $event, \DateTime $date, int $id = null)
    {
        $exceptionRecord = null;
        if ($id) {
            $exceptionRecord = ExceptionRecord::findOne(['id' => $id]);
        }

        if (!$exceptionRecord) {
            $exceptionRecord = new ExceptionRecord();
        }

        $exceptionRecord->eventId = $event->id;
        $exceptionRecord->date = $date;

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

            if (null !== $transaction) {
                $transaction->commit();
            }
        } catch (\Exception $e) {
            if (null !== $transaction) {
                $transaction->rollBack();
            }
        }
    }

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
            ->from(ExceptionRecord::TABLE.' e')
        ;
    }

    private function createModel(array $data): ExceptionModel
    {
        if ($data['date']) {
            $data['date'] = new Carbon($data['date'], DateHelper::UTC);
        }

        return new ExceptionModel($data);
    }
}
