let eventCreatorShown = false;
const $calendar = $('#solspace-calendar');

/**
 * qTip2 Modal window of "Event Create"
 *
 * @param start
 * @param end
 */
export const showEventCreator = (start, end) => {
  if (eventCreatorShown) {
    return;
  }

  eventCreatorShown = true;

  /*
   * Since the dialogue isn't really a tooltip as such, we'll use a dummy
   * out-of-DOM element as our target instead of an actual element like document.body
   */
  $('<div />').qtip({
    content: {
      text: $('#event-creator'),
      title: Craft.t('calendar', 'New Event'),
    },
    position: {
      my: 'center',
      at: 'center',
      target: $(window),
    },
    show: {
      ready: true,
      modal: {
        on: true,
        blur: true,
      },
    },
    hide: false,
    style: {
      classes: 'qtip-bootstrap dialogue',
      width: 500,
    },
    events: {
      render: function (event, api) {
        const context = api.elements.content;
        let { currentSiteId: siteId } = $calendar.data();

        $('ul.errors', context).empty();

        const startTime = start.utc().format('HHmmss'),
          endTime = end.utc().format('HHmmss');

        let isAllDay = false;
        if (startTime === endTime && endTime === '000000') {
          end.subtract(1, 'seconds');
          isAllDay = true;
        }

        const utcStart = createDateAsUTC(start.toDate());
        const utcEnd = createDateAsUTC(end.toDate());
        const $creator = $('#event-creator');
        const $startDate = $('input[name="startDate[date]"]', $creator);
        const $startTime = $('input[name="startDate[time]"]', $creator);
        const $endDate = $('input[name="endDate[date]"]', $creator);
        const $endTime = $('input[name="endDate[time]"]', $creator);

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

        setTimeout(function () {
          $('input[name=title]:first', context)
            .val('')
            .focus()
            .bind('keypress', function (e) {
              const key = e.which ? e.which : e.keyCode;

              if (key === 13) {
                // ENTER
                $('button.submit', context).trigger('click');
              }
            });
        }, 100);

        const timeFormat = $startTime.timepicker('option', 'timeFormat');
        const momentTimeFormat = timeFormat
          .replace('h', 'hh')
          .replace('H', 'HH')
          .replace('G', 'H')
          .replace('g', 'h')
          .replace('A', 'a')
          .replace('i', 'mm');

        $('button.submit', context)
          .unbind('click')
          .click(function (e) {
            const self = $(this),
              title = $('input[name=title]', context).val(),
              calendarId = $('select[name=calendarId]', context).val(),
              startDateValue = moment($startDate.datepicker('getDate')),
              startTimeValue = moment($startTime.val().replace(/(a|p)\.(m)\./gi, '$1$2'), momentTimeFormat),
              endDateValue = moment($endDate.datepicker('getDate')),
              endTimeValue = moment($endTime.val().replace(/(a|p)\.(m)\./gi, '$1$2'), momentTimeFormat);

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
                event: {
                  title: title,
                  calendarId: calendarId,
                },
                [Craft.csrfTokenName]: Craft.csrfTokenValue,
              },
              success: (response) => {
                if (response.error) {
                  $('ul.errors', context)
                    .empty()
                    .append($('<li />', { text: response.error }));
                } else if (response.event) {
                  const event = response.event;
                  if (event.allDay) {
                    event.end = moment(event.end).add(2, 's').utc().format();
                  }

                  $('*[data-calendar-instance]').fullCalendar('renderEvent', event);
                  $('*[data-calendar-instance]').fullCalendar('unselect');

                  api.hide(e);
                }
              },
              error: ({ responseJSON }) => {
                Craft.cp.displayNotification('error', responseJSON.error);
              },
              complete: () => {
                self.prop('disabled', false).removeClass('disabled');
                self.text(Craft.t('app', 'Save'));
              },
            });
          });

        $('button.delete', context)
          .unbind('click')
          .click(function () {
            api.hide();
          });
      },
      hide: function (event, api) {
        $('#event-creator').removeClass('shown').insertAfter($('#solspace-calendar'));
        $('*[data-calendar-instance]').fullCalendar('unselect');
        eventCreatorShown = false;
        api.destroy();
      },
    },
  });
};

