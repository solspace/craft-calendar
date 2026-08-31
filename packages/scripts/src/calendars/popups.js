let eventCreatorShown = false;
const $calendar = $('#solspace-calendar');
const popupInstances = new Set();

const closeEventCreatorModal = (backdrop, modal) => {
  if (!eventCreatorShown) {
    return;
  }

  $('#event-creator').removeClass('shown').insertAfter($('#solspace-calendar'));
  document.body.removeChild(backdrop);
  document.body.removeChild(modal);
  $('*[data-calendar-instance]').fullCalendar('unselect');
  eventCreatorShown = false;
};

/**
 * Tippy Modal window of "Event Create"
 *
 * @param start
 * @param end
 */
export const showEventCreator = (start, end) => {
  if (eventCreatorShown) {
    return;
  }

  eventCreatorShown = true;

  const backdrop = document.createElement('div');
  backdrop.className = 'sc-event-creator-backdrop';

  const modal = document.createElement('div');
  modal.className = 'sc-event-creator-modal';

  const titleBar = document.createElement('div');
  titleBar.className = 'sc-event-creator-modal__titlebar';
  titleBar.innerHTML =
    '<span>' +
    Craft.t('calendar', 'New Event') +
    '</span><button class="sc-event-creator-modal__close" aria-label="' +
    Craft.t('calendar', 'Close') +
    '">&times;</button>';
  modal.appendChild(titleBar);
  modal.appendChild(document.getElementById('event-creator'));

  document.body.appendChild(backdrop);
  document.body.appendChild(modal);

  backdrop.addEventListener('click', () => closeEventCreatorModal(backdrop, modal));
  modal
    .querySelector('.sc-event-creator-modal__close')
    .addEventListener('click', () => closeEventCreatorModal(backdrop, modal));

  const { currentSiteId: siteId } = $calendar.data();
  const $creator = $('#event-creator');
  const $startDate = $('input[name="startDate[date]"]', $creator);
  const $startTime = $('input[name="startDate[time]"]', $creator);
  const $endDate = $('input[name="endDate[date]"]', $creator);
  const $endTime = $('input[name="endDate[time]"]', $creator);

  $('ul.errors', $creator).empty();

  const startTime = start.utc().format('HHmmss');
  const endTime = end.utc().format('HHmmss');

  let isAllDay = false;
  if (startTime === endTime && endTime === '000000') {
    end.subtract(1, 'seconds');
    isAllDay = true;
  }

  const utcStart = createDateAsUTC(start.toDate());
  const utcEnd = createDateAsUTC(end.toDate());

  $creator.addClass('shown');
  $startDate.datepicker('setDate', utcStart);
  $endDate.datepicker('setDate', utcEnd);
  $startTime.timepicker('setTime', utcStart);
  $endTime.timepicker('setTime', utcEnd);

  const $allDayInput = $('input[name=allDay]');
  const lightswitch = $allDayInput.parents('.lightswitch:first');
  $('input', lightswitch).val(isAllDay ? 1 : '');
  if (isAllDay) {
    lightswitch.data('lightswitch').turnOn();
    $('.timewrapper', $creator).hide();
  } else {
    lightswitch.data('lightswitch').turnOff();
    $('.timewrapper', $creator).show();
  }

  const timeFormat = $startTime.timepicker('option', 'timeFormat');
  const momentTimeFormat = timeFormat
    .replace('h', 'hh')
    .replace('H', 'HH')
    .replace('G', 'H')
    .replace('g', 'h')
    .replace('A', 'a')
    .replace('i', 'mm');

  $('button.submit', $creator)
    .unbind('click')
    .click(function () {
      const self = $(this);
      const title = $('input[name=title]', $creator).val();
      const calendarId = $('select[name=calendarId]', $creator).val();
      const startDateValue = moment($startDate.datepicker('getDate'));
      const startTimeValue = moment($startTime.val().replace(/(a|p)\.(m)\./gi, '$1$2'), momentTimeFormat);
      const endDateValue = moment($endDate.datepicker('getDate'));
      const endTimeValue = moment($endTime.val().replace(/(a|p)\.(m)\./gi, '$1$2'), momentTimeFormat);

      self.prop('disabled', true).addClass('disabled');
      self.text(Craft.t('app', 'Saving...'));

      $.ajax({
        url: Craft.getCpUrl('calendar/events/api/create'),
        type: 'post',
        dataType: 'json',
        data: {
          siteId,
          startDate: startDateValue.format('YYYY-MM-DD') + ' ' + startTimeValue.format('HH:mm:ss'),
          endDate: endDateValue.format('YYYY-MM-DD') + ' ' + endTimeValue.format('HH:mm:ss'),
          allDay: $allDayInput.val(),
          event: { title, calendarId },
          [Craft.csrfTokenName]: Craft.csrfTokenValue,
        },
        success: (response) => {
          if (response.error) {
            $('ul.errors', $creator)
              .empty()
              .append($('<li />', { text: response.error }));
          } else if (response.event) {
            const newEvent = response.event;
            if (newEvent.allDay) {
              newEvent.end = moment(newEvent.end).add(2, 's').utc().format();
            }
            $('*[data-calendar-instance]').fullCalendar('renderEvent', newEvent);
            $('*[data-calendar-instance]').fullCalendar('unselect');
            closeEventCreatorModal(backdrop, modal);
          }
        },
        error: ({ responseJSON }) => {
          Craft.cp.displayNotification('error', responseJSON?.message ?? Craft.t('app', 'An error occurred.'));
        },
        complete: () => {
          self.prop('disabled', false).removeClass('disabled');
          self.text(Craft.t('app', 'Save'));
        },
      });
    });

  $('button.delete', $creator)
    .unbind('click')
    .click(() => closeEventCreatorModal(backdrop, modal));

  setTimeout(() => {
    $('input[name=title]:first', $creator)
      .val('')
      .focus()
      .unbind('keypress')
      .bind('keypress', function (event) {
        if ((event.which ? event.which : event.keyCode) === 13) {
          $('button.submit', $creator).trigger('click');
        }
      });
  }, 100);
};

