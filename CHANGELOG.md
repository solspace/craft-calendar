# Solspace Calendar Changelog

## 2.0.0-beta.7 - 2018-03-26
### Fixed
- Updated Calendar to work with PostgreSQL.
- Fixed a bug where Calendar events were not routing correctly.
- Fixed a bug where some translations were missing in event creation UI.

## 2.0.0-beta.6 - 2018-03-20
### Fixed
- Actually added Calendar 1.x to 2.x (Craft 2.x to 3.x) migration path (sorry!).
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
