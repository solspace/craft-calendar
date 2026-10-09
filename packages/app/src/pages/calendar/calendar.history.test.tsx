// @vitest-environment jsdom
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { replayEventHistory } from "./calendar.events";
import { CalendarHistory, HISTORY_RESET_EVENT, useCalendarHistory } from "./calendar.history";

vi.mock("./calendar.events", () => ({ replayEventHistory: vi.fn(async () => true) }));
let history: ReturnType<typeof useCalendarHistory>;
const refetch = vi.fn();
const Harness = () => {
  history = useCalendarHistory(refetch);
  return (
    <>
      <input aria-label="Title" />
      <CalendarHistory
        canUndo={history.canUndo}
        canRedo={history.canRedo}
        disabled={history.busy}
        onReplay={(direction) => void history.replay(direction)}
      />
    </>
  );
};

describe("calendar schedule history", () => {
  let container: HTMLDivElement;
  let root: Root;
  beforeEach(async () => {
    vi.clearAllMocks();
    vi.mocked(replayEventHistory).mockResolvedValue(true);
    vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
    vi.stubGlobal("Craft", { t: (_category: string, message: string) => message });
    container = document.createElement("div");
    document.body.append(container);
    root = createRoot(container);
    await act(async () => root.render(<Harness />));
  });
  afterEach(async () => {
    await act(async () => root.unmount());
    container.remove();
    vi.unstubAllGlobals();
  });
  const button = (label: string) =>
    container.querySelector<HTMLButtonElement>(`[aria-label="${label}"]`)!;
  const click = (label: string) => act(async () => button(label).click());

  it("uses the same arrow sizes and reverses multiple saved changes in order", async () => {
    expect(button("Undo").disabled).toBe(true);
    expect(button("Redo").disabled).toBe(true);
    expect(button("Undo").querySelector("svg")?.getAttribute("width")).toBe("18");
    expect(button("Redo").querySelector("svg")?.getAttribute("height")).toBe("16");
    await act(async () => {
      history.add("move");
      history.add("resize");
    });
    await click("Undo");
    await click("Undo");
    await click("Redo");
    await click("Redo");
    expect(vi.mocked(replayEventHistory).mock.calls).toEqual([
      ["resize", "undo"],
      ["move", "undo"],
      ["move", "redo"],
      ["resize", "redo"],
    ]);
    expect(button("Redo").disabled).toBe(true);
    expect(refetch).toHaveBeenCalledTimes(4);
  });

  it("retains the stack on failure and drops redo after a newly saved change", async () => {
    await act(async () => history.add("first"));
    vi.mocked(replayEventHistory).mockResolvedValueOnce(false);
    await click("Undo");
    expect(button("Undo").disabled).toBe(false);
    expect(button("Redo").disabled).toBe(true);
    expect(refetch).not.toHaveBeenCalled();
    await click("Undo");
    await act(async () => history.add("next"));
    expect(button("Redo").disabled).toBe(true);
    await click("Undo");
    expect(replayEventHistory).toHaveBeenLastCalledWith("next", "undo");
  });

  it("blocks repeated requests until replay finishes", async () => {
    await act(async () => history.add("move"));
    let finish!: (saved: boolean) => void;
    vi.mocked(replayEventHistory).mockImplementationOnce(
      () =>
        new Promise((resolve) => {
          finish = resolve;
        }),
    );
    await act(async () => {
      void history.replay("undo");
      void history.replay("undo");
    });
    expect(button("Undo").disabled).toBe(true);
    expect(replayEventHistory).toHaveBeenCalledOnce();
    await act(async () => finish(true));
    expect(button("Redo").disabled).toBe(false);
  });

  it("supports keyboard shortcuts while preserving text-field undo", async () => {
    await act(async () => history.add("move"));
    const input = container.querySelector("input")!;
    await act(async () =>
      input.dispatchEvent(
        new KeyboardEvent("keydown", { key: "z", ctrlKey: true, bubbles: true, cancelable: true }),
      ),
    );
    expect(replayEventHistory).not.toHaveBeenCalled();
    await act(async () =>
      document.dispatchEvent(
        new KeyboardEvent("keydown", { key: "z", metaKey: true, bubbles: true, cancelable: true }),
      ),
    );
    expect(replayEventHistory).toHaveBeenLastCalledWith("move", "undo");
    await act(async () =>
      document.dispatchEvent(
        new KeyboardEvent("keydown", {
          key: "z",
          metaKey: true,
          shiftKey: true,
          bubbles: true,
          cancelable: true,
        }),
      ),
    );
    expect(replayEventHistory).toHaveBeenLastCalledWith("move", "redo");
  });

  it("clears history when another editor changes an event", async () => {
    await act(async () => history.add("move"));
    await click("Undo");
    await act(async () => window.dispatchEvent(new Event(HISTORY_RESET_EVENT)));
    expect(button("Undo").disabled).toBe(true);
    expect(button("Redo").disabled).toBe(true);
  });
});
