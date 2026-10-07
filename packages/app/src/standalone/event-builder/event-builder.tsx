import { utcToLocalDisplayDate } from "@cal/utils/date";
import { isDebugMode } from "@cal/utils/debug";
import { format, formatISO } from "date-fns";
import { type FC, useMemo } from "react";
import { useSelector } from "react-redux";
import { rrulestr } from "rrule";
import { EditedOccurrences } from "./edited-occurrences/edited-occurrences";
import { Editor } from "./editor/editor";
import { EventBuilderWrapper } from "./event-builder.styles";
import { Series } from "./series/series";
import { eventSelectors } from "./store/event.slice";
import type { BuilderContext } from "./types";

type Props = {
  context?: BuilderContext;
};

export const EventBuilder: FC<Props> = ({ context }) => {
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
      {context && <Series context={context} />}

      <Editor />

      {context?.eventId && <EditedOccurrences context={context} />}

      {isDebug && (
        <code>
          <pre>{rrule}</pre>
          <pre>{JSON.stringify(occurrences, null, 2)}</pre>
        </code>
      )}
    </EventBuilderWrapper>
  );
};
