"use client";

import { useId } from "react";
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  TouchSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from "@dnd-kit/core";
import {
  SortableContext,
  sortableKeyboardCoordinates,
  verticalListSortingStrategy,
  arrayMove,
} from "@dnd-kit/sortable";
import { GroupId } from "@/lib/types";
import { ALL_TEAMS } from "@/data/groups";
import { useTournamentContext } from "./TournamentContext";
import { SortableTeam } from "./SortableTeam";
import { usePersistedState } from "@/hooks/usePersistedState";

interface GroupCardProps {
  groupId: GroupId;
}

export function GroupCard({ groupId }: GroupCardProps) {
  const { state, reorderGroup } = useTournamentContext();
  const group = state.groups[groupId];
  const highlightedTeam = state.highlightedTeam;
  const [collapsed, setCollapsed] = usePersistedState(`wc26-group-${groupId}-collapsed`, false);
  const dndId = useId();

  const sensors = useSensors(
    useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
    useSensor(TouchSensor, { activationConstraint: { delay: 200, tolerance: 5 } }),
    useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
  );

  function handleDragEnd(event: DragEndEvent) {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = group.teams.indexOf(active.id as string);
    const newIndex = group.teams.indexOf(over.id as string);
    const newOrder = arrayMove(group.teams, oldIndex, newIndex);
    reorderGroup(groupId, newOrder);
  }

  return (
    <div className="bg-slate-800/80 rounded-lg border border-slate-700/50 overflow-hidden">
      <button
        onClick={() => setCollapsed(!collapsed)}
        className="w-full px-3 py-1.5 bg-slate-700/50 border-b border-slate-600/50 flex items-center justify-between hover:bg-slate-700/70 transition-colors"
      >
        <h3 className="text-xs font-bold text-slate-300 tracking-wider">
          GROUP {groupId}
        </h3>
        {collapsed ? (
          <span className="text-[10px] text-slate-500 truncate ml-1">
            {group.teams.map((t) => ALL_TEAMS[t]?.name?.slice(0, 3).toUpperCase()).join(" · ")}
          </span>
        ) : (
          <span className="text-slate-500 text-[10px]">▼</span>
        )}
      </button>
      {!collapsed && (
        <div className="p-1.5 space-y-1">
          <DndContext
            id={dndId}
            sensors={sensors}
            collisionDetection={closestCenter}
            onDragEnd={handleDragEnd}
          >
            <SortableContext items={group.teams} strategy={verticalListSortingStrategy}>
              {group.teams.map((teamId, index) => (
                <SortableTeam
                  key={teamId}
                  teamId={teamId}
                  position={index}
                  isHighlighted={teamId === highlightedTeam}
                />
              ))}
            </SortableContext>
          </DndContext>
        </div>
      )}
    </div>
  );
}
