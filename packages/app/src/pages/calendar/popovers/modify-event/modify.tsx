import { usePopover } from "@cal/contexts/popover/popover.context";
import type { EventMutationScope } from "@cal/pages/calendar/calendar.events";
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
  move: "Which occurrences do you want to move?",
  resize: "Which occurrences do you want to change?",
  delete: "Which occurrences do you want to delete?",
};

const labels: Record<EventMutationScope, string> = {
  occurrence: "Only this occurrence",
  following: "This and following",
  series: "All occurrences",
};

type Props = {
  action: ModifyAction;
  onOnlyThisOccurrence: () => Promise<void> | void;
  onThisAndFollowing: () => Promise<void> | void;
  onAllOccurrences: () => Promise<void> | void;
  onCancel?: () => void;
  isSubmitting?: boolean;
};

export const PopoverModifyEvent: FC<Props> = ({
  action,
  onOnlyThisOccurrence,
  onThisAndFollowing,
  onAllOccurrences,
  onCancel,
  isSubmitting = false,
}) => {
  const { hidePopover } = usePopover();
  const [pendingAction, setPendingAction] = useState<EventMutationScope | null>(null);
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

  const runAction = async (action: EventMutationScope, callback: () => Promise<void> | void) => {
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

  const callbacks: Record<EventMutationScope, () => Promise<void> | void> = {
    occurrence: onOnlyThisOccurrence,
    following: onThisAndFollowing,
    series: onAllOccurrences,
  };

  return (
    <PopoverWrapper>
      <h3>{translate(headings[action])}</h3>
      <p>{translate(questions[action])}</p>

      <hr />

      <Flex $direction="column" $alignItems="center" $gap={8}>
        {(["occurrence", "following", "series"] as const).map((scope) => (
          <button
            key={scope}
            type="button"
            className={clsx("btn small", scope === "occurrence" && "submit", busy && "disabled")}
            disabled={busy}
            onClick={() => runAction(scope, callbacks[scope])}
          >
            {translate(pendingAction === scope ? "Processing..." : labels[scope])}
          </button>
        ))}

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
