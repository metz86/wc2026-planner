import { Team, GroupId } from "@/lib/types";

export const ALL_TEAMS: Record<string, Team> = {
  // Group A
  MEX: { id: "MEX", name: "Mexico", group: "A" },
  RSA: { id: "RSA", name: "South Africa", group: "A" },
  KOR: { id: "KOR", name: "South Korea", group: "A" },
  CZE: { id: "CZE", name: "Czechia", group: "A" },

  // Group B
  QAT: { id: "QAT", name: "Qatar", group: "B" },
  SUI: { id: "SUI", name: "Switzerland", group: "B" },
  CAN: { id: "CAN", name: "Canada", group: "B" },
  BIH: { id: "BIH", name: "Bosnia", group: "B" },

  // Group C
  BRA: { id: "BRA", name: "Brazil", group: "C" },
  MAR: { id: "MAR", name: "Morocco", group: "C" },
  SCO: { id: "SCO", name: "Scotland", group: "C" },
  HAI: { id: "HAI", name: "Haiti", group: "C" },

  // Group D
  USA: { id: "USA", name: "USA", group: "D" },
  TUR: { id: "TUR", name: "Türkiye", group: "D" },
  PAR: { id: "PAR", name: "Paraguay", group: "D" },
  AUS: { id: "AUS", name: "Australia", group: "D" },

  // Group E
  GER: { id: "GER", name: "Germany", group: "E" },
  CUR: { id: "CUR", name: "Curaçao", group: "E" },
  CIV: { id: "CIV", name: "Ivory Coast", group: "E" },
  ECU: { id: "ECU", name: "Ecuador", group: "E" },

  // Group F
  NED: { id: "NED", name: "Netherlands", group: "F" },
  JPN: { id: "JPN", name: "Japan", group: "F" },
  SWE: { id: "SWE", name: "Sweden", group: "F" },
  TUN: { id: "TUN", name: "Tunisia", group: "F" },

  // Group G
  BEL: { id: "BEL", name: "Belgium", group: "G" },
  EGY: { id: "EGY", name: "Egypt", group: "G" },
  IRN: { id: "IRN", name: "Iran", group: "G" },
  NZL: { id: "NZL", name: "New Zealand", group: "G" },

  // Group H
  ESP: { id: "ESP", name: "Spain", group: "H" },
  CPV: { id: "CPV", name: "Cape Verde", group: "H" },
  KSA: { id: "KSA", name: "Saudi Arabia", group: "H" },
  URU: { id: "URU", name: "Uruguay", group: "H" },

  // Group I
  FRA: { id: "FRA", name: "France", group: "I" },
  IRQ: { id: "IRQ", name: "Iraq", group: "I" },
  NOR: { id: "NOR", name: "Norway", group: "I" },
  SEN: { id: "SEN", name: "Senegal", group: "I" },

  // Group J
  ARG: { id: "ARG", name: "Argentina", group: "J" },
  ALG: { id: "ALG", name: "Algeria", group: "J" },
  AUT: { id: "AUT", name: "Austria", group: "J" },
  JOR: { id: "JOR", name: "Jordan", group: "J" },

  // Group K
  POR: { id: "POR", name: "Portugal", group: "K" },
  DRC: { id: "DRC", name: "DR Congo", group: "K" },
  COL: { id: "COL", name: "Colombia", group: "K" },
  UZB: { id: "UZB", name: "Uzbekistan", group: "K" },

  // Group L
  ENG: { id: "ENG", name: "England", group: "L" },
  CRO: { id: "CRO", name: "Croatia", group: "L" },
  GHA: { id: "GHA", name: "Ghana", group: "L" },
  PAN: { id: "PAN", name: "Panama", group: "L" },
};

export const INITIAL_GROUPS: Record<GroupId, string[]> = {
  A: ["MEX", "RSA", "KOR", "CZE"],
  B: ["QAT", "SUI", "CAN", "BIH"],
  C: ["BRA", "MAR", "SCO", "HAI"],
  D: ["USA", "TUR", "PAR", "AUS"],
  E: ["GER", "CUR", "CIV", "ECU"],
  F: ["NED", "JPN", "SWE", "TUN"],
  G: ["BEL", "EGY", "IRN", "NZL"],
  H: ["ESP", "CPV", "KSA", "URU"],
  I: ["FRA", "IRQ", "NOR", "SEN"],
  J: ["ARG", "ALG", "AUT", "JOR"],
  K: ["POR", "DRC", "COL", "UZB"],
  L: ["ENG", "CRO", "GHA", "PAN"],
};

export const GROUP_IDS: GroupId[] = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L"];
