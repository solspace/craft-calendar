import { usePopover } from "@cal/contexts/popover/popover.context";
import { useConfig } from "@cal/pages/calendar/context/config.context";
import type { EventActionIcon } from "@cal/types/config";
import translate from "@cal/utils/translations";
import { type FC, useEffect, useRef } from "react";

export type EventMenuAction = {
  label: string;
  icon?: EventActionIcon;
  color?: "fuchsia";
  destructive?: boolean;
  onSelect: () => void;
};

type Props = {
  actions: EventMenuAction[];
  disabled: boolean;
};

export const PopoverEventMenu: FC<Props> = ({ actions, disabled }) => {
  const { eventActionIcons } = useConfig();
  const { keepPopoverOpen } = usePopover();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const interactionRef = useRef({ actions, disabled });
  const menuDefinition = JSON.stringify(
    actions.map(({ label, destructive, icon, color }) => ({
      label,
      destructive,
      icon: icon ? eventActionIcons?.[icon] : undefined,
      color,
    })),
  );

  useEffect(() => {
    interactionRef.current = { actions, disabled };
  }, [actions, disabled]);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    // Garnish moves menus into the document body; keep that DOM outside React's ownership.
    const menu = document.createElement("div");
    menu.className = "menu menu--disclosure calendar-event-action-menu";
    menu.setAttribute("aria-label", translate("More actions"));
    let list = document.createElement("ul");
    menu.append(list);
    const options: { label: string; destructive?: boolean; icon?: string; color?: "fuchsia" }[] =
      JSON.parse(menuDefinition);
    options.forEach((action, index) => {
      if (action.destructive && index > 0) {
        menu.append(document.createElement("hr"));
        list = document.createElement("ul");
        menu.append(list);
      }
      const item = document.createElement("li");
      const option = document.createElement("a");
      option.className = "menu-item";
      if (action.icon) {
        const icon = document.createElement("span");
        icon.className = action.color ? `icon ${action.color}` : "icon";
        icon.setAttribute("aria-hidden", "true");
        // Markup comes exclusively from Craft's Cp::iconSvg() for the fixed server-side icon list.
        icon.innerHTML = action.icon;
        option.append(icon);
      }
      const label = document.createElement("span");
      label.className = "menu-item-label";
      label.textContent = action.label;
      option.append(label);
      option.dataset.action = String(index);
      if (action.destructive) option.classList.add("error");
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
    <button
      ref={buttonRef}
      type="button"
      className="btn menubtn action-btn"
      disabled={disabled}
      aria-label={translate("More actions")}
      title={translate("More actions")}
    />
  );
};
