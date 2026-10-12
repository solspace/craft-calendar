<?php

namespace Solspace\Calendar\Library\Scheduling;

use craft\db\Query;
use craft\db\Table;
use Solspace\Calendar\Elements\Booking;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Calendar\Records\CalendarRecord;
use Solspace\Calendar\Services\BookingsService;

/** Read lightweight records before hydrating just the visible booking elements. */
class RequestQueue
{
    public const SORTS = [
        'submitted-asc' => ['e.dateCreated', \SORT_ASC],
        'submitted-desc' => ['e.dateCreated', \SORT_DESC],
        'date-asc' => ['b.startDate', \SORT_ASC],
        'date-desc' => ['b.startDate', \SORT_DESC],
        'customer-asc' => ['b.customerName', \SORT_ASC],
        'customer-desc' => ['b.customerName', \SORT_DESC],
        'calendar-asc' => ['c.name', \SORT_ASC],
        'calendar-desc' => ['c.name', \SORT_DESC],
    ];

    public function __construct(private BookingsService $bookings) {}

    public function count(array $calendarIds): int
    {
        return (int) $this->query($calendarIds)->count();
    }

    /** @return array{ids: array, total: int, page: int, unavailableRequestIds: array} */
    public function page(array $calendars, array $calendarIds, string $search, string $sort, string $availability, int $page): array
    {
        $query = $this->query($calendarIds);
        if ('' !== $search) {
            $query->andWhere(['or', ['like', 'b.customerName', $search], ['like', 'b.customerEmail', $search]]);
        }
        [$column, $direction] = self::SORTS[$sort];
        $query->orderBy([$column => $direction, 'b.id' => $direction]);
        $query->select(['b.id', 'b.calendarId', 'b.startDate', 'b.endDate', 'b.bookingStatus']);
        $unavailable = [];
        if ('all' !== $availability) {
            // Availability is derived from calendar rules, not a stored flag. Scan only
            // scheduling columns, sharing reservation reads across calendar/month groups.
            $records = $query->all();
            $unavailable = $this->warnings($records, $calendars, true);
            $records = array_values(array_filter($records, static fn ($row) => ('unavailable' === $availability) === isset($unavailable[$row['id']])));
            $total = \count($records);
            $page = min(max(1, $page), max(1, (int) ceil($total / 50)));
            $records = \array_slice($records, ($page - 1) * 50, 50);
        } else {
            $total = (int) (clone $query)->count();
            $page = min(max(1, $page), max(1, (int) ceil($total / 50)));
            $records = $query->limit(50)->offset(($page - 1) * 50)->all();
            $unavailable = $this->warnings($records, $calendars);
        }
        $ids = array_map('intval', array_column($records, 'id'));

        return ['ids' => $ids, 'total' => $total, 'page' => $page, 'unavailableRequestIds' => array_intersect_key($unavailable, array_flip($ids))];
    }

    private function query(array $calendarIds): Query
    {
        return (new Query())->from(['b' => Booking::TABLE])
            ->innerJoin(['e' => Table::ELEMENTS], '[[e.id]] = [[b.id]]')
            ->innerJoin(['c' => CalendarRecord::TABLE], '[[c.id]] = [[b.calendarId]]')
            ->where(['b.calendarId' => $calendarIds, 'b.bookingStatus' => Booking::REQUESTED, 'e.dateDeleted' => null, 'c.type' => CalendarModel::TYPE_SCHEDULING])
        ;
    }

    private function warnings(array $records, array $calendars, bool $batch = false): array
    {
        $bookings = array_map(static function ($row) {
            $row['startDate'] = $row['startDate'] ? new \DateTimeImmutable($row['startDate'], new \DateTimeZone('UTC')) : null;
            $row['endDate'] = $row['endDate'] ? new \DateTimeImmutable($row['endDate'], new \DateTimeZone('UTC')) : null;

            return (object) $row;
        }, $records);

        return $this->bookings->unavailableRequestIds($bookings, $calendars, $batch);
    }
}
