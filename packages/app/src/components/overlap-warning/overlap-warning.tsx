import { craftFetch } from "@cal/utils/http";
import translate from "@cal/utils/translations";
import { formatOccurrenceRange } from "@event-builder/edited-occurrences/edited-occurrences.utilities";
import { useEffect, useState } from "react";
import styled from "styled-components";

export type OverlapResult = {
  count: number;
  events: {
    id: string;
    title: string;
    url: string | null;
    start: number;
    end: number;
    allDay: boolean;
  }[];
  recurring?: boolean;
  checked?: number;
  through?: string;
  limited?: boolean;
};

const Warning = styled.div`
  border: 1px solid var(--warning-color, #ad6500);
  border-radius: 5px;
  background: var(--warning-bg-color, #fff8e6);
  color: var(--text-color, #33404d);
  padding: 10px 12px;
  font-size: 12px;
  line-height: 1.5;
  margin-block: 10px;
  strong { display: block; }
  ul { margin: 6px 0 0; padding-inline-start: 18px; }
  li { margin: 3px 0; }
  a { text-decoration: underline; }
  small { display: block; color: var(--light-text-color); }
  p { margin: 6px 0 0; }
`;

export const OverlapFlag = ({ count }: { count?: number }) =>
  count ? (
    <span
      role="img"
      className="calendar-overlap-flag"
      title={translate("Scheduling conflict")}
      aria-label={translate("Scheduling conflict")}
      style={{ marginInlineEnd: 4 }}
    >
      <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M8 1a1 1 0 0 1 .87.5l7 12A1 1 0 0 1 15 15H1a1 1 0 0 1-.87-1.5l7-12A1 1 0 0 1 8 1Zm0 3.5a.75.75 0 0 0-.75.75v4a.75.75 0 0 0 1.5 0v-4A.75.75 0 0 0 8 4.5ZM8 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" />
      </svg>
    </span>
  ) : null;

export const OverlapWarning = ({ result }: { result?: OverlapResult | null }) => {
  if (!result?.count) return null;
  return (
    <Warning role="status" aria-live="polite">
      <strong>
        <OverlapFlag count={result.count} />
        {translate("Scheduling conflict")}
      </strong>
      {translate("Overlaps with other events in this calendar. You can still save.")}
      <ul>
        {result.events.map((event) => (
          <li key={event.id}>
            {event.url ? (
              <a href={event.url} target="_blank" rel="noopener noreferrer">
                {event.title}
              </a>
            ) : (
              event.title
            )}
            <small>
              {formatOccurrenceRange({ ...event, end: event.allDay ? event.end - 1 : event.end })}
            </small>
          </li>
        ))}
      </ul>
      {result.events.length >= 5 && (
        <small>{translate("Showing up to five conflicting occurrences.")}</small>
      )}
    </Warning>
  );
};

export const LiveOverlapWarning = ({
  enabled,
  schedule,
  resolveEventId,
  refreshKey = 0,
}: {
  enabled?: boolean;
  schedule: Record<string, unknown>;
  resolveEventId?: () => number | null | undefined;
  refreshKey?: number;
}) => {
  const [result, setResult] = useState<OverlapResult | null>(null);
  const [status, setStatus] = useState<"loading" | "done" | "error">("loading");
  // Only schedule values, rather than newly allocated props objects, retrigger a check.
  const payload = JSON.stringify(schedule);

  // biome-ignore lint/correctness/useExhaustiveDependencies: Refresh after an edited occurrence is saved.
  useEffect(() => {
    setResult(null);
    if (!enabled) return;
    setStatus("loading");
    const controller = new AbortController();
    const timer = setTimeout(async () => {
      try {
        const body = JSON.parse(payload);
        if (resolveEventId) body.eventId = resolveEventId();
        const response = await craftFetch(Craft.getCpUrl("calendar/api/events/overlaps"), {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(body),
          signal: controller.signal,
        });
        if (!response.ok) throw new Error();
        const data: OverlapResult = await response.json();
        if (!controller.signal.aborted) {
          setResult(data);
          setStatus("done");
        }
      } catch {
        if (!controller.signal.aborted) setStatus("error");
      }
    }, 400);
    return () => {
      clearTimeout(timer);
      controller.abort();
    };
  }, [enabled, payload, resolveEventId, refreshKey]);

  if (!enabled) return null;
  return (
    <div>
      <OverlapWarning result={result} />
      <p
        className="light"
        role="status"
        aria-live="polite"
        style={{ fontSize: 12, margin: "8px 0" }}
      >
        {status === "loading"
          ? translate("Checking for overlaps…")
          : status === "error"
            ? translate("Couldn’t check for overlaps. You can still save.")
            : result?.recurring
              ? translate("Checked up to {count} occurrences within one year, through {date}.", {
                  count: 100,
                  date: result.through ?? "",
                })
              : !result?.count
                ? translate("No overlaps found.")
                : null}
      </p>
    </div>
  );
};
