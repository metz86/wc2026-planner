import { KnockoutMatch, TeamSource } from "@/lib/types";

// Helper to create group position sources
const g = (group: string, position: 1 | 2): TeamSource => ({
  type: "group",
  group: group as any,
  position,
});

const third = (groups: string[]): TeamSource => ({
  type: "thirdPlace",
  possibleGroups: groups as any[],
});

const winner = (matchNumber: number): TeamSource => ({
  type: "winner",
  matchNumber,
});

// Round of 32 — 16 matches (73-88)
export const R32_TEMPLATE: Omit<KnockoutMatch, "homeTeamId" | "awayTeamId" | "winnerId" | "advancedSide" | "homeCandidates" | "awayCandidates" | "selectedThirdPlaceGroup">[] = [
  { matchNumber: 73, round: "R32", homeSource: g("A", 2), awaySource: g("B", 2) },
  { matchNumber: 74, round: "R32", homeSource: g("C", 1), awaySource: g("F", 2) },
  { matchNumber: 75, round: "R32", homeSource: g("E", 1), awaySource: third(["A", "B", "C", "D", "F"]) },
  { matchNumber: 76, round: "R32", homeSource: g("F", 1), awaySource: g("C", 2) },
  { matchNumber: 77, round: "R32", homeSource: g("E", 2), awaySource: g("I", 2) },
  { matchNumber: 78, round: "R32", homeSource: g("I", 1), awaySource: third(["C", "D", "F", "G", "H"]) },
  { matchNumber: 79, round: "R32", homeSource: g("A", 1), awaySource: third(["C", "E", "F", "H", "I"]) },
  { matchNumber: 80, round: "R32", homeSource: g("L", 1), awaySource: third(["E", "H", "I", "J", "K"]) },
  { matchNumber: 81, round: "R32", homeSource: g("G", 1), awaySource: third(["A", "E", "H", "I", "J"]) },
  { matchNumber: 82, round: "R32", homeSource: g("D", 1), awaySource: third(["B", "E", "F", "I", "J"]) },
  { matchNumber: 83, round: "R32", homeSource: g("H", 1), awaySource: g("J", 2) },
  { matchNumber: 84, round: "R32", homeSource: g("K", 2), awaySource: g("L", 2) },
  { matchNumber: 85, round: "R32", homeSource: g("B", 1), awaySource: third(["E", "F", "G", "I", "J"]) },
  { matchNumber: 86, round: "R32", homeSource: g("D", 2), awaySource: g("G", 2) },
  { matchNumber: 87, round: "R32", homeSource: g("J", 1), awaySource: g("H", 2) },
  { matchNumber: 88, round: "R32", homeSource: g("K", 1), awaySource: third(["D", "E", "I", "J", "L"]) },
];

// Round of 16 — 8 matches (89-96)
export const R16_TEMPLATE: Omit<KnockoutMatch, "homeTeamId" | "awayTeamId" | "winnerId" | "advancedSide" | "homeCandidates" | "awayCandidates" | "selectedThirdPlaceGroup">[] = [
  { matchNumber: 89, round: "R16", homeSource: winner(73), awaySource: winner(76) },
  { matchNumber: 90, round: "R16", homeSource: winner(75), awaySource: winner(78) },
  { matchNumber: 91, round: "R16", homeSource: winner(74), awaySource: winner(77) },
  { matchNumber: 92, round: "R16", homeSource: winner(79), awaySource: winner(80) },
  { matchNumber: 93, round: "R16", homeSource: winner(83), awaySource: winner(84) },
  { matchNumber: 94, round: "R16", homeSource: winner(81), awaySource: winner(82) },
  { matchNumber: 95, round: "R16", homeSource: winner(86), awaySource: winner(87) },
  { matchNumber: 96, round: "R16", homeSource: winner(85), awaySource: winner(88) },
];

// Quarter-Finals — 4 matches (97-100)
export const QF_TEMPLATE: Omit<KnockoutMatch, "homeTeamId" | "awayTeamId" | "winnerId" | "advancedSide" | "homeCandidates" | "awayCandidates" | "selectedThirdPlaceGroup">[] = [
  { matchNumber: 97, round: "QF", homeSource: winner(89), awaySource: winner(90) },
  { matchNumber: 98, round: "QF", homeSource: winner(93), awaySource: winner(94) },
  { matchNumber: 99, round: "QF", homeSource: winner(91), awaySource: winner(92) },
  { matchNumber: 100, round: "QF", homeSource: winner(95), awaySource: winner(96) },
];

// Semi-Finals — 2 matches (101-102)
export const SF_TEMPLATE: Omit<KnockoutMatch, "homeTeamId" | "awayTeamId" | "winnerId" | "advancedSide" | "homeCandidates" | "awayCandidates" | "selectedThirdPlaceGroup">[] = [
  { matchNumber: 101, round: "SF", homeSource: winner(97), awaySource: winner(98) },
  { matchNumber: 102, round: "SF", homeSource: winner(99), awaySource: winner(100) },
];

// Third place & Final
export const FINAL_TEMPLATE: Omit<KnockoutMatch, "homeTeamId" | "awayTeamId" | "winnerId" | "advancedSide" | "homeCandidates" | "awayCandidates" | "selectedThirdPlaceGroup">[] = [
  { matchNumber: 103, round: "3RD", homeSource: { type: "winner", matchNumber: -101 } as any, awaySource: { type: "winner", matchNumber: -102 } as any },
  { matchNumber: 104, round: "FINAL", homeSource: winner(101), awaySource: winner(102) },
];

// We use negative match numbers to denote "loser of match X" for the 3rd place playoff
// This is handled specially in the resolver

export const ALL_KNOCKOUT_TEMPLATES = [
  ...R32_TEMPLATE,
  ...R16_TEMPLATE,
  ...QF_TEMPLATE,
  ...SF_TEMPLATE,
  ...FINAL_TEMPLATE,
];
