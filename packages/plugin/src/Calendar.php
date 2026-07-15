<?php

namespace Solspace\Calendar;

use Composer\ClassMapGenerator\ClassMapGenerator;
use craft\base\Model;
use craft\base\Plugin;
use craft\events\RegisterComponentTypesEvent;
use craft\events\RegisterUrlRulesEvent;
use craft\events\RegisterUserPermissionsEvent;
use craft\helpers\StringHelper;
use craft\models\FieldLayout;
use craft\models\FieldLayoutTab;
use craft\services\Dashboard;
use craft\services\Elements;
use craft\services\Fields;
use craft\services\Gc;
use craft\services\Sites;
use craft\services\UserPermissions;
use craft\web\twig\variables\CraftVariable;
use craft\web\UrlManager;
use Solspace\Calendar\Elements\Event as CalendarEvent;
use Solspace\Calendar\FieldTypes\CalendarFieldType;
use Solspace\Calendar\FieldTypes\EventFieldType;
use Solspace\Calendar\Library\Bundles\BundleInterface;
use Solspace\Calendar\Models\CalendarModel;
use Solspace\Calendar\Models\CalendarSiteSettingsModel;
use Solspace\Calendar\Models\SettingsModel;
use Solspace\Calendar\Resources\Bundles\MainAssetBundle;
use Solspace\Calendar\Services\CalendarSitesService;
use Solspace\Calendar\Services\CalendarsService;
use Solspace\Calendar\Services\ClientAssetsService;
use Solspace\Calendar\Services\EventsService;
use Solspace\Calendar\Services\ExceptionsService;
use Solspace\Calendar\Services\SelectDatesService;
use Solspace\Calendar\Services\SettingsService;
use Solspace\Calendar\Services\ViewDataService;
use Solspace\Calendar\Twig\Extensions\CalendarGlobalExtension;
use Solspace\Calendar\Twig\Extensions\CalendarTwigExtension;
use Solspace\Calendar\Variables\CalendarVariable;
use Solspace\Calendar\Widgets\AgendaWidget;
use Solspace\Calendar\Widgets\EventWidget;
use Solspace\Calendar\Widgets\MiniWidget;
use Solspace\Calendar\Widgets\UpcomingEventsWidget;
use yii\base\Event;
use yii\web\ForbiddenHttpException;

/**
 * Class Calendar.
 *
 * @property CalendarsService     $calendars
 * @property CalendarSitesService $calendarSites
 * @property ClientAssetsService  $clientAssets
 * @property EventsService        $events
 * @property ExceptionsService    $exceptions
 * @property SelectDatesService   $selectDates
 * @property SettingsService      $settings
 * @property ViewDataService      $viewData
 */
class Calendar extends Plugin
{
    public const TRANSLATION_CATEGORY = 'calendar';

    public const FIELD_LAYOUT_TYPE = 'Calendar_Event';

    public const VIEW_DASHBOARD = 'dashboard';
    public const VIEW_EVENTS = 'events';
    public const VIEW_CALENDARS = 'calendars';
    public const VIEW_RESOURCES = 'resources';

