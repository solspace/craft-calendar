import { usePopover } from "@cal/contexts/popover/popover.context";
import { deleteEvent, getOccurrenceDateFromId } from "@cal/pages/calendar/calendar.events";
import { Flex } from "@cal/styles/components";
import { getRRuleText } from "@cal/utils/rrule";
import translate from "@cal/utils/translations";
import type { EventClickArg } from "@fullcalendar/core/index.js";
import clsx from "clsx";
import { format, subDays } from "date-fns";
import { type FC, useMemo, useState } from "react";
import { useEventListener } from "usehooks-ts";
import { PopoverModifyEvent } from "../modify-event/modify";
import { PopoverWrapper } from "./view-event.styles";

type Props = {
  fcEvent: EventClickArg;
};

export const PopoverViewEvent: FC<Props> = ({ fcEvent }) => {
  const { hidePopover, showPopover } = usePopover();
  const [isDeleting, setIsDeleting] = useState(false);

  useEventListener("keydown", (keyboardEvent) => {
    if (keyboardEvent.key === "Escape") {
      hidePopover();
    }
  });

  const event = fcEvent.event;
  const { end, allDay } = event;

  const calendarName = event.extendedProps.calendarName;

  const calendarColor =
    event.extendedProps.calendarColor ?? event.backgroundColor ?? event.borderColor ?? "#607d9f";

  const endForDisplay = useMemo(() => {
    if (!allDay) {
      return end;
    }

    return subDays(end as Date, 1);
  }, [allDay, end]);

  const isRecurring = Boolean(event.extendedProps.rrule);
  const rruleText = isRecurring ? getRRuleText(event.extendedProps.rrule) : null;
  const occurrenceDate = getOccurrenceDateFromId(String(event.id), event.allDay);
  const dateFormat = event.allDay ? "PP" : "PPp";

  const handleDelete = async () => {
    if (isDeleting) {
      return;
    }

    setIsDeleting(true);

    try {
      const wasDeleted = await deleteEvent({
        event,
        scope: "series",
        occurrenceDate,
        refetchEvents: () => fcEvent.view.calendar.refetchEvents(),
      });

      if (wasDeleted) {
        hidePopover();
      }
    } finally {
      setIsDeleting(false);
    }
  };

  const showRecurringDeletePopover = () => {
    showPopover(
      <PopoverModifyEvent
        actionLabel={translate("deleting")}
        onOnlyThisOccurrence={async () => {
          const wasDeleted = await deleteEvent({
            event,
            scope: "occurrence",
            occurrenceDate,
            refetchEvents: () => fcEvent.view.calendar.refetchEvents(),
          });

          if (wasDeleted) {
            hidePopover();
          }
        }}
        onAllOccurrences={async () => {
          const wasDeleted = await deleteEvent({
            event,
            scope: "series",
            occurrenceDate,
            refetchEvents: () => fcEvent.view.calendar.refetchEvents(),
          });

          if (wasDeleted) {
            hidePopover();
          }
        }}
      />,
      fcEvent.el,
    );
  };

  return (
    <PopoverWrapper>
      <h1>{event.title}</h1>

      {calendarName && (
        <div className="calendar-label">
          <span
            className="calendar-label-dot"
            style={{ backgroundColor: calendarColor }}
            aria-hidden="true"
          />
          <span>{calendarName}</span>
        </div>
      )}

      <hr />

      <div>
        <b>{translate("Starts")}:</b> {format(event.start!, dateFormat)}
        <br />
        <b>{translate("Ends")}:</b> {format(endForDisplay!, dateFormat)}
      </div>

      {rruleText && (
        <div>
          <b>{translate("Repeats")}:</b> {rruleText}
        </div>
      )}

      <hr />

      <Flex>
        <a href={event.url} className={clsx("btn submit", isDeleting && "disabled")}>
          {translate("Edit")}
        </a>

        <button
          type="button"
          className={clsx("btn", isDeleting && "disabled")}
          disabled={isDeleting}
          onClick={() => {
            if (isRecurring) {
              showRecurringDeletePopover();

              return;
            }

            if (!window.confirm(translate("Are you sure you want to delete this event?"))) {
              return;
            }

            void handleDelete();
          }}
        >
          {translate(isDeleting ? "Deleting..." : "Delete")}
        </button>

        <button
          type="button"
          className={clsx("btn", isDeleting && "disabled")}
          disabled={isDeleting}
          onClick={() => hidePopover()}
        >
          {translate("Close")}
        </button>
      </Flex>
    </PopoverWrapper>
  );
};
