<?php

namespace Solspace\Tests\Unit\Calendar\Library;

use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Library\Helpers\DateFormatHelper;

/**
 * @internal
 *
 * @covers \Solspace\Calendar\Library\Helpers\DateFormatHelper::relativeTimeLabel
 */
class RelativeTimeLabelTest extends TestCase
{
    public function testRelativeLabelsUseElapsedTimeAndOmitEmptyUnits(): void
    {
        $previousApp = \Craft::$app;
        \Craft::$app = new class {
            public string $language = 'en';

            public function getI18n(): object
            {
                return new class {
                    public function translate($category, $message, $params, $language): string
                    {
                        foreach ($params as $key => $value) {
                            $message = str_replace('{'.$key.'}', (string) $value, $message);
                        }

                        return $message;
                    }
                };
            }
        };

        try {
            $now = new \DateTimeImmutable('2026-11-01T08:00:00Z');
            foreach ([-60 => 'Just now', 0 => 'Just now', 59 => 'Just now', 60 => '1m ago', 3599 => '59m ago', 3600 => '1h ago', 11520 => '3h 12m ago', 86399 => '23h 59m ago', 86400 => '1d ago', 183600 => '2d 3h ago'] as $seconds => $expected) {
                $timestamp = $now->setTimestamp($now->getTimestamp() - $seconds)->setTimezone(new \DateTimeZone('America/Winnipeg'));
                self::assertSame($expected, DateFormatHelper::relativeTimeLabel($timestamp, $now));
            }
        } finally {
            \Craft::$app = $previousApp;
        }
    }
}
