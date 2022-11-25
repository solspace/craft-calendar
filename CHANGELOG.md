# Solspace Calendar Changelog

## 3.3.17 - 2022-12-27

### Fixed
- Fixed a bug where duplicating calendars no longer worked due to the removal of dash `-` in validation.
- Fixed a bug where ordering by `endDate DESC` would not return the latest event end date in GraphQL.
- Fixed a bug where `uri` and `typeHandle` were unavailable for events in GraphQL.

## 3.3.16 - 2022-09-12

### Fixed
- Fixed a bug where calendars with no fields in the layout would error when attempting to create new events.

## 3.3.15 - 2022-08-02

### Changed
- Changed the package name from `solspace/craft3-calendar` to `solspace/craft-calendar`.

### Fixed
- Fixed a bug where calendar handles could have dashes in them.
- Fixed a bug where saving an event with required fields in a multi-site environment could miss some error validation.

## 3.3.14 - 2022-07-27

### Added
- Added an on-demand option (`addFirstOccurrenceDate()`) to display the first occurrence date result in an occurrences list of events that use the "Select Dates" repeat rule.

### Fixed
- Fixed a bug where some sites making heavy use of the "Select Dates" repeat rule could experience performance issues.

## 3.3.13.1 - 2022-06-28

### Fixed
- Fixed a bug where fields that are not translatable were still being translated per site.
- Fixed a bug where the End Repeat date was overriding the Start Date (in 3.3.13 only).

## 3.3.13 - 2022-06-28

### Added
- Added `defineRules` to `CalendarModel` so users can define their validation rulesets.

### Fixed
- Fixed a bug where removing event occurrences from the CP Month/Week/Day view pages would sometimes use the day before, depending on your timezone.
- Fixed a bug where events that had exceptions for all occurrences would throw an error in the CP.
- Fixed a bug where mass changing of event statuses was allowed when the user did not have the correct permissions.
- Fixed a bug where `siteId` was not available in the GraphQL Event Interface.
- Fixed a potential PHP 8.1 compatibility issue.

## 3.3.12 - 2022-05-25

### Fixed
- Fixed a bug where editing existing events could trigger an error if using multiple sites in Craft 3.7.42+.

## 3.3.11 - 2022-04-25

### Changed
- Updated the Preview button to only be visible for saved events. Live Preview will only work with saved elements or ones with a saved draft, which is not currently available.

### Fixed
- Fixed a bug where deleting an event from inside the event edit page would not work.
- Fixed a bug where an error would show when using the "Save and add another" feature while creating a new calendar.
- Fixed a bug where displaying event recurrences could sometimes error.

## 3.3.10 - 2022-04-21

### Fixed
- Fixed a bug where various repeat rules were no longer working correctly when creating and editing events in the front end.
- Fixed a bug where events that repeat on "Select Dates" do not include the original event date as an occurrence in some areas of Calendar.

## 3.3.9 - 2022-03-01

### Fixed
- Fixed a bug where user groups and sites were not always being processed before performing project config updates.
- Fixed a bug where a database table alias in a query could break on some sites.
- Fixed a bug where passing GraphQL field definitions through `TypeManager` to fetch custom fields wouldn't always work.
- Fixed a bug where the "Restrict users to editing their own events only?" would not apply correctly on the front end templates.
- Fixed an issue where calling `Carbon::clone()` did not work for some sites.
- Fixed a bug where `EventQuery::count()` was not being compatible with the interface signature for PHP 8.1.

## 3.3.8 - 2021-12-27

### Fixed
- Fixed a bug where updates to Calendar via Project Config wouldn't always work on the first attempt.
- Fixed a bug where Calendar was not automatically resaving Event URI paths in the database when making changes to the path in the calendar settings.
- Fixed a bug where events that spanned multiple days/weeks/months could potentially cause issues with the month/week/day groupedBy methods.
- Fixed a bug where editing the "Select Dates" and "Exceptions" of events in the Element editor slideout were not working.
- Fixed a bug where attempting to edit any event data in Live Preview mode would make no difference at all.

## 3.3.7.1 - 2021-11-30

### Fixed
- Adjusted the 3.3.7 migration for primary key column in the `calendar_events` table to check if one already exists.

