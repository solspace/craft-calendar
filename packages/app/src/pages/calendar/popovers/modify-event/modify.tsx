import { usePopover } from "@cal/contexts/popover/popover.context";
import { Flex } from "@cal/styles/components";
import translate from "@cal/utils/translations";
import clsx from "clsx";
import type { FC } from "react";
import { useCallback, useEffect, useRef, useState } from "react";
import { useEventListener } from "usehooks-ts";
import { PopoverWrapper } from "../view-event/view-event.styles";

type ModifyAction = "move" | "resize" | "delete";

const headings: Record<ModifyAction, string> = {
  move: "You are moving an event.",
  resize: "You are changing an event’s length.",
  delete: "You are deleting an event.",
};

const questions: Record<ModifyAction, string> = {
  move: "Do you want to move only this occurrence, or all occurrences?",
  resize: "Do you want to change only this occurrence, or all occurrences?",
  delete: "Do you want to delete only this occurrence, or all occurrences?",
};

type Props = {
  action: ModifyAction;
  onOnlyThisOccurrence: () => Promise<void> | void;
  onAllOccurrences: () => Promise<void> | void;
  onCancel?: () => void;
  isSubmitting?: boolean;
};

export const PopoverModifyEvent: FC<Props> = ({
  action,
  onOnlyThisOccurrence,
  onAllOccurrences,
  onCancel,
  isSubmitting = false,
}) => {
  const { hidePopover } = usePopover();
  const [pendingAction, setPendingAction] = useState<"occurrence" | "series" | null>(null);
  const isMounted = useRef(true);

  const busy = isSubmitting || pendingAction !== null;

  useEffect(() => {
    return () => {
      isMounted.current = false;
    };
  }, []);

  const cancel = useCallback(() => {
    if (busy) {
      return;
    }

    onCancel?.();
    hidePopover();
  }, [hidePopover, onCancel, busy]);

  useEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      cancel();
    }
  });

  const runAction = async (
    action: "occurrence" | "series",
    callback: () => Promise<void> | void,
  ) => {
    if (busy) {
      return;
    }

    setPendingAction(action);

    try {
      await callback();
    } finally {
      if (isMounted.current) {
        setPendingAction(null);
      }
    }
  };

  return (
    <PopoverWrapper>
      <h3>{translate(headings[action])}</h3>
      <p>{translate(questions[action])}</p>

      <hr />

      <Flex $direction="column" $alignItems="center" $gap={8}>
        <button
          type="button"
          className={clsx("btn small submit", busy && "disabled")}
          disabled={busy}
          onClick={() => runAction("occurrence", onOnlyThisOccurrence)}
        >
          {translate(pendingAction === "occurrence" ? "Processing..." : "Only this occurrence")}
        </button>

        <button
          type="button"
          className={clsx("btn small", busy && "disabled")}
          disabled={busy}
          onClick={() => runAction("series", onAllOccurrences)}
        >
          {translate(pendingAction === "series" ? "Processing..." : "All occurrences")}
        </button>

        <button
          type="button"
          className={clsx("btn small", busy && "disabled")}
          disabled={busy}
          onClick={cancel}
        >
          {translate("Cancel")}
        </button>
      </Flex>
    </PopoverWrapper>
  );
};
