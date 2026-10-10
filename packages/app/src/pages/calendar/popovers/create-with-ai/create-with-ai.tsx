import {
  type CalendarCreateDraft,
  DEFAULT_CREATE_DRAFT_ID,
} from "@cal/pages/calendar/calendar.create-session";
import { Flex } from "@cal/styles/components";
import translate from "@cal/utils/translations";
import { type FC, useEffect, useRef, useState } from "react";
import {
  AiActions,
  AiError,
  AiHint,
  AiPrompt,
  PopoverCreateWithAiWrapper,
} from "./create-with-ai.styles";
import { useGenerateEventAi } from "./use-generate-event-ai";

type Props = {
  onApplyDraft: (draft: CalendarCreateDraft) => void;
  onCancel: () => void;
};

export const PopoverCreateWithAi: FC<Props> = ({ onApplyDraft, onCancel }) => {
  const [prompt, setPrompt] = useState("");
  const promptRef = useRef<HTMLTextAreaElement>(null);
  const { generateEvent, isGenerating, error } = useGenerateEventAi();

  useEffect(() => {
    const timer = window.setTimeout(() => {
      promptRef.current?.focus();
    }, 10);

    return () => window.clearTimeout(timer);
  }, []);

  const handleGenerate = async () => {
    const result = await generateEvent(prompt);
    if (!result.success) {
      return;
    }

    const { event } = result;

    onApplyDraft({
      id: DEFAULT_CREATE_DRAFT_ID,
      title: event.title,
      allDay: event.allDay,
      start: event.startTimestamp,
      end: event.endTimestamp,
    });
  };

  return (
    <PopoverCreateWithAiWrapper>
      <h3>{translate("Create with AI")}</h3>
      <AiHint>
        {translate(
          "Describe your event in plain language. AI will suggest dates, title, and details.",
        )}
      </AiHint>

      <AiPrompt
        ref={promptRef}
        value={prompt}
        rows={6}
        placeholder={translate("e.g. Team standup every Monday at 9am for 30 minutes")}
        onChange={(event) => setPrompt(event.target.value)}
        onKeyDown={(event) => {
          if (
            (event.metaKey || event.ctrlKey) &&
            event.key === "Enter" &&
            prompt.trim() &&
            !isGenerating
          ) {
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
            onClick={() => void handleGenerate()}
            disabled={isGenerating || !prompt.trim()}
          >
            {isGenerating ? translate("Generating…") : translate("Generate Event")}
          </button>
        </AiActions>
      </Flex>
    </PopoverCreateWithAiWrapper>
  );
};
