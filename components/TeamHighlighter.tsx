"use client";

import { useState, useRef, useEffect } from "react";
import { ALL_TEAMS } from "@/data/groups";
import { useTournamentContext } from "./TournamentContext";

const teamList = Object.values(ALL_TEAMS).sort((a, b) => a.name.localeCompare(b.name));

export function TeamHighlighter() {
  const { state, highlightTeam } = useTournamentContext();
  const [search, setSearch] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  const selectedTeam = state.highlightedTeam ? ALL_TEAMS[state.highlightedTeam] : null;

  const filtered = search
    ? teamList.filter((t) => t.name.toLowerCase().includes(search.toLowerCase()))
    : teamList;

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div ref={ref} className="relative">
      <div className="flex items-center gap-2">
        <label className="text-xs text-slate-400 font-medium">Highlight:</label>
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center gap-2 px-3 py-1.5 bg-slate-800 border border-slate-600 rounded text-sm text-slate-200 hover:border-slate-500 transition-colors min-w-[160px]"
        >
          {selectedTeam ? (
            <span className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-yellow-400" />
              {selectedTeam.name}
            </span>
          ) : (
            <span className="text-slate-400">Select team...</span>
          )}
        </button>
        {selectedTeam && (
          <button
            onClick={() => {
              highlightTeam(null);
              setSearch("");
            }}
            className="text-xs text-slate-400 hover:text-slate-200 px-1"
          >
            ✕
          </button>
        )}
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 mt-1 w-64 bg-slate-800 border border-slate-600 rounded-lg shadow-xl z-50 overflow-hidden">
          <div className="p-2 border-b border-slate-700">
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search teams..."
              className="w-full px-2 py-1 bg-slate-900 border border-slate-600 rounded text-sm text-slate-200 placeholder-slate-500 outline-none focus:border-blue-500"
              autoFocus
            />
          </div>
          <div className="max-h-60 overflow-y-auto">
            {filtered.map((team) => (
              <button
                key={team.id}
                onClick={() => {
                  highlightTeam(team.id);
                  setIsOpen(false);
                  setSearch("");
                }}
                className={`
                  w-full text-left px-3 py-1.5 text-sm hover:bg-slate-700/50 transition-colors
                  flex items-center justify-between
                  ${state.highlightedTeam === team.id ? "bg-yellow-400/10 text-yellow-300" : "text-slate-300"}
                `}
              >
                <span>{team.name}</span>
                <span className="text-[10px] text-slate-500">Group {team.group}</span>
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
