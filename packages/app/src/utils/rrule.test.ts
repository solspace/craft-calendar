import { describe, expect, it } from "vitest";
import { getRRuleText, normalizeRfcLine } from "./rrule";

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

  it("should normalize all-day fixed date lines", () => {
    expect(normalizeRfcLine("RDATE:20260608T110000,20260701T110000", true)).toBe(
      "RDATE;VALUE=DATE:20260608,20260701",
    );
    expect(normalizeRfcLine("EXDATE;TZID=America/New_York:20260623T110000Z", true)).toBe(
      "EXDATE;VALUE=DATE:20260623",
    );
  });

  it("should normalize all-day recurrence until values", () => {
    expect(
      normalizeRfcLine("RRULE:INTERVAL=1;UNTIL=20260730T110000Z;FREQ=WEEKLY;BYDAY=TH,TU,SA", true),
    ).toBe("RRULE:FREQ=WEEKLY;INTERVAL=1;UNTIL=20260730;BYDAY=TH,TU,SA");
  });

  it("should move recurrence frequency first", () => {
    expect(normalizeRfcLine("RRULE:INTERVAL=1;COUNT=20;FREQ=WEEKLY;BYDAY=TH,TU,SA", true)).toBe(
      "RRULE:FREQ=WEEKLY;INTERVAL=1;COUNT=20;BYDAY=TH,TU,SA",
    );
  });

  it("should strip timed date Z suffixes", () => {
    expect(normalizeRfcLine("RDATE:20260608T110000Z,20260701T110000Z", false)).toBe(
      "RDATE:20260608T110000,20260701T110000",
    );
  });
});
