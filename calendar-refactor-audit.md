# Calendar Plugin Occurrence Refactor Audit

## Goal
- Stop cloning `Event` elements per recurrence inside queries; persist each occurrence in its own row and return occurrence objects (with an event reference) to Twig/GraphQL/API.
- Store dates in the correct timezone (server, per-event override, or calendar default) with support for floating time; avoid forced UTC conversions.

## Current Behaviour Snapshot
- **Data model**: `calendar_events` stores the base event plus recurrence fields (`freq`, `interval`, `until`, `count`, `byDay`/`byMonthDay`/`byMonth`). Exceptions live in `calendar_exceptions`; manual dates in `calendar_select_dates`. `calendar_occurrences` is created in `packages/plugin/src/migrations/Install.php` but no model/service uses it. `Bundles/Occurrences/OccurrencePersistence.php` is empty.
- **Occurrence generation/querying**:
  - `packages/plugin/src/Elements/Db/EventQuery.php` builds a list of event IDs, then expands recurrences in PHP (`cacheRecurringEvents`) and pushes `[date, eventId, siteId]` into `$eventCache`; `cacheToStorage()` clones each `Event` via `Event::cloneForDate()` so `all()` returns per-occurrence clones rather than base events.
  - `packages/plugin/src/Elements/Event.php::getOccurrences()` and `getOccurrenceDatesBetween()` expand recurrences/select dates and clone the element per date.
  - `packages/plugin/src/Variables/CalendarVariable.php::event()` clones for `targetDate`/`occurrenceDate`. View helpers `Library/Events/EventMonth|Week|Day|Hour` rely on the cloned occurrences returned by `EventQuery`.
  - GraphQL `loadOccurrences` arg (`Bundles/GraphQL/Arguments/EventArguments.php`) controls the in-query expansion, still returning cloned `Event` objects.
- **Persistence & editing**:
  - `packages/plugin/src/Elements/Event.php::afterSave()` writes to `calendar_events`, `calendar_select_dates`, and `calendar_exceptions` only; no occurrence persistence. `EventsService::saveEvent()` just saves the element.
  - UI transformers (`Library/Transformers/UiDataToEventTransformer.php` and `EventToUiDataTransformer.php`) convert to/from builder JSON; date stamps are treated as UTC.
  - Drag/drop/resize APIs (`Controllers/EventsApiController.php`) mutate the base event or select-date rows, assuming the occurrence is a cloned element, not a persisted row.
- **Outputs using cloned events**:
  - CP calendar JSON (`Controllers/ViewController.php::actionMonthData()`), public API (`Controllers/ApiController.php`), and JS (`Resources/js/scripts/widgets/month.js`, `Resources/js/scripts/calendars/popups.js`) expect event clones with `start`/`end` matching the occurrence.
  - ICS export (`Library/Export/ExportCalendarToIcs.php`) expands recurrences on the fly from the base event.
  - Demo templates (`packages/plugin/src/codepack/templates/*.html`) loop over `event.occurrences(...)`.
- **Date/time handling today**
  - Almost all date creation uses UTC: event ctor (`Event::__construct`), query parsing, controllers, transformers, select/exceptions services, etc. (`DateHelper::UTC` everywhere).
  - No event-level timezone field; calendar has `icsTimezone` (default `floating`) for export only. Stored DB datetimes are effectively UTC, even when the desired behaviour is server/calendar/event timezone.
  - `Event::jsonSerialize()` emits `start`/`end` via `toAtomString()` (UTC). ICS export switches between UTC/floating/timezone based on the option, not the stored tz.

## Refactor Touchpoints (by area)
- **Data schema & models**
  - `packages/plugin/src/migrations/Install.php` (current occurrence table), plus new Record/Model/Service classes to actually use `calendar_occurrences`.
  - Consider migration for event-level timezone or per-occurrence timezone defaulting to calendar/server (`CalendarModel` currently only has `icsTimezone`).
- **Persistence pipeline**
  - `packages/plugin/src/Elements/Event.php::afterSave()` and `Services/EventsService.php::saveEvent()` to generate and upsert/delete occurrence rows when recurrences/select dates/exceptions change.
  - `Services/SelectDatesService.php`, `Services/ExceptionsService.php` for timezone-aware storage and for signalling occurrence regeneration.
