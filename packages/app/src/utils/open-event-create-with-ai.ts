/** Open the full event Create page with the AI panel auto-opened (`?ai=1`). */
export const openEventCreateWithAi = (calendarHandle?: string | null) => {
  const path = calendarHandle
    ? `calendar/events/new/${encodeURIComponent(calendarHandle)}`
    : "calendar/events/new";
  const base = Craft.getCpUrl(path);
  const separator = base.includes("?") ? "&" : "?";
  window.location.href = `${base}${separator}ai=1`;
};

export const consumeAiQueryFlag = (): boolean => {
  const url = new URL(window.location.href);
  if (url.searchParams.get("ai") !== "1") {
    return false;
  }

  url.searchParams.delete("ai");
  const next = `${url.pathname}${url.search}${url.hash}`;
  window.history.replaceState({}, "", next);
  return true;
};
