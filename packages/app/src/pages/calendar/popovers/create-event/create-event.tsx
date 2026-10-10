import { Control } from "@cal/components/controls/control";
import { DatePicker, Icon } from "@cal/components/controls/date-picker/date-picker";
import { LightSwitch } from "@cal/components/controls/lightswitch/lightswitch";
import { TextInput } from "@cal/components/controls/text-input/text-input";
import { LiveOverlapWarning } from "@cal/components/overlap-warning/overlap-warning";
import {
  type CalendarCreateDraft,
  getCreateDraftDisplayEnd,
  setCreateDraftAllDay,
  setCreateDraftEnd,
  setCreateDraftStart,
  setCreateDraftTitle,
} from "@cal/pages/calendar/calendar.create-session";
import { utcTimestampToLocalDisplayDate } from "@cal/utils/date";
import translate from "@cal/utils/translations";
import clsx from "clsx";
import type { FC } from "react";
import { useId, useMemo, useState } from "react";
import { useEventListener } from "usehooks-ts";
import { useConfig } from "../../context/config.context";
import { CalendarDropdown } from "./create-event.calendar-dropdown";
import { useCreateEvent } from "./create-event.mutation";
import {
  buildQuickCreateRecurrence,
  isQuickCreateRecurrenceValid,
} from "./create-event.recurrence";
import { QuickCreateRepeatControls } from "./create-event.repeat-controls";
import {
  AllDayLabel,
  AllDayRow,
  CreateActionButtons,
  CreateActions,
  Fields,
  FlexTitle,
  MoreDetailsButton,
  PopoverCreateEventWrapper,
} from "./create-event.styles";

type Props = {
  draft: CalendarCreateDraft;
  onChange: (draft: CalendarCreateDraft) => void;
  refetchEvents: () => void;
  onConfirm: () => void;
  onCancel: () => void;
};

