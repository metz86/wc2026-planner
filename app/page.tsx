"use client";

import { useState } from "react";
import { TournamentProvider } from "@/components/TournamentContext";
import { GroupStage } from "@/components/GroupStage";
import { KnockoutBracket } from "@/components/KnockoutBracket";
import { ThirdPlaceSelector } from "@/components/ThirdPlaceSelector";
import { TeamHighlighter } from "@/components/TeamHighlighter";
import { GroupStageMatches } from "@/components/GroupStageMatches";
import { useTournamentContext } from "@/components/TournamentContext";
import { TimezoneProvider } from "@/components/TimezoneContext";
import { TimezoneSelector } from "@/components/TimezoneSelector";

function ResetButton() {
  const { reset } = useTournamentContext();
  const [showConfirm, setShowConfirm] = useState(false);

  return (
    <>
      <button
        onClick={() => setShowConfirm(true)}
        className="px-3 py-1.5 text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 rounded border border-slate-600 transition-colors"
      >
        Reset
      </button>

      {showConfirm && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm"
          onClick={() => setShowConfirm(false)}
        >
          <div
            className="bg-slate-800 border border-slate-600 rounded-lg p-5 max-w-sm mx-4 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-sm font-bold text-slate-100 mb-2">Reset all changes?</h3>
            <p className="text-xs text-slate-400 mb-4">
              This will reset all group orderings, knockout selections, and third-place picks. This action cannot be undone.
            </p>
            <div className="flex justify-end gap-2">
              <button
                onClick={() => setShowConfirm(false)}
                className="px-3 py-1.5 text-xs bg-slate-700 hover:bg-slate-600 text-slate-300 rounded border border-slate-600 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={() => {
                  reset();
                  setShowConfirm(false);
                }}
                className="px-3 py-1.5 text-xs bg-red-600 hover:bg-red-500 text-white rounded border border-red-500 transition-colors"
              >
                Reset
              </button>
            </div>
          </div>
        </div>
      )}
    </>
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
            <div className="flex items-center gap-2 sm:gap-4 flex-wrap">
              <TimezoneSelector />
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
    <TimezoneProvider>
      <TournamentProvider>
        <App />
      </TournamentProvider>
    </TimezoneProvider>
  );
}
