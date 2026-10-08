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
  // Resolves to whether the change was made, which closes the prompt
  onSelect: (scope: EventMutationScope) => Promise<boolean>;
  // Runs when the prompt goes away without a choice
  onCancel?: () => void;
};

export const PopoverModifyEvent: FC<Props> = ({ action, onSelect, onCancel }) => {
  const { hidePopover } = usePopover();
  const [pendingAction, setPendingAction] = useState<EventMutationScope | null>(null);
  const isMounted = useRef(true);
  const hasChosen = useRef(false);

  const busy = pendingAction !== null;

  // Clicking or dragging another event replaces the prompt, so it cancels whenever it goes away
  // without a choice, not only from its Cancel button
  // biome-ignore lint/correctness/useExhaustiveDependencies: A prompt belongs to one change, so it cancels with the onCancel it was shown with.
  useEffect(() => {
    return () => {
      isMounted.current = false;

      if (!hasChosen.current) {
        onCancel?.();
      }
    };
  }, []);

  const cancel = useCallback(() => {
    if (!busy) {
      hidePopover();
    }
  }, [hidePopover, busy]);

  useEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      cancel();
    }
  });

  const select = async (scope: EventMutationScope) => {
    if (busy) {
      return;
    }

    hasChosen.current = true;
    setPendingAction(scope);

    try {
      if (await onSelect(scope)) {
        hidePopover();
      }
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
        {(["occurrence", "following", "series"] as const).map((scope) => (
          <button
            key={scope}
            type="button"
            className={clsx("btn small", scope === "occurrence" && "submit", busy && "disabled")}
            disabled={busy}
            onClick={() => select(scope)}
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
