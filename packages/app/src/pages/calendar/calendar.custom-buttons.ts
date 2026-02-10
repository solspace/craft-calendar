import type { CustomButtonInput } from "./calendar.types";

type CreateCustomButtonsProps = {
  onPrev: () => void;
  onNext: () => void;
  onToday: () => void;
  onRefresh: () => void;
  datePickerButton: CustomButtonInput;
  sitePickerButton?: CustomButtonInput;
};

export const getMacroHeaderToolbarEnd = (hasSitePicker: boolean): string =>
  hasSitePicker
    ? "sitepicker refresh datepicker prev,today,next"
    : "refresh datepicker prev,today,next";

export const createCustomButtons = ({
  onPrev,
  onNext,
  onToday,
  onRefresh,
  datePickerButton,
  sitePickerButton,
}: CreateCustomButtonsProps): Record<string, CustomButtonInput> => {
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
      click: onToday,
    },
    refresh: {
      text: Craft.t("calendar", "Refresh"),
      icon: "refresh",
      click: onRefresh,
    },
    datepicker: datePickerButton,
    ...(sitePickerButton ? { sitepicker: sitePickerButton } : {}),
  };
};
