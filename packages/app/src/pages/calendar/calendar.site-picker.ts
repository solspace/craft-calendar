import type { CalendarApi } from "@fullcalendar/core/index.js";
import { useEffect, useMemo, useState } from "react";
import { clearCalendarEventsCache } from "./calendar.events";
import type { CustomButtonInput } from "./calendar.types";
import { useConfig } from "./context/config.context";

const SITE_PICKER_BUTTON_SELECTOR = ".fc-sitepicker-button";
const CRAFT_SITE_ICON_CLASS = "calendar-sitepicker-craft-icon";

type MenuButton = {
  showMenu: () => void;
};

const updateSiteUrlParam = (siteHandle?: string): void => {
  if (!siteHandle) {
    return;
  }

  const url = new URL(window.location.href);
  url.searchParams.set("site", siteHandle);
  history.pushState("data", "", url.toString());
};

const decorateSitePickerButtonIcon = (): void => {
  const icon = document.querySelector<HTMLElement>(`${SITE_PICKER_BUTTON_SELECTOR} .fc-icon-site`);
  if (!icon) {
    return;
  }

  icon.classList.remove("fc-icon", "fc-icon-site");
  icon.classList.add(CRAFT_SITE_ICON_CLASS);
  icon.setAttribute("data-icon", "world");
  icon.setAttribute("aria-hidden", "true");
};

type UseSitePickerResult = {
  hasSitePicker: boolean;
  sitePickerButton: CustomButtonInput | undefined;
};

export const useSitePicker = (api: CalendarApi): UseSitePickerResult => {
  const { currentSiteId, setCurrentSiteId, siteMap, siteHandleMap } = useConfig();
  const [selectedSiteId, setSelectedSiteId] = useState<number>(currentSiteId);
  const siteEntries = useMemo(() => Object.entries(siteMap ?? {}), [siteMap]);
  const hasSitePicker = siteEntries.length > 1;

  const hasSite = selectedSiteId && !!siteMap?.[selectedSiteId];
  const sitePickerText = hasSite ? siteMap![selectedSiteId] : Craft.t("calendar", "Site Picker");

  useEffect(() => {
    if (!hasSitePicker) {
      return undefined;
    }

    decorateSitePickerButtonIcon();

    const root = document.querySelector("#calendar-app") ?? document.body;
    const observer = new MutationObserver(decorateSitePickerButtonIcon);
    observer.observe(root, { childList: true, subtree: true });

    return () => observer.disconnect();
  }, [hasSitePicker]);

  const sitePickerButton = useMemo<CustomButtonInput | undefined>(() => {
    if (!hasSitePicker) {
      return undefined;
    }

    return {
      text: sitePickerText,
      icon: "site",
      click: (event: MouseEvent) => {
        event.preventDefault();

        const siteButton = $(event.currentTarget as HTMLElement);
        if (siteButton.data("menubtn")) {
          return;
        }

        const $menu = $("<div>", { class: "menu" }).insertAfter(siteButton);
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

        const menuButton: MenuButton = new Garnish.MenuBtn(siteButton[0], {
          onOptionSelect: (target) => {
            const siteId = Number($(target).data("site-id"));

            if (!siteId) {
              return;
            }

            setCurrentSiteId(siteId);
            setSelectedSiteId(siteId);
            updateSiteUrlParam(siteHandleMap?.[siteId]);
            clearCalendarEventsCache();
            api.refetchEvents();
          },
        });

        menuButton.showMenu();
      },
    };
  }, [hasSitePicker, siteEntries, sitePickerText, setCurrentSiteId, siteHandleMap, api]);

  return { hasSitePicker, sitePickerButton };
};
