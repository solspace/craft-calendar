import type { EventApi, EventContentArg } from "@fullcalendar/core/index.js";
import clsx from "clsx";
import { isCreateDraftEvent, isCreateDraftEventClickTarget } from "./calendar.create-session";

export const CALENDAR_EVENT_TITLE_LINK_SELECTOR = "[data-calendar-event-title-link]";

const isMonthSingleDayTimedEvent = (arg: EventContentArg): boolean =>
  arg.view.type === "dayGridMonth" && !arg.event.allDay && !arg.event.extendedProps?.multiDay;

const getCalendarContrastColorClass = (textColor?: string): string | null => {
  const normalizedColor = textColor?.toLowerCase();

  if (normalizedColor === "black" || normalizedColor === "white") {
    return `fc-color-${normalizedColor}`;
  }

  return null;
};

export const getCalendarEventClassNames = ({ event }: { event: EventApi }): string[] => {
  const classNames: string[] = [];

  if (event.allDay) {
    classNames.push("fc-event-all-day");
  }

  if (event.end) {
    if (!event.extendedProps?.multiDay && !event.allDay) {
      classNames.push("fc-event-single-day");
    } else {
      classNames.push("fc-event-multi-day");
    }
  }

  if (event.extendedProps?.enabled === false) {
    classNames.push("fc-event-disabled");
  }

  const contrastColorClass = getCalendarContrastColorClass(event.textColor);
  if (contrastColorClass) {
    classNames.push(contrastColorClass);
  }

  return classNames;
};

export const getCalendarEventClickAction = (
  event: Pick<EventApi, "extendedProps">,
  target: EventTarget | { closest?: (selector: string) => unknown } | null,
): "ignore" | "navigate" | "open" => {
  if (isCreateDraftEvent(event)) {
    return "ignore";
  }

  if (isCreateDraftEventClickTarget(target, CALENDAR_EVENT_TITLE_LINK_SELECTOR)) {
    return "navigate";
  }

  return "open";
};

export const renderCalendarEventContent = (arg: EventContentArg) => {
  const { event, timeText } = arg;
  const titleClassName = clsx(
    "fc-event-title",
    isMonthSingleDayTimedEvent(arg) && "fc-event-title-inline",
  );

  const isLink = !isCreateDraftEvent(event) && event.url;

  const titleContent = isLink ? (
    <button
      type="button"
      onClick={() => (window.location.href = event.url)}
      className={titleClassName}
      data-calendar-event-title-link
    >
      {event.title}
    </button>
  ) : (
    <div className={titleClassName}>{event.title}</div>
  );

  if (isMonthSingleDayTimedEvent(arg)) {
    return (
      <div className="fc-event-main-frame fc-event-main-frame-inline">
        <span
          className="fc-color-icon"
          style={{
            backgroundColor: event.backgroundColor,
            borderColor: event.borderColor,
          }}
        />
        <div className="fc-event-title-container">{titleContent}</div>
        {timeText ? <div className="fc-event-time">{timeText}</div> : null}
      </div>
    );
  }

  return (
    <div className="fc-event-main-frame">
      <div className="fc-event-title-container">{titleContent}</div>
    </div>
  );
};
