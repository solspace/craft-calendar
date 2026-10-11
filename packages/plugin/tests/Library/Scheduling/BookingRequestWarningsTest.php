<?php

namespace Solspace\Tests\Unit\Calendar\Library\Scheduling;

use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Elements\Booking;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Calendar\Services\BookingsService;

/** @covers \Solspace\Calendar\Services\BookingsService::unavailableRequestIds */
class BookingRequestWarningsTest extends TestCase
{
    public function testRequestsOnlyConflictWithConfirmedReservationsInTheirOwnCalendar(): void
    {
        $calendars = [7 => $this->calendar(7), 8 => $this->calendar(8)];
        $service = $this->getMockBuilder(BookingsService::class)->onlyMethods(['busy'])->getMock();
        $service->expects(self::exactly(2))->method('busy')->willReturnCallback(static fn ($id) => 7 === $id ? [['start' => '2026-10-12T14:00:00Z', 'end' => '2026-10-12T14:30:00Z', 'buffer' => 0]] : []);
        $bookings = [$this->request(1, '09:00', '09:30'), $this->request(2, '09:00', '09:30', 8), $this->request(3, '09:00', '09:30', 8)];
        foreach ([Booking::CONFIRMED, Booking::DECLINED, Booking::CANCELLED] as $status) {
            $row = $this->request(\count($bookings) + 1, '09:00', '09:30');
            $row->bookingStatus = $status;
            $bookings[] = $row;
        }
        $bookings[] = $this->request(99, '09:00', '09:30', 99);
        self::assertSame([1 => true], $service->unavailableRequestIds($bookings, $calendars));
        self::assertSame(Booking::REQUESTED, $bookings[0]->bookingStatus);
    }

    public function testStoredDurationAndBothBuffersAreCheckedAndTouchingBoundariesStayAvailable(): void
    {
        $calendar = $this->calendar(7, ['duration' => 15, 'buffer' => 15]);
        $service = $this->getMockBuilder(BookingsService::class)->onlyMethods(['busy'])->getMock();
        $service->expects(self::once())->method('busy')->with(7, null, false, '2026-10-12', 'America/Winnipeg')->willReturn([
            ['start' => '2026-10-12T14:00:00Z', 'end' => '2026-10-12T14:30:00Z', 'buffer' => 15],
        ]);
        $requests = [
            $this->request(1, '09:30', '10:00'), $this->request(2, '09:45', '10:15'),
            $this->request(3, '08:30', '09:00'), $this->request(4, '08:15', '08:45'),
            $this->request(5, '08:00', '09:30'),
        ];
        self::assertSame([1 => true, 3 => true, 5 => true], $service->unavailableRequestIds($requests, [7 => $calendar]));
    }

    public function testAllowedOverlapsDoNotWarnButClosuresAndInactiveDatesStillDo(): void
    {
        $service = $this->getMockBuilder(BookingsService::class)->onlyMethods(['busy'])->getMock();
        $service->expects(self::never())->method('busy');
        $requests = [$this->request(1, '09:00', '09:30')];
        self::assertSame([], $service->unavailableRequestIds($requests, [7 => $this->calendar(7, ['allowOverlap' => true])]));
        foreach ([['active' => false], ['availableFrom' => '2026-10-13'], ['hours' => []], ['exceptions' => [['dateFrom' => '2026-10-12', 'dateTo' => '2026-10-12', 'type' => 'closed']]]] as $settings) {
            self::assertSame([1 => true], $service->unavailableRequestIds($requests, [7 => $this->calendar(7, $settings + ['allowOverlap' => true])]));
        }
    }

    public function testFiftyRequestsShareOneReadAndGuestNoticeDoesNotInvalidateStaffRequests(): void
    {
        $service = $this->getMockBuilder(BookingsService::class)->onlyMethods(['busy'])->getMock();
        $service->expects(self::once())->method('busy')->willReturn([]);
        $requests = array_map(fn ($id) => $this->request($id, '09:00', '09:30'), range(1, 50));
        self::assertSame([], $service->unavailableRequestIds($requests, [7 => $this->calendar(7, ['minimumNotice' => 8760, 'maximumAdvance' => 1])]));
    }

    public function testRepeatedDstTimeUsesTheExactInstant(): void
    {
        $calendar = $this->calendar(7, ['timezone' => 'America/New_York', 'increment' => 30, 'hours' => [['day' => 7, 'start' => '00:00', 'end' => '04:00']]]);
        $service = $this->getMockBuilder(BookingsService::class)->onlyMethods(['busy'])->getMock();
        $service->expects(self::once())->method('busy')->willReturn([['start' => '2026-11-01T01:30:00-04:00', 'end' => '2026-11-01T01:00:00-05:00']]);
        $first = $this->request(1, '09:00', '09:30');
        $first->startDate = new \DateTimeImmutable('2026-11-01T01:30:00-04:00');
        $first->endDate = new \DateTimeImmutable('2026-11-01T01:00:00-05:00');
        $second = clone $first;
        $second->id = 2;
        $second->startDate = new \DateTimeImmutable('2026-11-01T01:30:00-05:00');
        $second->endDate = new \DateTimeImmutable('2026-11-01T02:00:00-05:00');
        self::assertSame([1 => true], $service->unavailableRequestIds([$first, $second], [7 => $calendar]));
    }

    private function calendar(int $id, array $settings = []): CalendarModel
    {
        return new CalendarModel(['id' => $id, 'type' => CalendarModel::TYPE_SCHEDULING, 'scheduling' => $settings + ['timezone' => 'America/Winnipeg', 'increment' => 15]]);
    }

    private function request(int $id, string $start, string $end, int $calendarId = 7): object
    {
        return (object) ['id' => $id, 'calendarId' => $calendarId, 'bookingStatus' => Booking::REQUESTED,
            'startDate' => new \DateTimeImmutable('2026-10-12 '.$start, new \DateTimeZone('America/Winnipeg')),
            'endDate' => new \DateTimeImmutable('2026-10-12 '.$end, new \DateTimeZone('America/Winnipeg'))];
    }
}
