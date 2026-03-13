import type { CalendarApi } from "@fullcalendar/core/index.js";
import { useMemo, useState } from "react";
import { clearCalendarEventsCache } from "./calendar.events";
import type { CustomButtonInput, SiteMap } from "./calendar.types";

type UseSitePickerProps = {
  $calendar: JQuery<HTMLElement>;
  currentSiteId: string | null;
  siteMap: SiteMap;
  api: CalendarApi;
};

type UseSitePickerResult = {
  hasSitePicker: boolean;
  sitePickerButton: CustomButtonInput | undefined;
};

export const useSitePicker = ({
  $calendar,
  currentSiteId,
  siteMap,
  api,
}: UseSitePickerProps): UseSitePickerResult => {
  const [selectedSiteId, setSelectedSiteId] = useState<string | null>(currentSiteId);
  const siteEntries = useMemo(() => Object.entries(siteMap), [siteMap]);
  const hasSitePicker = siteEntries.length > 1;

  const hasSite = selectedSiteId && !!siteMap[selectedSiteId];
  const sitePickerText = hasSite ? siteMap[selectedSiteId] : Craft.t("calendar", "Site Picker");

  const sitePickerButton = useMemo<CustomButtonInput | undefined>(() => {
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
              clearCalendarEventsCache();
              api.refetchEvents();
            },
          }).showMenu();

          siteButton.data("initialized", true);
        }
      },
    };
  }, [hasSitePicker, siteEntries, sitePickerText, $calendar, api]);

  return { hasSitePicker, sitePickerButton };
};