/**
 * Attaches a qTip2 popup on a given event
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

  const editButton = $('<div>', {
    class: 'buttons',
  });

  const qtipContent = $('<div>');
  const calendarData = $('<div>', {
    class: 'calendar-data',
    html:
      '<span class="color-indicator" style="background-color: ' +
      event.backgroundColor +
      ';"></span> ' +
      event.calendar.name,
  });

  const start = moment(event.start);
  const end = moment(event.end);

  let dateFormat = 'dddd, MMMM D, YYYY';
  if (event.allDay) {
    end.subtract(1, 'days');
  } else {
    dateFormat = dateFormat + ' [at] ' + calendarTimeFormat;
  }

  const eventRange = $('<div>', {
    class: 'event-date-range separator',
    html:
      '<div style="white-space: nowrap;"><label>' +
      Craft.t('calendar', 'Starts') +
      ':</label> ' +
      start.format(dateFormat) +
      '</div>' +
      '<div style="white-space: nowrap;"><label>' +
      Craft.t('calendar', 'Ends') +
      ':</label> ' +
      end.format(dateFormat) +
      '</div>',
  });

  let eventRepeats = '';
  if (event.repeats) {
    eventRepeats = $('<div>', {
      class: 'event-repeats separator',
      html: '<div id="solspace-calendar-spinner" class="spinner"></div>',
    });
  }

  if (event.editable) {
    editButton.append(
      $('<a>', {
        class: 'btn small submit',
        href: Craft.getCpUrl('calendar/events/' + event.id + (isMultiSite ? '/' + event.site.handle : '')),
        text: Craft.t('calendar', 'Edit'),
      })
    );

    editButton.append(
      $('<a>', {
        class: 'btn small delete-event',
        href: Craft.getCpUrl('calendar/events/api/delete'),
        text: Craft.t('calendar', 'Delete'),
        data: {
          id: event.id,
        },
      })
    );

    if (event.repeats) {
      editButton.append(
        $('<a>', {
          class: 'btn small delete-event-occurrence',
          href: Craft.getCpUrl('calendar/events/api/delete-occurrence'),
          text: Craft.t('calendar', 'Delete occurrence'),
          data: {
            id: event.id,
            date: event.start.toISOString(),
          },
        })
      );
    }
  }

  element.qtip({
    content: {
      title: event.title,
      button: true,
      text: qtipContent.add(calendarData).add(eventRange).add(eventRepeats).add(editButton),
    },
    style: {
      classes: 'qtip-bootstrap qtip-event',
      tip: {
        width: 30,
        height: 15,
      },
    },
    position: {
      my: 'right center',
      at: 'left center',
      adjust: {
        method: 'shift flip',
      },
    },
    show: {
      solo: true,
      delay: 500,
    },
    hide: {
      fixed: true,
      delay: 300,
    },
    events: {
      show: function (e) {
        if (!window.qTipsEnabled) {
          e.preventDefault();
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
                $('.event-repeats').html('<label>' + Craft.t('calendar', 'Repeats') + ':</label> ' + response.event.readableRepeatRule);
              }
            },
          });
        }
      },
      render: function (e, api) {
        $('a.delete-event-occurrence', api.elements.content).click(function () {
          const url = $(this).attr('href');
          const eventId = $(this).data('id');
          const date = $(this).data('date');

          if (confirm(Craft.t('calendar', 'Are you sure?'))) {
            $.ajax({
              url: url,
              type: 'post',
              dataType: 'json',
              data: {
                eventId: eventId,
                date: date,
                [Craft.csrfTokenName]: Craft.csrfTokenValue,
              },
              success: function (response) {
                if (!response.error) {
                  $('*[data-calendar-instance]').fullCalendar('refetchEvents');
                  api.destroy();

                  return;
                }

                console.warn(response.error);
              },
            });
          }

          return false;
        });

        $('a.delete-event', api.elements.content).click(function () {
          const url = $(this).attr('href');
          const eventId = $(this).data('id');

          if (confirm(Craft.t('calendar', 'Are you sure you want to delete this event?'))) {
            $.ajax({
              url: url,
              type: 'post',
              dataType: 'json',
              data: {
                eventId: eventId,
                [Craft.csrfTokenName]: Craft.csrfTokenValue,
              },
              success: function (response) {
                if (!response.error) {
                  $('*[data-calendar-instance]').fullCalendar('removeEvents', event.id);
                  api.destroy();

                  return;
                }

                console.warn(response.error);
              },
            });
          }

          return false;
        });
      },
    },
  });
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
