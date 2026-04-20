"use client";

import { TournamentProvider } from "@/components/TournamentContext";
import { GroupStage } from "@/components/GroupStage";
import { KnockoutBracket } from "@/components/KnockoutBracket";
import { ThirdPlaceSelector } from "@/components/ThirdPlaceSelector";
import { TeamHighlighter } from "@/components/TeamHighlighter";
import { GroupStageMatches } from "@/components/GroupStageMatches";
import { useTournamentContext } from "@/components/TournamentContext";

function ResetButton() {
  const { reset } = useTournamentContext();
  return (
    <button
      onClick={reset}
      className="px-3 py-1.5 text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 rounded border border-slate-600 transition-colors"
    >
      Reset
    </button>
  );
}

function AppShell({ children }: { children?: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      <header className="border-b border-slate-700/50 bg-slate-900/95 sticky top-0 z-40 backdrop-blur">
        <div className="max-w-[1400px] mx-auto px-4 py-3 flex items-center justify-between flex-wrap gap-3">
          <h1 className="text-xl font-bold tracking-tight">
            <span className="text-emerald-400">WC 2026</span>{" "}
            <span className="text-slate-300">Schedule Planner</span>
          </h1>
          {children && (
            <div className="flex items-center gap-4">
              <TeamHighlighter />
              <ResetButton />
            </div>
          )}
        </div>
      </header>

      <main className="max-w-[1400px] mx-auto px-4 py-6 space-y-6">
        {children ?? (
          <div className="text-sm text-slate-500 animate-pulse">Loading...</div>
        )}
      </main>
    </div>
  );
}

function App() {
  const { state } = useTournamentContext();

  if (!state) {
    return <AppShell />;
  }

  return (
    <AppShell>
      <GroupStage />
      <GroupStageMatches />
      <ThirdPlaceSelector />
      <KnockoutBracket />
    </AppShell>
  );
}

export default function Page() {
  return (
    <TournamentProvider>
      <App />
    </TournamentProvider>
  );
}
