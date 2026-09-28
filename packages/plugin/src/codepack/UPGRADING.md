# Calendar Demo Templates 2.1

Version 2.1 updates the demo to Bootstrap 5.3.8. The included templates use Bootstrap 5 classes and data attributes, with no jQuery dependency for popovers or mini calendar navigation. The pages also use Bootstrap cards, responsive spacing, and a more compact calendar layout. If your site extends the demo layout, check any Bootstrap 4 overrides and update custom dropdown, badge, and form styles when merging.

The event editor and FullCalendar page scripts now live in `assets/js/event-editor.js` and `assets/js/full-calendar.js`. If you customized either inline script in a previously installed template, merge those changes into the corresponding new asset. Keep the JSON configuration in the Twig template for Craft values and translated labels.

The Week and Day views now share `templates/layouts/_agenda_event.twig`. Copy this partial when merging either view into an existing demo installation.

## Version 2.0

Version 2.0 updates event creation for the Calendar 6 API.

- Event forms now submit flat `start`, `end`, `until`, `repeatType`, `repeatEndType`, and `rrule` fields to `calendar/events-api/save`.
- Recurrence is serialized as a multiline RFC string containing `DTSTART`, `RRULE`, `RDATE`, and `EXDATE` values.
- All-day event end dates are exclusive.
- The FullCalendar example uses FullCalendar 6 and native browser dialogs.
- Frontend guest creation is limited to calendars selected in Calendar's Guest Access settings.

Demo templates are copied into the project's template and web directories during installation. Updating the Calendar plugin does not replace previously installed copies. Reinstall the codepack to a temporary prefix and merge the changes into customized templates.
