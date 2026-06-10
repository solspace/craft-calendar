import { DatePicker, Icon } from "@cal/components/controls/date-picker/date-picker";
import { LightSwitch } from "@cal/components/controls/lightswitch/lightswitch";
import { localDisplayDateToUtcTimestamp, utcTimestampToLocalDisplayDate } from "@cal/utils/date";
import translate from "@cal/utils/translations";
import { eventActions, eventSelectors } from "@event-builder/store/event.slice";
import type { AppDispatch } from "@event-builder/store/store";
import { addDays, startOfDay, subDays } from "date-fns";
import { type FC, useId, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { appSelectors } from "../store/app.slice";
import { CalendarPreview } from "./calendar-preview/calendar-preview";
import { EventEditorWrapper } from "./editor.styles";
import { RepeatRules } from "./repeat-rules/repeat-rules";

export const Editor: FC = () => {
  const allDayId = useId();
  const startId = useId();
  const endId = useId();

  const dispatch = useDispatch<AppDispatch>();
  const { start, end, allDay } = useSelector(eventSelectors.state);
  const { date, time, datetime } = useSelector(appSelectors.formats);
  const weekStartDay = useSelector(appSelectors.weekStartDay);

  const format = useMemo(() => {
    if (allDay) {
      return date.short.icu;
    }

    return datetime.short.icu;
  }, [allDay, date, datetime]);

  const endForDisplay = useMemo(() => {
    if (!allDay) return end;

    return localDisplayDateToUtcTimestamp(subDays(utcTimestampToLocalDisplayDate(end), 1));
  }, [allDay, end]);

  const handleEndChange = (value: number | null) => {
    if (value == null) return;
    if (!allDay) {
      dispatch(eventActions.setEnd(value));
      return;
    }

    const pickedDay = utcTimestampToLocalDisplayDate(value);
    const exclusiveEnd = addDays(startOfDay(pickedDay), 1);
    dispatch(eventActions.setEnd(localDisplayDateToUtcTimestamp(exclusiveEnd)));
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
          onChange={(value) => dispatch(eventActions.setStart(value!))}
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
            timeFormat: time.short.icu,
            todayButton: translate("Today"),
            calendarStartDay: weekStartDay,
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
            minDate: utcTimestampToLocalDisplayDate(start),
            showTimeSelect: !allDay,
            showMonthDropdown: true,
            showYearDropdown: true,
            dropdownMode: "select",
            dateFormat: format,
            timeFormat: time.short.icu,
            calendarStartDay: weekStartDay,
            filterTime: (time) => {
              if (!start) {
                return true;
              }

              const startDate = utcTimestampToLocalDisplayDate(start);
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
