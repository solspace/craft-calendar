import { buildEventPopup } from './popups';

const $solspaceCalendar = $('#solspace-calendar');
let $solspaceCalendarSpinner = null;

/**
 * Attaches additional classes to DOM objects
 * based on event parameters
 *
 * @param event
 * @param element
 */
export const renderEvent = (event, element) => {
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

  const { timeFormat, isMultiSite } = $solspaceCalendar.data();

  buildEventPopup(event, element, timeFormat, isMultiSite !== undefined);
};

export const today = new moment();

/**
 * Attaches links to day numbers
 *
 * @param date
 * @param cell
 */
export const renderDay = (date, cell) => {
  const dayNumberElement = cell
    .parents('.fc-bg:first')
    .siblings('.fc-content-skeleton')
    .find('thead > tr > td:eq(' + cell.index() + ')');

  const link = getDayViewLink(date);
  const anchor = $('<a />').attr('href', link).html(dayNumberElement.html());

  dayNumberElement.html(anchor);
};

/**
 *
 * @param view
 * @param element
 */
export const renderView = (view, element) => {
  const calendar = element.parents('#solspace-calendar');
  const currentDate = new moment(calendar.data('current-day'));

  if (view.name === 'agendaWeek') {
    const $weekRows = $('.fc-day-header.fc-widget-header', element);

    $weekRows.each(function () {
      let content = $(this).html();
      const dateParts = content.split(' ');

      content = dateParts[0] + ' <span>' + dateParts[1] + '</span>';

      const date = new moment($(this).data('date'));
      const link = getDayViewLink(date);

      const $anchor = $('<a />').attr('href', link).html(content);

      if (currentDate.format('YYYYMMDD') === date.format('YYYYMMDD')) {
        $anchor.addClass('fc-title-today');
      }

      $(this).html($anchor);
    });
  }

  $('.fc-localeButton-button', $solspaceCalendar).addClass('menubtn btn');

  if (view.name === 'agendaDay') {
    $('thead.fc-head', element).remove();
  }
};

/**
 * Stores the event when it's repositioned
 *
 * @param modification
 * @param event
 * @param delta
 * @param revertFunc
 */
export const eventRepositioned = (modification, event, delta, revertFunc) => {
  $.ajax({
    url: Craft.getCpUrl('calendar/events/api/modify-' + modification),
    type: 'post',
    dataType: 'json',
    data: {
      eventId: event.id,
      siteId: event.site.id,
      isAllDay: event.allDay,
      startDate: event.start.toISOString(),
      endDate: event.end ? event.end.toISOString() : null,
      deltaSeconds: delta.as('seconds'),
      [Craft.csrfTokenName]: Craft.csrfTokenValue,
    },
    success: function (response) {
      if (response.error) {
        revertFunc();
      } else {
        if (event.repeats) {
          $calendar.fullCalendar('refetchEvents');
        }
      }
    },
    error: function () {
      revertFunc();
    },
  });
};

/**
 * Changes the event date
 *
 * @param event
 * @param delta
 * @param revertFunc
 */
export const eventDateChange = (event, delta, revertFunc) => {
  eventRepositioned('date', event, delta, revertFunc);
};

/**
 * Changes the event duration
 *
 * @param event
 * @param delta
 * @param revertFunc
 */
export const eventDurationChange = (event, delta, revertFunc) => {
  eventRepositioned('duration', event, delta, revertFunc);
};

/**
 * Opens the event edit page
 *
 * @param event
 */
export const eventClick = (event) => {
  window.location.href = Craft.getCpUrl('calendar/events/' + event.id + '/' + event.site.handle);
};

/**
 * Creates a link pointing to a certain date day view
 *
 * @param date - moment instance
 *
 * @returns string
 */
export const getDayViewLink = (date) => {
  if (date.isValid()) {
    const year = date.format('YYYY');
    const month = date.format('MM');
    const day = date.format('DD');

    return Craft.getCpUrl('calendar/view/day/' + year + '/' + month + '/' + day);
  }

  return '';
};

/**
 * AJAX POST to get a list of events for a given timeframe
 *
 * @param start
 * @param end
 * @param timezone
 * @param callback
 */
export const getEvents = (start, end, timezone, callback) => {
  getSpinner().fadeIn('fast');

  const $calendarList = $('ul.calendar-list');

  let calendarIds = '*';
  if ($calendarList.length) {
    calendarIds = $('input:checked', $calendarList)
      .map(function () {
        return $(this).val();
      })
      .get()
      .join();
  }

  const { currentSiteId } = $('#solspace-calendar').data();

  $.ajax({
    url: Craft.getCpUrl('calendar/month'),
    data: {
      rangeStart: start.toISOString(),
      rangeEnd: end.toISOString(),
      calendars: calendarIds,
      siteId: currentSiteId,
      [Craft.csrfTokenName]: Craft.csrfTokenValue,
    },
    type: 'post',
    dataType: 'json',
    success: function (eventList) {
      // All day events have to actually go into the next day
      // So we pad them with 2 seconds to go from 23:59:59 same day
      // Into 00:00:01 the next day
      for (let i = 0; i < eventList.length; i++) {
        const event = eventList[i];
        if (event.allDay) {
          eventList[i].end = moment(event.end).add(2, 's').utc().format();
        }
      }

      callback(eventList);
      getSpinner().fadeOut('fast');
    },
  });
};

/**
 * Closes all open qtips
 */
export const closeAllQTips = () => {
  window.qTipsEnabled = false;
  $('div.qtip:visible').qtip('hide');
};

export const enableQTips = () => {
  window.qTipsEnabled = true;
};

export const getSpinner = () => {
  if (!$solspaceCalendarSpinner) {
    $solspaceCalendar
      .find('.fc-right')
      .prepend('<div id="solspace-calendar-spinner" class="spinner" style="display: none;"></div>');
    $solspaceCalendarSpinner = $('#solspace-calendar-spinner');
  }

  return $solspaceCalendarSpinner;
};
