import translate from "@cal/utils/translations";
import type { DateSelectArg, EventApi, EventInput } from "@fullcalendar/core/index.js";

const DAY_IN_SECONDS = 24 * 60 * 60;

export const DEFAULT_CREATE_DRAFT_ID = "draft-create-event";
export const DEFAULT_CREATE_DRAFT_TITLE = "New Event";

export type CalendarCreateDraft = {
  id: string;
  title: string;
  allDay: boolean;
  start: number;
  end: number;
  preserveDuration?: boolean;
};

export type CalendarCreateDraftSettings = {
  allDayDefault: boolean;
  eventDuration: number;
};

const toTimestamp = (value: Date): number => Math.floor(value.getTime() / 1000);

const toUtcDayStartTimestamp = (timestamp: number): number => {
  const date = new Date(timestamp * 1000);

  return Math.floor(Date.UTC(date.getUTCFullYear(), date.getUTCMonth(), date.getUTCDate()) / 1000);
};

const addDays = (timestamp: number, days: number): number => timestamp + days * DAY_IN_SECONDS;

const getEventDurationSeconds = (
  settings: Pick<CalendarCreateDraftSettings, "eventDuration">,
): number => Math.max(1, settings.eventDuration) * 60;

const getTimedDuration = (
  draft: CalendarCreateDraft,
  settings: Pick<CalendarCreateDraftSettings, "eventDuration">,
): number =>
  draft.preserveDuration
    ? Math.max(60, draft.end - draft.start)
    : getEventDurationSeconds(settings);

const getAllDayDurationDays = (draft: CalendarCreateDraft): number =>
  Math.max(1, Math.round((draft.end - draft.start) / DAY_IN_SECONDS));

const hasClosest = (
  target: EventTarget | { closest?: (selector: string) => unknown } | null,
): target is { closest: (selector: string) => unknown } =>
  Boolean(target && typeof target === "object" && "closest" in target && target.closest);

export const buildCreateDraftFromSelection = (
  selection: Pick<DateSelectArg, "start" | "end" | "allDay">,
  settings: CalendarCreateDraftSettings,
): CalendarCreateDraft => {
  const selectedStart = toTimestamp(selection.start);
  const selectedEnd = toTimestamp(selection.end);
  // FullCalendar supplies an exclusive end for date cells and all-day rows.
  const multiDay = selection.allDay
    ? selectedEnd - selectedStart > DAY_IN_SECONDS
    : toUtcDayStartTimestamp(selectedEnd - 1) > toUtcDayStartTimestamp(selectedStart);
  const allDay = selection.allDay ? multiDay : settings.allDayDefault;
  // Date cells have no chosen hour; use the current local hour as a floating wall time.
  const start = allDay
    ? toUtcDayStartTimestamp(selectedStart)
    : selection.allDay
      ? toUtcDayStartTimestamp(selectedStart) + new Date().getHours() * 60 * 60
      : selectedStart;
  const end = allDay
    ? multiDay
      ? addDays(toUtcDayStartTimestamp(selectedEnd - 1), 1)
      : addDays(start, 1)
    : multiDay
      ? selectedEnd
      : start + getEventDurationSeconds(settings);

  return {
    id: DEFAULT_CREATE_DRAFT_ID,
    title: translate(DEFAULT_CREATE_DRAFT_TITLE),
    allDay,
    start,
    end,
    preserveDuration: multiDay,
  };
};

export const buildCreateDraftEventInput = (draft: CalendarCreateDraft): EventInput => ({
  id: draft.id,
  title: draft.title,
  start: new Date(draft.start * 1000),
  end: new Date(draft.end * 1000),
  allDay: draft.allDay,
  editable: false,
  startEditable: false,
  durationEditable: false,
  extendedProps: {
    isDraftCreate: true,
  },
});

export const getCreateDraftDisplayEnd = (draft: CalendarCreateDraft): number =>
  draft.allDay ? addDays(draft.end, -1) : draft.end;

export const setCreateDraftTitle = (
  draft: CalendarCreateDraft,
  title: string,
): CalendarCreateDraft => ({
  ...draft,
  title,
});

export const setCreateDraftAllDay = (
  draft: CalendarCreateDraft,
  allDay: boolean,
  settings: Pick<CalendarCreateDraftSettings, "eventDuration">,
): CalendarCreateDraft => {
  if (draft.allDay === allDay) {
    return draft;
  }

  if (allDay) {
    const nextStart = toUtcDayStartTimestamp(draft.start);
    const nextEnd = addDays(toUtcDayStartTimestamp(draft.end - 1), 1);

    return {
      ...draft,
      allDay: true,
      start: nextStart,
      end: Math.max(nextEnd, addDays(nextStart, 1)),
    };
  }

  return {
    ...draft,
    allDay: false,
    end:
      draft.start +
      (draft.preserveDuration ? (getAllDayDurationDays(draft) - 1) * DAY_IN_SECONDS : 0) +
      getEventDurationSeconds(settings),
  };
};

export const setCreateDraftStart = (
  draft: CalendarCreateDraft,
  start: number,
  settings: Pick<CalendarCreateDraftSettings, "eventDuration">,
): CalendarCreateDraft => {
  if (draft.allDay) {
    const nextStart = toUtcDayStartTimestamp(start);

    return {
      ...draft,
      start: nextStart,
      end: addDays(nextStart, getAllDayDurationDays(draft)),
    };
  }

  return {
    ...draft,
    start,
    end: start + getTimedDuration(draft, settings),
  };
};

export const setCreateDraftEnd = (
  draft: CalendarCreateDraft,
  end: number,
  settings: Pick<CalendarCreateDraftSettings, "eventDuration">,
): CalendarCreateDraft => {
  if (draft.allDay) {
    const displayEnd = toUtcDayStartTimestamp(end);
    const nextEnd = addDays(displayEnd, 1);

    return {
      ...draft,
      end: Math.max(nextEnd, addDays(toUtcDayStartTimestamp(draft.start), 1)),
    };
  }

  return {
    ...draft,
    end: Math.max(end, draft.start + getEventDurationSeconds(settings)),
  };
};

export const syncCreateDraftEvent = (event: EventApi, draft: CalendarCreateDraft): void => {
  event.setProp("title", draft.title);
  event.setAllDay(draft.allDay, {
    maintainDuration: false,
  });
  event.setDates(new Date(draft.start * 1000), new Date(draft.end * 1000), {
    allDay: draft.allDay,
  });
};

export const isCreateDraftEvent = (
  event: Pick<EventApi, "extendedProps"> | Pick<EventInput, "extendedProps"> | null | undefined,
): boolean =>
  Boolean(
    event?.extendedProps &&
      "isDraftCreate" in event.extendedProps &&
      event.extendedProps.isDraftCreate,
  );

export const isCreateDraftEventClickTarget = (
  target: EventTarget | { closest?: (selector: string) => unknown } | null,
  selector: string,
): boolean => hasClosest(target) && Boolean(target.closest(selector));