## 3.3.7 - 2021-11-09

### Changed
- Updated minimum Craft version requirement to 3.6+ to account for supporting GraphQL features.

### Fixed
- Fixed a bug where the `calendar_events` table did not have a primary key column for MySQL 8 support.
- Fixed a bug where there could be potential performance issues when loading CP Month/Week/Day view pages.
- Fixed a bug where Calendar permissions were using IDs instead of UIDs.
- Fixed a bug where `groupedByMonth()` and others were display an error when no events were found.

## 3.3.5 - 2021-09-21

### Added
- Added support for Craft 3.7+ element Slideout Editor.

### Fixed
- Fixed a bug where reordering events in the Calendar Events relation field would not work.

## 3.3.4 - 2021-09-15

### Fixed
- Fixed a bug where some native Element query arguments would not work with Calendar in GraphQL.
- Fixed a bug where `loadOccurrences` in GraphQL would not allow `int` values.

## 3.3.3 - 2021-07-30

### Fixed
- Fixed a bug where installing Craft with Calendar via Project Config would trigger an error about the default calendar.
- Fixed a bug where disabled events could not be deleted from the CP Month/Week/Day views.

## 3.3.2 - 2021-07-06

### Added
- Added `url`, `slug`, `multiDay` and `duration` GraphQL variables to the event query.

### Changed
- Adjusted the `z-index` of date and time pickers for better compatibility with other plugins.

### Fixed
- Fixed a bug where sites with PostgreSQL could fail while running the update migration.
- Fixed a bug where some field labels were not translatable in the event editor.

## 3.3.1 - 2021-06-16

### Fixed
- Fixed a bug where GraphQL support did not work with regular fields.
- Fixed a bug where the Site dropdown menu for the CP Month/Week/Day views would not filter out sites without calendars.
- Fixed a bug where sites with PostgreSQL could fail while running the update migration.
- Fixed a bug where the "Install Demo Templates" banner would re-appear after updates.

## 3.3.0 - 2021-05-26

> {warning} Calendar 3.3+ introduces support for Project Config on calendar settings and layouts. This means that if you have the `allowAdminChanges` Craft config setting set to `false`, that environment will no longer be able to add or modify calendars.

### Added
- Added support for GraphQL.
- Added support for Project Config on calendar settings and layouts.
- Added a Time Format setting to optionally override formatting of times in the Calendar control panel for all users.
- Added the ability to duplicate calendars.
- Added ability to set/change the status of multiple events from the CP Event index page.

### Fixed
- Fixed a bug where using the quick create event feature for an event that belongs to a calendar that is NOT enabled for the primary Craft site would not work.
- Fixed a bug where creating new events using the "New Event" dropdown from the CP Month/Week/Day views for calendars that don't have the primary Craft site enabled would run into issues.
- Fixed a bug where not specifying the `FREQ` setting for Calendar Feed Me mapping would cause the import to fail.
- Fixed a bug where saving and continuing a calendar would give a "Request contained an invalid body param" error.
- Fixed a bug where "Slug" was missing from the column options in the CP Events list index view.

## 3.2.1 - 2021-02-25

### Fixed
- Fixed a bug where ICS fields were not selectable from the custom field layout for each calendar.
- Fixed a bug where the Feed Me integration would not work smoothly in some cases with repeating events.
- Fixed a bug where the Feed Me integration might error when using relationship fields.

## 3.2.0 - 2021-02-11

### Added
- Added official support for importing data to Calendar events via the Craft Feed Me plugin.

## 3.1.0 - 2021-01-28

### Changed
- Updated the file structure of the Calendar plugin and updated Resources areas to show latest support options, etc.

## 3.0.15 - 2020-11-24

### Fixed
- Fixed a bug where the front end Guest Access feature could error in some cases.

## 3.0.14 - 2020-10-23

### Added
- Added `previousDateLocalized` and `nextDateLocalized` property as a more reliable replacement for `previousDate` and `nextDate` when needing to use `|date` filter on `month`/`week`/`day` objects to display translatable dates in calendar views.

### Fixed
- Fixed a bug where Live Preview was not working correctly for non-Calendar fields in Craft 3.5+.

## 3.0.13 - 2020-10-06

