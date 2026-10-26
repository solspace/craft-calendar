import { PopoverProvider } from "@cal/contexts/popover/popover.context";
import type { CalendarCreateDraft } from "@cal/pages/calendar/calendar.create-session";
import { getCalendarNow } from "@cal/pages/calendar/calendar.now-indicator";
import { ConfigProvider } from "@cal/pages/calendar/context/config.context";
import { QuickCreateEventForm } from "@cal/pages/calendar/popovers/create-event/create-event";
import type { CreatedQuickEvent } from "@cal/pages/calendar/popovers/create-event/create-event.mutation";
import translate from "@cal/utils/translations";
import { type FC, useState } from "react";
import { EventWidgetWrapper } from "./event.styles";
import type { EventWidgetConfig } from "./event.types";

const createWidgetDraft = (config: EventWidgetConfig): CalendarCreateDraft => {
  const date = getCalendarNow();
  date.setUTCMinutes(0, 0, 0);
  if (config.allDayDefault) date.setUTCHours(0);
  const start = date.getTime() / 1000;
  return {
    id: "widget-create-event",
    title: "",
    allDay: config.allDayDefault,
    start,
    end: start + (config.allDayDefault ? 86400 : Math.max(1, config.eventDuration) * 60),
  };
};

export const EventWidget: FC<{ config: EventWidgetConfig }> = ({ config }) => {
  const [draft, setDraft] = useState(() => createWidgetDraft(config));
  const [version, setVersion] = useState(0);
  const [created, setCreated] = useState<CreatedQuickEvent | null>(null);
  const resetDraft = () => {
    setDraft(createWidgetDraft(config));
    setVersion((version) => version + 1);
  };

  if (!Object.keys(config.calendars).length) {
    return (
      <EventWidgetWrapper>
        <p className="calendar-widget-status">{translate("No calendars are available.")}</p>
      </EventWidgetWrapper>
    );
  }

  return (
    <ConfigProvider
      config={{
        ...config,
        language: config.language || "en-US",
        isMultiSite: false,
        isDragAndDropEnabled: false,
        isQuickCreateEnabled: true,
        canEditEvents: true,
      }}
    >
      <PopoverProvider>
        <EventWidgetWrapper>
          <QuickCreateEventForm
            key={version}
            variant="widget"
            showMoreDetails={config.showMoreDetails ?? true}
            draft={draft}
            onChange={setDraft}
            onCancel={() => {
              resetDraft();
              setCreated(null);
            }}
            onConfirm={(event) => {
              setCreated({ ...event, title: event?.title || draft.title });
              resetDraft();
            }}
            refetchEvents={() => window.dispatchEvent(new Event("calendar:events-changed"))}
          />
          {created && (
            <div className="calendar-widget-success" role="status">
              <strong>{translate("Event created successfully")}</strong>
              {created.url && (
                <a href={created.url}>
                  {translate("View event")}: {created.title}
                </a>
              )}
            </div>
          )}
        </EventWidgetWrapper>
      </PopoverProvider>
    </ConfigProvider>
  );
};
