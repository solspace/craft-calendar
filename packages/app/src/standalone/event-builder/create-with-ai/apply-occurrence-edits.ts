import type { AiOccurrenceEdit } from "@cal/pages/calendar/calendar.create-session";
import { craftFetch } from "@cal/utils/http";
import translate from "@cal/utils/translations";
import { getDraftEventId } from "../occurrence-editor";

export const OCCURRENCES_CHANGED_EVENT = "calendar:occurrences-changed";

/** Persist the schedule draft, then save per-occurrence AI customizations. */
export const applyOccurrenceEdits = async (
  node: HTMLElement | null,
  siteId: number,
  edits: AiOccurrenceEdit[],
): Promise<void> => {
  if (!edits.length) {
    return;
  }

  const eventId = await getDraftEventId(node);
  const response = await craftFetch(Craft.getActionUrl("calendar/occurrences/apply-edits"), {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      eventId,
      siteId,
      occurrenceEdits: edits,
    }),
  });

  if (!response.ok) {
    let message = translate("Couldn’t save the occurrence.");
    try {
      const data = (await response.json()) as { message?: string; error?: string };
      message = data.message || data.error || message;
    } catch {
      // keep default
    }
    throw new Error(message);
  }

  window.dispatchEvent(new Event(OCCURRENCES_CHANGED_EVENT));
};