export const PopoverCreateEvent: FC<Props> = ({
  draft,
  onChange,
  refetchEvents,
  onConfirm,
  onCancel,
}) => {
  const {
    currentSiteId,
    showOverlapWarnings,
    calendars,
    calendarColors,
    calendarAllowRepeating,
    quickCreateFields,
    quickCreateRequiredFields,
    formats,
    weekStartDay,
    eventDuration,
    timeInterval,
  } = useConfig();
  const id = useId();
  const calendarOptions = useMemo(
    () =>
      Object.entries(calendars).map(([value, label]) => ({
        value: Number(value),
        label,
        color: calendarColors?.[Number(value)],
      })),
    [calendars, calendarColors],
  );
  const [calendarId, setCalendarId] = useState(calendarOptions[0]?.value ?? 0);
  const allowRepeating = calendarAllowRepeating?.[calendarId] ?? false;
  const effectiveDraft =
    allowRepeating || !draft.recurrence ? draft : { ...draft, recurrence: undefined };
  const validRecurrence = isQuickCreateRecurrenceValid(effectiveDraft);
  const recurrenceSchedule = buildQuickCreateRecurrence(effectiveDraft);
  const [fieldValues, setFieldValues] = useState<Record<number, Record<string, string>>>({});
  const mappedFields = quickCreateFields?.[calendarId];
  const locationHandle = mappedFields?.location;
  const descriptionHandle = mappedFields?.description;
  const requiredFields = quickCreateRequiredFields?.[calendarId];
  const values = fieldValues[calendarId] ?? {};
  const details =
    locationHandle || descriptionHandle
      ? {
          ...(locationHandle && { location: values[locationHandle] ?? "" }),
          ...(descriptionHandle && { description: values[descriptionHandle] ?? "" }),
        }
      : undefined;
  const setFieldValue = (handle: string, value: string) => {
    setFieldValues((current) => ({
      ...current,
      [calendarId]: { ...current[calendarId], [handle]: value },
    }));
  };
  const { createEvent, prepareEvent, error, isFetching, isOpeningEditor } = useCreateEvent({
    refetchEvents,
    onSuccess: onConfirm,
  });

  const format = useMemo(() => {
    if (draft.allDay) {
      return formats.date.short.icu;
    }

    return formats.datetime.short.icu;
  }, [formats, draft.allDay]);

  const displayEnd = useMemo(() => getCreateDraftDisplayEnd(draft), [draft]);

  useEventListener("keydown", (event) => {
    if (event.key === "Escape" && !isFetching) {
      onCancel();
    }
  });

  return (
    <PopoverCreateEventWrapper>
      <FlexTitle>
        <TextInput
          label={translate("Title")}
          id={`${id}-title`}
          required
          autofocus
          value={draft.title}
          placeholder={translate("Event Title")}
          onChange={(value) => onChange(setCreateDraftTitle(draft, value))}
        />
      </FlexTitle>

      <Fields>
        <CalendarDropdown
          value={calendarId}
          options={calendarOptions}
          onChange={(value) => {
            setCalendarId(value);
            if (!calendarAllowRepeating?.[value] && draft.recurrence)
              onChange({ ...draft, recurrence: undefined });
          }}
        />

        <hr />

        <AllDayRow>
          <LightSwitch
            enabled={draft.allDay}
            onClick={(value) => onChange(setCreateDraftAllDay(draft, value, { eventDuration }))}
          />
          <AllDayLabel
            onClick={() => onChange(setCreateDraftAllDay(draft, !draft.allDay, { eventDuration }))}
          >
            {translate("All Day")}
          </AllDayLabel>
        </AllDayRow>

        <DatePicker
          id={`${id}-start`}
          required
          label={translate("Starts")}
          value={draft.start}
          datePickerProps={{
            showIcon: true,
            icon: <Icon />,
            toggleCalendarOnIconClick: true,
            dateFormat: format,
            timeFormat: formats.time.short.icu,
            showTimeSelect: !draft.allDay,
            showMonthDropdown: true,
            showYearDropdown: true,
            dropdownMode: "select",
            calendarStartDay: weekStartDay,
            timeIntervals: timeInterval,
          }}
          onChange={(value) => {
            if (value !== null) {
              onChange(setCreateDraftStart(draft, value, { eventDuration }));
            }
          }}
        />
        <DatePicker
          id={`${id}-end`}
          required
          label={translate("Ends")}
          value={displayEnd}
          datePickerProps={{
            showIcon: true,
            icon: <Icon />,
            toggleCalendarOnIconClick: true,
            minDate: utcTimestampToLocalDisplayDate(draft.start),
            dateFormat: format,
            timeFormat: formats.time.short.icu,
            showTimeSelect: !draft.allDay,
            showMonthDropdown: true,
            showYearDropdown: true,
            dropdownMode: "select",
            calendarStartDay: weekStartDay,
            timeIntervals: timeInterval,
            filterTime: (time) => {
              if (!draft.start) {
                return true;
              }

              const startDate = utcTimestampToLocalDisplayDate(draft.start);
              const selectedDate = new Date(time);

              return startDate.getTime() < selectedDate.getTime();
            },
          }}
          onChange={(value) => {
            if (value !== null) {
              onChange(setCreateDraftEnd(draft, value, { eventDuration }));
            }
          }}
        />

        {allowRepeating && (
          <QuickCreateRepeatControls
            draft={draft}
            onChange={onChange}
            formats={formats}
            weekStartDay={weekStartDay}
            disabled={isFetching}
          />
        )}

        <LiveOverlapWarning
          formats={formats}
          enabled={showOverlapWarnings && !!calendarId && validRecurrence}
          schedule={{
            start: draft.start,
            end: draft.allDay ? draft.end - 1 : draft.end,
            allDay: draft.allDay,
            calendarId,
            siteId: currentSiteId,
            ...recurrenceSchedule,
          }}
        />

        {(locationHandle || descriptionHandle) && <hr />}

        {locationHandle && (
          <Control
            label={translate("Location")}
            id={`${id}-location`}
            required={requiredFields?.location}
          >
            <input
              id={`${id}-location`}
              type="text"
              className="text fullwidth"
              disabled={isFetching}
              aria-required={requiredFields?.location || undefined}
              value={values[locationHandle] ?? ""}
              onChange={(event) => setFieldValue(locationHandle, event.target.value)}
            />
          </Control>
        )}

        {descriptionHandle && (
          <Control
            label={translate("Description")}
            id={`${id}-description`}
            required={requiredFields?.description}
          >
            <textarea
              id={`${id}-description`}
              className="text fullwidth"
              rows={3}
              disabled={isFetching}
              aria-required={requiredFields?.description || undefined}
              value={values[descriptionHandle] ?? ""}
              onChange={(event) => setFieldValue(descriptionHandle, event.target.value)}
            />
          </Control>
        )}
      </Fields>

      <hr />

      {error && <p className="error">{error}</p>}

      <CreateActions $justifyContent="flex-end" $gap={8}>
        <MoreDetailsButton
          type="button"
          disabled={!calendarId || isFetching || !validRecurrence}
          onClick={async () => {
            const url = await prepareEvent(effectiveDraft, calendarId, details);
            if (url) window.location.href = url;
          }}
        >
          {translate(isOpeningEditor ? "Processing..." : "More details…")}
        </MoreDetailsButton>
        <CreateActionButtons>
          <button
            type="button"
            className={clsx("btn", isFetching && "disabled")}
            disabled={isFetching}
            onClick={onCancel}
          >
            {translate("Cancel")}
          </button>

          <button
            type="button"
            className={clsx("btn submit", isFetching && "disabled")}
            disabled={!draft.title || !calendarId || isFetching || !validRecurrence}
            onClick={() => createEvent(effectiveDraft, calendarId, details)}
          >
            {translate(isFetching && !isOpeningEditor ? "Creating Event..." : "Create Event")}
          </button>
        </CreateActionButtons>
      </CreateActions>
    </PopoverCreateEventWrapper>
  );
};
