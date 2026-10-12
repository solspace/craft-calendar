import { describe, expect, it } from "vitest";
import { buildCreateEventPayload } from "./create-event.operations";

describe("buildCreateEventPayload", () => {
  it("includes the selected calendar and site", () => {
    expect(
      buildCreateEventPayload(
        {
          id: "draft-create-event",
          title: "Demo event",
          start: 1_783_425_600,
          end: 1_783_429_200,
          allDay: false,
        },
        12,
        4,
      ),
    ).toEqual({
      title: "Demo event",
      start: 1_783_425_600,
      end: 1_783_429_200,
      allDay: false,
      calendarId: 12,
      siteId: 4,
      repeatType: "NEVER",
      repeatEndType: "NEVER",
    });
  });

  it("includes repeat rules from AI drafts", () => {
    expect(
      buildCreateEventPayload(
        {
          id: "draft-create-event",
          title: "Standup",
          start: 1_783_425_600,
          end: 1_783_427_400,
          allDay: false,
          repeatType: "WEEKLY",
          rrule: "DTSTART:20261013T090000\nRRULE:FREQ=WEEKLY;BYDAY=MO",
        },
        12,
        4,
      ),
    ).toMatchObject({
      repeatType: "WEEKLY",
      repeatEndType: "NEVER",
      rrule: "DTSTART:20261013T090000\nRRULE:FREQ=WEEKLY;BYDAY=MO",
    });
  });

  it("infers AFTER when the AI rrule includes COUNT", () => {
    expect(
      buildCreateEventPayload(
        {
          id: "draft-create-event",
          title: "Company holiday",
          start: 1_760_558_400,
          end: 1_760_644_800,
          allDay: true,
          repeatType: "WEEKLY",
          repeatEndType: "NEVER",
          rrule: "DTSTART:20261016\nRRULE:FREQ=WEEKLY;BYDAY=FR;COUNT=8",
        },
        12,
        4,
      ),
    ).toMatchObject({
      repeatType: "WEEKLY",
      repeatEndType: "AFTER",
      rrule: "DTSTART:20261016\nRRULE:FREQ=WEEKLY;BYDAY=FR;COUNT=8",
    });
  });

  it("includes mapped details without exposing arbitrary field handles", () => {
    const details = { location: "Studio A", description: "Bring a mat.\nDoors open at 6." };
    const payload = buildCreateEventPayload(
      { id: "draft-create-event", title: "Yoga", start: 100, end: 3700, allDay: false },
      12,
      4,
      details,
    );

    expect(payload.details).toEqual(details);
    expect(payload).not.toHaveProperty("fields");
  });
});
