import { eventActions, eventSelectors } from "@cal/event-builder/store/event.slice";
import type { AppDispatch } from "@cal/event-builder/store/store";
import { type FC, useId, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker } from "../controls/date-picker/date-picker";
import { LightSwitch } from "../controls/lightswitch/lightswitch";
import { CalendarPreview } from "./calendar-preview/calendar-preview";
import { EventEditorWrapper } from "./event.editor.styles";
import { RepeatRules } from "./repeat-rules/repeat-rules";

export const EventEditor: FC = () => {
  const allDayId = useId();
  const startId = useId();
  const endId = useId();

  const dispatch = useDispatch<AppDispatch>();
  const { start, end, allDay } = useSelector(eventSelectors.state);

  const format = useMemo(() => {
    if (allDay) {
      return "yyyy-MM-dd";
    }

    return "yyyy-MM-dd h:mm aa";
  }, [allDay]);

  return (
    <EventEditorWrapper>
      <div style={{ flex: 1 }}>
        <LightSwitch
          id={allDayId}
          label="All Day"
          enabled={allDay}
          onClick={(enabled) => dispatch(eventActions.setAllDay(enabled))}
        />

        <DatePicker
          id={startId}
          label="Starts"
          value={start}
          onChange={(value) => dispatch(eventActions.setStart(value))}
          datePickerProps={{
            id: startId,
            showTimeInput: !allDay,
            dateFormat: format,
          }}
        />

        <DatePicker
          id={endId}
          label="Ends"
          value={end}
          onChange={(value) => dispatch(eventActions.setEnd(value))}
          datePickerProps={{
            id: endId,
            dateFormat: format,
            showTimeInput: !allDay,
          }}
        />
      </div>

      <RepeatRules />
      <CalendarPreview />
    </EventEditorWrapper>
  );
};
