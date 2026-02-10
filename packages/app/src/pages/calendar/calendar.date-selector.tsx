import { format } from "date-fns";
import { type FC, type ReactElement, useCallback, useEffect, useRef, useState } from "react";
import DatePickerControl from "react-datepicker";
import type { CustomButtonInput, DatePickerPosition, WeekStartDay } from "./calendar.types";

import "react-datepicker/dist/react-datepicker.css";
import type { CalendarApi } from "@fullcalendar/core/index.js";
import { useViewSettings, type View } from "./calendar.persistence";

type UseDateSelectorProps = {
  api: CalendarApi;
  weekStartDay: WeekStartDay;
};

type UseDateSelectorResult = {
  datePickerButton: CustomButtonInput;
  dateSelector: ReactElement | null;
};

type DateSelectorPopoverProps = {
  view: View;
  popoverRef: React.RefObject<HTMLDivElement | null>;
  position: DatePickerPosition;
  selectedDate: Date | null;
  weekStartDay: WeekStartDay;
  onDateSelect: (date: Date | null) => void;
};

const DateSelectorPopover: FC<DateSelectorPopoverProps> = ({
  view,
  popoverRef,
  position,
  selectedDate,
  weekStartDay,
  onDateSelect,
}) => {
  const showWeekPicker = view === "timeGridWeek";
  const showMonthYearPicker = view === "dayGridMonth";

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
        showWeekPicker={showWeekPicker}
        showWeekNumbers={showWeekPicker}
        showMonthYearPicker={showMonthYearPicker}
      />
    </div>
  );
};

export const useDateSelector = ({
  api,
  weekStartDay,
}: UseDateSelectorProps): UseDateSelectorResult => {
  const { view } = useViewSettings();
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

      const url = Craft.getCpUrl(`calendar/${format(date, "yyyy/MM/dd")}`);

      history.pushState("data", "", url);
      api.gotoDate(date);

      setSelectedDate(date);
      closeDateSelector();
    },
    [closeDateSelector, api],
  );

  const onDatePickerButtonClick = useCallback(
    (_event: MouseEvent, element: HTMLElement) => {
      const { bottom, right } = element.getBoundingClientRect();

      setSelectedDate(api.getDate());
      setIsOpen((currentOpenState) => !currentOpenState);
      setPosition({
        top: bottom + 8,
        left: right,
      });
    },
    [api],
  );

  const dateSelector =
    isOpen && position ? (
      <DateSelectorPopover
        view={view}
        popoverRef={popoverRef}
        position={position}
        selectedDate={selectedDate}
        weekStartDay={weekStartDay}
        onDateSelect={onDateSelect}
      />
    ) : null;

  return {
    dateSelector,
    datePickerButton: {
      text: Craft.t("calendar", "Pick a Date"),
      icon: "datepicker",
      click: onDatePickerButtonClick,
    },
  };
};
