<?php

namespace Solspace\Calendar;

use craft\base\Plugin;
use craft\events\RegisterComponentTypesEvent;
use craft\events\RegisterUrlRulesEvent;
use craft\events\RegisterUserPermissionsEvent;
use craft\services\Dashboard;
use craft\services\Fields;
use craft\services\Sites;
use craft\services\UserPermissions;
use craft\web\twig\variables\CraftVariable;
use craft\web\UrlManager;
use Solspace\Calendar\Controllers\ApiController;
use Solspace\Calendar\Controllers\CalendarsController;
use Solspace\Calendar\Controllers\CodePackController;
use Solspace\Calendar\Controllers\EventsApiController;
use Solspace\Calendar\Controllers\EventsController;
use Solspace\Calendar\Controllers\SettingsController;
use Solspace\Calendar\Controllers\ViewController;
use Solspace\Calendar\FieldTypes\EventFieldType;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Calendar\Models\CalendarSiteSettingsModel;
use Solspace\Calendar\Models\SettingsModel;
use Solspace\Calendar\Resources\Bundles\MainAssetBundle;
use Solspace\Calendar\Services\CalendarsService;
use Solspace\Calendar\Services\EventsService;
use Solspace\Calendar\Services\ExceptionsService;
use Solspace\Calendar\Services\SelectDatesService;
use Solspace\Calendar\Services\SettingsService;
use Solspace\Calendar\Services\ViewDataService;
use Solspace\Calendar\Twig\Extensions\CalendarTwigExtension;
use Solspace\Calendar\Variables\CalendarVariable;
use Solspace\Calendar\Widgets\AgendaWidget;
use Solspace\Calendar\Widgets\EventWidget;
use Solspace\Calendar\Widgets\MonthWidget;
use Solspace\Calendar\Widgets\UpcomingEventsWidget;
use yii\base\Event;

/**
 * Class Calendar
 *
 * @property CalendarsService   $calendars
 * @property EventsService      $events
 * @property ExceptionsService  $exceptions
 * @property SelectDatesService $selectDates
 * @property SettingsService    $settings
 * @property ViewDataService    $viewData
 */
class Calendar extends Plugin
{
    const TRANSLATION_CATEGORY = 'calendar';

    const FIELD_LAYOUT_TYPE = 'Calendar_Event';

    const VIEW_MONTH     = 'month';
    const VIEW_WEEK      = 'week';
    const VIEW_DAY       = 'day';
    const VIEW_EVENTS    = 'events';
    const VIEW_CALENDARS = 'calendars';

    const PERMISSION_CALENDARS        = 'calendar-manageCalendars';
    const PERMISSION_CREATE_CALENDARS = 'calendar-createCalendars';
    const PERMISSION_EDIT_CALENDARS   = 'calendar-editCalendars';
    const PERMISSION_DELETE_CALENDARS = 'calendar-deleteCalendars';
    const PERMISSION_EVENTS           = 'calendar-manageEvents';
    const PERMISSION_EVENTS_FOR       = 'calendar-manageEventsFor';
    const PERMISSION_EVENTS_FOR_ALL   = 'calendar-manageEventsFor:all';
    const PERMISSION_SETTINGS         = 'calendar-settings';

    const PERMISSIONS_HELP_LINK = 'https://solspace.com/craft/calendar/docs/demo-templates';

    /** @var array */
    private static $javascriptTranslationKeys = [
        'Couldn’t save event.',
        'Event saved.',
        'Refresh',
        'New Event',
        'Starts',
        'Ends',
        'Repeats',
        'Edit',
        'Delete',
        'Delete occurrence',
        'Are you sure?',
        'Are you sure you want to delete this event?',
        'Couldn’t save event.',
        'Are you sure you want to enable ICS sharing for this calendar?',
        'Are you sure you want to disable ICS sharing for this calendar?',
    ];

    /** @var bool */
    public $hasCpSettings = true;

