// Popovers supplement the event links; the links still work with JavaScript disabled.
document.querySelectorAll("[data-calendar-popover]").forEach((link) => {
  if (!window.bootstrap?.Popover) return;

  const event = link.closest(".event");
  new window.bootstrap.Popover(link, {
    trigger: "hover focus",
    placement: "bottom",
    html: true,
    title: event?.querySelector(".qtip .title")?.innerHTML ?? "",
    content: event?.querySelector(".qtip .content")?.innerHTML ?? "",
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
