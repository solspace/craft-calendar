import { usePopover } from "@cal/contexts/popover/popover.context";
import {
  deleteEvent,
  duplicateEvent,
  type EventMutationScope,
  editFollowing,
  getEventId,
  getRecurrenceIdFromId,
  openOccurrenceEditor,
  setOccurrenceCancelled,
} from "@cal/pages/calendar/calendar.events";
import { useConfig } from "@cal/pages/calendar/context/config.context";
import { utcToLocalDisplayDate } from "@cal/utils/date";
import { getDateLocale } from "@cal/utils/localization";
import translate from "@cal/utils/translations";
import {
  buildPreviewRecurrence,
  describeRecurrence,
} from "@event-builder/editor/calendar-preview/calendar-preview.operations";
import type { EventApi, EventClickArg } from "@fullcalendar/core/index.js";
import clsx from "clsx";
import { format, subDays } from "date-fns";
import { type FC, useMemo, useState } from "react";
import { useEventListener } from "usehooks-ts";
import { PopoverModifyEvent } from "../modify-event/modify";
import { type EventMenuAction, PopoverEventMenu } from "./view-event.menu";
import { PopoverActions, PopoverCloseButton, PopoverWrapper } from "./view-event.styles";

type Props = {
  fcEvent: Omit<EventClickArg, "event"> & { event: EventApi };
};