    public const PERMISSION_CALENDARS_ACCESS = 'calendar-calendarsAccess';
    public const PERMISSION_CALENDARS_CREATE = 'calendar-calendarsCreate';
    public const PERMISSION_CALENDARS_DELETE = 'calendar-calendarsDelete';
    public const PERMISSION_CALENDARS_MANAGE = 'calendar-calendarsManage';
    public const PERMISSION_CALENDARS_MANAGE_INDIVIDUAL = 'calendar-calendarsManageIndividual';
    public const PERMISSION_EVENTS_ACCESS = 'calendar-eventsAccess';
    public const PERMISSION_EVENTS_READ = 'calendar-eventsRead';
    public const PERMISSION_EVENTS_READ_INDIVIDUAL = 'calendar-eventsReadIndividual';
    public const PERMISSION_EVENTS_MANAGE = 'calendar-eventsManage';
    public const PERMISSION_EVENTS_MANAGE_INDIVIDUAL = 'calendar-eventsManageIndividual';
    public const PERMISSION_CALENDARS = self::PERMISSION_CALENDARS_ACCESS;
    public const PERMISSION_CREATE_CALENDARS = self::PERMISSION_CALENDARS_CREATE;
    public const PERMISSION_EDIT_CALENDARS = self::PERMISSION_CALENDARS_MANAGE;
    public const PERMISSION_EDIT_CALENDARS_INDIVIDUAL = self::PERMISSION_CALENDARS_MANAGE_INDIVIDUAL;
    public const PERMISSION_DELETE_CALENDARS = self::PERMISSION_CALENDARS_DELETE;
    public const PERMISSION_EVENTS = self::PERMISSION_EVENTS_ACCESS;
    public const PERMISSION_EVENTS_FOR = self::PERMISSION_EVENTS_MANAGE_INDIVIDUAL;
    public const PERMISSION_EVENTS_FOR_ALL = self::PERMISSION_EVENTS_MANAGE;
    public const LEGACY_PERMISSION_CALENDARS = 'calendar-manageCalendars';
    public const LEGACY_PERMISSION_CREATE_CALENDARS = 'calendar-createCalendars';
    public const LEGACY_PERMISSION_EDIT_CALENDARS = 'calendar-editCalendars';
    public const LEGACY_PERMISSION_EDIT_CALENDARS_INDIVIDUAL = 'calendar-editCalendarsIndividual';
    public const LEGACY_PERMISSION_DELETE_CALENDARS = 'calendar-deleteCalendars';
    public const LEGACY_PERMISSION_EVENTS = 'calendar-manageEvents';
    public const LEGACY_PERMISSION_EVENTS_READ = 'calendar-readEvents';
    public const LEGACY_PERMISSION_EVENTS_READ_INDIVIDUAL = 'calendar-readEventsIndividual';
    public const LEGACY_PERMISSION_EVENTS_FOR = 'calendar-manageEventsFor';
    public const LEGACY_PERMISSION_EVENTS_FOR_ALL = 'calendar-manageEventsFor:all';
    public const PERMISSION_SETTINGS = 'calendar-settings';
    public const PERMISSION_RESOURCES = 'calendar-resources';

    public const PERMISSIONS_HELP_LINK = 'https://docs.solspace.com/craft/calendar/v5/configuration/demo-templates/';

    public const EDITION_LITE = 'lite';
    public const EDITION_PRO = 'pro';

    public const CONFIG_PATH_ROOT = 'solspace.calendar';
    public const CONFIG_CALENDAR_PATH = 'solspace.calendar.calendars';
    public const CONFIG_CALENDAR_SITES_PATH = 'solspace.calendar.calendar-sites';

    public string $schemaVersion = '';

    public bool $hasCpSettings = true;

