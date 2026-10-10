import { LoadingSkeleton } from "@cal/components/loading-skeleton/loading-skeleton";
import type { CSSProperties, FC } from "react";
import { useCalendars } from "./sidebar.queries";
import {
  CalendarCheckbox,
  CalendarCheckboxInput,
  CalendarLabel,
  CalendarList,
  CalendarListItem,
  CalendarTitle,
  SidebarError,
  SidebarWrapper,
  SkeletonList,
} from "./sidebar.styles";

type CalendarSidebarProps = {
  hiddenCalendarIds: number[];
  onToggleCalendar: (calendarId: number) => void;
};

export const CalendarSidebar: FC<CalendarSidebarProps> = ({
  hiddenCalendarIds,
  onToggleCalendar,
}) => {
  const { data: calendars, error, isPending } = useCalendars();
  const hiddenCalendarIdSet = new Set(hiddenCalendarIds);

  const isInitialFetch = isPending && calendars.length === 0;

  return (
    <SidebarWrapper>
      {isInitialFetch && (
        <SkeletonList>
          <LoadingSkeleton height={16} />
          <LoadingSkeleton height={16} />
          <LoadingSkeleton height={16} />
        </SkeletonList>
      )}

      {!isInitialFetch && error && <SidebarError>{error.message}</SidebarError>}

      {!isInitialFetch && !error && (
        <CalendarList>
          {calendars.map((calendar) => (
            <CalendarListItem key={calendar.id}>
              <CalendarLabel
                style={
                  {
                    "--calendar-color": calendar.color.base,
                    "--calendar-color-contrast": calendar.color.contrast,
                  } as CSSProperties
                }
              >
                <CalendarCheckboxInput
                  type="checkbox"
                  checked={!hiddenCalendarIdSet.has(calendar.id)}
                  onChange={() => onToggleCalendar(calendar.id)}
                />
                <CalendarCheckbox />
                <CalendarTitle>{calendar.title}</CalendarTitle>
              </CalendarLabel>
            </CalendarListItem>
          ))}
        </CalendarList>
      )}
    </SidebarWrapper>
  );
};
