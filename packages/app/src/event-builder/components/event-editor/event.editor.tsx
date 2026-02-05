import { eventActions, eventSelectors } from "@cal/event-builder/store/event.slice";
import type { AppDispatch } from "@cal/event-builder/store/store";
import { type FC, useId, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DatePicker } from "../controls/date-picker/date-picker";
import { LightSwitch } from "../controls/lightswitch/lightswitch";
import CalendarIcon from "./calendar.icon.svg";
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
            showIcon: true,
            icon: <CalendarIcon />,
            toggleCalendarOnIconClick: true,
            showTimeSelect: !allDay,
            showMonthDropdown: true,
            showYearDropdown: true,
            dropdownMode: "select",
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
            showIcon: true,
            icon: <CalendarIcon />,
            toggleCalendarOnIconClick: true,
            showTimeSelect: !allDay,
            showMonthDropdown: true,
            showYearDropdown: true,
            dropdownMode: "select",
            dateFormat: format,
            filterTime: (time) => {
              if (!start) {
                return true;
              }

              const startDate = new Date(start * 1000);
              const selectedDate = new Date(time);

              return startDate.getTime() < selectedDate.getTime();
            },
          }}
        />
      </div>

      <RepeatRules />
      <CalendarPreview />
    </EventEditorWrapper>
  );
};
