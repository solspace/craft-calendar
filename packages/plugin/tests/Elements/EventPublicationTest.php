<?php

namespace Solspace\Tests\Unit\Calendar\Elements;

use Carbon\Carbon;
use craft\base\ExpirableElementInterface;
use craft\db\Command;
use craft\db\Connection;
use craft\db\mysql\ColumnSchema;
use craft\helpers\DateTimeHelper;
use craft\i18n\Formatter;
use craft\i18n\I18N;
use craft\i18n\Locale;
use craft\models\Site;
use craft\services\Sites;
use craft\web\Application;
use craft\web\Request;
use PHPUnit\Framework\TestCase;
use Solspace\Calendar\Elements\Event;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Calendar\Models\CalendarSiteSettingsModel;

/**
 * @internal
 *
 * @covers \Solspace\Calendar\Elements\Event
 */
class EventPublicationTest extends TestCase
{
    private mixed $previousApp;

    protected function setUp(): void
    {
        $this->previousApp = \Craft::$app;
        $app = $this->createMock(Application::class);
        $app->method('getTimeZone')->willReturn('America/Winnipeg');
        $app->method('getFormattingLocale')->willReturn(new Locale('en-US'));
        $i18n = $this->createMock(I18N::class);
        $i18n->method('translate')->willReturnCallback(static fn ($category, $message, $params) => strtr($message, array_combine(
            array_map(static fn ($key) => '{'.$key.'}', array_keys($params)),
            array_values($params),
        )));
        $app->method('getI18n')->willReturn($i18n);
        $formatter = $this->createMock(Formatter::class);
        $formatter->method('asDatetime')->willReturnCallback(static fn ($date) => $date->format('Y-m-d H:i:s'));
        $app->method('getFormatter')->willReturn($formatter);
        $app->method('getRequest')->willReturn($this->createMock(Request::class));
        $sites = $this->createMock(Sites::class);
        $sites->method('getCurrentSite')->willReturn(new Site(['id' => 1]));
        $app->method('getSites')->willReturn($sites);
        \Craft::$app = $app;
        DateTimeHelper::pause(new \DateTime('2026-10-09 19:00:00', new \DateTimeZone('UTC')));
    }

    protected function tearDown(): void
    {
        DateTimeHelper::resume();
        \Craft::$app = $this->previousApp;
    }

    public function testExpiryChangesStatusWithoutDisablingOrResaving(): void
    {
        $event = $this->event();
        $event->expiryDate = new \DateTime('2026-10-09 14:00:00', new \DateTimeZone('America/Winnipeg'));

        self::assertSame(Event::STATUS_EXPIRED, $event->getStatus());
        self::assertTrue($event->enabled);
        $event->expiryDate->modify('+1 second');
        self::assertSame(Event::STATUS_LIVE, $event->getStatus());
        DateTimeHelper::resume();
        DateTimeHelper::pause(new \DateTime('2026-10-09 19:00:01', new \DateTimeZone('UTC')));
        self::assertSame(Event::STATUS_EXPIRED, $event->getStatus());

        $event->expiryDate = null;
        self::assertSame(Event::STATUS_LIVE, $event->getStatus());
    }

    public function testPostDateAndBaseStatusesTakePrecedence(): void
    {
        $event = $this->event();
        $event->postDate = new Carbon('2026-10-10 00:00:00', 'UTC');
        self::assertSame(Event::STATUS_PENDING, $event->getStatus());
        $event->postDate = null;
        self::assertSame(Event::STATUS_PENDING, $event->getStatus());
        $event->enabled = false;
        self::assertSame(Event::STATUS_DISABLED, $event->getStatus());
        $event->enabled = true;
        $event->enabledForSite = false;
        self::assertSame(Event::STATUS_DISABLED, $event->getStatus());
        $event->draftId = 2;
        self::assertSame(Event::STATUS_DRAFT, $event->getStatus());
    }

    public function testNativeDateInputsAreTimezoneAwareAndCanBeCleared(): void
    {
        $event = $this->event();
        $input = ['date' => '10/10/2026', 'time' => '2:30 PM', 'timezone' => 'America/Winnipeg'];
        $event->setAttributesFromRequest(['postDate' => $input, 'expiryDate' => $input]);
        self::assertInstanceOf(Carbon::class, $event->postDate);
        self::assertSame('2026-10-10 19:30:00', $event->expiryDate->setTimezone(new \DateTimeZone('UTC'))->format('Y-m-d H:i:s'));
        self::assertEquals($event->postDate, $event->expiryDate);
        $event->setAttributesFromRequest([]);
        self::assertNotNull($event->expiryDate);
        $event->setAttributesFromRequest(['expiryDate' => ['date' => '', 'time' => '']]);
        self::assertNull($event->expiryDate);
    }

    public function testLiveValidationRequiresExpiryAfterPostDateButDraftsCanKeepIncompleteValues(): void
    {
        $event = $this->event();
        $event->setScenario(Event::SCENARIO_LIVE);
        $event->expiryDate = clone $event->postDate;
        self::assertFalse($event->validate(['postDate', 'expiryDate']));
        self::assertTrue($event->hasErrors('postDate'));
        $event->expiryDate->modify('+1 second');
        self::assertTrue($event->validate(['postDate', 'expiryDate']));
        $event->expiryDate->modify('-1 day');
        $event->setScenario(Event::SCENARIO_ESSENTIALS);
        self::assertTrue($event->validate(['postDate', 'expiryDate']));
    }

