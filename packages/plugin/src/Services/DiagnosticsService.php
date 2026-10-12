<?php

namespace Solspace\Calendar\Services;

use craft\base\Component;
use craft\db\Query;
use craft\db\Table;
use craft\helpers\UrlHelper;
use craft\i18n\Locale;
use Solspace\Calendar\Calendar;
use Solspace\Calendar\Elements\Booking;
use Solspace\Calendar\Library\Helpers\DateFormatHelper;
use Solspace\Calendar\Library\Helpers\DateHelper;
use Solspace\Calendar\Library\Helpers\DiagnosticsHelper;
use Solspace\Calendar\Models\BookingNotificationSettings;
use Solspace\Calendar\Models\SchedulingSettings;
use Solspace\Calendar\Models\SettingsModel;

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
        $row = static fn (string $label, mixed $value, string $status = 'none', ?string $note = null, bool $isBoolean = false, bool $isCode = false, bool $isProduct = false) => [
            'label' => $label,
            'value' => (string) $value,
            'status' => $status,
            'note' => $note,
            'isBoolean' => $isBoolean,
            'isCode' => $isCode,
            'isProduct' => $isProduct,
            'statusLabel' => $isBoolean && \in_array($status, ['pass', 'disabled'], true) ? (string) $value : match ($status) {
                'pass' => Calendar::t('Valid'),
                'disabled' => Calendar::t('Disabled'),
                'error' => Calendar::t('Potential issue'),
                'warning' => Calendar::t('Advisory'),
                default => '',
            },
        ];
        $boolean = static fn (bool $value) => Calendar::t($value ? 'Enabled' : 'Disabled');
        $booleanRow = static fn (string $label, bool $value, string $offStatus = 'disabled', ?string $note = null) => $row($label, $boolean($value), $value ? 'pass' : $offStatus, $note, true);
        $unavailable = Calendar::t('Unavailable');
        $default = Calendar::t('Not configured');

        $calendarVersion = $plugin->getVersion();
        $calendarVersionStatus = 'none';
        $calendarVersionNote = Calendar::t('Could not check Calendar updates.');

        try {
            $updates = $app->getUpdates()->getUpdates();
            $latestVersion = $calendarVersion;
            foreach ($updates->plugins['calendar']->releases ?? [] as $release) {
                if (version_compare($release->version, $latestVersion, '>')) {
                    $latestVersion = $release->version;
                }
            }
            $hasUpdate = version_compare($latestVersion, $calendarVersion, '>');
            $calendarVersionStatus = $hasUpdate ? 'warning' : 'pass';
            $calendarVersionNote = $hasUpdate ? Calendar::t('An update is available for Calendar. Please update to {version}.', ['version' => $latestVersion]) : null;
        } catch (\Throwable $exception) {
            \Craft::error($exception->getMessage(), __METHOD__);
        }
        $calendarVersionRow = $row(
            Calendar::t('Calendar'),
            ($plugin->isPro() ? 'Pro' : 'Lite').' '.$calendarVersion,
            $calendarVersionStatus,
            $calendarVersionNote,
            isProduct: true
        );
        if (null !== $calendarVersionNote) {
            $calendarVersionRow['noteUrl'] = UrlHelper::cpUrl('utilities/updates');
            $calendarVersionRow['noteLinkLabel'] = Calendar::t('View Updates');
        }

        $craftVersion = $app->getVersion();
        $craftVersionStatus = DiagnosticsHelper::craftVersionStatus($craftVersion);
        $craftVersionNote = Calendar::t('Calendar 6.x requires Craft 5.x.');
        if ('warning' === $craftVersionStatus) {
            $craftVersionNote .= ' '.Calendar::t('This version of Calendar may not be fully compatible with your version of Craft CMS. Please check for Calendar updates.');
        }

        $server = [
            $calendarVersionRow,
            $row(
                'Craft',
                $app->edition->name.' '.$craftVersion,
                $craftVersionStatus,
                $craftVersionNote,
                isProduct: true
            ),
            $row(
                Calendar::t('PHP Version'),
                \PHP_VERSION,
                version_compare(\PHP_VERSION, '8.2', '>=') && version_compare(\PHP_VERSION, '9.0', '<') ? 'pass' : 'error',
                Calendar::t('Calendar requires PHP 8.2 or newer within PHP 8.x.')
            ),
            $row(Calendar::t('Operating System'), \sprintf('%s %s', \PHP_OS, php_uname('r'))),
            $row(
                Calendar::t('PHP Memory Limit'),
                \ini_get('memory_limit'),
                DiagnosticsHelper::memoryLimitStatus((string) \ini_get('memory_limit')),
                Calendar::t('Craft requires at least 256 MB of PHP memory; 512 MB or more is recommended. A value of -1 means unlimited memory.')
            ),
            $row(Calendar::t('PHP Execution Time Limit'), \ini_get('max_execution_time')),
            $row(Calendar::t('Environment'), $app->getConfig()->env ?: $default, isCode: true),
            $booleanRow(Calendar::t('Developer Mode'), $general->devMode),
            $booleanRow(Calendar::t('Admin Changes Allowed'), $general->allowAdminChanges),
        ];
        foreach (['intl', 'mbstring', 'pdo'] as $extension) {
            $loaded = \extension_loaded($extension);
            $extensionRow = $booleanRow(
                Calendar::t('PHP Extension: {extension}', ['extension' => $extension]),
                $loaded,
                'error',
                $loaded ? null : Calendar::t('This required PHP extension is missing.')
            );
            $extensionRow['labelParts'] = explode('{extension}', Calendar::t('PHP Extension: {extension}'), 2);
            $extensionRow['labelCode'] = $extension;
            $server[] = $extensionRow;
        }

        $timezones = [];
        foreach ([Calendar::t('Craft Timezone') => $app->getTimeZone(), Calendar::t('PHP Runtime Timezone') => date_default_timezone_get()] as $label => $name) {
            $zone = DiagnosticsHelper::timezone($name, $now);
            $timezones[] = $row(
                $label,
                $name,
                $zone ? 'none' : 'error',
                $zone ? Calendar::t('Current local time: {time}. Daylight saving time: {dst}.', [
                    'time' => $zone['clock'], 'dst' => Calendar::t($zone['dst'] ? 'Active' : 'Inactive'),
                ]) : Calendar::t('This timezone identifier is invalid.')
            );
        }
        $timezones[] = $row(
            Calendar::t('PHP Configured Timezone'),
            \ini_get('date.timezone') ?: $default,
            'none',
            Calendar::t('The PHP runtime timezone may be overridden by Craft during startup.')
        );
        $timezones[] = $row(Calendar::t('Server Time (UTC)'), $now->format('Y-m-d H:i:s P'));
        $timezones[] = $row(
            Calendar::t('Event Date Storage'),
            Calendar::t('Local event time (stored as UTC)'),
            'none',
            Calendar::t('Dates keep the local time entered for the event. UTC is used internally without converting that time to another timezone. Different browser and server timezones do not automatically indicate a problem.')
        );

        $user = $app->getUser()->getIdentity();
        $weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
        $timeFormat = match ($model->timeFormat) {
            SettingsModel::TIME_FORMAT_12_HOUR => Calendar::t('12-hour format'),
            SettingsModel::TIME_FORMAT_24_HOUR => Calendar::t('24-hour format'),
            default => Calendar::t('Locale default'),
        };
        $locale = [
            $row(Calendar::t('Control Panel Language'), $app->language, isCode: true),
            $row(Calendar::t('Formatting Locale'), $app->getLocale()->id, isCode: true),
            $row(
                Calendar::t('User Preferred Language'),
                $user?->getPreferredLanguage() ?: Calendar::t('Inherited from Craft'),
                isCode: (bool) $user?->getPreferredLanguage()
            ),
            $row(
                Calendar::t('User Preferred Formatting Locale'),
                $user?->getPreferredLocale() ?: Calendar::t('Inherited from Craft'),
                isCode: (bool) $user?->getPreferredLocale()
            ),
            $row(Calendar::t('Short Date Format (ICU)'), DateFormatHelper::get(DateFormatHelper::TYPE_DATE, Locale::FORMAT_ICU, 'short'), isCode: true),
            $row(Calendar::t('Short Time Format (ICU)'), DateFormatHelper::get(DateFormatHelper::TYPE_TIME, Locale::FORMAT_ICU, 'short'), isCode: true),
            $row(Calendar::t('Time Format'), $timeFormat),
            $row(
                Calendar::t('First Day of Week'),
                Calendar::t($weekdays[$settings->getFirstDayOfWeek()]),
                'none',
                $model->getFirstDayOfWeek() < 0
                    ? ($user ? Calendar::t('Uses the signed-in user\'s Craft week-start preference.') : Calendar::t('Uses Craft\'s default week-start day when no user is signed in.'))
                    : Calendar::t('Set in Calendar settings.')
            ),
        ];
        $configuration = [
            $row(Calendar::t('Default Page'), Calendar::t(ucfirst($model->defaultView ?: SettingsModel::DEFAULT_VIEW))),
            $row(Calendar::t('Default Calendar Tab'), Calendar::t(ucfirst($model->getDefaultCalendarView()))),
            $row(Calendar::t('Visible Calendar Tabs'), implode(', ', array_map(static fn (string $view) => Calendar::t(ucfirst($view)), $model->getEnabledCalendarViews()))),
            $row(Calendar::t('Time Picker Interval (Minutes)'), $settings->getTimeInterval()),
            $row(Calendar::t('Default Event Duration (Minutes)'), $settings->getEventDuration()),
            $row(Calendar::t('Late-Night Event Cutoff (Hours)'), $settings->getOverlapThreshold()),
            $booleanRow(Calendar::t('All-Day Events By Default'), $settings->isAllDayDefault()),
            $booleanRow(Calendar::t('Show Disabled Events'), $settings->showDisabledEvents()),
            $booleanRow(Calendar::t('Show Cancelled Events'), $settings->showCancelledEvents()),
            $booleanRow(Calendar::t('Show Overlap Warnings'), $settings->showOverlapWarnings()),
            $booleanRow(Calendar::t('Quick Event Creation'), $settings->isQuickCreateEnabled()),
            $booleanRow(Calendar::t('Drag and Drop'), $settings->isDragAndDropEnabled()),
            $booleanRow(Calendar::t('Restrict Editing to Own Events'), $settings->isAuthoredEventEditOnly()),
        ];

        $bookingConfiguration = [
            $row(Calendar::t('Bookings Label'), $model->getBookingLabel()),
            $row(Calendar::t('Default Bookings Subpage'), 'schedule' === $model->defaultBookingView ? Calendar::t('Schedule') : $model->getBookingLabel()),
            $row(Calendar::t('Default Schedule Layout'), 'combined' === $model->getBookingScheduleLayout() ? Calendar::t('Combined') : Calendar::t('By Calendar')),
            $row(Calendar::t('Booking Date Storage'), Calendar::t('UTC instants'), 'none', Calendar::t('Booking times are converted to UTC for storage and displayed in the scheduling calendar’s timezone.')),
            $booleanRow(Calendar::t('Automatic Queue Processing'), $general->runQueueAutomatically, note: Calendar::t('Booking notifications use Craft’s queue. An external queue worker can process jobs when automatic processing is disabled.')),
        ];
        $provider = $model->getCaptchaProvider();
        $protectBookings = $model->captchaProtectBookings && 'none' !== $provider;
        $captchaReady = !$protectBookings || ('' !== $model->getCaptchaSiteKey() && '' !== $model->getCaptchaSecretKey());
        $bookingConfiguration[] = $row(Calendar::t('Booking CAPTCHA'), $protectBookings ? $provider : Calendar::t('Disabled'), $captchaReady ? ($protectBookings ? 'pass' : 'disabled') : 'error', $captchaReady ? null : Calendar::t('The selected booking CAPTCHA provider requires both a site key and a secret key.'));

        try {
            $templates = BookingNotificationSettings::fromProjectConfig();
            foreach (['admin' => 'Admin Notification Template', 'requester' => 'Requester Notification Template'] as $audience => $label) {
                $sending = $templates->getSendingSettings($audience);
                $bookingConfiguration[] = $booleanRow(Calendar::t('Notification Emails: {audience}', ['audience' => ('admin' === $audience ? \Craft::t('app', 'Admin') : Calendar::t('Requester'))]), $sending['enabled']);
                $bookingConfiguration[] = $row(Calendar::t('Notification Triggers: {audience}', ['audience' => ('admin' === $audience ? \Craft::t('app', 'Admin') : Calendar::t('Requester'))]), implode(', ', array_intersect_key(BookingNotificationSettings::eventOptions(), array_flip($sending['events']))) ?: Calendar::t('None'));
                $custom = false;
                $overrides = 0;
                foreach (\is_array($templates->templates[$audience] ?? null) ? $templates->templates[$audience] : [] as $field => $source) {
                    if (\is_string($source) && '' !== trim($source)) {
                        if (\in_array($field, ['subject', 'body'], true)) {
                            $custom = true;
                        } elseif (\in_array($field, BookingNotificationSettings::DELIVERY_FIELDS, true)) {
                            ++$overrides;
                        }
                    }
                }
                $bookingConfiguration[] = $row(Calendar::t($label), Calendar::t($custom ? 'Customized' : 'Default'), 'none', Calendar::t('Notification delivery overrides: {count}.', ['count' => $overrides]));
            }
        } catch (\Throwable $exception) {
            \Craft::error($exception->getMessage(), __METHOD__);
            $bookingConfiguration[] = $row(Calendar::t('Booking Notifications'), $unavailable, 'warning', Calendar::t('Could not read diagnostic data. See the Craft logs for details.'));
        }

        try {
            $bookingDefaults = $this->section(Calendar::t('Booking Defaults'), $this->bookingRulesRows($model->getBookingDefaults(), $row, $now, true));
        } catch (\Throwable $exception) {
            \Craft::error($exception->getMessage(), __METHOD__);
            $bookingDefaults = $this->section(Calendar::t('Booking Defaults'), [$row(Calendar::t('Availability Rules'), $unavailable, 'error', Calendar::t('Could not read diagnostic data. See the Craft logs for details.'))]);
        }

        $database = [];

        try {
            $db = $app->getDb();
            $driver = match ($db->driverName) {
                'mysql' => 'MySQL',
                'pgsql' => 'PostgreSQL',
                default => $db->driverName,
            };
            $database[] = $row(Calendar::t('Database'), $driver.' '.$db->getServerVersion());
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
        $bookingCalendars = [];
        $bookingStatistics = [];

        try {
            $allCalendars = $plugin->calendars->getAllCalendars();
            $statistics[] = $row(Calendar::t('Calendars'), \count($allCalendars));
            $statistics[] = $row(Calendar::t('Event Calendars'), \count(array_filter($allCalendars, static fn ($calendar) => !$calendar->getIsScheduling())));
            $bookingStatistics[] = $row(Calendar::t('Scheduling Calendars'), \count(array_filter($allCalendars, static fn ($calendar) => $calendar->getIsScheduling())));
            $calendarSites = [];
            foreach ($plugin->calendarSites->getAllSiteSettings() as $site) {
                $calendarSites[$site->calendarId][] = $site->getSite()?->name ?? (string) $site->siteId;
            }
            foreach ($allCalendars as $calendar) {
                $siteNames = $calendarSites[$calendar->id] ?? [];
                if ($calendar->getIsScheduling()) {
                    try {
                        $rows = $this->bookingRulesRows($calendar->getSchedulingSettings(), $row, $now);
                    } catch (\Throwable $exception) {
                        \Craft::error($exception->getMessage(), __METHOD__);
                        $rows = [$row(Calendar::t('Availability Rules'), $unavailable, 'error', Calendar::t('Could not read diagnostic data. See the Craft logs for details.'))];
                    }
                    $bookingCalendars[] = ['id' => $calendar->id, 'title' => $calendar->name, 'rows' => [$row(Calendar::t('Handle'), $calendar->handle), ...$rows, $row(Calendar::t('Supported Sites'), implode(', ', $siteNames))]];

                    continue;
                }
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
                    'timezone' => $floating ? Calendar::t('Floating') : $name,
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
                        $row(
                            Calendar::t('ICS Export Timezone'),
                            $floating ? Calendar::t('Floating Timezone (recommended)') : $name,
                            $valid ? 'pass' : 'error',
                            $valid ? Calendar::t('This setting applies to ICS exports; it does not change stored event dates.') : Calendar::t('This timezone identifier is invalid.')
                        ),
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
                ->where(['elements.dateDeleted' => null, 'elements.draftId' => null, 'elements.revisionId' => null])
            ;
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
            $disabledSites = (new Query())->select('eventSites.elementId')->from(['eventSites' => Table::ELEMENTS_SITES])
                ->where('[[eventSites.elementId]] = [[events.id]]')->andWhere(['eventSites.enabled' => false])
            ;
            $statistics[] = $row(Calendar::t('Disabled Events'), (clone $events)->andWhere([
                'or', ['elements.enabled' => false], ['exists', $disabledSites],
            ])->count(), 'none', Calendar::t('Includes events disabled globally or on at least one site.'));
            $additionalDates = 0;
            $excludedDates = 0;
            foreach ((clone $events)->select(['events.startDate', 'events.rrule'])
                ->andWhere(['not', ['events.rrule' => null]])->andWhere(['<>', 'events.rrule', ''])->each() as $event) {
                $counts = DiagnosticsHelper::recurrenceDateCounts($event['rrule'], $event['startDate']);
                $additionalDates += $counts['additional'];
                $excludedDates += $counts['excluded'];
            }
            $statistics[] = $row(Calendar::t('Additional Dates'), $additionalDates);
            $statistics[] = $row(Calendar::t('Excluded Dates'), $excludedDates);
            $statistics[] = $row(
                Calendar::t('Cached Occurrences'),
                (new Query())->from('{{%calendar_events_occurrences}}')->count(),
                'none',
                Calendar::t('Occurrences are cached for requested date ranges; this is not the total number of future occurrences.')
            );
            foreach ((clone $events)->select(['timezone' => 'events.timezone', 'total' => 'COUNT(*)'])->groupBy('events.timezone')->all() as $zone) {
                $name = $zone['timezone'];
                $valid = !$name || null !== DiagnosticsHelper::timezone($name, $now);
                $eventZones[] = $row(
                    $name ?: Calendar::t('Not configured'),
                    $zone['total'],
                    $valid ? 'none' : 'error',
                    $valid ? null : Calendar::t('This timezone identifier is invalid.')
                );
            }
        } catch (\Throwable $exception) {
            \Craft::error($exception->getMessage(), __METHOD__);
            $statistics[] = $row(Calendar::t('Calendar Data Checks'), $unavailable, 'warning', Calendar::t('Could not read diagnostic data. See the Craft logs for details.'));
        }

        foreach ($calendars as $index => $calendar) {
            $calendars[$index]['rows'][] = $row(Calendar::t('Events'), $calendar['eventCount'] ?? $unavailable);
        }

        try {
            $bookingCounts = $this->bookingCounts();
            $totals = array_fill_keys(array_keys(Booking::statusOptions()), 0);
            foreach ($bookingCounts as $counts) {
                foreach ($counts as $status => $total) {
                    $totals[$status] = ($totals[$status] ?? 0) + $total;
                }
            }
            $bookingStatistics[] = $row(Calendar::t('Bookings'), array_sum($totals), 'none', Calendar::t('Counts exclude trashed bookings, drafts, and revisions. Only confirmed bookings reserve time.'));
            foreach (Booking::statusOptions() as $status => $label) {
                $bookingStatistics[] = $row($label, $totals[$status]);
            }
            foreach ($bookingCalendars as &$calendar) {
                $counts = $bookingCounts[$calendar['id']] ?? [];
                $calendar['rows'][] = $row(Calendar::t('Bookings'), array_sum($counts));
                foreach (Booking::statusOptions() as $status => $label) {
                    $calendar['rows'][] = $row($label, $counts[$status] ?? 0);
                }
            }
            unset($calendar);
        } catch (\Throwable $exception) {
            \Craft::error($exception->getMessage(), __METHOD__);
            $bookingStatistics[] = $row(Calendar::t('Booking Data Checks'), $unavailable, 'warning', Calendar::t('Could not read diagnostic data. See the Craft logs for details.'));
        }
        foreach ($bookingCalendars as &$calendar) {
            $issues = array_filter($calendar['rows'], static fn ($item) => \in_array($item['status'], ['warning', 'error'], true));
            $calendar['issueCount'] = \count($issues);
            $calendar['issueNotes'] = implode(' ', array_map(static fn ($item) => $item['label'].': '.($item['note'] ?? $item['value']), $issues));
            $calendar['cells'] = array_column($calendar['rows'], null, 'label');
        }
        unset($calendar);

        $sites = [];
        foreach ($app->getSites()->getAllSites() as $site) {
            $sites[] = $row($site->name.' ('.$site->handle.')', $site->language, isCode: true);
        }

        $sections = [
            [$this->section(Calendar::t('Server Checks'), $server), $this->section(Calendar::t('Database'), $database), $this->section(Calendar::t('Booking Configuration'), $bookingConfiguration)],
            [$this->section(Calendar::t('Timezones & Clocks'), $timezones), $this->section(Calendar::t('Locale & Date Formatting'), $locale), $bookingDefaults],
            [$this->section(Calendar::t('Calendar Configuration'), $configuration), $this->section(Calendar::t('Statistics'), $statistics), $this->section(Calendar::t('Event Timezones'), $eventZones), $this->section(Calendar::t('Sites & Languages'), $sites), $this->section(Calendar::t('Booking Statistics'), $bookingStatistics)],
        ];
        $warnings = [];
        $errorCount = 0;
        $report = [Calendar::t('Calendar Diagnostics'), $now->format(\DateTimeInterface::ATOM)];
        // Keep the full per-calendar details in the support report, independently of the compact UI.
        foreach ([...$sections, $calendars, $bookingCalendars] as $column) {
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
            'bookingCalendars' => $bookingCalendars,
            'bookingColumns' => array_map(static fn ($label) => Calendar::t($label), [
                'Handle', 'Bookings', 'Requested', 'Confirmed', 'Active', 'Booking Timezone',
                'Allow Guest Bookings', 'Require Approval', 'Allow Overlapping Bookings',
                'Booking Duration (Minutes)', 'Start-Time Interval (Minutes)', 'Buffer After Booking (Minutes)',
                'Minimum Notice (Hours)', 'Maximum Advance (Days)', 'Available From', 'Available Until',
                'Opening Hours', 'Availability Exceptions', 'Staff Notification Email', 'Supported Sites',
            ]),
            'bookingWarningCount' => \count(array_filter($bookingCalendars, static fn ($calendar) => $calendar['issueCount'] > 0)),
            'calendarWarningCount' => \count(array_filter($calendars, static fn ($calendar) => !$calendar['timezoneValid'])),
            'warnings' => $warnings,
            'errorCount' => $errorCount,
            'advisoryCount' => \count($warnings) - $errorCount,
            'report' => implode("\n", $report),
            'sampledAt' => $now->format(\DateTimeInterface::ATOM),
        ];
    }

    /** Aggregate only canonical, non-deleted bookings; never load customer data. */
    private function bookingCounts(): array
    {
        $counts = [];
        $query = (new Query())->select(['calendarId' => 'bookings.calendarId', 'bookingStatus' => 'bookings.bookingStatus', 'total' => 'COUNT(*)'])
            ->from(['bookings' => Booking::TABLE])
            ->innerJoin(['elements' => Table::ELEMENTS], '[[elements.id]] = [[bookings.id]]')
            ->where(['elements.dateDeleted' => null, 'elements.draftId' => null, 'elements.revisionId' => null])
            ->groupBy(['bookings.calendarId', 'bookings.bookingStatus'])
        ;
        foreach ($query->all() as $count) {
            $counts[(int) $count['calendarId']][$count['bookingStatus']] = (int) $count['total'];
        }

        return $counts;
    }

    private function bookingRulesRows(SchedulingSettings $settings, callable $row, \DateTimeImmutable $now, bool $defaults = false): array
    {
        $settings->validate();
        $errors = $settings->getErrors();
        $ruleRow = static fn (string $label, mixed $value, string $attribute, ?string $note = null) => $row(Calendar::t($label), $value, isset($errors[$attribute]) ? 'error' : 'none', isset($errors[$attribute]) ? implode(' ', $errors[$attribute]) : $note);
        $booleanRow = static fn (string $label, bool $value) => $row(Calendar::t($label), Calendar::t($value ? 'Enabled' : 'Disabled'), $value ? 'pass' : 'disabled', isBoolean: true);
        $rows = [];
        if (!$defaults) {
            $rows[] = $booleanRow('Active', $settings->active);
            $zone = DiagnosticsHelper::timezone($settings->timezone, $now);
            $rows[] = $ruleRow('Booking Timezone', $settings->timezone, 'timezone', $zone ? Calendar::t('Current local time: {time}. Daylight saving time: {dst}.', ['time' => $zone['clock'], 'dst' => Calendar::t($zone['dst'] ? 'Active' : 'Inactive')]) : null);
            $rows[] = $ruleRow('Available From', $settings->availableFrom ?: Calendar::t('No limit'), 'availableFrom');
            $until = $ruleRow('Available Until', $settings->availableUntil ?: Calendar::t('No limit'), 'availableUntil');
            if ($settings->active && $zone && !isset($errors['availableUntil']) && $settings->availableUntil && $settings->availableUntil < substr($zone['clock'], 0, 10)) {
                $until['status'] = 'warning';
                $until['statusLabel'] = Calendar::t('Advisory');
                $until['note'] = Calendar::t('This calendar’s availability has ended. New bookings cannot be made until its dates are extended.');
            }
            $rows[] = $until;
            $rows[] = $booleanRow('Allow Guest Bookings', $settings->allowGuests);
        }
        foreach (['duration' => 'Booking Duration (Minutes)', 'increment' => 'Start-Time Interval (Minutes)', 'buffer' => 'Buffer After Booking (Minutes)', 'minimumNotice' => 'Minimum Notice (Hours)', 'maximumAdvance' => 'Maximum Advance (Days)'] as $attribute => $label) {
            $rows[] = $ruleRow($label, $settings->{$attribute}, $attribute);
        }
        $rows[] = $booleanRow('Allow Overlapping Bookings', $settings->allowOverlap);
        $rows[] = $booleanRow('Require Approval', $settings->requireApproval);
        $rows[] = $ruleRow('Staff Notification Email', $settings->notificationEmail ? Calendar::t('Configured') : Calendar::t('Not configured'), 'notificationEmail');
        $periods = [];
        $weekdays = [1 => 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
        foreach ($settings->hours as $period) {
            if (\is_array($period) && isset($weekdays[$period['day'] ?? 0], $period['start'], $period['end'])) {
                $periods[] = Calendar::t($weekdays[$period['day']]).' '.$period['start'].'–'.$period['end'];
            }
        }
        $rows[] = $ruleRow('Opening Hours', implode('; ', $periods) ?: Calendar::t('None'), 'hours');
        if (!$defaults) {
            $rows[] = $ruleRow('Availability Exceptions', \count($settings->exceptions), 'exceptions');
        }
        $hasOpeningException = (bool) array_filter($settings->exceptions, static fn ($exception) => \is_array($exception) && 'hours' === ($exception['type'] ?? null));
        if (!$errors && !$settings->hours && !$hasOpeningException && ($defaults || $settings->active)) {
            $rows[] = $row(Calendar::t('Availability Rules'), Calendar::t('No opening hours'), 'warning', Calendar::t('No booking times are available until opening hours or an opening-hours exception is configured.'));
        }

        return $rows;
    }

    private function section(string $title, array $rows): array
    {
        return ['title' => $title, 'rows' => $rows];
    }
}