/**
 * Attaches a Tippy popup on a given event
 *
 * @param event
 * @param element
 * @param calendarTimeFormat
 * @param isMultiSite
 */
export const buildEventPopup = (event, element, calendarTimeFormat, isMultiSite = false) => {
  if (!event.calendar) {
    return;
  }

  if (!window.calendarPopupsEnabled) {
    return;
  }

  if (element[0]._tippy) {
    element[0]._tippy.destroy();
  }

  const start = moment(event.start);
  const end = moment(event.end);

  let dateFormat = 'dddd, MMMM D, YYYY';
  if (event.allDay) {
    end.subtract(1, 'days');
  } else {
    dateFormat = dateFormat + ' [' + Craft.t('calendar', 'at') + '] ' + calendarTimeFormat;
  }

  const popup = document.createElement('div');
  popup.className = 'sc-event-popup';

  // Title bar
  const titleBar = document.createElement('div');
  titleBar.className = 'sc-event-popup__titlebar';
  titleBar.innerHTML =
    '<span class="sc-event-popup__title">' +
    event.title +
    '</span>' +
    '<button class="sc-event-popup__close" aria-label="Close">&times;</button>';
  popup.appendChild(titleBar);

  // Body
  const body = document.createElement('div');
  body.className = 'sc-event-popup__body';

  body.innerHTML +=
    '<div class="calendar-data"><span class="color-indicator" style="background-color: ' +
    event.backgroundColor +
    ';"></span> ' +
    event.calendar.name +
    '</div>';

  body.innerHTML +=
    '<div class="event-date-range separator">' +
    '<div style="white-space:nowrap"><label>' +
    Craft.t('calendar', 'Starts') +
    ':</label> ' +
    start.format(dateFormat) +
    '</div>' +
    '<div style="white-space:nowrap"><label>' +
    Craft.t('calendar', 'Ends') +
    ':</label> ' +
    end.format(dateFormat) +
    '</div>' +
    '</div>';

  if (event.repeats) {
    body.innerHTML += '<div class="event-repeats separator"><div class="spinner"></div></div>';
  }

  if (event.canEdit) {
    let buttonsHtml =
      '<div class="buttons">' +
      '<a class="btn small submit" href="' +
      Craft.getCpUrl('calendar/events/' + event.id + (isMultiSite ? '/' + event.site.handle : '')) +
      '">' +
      Craft.t('calendar', 'Edit') +
      '</a>' +
      '<a class="btn small delete-event" href="' +
      Craft.getCpUrl('calendar/events/api/delete') +
      '" data-id="' +
      event.id +
      '">' +
      Craft.t('calendar', 'Delete') +
      '</a>';

    if (event.repeats) {
      buttonsHtml +=
        '<a class="btn small delete-event-occurrence" href="' +
        Craft.getCpUrl('calendar/events/api/delete-occurrence') +
        '" data-id="' +
        event.id +
        '" data-date="' +
        event.start.toISOString() +
        '">' +
        Craft.t('calendar', 'Delete occurrence') +
        '</a>';
    }

    buttonsHtml += '</div>';
    body.innerHTML += buttonsHtml;
  }

  popup.appendChild(body);

  const instance = tippy(element[0], {
    arrow: true,
    content: popup,
    placement: 'auto',
    interactive: true,
    delay: [500, 300],
    theme: 'calendar-event',
    appendTo: document.body,
    onDestroy() {
      popupInstances.delete(instance);
    },
    onShow() {
      if (!window.calendarPopupsEnabled) {
        return false;
      }

      if (event.repeats) {
        $.ajax({
          cache: false,
          url: Craft.getCpUrl('calendar/events/api/first-occurrence-date'),
          type: 'post',
          dataType: 'json',
          data: {
            eventId: event.id,
            [Craft.csrfTokenName]: Craft.csrfTokenValue,
          },
          success: function (response) {
            if (response.success && response.event && response.event.hasOwnProperty('readableRepeatRule')) {
              const repeatsEl = popup.querySelector('.event-repeats');
              if (repeatsEl) {
                repeatsEl.innerHTML =
                  '<label>' + Craft.t('calendar', 'Repeats') + ':</label> ' + response.event.readableRepeatRule;
              }
            }
          },
        });
      }
    },
  });

  popupInstances.add(instance);

  popup.querySelector('.sc-event-popup__close').addEventListener('click', () => instance.hide());

  const deleteEventEl = popup.querySelector('.delete-event');
  if (deleteEventEl) {
    deleteEventEl.addEventListener('click', function (event) {
      event.preventDefault();

      if (confirm(Craft.t('calendar', 'Are you sure you want to delete this event?'))) {
        $.ajax({
          url: this.href,
          type: 'post',
          dataType: 'json',
          data: {
            eventId: this.dataset.id,
            [Craft.csrfTokenName]: Craft.csrfTokenValue,
          },
          success: function (response) {
            if (!response.error) {
              $('*[data-calendar-instance]').fullCalendar('removeEvents', event.id);

              instance.destroy();

              return;
            }

            console.warn(response.error);
          },
        });
      }
    });
  }

  const deleteOccurrenceEl = popup.querySelector('.delete-event-occurrence');
  if (deleteOccurrenceEl) {
    deleteOccurrenceEl.addEventListener('click', function (event) {
      event.preventDefault();

      if (confirm(Craft.t('calendar', 'Are you sure?'))) {
        $.ajax({
          url: this.href,
          type: 'post',
          dataType: 'json',
          data: {
            eventId: this.dataset.id,
            date: this.dataset.date,
            [Craft.csrfTokenName]: Craft.csrfTokenValue,
          },
          success: function (response) {
            if (!response.error) {
              $('*[data-calendar-instance]').fullCalendar('refetchEvents');

              instance.destroy();

              return;
            }

            console.warn(response.error);
          },
        });
      }
    });
  }
};

export const hideAllPopups = () => {
  popupInstances.forEach((instance) => instance.destroy());
  popupInstances.clear();
};

export const createDateAsUTC = (date) =>
  new Date(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );
