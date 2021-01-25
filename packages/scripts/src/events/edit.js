$(function () {
  const $tabs = $('#tabs a.tab');
  $tabs.on({
    click: function () {
      const $self = $(this);

      $self.parent().siblings().find('.tab.sel').removeClass('sel');
      $self.addClass('sel');

      $('.tab-content').addClass('hidden');
      $('.tab-content[data-for-tab=' + $self.data('tab-id') + ']').removeClass('hidden');

      return false;
    },
  });
});
