import { describe, expect, it } from "vitest";
import { UTCify, utcDateKey } from "./date";

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
  });

  describe("utcDateKey", () => {
    it("should create stable UTC date keys", () => {
      expect(utcDateKey(new Date("2024-01-20T06:00:00Z"))).toBe("2024-01-20");
      expect(utcDateKey(new Date("2024-01-20T23:59:59Z"))).toBe("2024-01-20");
      expect(utcDateKey(new Date("2024-01-21T00:00:00+02:00"))).toBe("2024-01-20");
    });
  });
});
