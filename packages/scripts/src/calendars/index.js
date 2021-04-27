$(function () {
  $('a.enable-ics[data-calendar-id]').on({
    click: function () {
      if (!confirm(Craft.t('calendar', 'Are you sure you want to enable ICS sharing for this calendar?'))) {
        return false;
      }

      const $self = $(this),
        calendarId = $self.data('calendar-id'),
        data = {
          calendar_id: calendarId,
          [Craft.csrfTokenName]: Craft.csrfTokenValue,
        };

      Craft.postActionRequest('calendar/calendars/enable-ics-sharing', data, (response) => {
        if (!response.errors) {
          window.location.reload();
        } else {
          Craft.cp.displayError(response.errors.join('. '));
        }
      });
    },
  });

  $('a.copy-ics-link[data-link]').on({
    click: function () {
      const link = $(this).data('link');
      const message = Craft.t('calendar', '{ctrl}C to copy.', {
        ctrl: navigator.appVersion.indexOf('Mac') ? '⌘' : 'Ctrl-',
      });

      prompt(message, link);
    },
  });

  $('a.disable-ics[data-calendar-id]').on({
    click: function () {
      if (!confirm(Craft.t('calendar', 'Are you sure you want to disable ICS sharing for this calendar?'))) {
        return false;
      }

      const $self = $(this),
        calendarId = $self.data('calendar-id'),
        data = {
          calendar_id: calendarId,
          [Craft.csrfTokenName]: Craft.csrfTokenValue,
        };

      Craft.postActionRequest('calendar/calendars/disable-ics-sharing', data, (response) => {
        if (!response.errors) {
          window.location.reload();
        } else {
          Craft.cp.displayError(response.errors.join('. '));
        }
      });
    },
  });

  $('a.icon.clone[data-id]').on({
    click: function () {
      const id = $(this).data('id');

      $.ajax({
        url: Craft.getCpUrl('calendar/calendars/duplicate'),
        type: 'post',
        dataType: 'json',
        data: {
          [Craft.csrfTokenName]: Craft.csrfTokenValue,
          id,
        },
        success: () => {
          window.location.reload();
        },
        error: ({ responseJSON }) => {
          Craft.cp.displayError(responseJSON.error);
        },
      });
    },
  });
});
