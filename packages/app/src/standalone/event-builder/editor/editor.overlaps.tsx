import { LiveOverlapWarning } from "@cal/components/overlap-warning/overlap-warning";
import { useCallback, useRef } from "react";
import { useSelector } from "react-redux";
import { findElementEditor } from "../occurrence-editor";
import { appSelectors } from "../store/app.slice";
import { eventSelectors } from "../store/event.slice";
import type { BuilderContext } from "../types";

export const EditorOverlapWarning = ({
  context,
  refreshKey,
}: {
  context?: BuilderContext;
  refreshKey: number;
}) => {
  const schedule = useSelector(eventSelectors.state);
  const { showOverlapWarnings, formats } = useSelector(appSelectors.config);
  const ref = useRef<HTMLDivElement>(null);
  const resolveEventId = useCallback(
    () => findElementEditor(ref.current)?.settings.elementId ?? context?.eventId,
    [context?.eventId],
  );
  if (!context?.calendarId) return null;
  return (
    <div ref={ref} style={{ padding: "0 20px" }}>
      <LiveOverlapWarning
        formats={formats}
        enabled={showOverlapWarnings}
        schedule={{
          ...schedule,
          rrule: schedule.rrule ?? "",
          calendarId: context.calendarId,
          siteId: context.siteId,
        }}
        resolveEventId={resolveEventId}
        refreshKey={refreshKey}
      />
    </div>
  );
};
