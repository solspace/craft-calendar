import type { CalendarApi } from "@fullcalendar/core/index.js";
import { useMemo, useState } from "react";
import { clearCalendarEventsCache } from "./calendar.events";
import type { CustomButtonInput } from "./calendar.types";
import { useConfig } from "./context/config.context";

type UseSitePickerResult = {
  hasSitePicker: boolean;
  sitePickerButton: CustomButtonInput | undefined;
};

export const useSitePicker = (api: CalendarApi): UseSitePickerResult => {
  const { currentSiteId, setCurrentSiteId, siteMap } = useConfig();
  const [selectedSiteId, setSelectedSiteId] = useState<number>(currentSiteId);
  const siteEntries = useMemo(() => Object.entries(siteMap ?? {}), [siteMap]);
  const hasSitePicker = siteEntries.length > 1;

  const hasSite = selectedSiteId && !!siteMap?.[selectedSiteId];
  const sitePickerText = hasSite ? siteMap![selectedSiteId] : Craft.t("calendar", "Site Picker");

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
              const siteId = Number($(target).data("site-id"));

              if (!siteId) {
                return;
              }

              setCurrentSiteId(siteId);
              setSelectedSiteId(siteId);
              clearCalendarEventsCache();
              api.refetchEvents();
            },
          }).showMenu();

          siteButton.data("initialized", true);
        }
      },
    };
  }, [hasSitePicker, siteEntries, sitePickerText, setCurrentSiteId, api]);

  return { hasSitePicker, sitePickerButton };
};
