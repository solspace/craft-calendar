# Calendar Demo Templates 2.0

Version 2.0 updates event creation for the Calendar 6 API.

- Event forms now submit flat `start`, `end`, `until`, `repeatType`, `repeatEndType`, and `rrule` fields to `calendar/events-api/save`.
- Recurrence is serialized as a multiline RFC string containing `DTSTART`, `RRULE`, `RDATE`, and `EXDATE` values.
- All-day event end dates are exclusive.
- The FullCalendar example uses FullCalendar 6 and native browser dialogs.
- Frontend guest creation is limited to calendars selected in Calendar's Guest Access settings.

Demo templates are copied into the project's template and web directories during installation. Updating the Calendar plugin does not replace previously installed copies. Reinstall the codepack to a temporary prefix and merge the changes into customized templates.
