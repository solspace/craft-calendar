import translate from "@cal/utils/translations";
import { type ButtonHTMLAttributes, forwardRef } from "react";
import { AiButton as StyledAiButton } from "./ai-button.styles";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  /** When false, label becomes Enable AI (same Freeform pattern). */
  connected?: boolean;
  /** Connected label override (e.g. Update with AI on the event editor). */
  label?: string;
  /**
   * Craft CP icon:
   * - create → plus (`add`)
   * - edit → Craft `edit` pencil
   */
  icon?: "create" | "edit";
};

export const AiButton = forwardRef<HTMLButtonElement, Props>(
  ({ connected = true, label, icon = "create", children, className, ...props }, ref) => {
    const text =
      children ?? (connected ? (label ?? translate("Create with AI")) : translate("Enable AI"));

    const isCreate = icon === "create";

    return (
      <StyledAiButton
        ref={ref}
        type="button"
        className={["btn", "icon", isCreate && "add", className].filter(Boolean).join(" ")}
        {...(!isCreate ? { "data-icon": "edit" } : {})}
        {...props}
      >
        {text}
      </StyledAiButton>
    );
  },
);

AiButton.displayName = "AiButton";
