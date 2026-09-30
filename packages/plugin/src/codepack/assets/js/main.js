// Page behavior is shared; only Bootstrap's interactive primitives need an adapter.
function initBootstrapUi() {
  if (!window.bootstrap) return;
  document.querySelectorAll("[data-calendar-popover]").forEach((link) => {
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

  const monthPicker = document.querySelector("[data-month-picker]");
  if (monthPicker && window.matchMedia?.("(hover: hover) and (pointer: fine)")?.matches) {
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
        event.stopPropagation();
        openedByHover = false;
      }
    });
    monthPicker.addEventListener("pointerleave", () => {
      openedByHover = false;
      dropdown.hide();
    });
  }
}

function initTailwindUi() {
  const dropdowns = [...document.querySelectorAll("[data-demo-dropdown]")];
  const closeDropdowns = (except) => dropdowns.forEach((trigger) => {
    if (trigger === except) return;
    trigger.setAttribute("aria-expanded", "false");
    trigger.nextElementSibling?.classList.remove("show");
  });

  dropdowns.forEach((trigger) => {
    trigger.addEventListener("click", (event) => {
      event.preventDefault();
      const shouldOpen = trigger.getAttribute("aria-expanded") !== "true";
      closeDropdowns();
      trigger.setAttribute("aria-expanded", String(shouldOpen));
      trigger.nextElementSibling?.classList.toggle("show", shouldOpen);
    });
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest("[data-demo-dropdown], .demo-menu")) closeDropdowns();
    if (event.target.closest(".demo-menu-item")) closeDropdowns();
  });
  document.addEventListener("keydown", (event) => {
    if (event.key !== "Escape") return;
    const open = dropdowns.find((trigger) => trigger.getAttribute("aria-expanded") === "true");
    closeDropdowns();
    open?.focus();
  });

  const navbarToggle = document.querySelector("[data-nav-toggle]");
  navbarToggle?.addEventListener("click", () => {
    const nav = document.getElementById(navbarToggle.getAttribute("aria-controls"));
    const isOpen = nav?.classList.toggle("show") ?? false;
    navbarToggle.setAttribute("aria-expanded", String(isOpen));
  });
  document.querySelectorAll("[data-demo-dismiss='alert']").forEach((button) => {
    button.addEventListener("click", () => button.closest(".demo-alert")?.remove());
  });

  const monthPicker = document.querySelector("[data-month-picker]");
  if (monthPicker && window.matchMedia?.("(hover: hover) and (pointer: fine)")?.matches) {
    const trigger = monthPicker.querySelector("[data-demo-dropdown]");
    const menu = trigger.nextElementSibling;
    let openedByHover = false;
    monthPicker.addEventListener("pointerenter", () => {
      closeDropdowns(trigger);
      trigger.setAttribute("aria-expanded", "true");
      menu.classList.add("show");
      openedByHover = true;
    });
    trigger.addEventListener("click", (event) => {
      if (openedByHover && trigger.getAttribute("aria-expanded") === "true") {
        event.preventDefault();
        event.stopImmediatePropagation();
        openedByHover = false;
      }
    }, { capture: true });
    monthPicker.addEventListener("pointerleave", () => {
      openedByHover = false;
      closeDropdowns();
    });
  }

  // The popover is supplementary; every event remains an ordinary link.
  let visiblePopover;
  const hidePopover = () => {
    if (!visiblePopover) return;
    visiblePopover.link.removeAttribute("aria-describedby");
    visiblePopover.element.remove();
    visiblePopover = null;
  };
  document.querySelectorAll("[data-calendar-popover]").forEach((link, index) => {
    const showPopover = () => {
      if (visiblePopover?.link === link) return;
      hidePopover();
      const event = link.closest(".event");
      const title = event?.querySelector(".qtip .title")?.innerHTML ?? "";
      const content = event?.querySelector(".qtip .content")?.innerHTML ?? "";
      const element = document.createElement("div");
      element.id = `calendar-event-popover-${index}`;
      element.className = "calendar-event-popover";
      element.setAttribute("role", "tooltip");
      element.innerHTML = `<div class="popover-header">${title}</div><div class="popover-body">${content}</div>`;
      const icon = element.querySelector(".calendar-popover-icon");
      if (icon) icon.style.color = link.dataset.calendarColor;
      document.body.append(element);
      const rect = link.getBoundingClientRect();
      const left = Math.max(12, Math.min(rect.left + window.scrollX, window.scrollX + window.innerWidth - element.offsetWidth - 12));
      const above = rect.bottom + element.offsetHeight + 12 > window.innerHeight && rect.top > element.offsetHeight;
      element.style.left = `${left}px`;
      element.style.top = `${window.scrollY + (above ? rect.top - element.offsetHeight - 8 : rect.bottom + 8)}px`;
      link.setAttribute("aria-describedby", element.id);
      visiblePopover = { link, element };
    };
    link.addEventListener("mouseenter", showPopover);
    link.addEventListener("focus", showPopover);
    link.addEventListener("mouseleave", () => { if (document.activeElement !== link) hidePopover(); });
    link.addEventListener("blur", hidePopover);
  });
  window.addEventListener("scroll", hidePopover, { passive: true });
  window.addEventListener("resize", hidePopover);
  document.addEventListener("keydown", (event) => { if (event.key === "Escape") hidePopover(); });
}

function initDemoUi() {
  if (window.calendarDemoFramework === "bootstrap") {
    initBootstrapUi();
  } else {
    initTailwindUi();
  }
}
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", initDemoUi, { once: true });
} else {
  initDemoUi();
}

const miniCalendar = document.getElementById("mini-cal-wrapper");
miniCalendar?.addEventListener("click", async (event) => {
  const link = event.target.closest("a[data-mini-calendar-nav]");
  if (!link || !miniCalendar.contains(link)) return;

  const url = new URL(link.href);
  if (url.origin !== window.location.origin || !url.pathname.includes("/month/")) return;

  event.preventDefault();
  const filteredMonth = url.pathname.match(/\/month\/calendar\/([^/]+)\//);
  if (filteredMonth) url.searchParams.set("calendar", decodeURIComponent(filteredMonth[1]));
  url.pathname = url.pathname.replace(/\/month\/(?:calendar\/[^/]+\/)?/, "/mini_cal/");
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
