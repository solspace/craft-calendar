import { getDateLocale } from "@cal/utils/localization";
import translate from "@cal/utils/translations";
import type { Locale, Month } from "date-fns";
import { type KeyboardEvent, useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import type { ReactDatePickerCustomHeaderProps } from "react-datepicker";

type Option = { value: number; label: string; disabled?: boolean };

const searchable = (text: string) =>
  text
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase();

const PickerSelect = ({
  label,
  placeholder,
  options,
  value,
  onChange,
  className,
}: {
  label: string;
  placeholder: string;
  options: Option[];
  value: number;
  onChange: (value: number) => void;
  className: string;
}) => {
  const id = useId();
  const wrapper = useRef<HTMLDivElement>(null);
  const trigger = useRef<HTMLButtonElement>(null);
  const input = useRef<HTMLInputElement>(null);
  const list = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [menuPosition, setMenuPosition] = useState({ above: false, height: 192 });
  const [activeValue, setActiveValue] = useState(value);
  const matches = options.filter((option) =>
    searchable(option.label).includes(searchable(query.trim())),
  );
  const enabled = matches.filter((option) => !option.disabled);
  const active = enabled.find((option) => option.value === activeValue) ?? enabled[0];
  const selected = options.find((option) => option.value === value);
  const close = (restoreFocus = true) => {
    setOpen(false);
    if (restoreFocus) trigger.current?.focus({ preventScroll: true });
  };
  const show = () => {
    setQuery("");
    setActiveValue(value);
    setOpen(true);
  };
  const select = (option: Option) => {
    if (option.disabled) return;
    onChange(option.value);
    close();
  };

  useEffect(() => {
    if (!open) return;
    input.current?.focus({ preventScroll: true });
    const outside = (event: PointerEvent) => {
      if (event.target instanceof Node && !wrapper.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", outside, true);
    return () => document.removeEventListener("pointerdown", outside, true);
  }, [open]);

  useLayoutEffect(() => {
    if (!open || !wrapper.current) return;
    const bounds = wrapper.current.getBoundingClientRect();
    const below = window.innerHeight - bounds.bottom - 14;
    const above = bounds.top - 14;
    const opensAbove = below < 220 && above > below;
    setMenuPosition({
      above: opensAbove,
      height: Math.max(56, Math.min(192, (opensAbove ? above : below) - 48)),
    });
  }, [open]);

  useLayoutEffect(() => {
    if (!open || !list.current || !active) return;
    const option = list.current.querySelector<HTMLElement>(`[data-value="${active.value}"]`);
    if (!option) return;
    const top = option.offsetTop;
    const height = Math.min(list.current.clientHeight, menuPosition.height);
    if (!query && active.value === value) {
      list.current.scrollTop = top - (height - option.offsetHeight) / 2;
    } else if (top < list.current.scrollTop) {
      list.current.scrollTop = top;
    } else if (top + option.offsetHeight > list.current.scrollTop + height) {
      list.current.scrollTop = top + option.offsetHeight - height;
    }
  }, [open, query, active, value, menuPosition.height]);

  const navigate = (
    event: Pick<KeyboardEvent<HTMLInputElement>, "key" | "preventDefault" | "stopPropagation">,
  ) => {
    if (["ArrowDown", "ArrowUp", "Enter", "Escape"].includes(event.key)) {
      event.preventDefault();
      event.stopPropagation();
    }
    if (event.key === "Escape") close();
    if (event.key === "Tab") close();
    if (event.key === "Enter" && active) select(active);
    if ((event.key === "ArrowDown" || event.key === "ArrowUp") && enabled.length) {
      const current = enabled.findIndex((option) => option.value === active?.value);
      const next =
        (current + (event.key === "ArrowDown" ? 1 : -1) + enabled.length) % enabled.length;
      setActiveValue(enabled[next].value);
    }
  };

  useEffect(() => {
    const search = input.current;
    if (!open || !search) return;
    // Craft registers native shortcuts on body before React's portal listeners.
    // Handle menu keys on the input so they cannot reach those shortcuts first.
    search.addEventListener("keydown", navigate);
    return () => search.removeEventListener("keydown", navigate);
  });

  return (
    <div className={`calendar-picker-select ${className}`} ref={wrapper}>
      <button
        ref={trigger}
        type="button"
        className="calendar-picker-select-trigger"
        aria-label={`${label}: ${selected?.label ?? value}`}
        aria-haspopup="listbox"
        aria-expanded={open}
        aria-controls={`${id}-options`}
        onClick={() => (open ? close() : show())}
        onKeyDown={(event) => {
          if (event.key === "ArrowDown" || event.key === "ArrowUp") {
            event.preventDefault();
            event.stopPropagation();
            show();
          }
        }}
      >
        <span>{selected?.label ?? value}</span>
        <span className="calendar-picker-select-chevron" aria-hidden="true" />
      </button>
      {open && (
        <div
          className="calendar-picker-menu"
          data-placement={menuPosition.above ? "top" : "bottom"}
        >
          <input
            ref={input}
            type="search"
            role="combobox"
            aria-label={placeholder}
            placeholder={placeholder}
            aria-autocomplete="list"
            aria-expanded="true"
            aria-controls={`${id}-options`}
            aria-activedescendant={active ? `${id}-option-${active.value}` : undefined}
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setActiveValue(value);
            }}
          />
          <div
            ref={list}
            id={`${id}-options`}
            role="listbox"
            aria-label={label}
            className="calendar-picker-options"
            style={{ maxHeight: menuPosition.height }}
          >
            {matches.map((option) => (
              <button
                key={option.value}
                type="button"
                tabIndex={-1}
                disabled={option.disabled}
                id={`${id}-option-${option.value}`}
                role="option"
                aria-selected={option.value === value}
                aria-disabled={option.disabled || undefined}
                data-value={option.value}
                data-active={active?.value === option.value || undefined}
                onMouseDown={(event) => event.preventDefault()}
                onClick={() => select(option)}
              >
                {option.label}
                {option.value === value && <span aria-hidden="true">✓</span>}
              </button>
            ))}
            {!matches.length && (
              <p className="calendar-picker-no-results" role="status">
                {translate("No matches found.")}
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

type Props = ReactDatePickerCustomHeaderProps & {
  locale?: Pick<Locale, "localize">;
  minDate?: Date;
  maxDate?: Date;
  showMonth?: boolean;
  showYear?: boolean;
};

export const DatePickerHeader = ({
  monthDate,
  changeMonth,
  changeYear,
  decreaseMonth,
  increaseMonth,
  prevMonthButtonDisabled,
  nextMonthButtonDisabled,
  minDate,
  maxDate,
  showMonth = true,
  showYear = true,
  locale = getDateLocale(),
}: Props) => {
  const year = monthDate.getFullYear();
  const month = monthDate.getMonth();
  const minYear = minDate?.getFullYear() ?? Math.min(1900, year);
  const maxYear = maxDate?.getFullYear() ?? Math.max(2100, year);
  const minMonth = minDate?.getFullYear() === year ? minDate.getMonth() : 0;
  const maxMonth = maxDate?.getFullYear() === year ? maxDate.getMonth() : 11;
  const months = Array.from({ length: 12 }, (_, value) => ({
    value,
    label: locale.localize.month(value as Month, { width: "wide" }),
    disabled: value < minMonth || value > maxMonth,
  }));
  const years = Array.from({ length: Math.max(0, maxYear - minYear + 1) }, (_, i) => ({
    value: minYear + i,
    label: String(minYear + i),
  }));
  return (
    <div className="calendar-picker-header">
      <button
        type="button"
        className="calendar-picker-nav"
        aria-label={translate("Previous month")}
        disabled={prevMonthButtonDisabled}
        onClick={decreaseMonth}
      >
        <span
          className="react-datepicker__navigation-icon react-datepicker__navigation-icon--previous"
          aria-hidden="true"
        />
      </button>
      {showMonth ? (
        <PickerSelect
          className="calendar-picker-month"
          label={translate("Month")}
          placeholder={translate("Search months…")}
          options={months}
          value={month}
          onChange={changeMonth}
        />
      ) : (
        <span className="calendar-picker-month-label">{months[month].label}</span>
      )}
      {showYear ? (
        <PickerSelect
          className="calendar-picker-year"
          label={translate("Year")}
          placeholder={translate("Search years…")}
          options={years}
          value={year}
          onChange={(next) => {
            changeYear(next);
            const lower = minDate?.getFullYear() === next ? minDate.getMonth() : 0;
            const upper = maxDate?.getFullYear() === next ? maxDate.getMonth() : 11;
            const nextMonth = Math.max(lower, Math.min(upper, month));
            if (nextMonth !== month) changeMonth(nextMonth);
          }}
        />
      ) : (
        <span>{year}</span>
      )}
      <button
        type="button"
        className="calendar-picker-nav"
        aria-label={translate("Next month")}
        disabled={nextMonthButtonDisabled}
        onClick={increaseMonth}
      >
        <span
          className="react-datepicker__navigation-icon react-datepicker__navigation-icon--next"
          aria-hidden="true"
        />
      </button>
    </div>
  );
};
