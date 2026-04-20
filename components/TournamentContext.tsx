"use client";

import { createContext, useContext, ReactNode } from "react";
import { TournamentState } from "@/lib/types";
import { useTournament } from "@/hooks/useTournament";

type TournamentContextType = ReturnType<typeof useTournament>;

// Raw context — state can be null before client init
const TournamentContext = createContext<TournamentContextType | null>(null);

export function TournamentProvider({ children }: { children: ReactNode }) {
  const tournament = useTournament();
  return (
    <TournamentContext.Provider value={tournament}>
      {children}
    </TournamentContext.Provider>
  );
}

// Returns the raw context (state may be null — use in App to check loading)
export function useTournamentContext() {
  const ctx = useContext(TournamentContext);
  if (!ctx) throw new Error("useTournamentContext must be used within TournamentProvider");
  return ctx;
}

// Returns context with guaranteed non-null state — use in child components
// Only safe to call when parent has already checked state !== null
export function useLoadedTournament() {
  const ctx = useTournamentContext();
  return ctx as Omit<TournamentContextType, "state"> & { state: TournamentState };
}
