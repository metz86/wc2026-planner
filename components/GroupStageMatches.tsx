"use client";

import { GROUP_MATCHES } from "@/data/matches";
import { ALL_TEAMS } from "@/data/groups";
import { useTournamentContext } from "./TournamentContext";
import { usePersistedState } from "@/hooks/usePersistedState";

export function GroupStageMatches() {
  const { state } = useTournamentContext();
  const highlighted = state.highlightedTeam;
  const [collapsed, setCollapsed] = usePersistedState("wc26-matches-collapsed", true);
  const [collapsedMDs, setCollapsedMDs] = usePersistedState<Record<number, boolean>>("wc26-matches-mds-collapsed", {});

  const toggleMD = (md: number) =>
    setCollapsedMDs((prev) => ({ ...prev, [md]: !prev[md] }));

  const byMatchday = [1, 2, 3].map((md) => {
    const matches = GROUP_MATCHES.filter((m) => m.matchday === md);
    const byDate: Record<string, typeof matches> = {};
    for (const m of matches) {
      const key = `${m.day} ${m.date}`;
      if (!byDate[key]) byDate[key] = [];
      byDate[key].push(m);
    }
    return { matchday: md, byDate };
  });

  return (
    <div>
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center gap-2 mb-3 group"
      >
        <span
          className="text-slate-500 text-xs transition-transform duration-200"
          style={{ transform: collapsed ? "rotate(-90deg)" : "rotate(0)" }}
        >
          ▼
        </span>
        <h2 className="text-lg font-bold text-slate-200 group-hover:text-slate-100 transition-colors">
          Group Stage Matches
        </h2>
        <span className="text-xs font-normal text-slate-400">
          {collapsed ? "Click to expand" : "All times UTC+2"}
        </span>
      </button>

      {!collapsed && (
        <div className="space-y-4">
          {byMatchday.map(({ matchday, byDate }) => {
            const mdCollapsed = collapsedMDs[matchday] ?? false;
            return (
              <div key={matchday}>
                <button
                  onClick={() => toggleMD(matchday)}
                  className="flex items-center gap-2 mb-2 group"
                >
                  <span
                    className="text-slate-500 text-[10px] transition-transform duration-200"
                    style={{ transform: mdCollapsed ? "rotate(-90deg)" : "rotate(0)" }}
                  >
                    ▼
                  </span>
                  <h3 className="text-sm font-bold text-slate-400 uppercase tracking-wider group-hover:text-slate-300 transition-colors">
                    Matchday {matchday}
                  </h3>
                  <span className="text-[10px] text-slate-500">
                    ({Object.values(byDate).flat().length} matches)
                  </span>
                </button>

                {!mdCollapsed && (
                  <div className="space-y-2">
                    {Object.entries(byDate).map(([dateKey, matches]) => (
                      <div key={dateKey} className="bg-slate-800/60 rounded-lg border border-slate-700/50 overflow-hidden">
                        <div className="px-3 py-1 bg-slate-700/30 border-b border-slate-600/30">
                          <span className="text-xs font-bold text-slate-400">{dateKey}</span>
                        </div>
                        <div className="divide-y divide-slate-700/20">
                          {matches.map((m, i) => {
                            const homeTeam = ALL_TEAMS[m.home];
                            const awayTeam = ALL_TEAMS[m.away];
                            const homeHighlight = m.home === highlighted;
                            const awayHighlight = m.away === highlighted;
                            const anyHighlight = homeHighlight || awayHighlight;

                            return (
                              <div
                                key={i}
                                className={`
                                  flex items-center gap-2 px-3 py-1 text-xs
                                  ${anyHighlight ? "bg-yellow-400/10" : ""}
                                `}
                              >
                                <span className="text-slate-500 w-10 shrink-0 text-right">{m.time}</span>
                                <span className="text-slate-600 shrink-0">|</span>
                                <span className="w-5 shrink-0 text-center font-bold text-[10px] text-slate-500">
                                  {m.group}
                                </span>
                                <span className={`flex-1 text-right truncate ${homeHighlight ? "text-yellow-300 font-bold" : "text-slate-300"}`}>
                                  {homeTeam?.name ?? m.home}
                                </span>
                                <span className="text-slate-600 px-1">v</span>
                                <span className={`flex-1 truncate ${awayHighlight ? "text-yellow-300 font-bold" : "text-slate-300"}`}>
                                  {awayTeam?.name ?? m.away}
                                </span>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
