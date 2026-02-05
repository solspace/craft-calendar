import type { MacroCustomButtonInput } from "./macro.types";

type CreateMacroCustomButtonsProps = {
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  onRefresh: () => void;
  datePickerButton: MacroCustomButtonInput;
  sitePickerButton?: MacroCustomButtonInput;
};

export const getMacroHeaderToolbarEnd = (hasSitePicker: boolean): string =>
  hasSitePicker
    ? "sitepicker refresh datepicker prev,today,next"
    : "refresh datepicker prev,today,next";

export const createMacroCustomButtons = ({
  onPrev,
  onNext,
  onToday,
  onRefresh,
  datePickerButton,
  sitePickerButton,
}: CreateMacroCustomButtonsProps): Record<string, MacroCustomButtonInput> => {
  return {
    prev: {
      text: Craft.t("calendar", "Previous"),
      icon: "chevron-left",
      click: onPrev,
    },
    next: {
      text: Craft.t("calendar", "Next"),
      icon: "chevron-right",
      click: onNext,
    },
    today: {
      text: Craft.t("calendar", "Today"),
      click: () => {
        onToday();
      },
    },
    ...(sitePickerButton ? { sitepicker: sitePickerButton } : {}),
    refresh: {
      text: Craft.t("calendar", "Refresh"),
      icon: "refresh",
      click: () => {
        onRefresh();
      },
    },
    datepicker: datePickerButton,
  };
};