- **Occurrence calculation**
  - Reuse/adjust recurrence helpers in `EventQuery` and `Event` (RRule expansion, select dates, exceptions) to produce occurrence payloads for persistence instead of cloning elements.
  - Remove/replace `Event::cloneForDate()` usage once occurrences come from the DB.
- **Query/read surface**
  - Replace `EventQuery` expansion with queries against `calendar_occurrences` (or a new `OccurrenceQuery` element). Ensure range filters, `loadOccurrences`, `shuffle`, ordering, and aggregation helpers (`getEventsByMonth|Week|Day|Hour`) work with persisted occurrences while still exposing the parent `Event`.
  - Update Twig variable entrypoints `packages/plugin/src/Variables/CalendarVariable.php::events()`/`event()` to return occurrences (with `event` relation) instead of cloned events.
  - GraphQL args/types (`Bundles/GraphQL/Arguments/EventArguments.php` and related schemas) to expose occurrence queries/fields.
- **API/UI layers**
  - CP/public endpoints: `Controllers/ViewController.php`, `Controllers/ApiController.php`, `Controllers/EventsApiController.php` (drag/drop/resize/delete occurrence) to target occurrence rows and keep event recurrence rules/exceptions in sync.
  - JS consumers in `packages/plugin/src/Resources/js/scripts/**` and demo templates to consume occurrence objects (likely `{id, eventId, start, end, allDay, timezone, event: {...}}`) instead of cloned events.
  - `Event::jsonSerialize()` (or new serializer) to emit occurrence-aware payloads.
- **Export/other features**
  - `Library/Export/ExportCalendarToIcs.php` should read from persisted occurrences (or shared generator) and honour timezone per occurrence.
  - FeedMe/import bundle, `Bundles/ExternalPluginSupport/FeedMe/CalendarIntegration.php`, may need the new persistence path.
  - Any fieldtype integrations (`FieldTypes/EventFieldType.php`) and view data builders (`Library/Events/*`) that assume cloned events.
- **Date/time handling**
  - Inputs: `UiDataToEventTransformer`, `EventsApiController`, `ViewController`, `EventQuery` parameter parsing, `DateHelper` utilities.
  - Storage: event/occurrence `start`/`end` fields, select/exceptions services.
  - Outputs: `EventToUiDataTransformer`, `Event::jsonSerialize()`, ICS export, GraphQL resolvers.

## Plan of Action
1) **Define timezone strategy & schema**: Decide where timezone lives (event-level with override/fallback to calendar/server; floating option). Add/adjust schema and models/records for occurrences and timezone fields; write migration/backfill for existing events.
2) **Occurrence generation service**: Centralize recurrence expansion (RRule + select dates - exceptions, respecting timezone/all-day) into a service that outputs occurrence DTOs/rows. Use it both for persistence and non-persisted contexts (backfill, tests).
3) **Persist on save**: In `EventsService`/`Event::afterSave`, detect changes to recurrence inputs (start/end/allDay/rrule/select dates/exceptions/timezone) and delete+recreate occurrence rows atomically. Keep select/exceptions saving in sync.
4) **Query layer overhaul**: Replace `EventQuery` cloning logic with occurrence lookups. Either create `Occurrence` element/query or extend `EventQuery` to join `calendar_occurrences` and hydrate occurrence objects that carry the parent `Event`. Update range/limit/order/shuffle helpers and caches (`getEventsByMonth|Week|Day|Hour`) accordingly.
5) **Twig/GraphQL/API contract**: Shift `CalendarVariable->events/event`, GraphQL arguments/types, and API endpoints to return occurrence objects (with an `event` relation). Provide backward-compatible shims where possible or add deprecation messaging.
6) **UI & controllers**: Update CP/month/day JSON responses, drag/drop/resize/delete actions, and JS consumers to work with occurrence IDs and payloads. Ensure changes propagate to event rules when needed (e.g., moving a single select-date occurrence vs adjusting the base rule).
7) **Export and secondary features**: Point ICS export and any feeds/imports at the occurrence source (or shared generator) and respect timezone semantics. Update demo templates and fieldtype rendering to the new shape.
8) **Timezone correctness pass**: Replace forced `DateHelper::UTC` instantiations with the agreed timezone behaviour across transformers, services, controllers, and serializers; ensure floating time is preserved.
9) **Backfill & validation**: Add a utility/migration to populate `calendar_occurrences` for existing events, plus sanity checks/tests around recurrence expansion, timezone handling, and API outputs.
