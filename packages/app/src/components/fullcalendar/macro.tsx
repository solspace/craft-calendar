import dayGrid from "@fullcalendar/daygrid";
import interaction from "@fullcalendar/interaction";
import list from "@fullcalendar/list";
import FullCalendar from "@fullcalendar/react";
import timeGrid from "@fullcalendar/timegrid";
import axios from "axios";
import { type FC, useRef } from "react";
import { MacroWrapper } from "./macro.styles";

export const FullCalendarMacro: FC = () => {
  const $calendar = $("#calendar-app");
  const { currentDay, siteMap, overlapThreshold, language, firstDayOfWeek, timeFormat } =
    $calendar.data();

  const calendar = useRef<FullCalendar>(null);
  const api = calendar.current?.getApi();

  return (
    <MacroWrapper>
      <FullCalendar
        ref={calendar}
        themeSystem="bootstrap5"
        plugins={[dayGrid, timeGrid, list, interaction]}
        headerToolbar={{
          start: "title",
          center: "dayGridMonth,timeGridWeek,timeGridDay",
          end: "sitepicker refresh datepicker prev,today,next",
        }}
        customButtons={{
          today: {
            text: Craft.t("calendar", "Today"),
            click: () => {
              api?.today();
            },
          },
          sitepicker: {
            text: Craft.t("calendar", "Site Picker"),
            icon: "site",
            click: (event: MouseEvent) => {
              const siteButton = $(".fc-siteButton-button", calendar.current);

              if (siteButton.data("initialized") === undefined) {
                const $menu = $("<div>", { class: "menu" }).insertAfter(
                  event.currentTarget as HTMLElement,
                );
                const $siteUl = $("<ul>").appendTo($menu);

                for (const key in siteMap) {
                  if (!Object.hasOwn(siteMap, key)) {
                    continue;
                  }

                  $("<li>")
                    .append(
                      $("<a>", {
                        "data-site-id": key,
                        text: siteMap[key],
                      }),
                    )
                    .appendTo($siteUl);
                }

                new Garnish.MenuBtn(event.currentTarget, {
                  onOptionSelect: (target) => {
                    const siteId = $(target).data("site-id");

                    $calendar.data("current-site-id", siteId);

                    siteButton.text(siteMap[siteId]);
                    $calendar.fullCalendar("refetchEvents");
                  },
                }).showMenu();

                siteButton.data("initialized", true);
              }
            },
          },
          refresh: {
            text: Craft.t("calendar", "Refresh"),
            icon: "arrow-clockwise",
            click: () => {
              api?.refetchEvents();
            },
          },
          datepicker: {
            text: Craft.t("calendar", "Pick a Date"),
            icon: "calendar",
            click: () => {
              const button = $(".fc-datepicker-button:first");
              const { top, left } = button.offset();
              const height = button.outerHeight();

              button.datepicker(
                "dialog",
                api.getDate().toISOString().slice(0, 10),
                (input: string) => {
                  const viewType = api.view.type;
                  // eslint-disable-next-line no-unused-vars
                  const [_, year, month, date] = /^(\d{4})-(\d{2})-(\d{2})$/.exec(input);

                  let view = "month";
                  switch (viewType) {
                    case "agendaDay":
                      view = "day";
                      break;

                    case "agendaWeek":
                      view = "week";
                      break;
                  }

                  const url = Craft.getCpUrl(`calendar/view/${view}/${year}/${month}/${date}`);
                  history.pushState("data", "", url);
                  api.gotoDate(input);
                },
                { dateFormat: "yy-mm-dd" },
                [left, top + height],
              );

              $("#ui-datepicker-div.ui-datepicker-dialog + input[id^=dp]").css({
                visibility: "hidden",
              });
            },
          },
        }}
        initialView="dayGridMonth"
        eventClick={console.log}
        dateClick={console.log}
        events={(info, success, failure) => {
          axios
            .get<Event[]>("/api/events", {
              params: {
                start: info.start,
                end: info.end,
              },
            })
            .then((res) => {
              success(res.data);
            })
            .catch(failure);
        }}
      />
    </MacroWrapper>
  );
};
