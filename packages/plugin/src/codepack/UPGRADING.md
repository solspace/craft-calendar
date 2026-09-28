# Calendar Demo Templates 2.1

Version 2.1 updates the demo to Bootstrap 5.3.8. The included templates use Bootstrap 5 classes and data attributes, with no jQuery dependency for popovers or mini calendar navigation. The pages also use Bootstrap cards, responsive spacing, and a more compact calendar layout. If your site extends the demo layout, check any Bootstrap 4 overrides and update custom dropdown, badge, and form styles when merging.

## Version 2.0

Version 2.0 updates event creation for the Calendar 6 API.

- Event forms now submit flat `start`, `end`, `until`, `repeatType`, `repeatEndType`, and `rrule` fields to `calendar/events-api/save`.
- Recurrence is serialized as a multiline RFC string containing `DTSTART`, `RRULE`, `RDATE`, and `EXDATE` values.
- All-day event end dates are exclusive.
- The FullCalendar example uses FullCalendar 6 and native browser dialogs.
- Frontend guest creation is limited to calendars selected in Calendar's Guest Access settings.

Demo templates are copied into the project's template and web directories during installation. Updating the Calendar plugin does not replace previously installed copies. Reinstall the codepack to a temporary prefix and merge the changes into customized templates.
