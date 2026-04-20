"use client";

import { GroupId } from "@/lib/types";
import { GROUP_IDS, ALL_TEAMS } from "@/data/groups";
import { useLoadedTournament } from "./TournamentContext";

export function ThirdPlaceSelector() {
  const { state, setQualifyingThird } = useLoadedTournament();
  const qualifying = state.qualifyingThirdGroups;

  function toggleGroup(groupId: GroupId) {
    if (qualifying.includes(groupId)) {
      // Remove it
      setQualifyingThird(qualifying.filter((g) => g !== groupId) as GroupId[]);
    } else {
      // Add it
      setQualifyingThird([...qualifying, groupId].sort() as GroupId[]);
    }
  }

  return (
    <div className="bg-slate-800/60 rounded-lg border border-slate-700/50 p-3">
      <div className="flex items-center gap-2 mb-2 flex-wrap">
        <h3 className="text-xs font-bold text-slate-400 tracking-wider uppercase">
          3rd Place Qualifiers
        </h3>
        <span className="text-[10px] text-slate-500">
          (Select 8 of 12 groups whose 3rd-place teams advance to R32)
        </span>
        <span className={`text-[10px] font-bold ${qualifying.length === 8 ? "text-emerald-400" : "text-amber-400"}`}>
          {qualifying.length}/8
        </span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        {GROUP_IDS.map((groupId) => {
          const thirdTeamId = state.groups[groupId].teams[2];
          const thirdTeam = thirdTeamId ? ALL_TEAMS[thirdTeamId] : null;
          const isSelected = qualifying.includes(groupId);

          return (
            <button
              key={groupId}
              onClick={() => toggleGroup(groupId)}
              className={`
                flex items-center gap-1 px-2 py-1 rounded text-[11px] border transition-colors
                ${isSelected
                  ? "bg-amber-500/15 border-amber-500/40 text-amber-300"
                  : "bg-slate-700/30 border-slate-600/30 text-slate-500 hover:border-slate-500"
                }
              `}
            >
              <span className="font-bold">{groupId}:</span>
              <span className="truncate max-w-[70px]">{thirdTeam?.name ?? "?"}</span>
            </button>
          );
        })}
      </div>
      {qualifying.length !== 8 && (
        <p className="text-[10px] text-amber-400 mt-1">
          Select exactly 8 groups. Currently {qualifying.length} selected.
        </p>
      )}
    </div>
  );
}
