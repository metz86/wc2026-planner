import { GroupId, Group, KnockoutMatch, TeamSource } from "@/lib/types";
import { ALL_KNOCKOUT_TEMPLATES } from "@/data/knockoutPaths";

interface Advancement {
  matchNumber: number;
  side: "home" | "away";
}

export function resolveKnockout(
  groups: Record<GroupId, Group>,
  qualifyingThirdGroups: GroupId[],
  advancements: Record<number, Advancement["side"] | null>,
  thirdPlaceSelections: Record<number, GroupId>,
  specificWinners: Record<number, string | null>
): Record<number, KnockoutMatch> {
  const result: Record<number, KnockoutMatch> = {};

  for (const template of ALL_KNOCKOUT_TEMPLATES) {
    const match: KnockoutMatch = {
      ...template,
      homeTeamId: null,
      awayTeamId: null,
      winnerId: null,
      advancedSide: advancements[template.matchNumber] ?? null,
      homeCandidates: null,
      awayCandidates: null,
      selectedThirdPlaceGroup: thirdPlaceSelections[template.matchNumber] ?? null,
    };

    // Resolve home side
    const homeResolved = resolveSlot(
      template.homeSource,
      template.matchNumber,
      groups,
      qualifyingThirdGroups,
      thirdPlaceSelections,
      result,
      advancements,
      specificWinners
    );
    match.homeTeamId = homeResolved.teamId;
    match.homeCandidates = homeResolved.candidates;

    // Resolve away side
    const awayResolved = resolveSlot(
      template.awaySource,
      template.matchNumber,
      groups,
      qualifyingThirdGroups,
      thirdPlaceSelections,
      result,
      advancements,
      specificWinners
    );
    match.awayTeamId = awayResolved.teamId;
    match.awayCandidates = awayResolved.candidates;

    // Resolve winner
    const specific = specificWinners[template.matchNumber];
    if (specific && (specific === match.homeTeamId || specific === match.awayTeamId)) {
      match.winnerId = specific;
      match.advancedSide = specific === match.homeTeamId ? "home" : "away";
    } else if (match.advancedSide === "home" && match.homeTeamId) {
      match.winnerId = match.homeTeamId;
    } else if (match.advancedSide === "away" && match.awayTeamId) {
      match.winnerId = match.awayTeamId;
    }

    result[template.matchNumber] = match;
  }

  return result;
}

interface SlotResolution {
  teamId: string | null;
  candidates: string[] | null;
}

function resolveSlot(
  source: TeamSource,
  currentMatchNumber: number,
  groups: Record<GroupId, Group>,
  qualifyingThirdGroups: GroupId[],
  thirdPlaceSelections: Record<number, GroupId>,
  resolvedMatches: Record<number, KnockoutMatch>,
  advancements: Record<number, "home" | "away" | null>,
  specificWinners: Record<number, string | null>
): SlotResolution {
  switch (source.type) {
    case "group": {
      const group = groups[source.group];
      const teamId = group?.teams[source.position - 1] ?? null;
      return { teamId, candidates: null };
    }

    case "thirdPlace": {
      const possibleGroups = source.possibleGroups;
      const qualifying = possibleGroups.filter((g) => qualifyingThirdGroups.includes(g));

      // Filter out groups already assigned to OTHER R32 matches
      const otherSelections = new Set(
        Object.entries(thirdPlaceSelections)
          .filter(([mn]) => Number(mn) !== currentMatchNumber)
          .map(([, g]) => g)
      );
      const available = qualifying.filter((g) => !otherSelections.has(g));

      // If user selected a specific group for this match
      const selectedGroup = thirdPlaceSelections[currentMatchNumber];
      if (selectedGroup && qualifying.includes(selectedGroup)) {
        const teamId = groups[selectedGroup]?.teams[2] ?? null;
        return { teamId, candidates: null };
      }

      // No specific selection — return candidates
      const candidates = available
        .map((g) => groups[g]?.teams[2])
        .filter((t): t is string => !!t);

      return { teamId: null, candidates: candidates.length > 0 ? candidates : null };
    }

    case "winner": {
      const matchNumber = source.matchNumber;

      // Handle "loser of" for 3rd place playoff (negative match numbers)
      if (matchNumber < 0) {
        const actualMatch = resolvedMatches[Math.abs(matchNumber)];
        if (!actualMatch) return { teamId: null, candidates: null };
        if (!actualMatch.winnerId && !actualMatch.advancedSide) return { teamId: null, candidates: null };

        // Loser = the side that didn't advance
        if (actualMatch.advancedSide === "home") {
          return { teamId: actualMatch.awayTeamId, candidates: actualMatch.awayCandidates };
        } else if (actualMatch.advancedSide === "away") {
          return { teamId: actualMatch.homeTeamId, candidates: actualMatch.homeCandidates };
        }
        return { teamId: null, candidates: null };
      }

      const prevMatch = resolvedMatches[matchNumber];
      if (!prevMatch) return { teamId: null, candidates: null };

      const advSide = prevMatch.advancedSide;
      if (!advSide) return { teamId: null, candidates: null };

      if (advSide === "home") {
        return {
          teamId: prevMatch.winnerId ?? prevMatch.homeTeamId,
          candidates: prevMatch.homeCandidates,
        };
      } else {
        return {
          teamId: prevMatch.winnerId ?? prevMatch.awayTeamId,
          candidates: prevMatch.awayCandidates,
        };
      }
    }
  }
}
