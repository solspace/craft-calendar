import type { CalendarOptions } from "@fullcalendar/core";
import { useId } from "react";
import { useLocalStorage } from "usehooks-ts";

export type AgendaRange = "week" | "month" | "threeMonths" | "year";

type RangeOptions = Pick<CalendarOptions, "duration" | "dateAlignment" | "dateIncrement">;

const rangeOptions: Record<AgendaRange, RangeOptions> = {
  week: { duration: { weeks: 1 }, dateAlignment: "week", dateIncrement: { weeks: 1 } },
  month: { duration: { months: 1 }, dateAlignment: "month", dateIncrement: { months: 1 } },
  threeMonths: { duration: { months: 3 }, dateAlignment: "month", dateIncrement: { months: 3 } },
  year: { duration: { years: 1 }, dateAlignment: "year", dateIncrement: { years: 1 } },
};

export const getAgendaRangeOptions = (range: AgendaRange): RangeOptions => rangeOptions[range];

export const useAgendaRange = () => {
  const [storedRange, setRange] = useLocalStorage<AgendaRange>(
    "solspace-calendar-agenda-range",
    "month",
  );
  const range = Object.hasOwn(rangeOptions, storedRange) ? storedRange : "month";

  return { range, setRange };
};

export const AgendaRangeSelector = ({
  range,
  onChange,
  disabled,
}: {
  range: AgendaRange;
  onChange: (range: AgendaRange) => void;
  disabled: boolean;
}) => {
  const id = useId();

  return (
    <div className="calendar-agenda-range">
      <label htmlFor={id}>{Craft.t("calendar", "Range")}</label>
      <div className="select">
        <select
          id={id}
          aria-label={Craft.t("calendar", "Agenda range")}
          value={range}
          disabled={disabled}
          onChange={(event) => onChange(event.target.value as AgendaRange)}
        >
          <option value="week">{Craft.t("calendar", "Week")}</option>
          <option value="month">{Craft.t("calendar", "Month")}</option>
          <option value="threeMonths">{Craft.t("calendar", "3 months")}</option>
          <option value="year">{Craft.t("calendar", "Year")}</option>
        </select>
      </div>
    </div>
  );
};
