<?php

namespace Solspace\Tests\Unit\Calendar\Library\Scheduling;

use craft\i18n\Locale;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Controllers\SettingsController;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Calendar\Models\SettingsModel;
use Twig\Environment;
use Twig\Loader\ArrayLoader;
use Twig\TwigFilter;
use Twig\TwigFunction;
use yii\console\Application;
use yii\web\BadRequestHttpException;

/** @coversNothing */
class BookingDefaultsTest extends TestCase
{
    public function testFreshInstallUsesTheInitialBookingRules(): void
    {
        $defaults = (new SettingsModel())->getBookingDefaults();
        self::assertSame(60, $defaults->duration);
        self::assertSame(60, $defaults->increment);
        self::assertSame(0, $defaults->buffer);
        self::assertSame(24, $defaults->minimumNotice);
        self::assertSame(60, $defaults->maximumAdvance);
        self::assertFalse($defaults->allowOverlap);
        self::assertFalse($defaults->allowGuests);
        self::assertTrue($defaults->requireApproval);
        self::assertCount(7, $defaults->hours);
        self::assertTrue((new SettingsModel())->validate());
    }

    public function testSavedDefaultsAndExistingCalendarRulesArePreserved(): void
    {
        // The earlier empty defaults configuration retains its original fallback values.
        foreach ([[], ['duration' => 30, 'increment' => 15, 'minimumNotice' => 0, 'maximumAdvance' => 90]] as $saved) {
            $settings = new SettingsModel(['bookingDefaults' => $saved]);
            self::assertSame(30, $settings->getBookingDefaults()->duration);
            self::assertSame(15, $settings->getBookingDefaults()->increment);
            self::assertSame(0, $settings->getBookingDefaults()->minimumNotice);
            self::assertSame(90, $settings->getBookingDefaults()->maximumAdvance);
        }
        $calendar = new CalendarModel(['id' => 1, 'type' => CalendarModel::TYPE_SCHEDULING, 'scheduling' => []]);
        self::assertSame(30, $calendar->getSchedulingSettings()->duration);
        self::assertSame(15, $calendar->getSchedulingSettings()->increment);
        self::assertSame(0, $calendar->getSchedulingSettings()->minimumNotice);
        self::assertSame(90, $calendar->getSchedulingSettings()->maximumAdvance);
    }

    public function testNewCalendarsCopyDefaultsAndKeepTheirOwnSettings(): void
    {
        $settings = new SettingsModel(['bookingDefaults' => [
            'duration' => 60, 'increment' => 30, 'buffer' => 10, 'minimumNotice' => 24,
            'maximumAdvance' => 45, 'allowOverlap' => true, 'requireApproval' => false,
            'notificationEmail' => 'staff@example.com',
            'hours' => [['day' => 1, 'start' => '09:00', 'end' => '17:00']],
        ]]);
        $calendar = CalendarModel::create($settings->getBookingDefaults());
        self::assertFalse($calendar->getIsScheduling());
        $calendar->type = CalendarModel::TYPE_SCHEDULING;
        self::assertSame(60, $calendar->getSchedulingSettings()->duration);
        self::assertFalse($calendar->getSchedulingSettings()->requireApproval);
        self::assertSame('staff@example.com', $calendar->getSchedulingSettings()->notificationEmail);
        self::assertTrue($settings->validate());

        $settings->bookingDefaults['duration'] = 90;
        $settings->bookingDefaults['hours'][0]['start'] = '10:00';
        self::assertSame(60, $calendar->getSchedulingSettings()->duration);
        self::assertSame('09:00', $calendar->getSchedulingSettings()->hours[0]['start']);
        self::assertSame(90, CalendarModel::create($settings->getBookingDefaults())->getSchedulingSettings()->duration);

        $reloaded = new CalendarModel(['id' => 1, 'type' => CalendarModel::TYPE_SCHEDULING, 'scheduling' => $calendar->scheduling]);
        self::assertSame($calendar->scheduling, $reloaded->scheduling);
        self::assertSame(60, $reloaded->getSchedulingSettings()->duration);
        $duplicate = new CalendarModel(['type' => $reloaded->type, 'scheduling' => $reloaded->scheduling]);
        self::assertSame($reloaded->scheduling, $duplicate->scheduling);
    }

