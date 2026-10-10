import type { CalendarCreateDraft } from "@cal/pages/calendar/calendar.create-session";
import { createContext, useContext } from "react";

type AiCreateContextValue = {
  applyAiDraft: (draft: CalendarCreateDraft) => void;
};

export const AiCreateContext = createContext<AiCreateContextValue | null>(null);

export const useAiCreate = (): AiCreateContextValue | null => useContext(AiCreateContext);
