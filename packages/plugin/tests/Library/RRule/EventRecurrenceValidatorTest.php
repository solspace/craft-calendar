<?php

namespace Solspace\Tests\Unit\Calendar\Library\RRule;

use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Library\RRule\EventRecurrenceValidator;

/**
 * @internal
 *
 * @covers \Solspace\Calendar\Library\RRule\EventRecurrenceValidator
 */
class EventRecurrenceValidatorTest extends TestCase
{
    private EventRecurrenceValidator $validator;

    protected function setUp(): void
    {
        $this->validator = new EventRecurrenceValidator();
    }

    public function testAcceptsCoherentRules(): void
    {
        self::assertSame([], $this->validator->validate('NEVER', 'NEVER', null));
        self::assertSame([], $this->validator->validate(
            'DAILY',
            'AFTER',
            "DTSTART:20260713T090000Z\nRRULE:FREQ=DAILY;COUNT=3",
        ));
        self::assertSame([], $this->validator->validate(
            'WEEKLY',
            'ON_DATE',
            "DTSTART:20260713T090000Z\nRRULE:FREQ=WEEKLY;UNTIL=20260813T090000Z",
        ));
        self::assertSame([], $this->validator->validate(
            'DAILY',
            'NEVER',
            "DTSTART:20260713T090000\r\nRRULE:FREQ=DAILY;INTERVAL=1",
        ));
    }

    public function testAcceptsSelectedDatesWithoutARepeatType(): void
    {
        $errors = $this->validator->validate(
            'NEVER',
            'NEVER',
            "DTSTART:20260713T090000\nRDATE:20260713T090000,20260714T090000",
        );

        self::assertSame([], $errors);
    }

    public function testAcceptsCustomRuleWithFixedDates(): void
    {
        $errors = $this->validator->validate(
            'CUSTOM',
            'NEVER',
            implode("\n", [
                'DTSTART:20260713T090000',
                'RRULE:FREQ=WEEKLY;INTERVAL=2;BYDAY=MO,WE',
                'RDATE:20260714T090000',
                'EXDATE:20260715T090000',
            ]),
        );

        self::assertSame([], $errors);
    }

    public function testRejectsMalformedRule(): void
    {
        $errors = $this->validator->validate(
            'DAILY',
            'NEVER',
            "DTSTART:20260713T090000\nRRULE:FREQ=INVALID",
        );

        self::assertArrayHasKey('rrule', $errors);
    }

    public function testRejectsRepeatingTypeWithoutRule(): void
    {
        $errors = $this->validator->validate('DAILY', 'NEVER', null);

        self::assertArrayHasKey('rrule', $errors);
    }

    public function testRejectsRepeatingRuleWithoutStartDate(): void
    {
        $errors = $this->validator->validate('DAILY', 'NEVER', 'RRULE:FREQ=DAILY');

        self::assertArrayHasKey('rrule', $errors);
    }

    public function testRejectsDateStartWithoutAnyOccurrences(): void
    {
        $errors = $this->validator->validate('NEVER', 'NEVER', 'DTSTART:20260713T090000');

        self::assertArrayHasKey('rrule', $errors);
    }

    /**
     * @dataProvider invalidSelectedDateProvider
     */
    public function testRejectsEmptySelectedDates(string $rrule): void
    {
        $errors = $this->validator->validate('NEVER', 'NEVER', $rrule);

        self::assertArrayHasKey('rrule', $errors);
    }

    public function invalidSelectedDateProvider(): iterable
    {
        yield ['DTSTART:20260713T090000'];

        yield ["DTSTART:20260713T090000\nRDATE:"];

        yield ["DTSTART:20260713T090000\nRDATE:20260713T090000,"];
    }

    public function testRejectsFrequencyMismatch(): void
    {
        $errors = $this->validator->validate(
            'DAILY',
            'NEVER',
            "DTSTART:20260713T090000\nRRULE:FREQ=WEEKLY",
        );

        self::assertArrayHasKey('repeatType', $errors);
    }

    public function testRejectsEndTypeMismatch(): void
    {
        $errors = $this->validator->validate(
            'DAILY',
            'AFTER',
            "DTSTART:20260713T090000\nRRULE:FREQ=DAILY",
        );

        self::assertArrayHasKey('repeatEndType', $errors);
    }

    public function testRejectsRepeatMetadataOnNonRepeatingEvent(): void
    {
        $errors = $this->validator->validate(
            'NEVER',
            'AFTER',
            "DTSTART:20260713T090000\nRRULE:FREQ=DAILY;COUNT=3",
        );

        self::assertArrayHasKey('repeatType', $errors);
        self::assertArrayHasKey('repeatEndType', $errors);
    }
}
