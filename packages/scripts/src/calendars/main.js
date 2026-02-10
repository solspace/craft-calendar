$(() => {
  $(".alert-dismissible a.close").on({
    click: function () {
      const $alert = $(this).parents(".alert:first");
      Craft.postActionRequest("calendar/view/dismiss-demo-alert", {}, () => {
        $alert.remove();
      });
    },
  });
});
