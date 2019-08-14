# Solspace Calendar Changelog

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
