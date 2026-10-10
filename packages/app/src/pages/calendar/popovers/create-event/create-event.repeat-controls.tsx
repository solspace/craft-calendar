import { Control } from "@cal/components/controls/control";
import { DatePicker, Icon } from "@cal/components/controls/date-picker/date-picker";
import type {
  CalendarCreateDraft,
  QuickCreateRepeatType,
} from "@cal/pages/calendar/calendar.create-session";
import type { DateFormats, WeekStartDay } from "@cal/types/config";
import { localDisplayDateToUtcTimestamp, utcTimestampToLocalDisplayDate } from "@cal/utils/date";
import { getControlPanelLanguage, getDateLocale } from "@cal/utils/localization";
import translate from "@cal/utils/translations";
import {
  buildPreviewRecurrence,
  describeRecurrence,
} from "@event-builder/editor/calendar-preview/calendar-preview.operations";
import type { RepeatEndType } from "@event-builder/types";
import { addMonths, format } from "date-fns";
import { useId } from "react";
import { buildQuickCreateRecurrence, getQuickCreateUntil } from "./create-event.recurrence";
import { RepeatControls, RepeatEndFields, RepeatSummary } from "./create-event.styles";

type Props = {
  draft: CalendarCreateDraft;
  onChange: (draft: CalendarCreateDraft) => void;
  formats: DateFormats;
  weekStartDay: WeekStartDay;
  disabled: boolean;
};

export const QuickCreateRepeatControls = ({
  draft,
  onChange,
  formats,
  weekStartDay,
  disabled,
}: Props) => {
  const id = useId();
  const recurrence = draft.recurrence ?? { type: "NEVER", endType: "NEVER" };
  const start = utcTimestampToLocalDisplayDate(draft.start);
  const dateFormat = formats.date.short.icu ?? "P";
  const locale = getDateLocale();
  const schedule = buildQuickCreateRecurrence(draft);
  const summary = schedule
    ? describeRecurrence(buildPreviewRecurrence(schedule.rrule, draft.start), dateFormat)
    : null;
  const options: { value: QuickCreateRepeatType; label: string }[] = [
    { value: "NEVER", label: translate("Does not repeat") },
    { value: "DAILY", label: translate("Every Day") },
    { value: "WEEKDAYS", label: translate("Weekdays (Monday–Friday)") },
    {
      value: "WEEKLY",
      label: translate("Weekly on {weekday}", { weekday: format(start, "EEEE", { locale }) }),
    },
    { value: "MONTHLY", label: translate("Monthly on day {day}", { day: start.getDate() }) },
    {
      value: "YEARLY",
      label: translate("Yearly on {date}", {
        date: new Intl.DateTimeFormat(getControlPanelLanguage(), {
          month: "long",
          day: "numeric",
        }).format(start),
      }),
    },
  ];

  return (
    <RepeatControls>
      <Control label="Repeat" id={`${id}-repeat`}>
        <div className="select fullwidth">
          <select
            id={`${id}-repeat`}
            className="fullwidth"
            value={recurrence.type}
            disabled={disabled}
            onChange={(event) =>
              onChange({
                ...draft,
                recurrence: { ...recurrence, type: event.target.value as QuickCreateRepeatType },
              })
            }
          >
            {options.map(({ value, label }) => (
              <option key={value} value={value}>
                {label}
              </option>
            ))}
          </select>
        </div>
      </Control>
      {recurrence.type !== "NEVER" && (
        <>
          <RepeatEndFields>
            <Control label="Repeat ends" id={`${id}-ends`}>
              <div className="select fullwidth">
                <select
                  id={`${id}-ends`}
                  className="fullwidth"
                  value={recurrence.endType}
                  disabled={disabled}
                  onChange={(event) =>
                    onChange({
                      ...draft,
                      recurrence: {
                        ...recurrence,
                        endType: event.target.value as RepeatEndType,
                        count: recurrence.count ?? 10,
                        until:
                          recurrence.until ?? localDisplayDateToUtcTimestamp(addMonths(start, 1)),
                      },
                    })
                  }
                >
                  <option value="NEVER">{translate("Never")}</option>
                  <option value="ON_DATE">{translate("On a date")}</option>
                  <option value="AFTER">{translate("After...")}</option>
                </select>
              </div>
            </Control>
            {recurrence.endType === "AFTER" && (
              <Control label="Occurrences" id={`${id}-count`} required>
                <input
                  id={`${id}-count`}
                  className="text fullwidth"
                  type="number"
                  min={1}
                  step={1}
                  required
                  disabled={disabled}
                  value={recurrence.count ?? ""}
                  onChange={(event) =>
                    onChange({
                      ...draft,
                      recurrence: {
                        ...recurrence,
                        count: event.target.value === "" ? undefined : event.target.valueAsNumber,
                      },
                    })
                  }
                />
              </Control>
            )}
            {recurrence.endType === "ON_DATE" && (
              <DatePicker
                id={`${id}-until`}
                label={translate("Last date")}
                value={getQuickCreateUntil(draft)}
                required
                datePickerProps={{
                  disabled,
                  showIcon: true,
                  icon: <Icon />,
                  toggleCalendarOnIconClick: true,
                  dateFormat,
                  minDate: start,
                  showMonthDropdown: true,
                  showYearDropdown: true,
                  dropdownMode: "select",
                  calendarStartDay: weekStartDay,
                }}
                onChange={(until) => {
                  if (until !== null) onChange({ ...draft, recurrence: { ...recurrence, until } });
                }}
              />
            )}
          </RepeatEndFields>
          {summary && (
            <RepeatSummary role="status" aria-live="polite">
              {summary}
            </RepeatSummary>
          )}
        </>
      )}
    </RepeatControls>
  );
};
