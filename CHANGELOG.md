# Solspace Calendar Changelog

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
