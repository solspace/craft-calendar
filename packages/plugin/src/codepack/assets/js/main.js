$(document).ready(function () {
  $('[data-toggle="popover"]').popover({
    trigger: "hover",
    placement: "bottom",
    html: true,
    title: function () {
      return $(".qtip .title", $(this)).html();
    },
    content: function () {
      return $(".qtip .content", $(this)).html();
    },
  });

  var $cal = $("#mini-cal-wrapper");

  $cal.on({
    click: function (e) {
      var $self = $(this);
      var url = $self.attr("href");

      var updatedUrl = url.replace(/\/([\w_\-0-9]+)\/month(\/\d+\/\d+)/, "\/$1\/mini_cal$2", url);

      $.ajax({
        url: updatedUrl,
        type: "GET",
        success: function (response) {
          $cal.html(response);
        },
      });

      e.preventDefault();
      e.stopPropagation();
      return false;
    },
  }, ".table thead a");
});
