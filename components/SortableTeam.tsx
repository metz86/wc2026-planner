"use client";

import { useSortable } from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { ALL_TEAMS } from "@/data/groups";

interface SortableTeamProps {
  teamId: string;
  position: number;
  isHighlighted: boolean;
}

const positionColors = [
  "bg-emerald-500/20 border-emerald-500/40", // 1st - advances
  "bg-emerald-500/10 border-emerald-500/30", // 2nd - advances
  "bg-amber-500/15 border-amber-500/30",     // 3rd - might advance
  "bg-red-500/10 border-red-500/20",         // 4th - eliminated
];

const positionLabels = ["1st", "2nd", "3rd", "4th"];

export function SortableTeam({ teamId, position, isHighlighted }: SortableTeamProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: teamId });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  const team = ALL_TEAMS[teamId];
  if (!team) return null;

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        flex items-center gap-2 px-2 py-1.5 rounded border cursor-grab active:cursor-grabbing
        transition-colors duration-150
        ${positionColors[position]}
        ${isHighlighted ? "ring-2 ring-yellow-400 bg-yellow-400/15 border-yellow-400/50" : ""}
        ${isDragging ? "opacity-50 z-50 shadow-lg" : ""}
      `}
      {...attributes}
      {...listeners}
    >
      <span className="text-[10px] font-bold text-slate-400 w-5 text-center shrink-0">
        {positionLabels[position]}
      </span>
      <span className="text-[11px] text-slate-500 shrink-0">⠿</span>
      <span className="text-sm font-medium text-slate-100 truncate">
        {team.name}
      </span>
    </div>
  );
}
