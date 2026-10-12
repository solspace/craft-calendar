import { usePopover } from "@cal/contexts/popover/popover.context";
import type { CalendarCreateDraft } from "@cal/pages/calendar/calendar.create-session";
import { PopoverCreateWithAi } from "@cal/pages/calendar/popovers/create-with-ai/create-with-ai";
import translate from "@cal/utils/translations";
import { appSelectors } from "@event-builder/store/app.slice";
import { eventActions } from "@event-builder/store/event.slice";
import type { AppDispatch } from "@event-builder/store/store";
import type { BuilderContext } from "@event-builder/types";
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
  if (!title) {
    return;
  }

  setCraftInputValue("#title, input[name='title']", title);
};

const setCraftFieldValue = (handle: string | null | undefined, value: string | undefined) => {
  if (!handle || !value?.trim()) {
    return;
  }

  const escaped = CSS.escape(handle);
  setCraftInputValue(
    `textarea[name="fields[${escaped}]"], input[name="fields[${escaped}]"], #fields-${escaped}`,
    value,
  );
};

const openSolspaceAiSettings = () => {
  window.location.href = Craft.getCpUrl("calendar/settings/solspaceai");
};

export const CreateWithAiToolbar: FC<Props> = ({ context }) => {
  const buttonRef = useRef<HTMLButtonElement>(null);
  const dispatch = useDispatch<AppDispatch>();
  const isSolspaceAiConnected = useSelector(appSelectors.isSolspaceAiConnected);
  const { showPopover, hidePopover } = usePopover();
  const mount = document.querySelector<HTMLElement>("[data-event-ai-create-root]");

  if (!mount) {
    return null;
  }

  const applyDraft = (draft: CalendarCreateDraft) => {
    setCraftTitle(draft.title);
    setCraftFieldValue(context?.descriptionFieldHandle, draft.description);
    setCraftFieldValue(context?.locationFieldHandle, draft.location);

    dispatch(
      eventActions.applyGeneratedSchedule({
        start: draft.start,
        end: draft.end,
        allDay: draft.allDay,
        repeatType: draft.repeatType || "NEVER",
        repeatEndType: draft.repeatEndType || undefined,
        until: draft.until ?? undefined,
        rrule: draft.rrule || undefined,
      }),
    );
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

    showPopover(<PopoverCreateWithAi onCancel={hidePopover} onApplyDraft={applyDraft} />, anchor, {
      alignment: "end",
      position: ["bottom", "top", "right", "left"],
    });
  };

  return createPortal(
    <button ref={buttonRef} type="button" className="btn submit" onClick={handleClick}>
      {translate("Create with AI")}
    </button>,
    mount,
  );
};
