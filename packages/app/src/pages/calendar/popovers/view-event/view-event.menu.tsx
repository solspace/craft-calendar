import { usePopover } from "@cal/contexts/popover/popover.context";
import translate from "@cal/utils/translations";
import { type FC, useEffect, useRef } from "react";
import { PopoverMenuButton } from "./view-event.styles";

export type EventMenuAction = {
  label: string;
  destructive?: boolean;
  onSelect: () => void;
};

type Props = {
  actions: EventMenuAction[];
  disabled: boolean;
};

export const PopoverEventMenu: FC<Props> = ({ actions, disabled }) => {
  const { keepPopoverOpen } = usePopover();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const interactionRef = useRef({ actions, disabled });
  const menuDefinition = JSON.stringify(
    actions.map(({ label, destructive }) => ({ label, destructive })),
  );

  useEffect(() => {
    interactionRef.current = { actions, disabled };
  }, [actions, disabled]);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    // Garnish moves menus into the document body; keep that DOM outside React's ownership.
    const menu = document.createElement("div");
    menu.className = "menu";
    menu.setAttribute("aria-label", translate("More actions"));
    let list = document.createElement("ul");
    menu.append(list);
    const options: Pick<EventMenuAction, "label" | "destructive">[] = JSON.parse(menuDefinition);
    options.forEach((action, index) => {
      if (action.destructive && index > 0) {
        menu.append(document.createElement("hr"));
        list = document.createElement("ul");
        menu.append(list);
      }
      const item = document.createElement("li");
      const option = document.createElement("a");
      option.textContent = action.label;
      option.dataset.action = String(index);
      if (action.destructive) option.className = "error";
      item.append(option);
      list.append(item);
    });
    button.after(menu);

    const menuButton = new Garnish.MenuBtn(button, {
      onOptionSelect: (target) => {
        if (interactionRef.current.disabled) return;
        menuButton.hideMenu();
        interactionRef.current.actions[Number(target.dataset.action)]?.onSelect();
      },
    });
    menuButton.menu.on("show", keepPopoverOpen);

    const dismissMenu = (event: KeyboardEvent) => {
      if (event.key === "Escape" && menuButton.showingMenu) {
        event.preventDefault();
        event.stopPropagation();
        menuButton.hideMenu();
        button.focus();
      }
    };
    document.addEventListener("keydown", dismissMenu, true);

    return () => {
      document.removeEventListener("keydown", dismissMenu, true);
      menuButton.hideMenu();
      menuButton.destroy();
      menu.remove();
    };
  }, [menuDefinition, keepPopoverOpen]);

  return (
    <PopoverMenuButton
      ref={buttonRef}
      type="button"
      className="btn menubtn no-arrow"
      disabled={disabled}
      aria-label={translate("More actions")}
      title={translate("More actions")}
    >
      <span aria-hidden="true">•••</span>
    </PopoverMenuButton>
  );
};
