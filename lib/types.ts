export type GroupId =
  | "A" | "B" | "C" | "D" | "E" | "F"
  | "G" | "H" | "I" | "J" | "K" | "L";

export interface Team {
  id: string;
  name: string;
  group: GroupId;
}

export interface Group {
  id: GroupId;
  teams: string[]; // team IDs ordered by finishing position (index 0 = 1st)
}

export type KnockoutRound = "R32" | "R16" | "QF" | "SF" | "3RD" | "FINAL";

export type TeamSource =
  | { type: "group"; group: GroupId; position: 1 | 2 }
  | { type: "thirdPlace"; possibleGroups: GroupId[] }
  | { type: "winner"; matchNumber: number };

export interface KnockoutMatch {
  matchNumber: number;
  round: KnockoutRound;
  homeSource: TeamSource;
  awaySource: TeamSource;
  homeTeamId: string | null;
  awayTeamId: string | null;
  winnerId: string | null;
  // Which side the user advanced: "home" | "away" | null
  // Allows advancing "away" generically even when the specific team isn't chosen
  advancedSide: "home" | "away" | null;
  // Unresolved candidate team IDs that could fill a slot (propagated through bracket)
  homeCandidates: string[] | null;
  awayCandidates: string[] | null;
  // User-selected third place group for this match (R32 only)
  selectedThirdPlaceGroup: GroupId | null;
}

export interface TournamentState {
  groups: Record<GroupId, Group>;
  knockout: Record<number, KnockoutMatch>;
  qualifyingThirdGroups: GroupId[];
  highlightedTeam: string | null;
  thirdPlaceSelections: Record<number, GroupId>;
}
