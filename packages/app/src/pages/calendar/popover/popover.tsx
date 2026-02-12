import type { FC } from "react";
import { useCallback } from "react";
import { Popover } from "react-tiny-popover";
import { usePopover } from "./popover.context";
import { getPopupRows } from "./popover.rows";
import {
  Actions,
  Label,
  LineItem,
  LineItemList,
  PopoverAnchor,
  PopoverTarget,
  PopoverWrapper,
  Title,
  Value,
} from "./popover.styles";

export const EventPopover: FC = () => {
  const { event, anchorRect, isOpen, onPopoverMouseEnter, onPopoverMouseLeave, setPopoverElement } =
    usePopover();

  const setPopoverRef = useCallback(
    (element: HTMLDivElement | null) => {
      setPopoverElement(element);
    },
    [setPopoverElement],
  );

  if (!event || !anchorRect || !isOpen) {
    return null;
  }

  const isRepeating = Boolean(event.extendedProps.repeats ?? event.extendedProps.rrule);

  return (
    <PopoverAnchor
      style={{
        top: anchorRect.top,
        left: anchorRect.left,
        width: anchorRect.width,
        height: anchorRect.height,
      }}
    >
      <Popover
        isOpen
        positions={["right", "left"]}
        align="center"
        padding={12}
        containerStyle={{ zIndex: "10000" }}
        content={
          <PopoverWrapper
            ref={setPopoverRef}
            onPointerEnter={onPopoverMouseEnter}
            onPointerLeave={onPopoverMouseLeave}
          >
            <Title>{event.title}</Title>

            <LineItemList>
              {getPopupRows(event).map(([label, value]) => (
                <LineItem key={label}>
                  <Label>{label}:</Label>
                  <Value>{value}</Value>
                </LineItem>
              ))}
            </LineItemList>

            <Actions>
              <button type="button" className="btn small">
                {Craft.t("calendar", "Delete")}
              </button>

              {isRepeating && (
                <button type="button" className="btn small">
                  {Craft.t("calendar", "Delete occurrence")}
                </button>
              )}
            </Actions>
          </PopoverWrapper>
        }
      >
        <PopoverTarget />
      </Popover>
    </PopoverAnchor>
  );
};
