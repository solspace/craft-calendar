import { usePopover } from "@cal/contexts/popover/popover.context";
import { DatePicker } from "@cal/event-builder/components/controls/date-picker/date-picker";
import { LightSwitch } from "@cal/event-builder/components/controls/lightswitch/lightswitch";
import { TextInput } from "@cal/event-builder/components/controls/text-input/text-input";
import CalendarIcon from "@cal/event-builder/components/event-editor/calendar.icon.svg";
import translate from "@cal/utils/translations";
import type { FC } from "react";
import { useState } from "react";
import { useEventListener } from "usehooks-ts";
import { FlexTitle, PopoverCreateEventWrapper } from "./create-event.styles";

export const PopoverCreateEvent: FC = () => {
  const { hidePopover } = usePopover();

  const [title, setTitle] = useState("");
  const [enabled, setEnabled] = useState(true);

  const [start, setStart] = useState(Date.now() / 1000);
  const [end, setEnd] = useState(Date.now() / 1000 + 60 * 60);

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
        <LightSwitch enabled={enabled} onClick={(value) => setEnabled(value)} />
      </FlexTitle>

      <DatePicker
        label={translate("Start Date")}
        value={start}
        datePickerProps={{
          showIcon: true,
          icon: <CalendarIcon />,
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
          icon: <CalendarIcon />,
          minDate: new Date(start * 1000),
        }}
        onChange={(value) => {
          setEnd(value);
        }}
      />
    </PopoverCreateEventWrapper>
  );
};