    public function testCalendarSpecificSettingsCannotLeakIntoDefaults(): void
    {
        $settings = new SettingsModel(['bookingDefaults' => [
            'active' => false, 'availableFrom' => '2027-06-01', 'availableUntil' => '2027-08-31',
            'timezone' => 'Pacific/Auckland', 'allowGuests' => true,
            'exceptions' => [['dateFrom' => '2027-06-01', 'dateTo' => '2027-06-01', 'type' => 'closed']],
            'duration' => 45,
        ]]);
        $defaults = $settings->getBookingDefaults();
        self::assertSame(45, $defaults->duration);
        self::assertSame(\Craft::$app?->getTimeZone() ?? 'UTC', $defaults->timezone);
        self::assertTrue($defaults->active);
        self::assertFalse($defaults->allowGuests);
        self::assertNull($defaults->availableFrom);
        self::assertNull($defaults->availableUntil);
        self::assertSame([], $defaults->exceptions);
    }

    public function testClosedDaysAndSplitPeriodsSurviveSettingsReload(): void
    {
        foreach ([[], [
            ['day' => 1, 'start' => '09:00', 'end' => '12:00'],
            ['day' => 1, 'start' => '13:00', 'end' => '17:00'],
        ]] as $hours) {
            $settings = new SettingsModel(['bookingDefaults' => ['hours' => $hours]]);
            self::assertTrue($settings->validate());
            $loaded = new SettingsModel(['bookingDefaults' => $settings->toArray()['bookingDefaults']]);
            self::assertSame($hours, $loaded->getBookingDefaults()->hours);
            self::assertSame($hours, CalendarModel::create($loaded->getBookingDefaults())->getSchedulingSettings()->hours);
        }
    }

    public function testInvalidRulesEmailAndHoursAreRejectedWithFieldErrors(): void
    {
        foreach ([
            'duration' => 0, 'increment' => 1441, 'buffer' => -1,
            'minimumNotice' => -1, 'maximumAdvance' => 731,
            'notificationEmail' => 'invalid',
            'hours' => [['day' => 8, 'start' => '17:00', 'end' => '09:00']],
        ] as $attribute => $value) {
            $settings = new SettingsModel(['bookingDefaults' => [$attribute => $value]]);
            self::assertFalse($settings->validate(['bookingDefaults']));
            self::assertTrue($settings->hasErrors('bookingDefaults'));
            self::assertTrue($settings->hasErrors('bookingDefaults.'.$attribute));
        }
        foreach (['abc', '1.5', [], ''] as $duration) {
            $settings = new SettingsModel(['bookingDefaults' => ['duration' => $duration]]);
            self::assertFalse($settings->validate(['bookingDefaults']));
            self::assertTrue($settings->hasErrors('bookingDefaults.duration'));
        }
    }

    public function testPostedNativeTimesAndEmptyHoursAreNormalized(): void
    {
        $previousApp = \Craft::$app;

        try {
            \Craft::$app = new class(['id' => 'booking-defaults-test', 'basePath' => __DIR__, 'timeZone' => 'America/Winnipeg']) extends Application {
                public function getFormattingLocale(): Locale
                {
                    return new Locale('en-US');
                }
            };
            $normalized = $this->normalize([
                'duration' => '45', 'allowOverlap' => '0', 'requireApproval' => '1',
                'notificationEmail' => ' staff@example.com ',
                'hours' => ['new1' => ['day' => '1', 'start' => ['time' => '9:30 AM'], 'end' => ['time' => '5:00 PM']]],
                'active' => false, 'timezone' => 'Pacific/Auckland',
            ]);
            self::assertSame(45, $normalized['duration']);
            self::assertFalse($normalized['allowOverlap']);
            self::assertTrue($normalized['requireApproval']);
            self::assertSame('staff@example.com', $normalized['notificationEmail']);
            self::assertSame([['day' => '1', 'start' => '09:30', 'end' => '17:00']], $normalized['hours']);
            self::assertArrayNotHasKey('active', $normalized);
            self::assertArrayNotHasKey('timezone', $normalized);
            self::assertTrue((new SettingsModel(['bookingDefaults' => $normalized]))->validate());
            self::assertSame([], $this->normalize(['hours' => ''])['hours']);
            self::assertSame([], $this->normalize(['hours' => []])['hours']);
            self::assertSame('America/Winnipeg', (new SettingsModel())->getBookingDefaults()->timezone);
        } finally {
            \Craft::$app = $previousApp;
        }
    }

