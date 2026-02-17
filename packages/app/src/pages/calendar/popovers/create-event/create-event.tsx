import { DatePicker, Icon } from "@cal/components/controls/date-picker/date-picker";
import { LightSwitch } from "@cal/components/controls/lightswitch/lightswitch";
import { TextInput } from "@cal/components/controls/text-input/text-input";
import { usePopover } from "@cal/contexts/popover/popover.context";
import { Flex } from "@cal/styles/components";
import translate from "@cal/utils/translations";
import type { DateClickArg } from "@fullcalendar/interaction/index.js";
import clsx from "clsx";
import type { FC } from "react";
import { useEffect, useMemo, useState } from "react";
import { useEventListener } from "usehooks-ts";
import { useCreateEvent } from "./create-event.mutation";
import { FlexTitle, PopoverCreateEventWrapper } from "./create-event.styles";

type Props = {
  event: DateClickArg;
};

export type CreateEventState = {
  title: string;
  allDay: boolean;
  start: number;
  end: number;
};

export const PopoverCreateEvent: FC<Props> = ({ event }) => {
  const { hidePopover } = usePopover();
  const { createEvent, isFetching } = useCreateEvent();

  const refDate = useMemo(() => {
    const date = new Date();
    date.setMinutes(0, 0, 0);

    return date.getTime() / 1000;
  }, []);

  const [eventState, setEventState] = useState<CreateEventState>({
    title: "",
    allDay: true,
    start: refDate,
    end: refDate + 60 * 60,
  });

  useEffect(() => {
    if (!event) {
      return;
    }

    setEventState((prev) => ({
      ...prev,
      start: event.date.getTime() / 1000,
      end: event.date.getTime() / 1000 + 60 * 60,
    }));
  }, [event]);

  const format = useMemo(
    () => (eventState.allDay ? "yyyy-MM-dd" : "yyyy-MM-dd h:mm aa"),
    [eventState],
  );

  useEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      hidePopover();
    }
  });

  return (
    <PopoverCreateEventWrapper>
      <FlexTitle>
        <TextInput
          autofocus
          value={eventState.title}
          placeholder={translate("Event Title")}
          onChange={(value) => setEventState((prev) => ({ ...prev, title: value }))}
        />
        <LightSwitch
          enabled={eventState.allDay}
          onClick={(value) => setEventState((prev) => ({ ...prev, allDay: value }))}
        />
      </FlexTitle>

      <div>
        <DatePicker
          label={translate("Start Date")}
          value={eventState.start}
          datePickerProps={{
            showIcon: true,
            icon: <Icon />,
            toggleCalendarOnIconClick: true,
            dateFormat: format,
            showTimeSelect: !eventState.allDay,
            showMonthDropdown: true,
            showYearDropdown: true,
            dropdownMode: "select",
          }}
          onChange={(value) => {
            setEventState((prev) => ({ ...prev, start: value, end: value + 60 * 60 }));
          }}
        />
        <DatePicker
          label={translate("End Date")}
          value={eventState.end}
          datePickerProps={{
            showIcon: true,
            icon: <Icon />,
            toggleCalendarOnIconClick: true,
            minDate: new Date(eventState.start * 1000),
            dateFormat: format,
            showTimeSelect: !eventState.allDay,
            showMonthDropdown: true,
            showYearDropdown: true,
            dropdownMode: "select",
            filterTime: (time) => {
              if (!eventState.start) {
                return true;
              }

              const startDate = new Date(eventState.start * 1000);
              const selectedDate = new Date(time);

              return startDate.getTime() < selectedDate.getTime();
            },
          }}
          onChange={(value) => {
            setEventState((prev) => ({ ...prev, end: value }));
          }}
        />
      </div>

      <hr />

      <Flex>
        <button
          type="button"
          className={clsx("btn small submit", isFetching && "disabled")}
          disabled={!eventState.title || isFetching}
          onClick={() => createEvent(eventState)}
        >
          {translate(isFetching ? "Creating Event..." : "Create Event")}
        </button>

        <button
          type="button"
          className={clsx("btn small", isFetching && "disabled")}
          disabled={isFetching}
          onClick={() => hidePopover()}
        >
          {translate("Cancel")}
        </button>
      </Flex>
    </PopoverCreateEventWrapper>
  );
};
