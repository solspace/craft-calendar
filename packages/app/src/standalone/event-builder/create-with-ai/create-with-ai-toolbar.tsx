import { AiButton } from "@cal/components/ai-button/ai-button";
import { usePopover } from "@cal/contexts/popover/popover.context";
import type { CalendarCreateDraft } from "@cal/pages/calendar/calendar.create-session";
import { PopoverCreateWithAi } from "@cal/pages/calendar/popovers/create-with-ai/create-with-ai";
import type { AiCurrentEvent } from "@cal/pages/calendar/popovers/create-with-ai/use-generate-event-ai";
import { utcTimestampToLocalDisplayDate } from "@cal/utils/date";
import translate from "@cal/utils/translations";
import { appSelectors } from "@event-builder/store/app.slice";
import { eventActions, eventSelectors } from "@event-builder/store/event.slice";
import type { AppDispatch } from "@event-builder/store/store";
import type { BuilderContext } from "@event-builder/types";
import { format } from "date-fns";
import { type FC, useRef } from "react";
import { createPortal } from "react-dom";
import { useDispatch, useSelector } from "react-redux";

type Props = {
  context?: BuilderContext;
};

const setCraftInputValue = (selector: string, value: string) => {
  const input = document.querySelector<HTMLInputElement | HTMLTextAreaElement>(selector);
  if (!input) {
    return;
  }

  input.value = value;
  input.dispatchEvent(new Event("input", { bubbles: true }));
  input.dispatchEvent(new Event("change", { bubbles: true }));
};

const setCraftTitle = (title: string) => {
  setCraftInputValue("#title, input[name='title']", title);
};

const setCraftFieldValue = (handle: string | null | undefined, value: string | undefined) => {
  if (!handle) {
    return;
  }

  const escaped = CSS.escape(handle);
  setCraftInputValue(
    `textarea[name="fields[${escaped}]"], input[name="fields[${escaped}]"], #fields-${escaped}`,
    value ?? "",
  );
};

const readCraftInputValue = (selector: string): string => {
  const input = document.querySelector<HTMLInputElement | HTMLTextAreaElement>(selector);
  return input?.value?.trim() ?? "";
};

const readCraftFieldValue = (handle: string | null | undefined): string => {
  if (!handle) {
    return "";
  }

  const escaped = CSS.escape(handle);
  return readCraftInputValue(
    `textarea[name="fields[${escaped}]"], input[name="fields[${escaped}]"], #fields-${escaped}`,
  );
};

const toFloatingDateTime = (timestamp: number): string =>
  format(utcTimestampToLocalDisplayDate(timestamp), "yyyy-MM-dd'T'HH:mm:ss");

const rruleBody = (rrule?: string): string => {
  if (!rrule) {
    return "";
  }

  for (const line of rrule.split(/\r\n|\n|\r/)) {
    const trimmed = line.trim();
    if (trimmed.toUpperCase().startsWith("RRULE:")) {
      return trimmed.replace(/^RRULE:/i, "");
    }
    if (trimmed.toUpperCase().startsWith("FREQ=")) {
      return trimmed;
    }
  }

  return rrule;
};

const openSolspaceAiSettings = () => {
  window.location.href = Craft.getCpUrl("calendar/settings/solspaceai");
};

const shouldApplyField = (changedFields: string[] | undefined, field: string): boolean =>
  !changedFields?.length || changedFields.includes(field);

export const CreateWithAiToolbar: FC<Props> = ({ context }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const isSolspaceAiConnected = useSelector(appSelectors.isSolspaceAiConnected);
  const eventState = useSelector(eventSelectors.state);
  const { showPopover, hidePopover } = usePopover();
  const mount = document.querySelector<HTMLElement>("[data-event-ai-create-root]");

  if (!mount) {
    return null;
  }

  const buildCurrentEvent = (): AiCurrentEvent => ({
    title: readCraftInputValue("#title, input[name='title']") || "Untitled",
    description: readCraftFieldValue(context?.descriptionFieldHandle),
    location: readCraftFieldValue(context?.locationFieldHandle),
    start: toFloatingDateTime(eventState.start),
    end: toFloatingDateTime(eventState.end),
    allDay: eventState.allDay,
    repeatType: eventState.repeatType,
    rrule: rruleBody(eventState.rrule),
    calendarId: context?.calendarId,
  });

  const applyDraft = (draft: CalendarCreateDraft) => {
    const changed = draft.changedFields;

    if (shouldApplyField(changed, "title")) {
      setCraftTitle(draft.title);
    }
    if (shouldApplyField(changed, "description")) {
      setCraftFieldValue(context?.descriptionFieldHandle, draft.description);
    }
    if (shouldApplyField(changed, "location")) {
      setCraftFieldValue(context?.locationFieldHandle, draft.location);
    }

    const scheduleFields = ["start", "end", "allDay", "repeatType", "rrule"];
    const scheduleChanged =
      !changed?.length || scheduleFields.some((field) => changed.includes(field));

    if (scheduleChanged) {
      dispatch(
        eventActions.applyGeneratedSchedule({
          start: draft.start,
          end: draft.end,
          allDay: draft.allDay,
          repeatType: draft.repeatType || "NEVER",
          repeatEndType: draft.repeatEndType || undefined,
          until: draft.until ?? undefined,
          rrule: draft.rrule || undefined,
          timezone: eventState.timezone,
        }),
      );
    }

    hidePopover();
  };

  const handleClick = () => {
    if (!isSolspaceAiConnected) {
      openSolspaceAiSettings();
      return;
    }

    const anchor = buttonRef.current;
    if (!anchor) {
      return;
    }

    showPopover(
      <PopoverCreateWithAi
        mode="edit"
        currentEvent={buildCurrentEvent()}
        onCancel={hidePopover}
        onApplyDraft={applyDraft}
      />,
      anchor,
      {
        alignment: "end",
        position: ["bottom", "top", "right", "left"],
      },
    );
  };

  return createPortal(
    <AiButton
      ref={buttonRef}
      icon="edit"
      connected={isSolspaceAiConnected}
      label={translate("Update with AI")}
      onClick={handleClick}
    />,
    mount,
  );
};
