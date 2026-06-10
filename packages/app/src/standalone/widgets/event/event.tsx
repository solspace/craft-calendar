import { DatePicker, Icon } from "@cal/components/controls/date-picker/date-picker";
import { Dropdown } from "@cal/components/controls/dropdown/dropdown";
import { LightSwitch } from "@cal/components/controls/lightswitch/lightswitch";
import { TextInput } from "@cal/components/controls/text-input/text-input";
import { Flex } from "@cal/styles/components";
import type { Event } from "@cal/types/event";
import { utcTimestampToLocalDisplayDate } from "@cal/utils/date";
import translate from "@cal/utils/translations";
import clsx from "clsx";
import { type FC, useEffect, useId, useState, useTransition } from "react";
import { useEventState } from "./event.operations";
import { EventWidgetWrapper, SuccessMessage } from "./event.styles";
import type { EventWidgetConfig } from "./event.types";

const SUCCESS_MESSAGE_DURATION_MS = 3000;

export const EventWidget: FC<{ config: EventWidgetConfig }> = ({ config }) => {
  const id = useId();
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<string[] | null>(null);
  const [showSuccess, setShowSuccess] = useState(false);

  useEffect(() => {
    if (!showSuccess) return;
    const timeout = window.setTimeout(() => setShowSuccess(false), SUCCESS_MESSAGE_DURATION_MS);
    return () => window.clearTimeout(timeout);
  }, [showSuccess]);

  const { format, title, allDay, calendars, start, end, reset } = useEventState(config);
  const {
    formats: { time },
    currentSiteId,
  } = config;

  const handleSubmit = () => {
    startTransition(async () => {
      setErrors(null);

      const url = Craft.getCpUrl("calendar/api/events");

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "X-CSRF-Token": Craft.csrfTokenValue,
          "X-Scenario": "live",
        },
        body: JSON.stringify({
          title: title.value,
          allDay: allDay.value,
          start: start.value,
          end: end.value,
          calendar: calendars.value,
          siteId: currentSiteId,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        setErrors(error.errors || error.message);
        return;
      }

      const data = (await response.json()) as Event;

      Craft.cp.displayNotice(translate(`Event "{title}" created.`, { title: data.title }), {
        details: $("<a/>", {
          href: data.url,
          text: Craft.t("app", "View event"),
        }),
        icon: "check",
        iconLabel: Craft.t("app", "Success"),
      });

      reset();
      setShowSuccess(true);
    });
  };

  return (
    <EventWidgetWrapper>
      <Flex $direction="column" className="fullwidth">
        <Flex $alignItems="center" $justifyContent="space-between" style={{ width: "100%" }}>
          <TextInput
            id={`title-${id}`}
            label={translate("Title")}
            value={title.value}
            onChange={title.set}
            placeholder={translate("Title")}
            className="fullwidth"
            style={{ flex: 1 }}
          />

          <LightSwitch
            label="All Day"
            enabled={allDay.value}
            onClick={allDay.set}
            style={{ flex: "0 0 50px" }}
          />
        </Flex>

        <Dropdown
          id={`all-day-${id}`}
          label={translate("Calendar")}
          value={calendars.value}
          onChange={calendars.set}
          options={calendars.options}
        />

        <DatePicker
          id={`start-${id}`}
          label={translate("Start")}
          value={start.value}
          onChange={start.set}
          datePickerProps={{
            id: `start-picker-${id}`,
            icon: <Icon />,
            showIcon: true,
            dateFormat: format,
            timeFormat: time.short.icu,
            toggleCalendarOnIconClick: true,
            showTimeSelect: !allDay.value,
            showYearDropdown: true,
            showMonthDropdown: true,
            dropdownMode: "select",
            todayButton: translate("Today"),
            calendarStartDay: config.weekStartDay,
            timeIntervals: config.timeInterval,
          }}
        />

        <DatePicker
          id={`end-${id}`}
          label={translate("End")}
          value={end.displayValue}
          onChange={end.set}
          datePickerProps={{
            id: `end-picker-${id}`,
            icon: <Icon />,
            showIcon: true,
            dropdownMode: "select",
            dateFormat: format,
            timeFormat: time.short.icu,
            showTimeSelect: !allDay.value,
            showYearDropdown: true,
            showMonthDropdown: true,
            toggleCalendarOnIconClick: true,
            calendarStartDay: config.weekStartDay,
            timeIntervals: config.timeInterval,
            minDate: utcTimestampToLocalDisplayDate(start.value),
            filterTime: (time) => {
              if (!start.value) {
                return true;
              }

              const startDate = utcTimestampToLocalDisplayDate(start.value);
              const selectedDate = new Date(time);

              return startDate.getTime() < selectedDate.getTime();
            },
          }}
        />

        <button
          type="button"
          className={clsx(`btn`, `submit`, `icon`, `add`, isPending && "disabled")}
          disabled={isPending}
          onClick={handleSubmit}
        >
          {translate(isPending ? "Creating..." : "Create Event")}
        </button>
        {errors && (
          <ul className="error">
            {errors.map((error, index) => (
              <li key={index}>{translate(error)}</li>
            ))}
          </ul>
        )}
        {showSuccess && <SuccessMessage>{translate("Event created successfully")}</SuccessMessage>}
      </Flex>
    </EventWidgetWrapper>
  );
};
