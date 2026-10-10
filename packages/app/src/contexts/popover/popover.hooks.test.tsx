// @vitest-environment jsdom
import { act, useRef } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { usePopoverPosition } from "./popover.hooks";
import type { PopoverLayout } from "./popover.types";

describe("popover viewport and content resizing", () => {
  let content: HTMLDivElement;
  let container: HTMLDivElement;
  let root: Root;
  let height: number;
  let layout: PopoverLayout | undefined;
  let notifyResize: () => void;
  const observe = vi.fn();
  const disconnect = vi.fn();
  const anchor = document.createElement("button");
  const state = { anchor };
  const Harness = () => {
    const bridgeRef = useRef<HTMLDivElement>(null);
    const popoverRef = useRef<HTMLDivElement>(null);
    layout = usePopoverPosition({ state, bridgeRef, popoverRef });
    return (
      <div ref={bridgeRef} data-bridge>
        <div ref={popoverRef} data-popover />
      </div>
    );
  };

  beforeEach(async () => {
    vi.clearAllMocks();
    vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
    vi.stubGlobal(
      "ResizeObserver",
      class {
        constructor(callback: () => void) {
          notifyResize = callback;
        }
        observe = observe;
        disconnect = disconnect;
      },
    );
    vi.spyOn(window, "innerHeight", "get").mockReturnValue(640);
    vi.spyOn(window, "innerWidth", "get").mockReturnValue(1000);
    height = 280;
    vi.spyOn(HTMLElement.prototype, "getBoundingClientRect").mockImplementation(function () {
      if (this === anchor) return new DOMRect(300, 300, 100, 30);
      if (this.id === "content") return new DOMRect(0, 100, 1000, 800);
      if (this.hasAttribute("data-bridge")) return new DOMRect(0, 120, 1000, 800);
      if (this.hasAttribute("data-popover")) return new DOMRect(0, 0, 440, height);
      return new DOMRect();
    });
    content = document.createElement("div");
    content.id = "content";
    container = document.createElement("div");
    content.append(container);
    document.body.append(content);
    root = createRoot(container);
    await act(async () => root.render(<Harness />));
  });

  afterEach(async () => {
    await act(async () => root.unmount());
    content.remove();
    vi.restoreAllMocks();
    vi.unstubAllGlobals();
  });

  it("limits form height to Craft's visible content area beneath the page header", async () => {
    expect(layout?.maxHeight).toBe(522);
    expect(layout?.top).toBe(218);
    height = 480;
    await act(async () => notifyResize());
    // Window position is 152px, below the pane's top plus its 8px margin.
    expect(layout?.top).toBe(32);
    expect(observe).toHaveBeenCalledWith(container.querySelector("[data-popover]"));
  });

  it("repositions on window resize and disconnects when the popup closes", async () => {
    vi.spyOn(window, "innerHeight", "get").mockReturnValue(420);
    await act(async () => window.dispatchEvent(new Event("resize")));
    expect(layout?.maxHeight).toBe(302);
    expect(layout?.top).toBe(12);
    await act(async () => root.render(null));
    expect(disconnect).toHaveBeenCalledOnce();
  });
});
