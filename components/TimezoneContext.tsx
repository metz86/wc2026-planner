"use client";

import { createContext, useContext, ReactNode } from "react";
import { usePersistedState } from "@/hooks/usePersistedState";
import { DEFAULT_TIMEZONE } from "@/lib/timeUtils";

interface TimezoneContextType {
  timezone: string;
  setTimezone: (tz: string) => void;
}

const TimezoneContext = createContext<TimezoneContextType | null>(null);

export function TimezoneProvider({ children }: { children: ReactNode }) {
  const [timezone, setTimezone] = usePersistedState("wc26-timezone", DEFAULT_TIMEZONE);

  return (
    <TimezoneContext.Provider value={{ timezone, setTimezone }}>
      {children}
    </TimezoneContext.Provider>
  );
}

export function useTimezone() {
  const ctx = useContext(TimezoneContext);
  if (!ctx) throw new Error("useTimezone must be used within TimezoneProvider");
  return ctx;
}
