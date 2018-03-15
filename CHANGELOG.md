# Solspace Freeform Changelog

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
