import { usePopover } from "@cal/contexts/popover/popover.context";
import { useAiCreate } from "@cal/pages/calendar/context/ai-create.context";
import { PopoverCreateWithAi } from "@cal/pages/calendar/popovers/create-with-ai/create-with-ai";
import translate from "@cal/utils/translations";
import type { FC, RefObject } from "react";

type Props = {
  buttonRef: RefObject<HTMLButtonElement | null>;
  isSolspaceAiConnected: boolean;
  canEditEvents: boolean;
};

export const HeaderAiCreate: FC<Props> = ({ buttonRef, isSolspaceAiConnected, canEditEvents }) => {
  const { showPopover, hidePopover } = usePopover();
  const aiCreate = useAiCreate();

  if (!isSolspaceAiConnected || !canEditEvents || !aiCreate) {
    return null;
  }

  const openAiPopover = () => {
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

  return (
    <button ref={buttonRef} type="button" className="btn submit" onClick={openAiPopover}>
      {translate("Create with AI")}
    </button>
  );
};
