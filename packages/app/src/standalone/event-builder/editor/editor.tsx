import { DatePicker, Icon } from "@cal/components/controls/date-picker/date-picker";
import { LightSwitch } from "@cal/components/controls/lightswitch/lightswitch";
import { utcTimestampToLocalDisplayDate } from "@cal/utils/date";
import translate from "@cal/utils/translations";
import { eventActions, eventSelectors } from "@event-builder/store/event.slice";
import type { AppDispatch } from "@event-builder/store/store";
import { type FC, useId, useMemo, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { type EditedOccurrence, EditedOccurrences } from "../edited-occurrences/edited-occurrences";
import { appSelectors } from "../store/app.slice";
import type { BuilderContext } from "../types";
import { CalendarPreview } from "./calendar-preview/calendar-preview";
import {
  DatePickersLightSwitchRepeatRulesWrapper,
  DatePickersLightSwitchWrapper,
  EventEditorWrapper,
} from "./editor.styles";
import {
  getAllDayEndDisplayTimestamp,
  isEndTimeAllowed,
  normalizeEndTimestamp,
} from "./editor.utilities";
import { RepeatRules } from "./repeat-rules/repeat-rules";

type Props = {
  context?: BuilderContext;
  onOccurrenceSaved?: () => void;
};

export const Editor: FC<Props> = ({ context, onOccurrenceSaved }) => {
  const allDayId = useId();
  const startId = useId();
  const endId = useId();
  const [occurrencesRevision, setOccurrencesRevision] = useState(0);
  const [editedOccurrences, setEditedOccurrences] = useState<EditedOccurrence[]>([]);

  const dispatch = useDispatch<AppDispatch>();
  const { start, end, allDay } = useSelector(eventSelectors.state);
  const { date, time, datetime } = useSelector(appSelectors.formats);
  const weekStartDay = useSelector(appSelectors.weekStartDay);
  const timeInterval = useSelector(appSelectors.timeInterval);
  const eventDuration = useSelector(appSelectors.eventDuration);

  const format = useMemo(() => {
    if (allDay) {
      return date.short.icu;
    }

    return datetime.short.icu;
  }, [allDay, date, datetime]);

  const endForDisplay = useMemo(() => {
    if (!allDay) return end;

    return getAllDayEndDisplayTimestamp(end);
  }, [allDay, end]);

  const handleEndChange = (value: number | null) => {
    if (value == null) return;
    dispatch(eventActions.setEnd(normalizeEndTimestamp({ value, start, allDay, timeInterval })));
  };

  return (
    <EventEditorWrapper>
      <DatePickersLightSwitchRepeatRulesWrapper>
        <DatePickersLightSwitchWrapper>
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
              timeIntervals: timeInterval,
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
              todayButton: translate("Today"),
              calendarStartDay: weekStartDay,
              timeIntervals: timeInterval,
              filterTime: (time) => isEndTimeAllowed(new Date(time), start, timeInterval),
            }}
          />
          <LightSwitch
            id={allDayId}
            label="All Day"
            enabled={allDay}
            style={{ margin: 0 }}
            onClick={(enabled) => dispatch(eventActions.setAllDay({ enabled, eventDuration }))}
          />
        </DatePickersLightSwitchWrapper>
        <RepeatRules />
        {context?.eventId && (
          <EditedOccurrences
            context={context}
            refreshKey={occurrencesRevision}
            onOccurrencesChanged={setEditedOccurrences}
          />
        )}
      </DatePickersLightSwitchRepeatRulesWrapper>
      <CalendarPreview
        context={context}
        editedOccurrences={editedOccurrences}
        onOccurrenceSaved={() => {
          setOccurrencesRevision((revision) => revision + 1);
          onOccurrenceSaved?.();
        }}
      />
    </EventEditorWrapper>
  );
};
