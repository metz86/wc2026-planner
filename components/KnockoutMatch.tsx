"use client";

import { KnockoutMatch as KnockoutMatchType, GroupId } from "@/lib/types";
import { ALL_TEAMS } from "@/data/groups";
import { KNOCKOUT_SCHEDULE } from "@/data/matches";
import { useLoadedTournament } from "./TournamentContext";
import { useTimezone } from "./TimezoneContext";
import { convertMatchTime } from "@/lib/timeUtils";

interface KnockoutMatchProps {
  match: KnockoutMatchType;
  compact?: boolean;
}

function getSourceLabel(source: KnockoutMatchType["homeSource"]): string {
  switch (source.type) {
    case "group":
      return `${source.position === 1 ? "1" : "2"}${source.group}`;
    case "thirdPlace":
      return `3rd ${source.possibleGroups.join("/")}`;
    case "winner":
      if (source.matchNumber < 0) return `L${Math.abs(source.matchNumber)}`;
      return `W${source.matchNumber}`;
  }
}

function CandidateChips({
  candidates,
  highlighted,
  onClickCandidate,
  onClickArea,
  isAdvanced,
}: {
  candidates: string[];
  highlighted: string | null;
  onClickCandidate: (teamId: string) => void;
  onClickArea: () => void;
  isAdvanced: boolean;
}) {
  return (
    <div
      onClick={onClickArea}
      className={`
        px-1.5 py-1 cursor-pointer transition-colors min-h-[30px]
        ${isAdvanced ? "bg-emerald-500/10 hover:bg-emerald-500/15" : "hover:bg-slate-700/30"}
      `}
    >
      {isAdvanced && (
        <span className="text-emerald-400 text-[9px] mr-1">▶</span>
      )}
      <span className="inline-flex flex-wrap gap-0.5">
        {candidates.map((teamId) => {
          const team = ALL_TEAMS[teamId];
          const isHl = teamId === highlighted;
          return (
            <button
              key={teamId}
              onClick={(e) => {
                e.stopPropagation();
                onClickCandidate(teamId);
              }}
              className={`
                px-1 py-0.5 rounded text-[9px] border transition-colors inline-block
                hover:bg-amber-500/20 hover:border-amber-400/50 hover:text-amber-200
                ${isHl
                  ? "bg-yellow-400/15 border-yellow-400/50 text-yellow-300"
                  : "bg-slate-700/50 border-slate-600/40 text-slate-400"
                }
              `}
              title={team?.name ?? teamId}
            >
              {team?.name ?? teamId}
            </button>
          );
        })}
      </span>
    </div>
  );
}

function TeamSlot({
  teamId,
  source,
  isWinner,
  isAdvanced,
  isHighlighted,
  onClick,
  prefix,
}: {
  teamId: string | null;
  source: KnockoutMatchType["homeSource"];
  isWinner: boolean;
  isAdvanced: boolean;
  isHighlighted: boolean;
  onClick: () => void;
  prefix?: string;
}) {
  const team = teamId ? ALL_TEAMS[teamId] : null;
  const hasTeam = !!team;

  return (
    <button
      onClick={onClick}
      disabled={!hasTeam}
      className={`
        w-full text-left px-2 py-1.5 text-xs flex items-center gap-1.5 transition-colors min-h-[30px]
        ${hasTeam ? "hover:bg-slate-700/40 cursor-pointer" : "cursor-default"}
        ${isAdvanced ? "bg-emerald-500/10" : ""}
        ${isWinner ? "bg-emerald-500/15" : ""}
        ${isHighlighted ? "ring-1 ring-inset ring-yellow-400 bg-yellow-400/10" : ""}
      `}
    >
      {(isAdvanced || isWinner) && (
        <span className="text-emerald-400 text-[10px] shrink-0">▶</span>
      )}
      {prefix && (
        <span className="text-amber-400/70 text-[9px] shrink-0">{prefix}</span>
      )}
      <span
        className={`truncate ${
          isWinner
            ? "text-emerald-300 font-bold"
            : isAdvanced
            ? "text-emerald-200 font-medium"
            : hasTeam
            ? "text-slate-200"
            : "text-slate-500 text-[10px]"
        }`}
      >
        {team?.name ?? getSourceLabel(source)}
      </span>
    </button>
  );
}

