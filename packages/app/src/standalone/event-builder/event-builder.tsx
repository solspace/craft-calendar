import { utcToLocalDisplayDate } from "@cal/utils/date";
import { isDebugMode } from "@cal/utils/debug";
import { format, formatISO } from "date-fns";
import { type FC, useMemo } from "react";
import { useSelector } from "react-redux";
import { rrulestr } from "rrule";
import { Editor } from "./editor/editor";
import { EventBuilderWrapper } from "./event-builder.styles";
import { eventSelectors } from "./store/event.slice";

export const EventBuilder: FC = () => {
  const { rrule } = useSelector(eventSelectors.state);

  const isDebug = useMemo(isDebugMode, []);
  const occurrences = rrule
    ? rrulestr(rrule, { forceset: true })
        .all((_, i) => i < 10)
        .map((date) => {
          const displayDate = utcToLocalDisplayDate(date);

          return `${format(displayDate, "yyyy-MM-dd HH:mm")} [${formatISO(date)}]`;
        })
    : [];

  return (
    <EventBuilderWrapper>
      <Editor />

      {isDebug && (
        <code>
          <pre>{rrule}</pre>
          <pre>{JSON.stringify(occurrences, null, 2)}</pre>
        </code>
      )}
    </EventBuilderWrapper>
  );
};
