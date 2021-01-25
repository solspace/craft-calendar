import { eventClick } from '@cal/scripts/calendars/fullcalendar-methods';

const viewSpecificOptions = {
  week: {
    columnFormat: 'ddd D',
    timeFormat: 'LT',
    slotLabelFormat: 'LT',
  },
  day: {
    columnFormat: '',
    timeFormat: 'LT',
    slotLabelFormat: 'LT',
  },
};

const agendaElements = document.querySelectorAll('*[data-calendar-agenda]');
agendaElements.forEach((agenda) => {
  agenda = $(agenda);

  const { overlapThreshold, locale, firstDayOfWeek, currentDay, siteId, calendars, view } = agenda.data();

  agenda.fullCalendar({
    now: currentDay,
    defaultDate: currentDay,
    defaultView: view,
    nextDayThreshold: '0' + overlapThreshold + ':00:01',
    fixedWeekCount: false,
    eventLimit: 3,
    lang: locale,
    views: viewSpecificOptions,
    firstDay: firstDayOfWeek,
    height: 500,
    scrollTime: moment().format('HH:mm:ss'),
    eventClick,
    eventRender: function (event, element) {
      if (event.allDay) {
        element.addClass('fc-event-all-day');
      }

      if (!event.end) {
        return;
      }

      if (!event.multiDay && !event.allDay) {
        element.addClass('fc-event-single-day');
        const colorIcon = $('<span />')
          .addClass('fc-color-icon')
          .css('background-color', event.backgroundColor)
          .css('border-color', event.borderColor);
        $('.fc-content', element).prepend(colorIcon);
      } else {
        element.addClass('fc-event-multi-day');
      }

      if (!event.enabled) {
        element.addClass('fc-event-disabled');
      }

      element.addClass('fc-color-' + event.textColor);
    },
    events: function (start, end, timezone, callback) {
      $.ajax({
        url: Craft.getCpUrl('calendar/month'),
        data: {
          rangeStart: start.toISOString(),
          rangeEnd: end.toISOString(),
          nonEditable: true,
          calendars,
          siteId,
          [Craft.csrfTokenName]: Craft.csrfTokenValue,
        },
        type: 'post',
        dataType: 'json',
        success: (eventList) => {
          for (const [i, event] of eventList.entries()) {
            if (event.allDay) {
              eventList[i].end = moment(event.end).add(2, 's').utc().format();
            }

            eventList[i].editable = false;
          }

          callback(eventList);
        },
      });
    },
    customButtons: {
      refresh: {
        text: Craft.t('calendar', 'Refresh'),
        click: function () {
          agenda.fullCalendar('refetchEvents');
        },
      },
    },
    header: {
      right: 'prev,today,next',
      left: 'title',
    },
  });
});
