import { DatePicker, Icon } from "@cal/components/controls/date-picker/date-picker";
import { LightSwitch } from "@cal/components/controls/lightswitch/lightswitch";
import { eventActions, eventSelectors } from "@cal/event-builder/store/event.slice";
import type { AppDispatch } from "@cal/event-builder/store/store";
import translate from "@cal/utils/translations";
import { addDays, getUnixTime, startOfDay, subDays } from "date-fns";
import { type FC, useId, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { CalendarPreview } from "./calendar-preview/calendar-preview";
import { EventEditorWrapper } from "./editor.styles";
import { RepeatRules } from "./repeat-rules/repeat-rules";

export const Editor: FC = () => {
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

  const endForDisplay = useMemo(() => {
    if (!allDay) return end;
    return getUnixTime(subDays(new Date(end * 1000), 1)); // show previous day
  }, [allDay, end]);

  const handleEndChange = (value: number | null) => {
    if (value == null) return;
    if (!allDay) {
      dispatch(eventActions.setEnd(value));
      return;
    }

    const pickedDay = new Date(value * 1000);
    const exclusiveEnd = addDays(startOfDay(pickedDay), 1);
    dispatch(eventActions.setEnd(getUnixTime(exclusiveEnd)));
  };

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
            icon: <Icon />,
            toggleCalendarOnIconClick: true,
            showTimeSelect: !allDay,
            showMonthDropdown: true,
            showYearDropdown: true,
            dropdownMode: "select",
            dateFormat: format,
            todayButton: translate("Today"),
          }}
        />

        <DatePicker
          id={endId}
          label="Ends"
          value={endForDisplay}
          onChange={handleEndChange}
          datePickerProps={{
            id: endId,
            showIcon: true,
            icon: <Icon />,
            toggleCalendarOnIconClick: true,
            minDate: new Date(start * 1000),
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
