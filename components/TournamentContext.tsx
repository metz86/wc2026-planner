"use client";

import { createContext, useContext, ReactNode } from "react";
import { useTournament } from "@/hooks/useTournament";

type TournamentContextType = ReturnType<typeof useTournament>;

const TournamentContext = createContext<TournamentContextType | null>(null);

export function TournamentProvider({ children }: { children: ReactNode }) {
  const tournament = useTournament();
  return (
    <TournamentContext.Provider value={tournament}>
      {children}
    </TournamentContext.Provider>
  );
}

export function useTournamentContext() {
  const ctx = useContext(TournamentContext);
  if (!ctx) throw new Error("useTournamentContext must be used within TournamentProvider");
  return ctx;
}
