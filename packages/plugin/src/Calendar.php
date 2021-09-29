<?php

namespace Solspace\Calendar;

use Composer\Autoload\ClassMapGenerator;
use craft\base\Plugin;
use craft\events\RegisterComponentTypesEvent;
use craft\events\RegisterUrlRulesEvent;
use craft\events\RegisterUserPermissionsEvent;
use craft\helpers\StringHelper;
use craft\services\Dashboard;
use craft\services\Elements;
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
use Solspace\Calendar\Controllers\LegacyEventsController;
use Solspace\Calendar\Controllers\ResourcesController;
use Solspace\Calendar\Controllers\SettingsController;
use Solspace\Calendar\Controllers\ViewController;
use Solspace\Calendar\FieldTypes\CalendarFieldType;
use Solspace\Calendar\FieldTypes\EventFieldType;
use Solspace\Calendar\Library\Bundles\BundleInterface;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Calendar\Models\CalendarSiteSettingsModel;
use Solspace\Calendar\Models\SettingsModel;
use Solspace\Calendar\Resources\Bundles\MainAssetBundle;
use Solspace\Calendar\Services\CalendarSitesService;
use Solspace\Calendar\Services\CalendarsService;
use Solspace\Calendar\Services\EventsService;
use Solspace\Calendar\Services\ExceptionsService;
use Solspace\Calendar\Services\FormatsService;
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
use yii\web\ForbiddenHttpException;

/**
 * Class Calendar.
 *
 * @property CalendarsService     $calendars
 * @property CalendarSitesService $calendarSites
 * @property EventsService        $events
 * @property ExceptionsService    $exceptions
 * @property SelectDatesService   $selectDates
 * @property SettingsService      $settings
 * @property ViewDataService      $viewData
 * @property FormatsService       $formats
 */
class Calendar extends Plugin
{
    const TRANSLATION_CATEGORY = 'calendar';

    const FIELD_LAYOUT_TYPE = 'Calendar_Event';

    const VIEW_MONTH = 'month';
    const VIEW_WEEK = 'week';
    const VIEW_DAY = 'day';
    const VIEW_EVENTS = 'events';
    const VIEW_CALENDARS = 'calendars';
    const VIEW_RESOURCES = 'resources';

    const PERMISSION_CALENDARS = 'calendar-manageCalendars';
    const PERMISSION_CREATE_CALENDARS = 'calendar-createCalendars';
    const PERMISSION_EDIT_CALENDARS = 'calendar-editCalendars';
    const PERMISSION_DELETE_CALENDARS = 'calendar-deleteCalendars';
    const PERMISSION_EVENTS = 'calendar-manageEvents';
    const PERMISSION_EVENTS_FOR = 'calendar-manageEventsFor';
    const PERMISSION_EVENTS_FOR_ALL = 'calendar-manageEventsFor:all';
    const PERMISSION_SETTINGS = 'calendar-settings';
    const PERMISSION_RESOURCES = 'calendar-resources';

    const PERMISSIONS_HELP_LINK = 'https://docs.solspace.com/craft/calendar/v2/setup/demo-templates.html';

    const EDITION_LITE = 'lite';
    const EDITION_PRO = 'pro';

    const CONFIG_PATH_ROOT = 'solspace.calendar';
    const CONFIG_CALENDAR_PATH = 'solspace.calendar.calendars';
    const CONFIG_CALENDAR_SITES_PATH = 'solspace.calendar.calendar-sites';

