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
});