    public function testFractionalRulesCannotBeTruncatedOnSave(): void
    {
        $this->expectException(BadRequestHttpException::class);
        $this->normalize(['duration' => '30.5']);
    }

    public function testDefaultsAndCalendarFormsUseTheCorrectFieldNames(): void
    {
        $root = __DIR__.'/../../../src/templates/';
        $twig = new Environment(new ArrayLoader([
            'defaults' => file_get_contents($root.'settings/_booking_defaults.twig'),
            'scheduling' => file_get_contents($root.'calendars/_scheduling.twig'),
            'calendar/calendars/_weekly-hours' => file_get_contents($root.'calendars/_weekly-hours.twig'),
            'calendar/calendars/_booking-rules' => file_get_contents($root.'calendars/_booking-rules.twig'),
            'calendar/layouts/_settings' => '{% block content %}{% endblock %}',
            '_includes/forms' => <<<'TWIG'
                {% macro errorList(errors) %}{% for error in errors %}<error>{{ error }}</error>{% endfor %}{% endmacro %}
                {% macro editableTableField(config) %}<field name="{{ config.name }}">{{ config.rows|json_encode }}</field>{% endmacro %}
                {% macro textField(config) %}<input name="{{ config.name }}" value="{{ config.value }}">{% for error in config.errors|default([]) %}<error>{{ error }}</error>{% endfor %}{% endmacro %}
                {% macro lightswitchField(config) %}<input name="{{ config.name }}" value="{{ config.on ? 1 : 0 }}">{% endmacro %}
                {% macro selectField(config) %}<input name="{{ config.name }}">{% endmacro %}
                {% macro dateField(config) %}<input name="{{ config.name }}">{% endmacro %}
                TWIG,
        ]), ['strict_variables' => true]);
        $twig->addFilter(new TwigFilter('t', static fn ($message) => $message));
        foreach (['actionInput', 'redirectInput', 'csrfInput'] as $function) {
            $twig->addFunction(new TwigFunction($function, static fn () => ''));
        }
        $settings = new SettingsModel(['bookingDefaults' => ['duration' => 45, 'hours' => []]]);
        $scheduling = $settings->getBookingDefaults();
        $scheduling->addError('duration', 'Invalid duration');
        $variables = [
            'settings' => $settings, 'scheduling' => $scheduling, 'schedulingHours' => [],
            'calendar' => new CalendarModel(), 'schedulingExceptions' => [],
            'schedulingDates' => ['availableFrom' => null, 'availableUntil' => null],
            'timezoneOptions' => [], 'craft' => ['app' => ['timeZone' => 'UTC']],
        ];
        $output = $twig->render('defaults', $variables);
        self::assertStringContainsString('name="settings[bookingDefaults][duration]" value="45"', $output);
        self::assertStringContainsString('name="settings[bookingDefaults][hours]"', $output);
        self::assertStringContainsString('name="settings[bookingDefaults][requireApproval]"', $output);
        self::assertStringContainsString('Invalid duration', $output);
        self::assertStringContainsString('Changes here do not affect existing calendars.', $output);
        foreach (['allowGuests', 'active', 'availableFrom', 'exceptions', 'timezone'] as $attribute) {
            self::assertStringNotContainsString('settings[bookingDefaults]['.$attribute.']', $output);
        }
        $output = $twig->render('scheduling', $variables);
        self::assertStringContainsString('name="scheduling[duration]" value="45"', $output);
        self::assertStringContainsString('name="scheduling[hours]"', $output);
        self::assertStringContainsString('name="scheduling[allowGuests]"', $output);
        self::assertStringNotContainsString('settings[bookingDefaults]', $output);
    }

    private function normalize(array $data): array
    {
        $controller = (new \ReflectionClass(SettingsController::class))->newInstanceWithoutConstructor();
        $method = new \ReflectionMethod(SettingsController::class, 'normalizeBookingDefaults');
        $method->setAccessible(true);

        return $method->invoke($controller, $data);
    }
}
