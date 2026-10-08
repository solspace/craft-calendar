<?php

namespace Solspace\Tests\Unit\Calendar\Bundles\Occurrences;

use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Bundles\Occurrences\OccurrenceCodeGenerator;

/**
 * @internal
 *
 * @covers \Solspace\Calendar\Bundles\Occurrences\OccurrenceCodeGenerator
 */
class OccurrenceCodeGeneratorTest extends TestCase
{
    public function testGeneratesShortCodesWithoutVowels(): void
    {
        $generator = new OccurrenceCodeGenerator();

        for ($i = 0; $i < 200; ++$i) {
            self::assertMatchesRegularExpression('/^[0-9bcdfghjklmnpqrstvwxyz]{5}$/', $generator->generate());
        }
    }

    public function testGeneratesTheRequestedNumberOfDistinctCodes(): void
    {
        $codes = (new OccurrenceCodeGenerator())->generateUnique(500, static fn (array $candidates) => []);

        self::assertCount(500, $codes);
        self::assertCount(500, array_unique($codes));
        self::assertContainsOnly('string', $codes);
    }

    public function testReplacesCodesThatAreAlreadyTaken(): void
    {
        $rejected = [];
        $calls = 0;

        $codes = (new OccurrenceCodeGenerator())->generateUnique(
            10,
            static function (array $candidates) use (&$rejected, &$calls) {
                // Pretend the first three candidates of the first round are already in use
                if (0 === $calls++) {
                    $rejected = \array_slice($candidates, 0, 3);

                    return $rejected;
                }

                return [];
            },
        );

        self::assertSame(2, $calls);
        self::assertCount(10, $codes);
        self::assertCount(10, array_unique($codes));
        self::assertSame([], array_intersect($rejected, $codes));
    }

    public function testOnlyAsksAboutNewCandidatesWhenRetrying(): void
    {
        $asked = [];

        (new OccurrenceCodeGenerator())->generateUnique(
            5,
            static function (array $candidates) use (&$asked) {
                $asked[] = $candidates;

                return 1 === \count($asked) ? [$candidates[0]] : [];
            },
        );

        self::assertCount(2, $asked);
        self::assertCount(5, $asked[0]);
        self::assertCount(1, $asked[1]);
    }

    public function testGivesUpWhenEveryCodeIsTaken(): void
    {
        $this->expectException(\RuntimeException::class);

        (new OccurrenceCodeGenerator())->generateUnique(3, static fn (array $candidates) => $candidates);
    }

    public function testGeneratesNothingWhenNothingIsRequested(): void
    {
        $codes = (new OccurrenceCodeGenerator())->generateUnique(
            0,
            static fn () => self::fail('Nothing should be checked'),
        );

        self::assertSame([], $codes);
    }
}
