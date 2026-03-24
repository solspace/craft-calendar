import { type RefObject, useEffect } from "react";

export const useCloseOnOutsideInteraction = (
  isOpen: boolean,
  refs: Array<RefObject<HTMLElement | null>>,
  onClose: () => void,
) => {
  useEffect(() => {
    if (!isOpen) {
      return undefined;
    }

    const closeOnMouseDown = (event: MouseEvent) => {
      const target = event.target as Node | null;

      if (refs.some((ref) => ref.current?.contains(target))) {
        return;
      }

      onClose();
    };

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    window.addEventListener("mousedown", closeOnMouseDown);
    window.addEventListener("keydown", closeOnEscape);

    return () => {
      window.removeEventListener("mousedown", closeOnMouseDown);
      window.removeEventListener("keydown", closeOnEscape);
    };
  }, [isOpen, onClose, refs]);
};
