import { DatePicker, Icon } from "@cal/components/controls/date-picker/date-picker";
import { LightSwitch } from "@cal/components/controls/lightswitch/lightswitch";
import { TextInput } from "@cal/components/controls/text-input/text-input";
import { usePopover } from "@cal/contexts/popover/popover.context";
import { Flex } from "@cal/styles/components";
import translate from "@cal/utils/translations";
import type { DateClickArg } from "@fullcalendar/interaction/index.js";
import type { FC } from "react";
import { useEffect, useMemo, useState } from "react";
import { useEventListener } from "usehooks-ts";
import { FlexTitle, PopoverCreateEventWrapper } from "./create-event.styles";

type Props = {
  event: DateClickArg;
};

export const PopoverCreateEvent: FC<Props> = ({ event }) => {
  const { hidePopover } = usePopover();

  const refDate = useMemo(() => {
    const date = new Date();
    date.setMinutes(0, 0, 0);

    return date.getTime() / 1000;
  }, []);

  const [title, setTitle] = useState("");
  const [allDay, setAllDay] = useState(true);

  const [start, setStart] = useState(refDate);
  const [end, setEnd] = useState(refDate + 60 * 60);

  useEffect(() => {
    if (!event) {
      return;
    }

    setStart(event.date.getTime() / 1000);
    setEnd(event.date.getTime() / 1000 + 60 * 60);
  }, [event]);

  const format = useMemo(() => {
    if (allDay) {
      return "yyyy-MM-dd";
    }

    return "yyyy-MM-dd h:mm aa";
  }, [allDay]);

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
          value={title}
          placeholder={translate("Event Title")}
          onChange={(value) => setTitle(value)}
        />
        <LightSwitch enabled={allDay} onClick={(value) => setAllDay(value)} />
      </FlexTitle>

      <div>
        <DatePicker
          label={translate("Start Date")}
          value={start}
          datePickerProps={{
            showIcon: true,
            icon: <Icon />,
            toggleCalendarOnIconClick: true,
            dateFormat: format,
            showTimeSelect: !allDay,
            showMonthDropdown: true,
            showYearDropdown: true,
            dropdownMode: "select",
          }}
          onChange={(value) => {
            setStart(value);
            setEnd(value + 60 * 60);
          }}
        />
        <DatePicker
          label={translate("End Date")}
          value={end}
          datePickerProps={{
            showIcon: true,
            icon: <Icon />,
            toggleCalendarOnIconClick: true,
            minDate: new Date(start * 1000),
            dateFormat: format,
            showTimeSelect: !allDay,
            showMonthDropdown: true,
            showYearDropdown: true,
            dropdownMode: "select",
            filterTime: (time) => {
              if (!start) {
                return true;
              }

              const startDate = new Date(start * 1000);
              const selectedDate = new Date(time);

              return startDate.getTime() < selectedDate.getTime();
            },
          }}
          onChange={(value) => {
            setEnd(value);
          }}
        />
      </div>

      <hr />

      <Flex>
        <button type="button" className="btn small submit" disabled={!title}>
          {translate("Create Event")}
        </button>

        <button type="button" className="btn small" onClick={() => hidePopover()}>
          {translate("Cancel")}
        </button>
      </Flex>
    </PopoverCreateEventWrapper>
  );
};