### Fixed
- Fixed a bug where the Occurrences object's default was not loading correctly for some recurring events.
- Fixed a bug where the Events CP index could trigger errors after upgrading from Craft 2 for installs that use database table prefixes.
- Fixed a bug where calendars on single-site installs were not taking into account the event enabled/disabled state in calendar site settings when creating new events.

## 3.0.12 - 2020-08-19

### Added
- Added a datepicker to the CP Month/Week/Day views to allow for much quicker navigating to months/weeks/days in the distant past or future.
- Added ability to set 5 and 10 minute time picker increments in addition to the previous 15, 30 and 60 minute increments.

### Fixed
- Fixed a bug where manually editing an end time was not possible at times.
- Fixed a bug where Calendar event elements could not be reordered inside the element fieldtype.

## 3.0.11 - 2020-07-29

### Fixed
- Fixed an issue where creating and editing events would trigger a deprecation notice about `enabledForSite`.

## 3.0.10 - 2020-07-24

### Changed
- Updated Calendar field layouts to now include support for Craft 3.5+ layout column improvements.

### Fixed
- Fixed some compatibility issues with Craft 3.5+.

## 3.0.9 - 2020-07-17

### Fixed
- Fixed a bug where Calendar was no longer compatible with PHP 7.0.

## 3.0.8 - 2020-07-14

### Fixed
- Fixed a bug where saving events in some time formats would error about the Post Date.

## 3.0.7 - 2020-07-08

### Fixed
- Fixed a bug where the 3.0.5 Post Date migration would fail for sites with a custom table prefix.

## 3.0.6 - 2020-07-08

### Fixed
- Fixed a bug where attempting to filter event results on `postDate` in front end templates was not working.
- Fixed a bug where the 3.0.5 Post Date migration would fail for PostgreSQL users.

## 3.0.5 - 2020-07-06

### Fixed
- Fixed a bug where Post Dates were not being recorded correctly for events.

## 3.0.4 - 2020-06-04

### Added
- Added `./craft calendar/events/resave` console command for the ability to resave all Calendar events. Most of the arguments available to `resave/entries` are available too, so if you need to also update the Craft Search Index, be sure to add `--update-search-index`.

### Changed
- Updated ICS subscriptions to allow passing of `site=siteHandle` into the URL to specify a certain site's translation of the data.

### Fixed
- Fixed a bug where some CP Month/Week/Day views didn't work correctly with Craft 3.4.18+ update to jQuery.
- Fixed a bug where saving "late night" events that overflow into the next day might not load correctly in the UI when editing.
- Fixed a bug where clicking the EDIT button inside the CP Month/Week/Day views on an event was not being linked correctly to include the site handle.

## 3.0.3 - 2020-04-28

### Fixed
- Fixed a bug where pagination and element results count was not displaying on CP Events index page.
- Fixed a bug where adding multi-day events to FullCal JS demo template were not displaying correctly when first added.
- Fixed a bug where creating new events that started late at night and needed to end after midnight were not correctly being accounted for.
- Fixed a bug where the main asset bundle wasn't loaded for action requests anymore.

## 3.0.2 - 2020-02-21

### Added
- Added `dateLocalized` property as a more reliable replacement for `date` when needing to use `|date` filter on `month`/`week`/`day` objects to display translatable date headings or highlight 'today' in calendar views.

### Fixed
- Fixed a bug where `startDateLocalized` and `endDateLocalized` were not working correctly.

## 3.0.1 - 2020-02-20

### Fixed
- Fixed a bug where some timezones would see incorrect behaviour with Month/Week/Day template functions.

## 3.0.0 - 2020-02-04

