import { AiButton } from "@cal/components/ai-button/ai-button";
import { openEventCreateWithAi } from "@cal/utils/open-event-create-with-ai";
import translate from "@cal/utils/translations";
import { type FC, useRef, useState } from "react";
import ReactDOM from "react-dom/client";

type EventsAiConfig = {
  isSolspaceAiConnected: boolean;
  defaultCalendarHandle: string | null;
  calendars?: Array<{ id: number; handle: string }>;
};

const openSolspaceAiSettings = () => {
  window.location.href = Craft.getCpUrl("calendar/settings/solspaceai");
};

const resolveCalendarHandle = (config: EventsAiConfig): string | null => {
  const source = new URLSearchParams(window.location.search).get("source");
  const match = source?.match(/^calendar:(\d+)$/);
  if (match && config.calendars?.length) {
    const calendarId = Number(match[1]);
    const calendar = config.calendars.find((item) => item.id === calendarId);
    if (calendar?.handle) {
      return calendar.handle;
    }
  }

  return config.defaultCalendarHandle;
};

const EventsAiCreate: FC<{ config: EventsAiConfig }> = ({ config }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const [error, setError] = useState<string | null>(null);

  const handleClick = () => {
    if (!config.isSolspaceAiConnected) {
      openSolspaceAiSettings();
      return;
    }

    const handle = resolveCalendarHandle(config);
    if (!handle) {
      setError(translate("No calendars are available."));
      return;
    }

    setError(null);
    // Open the full Create/Edit page so every field (location, description, recurrence) is visible.
    openEventCreateWithAi(handle);
  };

  return (
    <>
      <AiButton
        ref={buttonRef}
        icon="edit"
        connected={config.isSolspaceAiConnected}
        label={translate("Update with AI")}
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
  ReactDOM.createRoot(root).render(<EventsAiCreate config={config} />);
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mount);
} else {
  mount();
}
