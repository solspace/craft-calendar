import translate from "@cal/utils/translations";
import { useEffect, useId, useRef, useState } from "react";

export const getCalendarSearch = () =>
  new URL(window.location.href).searchParams.get("search")?.trim() ?? "";

export const CalendarSearch = ({
  initialSearch,
  onSearchChange,
}: {
  initialSearch: string;
  onSearchChange: (search: string) => void;
}) => {
  const [value, setValue] = useState(initialSearch);
  const helpId = useId();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => onSearchChange(value.trim()), 250);
    return () => clearTimeout(timer);
  }, [value, onSearchChange]);

  const clear = () => {
    setValue("");
    onSearchChange("");
    inputRef.current?.focus();
  };

  return (
    <div className="calendar-search-toolbar">
      <div className="calendar-search-input">
        <span className="calendar-search-icon" data-icon="search" aria-hidden="true" />
        <input
          type="search"
          ref={inputRef}
          className="text fullwidth"
          aria-label={translate("Search events")}
          aria-describedby={helpId}
          placeholder={translate("Search events…")}
          value={value}
          onChange={(event) => setValue(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Escape" && value) {
              event.stopPropagation();
              clear();
            }
          }}
        />
        {value && (
          <button
            type="button"
            className="calendar-search-clear"
            aria-label={translate("Clear search")}
            data-icon="remove"
            onClick={clear}
          />
        )}
      </div>
      <span id={helpId} className="calendar-search-help">
        {translate("Searches events in the displayed date range.")}
      </span>
    </div>
  );
};