export function KnockoutMatchCard({ match, compact }: KnockoutMatchProps) {
  const {
    state,
    advanceSide,
    advanceSpecific,
    clearAdvancement,
    selectThirdPlace,
    clearThirdPlace,
  } = useLoadedTournament();

  const highlighted = state.highlightedTeam;
  const { timezone } = useTimezone();
  const schedule = KNOCKOUT_SCHEDULE[match.matchNumber];
  const converted = schedule
    ? convertMatchTime(schedule.date, schedule.time, timezone)
    : null;
  const w = compact ? "w-[130px]" : "w-[160px]";

  const isR32ThirdPlace =
    match.awaySource.type === "thirdPlace" && !match.selectedThirdPlaceGroup;

  // Compute available third-place candidates for R32 matches
  let r32ThirdCandidates: { groupId: GroupId; teamId: string }[] = [];
  if (match.awaySource.type === "thirdPlace" && !match.selectedThirdPlaceGroup) {
    const possibleGroups = match.awaySource.possibleGroups;
    const qualifying = possibleGroups.filter((g) =>
      state.qualifyingThirdGroups.includes(g)
    );
    const otherSelections = new Set(
      Object.entries(state.thirdPlaceSelections)
        .filter(([mn]) => Number(mn) !== match.matchNumber)
        .map(([, g]) => g)
    );
    r32ThirdCandidates = qualifying
      .filter((g) => !otherSelections.has(g))
      .map((g) => ({
        groupId: g as GroupId,
        teamId: state.groups[g]?.teams[2] ?? "",
      }))
      .filter((c) => c.teamId);
  }

  // Determine what each slot shows
  const homeIsAdvanced = match.advancedSide === "home";
  const awayIsAdvanced = match.advancedSide === "away";
  const homeIsWinner = match.winnerId !== null && match.winnerId === match.homeTeamId;
  const awayIsWinner = match.winnerId !== null && match.winnerId === match.awayTeamId;

  function handleClickHome() {
    if (!match.homeTeamId && !match.homeCandidates?.length) return;

    if (match.homeTeamId) {
      // Specific team — toggle as winner
      if (match.winnerId === match.homeTeamId) {
        // Already specific winner, clear to generic
        advanceSide(match.matchNumber, "home");
      } else {
        advanceSpecific(match.matchNumber, match.homeTeamId, "home");
      }
    } else if (match.homeCandidates?.length) {
      // Candidates — advance generically
      if (homeIsAdvanced) {
        clearAdvancement(match.matchNumber);
      } else {
        advanceSide(match.matchNumber, "home");
      }
    }
  }

  function handleClickAway() {
    if (!match.awayTeamId && !match.awayCandidates?.length) return;

    if (match.awayTeamId) {
      if (match.winnerId === match.awayTeamId) {
        advanceSide(match.matchNumber, "away");
      } else {
        advanceSpecific(match.matchNumber, match.awayTeamId, "away");
      }
    } else if (match.awayCandidates?.length) {
      if (awayIsAdvanced) {
        clearAdvancement(match.matchNumber);
      } else {
        advanceSide(match.matchNumber, "away");
      }
    }
  }

  function handleClickCandidateInChips(teamId: string, side: "home" | "away") {
    advanceSpecific(match.matchNumber, teamId, side);
  }

  function handleClickR32Candidate(groupId: GroupId, teamId: string) {
    selectThirdPlace(match.matchNumber, groupId);
    advanceSpecific(match.matchNumber, teamId, "away");
  }

  function handleAreaClickR32Third() {
    if (awayIsAdvanced && !match.winnerId) {
      clearAdvancement(match.matchNumber);
    } else {
      advanceSide(match.matchNumber, "away");
    }
  }

  function handleResetThirdPlace() {
    clearThirdPlace(match.matchNumber);
  }

  // ── Render ──

  return (
    <div
      className={`bg-slate-800/90 border border-slate-700/50 rounded ${w} shrink-0 overflow-hidden shadow-sm`}
    >
      {/* Header */}
      <div className="px-2 py-0.5 bg-slate-700/40 border-b border-slate-600/30 flex items-center justify-between">
        <span className="text-[9px] font-bold text-slate-400">
          M{match.matchNumber}
        </span>
        {converted && (
          <span className="text-[8px] text-slate-500">
            {converted.day} {converted.date} {converted.time}
          </span>
        )}
      </div>

      {/* HOME SLOT */}
      {match.homeCandidates && !match.homeTeamId ? (
        <div className="border-b border-slate-700/30">
          <CandidateChips
            candidates={match.homeCandidates}
            highlighted={highlighted}
            onClickCandidate={(t) => handleClickCandidateInChips(t, "home")}
            onClickArea={handleClickHome}
            isAdvanced={homeIsAdvanced}
          />
        </div>
      ) : (
        <div className="border-b border-slate-700/30">
          <TeamSlot
            teamId={match.homeTeamId}
            source={match.homeSource}
            isWinner={homeIsWinner}
            isAdvanced={homeIsAdvanced && !homeIsWinner}
            isHighlighted={match.homeTeamId === highlighted && highlighted !== null}
            onClick={handleClickHome}
          />
        </div>
      )}

      {/* AWAY SLOT */}
      {isR32ThirdPlace ? (
        // R32 with unresolved third-place: show group-labeled candidates
        <CandidateChips
          candidates={r32ThirdCandidates.map((c) => c.teamId)}
          highlighted={highlighted}
          onClickCandidate={(teamId) => {
            const c = r32ThirdCandidates.find((x) => x.teamId === teamId);
            if (c) handleClickR32Candidate(c.groupId, c.teamId);
          }}
          onClickArea={handleAreaClickR32Third}
          isAdvanced={awayIsAdvanced}
        />
      ) : match.awaySource.type === "thirdPlace" && match.selectedThirdPlaceGroup ? (
        // R32 with resolved third-place
        <div className="flex items-center">
          <div className="flex-1">
            <TeamSlot
              teamId={match.awayTeamId}
              source={match.awaySource}
              isWinner={awayIsWinner}
              isAdvanced={awayIsAdvanced && !awayIsWinner}
              isHighlighted={match.awayTeamId === highlighted && highlighted !== null}
              onClick={handleClickAway}
              prefix={`3${match.selectedThirdPlaceGroup}`}
            />
          </div>
          <button
            onClick={handleResetThirdPlace}
            className="text-slate-500 hover:text-slate-300 px-1.5 py-1.5 text-[10px] shrink-0"
            title="Change third-place opponent"
          >
            ↻
          </button>
        </div>
      ) : match.awayCandidates && !match.awayTeamId ? (
        // Downstream match with propagated candidates
        <CandidateChips
          candidates={match.awayCandidates}
          highlighted={highlighted}
          onClickCandidate={(t) => handleClickCandidateInChips(t, "away")}
          onClickArea={handleClickAway}
          isAdvanced={awayIsAdvanced}
        />
      ) : (
        <TeamSlot
          teamId={match.awayTeamId}
          source={match.awaySource}
          isWinner={awayIsWinner}
          isAdvanced={awayIsAdvanced && !awayIsWinner}
          isHighlighted={match.awayTeamId === highlighted && highlighted !== null}
          onClick={handleClickAway}
        />
      )}
    </div>
  );
}
