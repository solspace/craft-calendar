/** global: Craft, Garnish, $ */
(() => {
  Craft.Calendar = Craft.Calendar || {};

  /**
   * The occurrence slideout: each field's Override toggle, the date and time controls,
   * and resetting the occurrence.
   */
  Craft.Calendar.OccurrenceEditor = Garnish.Base.extend({
    init(id) {
      this.$container = $(`#${id}`);
      this.$form = this.$container.closest("form");

      this.$container.find(".calendar-occurrence-field").each((_, field) => {
        this.initField($(field));
      });

      this.initTimes();
      this.initReset();
    },

    /**
     * An overridden field shows its own, editable value. Otherwise it shows the event's value,
     * and its input is disabled so nothing is submitted for it. Nested entries are only copied
     * on save, so until then the event's entries stay visible under a notice.
     */
    initField($field) {
      const $toggleContainer = $field.children(".calendar-occurrence-field-toggle");
      const $toggle = $toggleContainer.find(".lightswitch");
      const $own = $field.children(".calendar-occurrence-field-own");
      const $inherited = $field.children(".calendar-occurrence-field-inherited");
      const isCopiedOnSave = $field.is("[data-calendar-copied-on-save]");

      const update = () => {
        const isOverridden = $toggle.hasClass("on");

        $own.toggleClass("hidden", !isOverridden).prop("disabled", !isOverridden);
        $inherited.toggleClass("hidden", isOverridden && !isCopiedOnSave);

        // The toggle sits in the heading of whichever field is showing
        const $heading = (isOverridden && !isCopiedOnSave ? $own : $inherited)
          .find(".field > .heading")
          .first();
        if ($heading.length) {
          $toggleContainer.appendTo($heading);
        }
      };

      this.addListener($toggle, "change", () => {
        update();
        Garnish.$win.trigger("resize");
      });
      update();
    },

    initTimes() {
      const $ownTimes = this.$container.find(".calendar-occurrence-own-times .lightswitch");
      const $allDay = this.$container.find(".calendar-occurrence-all-day .lightswitch");
      const $times = this.$container.find(".calendar-occurrence-times");
      const $seriesTimes = this.$container.find(".calendar-occurrence-series-times");

      const updateAllDay = () => {
        $times.find(".timewrapper").toggleClass("hidden", $allDay.hasClass("on"));
      };

      this.addListener($ownTimes, "change", () => {
        const hasOwnTimes = $ownTimes.hasClass("on");

        $times.toggleClass("hidden", !hasOwnTimes).prop("disabled", !hasOwnTimes);
        $seriesTimes.toggleClass("hidden", hasOwnTimes);
      });

      this.addListener($allDay, "change", updateAllDay);
      updateAllDay();
    },

    initReset() {
      this.addListener(this.$container.find(".calendar-occurrence-reset-btn"), "click", () => {
        if (!window.confirm(Craft.t("calendar", "Remove everything this occurrence changes?"))) {
          return;
        }

        this.$container.find(".calendar-occurrence-reset-input").val("1");
        this.$form.trigger("submit");
      });
    },
  });
})();
