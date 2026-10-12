import { AiButton } from "@cal/components/ai-button/ai-button";
import { PopoverProvider, usePopover } from "@cal/contexts/popover/popover.context";
import {
  AiActions,
  AiError,
  AiHint,
  AiPrompt,
  PopoverCreateWithAiWrapper,
} from "@cal/pages/calendar/popovers/create-with-ai/create-with-ai.styles";
import { Flex } from "@cal/styles/components";
import { craftFetch } from "@cal/utils/http";
import translate from "@cal/utils/translations";
import { type FC, useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";

type CalendarsAiConfig = {
  isSolspaceAiConnected: boolean;
};

const openSolspaceAiSettings = () => {
  window.location.href = Craft.getCpUrl("calendar/settings/solspaceai");
};

const PopoverCreateCalendarWithAi: FC<{
  onCancel: () => void;
  onCreated: (url: string) => void;
}> = ({ onCancel, onCreated }) => {
  const [prompt, setPrompt] = useState("");
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const promptRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const timer = window.setTimeout(() => promptRef.current?.focus(), 50);
    return () => window.clearTimeout(timer);
  }, []);

  const handleGenerate = async () => {
    const trimmed = prompt.trim();
    if (!trimmed || isGenerating) {
      return;
    }

    setIsGenerating(true);
    setError(null);

    try {
      // Prefer Craft CP URLs so /calendars never breaks path-based generateUrl matching.
      const response = await craftFetch(Craft.getCpUrl("calendar/api/ai/generate-calendar"), {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ prompt: trimmed }),
      });

      const result = await response.json().catch((): null => null);
      if (!response.ok || !result?.success || typeof result.url !== "string") {
        setError(result?.error || result?.message || translate("Could not generate calendar."));
        return;
      }

      onCreated(result.url);
    } catch {
      setError(translate("Could not generate calendar."));
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <PopoverCreateWithAiWrapper>
      <h3>{translate("Create with AI")}</h3>
      <AiHint>
        {translate(
          "Describe the calendar you want (for example, public holidays or staff meetings). AI will create it so you can finish the field layout.",
        )}
      </AiHint>

      <AiPrompt
        ref={promptRef}
        value={prompt}
        rows={6}
        placeholder={translate(
          "e.g. A blue calendar for company holidays, no repeating events needed",
        )}
        onChange={(event) => setPrompt(event.target.value)}
        onKeyDown={(event) => {
          if ((event.metaKey || event.ctrlKey) && event.key === "Enter" && prompt.trim()) {
            event.preventDefault();
            void handleGenerate();
          }
        }}
      />

      {error && <AiError>{error}</AiError>}

      <Flex>
        <AiActions>
          <button type="button" className="btn" onClick={onCancel} disabled={isGenerating}>
            {translate("Cancel")}
          </button>
          <button
            type="button"
            className="btn submit"
            disabled={!prompt.trim() || isGenerating}
            onClick={() => void handleGenerate()}
          >
            {isGenerating ? translate("Generating…") : translate("Generate Calendar")}
          </button>
        </AiActions>
      </Flex>
    </PopoverCreateWithAiWrapper>
  );
};

const CalendarsAiCreate: FC<{ config: CalendarsAiConfig }> = ({ config }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const { showPopover, hidePopover } = usePopover();

  const handleClick = () => {
    if (!config.isSolspaceAiConnected) {
      openSolspaceAiSettings();
      return;
    }

    const anchor = buttonRef.current;
    if (!anchor) {
      return;
    }

    showPopover(
      <PopoverCreateCalendarWithAi
        onCancel={hidePopover}
        onCreated={(url) => {
          hidePopover();
          window.location.href = url;
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
    <AiButton ref={buttonRef} connected={config.isSolspaceAiConnected} onClick={handleClick} />
  );
};

const mount = () => {
  const root = document.querySelector<HTMLElement>("[data-ai-create-root]");
  const configTag = document.querySelector<HTMLScriptElement>("script[data-calendars-ai-config]");
  if (!root || !configTag?.textContent) {
    return;
  }

  const config = JSON.parse(configTag.textContent) as CalendarsAiConfig;
  ReactDOM.createRoot(root).render(
    <PopoverProvider>
      <CalendarsAiCreate config={config} />
    </PopoverProvider>,
  );
};

if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", mount);
} else {
  mount();
}
