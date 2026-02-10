import { isDebugMode } from "@cal/utils/debug";
import { format } from "date-fns";
import { type FC, useMemo } from "react";
import { useSelector } from "react-redux";
import { rrulestr } from "rrule";
import { EventEditor } from "./components/event-editor/event.editor";
import { EventBuilderWrapper } from "./event-builder.styles";
import { eventSelectors } from "./store/event.slice";

export const EventBuilder: FC = () => {
  const { start, end, until, allDay, rrule, repeatType, repeatEndType } = useSelector(
    eventSelectors.state,
  );

  const isDebug = useMemo(isDebugMode, []);
  const occurrences = rrule
    ? rrulestr(rrule)
        .all((_, i) => i < 10)
        .map((date) => format(date, "yyyy-MM-dd HH:mm"))
    : [];

  return (
    <EventBuilderWrapper>
      <EventEditor />

      {isDebug && (
        <code>
          <pre>{rrule}</pre>
          <pre>{JSON.stringify(occurrences, null, 2)}</pre>
        </code>
      )}
    </EventBuilderWrapper>
  );
};
