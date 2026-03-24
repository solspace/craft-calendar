import { localDisplayDateToUtcTimestamp } from "@cal/utils/date";
import translate from "@cal/utils/translations";
import clsx, { type ClassValue } from "clsx";
import { startOfDay } from "date-fns";
import { type FC, forwardRef, useEffect, useRef, useState } from "react";
import DatePicker from "react-datepicker";
import { useCloseOnOutsideInteraction } from "./date-manager.hooks";
import {
  ActionButton,
  BadgeWrapper,
  CountBadge,
  DateItem,
  DateList,
  DatesPopover,
  DatesPopoverTitle,
  FixedDatesSection,
  FixedDatesToolbar,
  PickerButtonWrapper,
  SectionHeading,
} from "./date-manager.styles";
import type { PickerTriggerProps } from "./repeat-rules.types";

type FixedDateManagerProps = {
  title: string;
  actionLabel: string;
  actionClass?: ClassValue;
  popoverTitle: string;
  dates: number[];
  openToDate: Date;
  formatDate: (value: number) => string;
  filterDate: (date: Date) => boolean;
  onAdd: (value: number) => void;
  onRemove: (value: number) => void;
};

export const DateManager: FC<FixedDateManagerProps> = ({
  title,
  actionLabel,
  actionClass,
  popoverTitle,
  dates,
  openToDate,
  formatDate,
  filterDate,
  onAdd,
  onRemove,
}) => {
  const [isPopoverOpen, setIsPopoverOpen] = useState(false);
  const badgeRef = useRef(null);
  const popoverRef = useRef(null);

  useEffect(() => {
    if (dates.length === 0) {
      setIsPopoverOpen(false);
    }
  }, [dates.length]);

  useCloseOnOutsideInteraction(isPopoverOpen, [badgeRef, popoverRef], () =>
    setIsPopoverOpen(false),
  );

  return (
    <FixedDatesSection>
      <SectionHeading>{translate(title)}</SectionHeading>

      <FixedDatesToolbar>
        <BadgeWrapper>
          <CountBadge
            ref={badgeRef}
            type="button"
            disabled={dates.length === 0}
            className={clsx({ active: isPopoverOpen })}
            onClick={() => {
              if (dates.length === 0) {
                return;
              }

              setIsPopoverOpen((open) => !open);
            }}
          >
            {dates.length}
          </CountBadge>

          {isPopoverOpen && (
            <DatesPopover ref={popoverRef}>
              <DatesPopoverTitle>{translate(popoverTitle)}</DatesPopoverTitle>
              <DateList>
                {dates.map((value) => (
                  <DateItem key={value}>
                    <span>{formatDate(value)}</span>
                    <button type="button" onClick={() => onRemove(value)}>
                      ×
                    </button>
                  </DateItem>
                ))}
              </DateList>
            </DatesPopover>
          )}
        </BadgeWrapper>

        <PickerButtonWrapper>
          <DatePicker
            selected={null}
            onChange={(date: Date | null) => {
              if (!date) {
                return;
              }

              onAdd(localDisplayDateToUtcTimestamp(startOfDay(date)));
            }}
            customInput={<PickerTrigger label={actionLabel} className={clsx("btn", actionClass)} />}
            shouldCloseOnSelect
            showTimeSelect={false}
            showMonthDropdown
            showYearDropdown
            dropdownMode="select"
            todayButton={translate("Today")}
            openToDate={openToDate}
            filterDate={filterDate}
          />
        </PickerButtonWrapper>
      </FixedDatesToolbar>
    </FixedDatesSection>
  );
};

const PickerTrigger = forwardRef<HTMLButtonElement, PickerTriggerProps>(
  ({ label, ...props }, ref) => (
    <ActionButton type="button" ref={ref} {...props}>
      {translate(label)}
    </ActionButton>
  ),
);

PickerTrigger.displayName = "PickerTrigger";
