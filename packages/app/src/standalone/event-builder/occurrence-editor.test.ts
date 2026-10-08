// @vitest-environment jsdom
import { afterEach, describe, expect, it, vi } from "vitest";
import { getDraftEventId } from "./occurrence-editor";

describe("event-builder occurrence editing", () => {
  afterEach(() => vi.unstubAllGlobals());

  it("waits for the draft and pending schedule save, then uses the current draft ID", async () => {
    const settings = { elementId: 12 };
    const ensureIsDraftOrRevision = vi.fn(async () => {
      settings.elementId = 34;
    });
    const checkForm = vi.fn(async () => {
      expect(ensureIsDraftOrRevision).toHaveBeenCalledOnce();
      settings.elementId = 56;
    });
    const closest = vi.fn(() => ({
      data: () => ({ settings, ensureIsDraftOrRevision, checkForm }),
    }));
    vi.stubGlobal("jQuery", () => ({ closest }));

    expect(await getDraftEventId(document.createElement("div"))).toBe(56);
    expect(closest).toHaveBeenCalledWith("form");
    expect(checkForm).toHaveBeenCalledWith(false, true);
  });

  it("stops when pending schedule changes cannot be saved", async () => {
    vi.stubGlobal("jQuery", () => ({
      closest: () => ({
        data: () => ({
          settings: { elementId: 34 },
          ensureIsDraftOrRevision: async () => {},
          checkForm: async () => {
            throw new Error("Couldn’t save draft.");
          },
        }),
      }),
    }));

    await expect(getDraftEventId(document.createElement("div"))).rejects.toThrow(
      "Couldn’t save draft.",
    );
  });

  it("does not fall back to editing live occurrences when the editor is missing", async () => {
    await expect(getDraftEventId(document.createElement("div"))).rejects.toThrow(
      "The event editor is unavailable.",
    );
  });
});
