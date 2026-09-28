// Popovers supplement the event links; the links still work with JavaScript disabled.
document.querySelectorAll("[data-calendar-popover]").forEach((link) => {
  if (!window.bootstrap?.Popover) return;

  const event = link.closest(".event");
  new window.bootstrap.Popover(link, {
    trigger: "hover focus",
    placement: "auto",
    container: "body",
    customClass: "calendar-event-popover",
    html: true,
    title: event?.querySelector(".qtip .title")?.innerHTML ?? "",
    content: event?.querySelector(".qtip .content")?.innerHTML ?? "",
  });

  link.addEventListener("inserted.bs.popover", () => {
    const popoverId = link.getAttribute("aria-describedby");
    const icon = popoverId && document.getElementById(popoverId)?.querySelector(".calendar-popover-icon");
    if (icon) icon.style.color = link.dataset.calendarColor;
  });
});

const miniCalendar = document.getElementById("mini-cal-wrapper");
miniCalendar?.addEventListener("click", async (event) => {
  const link = event.target.closest("a[data-mini-calendar-nav]");
  if (!link || !miniCalendar.contains(link)) return;

  const url = new URL(link.href);
  if (url.origin !== window.location.origin || !url.pathname.includes("/month/")) return;

  event.preventDefault();
  url.pathname = url.pathname.replace("/month/", "/mini_cal/");
  link.setAttribute("aria-disabled", "true");

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    miniCalendar.innerHTML = await response.text();
    miniCalendar.querySelector("#mini_calendar_month")?.focus();
  } catch {
    // The full month view is a useful fallback when the partial request fails.
    window.location.assign(link.href);
  } finally {
    link.removeAttribute("aria-disabled");
  }
});

document.querySelectorAll("[data-select-on-focus]").forEach((input) => {
  input.addEventListener("focus", () => input.select());
});

// Keep the month picker clickable on touch and keyboard, and open it on pointer hover.
const monthPicker = document.querySelector("[data-month-picker]");
if (monthPicker && window.bootstrap?.Dropdown && window.matchMedia?.("(hover: hover) and (pointer: fine)")?.matches) {
  const trigger = monthPicker.querySelector("[data-bs-toggle='dropdown']");
  const dropdown = window.bootstrap.Dropdown.getOrCreateInstance(trigger);
  let openedByHover = false;

  monthPicker.addEventListener("pointerenter", () => {
    if (trigger.getAttribute("aria-expanded") === "false") {
      dropdown.show();
      openedByHover = true;
    }
  });
  trigger.addEventListener("click", (event) => {
    if (openedByHover && trigger.getAttribute("aria-expanded") === "true") {
      // The pointer has already opened the list; do not immediately close it.
      event.stopPropagation();
      openedByHover = false;
    }
  });
  monthPicker.addEventListener("pointerleave", () => {
    openedByHover = false;
    dropdown.hide();
  });
}
