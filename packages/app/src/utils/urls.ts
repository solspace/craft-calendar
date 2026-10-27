import parse from "url-parse";

/**
 * CP base for Calendar routes (`…/admin/calendar`).
 * Must match `/calendar` as a full segment so `/calendars` does not become `/calendar/calendar`.
 */
const calendarBaseMatch = window.location.href.match(/^(.*?\/calendar)(?=\/|$)/i);
export const baseUrl = calendarBaseMatch?.[1] ?? window.location.href.replace(/\/[^/]*$/, "");

export const generateUrl = (url?: string, absolute = true): string => {
  url = (url ?? "")
    .replace(/\/+/g, "/")
    .replace(/^\/(.*)/, "$1")
    .replace(/\/$/, "");

  url = url.length ? `/${url}` : "";

  const parsedUrl = parse(`${baseUrl}${url}`);

  return absolute ? parsedUrl.href : parsedUrl.pathname;
};
