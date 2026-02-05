import { format } from "date-fns";
import { type ReactElement, useCallback, useEffect, useRef, useState } from "react";
import DatePickerControl from "react-datepicker";
import type {
  DatePickerPosition,
  GetCalendarApi,
  MacroCustomButtonInput,
  WeekStartDay,
} from "./macro.types";

import "react-datepicker/dist/react-datepicker.css";

type UseMacroDateSelectorProps = {
  getApi: GetCalendarApi;
  weekStartDay: WeekStartDay;
};

type UseMacroDateSelectorResult = {
  datePickerButton: MacroCustomButtonInput;
  dateSelector: ReactElement | null;
};

type DateSelectorPopoverProps = {
  popoverRef: React.RefObject<HTMLDivElement | null>;
  position: DatePickerPosition;
  selectedDate: Date | null;
  weekStartDay: WeekStartDay;
  onDateSelect: (date: Date | null) => void;
};

const DateSelectorPopover = ({
  popoverRef,
  position,
  selectedDate,
  weekStartDay,
  onDateSelect,
}: DateSelectorPopoverProps): ReactElement => {
  return (
    <div
      ref={popoverRef}
      className="fc-datepicker-popover"
      style={{
        top: position.top,
        left: position.left,
      }}
    >
      <DatePickerControl
        inline
        selected={selectedDate}
        onChange={onDateSelect}
        showMonthDropdown
        showYearDropdown
        dropdownMode="select"
        calendarStartDay={weekStartDay}
      />
    </div>
  );
};

export const useMacroDateSelector = ({
  getApi,
  weekStartDay,
}: UseMacroDateSelectorProps): UseMacroDateSelectorResult => {
  const popoverRef = useRef<HTMLDivElement>(null);
  const [isOpen, setIsOpen] = useState(false);
  const [position, setPosition] = useState<DatePickerPosition | null>(null);
  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const closeDateSelector = useCallback(() => {
    setIsOpen(false);
    setPosition(null);
  }, []);

  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const closeOnOutsideInteraction = (event: MouseEvent) => {
      const target = event.target as HTMLElement | null;
      if (!target) {
        return;
      }

      if (popoverRef.current?.contains(target)) {
        return;
      }

      if (target.closest(".fc-datepicker-button")) {
        return;
      }

      closeDateSelector();
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeDateSelector();
      }
    };

    window.addEventListener("mousedown", closeOnOutsideInteraction);
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("mousedown", closeOnOutsideInteraction);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [closeDateSelector, isOpen]);

  const onDateSelect = useCallback(
    (date: Date | null) => {
      if (!date) {
        return;
      }

      const api = getApi();
      if (!api) {
        return;
      }

      const url = Craft.getCpUrl(`calendar/${format(date, "yyyy/MM/dd")}`);

      history.pushState("data", "", url);
      api.gotoDate(date);

      setSelectedDate(date);
      closeDateSelector();
    },
    [closeDateSelector, getApi],
  );

  const onDatePickerButtonClick = useCallback(
    (_event: MouseEvent, element: HTMLElement) => {
      const api = getApi();
      if (!api) {
        return;
      }

      const { bottom, right } = element.getBoundingClientRect();

      setSelectedDate(api.getDate());
      setIsOpen((currentOpenState) => !currentOpenState);
      setPosition({
        top: bottom + 8,
        left: right,
      });
    },
    [getApi],
  );

  const dateSelector =
    isOpen && position ? (
      <DateSelectorPopover
        popoverRef={popoverRef}
        position={position}
        selectedDate={selectedDate}
        weekStartDay={weekStartDay}
        onDateSelect={onDateSelect}
      />
    ) : null;

  return {
    datePickerButton: {
      text: Craft.t("calendar", "Pick a Date"),
      icon: "datepicker",
      click: onDatePickerButtonClick,
    },
    dateSelector,
  };
};
