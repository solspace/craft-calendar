import * as Methods from '@cal/scripts/calendars/fullcalendar-methods';
import { showEventCreator } from './popups';

window.qTipsEnabled = true;
const selectedCalendarsStorageKey = 'calendar-selectedCalendars';
const $calendar = $('#solspace-calendar');
const $miniCal = $('#calendar-mini-cal');

$(() => {
  'use strict';

  const { currentDay, siteMap, overlapThreshold, language, firstDayOfWeek, timeFormat } = $calendar.data();
  let { currentSiteId, canEditEvents, canQuickCreate, isMultiSite } = $calendar.data();

  canEditEvents = canEditEvents !== undefined;
  canQuickCreate = canQuickCreate !== undefined;
  isMultiSite = isMultiSite !== undefined;

  const viewSpecificOptions = {
    week: {
      titleFormat: 'MMMM D, YYYY',
      columnFormat: 'ddd D',
      timeFormat,
      slotLabelFormat: timeFormat,
    },
    day: {
      titleFormat: 'dddd, MMMM D, YYYY',
      columnFormat: '',
      timeFormat,
      slotLabelFormat: timeFormat,
    },
  };

  let customButtons = {
    datepicker: {
      text: Craft.t('calendar', 'Pick a Date'),
      icon: 'calendar',
      click: function () {
        const button = $('.fc-datepicker-button:first');
        const { top, left } = button.offset();
        const height = button.outerHeight();

        button.datepicker(
          'dialog',
          $calendar.fullCalendar('getDate').format('YYYY-MM-DD'),
          function (input) {
            const viewType = $calendar.fullCalendar('getView').type;
            // eslint-disable-next-line no-unused-vars
            const [_, year, month, date] = /^(\d{4})-(\d{2})-(\d{2})$/.exec(input);

            let view = 'month';
            switch (viewType) {
              case 'agendaDay':
                view = 'day';
                break;

              case 'agendaWeek':
                view = 'week';
                break;
            }

            const url = Craft.getCpUrl('calendar/view/' + view + '/' + year + '/' + month + '/' + date);
            history.pushState('data', '', url);
            $calendar.fullCalendar('gotoDate', input);
          },
          { dateFormat: 'yy-mm-dd' },
          [left, top + height]
        );

        $('#ui-datepicker-div.ui-datepicker-dialog + input[id^=dp]').css({ visibility: 'hidden' });
      },
    },
    refresh: {
      text: Craft.t('calendar', 'Refresh'),
      click: function () {
        $calendar.fullCalendar('refetchEvents');
      },
    },
    Today: {
      text: Craft.t('calendar', 'Today'),
      click: () => {
        $calendar.fullCalendar('today');
      },
    },
  };

  if (isMultiSite) {
    customButtons['siteButton'] = {
      text: siteMap[currentSiteId],
      click: function (event) {
        const siteButton = $('.fc-siteButton-button', $calendar);

        if (siteButton.data('initialized') === undefined) {
          const $menu = $('<div>', { class: 'menu' }).insertAfter(event.currentTarget);
          const $siteUl = $('<ul>').appendTo($menu);

          for (let key in siteMap) {
            if (!siteMap.hasOwnProperty(key)) {
              continue;
            }

            $('<li>')
              .append(
                $('<a>', {
                  'data-site-id': key,
                  text: siteMap[key],
                })
              )
              .appendTo($siteUl);
          }

          new Garnish.MenuBtn(event.currentTarget, {
            onOptionSelect: function (target) {
              const siteId = $(target).data('site-id');

              $calendar.data('current-site-id', siteId);

              siteButton.text(siteMap[siteId]);
              $calendar.fullCalendar('refetchEvents');
            },
          }).showMenu();

          siteButton.data('initialized', true);
        }
      },
    };
  }

  $calendar.fullCalendar({
    now: new moment(),
    defaultDate: currentDay,
    defaultView: $calendar.data('view'),
    nextDayThreshold: '0' + overlapThreshold + ':00:01',
    fixedWeekCount: true,
    eventLimit: 5,
    aspectRatio: 1.3,
    editable: canEditEvents,
    lang: language,
    views: viewSpecificOptions,
    firstDay: firstDayOfWeek,
    viewRender: Methods.renderView,
    events: Methods.getEvents,
    eventRender: Methods.renderEvent,
    dayRender: Methods.renderDay,
    eventDragStart: Methods.closeAllQTips,
    eventDragStop: Methods.enableQTips,
    eventDrop: Methods.eventDateChange,
    eventResizeStart: Methods.closeAllQTips,
    eventResizeStop: Methods.enableQTips,
    eventResize: Methods.eventDurationChange,
    selectable: canQuickCreate && canEditEvents,
    selectHelper: canQuickCreate && canEditEvents,
    select: showEventCreator,
    unselectAuto: false,
    customButtons,
    timeFormat: timeFormat.replace('h:mm a', 'h(:mm)t'),
    header: {
      right: 'siteButton refresh datepicker prev,Today,next',
      left: 'title',
    },
  });

  if ($calendar.fullCalendar('getView').name !== 'month') {
    $calendar.fullCalendar('option', 'height', 'auto');
  }

  $('.fc-next-button, .fc-prev-button, .fc-today-button', $calendar).on({
    click: function () {
      const viewType = $calendar.fullCalendar('getView').type;
      const date = $calendar.fullCalendar('getDate');

      const year = date.format('YYYY');
      const month = date.format('MM');
      const day = date.format('DD');

      let view = 'month';
      switch (viewType) {
        case 'agendaDay':
          view = 'day';
          break;

        case 'agendaWeek':
          view = 'week';
          break;
      }

      const url = Craft.getCpUrl('calendar/view/' + view + '/' + year + '/' + month + '/' + day);

      history.pushState('data', '', url);
    },
  });

  $('.alert-dismissible a.close').on({
    click: function () {
      const $alert = $(this).parents('.alert:first');
      Craft.postActionRequest('calendar/view/dismiss-demo-alert', {}, function () {
        $alert.remove();
      });
    },
  });

  $('.calendar-list input').on({
    change: function () {
      const storageData = {};

      $('ul.calendar-list input')
        .map(function () {
          storageData[$(this).val()] = $(this).is(':checked');
        })
        .get()
        .join();

      localStorage.setItem(selectedCalendarsStorageKey, JSON.stringify(storageData));

      const usedCalendarIds = [];
      for (let key in storageData) {
        if (!storageData.hasOwnProperty(key)) {
          continue;
        }

        if (storageData[key]) {
          usedCalendarIds.push(key);
        }
      }

      $miniCal.data('calendars', usedCalendarIds.join(','));
      $miniCal.fullCalendar('refetchEvents');

      $calendar.fullCalendar('refetchEvents');
    },
  });

  const $eventCreator = $('#event-creator');
  const $allDay = $('.lightswitch', $eventCreator);
  $allDay.on({
    change: function () {
      const $timeWrapper = $('.timewrapper', $eventCreator);

      if ($('input', this).val()) {
        $timeWrapper.fadeOut('fast');
      } else {
        $timeWrapper.fadeIn('fast');
      }
    },
  });
});

const selectedCalendars = localStorage.getItem(selectedCalendarsStorageKey);
if (selectedCalendars !== null) {
  const usedCalendarIds = [];
  const allCalendarIds = $('ul.calendar-list input')
    .map(function () {
      return parseInt($(this).val());
    })
    .get();

  let calendarMap = {};
  if (selectedCalendars.substring(0, 1) === '{') {
    calendarMap = JSON.parse(selectedCalendars);
  }

  for (let index = 0; index < allCalendarIds.length; index++) {
    const calendarId = allCalendarIds[index];

    if (calendarMap[calendarId] === undefined) {
      calendarMap[calendarId] = true;
      usedCalendarIds.push(calendarId);
    } else if (calendarMap[calendarId] === true) {
      usedCalendarIds.push(calendarId);
    }
  }

  $miniCal.data('calendars', usedCalendarIds.join(','));

  if ($miniCal.hasClass('fc')) {
    $miniCal.fullCalendar('refetchEvents');
  }

  $('.calendar-list input').each(function () {
    const calendarId = $(this).val();
    const isSelected = calendarMap[calendarId] === undefined || calendarMap[calendarId] === true;
    $(this).prop('checked', isSelected);
  });
}