    /**
     * @dataProvider expiryPersistenceProvider
     */
    public function testSavingExpiryUsesDatabaseDateFormat(bool $isNew, ?\DateTime $expiry, ?string $expected): void
    {
        $event = $this->event();
        $event->id = 42;
        $event->expiryDate = $expiry;
        $original = $expiry ? clone $expiry : null;
        $command = $this->createMock(Command::class);
        $command->expects(self::once())->method($isNew ? 'insert' : 'update')->with(
            Event::TABLE,
            self::callback(static function (array $data) use ($expected): bool {
                $column = new ColumnSchema(['type' => 'datetime', 'phpType' => 'string']);
                self::assertSame($expected, $column->dbTypecast($data['expiryDate']));
                self::assertSame($expected, $data['expiryDate']);

                return true;
            }),
        )->willReturnSelf();
        $command->expects(self::once())->method('execute')->willReturn(1);
        $db = $this->createMock(Connection::class);
        $db->method('createCommand')->willReturn($command);
        \Craft::$app->method('__get')->with('db')->willReturn($db);

        $event->afterSave($isNew);

        self::assertEquals($original, $event->expiryDate);
        if ($expiry) {
            self::assertSame($original->getTimezone()->getName(), $expiry->getTimezone()->getName());
        }
    }

    public static function expiryPersistenceProvider(): array
    {
        $cases = [];
        foreach ([true, false] as $isNew) {
            $operation = $isNew ? 'insert' : 'update';
            $cases[$operation.' UTC'] = [$isNew, new \DateTime('2026-10-10 19:30:00', new \DateTimeZone('UTC')), '2026-10-10 19:30:00'];
            $cases[$operation.' local time'] = [$isNew, new \DateTime('2026-10-10 14:30:00', new \DateTimeZone('America/Winnipeg')), '2026-10-10 19:30:00'];
            $cases[$operation.' Carbon'] = [$isNew, new Carbon('2026-10-10 14:30:00', 'America/Winnipeg'), '2026-10-10 19:30:00'];
            $cases[$operation.' no expiry'] = [$isNew, null, null];
        }

        return $cases;
    }

    public function testBlankPostDateDefaultsOnPublicationAndLeavesExpiredEventsExpired(): void
    {
        $event = $this->event();
        $event->postDate = null;
        $event->beforeValidate();
        self::assertSame('2026-10-09 19:00:00', $event->postDate->utc()->format('Y-m-d H:i:s'));
        $event->postDate = null;
        $event->expiryDate = new \DateTime('2026-10-08 00:00:00', new \DateTimeZone('UTC'));
        $event->beforeValidate();
        self::assertLessThan($event->expiryDate, $event->postDate);
        self::assertSame(Event::STATUS_EXPIRED, $event->getStatus());
    }

    public function testExpiryParticipatesInCraftCacheExpiration(): void
    {
        $event = $this->event();
        self::assertInstanceOf(ExpirableElementInterface::class, $event);
        self::assertNull($event->getExpiryDate());
        $event->expiryDate = new \DateTime('2026-11-01 00:00:00', new \DateTimeZone('UTC'));
        self::assertSame($event->expiryDate, $event->getExpiryDate());
    }

    public function testUnpublishedEventUrlsAreUnavailableExceptWhenPreviewing(): void
    {
        $event = $this->event();
        $route = new \ReflectionMethod(Event::class, 'route');
        self::assertSame('templates/render', $route->invoke($event)[0]);
        $event->expiryDate = new \DateTime('2026-10-08 00:00:00', new \DateTimeZone('UTC'));
        self::assertNull($route->invoke($event));
        $event->previewing = true;
        self::assertSame('templates/render', $route->invoke($event)[0]);
        $event->previewing = false;
        $event->expiryDate = null;
        $event->postDate = new Carbon('2026-10-10 00:00:00', 'UTC');
        self::assertNull($route->invoke($event));
    }

    private function event(): Event
    {
        $event = $this->getMockBuilder(Event::class)
            ->disableOriginalConstructor()
            ->onlyMethods(['getSite', 'getFieldLayout', 'getCalendar', 'behaviors'])
            ->getMock()
        ;
        $event->method('getSite')->willReturn(new Site(['id' => 1, 'language' => 'en-US']));
        $event->method('getFieldLayout')->willReturn(null);
        $event->method('behaviors')->willReturn([]);
        $calendar = $this->createMock(CalendarModel::class);
        $calendar->method('getSiteSettingsForSite')->willReturn(new CalendarSiteSettingsModel(['hasUrls' => true, 'template' => 'events/event']));
        $event->method('getCalendar')->willReturn($calendar);
        $event->enabled = true;
        $event->enabledForSite = true;
        $event->postDate = new Carbon('2026-10-01 00:00:00', 'UTC');

        return $event;
    }
}
