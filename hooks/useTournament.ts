"use client";

import { useReducer, useEffect, useCallback } from "react";
import { GroupId, Group, KnockoutMatch, TournamentState } from "@/lib/types";
import { INITIAL_GROUPS, GROUP_IDS } from "@/data/groups";
import { DEFAULT_QUALIFYING_THIRD } from "@/data/thirdPlaceRules";
import { resolveKnockout } from "@/lib/knockoutResolver";

type Action =
  | { type: "REORDER_GROUP"; groupId: GroupId; teamIds: string[] }
  | { type: "SET_QUALIFYING_THIRD"; groups: GroupId[] }
  | { type: "ADVANCE_SIDE"; matchNumber: number; side: "home" | "away" }
  | { type: "ADVANCE_SPECIFIC"; matchNumber: number; teamId: string; side: "home" | "away" }
  | { type: "CLEAR_ADVANCEMENT"; matchNumber: number }
  | { type: "SELECT_THIRD_PLACE"; matchNumber: number; groupId: GroupId }
  | { type: "CLEAR_THIRD_PLACE"; matchNumber: number }
  | { type: "HIGHLIGHT_TEAM"; teamId: string | null }
  | { type: "LOAD_STATE"; state: TournamentState }
  | { type: "RESET" };

function buildGroups(groupData: Record<GroupId, string[]>): Record<GroupId, Group> {
  const groups: Record<string, Group> = {};
  for (const id of GROUP_IDS) {
    groups[id] = { id, teams: groupData[id] };
  }
  return groups as Record<GroupId, Group>;
}

function collectAdvancements(knockout: Record<number, KnockoutMatch>): Record<number, "home" | "away" | null> {
  const adv: Record<number, "home" | "away" | null> = {};
  for (const [mn, match] of Object.entries(knockout)) {
    if (match.advancedSide) {
      adv[Number(mn)] = match.advancedSide;
    }
  }
  return adv;
}

function collectSpecificWinners(knockout: Record<number, KnockoutMatch>): Record<number, string | null> {
  const winners: Record<number, string | null> = {};
  for (const [mn, match] of Object.entries(knockout)) {
    if (match.winnerId) {
      winners[Number(mn)] = match.winnerId;
    }
  }
  return winners;
}

function recompute(
  groups: Record<GroupId, Group>,
  qualifyingThirdGroups: GroupId[],
  knockout: Record<number, KnockoutMatch>,
  thirdPlaceSelections: Record<number, GroupId>
): Record<number, KnockoutMatch> {
  const adv = collectAdvancements(knockout);
  const winners = collectSpecificWinners(knockout);
  return resolveKnockout(groups, qualifyingThirdGroups, adv, thirdPlaceSelections, winners);
}

function buildInitialState(): TournamentState {
  const groups = buildGroups(INITIAL_GROUPS);
  const thirdPlaceSelections: Record<number, GroupId> = {};
  const knockout = resolveKnockout(groups, DEFAULT_QUALIFYING_THIRD, {}, thirdPlaceSelections, {});
  return {
    groups,
    knockout,
    qualifyingThirdGroups: [...DEFAULT_QUALIFYING_THIRD],
    highlightedTeam: null,
    thirdPlaceSelections,
  };
}

function clearDownstream(
  matchNumber: number,
  knockout: Record<number, KnockoutMatch>,
  adv: Record<number, "home" | "away" | null>,
  winners: Record<number, string | null>
) {
  const toClear = [matchNumber];
  while (toClear.length > 0) {
    const mn = toClear.pop()!;
    delete adv[mn];
    delete winners[mn];
    for (const [num, match] of Object.entries(knockout)) {
      const n = Number(num);
      if (
        (match.homeSource.type === "winner" && match.homeSource.matchNumber === mn) ||
        (match.awaySource.type === "winner" && match.awaySource.matchNumber === mn)
      ) {
        toClear.push(n);
      }
    }
  }
}