    /**
     * Includes CSS and JS files
     * Registers custom class auto-loader
     */
    public function init()
    {
        parent::init();

        if (!\Craft::$app->request->isConsoleRequest) {
            $this->controllerMap = [
                'api'        => ApiController::class,
                'codepack'   => CodePackController::class,
                'calendars'  => CalendarsController::class,
                'events-api' => EventsApiController::class,
                'events'     => EventsController::class,
                'settings'   => SettingsController::class,
                'view'       => ViewController::class,
            ];
        }

        $this->setComponents(
            [
                'calendars'   => CalendarsService::class,
                'events'      => EventsService::class,
                'exceptions'  => ExceptionsService::class,
                'selectDates' => SelectDatesService::class,
                'settings'    => SettingsService::class,
                'viewData'    => ViewDataService::class,
            ]
        );

        Event::on(
            UrlManager::class,
            UrlManager::EVENT_REGISTER_CP_URL_RULES,
            function (RegisterUrlRulesEvent $event) {
                $routes       = include __DIR__ . '/routes.php';
                $event->rules = array_merge($event->rules, $routes);
            }
        );

        Event::on(
            CraftVariable::class,
            CraftVariable::EVENT_INIT,
            function (Event $event) {
                $event->sender->set('calendar', CalendarVariable::class);
            }
        );

        Event::on(
            Dashboard::class,
            Dashboard::EVENT_REGISTER_WIDGET_TYPES,
            function (RegisterComponentTypesEvent $event) {
                $event->types[] = AgendaWidget::class;
                $event->types[] = EventWidget::class;
                $event->types[] = MonthWidget::class;
                $event->types[] = UpcomingEventsWidget::class;
            }
        );

        Event::on(
            Fields::class,
            Fields::EVENT_REGISTER_FIELD_TYPES,
            function (RegisterComponentTypesEvent $event) {
                $event->types[] = EventFieldType::class;
            }
        );

        // craft()->on('i18n.onAddLocale', [craft()->calendar_events, 'addLocaleHandler']);
        // craft()->on('i18n.onAddLocale', [craft()->calendar_calendars, 'addLocaleHandler']);

        Event::on(Sites::class, Sites::EVENT_AFTER_SAVE_SITE, [$this->events, 'addSiteHandler']);
        Event::on(Sites::class, Sites::EVENT_AFTER_SAVE_SITE, [$this->calendars, 'addSiteHandler']);

        if (\Craft::$app->request->getIsCpRequest() && \Craft::$app->getUser()->getId()) {
            \Craft::$app->view->registerTranslations(self::TRANSLATION_CATEGORY, self::$javascriptTranslationKeys);
        }


        if (\Craft::$app->getEdition() >= \Craft::Client) {
            Event::on(
                UserPermissions::class,
                UserPermissions::EVENT_REGISTER_PERMISSIONS,
                function (RegisterUserPermissionsEvent $event) {
                    $calendars = $this->calendars->getAllCalendars();

                    $editEventsPermissions = [
                        self::PERMISSION_EVENTS_FOR_ALL => [
                            'label' => self::t('All calendars'),
                        ],
                    ];
                    foreach ($calendars as $calendar) {
                        $suffix = ':' . $calendar->id;

                        $editEventsPermissions[self::PERMISSION_EVENTS_FOR . $suffix] = [
                            'label' => self::t('"{name}" calendar', ['name' => $calendar->name]),
                        ];
                    }

                    $event->permissions[$this->name] = [
                        self::PERMISSION_CALENDARS => [
                            'label'  => self::t('Administrate Calendars'),
                            'nested' => [
                                self::PERMISSION_CREATE_CALENDARS => [
                                    'label' => self::t(
                                        'Create Calendars'
                                    ),
                                ],
                                self::PERMISSION_EDIT_CALENDARS   => [
                                    'label' => self::t(
                                        'Edit Calendars'
                                    ),
                                ],
                                self::PERMISSION_DELETE_CALENDARS => [
                                    'label' => self::t(
                                        'Delete Calendars'
                                    ),
                                ],
                            ],
                        ],
                        self::PERMISSION_EVENTS    => [
                            'label'  => self::t('Manage events in'),
                            'nested' => $editEventsPermissions,
                        ],
                        self::PERMISSION_SETTINGS  => ['label' => self::t('Settings')],
                    ];
                }
            );
        }


        if (\Craft::$app->request->getIsSiteRequest()) {
            $extension = new CalendarTwigExtension();
            \Craft::$app->view->registerTwigExtension($extension);
        }

        if (\Craft::$app->request->isCpRequest) {
            \Craft::$app->view->registerAssetBundle(MainAssetBundle::class);
        }
    }

    /**
     * @param string $message
     * @param array  $params
     * @param string $language
     *
     * @return string
     */
    public static function t(string $message, array $params = [], string $language = null): string
    {
        return \Craft::t(self::TRANSLATION_CATEGORY, $message, $params, $language);
    }

    /**
     * On install - insert a default calendar
     *
     * @return void
     */
    public function afterInstall()
    {
        $calendarsService = self::getInstance()->calendars;
        $siteIds          = \Craft::$app->sites->getAllSiteIds();

        $siteSettings = [];
        foreach ($siteIds as $siteId) {
            $siteSetting                   = new CalendarSiteSettingsModel();
            $siteSetting->siteId           = $siteId;
            $siteSetting->enabledByDefault = true;

            $siteSettings[] = $siteSetting;
        }

        $defaultCalendar                = CalendarModel::create();
        $defaultCalendar->name          = 'Default';
        $defaultCalendar->handle        = 'default';
        $defaultCalendar->description   = 'The default calendar';
        $defaultCalendar->hasTitleField = true;
        $defaultCalendar->titleLabel    = 'Title';
        $defaultCalendar->setSiteSettings($siteSettings);

        $calendarsService->saveCalendar($defaultCalendar, false);
    }

    /**
     * @return Plugin|Calendar
     */
    public static function getInstance(): Calendar
    {
        return parent::getInstance();
    }

    /**
     * @return array|null
     */
    public function getCpNavItem()
    {
        $navItem           = parent::getCpNavItem();
        $navItem['subnav'] = include __DIR__ . '/subnav.php';

        return $navItem;
    }

    /**
     * @return SettingsModel
     */
    protected function createSettingsModel(): SettingsModel
    {
        return new SettingsModel();
    }

    /**
     * @return string
     */
    protected function settingsHtml(): string
    {
        return \Craft::$app->getView()->renderTemplate(
            'calendar/settings',
            [
                'settings' => $this->getSettings(),
            ]
        );
    }
}
