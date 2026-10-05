<?php

namespace Solspace\Calendar\Services;

use craft\base\Component;
use craft\db\Query;
use craft\db\Table;
use craft\i18n\Locale;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Library\Helpers\DateFormatHelper;
use Solspace\Calendar\Library\Helpers\DateHelper;
use Solspace\Calendar\Library\Helpers\DiagnosticsHelper;
use Solspace\Calendar\Models\SettingsModel;
use Solspace\Calendar\Records\ExceptionRecord;
use Solspace\Calendar\Records\SelectDateRecord;

class DiagnosticsService extends Component
{
    public function getDiagnostics(): array
    {
        $app = \Craft::$app;
        $plugin = Calendar::getInstance();
        $settings = $plugin->settings;
        $model = $settings->getSettingsModel();
        $general = $app->getConfig()->getGeneral();
        $now = new \DateTimeImmutable('now', new \DateTimeZone('UTC'));
        $row = static fn (string $label, mixed $value, string $status = 'none', ?string $note = null, bool $isBoolean = false) => [
            'label' => $label,
            'value' => (string) $value,
            'status' => $status,
            'note' => $note,
            'isBoolean' => $isBoolean,
            'statusLabel' => $isBoolean && \in_array($status, ['pass', 'disabled'], true) ? (string) $value : match ($status) {
                'pass' => Calendar::t('Valid'),
                'disabled' => Calendar::t('Disabled'),
                'error' => Calendar::t('Potential issue'),
                'warning' => Calendar::t('Concern'),
                'info' => Calendar::t('Information'),
                default => '',
            },
        ];
        $boolean = static fn (bool $value) => Calendar::t($value ? 'Enabled' : 'Disabled');
        $booleanRow = static fn (string $label, bool $value, string $offStatus = 'disabled', ?string $note = null) =>
            $row($label, $boolean($value), $value ? 'pass' : $offStatus, $note, true);
        $unavailable = Calendar::t('Unavailable');
        $default = Calendar::t('Not configured');

        $server = [
            $row(Calendar::t('Calendar version'), $plugin->getVersion(), 'info'),
            $row(Calendar::t('Calendar edition'), $plugin->isPro() ? 'Pro' : 'Lite'),
            $row(Calendar::t('Craft version'), $app->getVersion(),
                version_compare($app->getVersion(), '5.0', '>=') && version_compare($app->getVersion(), '6.0', '<') ? 'pass' : 'error',
                Calendar::t('Calendar requires Craft 5.x.')),
            $row(Calendar::t('PHP version'), PHP_VERSION,
                version_compare(PHP_VERSION, '8.2', '>=') && version_compare(PHP_VERSION, '9.0', '<') ? 'pass' : 'error',
                Calendar::t('Calendar requires PHP 8.2 or newer within PHP 8.x.')),
            $row(Calendar::t('Operating system'), PHP_OS_FAMILY),
            $row(Calendar::t('PHP memory limit'), ini_get('memory_limit')),
            $row(Calendar::t('PHP execution time limit'), ini_get('max_execution_time')),
            $row(Calendar::t('Environment'), \defined('CRAFT_ENVIRONMENT') ? CRAFT_ENVIRONMENT : $default),
            $booleanRow(Calendar::t('Developer mode'), $general->devMode),
            $booleanRow(Calendar::t('Admin changes allowed'), $general->allowAdminChanges),
        ];
        foreach (['intl', 'mbstring', 'pdo'] as $extension) {
            $loaded = \extension_loaded($extension);
            $server[] = $booleanRow(Calendar::t('PHP extension: {extension}', ['extension' => $extension]),
                $loaded, 'error', $loaded ? null : Calendar::t('This required PHP extension is missing.'));
        }

        $timezones = [];
        foreach ([Calendar::t('Craft timezone') => $app->getTimeZone(), Calendar::t('PHP runtime timezone') => date_default_timezone_get()] as $label => $name) {
            $zone = DiagnosticsHelper::timezone($name, $now);
            $timezones[] = $row($label, $name, $zone ? 'pass' : 'error',
                $zone ? Calendar::t('Current local time: {time}. Daylight saving time: {dst}.', [
                    'time' => $zone['clock'], 'dst' => Calendar::t($zone['dst'] ? 'Active' : 'Inactive'),
                ]) : Calendar::t('This timezone identifier is invalid.'));
        }
        $timezones[] = $row(Calendar::t('PHP configured timezone'), ini_get('date.timezone') ?: $default,
            'info', Calendar::t('The PHP runtime timezone may be overridden by Craft during startup.'));
        $timezones[] = $row(Calendar::t('Server time (UTC)'), $now->format('Y-m-d H:i:s P'));
        $timezones[] = $row(Calendar::t('Event date storage'), Calendar::t('Floating wall time'), 'info',
            Calendar::t('Event dates preserve their wall time using UTC internally. Different browser and server timezones do not automatically indicate a problem.'));

        $user = $app->getUser()->getIdentity();
        $weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        $timeFormat = match ($model->timeFormat) {
            SettingsModel::TIME_FORMAT_12_HOUR => Calendar::t('12-hour format'),
            SettingsModel::TIME_FORMAT_24_HOUR => Calendar::t('24-hour format'),
            default => Calendar::t('Locale default'),
        };
        $locale = [
            $row(Calendar::t('Control panel language'), $app->language),
            $row(Calendar::t('Formatting locale'), $app->getLocale()->id),
            $row(Calendar::t('User preferred language'), $user?->getPreferredLanguage() ?: Calendar::t('Inherited from Craft')),
            $row(Calendar::t('User preferred formatting locale'), $user?->getPreferredLocale() ?: Calendar::t('Inherited from Craft')),
            $row(Calendar::t('Short date format (ICU)'), DateFormatHelper::get(DateFormatHelper::TYPE_DATE, Locale::FORMAT_ICU, 'short')),
            $row(Calendar::t('Short time format (ICU)'), DateFormatHelper::get(DateFormatHelper::TYPE_TIME, Locale::FORMAT_ICU, 'short')),
            $row(Calendar::t('Time Format'), $timeFormat),
            $row(Calendar::t('Effective first day of week'), Calendar::t($weekdays[$settings->getFirstDayOfWeek()]), 'info',
                $model->getFirstDayOfWeek() < 0 ? Calendar::t('Inherited from the user preference or Craft default.') : Calendar::t('Set in Calendar settings.')),
        ];
        $configuration = [
            $row(Calendar::t('Default View'), Calendar::t(ucfirst($model->defaultView ?: SettingsModel::DEFAULT_VIEW))),
            $row(Calendar::t('Time interval (minutes)'), $settings->getTimeInterval()),
            $row(Calendar::t('Default duration (minutes)'), $settings->getEventDuration()),
            $row(Calendar::t('Overlap threshold (hours)'), $settings->getOverlapThreshold()),
            $booleanRow(Calendar::t('All-day events by default'), $settings->isAllDayDefault()),
            $booleanRow(Calendar::t('Show disabled events'), $settings->showDisabledEvents()),
            $booleanRow(Calendar::t('Quick create enabled'), $settings->isQuickCreateEnabled()),
            $booleanRow(Calendar::t('Drag and drop enabled'), $settings->isDragAndDropEnabled()),
            $booleanRow(Calendar::t('Only edit own events'), $settings->isAuthoredEventEditOnly()),
        ];

        $database = [];
        try {
            $db = $app->getDb();
            $database[] = $row(Calendar::t('Database driver'), $db->driverName);
            $database[] = $row(Calendar::t('Database version'), $db->getServerVersion());
            if ($db->getIsMysql()) {
                $zones = $db->createCommand('SELECT @@session.time_zone AS sessionZone, @@global.time_zone AS globalZone, @@system_time_zone AS systemZone')->queryOne();
                $database[] = $row(Calendar::t('Database session timezone'), $zones['sessionZone']);
                $database[] = $row(Calendar::t('Database global timezone'), $zones['globalZone']);
                $database[] = $row(Calendar::t('Database system timezone'), $zones['systemZone']);
            } elseif ($db->getIsPgsql()) {
                $database[] = $row(Calendar::t('Database session timezone'), $db->createCommand('SHOW TIMEZONE')->queryScalar());
            }
        } catch (\Throwable $exception) {
            \Craft::error($exception->getMessage(), __METHOD__);
            $database[] = $row(Calendar::t('Database checks'), $unavailable, 'warning', Calendar::t('Could not read diagnostic data. See the Craft logs for details.'));
        }

        $statistics = [];
        $calendars = [];
        $eventZones = [];
        try {
            $allCalendars = $plugin->calendars->getAllCalendars();
            $statistics[] = $row(Calendar::t('Calendars'), \count($allCalendars));
            $calendarSites = [];
            foreach ($plugin->calendarSites->getAllSiteSettings() as $site) {
                $calendarSites[$site->calendarId][] = $site->getSite()?->name ?? (string) $site->siteId;
            }
            foreach ($allCalendars as $calendar) {
                $name = $calendar->getIcsTimezone();
                $floating = DateHelper::FLOATING_TIMEZONE === $name;
                $valid = $floating || null !== DiagnosticsHelper::timezone($name, $now);
                $siteNames = $calendarSites[$calendar->id] ?? [];
                $calendars[] = [
                    'title' => $calendar->name,
                    'handle' => $calendar->handle,
                    'timezone' => $floating ? Calendar::t('Floating wall time') : $name,
                    'timezoneValid' => $valid,
                    'repeating' => $boolean((bool) $calendar->allowRepeatingEvents),
                    'repeatingEnabled' => (bool) $calendar->allowRepeatingEvents,
                    'siteCount' => \count($siteNames),
                    'siteNames' => implode(', ', $siteNames),
                    'rows' => [
                        $row(Calendar::t('Handle'), $calendar->handle),
                        $row(Calendar::t('ICS export timezone'), $floating ? Calendar::t('Floating Timezone (recommended)') : $name,
                            $valid ? 'pass' : 'error', $valid ? Calendar::t('This setting applies to ICS exports; it does not change stored event dates.') : Calendar::t('This timezone identifier is invalid.')),
                        $booleanRow(Calendar::t('Repeating events allowed'), (bool) $calendar->allowRepeatingEvents),
                        $row(Calendar::t('Supported sites'), implode(', ', $siteNames)),
                    ],
                ];
            }
            // Count canonical, non-deleted elements once, regardless of site count.
            $events = (new Query())->from(['events' => '{{%calendar_events}}'])
                ->innerJoin(['elements' => Table::ELEMENTS], '[[elements.id]] = [[events.id]]')
                ->where(['elements.dateDeleted' => null, 'elements.draftId' => null, 'elements.revisionId' => null]);
            $statistics[] = $row(Calendar::t('Events'), (clone $events)->count());
            $statistics[] = $row(Calendar::t('All-day events'), (clone $events)->andWhere(['events.allDay' => true])->count());
            $statistics[] = $row(Calendar::t('Recurring events'), (clone $events)->andWhere(['not', ['events.rrule' => null]])->andWhere(['<>', 'events.rrule', ''])->count());
            $statistics[] = $row(Calendar::t('Disabled events'), (clone $events)->andWhere(['elements.enabled' => false])->count());
            foreach ([Calendar::t('Additional Dates') => SelectDateRecord::TABLE, Calendar::t('Excluded Dates') => ExceptionRecord::TABLE] as $label => $table) {
                $statistics[] = $row($label, (clone $events)->innerJoin(['dates' => $table], '[[dates.eventId]] = [[events.id]]')->count());
            }
            $statistics[] = $row(Calendar::t('Cached occurrences'), (new Query())->from('{{%calendar_events_occurrences}}')->count(), 'none',
                Calendar::t('Occurrences are cached for requested date ranges; this is not the total number of future occurrences.'));
            foreach ((clone $events)->select(['timezone' => 'events.timezone', 'total' => 'COUNT(*)'])->groupBy('events.timezone')->all() as $zone) {
                $name = $zone['timezone'];
                $valid = !$name || null !== DiagnosticsHelper::timezone($name, $now);
                $eventZones[] = $row($name ?: Calendar::t('Not configured'), $zone['total'], $valid ? ($name ? 'pass' : 'info') : 'error',
                    $valid ? null : Calendar::t('This timezone identifier is invalid.'));
            }
        } catch (\Throwable $exception) {
            \Craft::error($exception->getMessage(), __METHOD__);
            $statistics[] = $row(Calendar::t('Calendar data checks'), $unavailable, 'warning', Calendar::t('Could not read diagnostic data. See the Craft logs for details.'));
        }

        $sites = [];
        foreach ($app->getSites()->getAllSites() as $site) {
            $sites[] = $row($site->name.' ('.$site->handle.')', $site->language);
        }

        $sections = [
            [$this->section(Calendar::t('Server Checks'), $server), $this->section(Calendar::t('Database'), $database)],
            [$this->section(Calendar::t('Timezones & Clocks'), $timezones), $this->section(Calendar::t('Locale & Date Formatting'), $locale), $this->section(Calendar::t('Calendar Configuration'), $configuration)],
            [$this->section(Calendar::t('Statistics'), $statistics), $this->section(Calendar::t('Event Timezones'), $eventZones), $this->section(Calendar::t('Sites & Languages'), $sites)],
        ];
        $warnings = [];
        $errorCount = 0;
        $report = [Calendar::t('Calendar Diagnostics'), $now->format(\DateTimeInterface::ATOM)];
        // Keep the full per-calendar details in the support report, independently of the compact UI.
        foreach ([...$sections, $calendars] as $column) {
            foreach ($column as $section) {
                $report[] = "\n".$section['title'];
                foreach ($section['rows'] as $item) {
                    $report[] = $item['label'].': '.$item['value'].($item['note'] ? ' — '.$item['note'] : '');
                    if (\in_array($item['status'], ['warning', 'error'], true)) {
                        $warnings[] = $section['title'].' / '.$item['label'];
                        $errorCount += 'error' === $item['status'] ? 1 : 0;
                    }
                }
            }
        }

        return [
            'columns' => $sections,
            'calendars' => $calendars,
            'calendarWarningCount' => \count(array_filter($calendars, static fn ($calendar) => !$calendar['timezoneValid'])),
            'warnings' => $warnings,
            'errorCount' => $errorCount,
            'concernCount' => \count($warnings) - $errorCount,
            'report' => implode("\n", $report),
            'sampledAt' => $now->format(\DateTimeInterface::ATOM),
        ];
    }

    private function section(string $title, array $rows): array
    {
        return ['title' => $title, 'rows' => $rows];
    }
}