> {warning} This major version introduces editions support ('Lite' edition introduced - existing customers 'Standard' licenses become 'Pro' licenses) and requires Craft 3.4+ as well. Please ensure you have a recent database backup, and we recommend you test the update on a local/staging environment before updating your production server. [Please follow the upgrading guide available here](https://docs.solspace.com/craft/calendar/v3/setup/updating-calendar-2.html)!

### Added
- Added Lite edition for Calendar for simpler setups. The key differences are no ICS export/subscriptions, repeating rules, dashboard widgets and renaming of plugin name.
- Added ability to group a list of upcoming events by day, week or month, and display a heading for each.
- Added ability to show a list of upcoming events, but only display one (or a specified amount) of the next upcoming recurrences for repeating events, instead of all available ones.
- Added setting to disable (hide) the repeat rule options per calendar when editing/creating events.
- Added a 'Calendars' fieldtype, which allows for relating an entire calendar (ID) to other Craft elements.
- Added a setting that allows you to force a first day of week (overriding anything else in current locale-based behavior) for all users.
- Added ability to rename the plugin (Pro).

### Changed
- Overhauled the Create/Edit event UI to be more intuitive and also match Craft 3.4 styling.
- Updated dashboard widgets to be able to display data from other Craft sites, not just the current site.
- Improved demo templates to be a bit cleaner and easier to understand.

### Fixed
- Fixed a bug where the "Restrict users to editing their own events only?" feature was not working.
- Fixed a bug where if you use the Select Dates repeat rule and there's a required field that is empty, when you attempt to save the event, it'll return a hard error.
- Fixed a bug where clicking on any day number in the mini calendar in CP Month/Week/Day views and Dashboard Widget return an `Invalid data received for parameter "month".` error.
- Fixed a bug where using the 'Save and continue editing' option while creating a new event would advance to a different Site instead of staying on the current one.
- Fixed various IE11 display issues.

## 2.0.25 - 2019-10-30

### Changed
- Updated all Calendar CP page headings to be cleaner (removal of `Calendar: `, etc) and translatable.
- Updated the plugin icon.

### Fixed
- Fixed a bug where the Craft 3.2+ Element Export feature on Events index page would error.
- Fixed a bug where Calendar event data was not being included for all Sites in the Craft search index.
- Fixed a bug where including a Calendar Event field type in another Craft element CP index page's visible columns would error.
- Fixed a bug where the Calendar Event field type in another Craft element CP index page would only display 1 related event.
- Fixed a bug where the `Today` button in Month/Week/Day CP views wasn't translatable.
- Fixed a bug where the `calendar.calendars` function did not work with `orderBy` parameter.

## 2.0.24 - 2019-08-14

### Fixed
- Fixed a bug where ICS export was not exporting correctly for Safari.
- Fixed a bug where ICS subscription URL's were no longer working at all.

## 2.0.23 - 2019-08-13

### Fixed
- Fixed a bug where ICS export was not working correctly when `devMode` was disabled.

## 2.0.22 - 2019-07-31

### Fixed
- Fixed a bug where newly created events were not respecting the default site status setting in each calendar.
- Fixed a bug where events that were disabled couldn't be deleted from inside the edit event page.

## 2.0.21 - 2019-07-26

### Changed
- Updated `carbon` dependency to `^1.22.1|^2.19` for better compatibility with other plugins, and to reduce the chances of seeing deprecation notice.
- Updated event fetching to prevent from crashing when events have invalid dates.

### Fixed
- Fixed a bug in the database relation for the Calendar record.
- Fixed a bug where the developer event names were wrong for the Calendars and Events service files.

## 2.0.20 - 2019-05-14

### Changed
- Updated plugin icon.

### Fixed
- Fixed a bug where date pickers in the Create/Edit event CP page were not respecting the Week Start Day setting.
- Fixed a bug where Settings area in CP was still visible when the `allowAdminChanges` setting is disabled for Project Config.
- Fixed a bug where users/groups could still delete events in calendars they don't have permission to.

## 2.0.19 - 2019-04-15

### Fixed
- Fixed a bug where the `occurrences` object date ranges were not working correctly with events using the Select Dates repeat rule type.
- Fixed a bug where Calendar would hard error for events attempting to be created without times.
- Fixed a bug where events couldn't be ordered by `RAND()`.

## 2.0.18 - 2019-04-05

### Fixed
- Fixed a bug where events that started early in day but repeated daily and ended on a specific date would error due to timezone issues.
- Fixed a bug where an error would be triggered by Postgres when creating an Upcoming Events widget.
- Fixed a bug where demo templates were not correctly handling multi-day all-day events in the Month view.

## 2.0.17 - 2019-03-13

### Fixed
- Fixed a bug where the Share button token feature was not working on disabled events for logged out users.
- Fixed a bug where the CP Month/Week/Day views were not correctly adjusting exclude dates when dragging and dropping events to different days.

## 2.0.16 - 2019-02-26

### Changed
- Improved Calendar for better compatibility with other third party plugins such as Smart Maps.

### Fixed
- Fixed a bug where 'today' would highlight the wrong date in some edge cases in CP Month/Week/Day views.
- Fixed a bug where events were not able to be restored (from soft delete) in Craft 3.1+.
- Fixed a bug where upgrading from Craft 2 to Craft 3 version of Calendar could possibly trigger an error in the `AddIcsTimezoneToCalendar` migration.
- Fixed a bug where dragging and dropping events in CP Month/Week/Day views skipping a month in some edge cases in Craft 3.1+.
- Fixed a bug where saving recurring events with multiple sites enabled could cause an issue if the event is far enough in the future.

## 2.0.15 - 2019-02-06

### Fixed
- Fixed a bug where dragging and dropping events in CP Month/Week/Day views weren't working correctly (would shuffle by several days) in Craft 3.1+.

## 2.0.14 - 2019-01-30

### Fixed
- Fixed a bug where the mini calendar and date pickers in Month/Week/Day CP views was not respecting the 'First Day of Week' user account setting.
- Fixed some potential visual issues in create/edit event CP page.

## 2.0.13 - 2019-01-22

### Fixed
- Fixed a bug where Live Preview was not working correctly in Craft 3.0.
- Fixed a bug where Craft 2 to 3 migration was incorrectly migrating the Calendar Event Element type.

## 2.0.12 - 2018-12-28

### Changed
- Updated Demo Templates installer to be compatible with Craft 3.1.
- Updated Live Preview feature to be compatible with Craft 3.1.

### Fixed
- Fixed a bug where pagination was not working reliably for `calendar.events`.
- Fixed a bug where editing events with Select Dates repeat rule via front end could trigger some errors or was showing blank.

## 2.0.11 - 2018-12-13

### Changed
- Updated the Full Calendar JS demo templates to have a limit of 500 events to allow websites with many events to work more reliably by default.

### Fixed
- Fixed a bug where `status: null` was not working for displaying disabled events for `calendar.event`.
- Fixed a bug where `firstDay` parameter was not working correctly for front end templating.
- Fixed a bug where pagination was not working at all for `calendar.events`. An upcoming update will include a fix where pagination may show extra pages in some cases.
- Fixed a bug where exclusions might not save reliably in some cases.

## 2.0.10 - 2018-11-08

### Changed
- Updated demo templates to use Bootstrap 4.1 and made some general improvements.
- Updated event validation to no longer allow multi-day events to span longer than 365 days to prevent performance issues.

### Fixed
- Fixed a bug where editing events on the front end with Select Dates rule enabled would result in an error.
- Fixed a bug where the `.one()` method was not working correctly for Event query.

## 2.0.9 - 2018-11-01

### Changed
- Updated demo templates approach for viewing individual recurrences to validate that the date segments in URL match against an available recurrence.

### Fixed
- Fixed a bug where `startDateLocalized|date()` was not displaying the correct date when viewing recurrences.
- Fixed a bug where the `occurrenceDate` parameter was not working (was originally named `targetDate` - aliased now).

## 2.0.8 - 2018-10-17

### Fixed
- Fixed a bug where the CP Events list page would not load because of an accidental reference to Freeform.

## 2.0.7 - 2018-10-17

### Added
- Added `timezone` parameter for `calendar.export` function, allowing users to simulate a localized timezone, more-so as a workaround for Google Calendar not correctly supporting floating timezones.

### Changed
- Updated Events list CP page to only show available calendars when switching Sites, and to always append Site handle in URL when creating new events.

### Fixed
- Fixed a bug where CP and front end templates (month/week/day functions) were not localizing correctly for today's date.
- Fixed a bug where the End Repeat on Date input was incorrectly localizing the selected date when editing events.
- Fixed a bug where disabling the "Display Mini Calendar" setting for Calendar Month/Week/Day CP views would gives a JS error on those pages.
- Fixed a bug where CP Month/Week/Day views were looking for `jquery.qtip.min.map` and resulted in a JS error.
- Fixed a bug where CP Month/Week/Day views were not loading correctly if Fruit Studios Linkit fields were being used.
- Fixed a bug where querying manually for a list of events in a month was not always including all events that overlapped before the current month.

## 2.0.6 - 2018-09-06

### Fixed
- Fixed a bug where the `readableRepeatRule` was using the currently viewed occurrence of the event as the "starting from..." date, and not the original main start date of the event.
- Fixed a bug where the list of occurrences (`event.occurrences`) was being incorrectly incremented based on the currently viewed occurrence and the number of "times" it's supposed to repeat.
- Fixed a bug where the list of Select Dates recurrences in CP Edit event view was displaying the previous day when going back to edit an event.
- Fixed a bug where the Share button in CP Create/Edit event view was not generating a token in URL for disabled events.
- Fixed a bug where Live Preview template was not correctly showing all date formatting options correctly.
- Fixed a bug where Live Preview template was not displaying at all when the Select Dates repeat rule was used.
- Fixed a bug where the `simplifiedRepeatRule` property was not parsing as anything.
- Fixed a bug where required fields were not being validated when creating/editing events (in main create/edit CP page).

## 2.0.5 - 2018-07-26

### Fixed
- Fixed a bug where disabled events would error when being viewed/edited.
- Fixed a bug where Guest access for submitting events on front end was broken.
- Fixed a bug where Live Preview was not correctly showing some repeat rule options.

## 2.0.4 - 2018-07-04

### Added
- Added `endsBefore`, `endsBeforeOrAt`, `startsAfter` and `startsAfterOrAt` parameters to `calendar.events` function, for more flexibility to narrow down results.

### Fixed
- Fixed a bug where editing events would display a localized time in time pickers for start and end dates in recent versions of Craft.
- Fixed a bug where events with Select Dates rule were not having selected dates show up in calendars.
- Fixed a bug where the `rangeEnd` parameter was not correctly setting end time to `23:59:59`.
- Fixed a bug where dragging and dropping disabled events in CP Month/Week/Day views was not working.
- Fixed a bug where the Calendar 1.x to 2.x (Craft 2.x to 3.x) migration was not correctly fully migrating the Calendar fieldtype.

## 2.0.3 - 2018-06-12

### Changed
- Updated Demo Templates routes to be extension agnostic (no longer specifically include `.html` in route path).

### Fixed
- Fixed a bug where default start times would show a localized time when creating new events.
- Fixed a bug where excluding multiple calendar ID's in the `calendar.calendars` function would not work.
- Fixed a bug where the CP Events list page was not displaying status indicators.
- Fixed a bug where Demo Templates would strip dashes from specified URI path.

## 2.0.2 - 2018-06-05

### Added
- Added `startsBefore`, `endsAfter`, `startsBeforeOrAt`, and `endsAfterOrAt` parameters to `calendar.events` function, for more flexibility to narrow down results.

### Changed
- Updated Symfony dependencies to avoid conflicting with other plugins.

### Fixed
- Fixed a bug where the Calendar 1.x to 2.x (Craft 2.x to 3.x) migration was not migrating the Calendar fieldtype for elements.
- Fixed a bug where the Demo Templates installer would install duplicate routes if they already existed.
- Fixed a bug where searching on events in the control panel was not always reliable and would sometimes error.
- Fixed a bug where the EventQuery would not process negative limits properly.

## 2.0.1 - 2018-05-16

### Fixed
- Fixed a bug where the Event UI dates and times were being localized while editing an existing event in control panel.
- Fixed a bug where switching the Site selector while creating a new event would use the wrong CP URL path.

## 2.0.0 - 2018-05-15

### Changed
- Nothing to report here, other than that Calendar is now officially out of beta!

## 2.0.0-beta.10 - 2018-05-03

### Added
- Added `startDateLocalized` and `endDateLocalized` workaround properties to Event object for use with `|date` filter, which is compatible with translations.

### Fixed
- Fixed a bug where deleting calendars would not work.
- Fixed a bug where adding an Author column in Events list in CP would error.
- Fixed a bug where references to `dateRangeStart` and `dateRangeEnd` parameters would not work because they were renamed to `rangeStart` and `rangeEnd` for Calendar 2. They are now aliased so both ways work for legacy.
- Fixed a bug where the Calendar fieldtype (for relating events to Craft Entries) wouldn't let you reorder the events in the list (if you have more than 1).
- Fixed a bug where the Start Date and End Date columns in the Events list in CP incorrectly showed localized dates/times.
- Fixed a bug where Calendar's `get userID` could potentially conflict with other plugins.
- Fixed a bug where editing Sites could trigger a Calendar error.

## 2.0.0-beta.9 - 2018-04-04

### Fixed
- Fixed a bug where Calendar would error about `Client` constant in Craft 3.0.0 GA release, as the Client edition was removed without warning.

## 2.0.0-beta.8 - 2018-04-03

### Fixed
- Fixed a bug where sorting events in control panel by Post Date would error.
- Fixed several visual bugs in control panel.

## 2.0.0-beta.7 - 2018-03-26

### Fixed
- Updated Calendar to work with PostgreSQL.
- Fixed a bug where Calendar events were not routing correctly.
- Fixed a bug where some translations were missing in event creation UI.

## 2.0.0-beta.6 - 2018-03-20

### Fixed
- Actually added Calendar 1.x to 2.x (Craft 2.x to 3.x) migration path.
- Fixed a bug where Live Preview would show duplicates of some Calendar fields if the calendar layout didn't have any custom fields assigned to it.
- Fixed a bug where the `calendar.events` function was localizing date ranges.
- Fixed a bug where translations were not correctly being rendered in some areas.
- Fixed a bug where reinstalling Demo Templates would generate extra duplicate routes.
- Fixed a bug where Calendar CP would not respect non-US date formatting.
- Fixed a bug where adding new Sites wouldn't populate the necessary event and calendar sites tables.

## 2.0.0-beta.5 - 2018-03-19

### Fixed
- Added Live Preview functionality back.
- Added Calendar 1.x to 2.x (Craft 2.x to 3.x) migration path.
- Fixed a bug where the Calendar Event fieldtype was not available.
- Fixed a bug where the Agenda widget would visually allow you to drag and drop events (locked now).
- Fixed a bug where the Agenda widget would not correctly display all day and multi-day events.
- Fixed some deprecation errors with dashboard widgets.
- Fixed a bug where Quick Creating events with title format option was not working correctly.
- Fixed a bug where Events function wasn't correctly including multi-day events.
- Fixed a bug where translations were not being loaded.

## 2.0.0-beta.4 - 2018-03-15

### Fixed
- Added back all Calendar widgets.
- Fixed a bug where custom fields were not displaying in the Calendar CP area and on front end `calendar.events` function.
- Fixed a bug where events could not be sorted by calendar name in CP Events list.
- Fixed a bug where the 'Share this calendar' button for ICS subscriptions was not working inside CP.
- Fixed a bug where custom fields were not being included in ICS exports.

## 2.0.0-beta.3 - 2018-03-14

### Fixed
- Fixed a bug where the `calendar.events` function was not correctly filtering events by start and end date ranges.
- Fixed a bug where the Events service was calling `site` instead of `siteId`.
- Fixed a bug where CP Month/Week/Day views where events that were disabled for some sites were still being included when filtering by those sites.
- Fixed a bug where the Quick Create events feature in CP Month/Week/Day views was not correctly creating slugs.

## 2.0.0-beta.2 - 2018-03-13

### Fixed
- Fixed a bug where the `calendar.events` function was not displaying events in order.
- Fixed a bug where the `calendar.month` function was not prioritizing multi-day events to be displayed first (to improve overall display of month view).
- Fixed a bug where the time picker was showing behind the Quick Create feature in CP Month/Week/Day views.
- Fixed a bug where Calendar wouldn't work correctly with sites using database table prefixes.
- Fixed a bug where the Quick Create feature would not work with title format option.
- Fixed a bug where URI and slug generation was not working correctly.
- Fixed a bug where the 'Enabled for Site' toggle was missing on Event Create/Edit view.
- Fixed a bug where the `calendar.events` function was not ordering events correctly.
- Fixed a bug where the `calendar.events` function would display an error when filtering with a calendar handle and searching.
- Fixed a bug where an error would show when attempting to edit events on the front end templates.

## 2.0.0-beta.1 - 2018-03-09

### Added
- Added compatibility for Craft 3.x.