function reducer(state: TournamentState, action: Action): TournamentState {
  switch (action.type) {
    case "REORDER_GROUP": {
      const newGroups = {
        ...state.groups,
        [action.groupId]: { ...state.groups[action.groupId], teams: action.teamIds },
      };
      const knockout = recompute(newGroups, state.qualifyingThirdGroups, state.knockout, state.thirdPlaceSelections);
      return { ...state, groups: newGroups, knockout };
    }

    case "SET_QUALIFYING_THIRD": {
      const newSelections = { ...state.thirdPlaceSelections };
      for (const [mn, groupId] of Object.entries(newSelections)) {
        if (!action.groups.includes(groupId)) {
          delete newSelections[Number(mn)];
        }
      }
      const knockout = recompute(state.groups, action.groups, state.knockout, newSelections);
      return { ...state, qualifyingThirdGroups: action.groups, knockout, thirdPlaceSelections: newSelections };
    }

    case "ADVANCE_SIDE": {
      // Advance a side generically (e.g. "the away/third-place side wins")
      const adv = collectAdvancements(state.knockout);
      const winners = collectSpecificWinners(state.knockout);

      // If already advanced to same side, toggle off
      if (adv[action.matchNumber] === action.side) {
        clearDownstream(action.matchNumber, state.knockout, adv, winners);
        const knockout = resolveKnockout(state.groups, state.qualifyingThirdGroups, adv, state.thirdPlaceSelections, winners);
        return { ...state, knockout };
      }

      // Clear downstream if changing side
      clearDownstream(action.matchNumber, state.knockout, adv, winners);
      adv[action.matchNumber] = action.side;

      const knockout = resolveKnockout(state.groups, state.qualifyingThirdGroups, adv, state.thirdPlaceSelections, winners);
      return { ...state, knockout };
    }

    case "ADVANCE_SPECIFIC": {
      // Advance a specific team (sets both side and winner)
      const adv = collectAdvancements(state.knockout);
      const winners = collectSpecificWinners(state.knockout);

      // If clicking the same specific winner, clear it back to generic advancement
      if (winners[action.matchNumber] === action.teamId) {
        delete winners[action.matchNumber];
        // Keep the side advancement
        adv[action.matchNumber] = action.side;
        const knockout = resolveKnockout(state.groups, state.qualifyingThirdGroups, adv, state.thirdPlaceSelections, winners);
        return { ...state, knockout };
      }

      // Clear downstream and set specific winner
      clearDownstream(action.matchNumber, state.knockout, adv, winners);
      adv[action.matchNumber] = action.side;
      winners[action.matchNumber] = action.teamId;

      const knockout = resolveKnockout(state.groups, state.qualifyingThirdGroups, adv, state.thirdPlaceSelections, winners);
      return { ...state, knockout };
    }

    case "CLEAR_ADVANCEMENT": {
      const adv = collectAdvancements(state.knockout);
      const winners = collectSpecificWinners(state.knockout);
      clearDownstream(action.matchNumber, state.knockout, adv, winners);
      const knockout = resolveKnockout(state.groups, state.qualifyingThirdGroups, adv, state.thirdPlaceSelections, winners);
      return { ...state, knockout };
    }

    case "SELECT_THIRD_PLACE": {
      const newSelections = { ...state.thirdPlaceSelections, [action.matchNumber]: action.groupId };
      const knockout = recompute(state.groups, state.qualifyingThirdGroups, state.knockout, newSelections);
      return { ...state, thirdPlaceSelections: newSelections, knockout };
    }

    case "CLEAR_THIRD_PLACE": {
      const newSelections = { ...state.thirdPlaceSelections };
      delete newSelections[action.matchNumber];
      // Also clear the advancement since the opponent changed
      const adv = collectAdvancements(state.knockout);
      const winners = collectSpecificWinners(state.knockout);
      clearDownstream(action.matchNumber, state.knockout, adv, winners);
      const knockout = resolveKnockout(state.groups, state.qualifyingThirdGroups, adv, newSelections, winners);
      return { ...state, thirdPlaceSelections: newSelections, knockout };
    }

    case "HIGHLIGHT_TEAM": {
      return { ...state, highlightedTeam: action.teamId };
    }

    case "LOAD_STATE": {
      return action.state;
    }

    case "RESET": {
      return buildInitialState();
    }

    default:
      return state;
  }
}

const STORAGE_KEY = "wc2026-planner-state";

export function useTournament() {
  const [state, dispatch] = useReducer(reducer, null, buildInitialState);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const groups = parsed.groups || buildGroups(INITIAL_GROUPS);
        const qualifyingThirdGroups = parsed.qualifyingThirdGroups || DEFAULT_QUALIFYING_THIRD;
        const thirdPlaceSelections = parsed.thirdPlaceSelections || {};
        const adv = collectAdvancements(parsed.knockout || {});
        const winners = collectSpecificWinners(parsed.knockout || {});
        const knockout = resolveKnockout(groups, qualifyingThirdGroups, adv, thirdPlaceSelections, winners);
        dispatch({
          type: "LOAD_STATE",
          state: {
            groups,
            knockout,
            qualifyingThirdGroups,
            highlightedTeam: parsed.highlightedTeam || null,
            thirdPlaceSelections,
          },
        });
      }
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state]);

  const reorderGroup = useCallback(
    (groupId: GroupId, teamIds: string[]) =>
      dispatch({ type: "REORDER_GROUP", groupId, teamIds }),
    []
  );

  const setQualifyingThird = useCallback(
    (groups: GroupId[]) => dispatch({ type: "SET_QUALIFYING_THIRD", groups }),
    []
  );

  const advanceSide = useCallback(
    (matchNumber: number, side: "home" | "away") =>
      dispatch({ type: "ADVANCE_SIDE", matchNumber, side }),
    []
  );

  const advanceSpecific = useCallback(
    (matchNumber: number, teamId: string, side: "home" | "away") =>
      dispatch({ type: "ADVANCE_SPECIFIC", matchNumber, teamId, side }),
    []
  );

  const clearAdvancement = useCallback(
    (matchNumber: number) =>
      dispatch({ type: "CLEAR_ADVANCEMENT", matchNumber }),
    []
  );

  const selectThirdPlace = useCallback(
    (matchNumber: number, groupId: GroupId) =>
      dispatch({ type: "SELECT_THIRD_PLACE", matchNumber, groupId }),
    []
  );

  const clearThirdPlace = useCallback(
    (matchNumber: number) =>
      dispatch({ type: "CLEAR_THIRD_PLACE", matchNumber }),
    []
  );

  const highlightTeam = useCallback(
    (teamId: string | null) => dispatch({ type: "HIGHLIGHT_TEAM", teamId }),
    []
  );

  const reset = useCallback(() => dispatch({ type: "RESET" }), []);

  return {
    state,
    reorderGroup,
    setQualifyingThird,
    advanceSide,
    advanceSpecific,
    clearAdvancement,
    selectThirdPlace,
    clearThirdPlace,
    highlightTeam,
    reset,
  };
}
