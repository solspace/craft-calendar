import { AiButton } from "@cal/components/ai-button/ai-button";
import { usePopover } from "@cal/contexts/popover/popover.context";
import { useAiCreate } from "@cal/pages/calendar/context/ai-create.context";
import { PopoverCreateWithAi } from "@cal/pages/calendar/popovers/create-with-ai/create-with-ai";
import type { FC, RefObject } from "react";

type Props = {
  buttonRef: RefObject<HTMLButtonElement | null>;
  isSolspaceAiConnected: boolean;
  canEditEvents: boolean;
};

const openSolspaceAiSettings = () => {
  window.location.href = Craft.getCpUrl("calendar/settings/solspaceai");
};

export const HeaderAiCreate: FC<Props> = ({ buttonRef, isSolspaceAiConnected, canEditEvents }) => {
  const { showPopover, hidePopover } = usePopover();
  const aiCreate = useAiCreate();

  if (!canEditEvents) {
    return null;
  }

  const openAiPopover = () => {
    if (!isSolspaceAiConnected || !aiCreate) {
      openSolspaceAiSettings();
      return;
    }

    const anchor = buttonRef.current;
    if (!anchor) {
      return;
    }

    showPopover(
      <PopoverCreateWithAi
        onCancel={hidePopover}
        onApplyDraft={(draft) => {
          aiCreate.applyAiDraft(draft);
          hidePopover();
        }}
      />,
      anchor,
      {
        alignment: "end",
        position: ["bottom", "top", "right", "left"],
      },
    );
  };

  return <AiButton ref={buttonRef} connected={isSolspaceAiConnected} onClick={openAiPopover} />;
};
