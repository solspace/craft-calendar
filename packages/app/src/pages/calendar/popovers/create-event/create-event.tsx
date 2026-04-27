import { DatePicker, Icon } from "@cal/components/controls/date-picker/date-picker";
import { LightSwitch } from "@cal/components/controls/lightswitch/lightswitch";
import { TextInput } from "@cal/components/controls/text-input/text-input";
import {
  type CalendarCreateDraft,
  getCreateDraftDisplayEnd,
  setCreateDraftAllDay,
  setCreateDraftEnd,
  setCreateDraftStart,
  setCreateDraftTitle,
} from "@cal/pages/calendar/calendar.create-session";
import { Flex } from "@cal/styles/components";
import { utcTimestampToLocalDisplayDate } from "@cal/utils/date";
import translate from "@cal/utils/translations";
import clsx from "clsx";
import type { FC } from "react";
import { useMemo } from "react";
import { useEventListener } from "usehooks-ts";
import { useConfig } from "../../context/config.context";
import { useCreateEvent } from "./create-event.mutation";
import { FlexTitle, PopoverCreateEventWrapper } from "./create-event.styles";

type Props = {
  draft: CalendarCreateDraft;
  onChange: (draft: CalendarCreateDraft) => void;
  refetchEvents: () => void;
  onConfirm: () => void;
  onCancel: () => void;
};

export const PopoverCreateEvent: FC<Props> = ({
  draft,
  onChange,
  refetchEvents,
  onConfirm,
  onCancel,
}) => {
  const { dateFormat, timeFormat } = useConfig();
  const { createEvent, isFetching } = useCreateEvent({
    refetchEvents,
    onSuccess: onConfirm,
  });

  const format = useMemo(
    () =>
      draft.allDay ? dateFormat.datepicker : `${dateFormat.datepicker} ${timeFormat.datepicker}`,
    [dateFormat.datepicker, draft.allDay, timeFormat.datepicker],
  );
  const displayEnd = useMemo(() => getCreateDraftDisplayEnd(draft), [draft]);

  useEventListener("keydown", (event) => {
    if (event.key === "Escape") {
      onCancel();
    }
  });

  return (
    <PopoverCreateEventWrapper>
      <FlexTitle>
        <TextInput
          autofocus
          value={draft.title}
          placeholder={translate("Event Title")}
          onChange={(value) => onChange(setCreateDraftTitle(draft, value))}
        />
        <LightSwitch
          enabled={draft.allDay}
          onClick={(value) => onChange(setCreateDraftAllDay(draft, value))}
        />
      </FlexTitle>

      <div>
        <DatePicker
          label={translate("Start Date")}
          value={draft.start}
          datePickerProps={{
            showIcon: true,
            icon: <Icon />,
            toggleCalendarOnIconClick: true,
            dateFormat: format,
            showTimeSelect: !draft.allDay,
            showMonthDropdown: true,
            showYearDropdown: true,
            dropdownMode: "select",
          }}
          onChange={(value) => {
            if (value !== null) {
              onChange(setCreateDraftStart(draft, value));
            }
          }}
        />
        <DatePicker
          label={translate("End Date")}
          value={displayEnd}
          datePickerProps={{
            showIcon: true,
            icon: <Icon />,
            toggleCalendarOnIconClick: true,
            minDate: utcTimestampToLocalDisplayDate(draft.start),
            dateFormat: format,
            showTimeSelect: !draft.allDay,
            showMonthDropdown: true,
            showYearDropdown: true,
            dropdownMode: "select",
            filterTime: (time) => {
              if (!draft.start) {
                return true;
              }

              const startDate = utcTimestampToLocalDisplayDate(draft.start);
              const selectedDate = new Date(time);

              return startDate.getTime() < selectedDate.getTime();
            },
          }}
          onChange={(value) => {
            if (value !== null) {
              onChange(setCreateDraftEnd(draft, value));
            }
          }}
        />
      </div>

      <hr />

      <Flex>
        <button
          type="button"
          className={clsx("btn small submit", isFetching && "disabled")}
          disabled={!draft.title || isFetching}
          onClick={() => createEvent(draft)}
        >
          {translate(isFetching ? "Creating Event..." : "Create Event")}
        </button>

        <button
          type="button"
          className={clsx("btn small", isFetching && "disabled")}
          disabled={isFetching}
          onClick={onCancel}
        >
          {translate("Cancel")}
        </button>
      </Flex>
    </PopoverCreateEventWrapper>
  );
};
