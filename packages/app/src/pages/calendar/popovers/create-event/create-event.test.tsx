// @vitest-environment jsdom
import { act, useState } from "react";
import { createRoot, type Root } from "react-dom/client";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { PopoverCreateEvent } from "./create-event";

const { createEvent, prepareEvent } = vi.hoisted(() => ({
  createEvent: vi.fn(),
  prepareEvent: vi.fn(async (): Promise<string | null> => null),
}));
vi.mock("./create-event.mutation", () => ({
  useCreateEvent: () => ({
    createEvent,
    prepareEvent,
    error: null as string | null,
    isFetching: false,
    isOpeningEditor: false,
  }),
}));
vi.mock("../../context/config.context", () => ({
  useConfig: () => ({
    calendars: {
      1: "Studio",
      2: "Outdoor",
      3: "Unmapped",
      4: "Description only",
      5: "Shared field",
    },
    quickCreateFields: {
      1: { location: "venue", description: "summary" },
      2: { location: "address" },
      4: { description: "notes" },
      5: { location: "details", description: "details" },
    },
    quickCreateRequiredFields: {
      1: { location: true, description: false },
      2: { location: false },
      4: { description: true },
    },
    formats: {
      date: { short: { icu: "yyyy-MM-dd" } },
      datetime: { short: { icu: "yyyy-MM-dd h:mm a" } },
      time: { short: { icu: "h:mm a" } },
    },
    weekStartDay: 0,
    eventDuration: 60,
    timeInterval: 30,
  }),
}));
// The native selector has its own lifecycle tests; use a select here to exercise calendar changes.
vi.mock("./create-event.calendar-dropdown", () => ({
  CalendarDropdown: ({
    value,
    options,
    onChange,
  }: {
    value: number;
    options: { value: number; label: string }[];
    onChange: (value: number) => void;
  }) => (
    <select
      aria-label="Calendar"
      value={value}
      onChange={(event) => onChange(Number(event.target.value))}
    >
      {options.map((option) => (
        <option key={option.value} value={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  ),
}));
vi.mock("@cal/components/controls/date-picker/date-picker", () => ({
  DatePicker: ({ label, id, required }: { label: string; id: string; required: boolean }) => (
    <div>
      <label htmlFor={id} className={required ? "required" : undefined}>
        {label}
      </label>
      <input id={id} />
    </div>
  ),
  Icon: (): null => null,
}));

const draft = { id: "draft-create-event", title: "Yoga", start: 100, end: 3700, allDay: false };
const Editor = () => {
  const [value, setValue] = useState(draft);
  return (
    <PopoverCreateEvent
      draft={value}
      onChange={setValue}
      refetchEvents={vi.fn()}
      onConfirm={vi.fn()}
      onCancel={vi.fn()}
    />
  );
};

describe("quick-create mapped fields", () => {
  let container: HTMLDivElement;
  let root: Root;

  beforeEach(async () => {
    vi.clearAllMocks();
    vi.stubGlobal("IS_REACT_ACT_ENVIRONMENT", true);
    container = document.createElement("div");
    document.body.append(container);
    root = createRoot(container);
    await act(async () => root.render(<Editor />));
  });

  afterEach(async () => {
    await act(async () => root.unmount());
    container.remove();
    vi.unstubAllGlobals();
  });

  const field = (label: string) => {
    const id = Array.from(container.querySelectorAll("label")).find(
      (item) => item.textContent === label,
    )?.htmlFor;
    return id ? (document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement) : null;
  };
  const chooseCalendar = (value: number) =>
    act(async () => {
      const select = container.querySelector("select")!;
      select.value = String(value);
      select.dispatchEvent(new Event("change", { bubbles: true }));
    });
  const type = (label: string, value: string) =>
    act(async () => {
      const input = field(label)!;
      const prototype =
        input instanceof HTMLTextAreaElement
          ? HTMLTextAreaElement.prototype
          : HTMLInputElement.prototype;
      Object.getOwnPropertyDescriptor(prototype, "value")!.set!.call(input, value);
      input.dispatchEvent(new Event("input", { bubbles: true }));
    });
  const save = () =>
    act(async () => {
      Array.from(container.querySelectorAll("button"))
        .find((button) => button.textContent === "Create Event")!
        .click();
    });

  it("only shows the mapped inputs for the selected calendar", async () => {
    expect(field("Location")).toBeInstanceOf(HTMLInputElement);
    expect(field("Description")).toBeInstanceOf(HTMLTextAreaElement);
    await chooseCalendar(2);
    expect(field("Location")).not.toBeNull();
    expect(field("Description")).toBeNull();
    await chooseCalendar(3);
    expect(field("Location")).toBeNull();
    expect(field("Description")).toBeNull();
    await save();
    expect(createEvent).toHaveBeenLastCalledWith(draft, 3, undefined);
    await chooseCalendar(4);
    expect(field("Location")).toBeNull();
    expect(field("Description")).not.toBeNull();
  });

  it("retains values per calendar and submits only the selected calendar's mapped details", async () => {
    await type("Location", "Studio A");
    await type("Description", "Bring a mat.\nDoors open at 6.");
    await chooseCalendar(2);
    expect(field("Location")!.value).toBe("");
    await type("Location", "Central Park");
    await save();
    expect(createEvent).toHaveBeenLastCalledWith(draft, 2, { location: "Central Park" });
    await chooseCalendar(1);
    expect(field("Location")!.value).toBe("Studio A");
    expect(field("Description")!.value).toBe("Bring a mat.\nDoors open at 6.");
    await save();
    expect(createEvent).toHaveBeenLastCalledWith(draft, 1, {
      location: "Studio A",
      description: "Bring a mat.\nDoors open at 6.",
    });
  });

  it("marks required basic and mapped inputs using Craft's native label styling", async () => {
    const label = (text: string) =>
      Array.from(container.querySelectorAll("label")).find((item) => item.textContent === text)!;
    for (const text of ["Title", "Starts", "Ends", "Location"])
      expect(label(text).classList.contains("required")).toBe(true);
    expect(field("Location")!.getAttribute("aria-required")).toBe("true");
    expect(label("Description").classList.contains("required")).toBe(false);
    await chooseCalendar(2);
    expect(label("Location").classList.contains("required")).toBe(false);
    await chooseCalendar(4);
    expect(label("Description").classList.contains("required")).toBe(true);
    expect(field("Description")!.getAttribute("aria-required")).toBe("true");
  });

  it("hands the selected calendar and entered values to the full editor, allowing incomplete required fields", async () => {
    await type("Description", "Bring a mat.");
    await act(async () =>
      Array.from(container.querySelectorAll("button"))
        .find((button) => button.textContent === "More details…")!
        .click(),
    );
    expect(prepareEvent).toHaveBeenCalledWith(draft, 1, {
      location: "",
      description: "Bring a mat.",
    });
    expect(createEvent).not.toHaveBeenCalled();
  });

  it("keeps both inputs synchronized if both mappings use the same Craft field", async () => {
    await chooseCalendar(5);
    await type("Location", "Shared details");
    expect(field("Description")!.value).toBe("Shared details");
    await type("Description", "Updated details");
    expect(field("Location")!.value).toBe("Updated details");
    await save();
    expect(createEvent).toHaveBeenLastCalledWith(draft, 5, {
      location: "Updated details",
      description: "Updated details",
    });
  });
});
