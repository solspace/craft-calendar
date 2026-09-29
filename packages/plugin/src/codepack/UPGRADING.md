# Calendar Demo Templates 2.2

Version 2.2 adds a Tailwind CSS 4 theme and a framework selector in the shared navigation. Tailwind is the default. Selecting Bootstrap or Tailwind reloads the current page and saves the choice in the browser. The page templates and calendar styles are shared: `assets/css/bootstrap.css` loads the shared `calendar.css` over Bootstrap 5, while the precompiled `assets/css/tailwind.css` includes Tailwind 4 and the same shared calendar styles. Full Calendar still loads `full-calendar.css` in either mode.

Copy `assets/js/framework.js`, `assets/css/bootstrap.css`, `assets/css/calendar.css`, and `assets/css/tailwind.css` when upgrading an installed demo. The old `assets/css/main.css` is no longer used. Tailwind's editable source is `assets/css/tailwind.src.css`; from this repository, run `pnpm build:demo-tailwind` after changing it or the shared calendar CSS. The precompiled output is shipped with the codepack, so sites installing the demo do not need Node or a Tailwind build step.

## Version 2.1

Version 2.1 updates the demo to Bootstrap 5.3.8. The included templates use Bootstrap 5 classes and data attributes, with no jQuery dependency for popovers or mini calendar navigation. The pages also use Bootstrap cards, responsive spacing, and a more compact calendar layout. If your site extends the demo layout, check any Bootstrap 4 overrides and update custom dropdown, badge, and form styles when merging.

The event editor and FullCalendar page scripts now live in `assets/js/event-editor.js` and `assets/js/full-calendar.js`. If you customized either inline script in a previously installed template, merge those changes into the corresponding new asset. Keep the JSON configuration in the Twig template for Craft values and translated labels.

The Week and Day views now share `templates/layouts/_agenda_event.twig`. Copy this partial when merging either view into an existing demo installation.

The demo now includes `assets/js/theme.js` and a Light, Dark, and Auto menu in the shared layout. Copy the script and merge the updated stylesheets and layout when updating an existing installation. Auto follows the system appearance; an explicit choice is saved in the browser.

The Full Calendar page uses `assets/css/full-calendar.css` for its controls, grid, and dialog styles. Copy this file to your installed demo assets alongside `templates/fullcalendar.twig` when updating an existing installation.

The Month view uses a compact expandable sidebar so the calendar has more room. Merge `templates/month.twig` and the shared calendar styles together to retain the sidebar controls.

## Version 2.0

Version 2.0 updates event creation for the Calendar 6 API.

- Event forms now submit flat `start`, `end`, `until`, `repeatType`, `repeatEndType`, and `rrule` fields to `calendar/events-api/save`.
- Recurrence is serialized as a multiline RFC string containing `DTSTART`, `RRULE`, `RDATE`, and `EXDATE` values.
- All-day event end dates are exclusive.
- The FullCalendar example uses FullCalendar 6 and native browser dialogs.
- Frontend guest creation is limited to calendars selected in Calendar's Guest Access settings.

Demo templates are copied into the project's template and web directories during installation. Updating the Calendar plugin does not replace previously installed copies. Reinstall the codepack to a temporary prefix and merge the changes into customized templates.
