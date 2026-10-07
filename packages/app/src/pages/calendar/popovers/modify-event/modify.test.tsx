// @vitest-environment jsdom
import { PopoverProvider, usePopover } from "@cal/contexts/popover/popover.context";
import { act, type FC } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PopoverModifyEvent } from "./modify";

let popover: ReturnType<typeof usePopover>;

const PopoverControls: FC = () => {
  popover = usePopover();

  return null;
};

describe("modify event prompt", () => {
  let container: HTMLDivElement;
  let root: Root;

  const showPrompt = (props: { onSelect?: () => Promise<boolean>; onCancel: () => void }) =>
    act(async () =>
      popover.showPopover(
        <PopoverModifyEvent
          action="move"
          onSelect={props.onSelect ?? (async () => true)}
          onCancel={props.onCancel}
        />,
        container,
      ),
    );

  const clickButton = (label: string) =>
    act(async () =>
      Array.from(container.querySelectorAll("button"))
        .find((button) => button.textContent === label)!
        .click(),
    );

  beforeEach(async () => {
    vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
    container = document.createElement("div");
    document.body.append(container);
    root = createRoot(container);

    await act(async () =>
      root.render(
        <PopoverProvider>
          <PopoverControls />
        </PopoverProvider>,
      ),
    );
  });

  afterEach(async () => {
    await act(async () => root.unmount());
    container.remove();
    vi.unstubAllGlobals();
  });

  it("cancels the change when another popover replaces it", async () => {
    const onCancel = vi.fn();
    await showPrompt({ onCancel });

    await act(async () => popover.showPopover(<p>Another event</p>, container));

    expect(onCancel).toHaveBeenCalledOnce();
  });

  it("cancels the change once from its Cancel button", async () => {
    const onCancel = vi.fn();
    await showPrompt({ onCancel });

    await clickButton("Cancel");

    expect(onCancel).toHaveBeenCalledOnce();
    expect(container.textContent).not.toContain("You are moving an event.");
  });

  it("closes without cancelling once the change is made", async () => {
    const onCancel = vi.fn();
    const onSelect = vi.fn(async () => true);
    await showPrompt({ onSelect, onCancel });

    await clickButton("This and following");

    expect(onSelect).toHaveBeenCalledWith("following");
    expect(container.textContent).not.toContain("You are moving an event.");
    expect(onCancel).not.toHaveBeenCalled();
  });

  it("stays open when the change fails", async () => {
    const onCancel = vi.fn();
    await showPrompt({ onSelect: async () => false, onCancel });

    await clickButton("All occurrences");

    expect(container.textContent).toContain("You are moving an event.");
    expect(onCancel).not.toHaveBeenCalled();
  });
});
