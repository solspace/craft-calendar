<?php

namespace Solspace\Tests\Unit\Calendar\Elements;

use craft\elements\User;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Elements\Booking;

/**
 * @internal
 *
 * @covers \Solspace\Calendar\Elements\Booking
 */
class BookingStatusMetadataTest extends TestCase
{
    /** @dataProvider statuses */
    public function testStatusTransitionsRecordTheActorAndUtcTimestamp(string $status): void
    {
        $booking = $this->booking();
        $booking->bookingStatus = $status;
        $user = $this->createMock(User::class);
        $user->id = 7;
        $user->method('getFriendlyName')->willReturn('Kelsey');
        $now = new \DateTimeImmutable('2026-10-11T06:45:00Z');
        $previous = ['bookingStatus' => Booking::REQUESTED === $status ? Booking::CANCELLED : Booking::REQUESTED];
        $this->apply($booking, $previous, $user, 'user', $now);
        self::assertSame($now, $booking->statusChangedAt);
        self::assertSame(7, $booking->statusChangedById);
        self::assertSame('Kelsey', $booking->statusChangedByName);
        self::assertSame('user', $booking->statusChangeSource);
        self::assertSame('2026-10-11 06:45:00', $booking->getRecordData()['statusChangedAt']);
    }

    public static function statuses(): iterable
    {
        foreach ([Booking::REQUESTED, Booking::CONFIRMED, Booking::DECLINED, Booking::CANCELLED] as $status) {
            yield $status => [$status];
        }
    }

    public function testOrdinarySavesRestoreThePersistedMetadataInsteadOfAcceptingChangedValues(): void
    {
        $booking = $this->booking();
        $booking->bookingStatus = Booking::CONFIRMED;
        $booking->statusChangedById = 999;
        $booking->statusChangedByName = 'Forged actor';
        $booking->statusChangeSource = 'automatic';
        $booking->statusChangedAt = new \DateTimeImmutable('now');
        $previous = ['bookingStatus' => Booking::CONFIRMED, 'statusChangedAt' => '2026-10-10 13:00:00', 'statusChangedById' => '7', 'statusChangedByName' => 'Kelsey', 'statusChangeSource' => 'user'];
        $this->apply($booking, $previous, null, 'system', new \DateTimeImmutable('2026-10-11T06:45:00Z'));
        self::assertSame('2026-10-10T13:00:00+00:00', $booking->statusChangedAt->format(\DATE_ATOM));
        self::assertSame(7, $booking->statusChangedById);
        self::assertSame('Kelsey', $booking->statusChangedByName);
        self::assertSame('user', $booking->statusChangeSource);
    }

    public function testGuestAndAutomaticCreationsDoNotInventAStaffActor(): void
    {
        foreach (['customer' => Booking::REQUESTED, 'automatic' => Booking::CONFIRMED] as $source => $status) {
            $booking = $this->booking();
            $booking->bookingStatus = $status;
            $this->apply($booking, null, null, $source, new \DateTimeImmutable('2026-10-11T06:45:00Z'));
            self::assertNotNull($booking->statusChangedAt);
            self::assertNull($booking->statusChangedById);
            self::assertNull($booking->statusChangedByName);
            self::assertSame($source, $booking->statusChangeSource);
        }
    }

    public function testLegacyBookingsDoNotAcquireInventedAttributionDuringOrdinarySaves(): void
    {
        $booking = $this->booking();
        $this->apply($booking, ['bookingStatus' => Booking::REQUESTED], null, 'system', new \DateTimeImmutable('now'));
        self::assertNull($booking->statusChangedAt);
        self::assertNull($booking->statusChangedById);
        self::assertNull($booking->statusChangedByName);
        self::assertNull($booking->statusChangeSource);
    }

    public function testDeletedActorsKeepTheirRecordedName(): void
    {
        $booking = $this->booking();
        $previous = ['bookingStatus' => Booking::REQUESTED, 'statusChangedAt' => '2026-10-10 13:00:00', 'statusChangedById' => null, 'statusChangedByName' => 'Former staff member', 'statusChangeSource' => 'user'];
        $this->apply($booking, $previous, null, 'system', new \DateTimeImmutable('now'));
        self::assertNull($booking->statusChangedById);
        self::assertSame('Former staff member', $booking->statusChangedByName);
    }

    private function booking(): Booking
    {
        return (new \ReflectionClass(Booking::class))->newInstanceWithoutConstructor();
    }

    private function apply(Booking $booking, ?array $previous, ?User $user, string $source, \DateTimeImmutable $now): void
    {
        (new \ReflectionMethod(Booking::class, 'applyStatusChangeMetadata'))->invoke($booking, $previous, $user, $source, $now);
    }
}
