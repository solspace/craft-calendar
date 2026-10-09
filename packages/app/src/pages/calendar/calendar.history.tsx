import translate from "@cal/utils/translations";
import { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { replayEventHistory } from "./calendar.events";

const MAX_HISTORY = 50;
export const HISTORY_RESET_EVENT = "calendar:schedule-history-reset";

export const useCalendarHistory = (refetchEvents: () => void) => {
  const [past, setPast] = useState<string[]>([]);
  const [future, setFuture] = useState<string[]>([]);
  const [busy, setBusy] = useState(false);
  const busyRef = useRef(false);

  const clear = useCallback(() => {
    setPast([]);
    setFuture([]);
  }, []);
  useEffect(() => {
    window.addEventListener(HISTORY_RESET_EVENT, clear);
    return () => window.removeEventListener(HISTORY_RESET_EVENT, clear);
  }, [clear]);

  const add = useCallback((token: string) => {
    setPast((entries) => [...entries, token].slice(-MAX_HISTORY));
    setFuture([]);
  }, []);

  const run = useCallback(async (action: () => Promise<boolean>): Promise<boolean> => {
    if (busyRef.current) return false;
    busyRef.current = true;
    setBusy(true);
    try {
      return await action();
    } finally {
      busyRef.current = false;
      setBusy(false);
    }
  }, []);

  const replay = useCallback(
    async (direction: "undo" | "redo") => {
      const entries = direction === "undo" ? past : future;
      const token = entries.at(-1);
      if (!token) return;
      await run(async () => {
        if (!(await replayEventHistory(token, direction))) return false;
        if (direction === "undo") {
          setPast((entries) => entries.slice(0, -1));
          setFuture((entries) => [...entries, token]);
        } else {
          setFuture((entries) => entries.slice(0, -1));
          setPast((entries) => [...entries, token]);
        }
        refetchEvents();
        return true;
      });
    },
    [past, future, run, refetchEvents],
  );

  return { add, run, replay, clear, busy, canUndo: past.length > 0, canRedo: future.length > 0 };
};

// Freeform 5.17's history controls, including the original arrow geometry and Craft spacing tokens.
const HistoryControls = styled.div`
  display: flex;
  align-items: center;
  overflow: hidden;
  border-radius: var(--medium-border-radius, 4px);
  background: #c4cfe1;
`;
const HistoryButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 39px;
  height: 34px;
  padding: 0;
  border: 0;
  background: #c4cfe1;
  color: #5a6875;
  cursor: pointer;
  & + & { border-left: 1px solid #e3ecfb; }
  &:hover:not(:disabled) { background: #b5c4d8; }
  &:active:not(:disabled) { background: #a6b4c9; }
  &:focus-visible { outline: 2px solid currentColor; outline-offset: -2px; }
  &:disabled { background: #d5dfeb; color: #a0aab4; cursor: default; }
`;

export const CalendarHistory = ({
  canUndo,
  canRedo,
  disabled,
  onReplay,
}: {
  canUndo: boolean;
  canRedo: boolean;
  disabled: boolean;
  onReplay: (direction: "undo" | "redo") => void;
}) => {
  useEffect(() => {
    const handleKey = (event: KeyboardEvent) => {
      if (disabled || event.defaultPrevented || event.altKey || !(event.metaKey || event.ctrlKey))
        return;
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        target.closest(
          "input, textarea, select, [contenteditable]:not([contenteditable=false]), [role=textbox]",
        )
      )
        return;
      if (document.querySelector(".modal:not(.hidden), .cp-screen-slideout:not(.hidden)")) return;
      const key = event.key.toLowerCase();
      const direction =
        key === "z"
          ? event.shiftKey
            ? "redo"
            : "undo"
          : key === "y" && event.ctrlKey
            ? "redo"
            : null;
      if (!direction || !(direction === "undo" ? canUndo : canRedo)) return;
      event.preventDefault();
      onReplay(direction);
    };
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [canUndo, canRedo, disabled, onReplay]);

  return (
    <HistoryControls role="group" aria-label={translate("Event history")}>
      {(["undo", "redo"] as const).map((direction) => (
        <HistoryButton
          key={direction}
          type="button"
          disabled={disabled || !(direction === "undo" ? canUndo : canRedo)}
          title={translate(direction === "undo" ? "Undo" : "Redo")}
          aria-label={translate(direction === "undo" ? "Undo" : "Redo")}
          onClick={() => onReplay(direction)}
        >
          <svg viewBox="0 0 96 80" width="18" height="16" aria-hidden="true" focusable="false">
            <g transform={direction === "redo" ? "translate(96 0) scale(-1 1)" : undefined}>
              <path
                fill="currentColor"
                d="M37 1 1 30l36 29V41h18c15 0 23 8 23 22 0 6-2 11-5 16 12-8 19-19 19-31 0-20-14-31-37-31H37V1Z"
              />
            </g>
          </svg>
        </HistoryButton>
      ))}
    </HistoryControls>
  );
};
