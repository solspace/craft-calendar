import { findElementEditor, getDraftEventId } from "./occurrence-editor";

const mounted = new WeakSet<HTMLElement>();

/** Keep the parent editor in its original calendar until the mapping has been accepted. */
export const mountCalendarTransferSelect = (container: HTMLElement): void => {
  const jQuery = (window as typeof window & { jQuery?: JQueryStatic }).jQuery;
  if (mounted.has(container) || !jQuery) return;
  mounted.add(container);
  const currentId = Number(container.dataset.calendarId);
  const button = container.querySelector<HTMLButtonElement>("button.menubtn");
  const label = button?.querySelector<HTMLElement>(".inline-flex");
  const originalLabel = label?.innerHTML;
  let busy = false;

  jQuery(container).on("change", async () => {
    const targetId = Number(jQuery(container).data("value"));
    if (label && originalLabel) label.innerHTML = originalLabel;
    jQuery(container).data("value", currentId);
    container.querySelectorAll<HTMLElement>("[data-value]").forEach((option) => {
      option.classList.toggle("sel", Number(option.dataset.value) === currentId);
    });
    if (busy || targetId === currentId || !targetId) return;
    busy = true;
    if (button) button.disabled = true;
    const editor = findElementEditor(container);
    let paused = false;
    try {
      const eventId = await getDraftEventId(container);
      // Avoid background autosaves overwriting the draft while the slideout maps its fields.
      editor?.pause();
      paused = !!editor;
      const slideout = new Craft.CpScreenSlideout("calendar/event-calendar/edit", {
        params: { eventId, siteId: Number(container.dataset.siteId), targetCalendarId: targetId },
      });
      let changed = false;
      slideout.on("submit", (event) => {
        const url = event?.response?.data?.url;
        changed = true;
        window.location.assign(url || window.location.href);
      });
      slideout.on("close", () => {
        if (!changed && paused) editor?.resume();
        busy = false;
        if (button) button.disabled = false;
      });
    } catch {
      if (paused) editor?.resume();
      busy = false;
      if (button) button.disabled = false;
      Craft.cp.displayError(Craft.t("calendar", "Couldn’t open the calendar mapping."));
    }
  });
};

export const updateMappingWarnings = (container: HTMLElement): void => {
  const populated = JSON.parse(container.dataset.populated || "{}") as Record<string, string>;
  const selects = Array.from(
    container.querySelectorAll<HTMLSelectElement>("select[data-field-mapping]"),
  );
  const values = selects.map((select) => select.value).filter(Boolean);
  const duplicate = values.length !== new Set(values).size;
  const used = new Set(values);
  const omitted = Object.entries(populated).filter(([uid]) => !used.has(uid));
  const warning = container.querySelector<HTMLElement>("[data-unmapped-warning]");
  const list = container.querySelector<HTMLElement>("[data-unmapped-fields]");
  const error = container.querySelector<HTMLElement>("[data-mapping-error]");
  if (warning) warning.hidden = omitted.length === 0;
  if (error) error.hidden = !duplicate;
  if (list) {
    list.replaceChildren(
      ...omitted.map(([, label]) => {
        const item = document.createElement("li");
        item.textContent = label;
        return item;
      }),
    );
  }
  // Native form validation prevents accidental duplicate mappings before submitting.
  selects.forEach((select) => {
    select.setCustomValidity(
      duplicate ? Craft.t("calendar", "Each source field can only be mapped once.") : "",
    );
  });
};

export const mountCalendarTransferMapping = (container: HTMLElement): void => {
  if (mounted.has(container)) return;
  mounted.add(container);
  container.addEventListener("change", () => updateMappingWarnings(container));
  updateMappingWarnings(container);
};
