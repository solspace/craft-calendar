import { describe, expect, it } from "vitest";
import {
  localDisplayDateToUtcTimestamp,
  shiftUtcDateByDays,
  UTCify,
  utcDateKey,
  utcTimestampToLocalDisplayDate,
  utcToLocalDisplayDate,
} from "./date";

describe("date utils", () => {
  describe("UTCify", () => {
    it("should convert a local date object to UTC while keeping wall time", () => {
      const date = new Date(2024, 0, 20, 6, 0, 0);
      const utcDate = UTCify(date);

      expect(utcDate.toISOString()).toBe("2024-01-20T06:00:00.000Z");
      expect(utcDate.getUTCHours()).toBe(6);
    });

    it("should convert a +02:00 date string to the exact same date in UTC", () => {
      const date = "2024-01-20T06:00:00+02:00";
      const utcDate = UTCify(date);

      expect(utcDate.toISOString()).toBe("2024-01-20T06:00:00.000Z");
      expect(utcDate.getUTCHours()).toBe(6);
    });

    it("should support date-only strings without shifting the day", () => {
      const utcDate = UTCify("2024-01-20");

      expect(utcDate.toISOString()).toBe("2024-01-20T00:00:00.000Z");
    });
  });

  describe("utc display helpers", () => {
    it("should convert stored UTC timestamps into local display dates without changing wall time", () => {
      const date = utcTimestampToLocalDisplayDate(1705730400);

      expect(date.getFullYear()).toBe(2024);
      expect(date.getMonth()).toBe(0);
      expect(date.getDate()).toBe(20);
      expect(date.getHours()).toBe(6);
    });

    it("should convert local display dates back into stored UTC timestamps", () => {
      const timestamp = localDisplayDateToUtcTimestamp(new Date(2024, 0, 20, 6, 0, 0));

      expect(timestamp).toBe(1705730400);
    });

    it("should create local display dates from UTC ISO strings", () => {
      const date = utcToLocalDisplayDate("2024-01-20T06:00:00Z");

      expect(date.getFullYear()).toBe(2024);
      expect(date.getMonth()).toBe(0);
      expect(date.getDate()).toBe(20);
      expect(date.getHours()).toBe(6);
    });
  });

  describe("utcDateKey", () => {
    it("should create stable UTC date keys", () => {
      expect(utcDateKey(new Date("2024-01-20T06:00:00Z"))).toBe("2024-01-20");
      expect(utcDateKey(new Date("2024-01-20T23:59:59Z"))).toBe("2024-01-20");
      expect(utcDateKey(new Date("2024-01-21T00:00:00+02:00"))).toBe("2024-01-20");
    });
  });

  describe("UTC date arithmetic", () => {
    it("should shift days in UTC without relying on local timezone math", () => {
      expect(utcDateKey(shiftUtcDateByDays(new Date("2024-01-20T00:00:00Z"), 3))).toBe(
        "2024-01-23",
      );
    });
  });
});
