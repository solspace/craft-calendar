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
            $row(Calendar::t('Calendar Version'), $plugin->getVersion(), 'info'),
            $row(Calendar::t('Calendar Edition'), $plugin->isPro() ? 'Pro' : 'Lite'),
            $row(Calendar::t('Craft Version'), $app->getVersion(),
                version_compare($app->getVersion(), '5.0', '>=') && version_compare($app->getVersion(), '6.0', '<') ? 'pass' : 'error',
                Calendar::t('Calendar requires Craft 5.x.')),
            $row(Calendar::t('PHP Version'), PHP_VERSION,
                version_compare(PHP_VERSION, '8.2', '>=') && version_compare(PHP_VERSION, '9.0', '<') ? 'pass' : 'error',
                Calendar::t('Calendar requires PHP 8.2 or newer within PHP 8.x.')),
            $row(Calendar::t('Operating System'), PHP_OS_FAMILY),
            $row(Calendar::t('PHP Memory Limit'), ini_get('memory_limit'),
                DiagnosticsHelper::memoryLimitStatus((string) ini_get('memory_limit')),
                Calendar::t('Craft requires at least 256 MB of PHP memory; 512 MB or more is recommended. A value of -1 means unlimited memory.')),
            $row(Calendar::t('PHP Execution Time Limit'), ini_get('max_execution_time')),
            $row(Calendar::t('Environment'), \defined('CRAFT_ENVIRONMENT') ? CRAFT_ENVIRONMENT : $default),
            $booleanRow(Calendar::t('Developer Mode'), $general->devMode),
            $booleanRow(Calendar::t('Admin Changes Allowed'), $general->allowAdminChanges),
        ];
        foreach (['intl', 'mbstring', 'pdo'] as $extension) {
            $loaded = \extension_loaded($extension);
            $server[] = $booleanRow(Calendar::t('PHP Extension: {extension}', ['extension' => $extension]),
                $loaded, 'error', $loaded ? null : Calendar::t('This required PHP extension is missing.'));
        }

        $timezones = [];
        foreach ([Calendar::t('Craft Timezone') => $app->getTimeZone(), Calendar::t('PHP Runtime Timezone') => date_default_timezone_get()] as $label => $name) {
            $zone = DiagnosticsHelper::timezone($name, $now);
            $timezones[] = $row($label, $name, $zone ? 'pass' : 'error',
                $zone ? Calendar::t('Current local time: {time}. Daylight saving time: {dst}.', [
                    'time' => $zone['clock'], 'dst' => Calendar::t($zone['dst'] ? 'Active' : 'Inactive'),
                ]) : Calendar::t('This timezone identifier is invalid.'));
        }
        $timezones[] = $row(Calendar::t('PHP Configured Timezone'), ini_get('date.timezone') ?: $default,
            'info', Calendar::t('The PHP runtime timezone may be overridden by Craft during startup.'));
        $timezones[] = $row(Calendar::t('Server Time (UTC)'), $now->format('Y-m-d H:i:s P'));
        $timezones[] = $row(Calendar::t('Event Date Storage'), Calendar::t('Local event time (stored as UTC)'), 'info',
            Calendar::t('Dates keep the local time entered for the event. UTC is used internally without converting that time to another timezone. Different browser and server timezones do not automatically indicate a problem.'));

        $user = $app->getUser()->getIdentity();
        $weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        $timeFormat = match ($model->timeFormat) {
            SettingsModel::TIME_FORMAT_12_HOUR => Calendar::t('12-hour format'),
            SettingsModel::TIME_FORMAT_24_HOUR => Calendar::t('24-hour format'),
            default => Calendar::t('Locale default'),
        };
        $locale = [
            $row(Calendar::t('Control Panel Language'), $app->language),
            $row(Calendar::t('Formatting Locale'), $app->getLocale()->id),
            $row(Calendar::t('User Preferred Language'), $user?->getPreferredLanguage() ?: Calendar::t('Inherited from Craft')),
            $row(Calendar::t('User Preferred Formatting Locale'), $user?->getPreferredLocale() ?: Calendar::t('Inherited from Craft')),
            $row(Calendar::t('Short Date Format (ICU)'), DateFormatHelper::get(DateFormatHelper::TYPE_DATE, Locale::FORMAT_ICU, 'short')),
            $row(Calendar::t('Short Time Format (ICU)'), DateFormatHelper::get(DateFormatHelper::TYPE_TIME, Locale::FORMAT_ICU, 'short')),
            $row(Calendar::t('Time Format'), $timeFormat),
            $row(Calendar::t('Effective First Day Of Week'), Calendar::t($weekdays[$settings->getFirstDayOfWeek()]), 'info',
                $model->getFirstDayOfWeek() < 0 ? Calendar::t('Inherited from the user preference or Craft default.') : Calendar::t('Set in Calendar settings.')),
        ];
        $configuration = [
            $row(Calendar::t('Default View'), Calendar::t(ucfirst($model->defaultView ?: SettingsModel::DEFAULT_VIEW))),
            $row(Calendar::t('Time Interval (Minutes)'), $settings->getTimeInterval()),
            $row(Calendar::t('Default Duration (Minutes)'), $settings->getEventDuration()),
            $row(Calendar::t('Overlap Threshold (Hours)'), $settings->getOverlapThreshold()),
            $booleanRow(Calendar::t('All-Day Events By Default'), $settings->isAllDayDefault()),
            $booleanRow(Calendar::t('Show Disabled Events'), $settings->showDisabledEvents()),
            $booleanRow(Calendar::t('Quick Create Enabled'), $settings->isQuickCreateEnabled()),
            $booleanRow(Calendar::t('Drag And Drop Enabled'), $settings->isDragAndDropEnabled()),
            $booleanRow(Calendar::t('Only Edit Own Events'), $settings->isAuthoredEventEditOnly()),
        ];

        $database = [];
        try {
            $db = $app->getDb();
            $database[] = $row(Calendar::t('Database Driver'), $db->driverName);
            $database[] = $row(Calendar::t('Database Version'), $db->getServerVersion());
            if ($db->getIsMysql()) {
                $zones = $db->createCommand('SELECT @@session.time_zone AS sessionZone, @@global.time_zone AS globalZone, @@system_time_zone AS systemZone')->queryOne();
                $database[] = $row(Calendar::t('Database Session Timezone'), $zones['sessionZone']);
                $database[] = $row(Calendar::t('Database Global Timezone'), $zones['globalZone']);
                $database[] = $row(Calendar::t('Database System Timezone'), $zones['systemZone']);
            } elseif ($db->getIsPgsql()) {
                $database[] = $row(Calendar::t('Database Session Timezone'), $db->createCommand('SHOW TIMEZONE')->queryScalar());
            }
        } catch (\Throwable $exception) {
            \Craft::error($exception->getMessage(), __METHOD__);
            $database[] = $row(Calendar::t('Database Checks'), $unavailable, 'warning', Calendar::t('Could not read diagnostic data. See the Craft logs for details.'));
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
                $guestAccess = $plugin->calendars->isCalendarPublic($calendar);
                $icsSharing = (bool) $calendar->icsHash;
                $calendars[] = [
                    'id' => $calendar->id,
                    'title' => $calendar->name,
                    'handle' => $calendar->handle,
                    'timezone' => $floating ? Calendar::t('Floating timezone') : $name,
                    'timezoneValid' => $valid,
                    'repeating' => $boolean((bool) $calendar->allowRepeatingEvents),
                    'repeatingEnabled' => (bool) $calendar->allowRepeatingEvents,
                    'guestAccessEnabled' => $guestAccess,
                    'guestAccessLabel' => $boolean($guestAccess),
                    'icsSharingEnabled' => $icsSharing,
                    'icsSharingLabel' => $boolean($icsSharing),
                    'eventCount' => null,
                    'siteCount' => \count($siteNames),
                    'siteNames' => implode(', ', $siteNames),
                    'rows' => [
                        $row(Calendar::t('Handle'), $calendar->handle),
                        $row(Calendar::t('ICS Export Timezone'), $floating ? Calendar::t('Floating Timezone (recommended)') : $name,
                            $valid ? 'pass' : 'error', $valid ? Calendar::t('This setting applies to ICS exports; it does not change stored event dates.') : Calendar::t('This timezone identifier is invalid.')),
                        $booleanRow(Calendar::t('Repeating Events Allowed'), (bool) $calendar->allowRepeatingEvents),
                        $booleanRow(Calendar::t('Guest Access'), $guestAccess),
                        $booleanRow(Calendar::t('ICS Sharing'), $icsSharing),
                        $row(Calendar::t('Supported Sites'), implode(', ', $siteNames)),
                    ],
                ];
            }
            // Count canonical, non-deleted elements once, regardless of site count.
            $events = (new Query())->from(['events' => '{{%calendar_events}}'])
                ->innerJoin(['elements' => Table::ELEMENTS], '[[elements.id]] = [[events.id]]')
                ->where(['elements.dateDeleted' => null, 'elements.draftId' => null, 'elements.revisionId' => null]);
            $eventCounts = [];
            foreach ((clone $events)->select(['calendarId' => 'events.calendarId', 'total' => 'COUNT(*)'])->groupBy('events.calendarId')->all() as $count) {
                $eventCounts[(int) $count['calendarId']] = (int) $count['total'];
            }
            foreach ($calendars as $index => $calendar) {
                $calendars[$index]['eventCount'] = $eventCounts[$calendar['id']] ?? 0;
            }
            $statistics[] = $row(Calendar::t('Events'), (clone $events)->count());
            $statistics[] = $row(Calendar::t('All-Day Events'), (clone $events)->andWhere(['events.allDay' => true])->count());
            $statistics[] = $row(Calendar::t('Recurring Events'), (clone $events)->andWhere(['not', ['events.rrule' => null]])->andWhere(['<>', 'events.rrule', ''])->count());
            $statistics[] = $row(Calendar::t('Disabled Events'), (clone $events)->andWhere(['elements.enabled' => false])->count());
            foreach ([Calendar::t('Additional Dates') => SelectDateRecord::TABLE, Calendar::t('Excluded Dates') => ExceptionRecord::TABLE] as $label => $table) {
                $statistics[] = $row($label, (clone $events)->innerJoin(['dates' => $table], '[[dates.eventId]] = [[events.id]]')->count());
            }
            $statistics[] = $row(Calendar::t('Cached Occurrences'), (new Query())->from('{{%calendar_events_occurrences}}')->count(), 'none',
                Calendar::t('Occurrences are cached for requested date ranges; this is not the total number of future occurrences.'));
            foreach ((clone $events)->select(['timezone' => 'events.timezone', 'total' => 'COUNT(*)'])->groupBy('events.timezone')->all() as $zone) {
                $name = $zone['timezone'];
                $valid = !$name || null !== DiagnosticsHelper::timezone($name, $now);
                $eventZones[] = $row($name ?: Calendar::t('Not configured'), $zone['total'], $valid ? ($name ? 'pass' : 'info') : 'error',
                    $valid ? null : Calendar::t('This timezone identifier is invalid.'));
            }
        } catch (\Throwable $exception) {
            \Craft::error($exception->getMessage(), __METHOD__);
            $statistics[] = $row(Calendar::t('Calendar Data Checks'), $unavailable, 'warning', Calendar::t('Could not read diagnostic data. See the Craft logs for details.'));
        }

        foreach ($calendars as $index => $calendar) {
            $calendars[$index]['rows'][] = $row(Calendar::t('Events'), $calendar['eventCount'] ?? $unavailable);
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
