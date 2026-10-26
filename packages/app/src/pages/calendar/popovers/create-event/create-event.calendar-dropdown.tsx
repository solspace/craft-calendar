import { Control } from "@cal/components/controls/control";
import translate from "@cal/utils/translations";
import { type FC, useEffect, useId, useRef } from "react";
import styled, { createGlobalStyle, css } from "styled-components";

type CalendarOption = {
  value: number;
  label: string;
  color?: string | null;
};

type Props = {
  options: CalendarOption[];
  value: number;
  onChange: (value: number) => void;
};

export const CalendarDropdown: FC<Props> = ({ options, value, onChange }) => {
  const id = useId();
  const buttonRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);
  const onChangeRef = useRef(onChange);
  const definition = JSON.stringify(options);
  const selected = options.find((option) => option.value === value);

  useEffect(() => {
    onChangeRef.current = onChange;
  }, [onChange]);

  useEffect(() => {
    const button = buttonRef.current;
    if (!button) return;

    // Garnish detaches menus, so it owns this DOM rather than React.
    const menu = document.createElement("div");
    menu.className = "menu calendar-quick-create-menu";
    menu.style.minWidth = `${button.getBoundingClientRect().width}px`;
    menu.setAttribute("aria-label", translate("Calendar"));
    menuRef.current = menu;
    const list = document.createElement("ul");
    menu.append(list);
    const entries: CalendarOption[] = JSON.parse(definition);
    entries.forEach((entry) => {
      const item = document.createElement("li");
      const option = document.createElement("a");
      option.dataset.calendarId = String(entry.value);
      const dot = document.createElement("span");
      dot.className = "color-indicator";
      dot.style.backgroundColor = entry.color || "var(--gray-400)";
      dot.setAttribute("aria-hidden", "true");
      option.append(dot, document.createTextNode(entry.label));
      item.append(option);
      list.append(item);
    });
    button.after(menu);
    const menuButton = new Garnish.MenuBtn(button, {
      onOptionSelect: (target) => {
        menuButton.hideMenu();
        onChangeRef.current(Number(target.dataset.calendarId));
        button.focus();
      },
    });
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
      menuRef.current = null;
    };
  }, [definition]);

  // biome-ignore lint/correctness/useExhaustiveDependencies: A rebuilt menu also needs its selected state restored.
  useEffect(() => {
    menuRef.current?.querySelectorAll<HTMLElement>("[data-calendar-id]").forEach((option) => {
      const isSelected = Number(option.dataset.calendarId) === value;
      option.classList.toggle("sel", isSelected);
      option.setAttribute("aria-selected", String(isSelected));
    });
  }, [value, definition]);

  return (
    <Control label={translate("Calendar")} id={id} required>
      <CalendarMenuStyles />
      <CalendarButton
        ref={buttonRef}
        id={id}
        type="button"
        className="btn menubtn fullwidth"
        aria-required="true"
      >
        <span
          className="color-indicator"
          style={{ backgroundColor: selected?.color || "var(--gray-400)" }}
          aria-hidden="true"
        />
        <span className="calendar-name">{selected?.label}</span>
      </CalendarButton>
    </Control>
  );
};

const calendarDot = css`
  display: inline-block;
  flex: 0 0 10px;
  width: 10px;
  height: 10px;
  margin: 0;
  border-radius: 50%;
  box-shadow: inset 0 0 1px rgba(0, 0, 0, 0.6);
`;

// Garnish moves the menu outside the form, so its styles must follow it to the document body.
const CalendarMenuStyles = createGlobalStyle`
  .menu.calendar-quick-create-menu [data-calendar-id] {
    display: flex;
    align-items: center;
    gap: 5px;
  }
  .calendar-quick-create-menu .color-indicator { ${calendarDot} }
`;

const CalendarButton = styled.button`
  && {
    display: flex;
    align-items: center;
    justify-content: flex-start;
    gap: 7px;
    text-align: start;
  }

  .color-indicator {
    ${calendarDot}
  }

  .calendar-name {
    flex: 1;
    min-width: 0;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
`;
