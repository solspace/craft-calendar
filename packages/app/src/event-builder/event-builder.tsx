import { format } from "date-fns";
import type { FC } from "react";
import { useSelector } from "react-redux";
import { rrulestr } from "rrule";
import { EventEditor } from "./components/event-editor/event.editor";
import { EventBuilderWrapper } from "./event-builder.styles";
import { eventSelectors } from "./store/event.slice";

export const EventBuilder: FC = () => {
  const { start, end, until, allDay, rrule, repeatType, repeatEndType } = useSelector(
    eventSelectors.state,
  );

  const occurrences = rrule
    ? rrulestr(rrule)
        .all((_, i) => i < 10)
        .map((date) => format(date, "yyyy-MM-dd HH:mm"))
    : [];

  return (
    <EventBuilderWrapper>
      <EventEditor />
      <input type="hidden" name="start" value={start} />
      <input type="hidden" name="end" value={end} />
      <input type="hidden" name="until" value={until || ""} />

      <input type="hidden" name="allDay" value={allDay ? "1" : "0"} />
      <input type="hidden" name="repeatType" value={repeatType || "NEVER"} />
      <input type="hidden" name="repeatEndType" value={repeatEndType || "NEVER"} />
      <input type="hidden" name="rrule" value={rrule || ""} />

      <code>
        <pre>{rrule}</pre>
        <pre>{JSON.stringify(occurrences, null, 2)}</pre>
      </code>
    </EventBuilderWrapper>
  );
};
