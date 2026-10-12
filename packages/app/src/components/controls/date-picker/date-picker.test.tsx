// @vitest-environment jsdom
import { act } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { DatePicker } from "./date-picker";

describe("date picker in scrolling forms", () => {
  let container: HTMLDivElement;
  let root: Root;
  const change = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
    container = document.createElement("div");
    container.style.overflow = "auto";
    document.body.append(container);
    root = createRoot(container);
  });

  afterEach(async () => {
    await act(async () => root.unmount());
    container.remove();
    vi.unstubAllGlobals();
  });

  const open = async (portal: boolean) => {
    await act(async () => {
      root.render(
        <DatePicker
          id="test-start"
          label="Starts"
          value={Date.UTC(2026, 10, 5) / 1000}
          portal={portal}
          onChange={change}
        />,
      );
    });
    await act(async () => container.querySelector("input")!.click());
  };

  it("opens outside the scroll region, selects a date, and removes its portal when closed", async () => {
    await open(true);
    expect(container.querySelector(".react-datepicker")).toBeNull();
    expect(document.body.querySelector(".react-datepicker")).not.toBeNull();
    await act(async () =>
      (
        document.body.querySelector(
          ".react-datepicker__day--006:not(.react-datepicker__day--outside-month)",
        ) as HTMLElement
      ).click(),
    );
    expect(change).toHaveBeenCalledWith(Date.UTC(2026, 10, 6) / 1000);
    expect(document.body.querySelector(".react-datepicker")).toBeNull();
    expect(document.body.children).toHaveLength(1);
  });

  it("keeps other date pickers inline unless portal rendering is requested", async () => {
    await open(false);
    expect(container.querySelector(".react-datepicker")).not.toBeNull();
    expect(document.body.children).toHaveLength(1);
  });

  it("cleans up an open date picker when the form is dismissed", async () => {
    await open(true);
    await act(async () => root.render(null));
    expect(document.body.querySelector(".react-datepicker")).toBeNull();
    expect(document.body.children).toHaveLength(1);
  });
});
