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
