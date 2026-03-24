import { describe, expect, it } from "vitest";
import { getRRuleText } from "./rrule";

describe("rrule utils", () => {
  it("should describe the base rule when fixed dates are present", () => {
    const value = [
      "DTSTART:20260108T000000Z",
      "RRULE:INTERVAL=1;UNTIL=20260425T000000Z;FREQ=WEEKLY",
      "RDATE:20260208T000000Z,20260215T000000Z,20260407T000000Z,20260408T000000Z",
      "EXDATE:20260222T000000Z,20260301T000000Z",
    ].join("\n");

    expect(getRRuleText(value)).toBe("every week until April 25, 2026");
  });

  it("should return null when there is no base recurrence rule", () => {
    const value = ["DTSTART:20260108T000000Z", "RDATE:20260208T000000Z"].join("\n");

    expect(getRRuleText(value)).toBeNull();
  });
});
