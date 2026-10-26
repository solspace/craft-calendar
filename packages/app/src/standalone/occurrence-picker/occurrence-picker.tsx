import { DatePicker, Icon } from "@cal/components/controls/date-picker/date-picker";
import type { DateFormats, WeekStartDay } from "@cal/types/config";
import { utcDateKey, utcDateTimeString, utcTimestampToLocalDisplayDate } from "@cal/utils/date";
import { useEffect, useId, useState } from "react";

export type OccurrencePickerConfig = {
  value: string;
  startValue: string;
  kind: "startDate" | "endDate";
  readOnly: boolean;
  formats: DateFormats;
  weekStartDay: WeekStartDay;
  timeInterval: number;
};

const timestamp = (value: string) => new Date(`${value}Z`).getTime() / 1000;

/** Preserve Craft's named inputs, timezone and validation while presenting Calendar's shared picker. */
export const OccurrencePicker = ({
  host,
  config,
}: {
  host: HTMLElement;
  config: OccurrencePickerConfig;
}) => {
  const id = useId();
  const fieldset = host.closest("fieldset")!;
  const [value, setValue] = useState(() => timestamp(config.value));
  const [start, setStart] = useState(() => timestamp(config.startValue));
  const [allDay, setAllDay] = useState(() => fieldset.classList.contains("is-all-day"));
  const [disabled, setDisabled] = useState(() => config.readOnly || fieldset.disabled);

  useEffect(() => {
    const source = Array.from(
      host.querySelectorAll<HTMLElement>(":scope > .input > :not([data-picker-root])"),
    );
    const hidden = source.map((element) => element.hidden);
    source.forEach((element) => {
      element.hidden = true;
    });
    const update = () => {
      setAllDay(fieldset.classList.contains("is-all-day"));
      setDisabled(config.readOnly || fieldset.disabled);
    };
    const observer = new MutationObserver(update);
    update();
    observer.observe(fieldset, { attributes: true, attributeFilter: ["class", "disabled"] });
    const onScheduleChange = (event: Event) => {
      const detail = (event as CustomEvent<{ kind: string; value: number }>).detail;
      if (detail.kind === "startDate") setStart(detail.value);
    };
    fieldset.addEventListener("calendar:occurrence-time-change", onScheduleChange);
    return () => {
      observer.disconnect();
      fieldset.removeEventListener("calendar:occurrence-time-change", onScheduleChange);
      source.forEach((element, index) => {
        element.hidden = hidden[index];
      });
    };
  }, [host, fieldset, config.readOnly]);

  const end = config.kind === "endDate";
  return (
    <DatePicker
      portal
      id={id}
      value={value}
      datePickerProps={{
        disabled,
        ariaLabelledBy: host.getAttribute("aria-labelledby") ?? undefined,
        ariaDescribedBy: host.getAttribute("aria-describedby") ?? undefined,
        showIcon: true,
        icon: <Icon />,
        toggleCalendarOnIconClick: true,
        popperClassName: "calendar-occurrence-datepicker",
        showMonthDropdown: true,
        showYearDropdown: true,
        dropdownMode: "select",
        showTimeSelect: !allDay,
        dateFormat:
          (allDay ? config.formats.date.short.icu : config.formats.datetime.short.icu) ||
          (allDay ? "P" : "Pp"),
        timeFormat: config.formats.time.short.icu || "p",
        calendarStartDay: config.weekStartDay,
        timeIntervals: config.timeInterval,
        minDate: end ? utcTimestampToLocalDisplayDate(start) : undefined,
        filterTime:
          end && !allDay
            ? (time) => time.getTime() >= utcTimestampToLocalDisplayDate(start).getTime()
            : undefined,
      }}
      onChange={(next) => {
        if (next === null || disabled) return;
        setValue(next);
        const carrier = new Date(next * 1000);
        const dateInput = host.querySelector<HTMLInputElement>(
          '.datewrapper input:not([type="hidden"])',
        );
        const timeInput = host.querySelector<HTMLInputElement>(
          '.timewrapper input:not([type="hidden"])',
        );
        // Craft explicitly accepts canonical ISO dates and 24-hour times for every formatting locale.
        if (dateInput) dateInput.value = utcDateKey(carrier);
        if (timeInput) timeInput.value = utcDateTimeString(carrier).slice(11);
        fieldset.dispatchEvent(
          new CustomEvent("calendar:occurrence-time-change", {
            detail: { kind: config.kind, value: next },
          }),
        );
        // Existing overlap checks and the slideout's dirty tracking listen to these original controls.
        for (const input of [dateInput, timeInput]) {
          input?.dispatchEvent(new Event("input", { bubbles: true }));
          input?.dispatchEvent(new Event("change", { bubbles: true }));
        }
      }}
    />
  );
};
