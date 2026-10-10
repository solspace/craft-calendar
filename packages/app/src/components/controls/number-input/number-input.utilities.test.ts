import { describe, expect, it } from "vitest";
import { normalizeNumberInputValue, parseNumberInputValue } from "./number-input.utilities";

describe("number input utilities", () => {
  it("parses finite numeric values", () => {
    expect(parseNumberInputValue("3")).toBe(3);
    expect(parseNumberInputValue("3.8")).toBe(3);
    expect(parseNumberInputValue("")).toBeNull();
    expect(parseNumberInputValue("not-a-number")).toBeNull();
  });

  it("normalizes invalid or low values to the minimum", () => {
    expect(normalizeNumberInputValue({ inputValue: "", min: 1 })).toBe(1);
    expect(normalizeNumberInputValue({ inputValue: "0", min: 1 })).toBe(1);
    expect(normalizeNumberInputValue({ inputValue: "4", min: 1 })).toBe(4);
  });
});
