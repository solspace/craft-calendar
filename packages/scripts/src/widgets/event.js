$(function () {
  setTimeout(function () {
    const $eventCreator = $('.event-creator');
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

    $eventCreator.each(function () {
      const $context = $(this);
      const { timeInterval, eventDuration } = $context.data();

      $('ul.errors', $context).empty();

      const $startDate = $('input[name="startDate[date]"]', $context);
      const $startTime = $('input[name="startDate[time]"]', $context);
      const $endDate = $('input[name="endDate[date]"]', $context);
      const $endTime = $('input[name="endDate[time]"]', $context);

      $startTime.timepicker('option', 'step', timeInterval);
      $endTime.timepicker('option', 'step', timeInterval);

      $startDate.datepicker('option', 'onSelect', function (dateText) {
        $endDate.datepicker('option', 'minDate', dateText);
        $endDate.val(dateText);
      });

      $startTime.on('change', function () {
        const startDate = $startDate.datepicker('getDate');
        const endDate = $endDate.datepicker('getDate');

        let diffInDays = 0;
        if (startDate && endDate) {
          diffInDays = Math.round((endDate - startDate) / (1000 * 60 * 60 * 24));
        }

        const currentTime = $startTime.timepicker('getTime');
        const adjustedTime = $startTime.timepicker('getTime');

        if (!currentTime) {
          return;
        }

        adjustedTime.setMinutes(currentTime.getMinutes() + parseInt(eventDuration));

        $endTime.timepicker('option', 'durationTime', currentTime);

        if (diffInDays === 0) {
          const minTime = $startTime.timepicker('getTime');
          minTime.setMinutes(currentTime.getMinutes() + parseInt(timeInterval));

          $endTime.timepicker('option', 'showDuration', true);
          $endTime.timepicker('option', 'minTime', minTime);
          if ($(this).val()) {
            $endTime.timepicker('setTime', adjustedTime);
          }
        } else {
          $endTime.timepicker('option', 'showDuration', false);
          $endTime.timepicker('option', 'minTime', '00:00');
          if ($(this).val()) {
            $endTime.timepicker('setTime', currentTime);
          }
        }
      });

      $endDate.on('change', function () {
        $startTime.trigger('change');
      });

      const $allDayInput = $('input[name=allDay]', $context);
      const lightswitch = $allDayInput.parents('.lightswitch:first');

      lightswitch.data('lightswitch').turnOff();
      $('.timewrapper', $context).show();

      $('.btn.submit', $context).bind('click', function () {
        const title = $('input[name=title]', $context).val();
        const calendarId = $('select[name=calendarId]', $context).val();

        const startDateValue = moment($startDate.datepicker('getDate'));
        const startTimeValue = moment($startTime.timepicker('getTime'));
        const endDateValue = moment($endDate.datepicker('getDate'));
        const endTimeValue = moment($endTime.timepicker('getTime'));

        const isAllDay = $allDayInput.val();

        let startDateString = startDateValue.format('YYYY-MM-DD');
        let endDateString = endDateValue.format('YYYY-MM-DD');
        if (!isAllDay) {
          startDateString = startDateString + ' ' + startTimeValue.format('HH:mm:ss');
          endDateString = endDateString + ' ' + endTimeValue.format('HH:mm:ss');
        }

        $('.spinner', $context).removeClass('hidden');
        $.ajax({
          url: Craft.getCpUrl('calendar/events/api/create'),
          type: 'post',
          dataType: 'json',
          data: {
            startDate: startDateString,
            endDate: endDateString,
            allDay: isAllDay,
            [Craft.csrfTokenName]: Craft.csrfTokenValue,
            event: {
              title: title,
              calendarId: calendarId,
            },
          },
          success: function (response) {
            $('.spinner', $context).addClass('hidden');
            if (response.error) {
              $('ul.errors', $context)
                .empty()
                .append($('<li />', { text: response.error }));

              Craft.cp.displayError(Craft.t('calendar', 'Couldn’t save event.'));
            } else if (response.event) {
              $('ul.errors', $context).empty();

              $('input[type=text]', $context).val('');

              Craft.cp.displayNotice(Craft.t('calendar', 'Event saved.'));
            }
          },
          error: function (response) {
            alert(response);
          },
        });

        return false;
      });
    });
  }, 200);
});
