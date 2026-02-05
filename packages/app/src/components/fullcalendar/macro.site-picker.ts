import { useMemo, useState } from "react";
import type {
  GetCalendarApi,
  MacroCustomButtonInput,
  SiteMap,
} from "./macro.types";

type UseMacroSitePickerProps = {
  $calendar: JQuery<HTMLElement>;
  currentSiteId: string | null;
  siteMap: SiteMap;
  getApi: GetCalendarApi;
};

type UseMacroSitePickerResult = {
  hasSitePicker: boolean;
  sitePickerButton: MacroCustomButtonInput | undefined;
};

export const useMacroSitePicker = ({
  $calendar,
  currentSiteId,
  siteMap,
  getApi,
}: UseMacroSitePickerProps): UseMacroSitePickerResult => {
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(
    currentSiteId,
  );
  const siteEntries = useMemo(() => Object.entries(siteMap), [siteMap]);
  const hasSitePicker = siteEntries.length > 1;

  const sitePickerText = selectedSiteId
    ? (siteMap[selectedSiteId] ?? Craft.t("calendar", "Site Picker"))
    : Craft.t("calendar", "Site Picker");

  const sitePickerButton = useMemo<MacroCustomButtonInput | undefined>(() => {
    if (!hasSitePicker) {
      return undefined;
    }

    return {
      text: sitePickerText,
      icon: "site",
      click: (event: MouseEvent, element: HTMLElement) => {
        const siteButton = $(".fc-sitepicker-button");
        if (siteButton.data("initialized") === undefined) {
          const $menu = $("<div>", { class: "menu" }).insertAfter(element);
          const $siteUl = $("<ul>").appendTo($menu);

          for (const [siteId, siteName] of siteEntries) {
            $("<li>")
              .append(
                $("<a>", {
                  "data-site-id": siteId,
                  text: siteName,
                }),
              )
              .appendTo($siteUl);
          }

          new Garnish.MenuBtn(event.currentTarget as Element, {
            onOptionSelect: (target) => {
              const siteId = String($(target).data("site-id"));

              if (!siteId) {
                return;
              }

              $calendar.data("current-site-id", siteId);
              setSelectedSiteId(siteId);
              getApi()?.refetchEvents();
            },
          }).showMenu();

          siteButton.data("initialized", true);
        }
      },
    };
  }, [hasSitePicker, siteEntries, sitePickerText, $calendar, getApi]);

  return { hasSitePicker, sitePickerButton };
};
