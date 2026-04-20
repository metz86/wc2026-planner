import { GroupId } from "@/lib/types";

// For the 2026 World Cup with 12 groups, 8 best third-place teams qualify for the R32.
// Each R32 slot that accepts a third-place team has a list of possible source groups.
// This resolver uses a greedy approach: iterate R32 slots in order, assign the first
// available qualifying third-place team from the slot's possible groups list.

// Match number -> list of possible groups (in priority order) for 3rd place allocation
export const THIRD_PLACE_SLOTS: Record<number, GroupId[]> = {
  75: ["A", "B", "C", "D", "F"],       // 1E v 3rd
  78: ["C", "D", "F", "G", "H"],       // 1I v 3rd
  79: ["C", "E", "F", "H", "I"],       // 1A v 3rd
  80: ["E", "H", "I", "J", "K"],       // 1L v 3rd
  81: ["A", "E", "H", "I", "J"],       // 1G v 3rd
  82: ["B", "E", "F", "I", "J"],       // 1D v 3rd
  85: ["E", "F", "G", "I", "J"],       // 1B v 3rd
  88: ["D", "E", "I", "J", "L"],       // 1K v 3rd
};

/**
 * Given which 8 groups' third-place teams qualify, allocate them to R32 slots.
 * Returns a mapping from match number to the group whose 3rd place team fills that slot.
 */
export function allocateThirdPlaceTeams(
  qualifyingGroups: GroupId[]
): Record<number, GroupId> {
  const available = new Set(qualifyingGroups);
  const allocation: Record<number, GroupId> = {};

  // Process slots in a specific order to minimize conflicts
  // We process slots with fewer options first (most constrained first)
  const slotEntries = Object.entries(THIRD_PLACE_SLOTS)
    .map(([mn, groups]) => ({
      matchNumber: Number(mn),
      possibleGroups: groups.filter((g) => available.has(g)),
    }))
    .sort((a, b) => a.possibleGroups.length - b.possibleGroups.length);

  const assigned = new Set<GroupId>();

  // Greedy assignment with most-constrained-first heuristic
  function solve(remaining: typeof slotEntries): boolean {
    if (remaining.length === 0) return true;

    const [current, ...rest] = remaining;
    const candidates = current.possibleGroups.filter((g) => !assigned.has(g));

    for (const group of candidates) {
      assigned.add(group);
      allocation[current.matchNumber] = group;

      if (solve(rest)) return true;

      assigned.delete(group);
      delete allocation[current.matchNumber];
    }

    return false;
  }

  solve(slotEntries);

  return allocation;
}

// Default: first 8 groups qualify (A through H)
export const DEFAULT_QUALIFYING_THIRD: GroupId[] = [
  "A", "B", "C", "D", "E", "F", "G", "H",
];
