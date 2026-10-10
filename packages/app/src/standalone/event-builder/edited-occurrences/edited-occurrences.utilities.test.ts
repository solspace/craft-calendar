import type { DateFormats } from "@cal/types/config";
import { describe, expect, it } from "vitest";
import { formatOccurrenceRange } from "./edited-occurrences.utilities";

const formats = {
  date: { short: { icu: "yyyy-MM-dd" } },
  time: { short: { icu: "h:mm a" } },
} as DateFormats;

const stamp = (date: string) => new Date(`${date}Z`).getTime() / 1000;

describe("edited occurrence ranges", () => {
  it.each([
    ["2026-11-11T14:00:00", "2026-11-11T18:00:00", false, "2026-11-11 2:00 PM - 6:00 PM"],
    ["2026-11-11T00:00:00", "2026-11-11T23:59:59", true, "2026-11-11 (all day)"],
    [
      "2026-11-11T18:00:00",
      "2026-11-13T08:00:00",
      false,
      "2026-11-11 6:00 PM - 2026-11-13 8:00 AM",
    ],
    ["2026-11-11T00:00:00", "2026-11-13T23:59:59", true, "2026-11-11 - 2026-11-13 (all day)"],
    [
      "2026-11-11T23:00:00",
      "2026-11-12T00:00:00",
      false,
      "2026-11-11 11:00 PM - 2026-11-12 12:00 AM",
    ],
  ])("formats %s through %s (all day: %s)", (start, end, allDay, expected) => {
    expect(formatOccurrenceRange({ start: stamp(start), end: stamp(end), allDay }, formats)).toBe(
      expected,
    );
  });

  it("respects Craft's date and time patterns", () => {
    const europeanFormats = {
      date: { short: { icu: "dd/MM/yyyy" } },
      time: { short: { icu: "HH:mm" } },
    } as DateFormats;

    expect(
      formatOccurrenceRange(
        {
          start: stamp("2026-11-11T18:00:00"),
          end: stamp("2026-11-13T08:00:00"),
          allDay: false,
        },
        europeanFormats,
      ),
    ).toBe("11/11/2026 18:00 - 13/11/2026 08:00");
  });
});
