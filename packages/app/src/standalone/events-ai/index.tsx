import { AiButton } from "@cal/components/ai-button/ai-button";
import { PopoverProvider, usePopover } from "@cal/contexts/popover/popover.context";
import type { CalendarCreateDraft } from "@cal/pages/calendar/calendar.create-session";
import { buildCreateEventPayload } from "@cal/pages/calendar/popovers/create-event/create-event.operations";
import { PopoverCreateWithAi } from "@cal/pages/calendar/popovers/create-with-ai/create-with-ai";
import { craftFetch } from "@cal/utils/http";
import translate from "@cal/utils/translations";
import { generateUrl } from "@cal/utils/urls";
import { type FC, useRef, useState } from "react";
import ReactDOM from "react-dom/client";

type EventsAiConfig = {
  isSolspaceAiConnected: boolean;
  siteId: number;
  defaultCalendarId: number | null;
};

const openSolspaceAiSettings = () => {
  window.location.href = Craft.getCpUrl("calendar/settings/solspaceai");
};

const resolveCalendarId = (draft: CalendarCreateDraft, fallback: number | null): number | null => {
  if (draft.calendarId && Number.isFinite(draft.calendarId)) {
    return draft.calendarId;
  }

  const source = new URLSearchParams(window.location.search).get("source");
  const match = source?.match(/^calendar:(\d+)$/);
  if (match) {
    return Number(match[1]);
  }

  return fallback;
};

const EventsAiCreate: FC<{ config: EventsAiConfig }> = ({ config }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { showPopover, hidePopover } = usePopover();
  const [isPreparing, setIsPreparing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const applyDraft = async (draft: CalendarCreateDraft) => {
    const calendarId = resolveCalendarId(draft, config.defaultCalendarId);
    if (!calendarId) {
      setError(translate("No calendars are available."));
      return;
    }

    setIsPreparing(true);
    setError(null);

    try {
      const payload = buildCreateEventPayload(draft, calendarId, config.siteId, {
        description: draft.description,
        location: draft.location,
      });
      payload.title = draft.title;

      const response = await craftFetch(generateUrl("/api/events/prepare"), {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const result = await response.json().catch((): null => null);
      if (!response.ok || typeof result?.url !== "string" || !result.url) {
        const message =
          (Array.isArray(result?.errors) && result.errors.join(" ")) ||
          result?.message ||
          result?.error ||
          translate("Couldn’t create event.");
        setError(message);
        return;
      }

      hidePopover();
      window.location.href = result.url;
    } catch {
      setError(translate("Couldn’t create event."));
    } finally {
      setIsPreparing(false);
    }
  };

  const handleClick = () => {
    if (!config.isSolspaceAiConnected) {
      openSolspaceAiSettings();
      return;
    }

    const anchor = buttonRef.current;
    if (!anchor || isPreparing) {
      return;
    }

    setError(null);
    showPopover(
      <PopoverCreateWithAi
        onCancel={hidePopover}
        onApplyDraft={(draft) => {
          void applyDraft(draft);
        }}
      />,
      anchor,
      {
        alignment: "end",
        position: ["bottom", "top", "right", "left"],
      },
    );
  };

  return (
    <>
      <AiButton
        ref={buttonRef}
        connected={config.isSolspaceAiConnected}
        disabled={isPreparing}
        onClick={handleClick}
      />
      {error && (
        <span className="error" style={{ marginInlineStart: 8, fontSize: 12 }}>
          {error}
        </span>
      )}
    </>
  );
};

const mount = () => {
  const root = document.querySelector<HTMLElement>("[data-ai-create-root]");
  const configTag = document.querySelector<HTMLScriptElement>("script[data-events-ai-config]");
  if (!root || !configTag?.textContent) {
    return;
  }

  const config = JSON.parse(configTag.textContent) as EventsAiConfig;
  ReactDOM.createRoot(root).render(
    <PopoverProvider>
      <EventsAiCreate config={config} />
    </PopoverProvider>,
  );
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mount);
} else {
  mount();
}
