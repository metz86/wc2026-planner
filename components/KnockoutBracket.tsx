"use client";

import { useLoadedTournament } from "./TournamentContext";
import { KnockoutMatchCard } from "./KnockoutMatch";

// Bracket paths: left side feeds SF101 → Final, right side feeds SF102 → Final
const LEFT_R32 = [73, 76, 75, 78, 83, 84, 81, 82];
const LEFT_R16 = [89, 90, 93, 94];
const LEFT_QF = [97, 98];
const LEFT_SF = [101];

const RIGHT_R32 = [74, 77, 79, 80, 86, 87, 85, 88];
const RIGHT_R16 = [91, 92, 95, 96];
const RIGHT_QF = [99, 100];
const RIGHT_SF = [102];

function BracketRound({
  matchNumbers,
  gap,
  label,
}: {
  matchNumbers: number[];
  gap: number;
  label: string;
}) {
  const { state } = useLoadedTournament();

  return (
    <div className="flex flex-col items-center shrink-0">
      <div className="text-[9px] font-bold text-slate-500 mb-2 tracking-wider uppercase whitespace-nowrap">
        {label}
      </div>
      <div className="flex flex-col justify-around flex-1" style={{ gap: `${gap}px` }}>
        {matchNumbers.map((mn) => (
          <KnockoutMatchCard key={mn} match={state.knockout[mn]} compact />
        ))}
      </div>
    </div>
  );
}

function BracketConnector({ pairs }: { pairs: number }) {
  // Each "pair" is two matches merging into one — draw bracket lines
  const pairHeight = 100 / pairs;
  return (
    <div className="w-5 shrink-0 self-stretch relative" style={{ marginTop: "18px" }}>
      {Array.from({ length: pairs }).map((_, i) => {
        const top = `${i * pairHeight + pairHeight * 0.25}%`;
        const height = `${pairHeight * 0.5}%`;
        return (
          <div
            key={i}
            className="absolute left-0 right-0 border-t border-b border-r border-slate-600/40 rounded-r-sm"
            style={{ top, height }}
          />
        );
      })}
    </div>
  );
}

function BracketConnectorLeft({ pairs }: { pairs: number }) {
  const pairHeight = 100 / pairs;
  return (
    <div className="w-5 shrink-0 self-stretch relative" style={{ marginTop: "18px" }}>
      {Array.from({ length: pairs }).map((_, i) => {
        const top = `${i * pairHeight + pairHeight * 0.25}%`;
        const height = `${pairHeight * 0.5}%`;
        return (
          <div
            key={i}
            className="absolute left-0 right-0 border-t border-b border-l border-slate-600/40 rounded-l-sm"
            style={{ top, height }}
          />
        );
      })}
    </div>
  );
}

export function KnockoutBracket() {
  const { state } = useLoadedTournament();

  if (!state.knockout[104]) return null;

  return (
    <div>
      <h2 className="text-lg font-bold text-slate-200 mb-1">Knockout Stage</h2>
      <p className="text-xs text-slate-400 mb-4">
        Click a team to advance them. For 3rd-place slots, click a candidate to select &amp; advance.
      </p>

      <div className="overflow-x-auto pb-4">
        <div className="flex items-stretch min-w-max" style={{ minHeight: "720px" }}>
          {/* ── LEFT HALF ── */}
          <BracketRound matchNumbers={LEFT_R32} gap={4} label="R32" />
          <BracketConnector pairs={4} />
          <BracketRound matchNumbers={LEFT_R16} gap={52} label="R16" />
          <BracketConnector pairs={2} />
          <BracketRound matchNumbers={LEFT_QF} gap={168} label="QF" />
          <BracketConnector pairs={1} />
          <BracketRound matchNumbers={LEFT_SF} gap={0} label="SF" />

          {/* ── CENTER: Final + 3rd ── */}
          <div className="flex flex-col items-center justify-center shrink-0 mx-4 gap-8">
            <div className="flex flex-col items-center">
              <div className="text-[10px] font-extrabold text-amber-400 mb-2 tracking-wider uppercase">
                Final
              </div>
              <KnockoutMatchCard match={state.knockout[104]} />
            </div>
            <div className="flex flex-col items-center">
              <div className="text-[9px] font-bold text-slate-500 mb-2 tracking-wider uppercase">
                3rd Place
              </div>
              <KnockoutMatchCard match={state.knockout[103]} compact />
            </div>
          </div>

          {/* ── RIGHT HALF (mirrored) ── */}
          <BracketRound matchNumbers={RIGHT_SF} gap={0} label="SF" />
          <BracketConnectorLeft pairs={1} />
          <BracketRound matchNumbers={RIGHT_QF} gap={168} label="QF" />
          <BracketConnectorLeft pairs={2} />
          <BracketRound matchNumbers={RIGHT_R16} gap={52} label="R16" />
          <BracketConnectorLeft pairs={4} />
          <BracketRound matchNumbers={RIGHT_R32} gap={4} label="R32" />
        </div>
      </div>
    </div>
  );
}
