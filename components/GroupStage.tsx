"use client";

import { GROUP_IDS } from "@/data/groups";
import { GroupCard } from "./GroupCard";
import { usePersistedState } from "@/hooks/usePersistedState";

export function GroupStage() {
  const [collapsed, setCollapsed] = usePersistedState("wc26-groups-collapsed", false);

  return (
    <div>
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="flex items-center gap-2 mb-3 group"
      >
        <span className="text-slate-500 text-xs transition-transform duration-200" style={{ transform: collapsed ? "rotate(-90deg)" : "rotate(0)" }}>
          ▼
        </span>
        <h2 className="text-lg font-bold text-slate-200 group-hover:text-slate-100 transition-colors">
          Group Stage
        </h2>
        <span className="text-xs font-normal text-slate-400">
          {collapsed ? "Click to expand" : "Drag teams to set finishing positions"}
        </span>
      </button>
      {!collapsed && (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-2">
          {GROUP_IDS.map((id) => (
            <GroupCard key={id} groupId={id} />
          ))}
        </div>
      )}
    </div>
  );
}
