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
import { type AiCurrentEvent, useGenerateEventAi } from "./use-generate-event-ai";

type Props = {
  onApplyDraft: (draft: CalendarCreateDraft) => void | Promise<void>;
  onCancel: () => void;
  /** Defaults to create-new copy; use "edit" on the event editor so it is clear we fill this event. */
  mode?: "create" | "edit";
  /** When editing, the current form values so AI only changes what the user asks for. */
  currentEvent?: AiCurrentEvent | null;
  /** When true (e.g. + New Event already chose a calendar), omit calendar from the example prompt. */
  calendarSelected?: boolean;
};

export const PopoverCreateWithAi: FC<Props> = ({
  onApplyDraft,
  onCancel,
  mode = "create",
  currentEvent = null,
  calendarSelected = false,
}) => {
  const [prompt, setPrompt] = useState("");
  const promptRef = useRef<HTMLTextAreaElement>(null);
  const { generateEvent, isGenerating, error } = useGenerateEventAi();
  const isEdit = mode === "edit";
  // Blank drafts on + New Event still use Update with AI, but need "describe the event" copy.
  const isBlankEvent =
    isEdit &&
    (!currentEvent?.title?.trim() || currentEvent.title.trim().toLowerCase() === "untitled");
  const title = isEdit ? translate("Update with AI") : translate("Create with AI");
  const hint =
    isEdit && !isBlankEvent
      ? translate(
          "Say what to change (for example, move to next Tuesday or make it weekly). Everything else stays as it is.",
        )
      : translate(
          "Describe your event in plain language. AI will suggest dates, title, and details.",
        );
  const submitLabel = isEdit ? translate("Apply Changes") : translate("Generate Event");
  const placeholder =
    isEdit && !isBlankEvent
      ? translate("e.g. Move to next Tuesday at 3pm")
      : calendarSelected || isBlankEvent
        ? translate("e.g. Team standup every Monday at 9am for 30 minutes")
        : translate(
            'e.g. On the Staff Meetings calendar, Team Standup every Monday and Thursday starting Sept 14 for 20 times. Location "Conference Room A", description "Weekly sync."',
          );

  useEffect(() => {
    const timer = window.setTimeout(() => {
      promptRef.current?.focus();
    }, 10);

    return () => window.clearTimeout(timer);
  }, []);

  const handleGenerate = async () => {
    const result = await generateEvent(prompt, isEdit ? currentEvent : null);
    if (!result.success) {
      return;
    }

    const { event } = result;
    const start = Number(event.startTimestamp);
    const end = Number(event.endTimestamp);

    if (!Number.isFinite(start) || !Number.isFinite(end) || end <= start) {
      return;
    }

    await onApplyDraft({
      id: DEFAULT_CREATE_DRAFT_ID,
      title: event.title,
      allDay: Boolean(event.allDay),
      start,
      end,
      preserveDuration: true,
      calendarId: event.calendarId,
      description: event.description,
      location: event.location,
      repeatType: event.repeatType || "NEVER",
      repeatEndType: event.repeatEndType || "NEVER",
      until: event.until ?? undefined,
      rrule: event.rrule || "",
      changedFields: event.changedFields,
      occurrenceEdits: event.occurrenceEdits,
    });
  };

  return (
    <PopoverCreateWithAiWrapper>
      <h3>{title}</h3>
      <AiHint>{hint}</AiHint>

      <AiPrompt
        ref={promptRef}
        value={prompt}
        rows={6}
        placeholder={placeholder}
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
            {isGenerating ? translate("Generating…") : submitLabel}
          </button>
        </AiActions>
      </Flex>
    </PopoverCreateWithAiWrapper>
  );
};