    /** @var bool */
    public $hasCpSettings = true;

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
        'Today',
    ];

    /**
     * Includes CSS and JS files
     * Registers custom class auto-loader.
     */
    public function init()
    {
        parent::init();

        $this->initControllers();
        $this->initServices();
        $this->initRoutes();
        $this->initTemplateVariables();
        $this->initWidgets();
        $this->initFieldTypes();
        $this->initEventListeners();
        $this->initPermissions();
        $this->initBundles();

        if ($this->isPro() && $this->settings->getPluginName()) {
            $this->name = $this->settings->getPluginName();
        } else {
            $this->name = 'Calendar';
        }

        if (\Craft::$app->request->getIsCpRequest()) {
            \Craft::$app->view->registerTranslations(self::TRANSLATION_CATEGORY, self::$javascriptTranslationKeys);
        }

        if (\Craft::$app->request->getIsSiteRequest()) {
            $extension = new CalendarTwigExtension();
            \Craft::$app->view->registerTwigExtension($extension);
        }

        if (
            \Craft::$app->request->isCpRequest
            && !\Craft::$app->request->isActionRequest
            && 'calendar' === \Craft::$app->request->getSegment(1)
        ) {
            \Craft::$app->view->registerAssetBundle(MainAssetBundle::class);
        }
    }

    /**
     * {@inheritDoc}
     */
    public static function editions(): array
    {
        return [
            self::EDITION_LITE,
            self::EDITION_PRO,
        ];
    }

    /**
     * @param string $language
     */
    public static function t(string $message, array $params = [], string $language = null): string
    {
        return \Craft::t(self::TRANSLATION_CATEGORY, $message, $params, $language);
    }

    public function isPro(): bool
    {
        return self::EDITION_PRO === $this->edition;
    }

    public function isLite(): bool
    {
        return !$this->isPro();
    }

    /**
     * @throws ForbiddenHttpException
     */
    public function requirePro()
    {
        if (!$this->isPro()) {
            throw new ForbiddenHttpException(self::t('Requires Calendar Pro'));
        }
    }

    /**
     * On install - insert a default calendar.
     */
    public function afterInstall()
    {
        $installed = null !== \Craft::$app->projectConfig->get('plugins.calendar', true);
        $configExists = null !== \Craft::$app->projectConfig->get('solspace.calendar', true);

        if ($installed || $configExists) {
            return;
        }

        $calendarsService = self::getInstance()->calendars;
        $siteIds = \Craft::$app->sites->getAllSiteIds();

        $defaultCalendar = CalendarModel::create();
        $defaultCalendar->name = 'Default';
        $defaultCalendar->handle = 'default';
        $defaultCalendar->description = 'The default calendar';
        $defaultCalendar->hasTitleField = true;
        $defaultCalendar->titleLabel = 'Title';

        $siteSettings = [];
        foreach ($siteIds as $siteId) {
            $siteSetting = new CalendarSiteSettingsModel();
            $siteSetting->uid = StringHelper::UUID();
            $siteSetting->calendarId = $defaultCalendar->id;
            $siteSetting->siteId = $siteId;
            $siteSetting->enabledByDefault = true;

            $siteSettings[] = $siteSetting;
        }

        $defaultCalendar->setSiteSettings($siteSettings);

        $calendarsService->saveCalendar($defaultCalendar, false);
    }

    /**
     * @return Calendar|Plugin
     */
    public static function getInstance(): self
    {
        return parent::getInstance();
    }

    /**
     * @return null|array
     */
    public function getCpNavItem()
    {
        $navItem = parent::getCpNavItem();
        $navItem['subnav'] = include __DIR__.'/subnav.php';

        return $navItem;
    }

    protected function afterUninstall()
    {
        \Craft::$app->projectConfig->remove(self::CONFIG_PATH_ROOT);
        \Craft::$app->fields->deleteLayoutsByType(\Solspace\Calendar\Elements\Event::class);
    }

    protected function createSettingsModel(): SettingsModel
    {
        return new SettingsModel();
    }

    protected function settingsHtml(): string
    {
        return \Craft::$app->getView()->renderTemplate(
            'calendar/settings',
            [
                'settings' => $this->getSettings(),
            ]
        );
    }

    private function initControllers()
    {
        if (!\Craft::$app->request->isConsoleRequest) {
            $this->controllerMap = [
                'api' => ApiController::class,
                'codepack' => CodePackController::class,
                'calendars' => CalendarsController::class,
                'events-api' => EventsApiController::class,
                'events' => EventsController::class,
                'legacy-events' => LegacyEventsController::class,
                'settings' => SettingsController::class,
                'view' => ViewController::class,
                'resources' => ResourcesController::class,
            ];
        } else {
            $this->controllerNamespace = 'Solspace\\Calendar\\Console\\Controllers';
        }
    }

    private function initServices()
    {
        $this->setComponents(
            [
                'calendars' => CalendarsService::class,
                'calendarSites' => CalendarSitesService::class,
                'events' => EventsService::class,
                'exceptions' => ExceptionsService::class,
                'selectDates' => SelectDatesService::class,
                'settings' => SettingsService::class,
                'viewData' => ViewDataService::class,
                'formats' => FormatsService::class,
            ]
        );
    }

    private function initRoutes()
    {
        Event::on(
            UrlManager::class,
            UrlManager::EVENT_REGISTER_CP_URL_RULES,
            function (RegisterUrlRulesEvent $event) {
                $routes = include __DIR__.'/routes.php';
                $event->rules = array_merge($event->rules, $routes);
            }
        );
    }

    private function initTemplateVariables()
    {
        Event::on(
            CraftVariable::class,
            CraftVariable::EVENT_INIT,
            function (Event $event) {
                $event->sender->set('calendar', CalendarVariable::class);
            }
        );
    }

    private function initWidgets()
    {
        if ($this->isPro()) {
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
        }
    }

    private function initFieldTypes()
    {
        Event::on(
            Fields::class,
            Fields::EVENT_REGISTER_FIELD_TYPES,
            function (RegisterComponentTypesEvent $event) {
                $event->types[] = EventFieldType::class;
                $event->types[] = CalendarFieldType::class;
            }
        );
    }

    private function initEventListeners()
    {
        Event::on(Sites::class, Sites::EVENT_AFTER_SAVE_SITE, [$this->events, 'addSiteHandler']);
        Event::on(Sites::class, Sites::EVENT_AFTER_SAVE_SITE, [$this->calendars, 'addSiteHandler']);
        Event::on(Elements::class, Elements::EVENT_BEFORE_DELETE_ELEMENT, [$this->events, 'transferUserEvents']);
    }

    private function initPermissions()
    {
        if (\Craft::$app->getEdition() >= \Craft::Pro) {
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
                        $suffix = ':'.$calendar->uid;

                        $editEventsPermissions[self::PERMISSION_EVENTS_FOR.$suffix] = [
                            'label' => self::t('"{name}" calendar', ['name' => $calendar->name]),
                        ];
                    }

                    $event->permissions[$this->name] = [
                        self::PERMISSION_CALENDARS => [
                            'label' => self::t('Administrate Calendars'),
                            'nested' => [
                                self::PERMISSION_CREATE_CALENDARS => [
                                    'label' => self::t(
                                        'Create Calendars'
                                    ),
                                ],
                                self::PERMISSION_EDIT_CALENDARS => [
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
                        self::PERMISSION_EVENTS => [
                            'label' => self::t('Manage events in'),
                            'nested' => $editEventsPermissions,
                        ],
                        self::PERMISSION_SETTINGS => ['label' => self::t('Access Settings')],
                        self::PERMISSION_RESOURCES => ['label' => self::t('Access Resources')],
                    ];
                }
            );
        }
    }

    private function initBundles()
    {
        static $initialized;

        if (null === $initialized) {
            $classMap = ClassMapGenerator::createMap(__DIR__.'/Bundles');
            foreach ($classMap as $class => $path) {
                $reflectionClass = new \ReflectionClass($class);
                if (
                    $reflectionClass->implementsInterface(BundleInterface::class)
                    && !$reflectionClass->isAbstract()
                    && !$reflectionClass->isInterface()
                ) {
                    $reflectionClass->newInstance();
                }
            }

            $initialized = true;
        }
    }
}
