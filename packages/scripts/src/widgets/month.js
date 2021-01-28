import { eventClick } from '@cal/scripts/calendars/fullcalendar-methods';

const miniCalList = document.querySelectorAll('*[data-mini-cal]');
miniCalList.forEach((miniCal) => {
  miniCal = $(miniCal);
  const { overlapThreshold = 5, firstDayOfWeek = 0, locale = 'en', currentDay = new moment() } = miniCal.data();

  miniCal.fullCalendar({
    now: new moment(),
    defaultDate: currentDay,
    defaultView: 'month',
    nextDayThreshold: '0' + overlapThreshold + ':00:01',
    fixedWeekCount: false,
    eventLimit: 1,
    firstDay: firstDayOfWeek,
    lang: locale,
    height: 'auto',
    columnFormat: 'dd',
    viewRender: updateDayNumberDimensions,
    windowResize: updateDayNumberDimensions,
    eventClick,
    dayClick: function (date) {
      window.location.href = Craft.getCpUrl('calendar/view/day/' + date.format('YYYY/MM/DD'));
    },
    events: function (start, end) {
      $.ajax({
        url: Craft.getCpUrl('calendar/month'),
        data: {
          rangeStart: start.toISOString(),
          rangeEnd: end.toISOString(),
          nonEditable: true,
          calendars: miniCal.data('calendars'),
          siteId: miniCal.data('siteId'),
          [Craft.csrfTokenName]: Craft.csrfTokenValue,
        },
        type: 'post',
        dataType: 'json',
        success: function (eventList) {
          $('.fc-content-skeleton .fc-day-top.fc-has-event').removeClass('fc-has-event');

          for (let i = 0; i < eventList.length; i++) {
            const event = eventList[i];
            const start = moment(event.start).utc();
            const end = moment(event.end).utc();

            while (start.isBefore(end)) {
              $('.fc-content-skeleton .fc-day-top[data-date=' + start.utc().format('YYYY-MM-DD') + ']').addClass(
                'fc-has-event'
              );

              start.add(1, 'days');
            }
          }
        },
      });
    },
    header: {
      left: 'prev',
      center: 'title',
      right: 'next',
    },
  });
});

const updateDayNumberDimensions = (view, element) => {
  const $skeleton = $('.fc-content-skeleton', element);

  $('.fc-day-number', element).css({
    textAlign: 'center',
    padding: 0,
    minHeight: $skeleton.height() + 'px',
    lineHeight: $skeleton.height() + 'px',
  });
};