export const PopoverViewEvent: FC<Props> = ({ fcEvent }) => {
  const { hidePopover, showPopover } = usePopover();
  const { currentSiteId } = useConfig();
  const [isDeleting, setIsDeleting] = useState(false);
  const [isCancelling, setIsCancelling] = useState(false);
  const [isOpeningDraft, setIsOpeningDraft] = useState(false);
  const [isDuplicating, setIsDuplicating] = useState(false);
  const isBusy = isDeleting || isCancelling || isOpeningDraft || isDuplicating;

  useEventListener("keydown", (keyboardEvent) => {
    if (keyboardEvent.key === "Escape") {
      hidePopover();
    }
  });

  const event = fcEvent.event;
  const { end, allDay } = event;

  const calendarName = event.extendedProps.calendarName;
  const location =
    typeof event.extendedProps.location === "string" ? event.extendedProps.location.trim() : "";
  const description =
    typeof event.extendedProps.description === "string"
      ? event.extendedProps.description.trim()
      : "";

  const calendarColor =
    event.extendedProps.calendarColor ?? event.backgroundColor ?? event.borderColor ?? "#607d9f";

  const endForDisplay = useMemo(() => {
    if (!allDay) {
      return end;
    }

    return subDays(end as Date, 1);
  }, [allDay, end]);

  const isRecurring = Boolean(event.extendedProps.rrule);
  const rruleText = isRecurring
    ? describeRecurrence(
        buildPreviewRecurrence(event.extendedProps.rrule, event.start!.getTime() / 1000),
      )
    : null;
  const recurrenceId = getRecurrenceIdFromId(String(event.id));
  const dateFormat = event.allDay ? "PP" : "PPp";
  const isCancelled = Boolean(event.extendedProps.cancelled);
  const isEdited = Boolean(event.extendedProps.isEdited);
  const hasOverride = Boolean(event.extendedProps.hasOverride);
  const refetchEvents = () => fcEvent.view.calendar.refetchEvents();

  const editOccurrence = () => {
    if (!recurrenceId) {
      return;
    }

    hidePopover();
    openOccurrenceEditor({
      eventId: getEventId(String(event.id)),
      recurrenceId,
      siteId: currentSiteId,
      onSave: refetchEvents,
    });
  };

  // Changes from this occurrence onward go into a draft, which splits the event when it's applied
  const editThisAndFollowing = async () => {
    if (!recurrenceId || isBusy) {
      return;
    }

    setIsOpeningDraft(true);

    const url = await editFollowing({ event, recurrenceId, siteId: currentSiteId });
    if (url) {
      window.location.href = url;

      return;
    }

    setIsOpeningDraft(false);
  };

  const toggleCancelled = async () => {
    if (!recurrenceId || isBusy) {
      return;
    }

    setIsCancelling(true);

    try {
      const wasChanged = await setOccurrenceCancelled({
        event,
        recurrenceId,
        cancelled: !isCancelled,
        siteId: currentSiteId,
        refetchEvents,
      });

      if (wasChanged) {
        hidePopover();
      }
    } finally {
      setIsCancelling(false);
    }
  };

  const handleDelete = async () => {
    if (isDeleting) {
      return;
    }

    setIsDeleting(true);

    try {
      const wasDeleted = await deleteEvent({
        event,
        scope: "series",
        recurrenceId,
        siteId: currentSiteId,
        refetchEvents,
      });

      if (wasDeleted) {
        hidePopover();
      }
    } finally {
      setIsDeleting(false);
    }
  };

  const showRecurringDeletePopover = () => {
    const deleteOccurrences = async (scope: EventMutationScope): Promise<boolean> => {
      if (
        scope === "occurrence" &&
        hasOverride &&
        !window.confirm(
          translate("This occurrence has its own changes, which are deleted with it. Delete it?"),
        )
      ) {
        return false;
      }

      return deleteEvent({ event, scope, recurrenceId, siteId: currentSiteId, refetchEvents });
    };

    showPopover(<PopoverModifyEvent action="delete" onSelect={deleteOccurrences} />, fcEvent.el);
  };

  const handleDuplicate = async () => {
    if (isBusy) return;
    setIsDuplicating(true);
    const url = await duplicateEvent(event, currentSiteId);
    if (url) {
      window.location.href = url;
      return;
    }
    setIsDuplicating(false);
  };

  const menuActions: EventMenuAction[] = [
    {
      label: translate(isDuplicating ? "Duplicating..." : "Duplicate Event"),
      icon: "clone-dashed",
      color: "fuchsia",
      onSelect: () => void handleDuplicate(),
    },
  ];
  if (isRecurring && recurrenceId) {
    menuActions.push(
      { label: translate("Edit occurrence"), icon: "pencil", onSelect: editOccurrence },
      {
        label: translate(isOpeningDraft ? "Processing..." : "Edit this and following occurrences"),
        icon: "calendar-pen",
        onSelect: () => void editThisAndFollowing(),
      },
      {
        label: translate(isCancelled ? "Restore occurrence" : "Cancel occurrence"),
        icon: isCancelled ? "rotate-left" : "ban",
        onSelect: () => void toggleCancelled(),
      },
    );
  }
  menuActions.push({
    label: translate(isDeleting ? "Deleting..." : "Delete"),
    icon: "trash",
    destructive: true,
    onSelect: () => {
      if (isRecurring) {
        showRecurringDeletePopover();
      } else if (window.confirm(translate("Are you sure you want to delete this event?"))) {
        void handleDelete();
      }
    },
  });

  return (
    <PopoverWrapper>
      <PopoverCloseButton
        type="button"
        className="icon"
        data-icon="remove"
        aria-label={translate("Close")}
        title={translate("Close")}
        disabled={isBusy}
        onClick={hidePopover}
      />
      <h1 className={clsx("event-title", isCancelled && "is-cancelled")}>{event.title}</h1>

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

      {(isCancelled || isEdited) && (
        <div className={clsx("occurrence-status", !isCancelled && "is-edited")}>
          {isCancelled
            ? translate("This occurrence is cancelled.")
            : translate("This occurrence has its own changes.")}
        </div>
      )}

      <hr />

      <div>
        <b>{translate("Starts")}:</b>{" "}
        {format(utcToLocalDisplayDate(event.start!), dateFormat, { locale: getDateLocale() })}
        <br />
        <b>{translate("Ends")}:</b>{" "}
        {format(utcToLocalDisplayDate(endForDisplay!), dateFormat, { locale: getDateLocale() })}
      </div>

      {rruleText && (
        <div>
          <b>{translate("Repeats")}:</b> {rruleText}
        </div>
      )}

      {(location || description) && (
        <dl className="event-details">
          {location && (
            <div>
              <dt>{translate("Location")}</dt>
              <dd className="event-location">{location}</dd>
            </div>
          )}
          {description && (
            <div>
              <dt>{translate("Description")}</dt>
              <dd className="event-description">{description}</dd>
            </div>
          )}
        </dl>
      )}

      <hr />

      <PopoverActions>
        <a
          href={event.url}
          className={clsx("btn submit", isBusy && "disabled")}
          aria-disabled={isBusy}
          onClick={(click) => {
            if (isBusy) click.preventDefault();
          }}
        >
          {translate("Edit Event")}
        </a>

        <PopoverEventMenu actions={menuActions} disabled={isBusy} />
      </PopoverActions>
    </PopoverWrapper>
  );
};