    /**
     * Includes CSS and JS files
     * Registers custom class auto-loader.
     */
    public function init(): void
    {
        parent::init();
        \Yii::setAlias('@calendar', __DIR__);

        $this->initControllers();
        $this->initServices();
        $this->initRoutes();
        $this->initTemplateVariables();
        $this->initWidgets();
        $this->initFieldTypes();
        $this->initElementTypes();
        $this->initEventListeners();
        $this->initPermissions();
        $this->initBundles();

        if ($this->isPro() && $this->settings->getPluginName()) {
            $this->name = $this->settings->getPluginName();
        } else {
            $this->name = 'Calendar';
        }

        if (\Craft::$app->request->getIsCpRequest()) {
            $translations = include __DIR__.'/translations/en-US/calendar.php';
            $translations = array_keys($translations);

            \Craft::$app->view->registerTranslations(self::TRANSLATION_CATEGORY, $translations);
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

        if (method_exists(Gc::class, 'deleteOrphanedFieldLayouts')) {
            Event::on(Gc::class, Gc::EVENT_RUN, static function (Event $event) {
                /** @var Gc $gc */
                $gc = $event->sender;
                $gc->deleteOrphanedFieldLayouts(
                    CalendarEvent::class,
                    '{{%calendar_calendars}}',
                );
            });
        }
    }

    public static function editions(): array
    {
        return [
            self::EDITION_LITE,
            self::EDITION_PRO,
        ];
    }

    public static function t(string $message, array $params = [], ?string $language = null): string
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

    public function requirePro(): void
    {
        if (!$this->isPro()) {
            throw new ForbiddenHttpException(self::t('Requires Calendar Pro'));
        }
    }

    public function beforeInstall(): void
    {
        parent::beforeInstall();

        $projectConfig = \Craft::$app->getProjectConfig();
        $composerPluginInfo = \Craft::$app->getPlugins()->getComposerPluginInfo('calendar');
        $schemaVersion = $projectConfig->get('plugins.calendar.extra.schemaVersion') ?? $composerPluginInfo['schemaVersion'];

        $this->schemaVersion ??= $schemaVersion;
    }

    /**
     * On install - insert a default calendar.
     */
    public function afterInstall(): void
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
        $defaultCalendar->setFieldLayout($this->createDefaultCalendarFieldLayout());

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
    public static function getInstance(): ?self
    {
        return parent::getInstance();
    }

    public function getCpNavItem(): ?array
    {
        $navItem = parent::getCpNavItem();
        $navItem['subnav'] = include __DIR__.'/subnav.php';
        $navItem['url'] = 'calendar/default-view';

        return $navItem;
    }

    protected function afterUninstall(): void
    {
        \Craft::$app->projectConfig->remove(self::CONFIG_PATH_ROOT);
        \Craft::$app->fields->deleteLayoutsByType(CalendarEvent::class);
    }

    protected function createSettingsModel(): ?Model
    {
        return new SettingsModel();
    }

    protected function settingsHtml(): ?string
    {
        return \Craft::$app->getView()->renderTemplate(
            'calendar/settings',
            [
                'settings' => $this->getSettings(),
            ]
        );
    }

    private function createDefaultCalendarFieldLayout(): FieldLayout
    {
        $layout = new FieldLayout();
        $layout->uid = StringHelper::UUID();
        $layout->type = CalendarEvent::class;

        $tab = new FieldLayoutTab();
        $tab->name = 'Content';
        $tab->uid = StringHelper::UUID();
        $tab->sortOrder = 1;
        $tab->setLayout($layout);
        $tab->setElements([]);

        $layout->setTabs([$tab]);

        return $layout;
    }

    private function initControllers(): void
    {
        if (!\Craft::$app->request->isConsoleRequest) {
            $this->controllerNamespace = 'Solspace\Calendar\Controllers';
        } else {
            $this->controllerNamespace = 'Solspace\Calendar\Console\Controllers';
        }
    }

    private function initServices(): void
    {
        $this->setComponents(
            [
                'calendars' => CalendarsService::class,
                'calendarSites' => CalendarSitesService::class,
                'clientAssets' => ClientAssetsService::class,
                'events' => EventsService::class,
                'exceptions' => ExceptionsService::class,
                'selectDates' => SelectDatesService::class,
                'settings' => SettingsService::class,
                'viewData' => ViewDataService::class,
            ]
        );
    }

    private function initRoutes(): void
    {
        Event::on(
            UrlManager::class,
            UrlManager::EVENT_REGISTER_CP_URL_RULES,
            function (RegisterUrlRulesEvent $event) {
                $routes = include __DIR__.'/routes.php';
                $event->rules = array_merge($event->rules, $routes);
            }
        );

        \Craft::$app->view->registerTwigExtension(new CalendarGlobalExtension());
    }

    private function initTemplateVariables(): void
    {
        Event::on(
            CraftVariable::class,
            CraftVariable::EVENT_INIT,
            static function (Event $event) {
                $event->sender->set('calendar', CalendarVariable::class);
            }
        );
    }

    private function initWidgets(): void
    {
        if ($this->isPro()) {
            Event::on(
                Dashboard::class,
                Dashboard::EVENT_REGISTER_WIDGET_TYPES,
                static function (RegisterComponentTypesEvent $event) {
                    $event->types[] = AgendaWidget::class;
                    $event->types[] = EventWidget::class;
                    $event->types[] = MiniWidget::class;
                    $event->types[] = UpcomingEventsWidget::class;
                }
            );
        }
    }

    private function initFieldTypes(): void
    {
        Event::on(
            Fields::class,
            Fields::EVENT_REGISTER_FIELD_TYPES,
            static function (RegisterComponentTypesEvent $event) {
                $event->types[] = EventFieldType::class;
                $event->types[] = CalendarFieldType::class;
            }
        );
    }

    private function initElementTypes(): void
    {
        Event::on(
            Elements::class,
            Elements::EVENT_REGISTER_ELEMENT_TYPES,
            static function (RegisterComponentTypesEvent $event) {
                $event->types[] = CalendarEvent::class;
            }
        );
    }

    private function initEventListeners(): void
    {
        Event::on(Sites::class, Sites::EVENT_AFTER_SAVE_SITE, [$this->events, 'addSiteHandler']);
        Event::on(Sites::class, Sites::EVENT_AFTER_SAVE_SITE, [$this->calendars, 'addSiteHandler']);
        Event::on(Elements::class, Elements::EVENT_BEFORE_DELETE_ELEMENT, [$this->events, 'transferUserEvents']);
    }

    private function initPermissions(): void
    {
        if (\Craft::Solo !== \Craft::$app->getEdition()) {
            Event::on(
                UserPermissions::class,
                UserPermissions::EVENT_REGISTER_PERMISSIONS,
                function (RegisterUserPermissionsEvent $event) {
                    $calendars = $this->calendars->getAllCalendars();

                    $calendarPermissions = [];
                    $readEventsPermissions = [];
                    $editEventsPermissions = [];
                    foreach ($calendars as $calendar) {
                        $suffix = ':'.$calendar->uid;

                        $calendarPermissions[self::PERMISSION_EDIT_CALENDARS_INDIVIDUAL.$suffix] = [
                            'label' => self::t('"{name}" calendar', ['name' => $calendar->name]),
                        ];
                        $readEventsPermissions[self::PERMISSION_EVENTS_READ_INDIVIDUAL.$suffix] = [
                            'label' => self::t('"{name}" calendar', ['name' => $calendar->name]),
                        ];
                        $editEventsPermissions[self::PERMISSION_EVENTS_FOR.$suffix] = [
                            'label' => self::t('"{name}" calendar', ['name' => $calendar->name]),
                        ];
                    }

                    $permissions = [
                        self::PERMISSION_CALENDARS => [
                            'label' => self::t('Access Calendars'),
                            'nested' => [
                                self::PERMISSION_CREATE_CALENDARS => [
                                    'label' => self::t('Create New Calendars'),
                                ],
                                self::PERMISSION_DELETE_CALENDARS => [
                                    'label' => self::t('Delete Calendars'),
                                ],
                                self::PERMISSION_EDIT_CALENDARS => [
                                    'label' => self::t('Manage All Calendars'),
                                    'info' => self::t("If you'd like to give users access to manage all calendars, check off this checkbox. It will also override any selections in the 'Manage Calendars Individually' settings."),
                                ],
                                self::PERMISSION_EDIT_CALENDARS_INDIVIDUAL => [
                                    'label' => self::t('Manage Calendars Individually'),
                                    'info' => self::t("If you'd like to give users access to manage only some calendars, check off the ones here. These selections will be overridden by the 'Manage All Calendars' checkbox."),
                                    'nested' => $calendarPermissions,
                                ],
                            ],
                        ],
                        self::PERMISSION_EVENTS => [
                            'label' => self::t('Access Events'),
                            'nested' => [
                                self::PERMISSION_EVENTS_READ => [
                                    'label' => self::t('Read All Events'),
                                    'info' => self::t("If you'd like to give users access to read events in all calendars, check off this checkbox. It will also override any selections in the 'Read Events by Calendar' settings. 'Manage' permissions will also override any 'Read' permissions."),
                                ],
                                self::PERMISSION_EVENTS_READ_INDIVIDUAL => [
                                    'label' => self::t('Read Events by Calendar'),
                                    'info' => self::t("If you'd like to give users access to read events in only some calendars, check off the ones here. These selections will be overridden by the 'Read All Events' checkbox. 'Manage' permissions will also override any 'Read' permissions."),
                                    'nested' => $readEventsPermissions,
                                ],
                                self::PERMISSION_EVENTS_FOR_ALL => [
                                    'label' => self::t('Manage All Events'),
                                    'info' => self::t("If you'd like to give users access to manage events in all calendars, check off this checkbox. It will also override any selections in the 'Manage Events by Calendar' settings. 'Manage' permissions will also override any 'Read' permissions."),
                                ],
                                self::PERMISSION_EVENTS_FOR => [
                                    'label' => self::t('Manage Events by Calendar'),
                                    'info' => self::t("If you'd like to give users access to manage events in only some calendars, check off the ones here. These selections will be overridden by the 'Manage All Events' checkbox. 'Manage' permissions will also override any 'Read' permissions."),
                                    'nested' => $editEventsPermissions,
                                ],
                            ],
                        ],
                        self::PERMISSION_SETTINGS => ['label' => self::t('Access Settings')],
                    ];

                    $event->permissions[] = [
                        'heading' => $this->name,
                        'permissions' => $permissions,
                    ];
                }
            );
        }
    }

    private function initBundles(): void
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
