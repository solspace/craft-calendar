<?php

namespace Solspace\Tests\Unit\Calendar\Library\Scheduling;

use craft\i18n\Formatter;
use craft\web\twig\Extension;
use craft\web\View;
use PHPUnit\Framework\TestCase;
use Twig\Environment;
use Twig\Loader\ArrayLoader;
use Twig\TwigFilter;
use Twig\TwigFunction;

/** @coversNothing */
class BookingStatusTemplateTest extends TestCase
{
    public function testStatusTimestampUsesPlainMeridiemAndAccountLinksWithCraftDateFormatting(): void
    {
        $root = __DIR__.'/../../../src/';
        $twig = new Environment(new ArrayLoader(['status' => file_get_contents($root.'templates/bookings/_status-meta.twig')]), ['strict_variables' => true, 'autoescape' => 'html']);
        $extension = new Extension((new \ReflectionClass(View::class))->newInstanceWithoutConstructor(), $twig);
        $twig->addFunction(new TwigFunction('date', static fn ($env, $date, $timezone = null) => $extension->dateFunction($env, $date, $timezone), ['needs_environment' => true]));
        $twig->addFilter(new TwigFilter('date', static fn ($env, $date, $format = null, $timezone = null) => $extension->dateFilter($env, $date, $format, $timezone), ['needs_environment' => true]));
        $twig->addFilter(new TwigFilter('datetime', static fn ($env, $date, $format = null, $timezone = null) => $extension->datetimeFilter($env, $date, $format, $timezone), ['needs_environment' => true]));
        $messages = [];
        $twig->addFilter(new TwigFilter('t', static function ($text, $category, $params = []) use (&$messages) {
            return strtr($messages[$text] ?? $text, array_combine(array_map(static fn ($key) => '{'.$key.'}', array_keys($params)), array_values($params)));
        }));
        $query = new class {
            public function id($id): self
            {
                return $this;
            }

            public function status($status): self
            {
                return $this;
            }

            public function one(): object
            {
                return (object) ['cpEditUrl' => '/admin/users/7'];
            }
        };
        $booking = (object) ['id' => 42, 'statusChangedAt' => new \DateTimeImmutable('2026-10-11T06:56:00Z'), 'statusChangedById' => 7, 'statusChangedByName' => 'Kelsey <b>test</b>', 'statusChangeSource' => 'user'];
        $app = \Craft::$app;

        try {
            foreach (['en' => 'en-CA', 'de' => 'de-DE', 'fr' => 'fr-FR', 'it' => 'it-IT', 'nl' => 'nl-NL'] as $language => $locale) {
                $messages = require $root.'translations/'.$language.'/calendar.php';
                $formatter = new Formatter(['locale' => $locale, 'timeZone' => 'America/Winnipeg', 'booleanFormat' => ['No', 'Yes'], 'nullDisplay' => '']);
                \Craft::$app = new class($formatter) {
                    public function __construct(private Formatter $formatter) {}

                    public function getFormatter(): Formatter
                    {
                        return $this->formatter;
                    }
                };
                $context = ['booking' => $booking, 'craft' => ['app' => ['formatter' => $formatter], 'users' => $query]];
                $output = $twig->render('status', $context);
                self::assertStringContainsString('2026-10-11', $output);
                self::assertStringContainsString('1:56 am', $output);
                self::assertStringNotContainsString('1:56 am.', $output);
                self::assertStringNotContainsString('1:56 a.m.', $output);
                self::assertStringContainsString('Kelsey &lt;b&gt;test&lt;/b&gt;</a>', $output);
                self::assertStringContainsString('href="&#x2F;admin&#x2F;users&#x2F;7"', $output);
                $booking->statusChangedAt = new \DateTimeImmutable('2026-10-11T18:56:00Z');
                self::assertStringContainsString('1:56 pm', $twig->render('status', $context));
                $booking->statusChangedAt = new \DateTimeImmutable('2026-10-11T06:56:00Z');
            }
        } finally {
            \Craft::$app = $app;
        }
    }
}
