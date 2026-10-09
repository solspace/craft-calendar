import type { DateFormats } from "@cal/types/config";
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
  display: grid;
  gap: 8px;
  border: 1px solid var(--warning-color, #ad6500);
  border-radius: 5px;
  background: var(--warning-bg-color, #fff8e6);
  color: var(--text-color, #33404d);
  padding: 10px 12px;
  font-size: 12px;
  line-height: 1.5;
  margin-block: 10px;
  overflow-wrap: anywhere;

  && .overlap-heading {
    display: flex;
    align-items: center;
    gap: 6px;
    margin: 0;
    line-height: 1.4;
  }

  .overlap-heading .calendar-overlap-flag {
    flex: 0 0 auto;
    margin: 0;
  }

  && p { margin: 0; text-align: start; }
  && ul {
    display: grid;
    gap: 8px;
    margin: 0;
    padding: 0;
    list-style: none;
  }
  && li { display: grid; gap: 2px; margin: 0; }
  a { text-decoration: underline; }
  small {
    display: block;
    color: var(--light-text-color, #596673);
    font-size: 11px;
    line-height: 1.4;
  }
`;

const LiveWarning = styled.div`
  display: grid;
  gap: 8px;

  ${Warning} { margin: 0; }

  && > p {
    margin: 0;
    font-size: 12px;
    line-height: 1.5;
    text-align: start;
  }
`;

const Flag = styled.span`
  display: inline-flex;
  align-items: center;
  margin-inline-end: 4px;
`;

export const OverlapFlag = ({ count }: { count?: number }) =>
  count ? (
    <Flag
      role="img"
      className="calendar-overlap-flag"
      title={translate("Scheduling conflict")}
      aria-label={translate("Scheduling conflict")}
    >
      <svg width="12" height="12" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
        <path d="M8 1a1 1 0 0 1 .87.5l7 12A1 1 0 0 1 15 15H1a1 1 0 0 1-.87-1.5l7-12A1 1 0 0 1 8 1Zm0 3.5a.75.75 0 0 0-.75.75v4a.75.75 0 0 0 1.5 0v-4A.75.75 0 0 0 8 4.5ZM8 11a1 1 0 1 0 0 2 1 1 0 0 0 0-2Z" />
      </svg>
    </Flag>
  ) : null;

export const OverlapWarning = ({
  result,
  formats,
}: {
  result?: OverlapResult | null;
  formats?: DateFormats;
}) => {
  if (!result?.count) return null;
  return (
    <Warning role="status" aria-live="polite">
      <strong className="overlap-heading">
        <OverlapFlag count={result.count} />
        <span>{translate("Scheduling conflict")}</span>
      </strong>
      <p>{translate("Overlaps with other events in this calendar. You can still save.")}</p>
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
              {formatOccurrenceRange(
                { ...event, end: event.allDay ? event.end - 1 : event.end },
                formats,
              )}
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
  formats,
  schedule,
  resolveEventId,
  refreshKey = 0,
}: {
  enabled?: boolean;
  formats?: DateFormats;
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
  const statusText =
    status === "loading"
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
            : null;
  return (
    <LiveWarning>
      <OverlapWarning result={result} formats={formats} />
      {statusText && (
        <p className="light" role="status" aria-live="polite">
          {statusText}
        </p>
      )}
    </LiveWarning>
  );
};
