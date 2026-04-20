import { GroupId } from "@/lib/types";

export interface MatchInfo {
  matchday: 1 | 2 | 3;
  date: string;
  day: string;
  time: string; // UTC+2 (CEST)
  home: string;
  away: string;
  group: GroupId;
}

export interface KnockoutMatchInfo {
  matchNumber: number;
  date: string;
  day: string;
  time: string;
}

// All 72 group stage matches
export const GROUP_MATCHES: MatchInfo[] = [
  // ===== MATCHDAY 1 =====

  // Thu June 11
  { matchday: 1, date: "June 11", day: "Thu", time: "21:00", home: "MEX", away: "RSA", group: "A" },
  { matchday: 1, date: "June 11", day: "Thu", time: "05:00", home: "KOR", away: "CZE", group: "A" },

  // Fri June 12
  { matchday: 1, date: "June 12", day: "Fri", time: "21:00", home: "CAN", away: "BIH", group: "B" },
  { matchday: 1, date: "June 12", day: "Fri", time: "05:00", home: "USA", away: "PAR", group: "D" },

  // Sat June 13
  { matchday: 1, date: "June 13", day: "Sat", time: "21:00", home: "QAT", away: "SUI", group: "B" },
  { matchday: 1, date: "June 13", day: "Sat", time: "01:00", home: "BRA", away: "MAR", group: "C" },
  { matchday: 1, date: "June 13", day: "Sat", time: "04:00", home: "HAI", away: "SCO", group: "C" },

  // Sun June 14
  { matchday: 1, date: "June 14", day: "Sun", time: "19:00", home: "GER", away: "CUR", group: "E" },
  { matchday: 1, date: "June 14", day: "Sun", time: "21:00", home: "NED", away: "JPN", group: "F" },
  { matchday: 1, date: "June 14", day: "Sun", time: "01:00", home: "CIV", away: "ECU", group: "E" },
  { matchday: 1, date: "June 14", day: "Sun", time: "04:00", home: "SWE", away: "TUN", group: "F" },

  // Mon June 15
  { matchday: 1, date: "June 15", day: "Mon", time: "19:00", home: "ESP", away: "CPV", group: "H" },
  { matchday: 1, date: "June 15", day: "Mon", time: "21:00", home: "BEL", away: "EGY", group: "G" },
  { matchday: 1, date: "June 15", day: "Mon", time: "01:00", home: "KSA", away: "URU", group: "H" },
  { matchday: 1, date: "June 15", day: "Mon", time: "04:00", home: "IRN", away: "NZL", group: "G" },

  // Tue June 16
  { matchday: 1, date: "June 16", day: "Tue", time: "21:00", home: "FRA", away: "SEN", group: "I" },
  { matchday: 1, date: "June 16", day: "Tue", time: "00:00", home: "IRQ", away: "NOR", group: "I" },
  { matchday: 1, date: "June 16", day: "Tue", time: "03:00", home: "ARG", away: "ALG", group: "J" },
  { matchday: 1, date: "June 16", day: "Tue", time: "05:00", home: "AUT", away: "JOR", group: "J" },

  // Wed June 17
  { matchday: 1, date: "June 17", day: "Wed", time: "19:00", home: "POR", away: "DRC", group: "K" },
  { matchday: 1, date: "June 17", day: "Wed", time: "22:00", home: "ENG", away: "CRO", group: "L" },
  { matchday: 1, date: "June 17", day: "Wed", time: "01:00", home: "GHA", away: "PAN", group: "L" },
  { matchday: 1, date: "June 17", day: "Wed", time: "03:00", home: "UZB", away: "COL", group: "K" },
  { matchday: 1, date: "June 17", day: "Wed", time: "05:00", home: "AUS", away: "TUR", group: "D" },

  // ===== MATCHDAY 2 =====

  // Thu June 18
  { matchday: 2, date: "June 18", day: "Thu", time: "19:00", home: "CZE", away: "RSA", group: "A" },
  { matchday: 2, date: "June 18", day: "Thu", time: "21:00", home: "SUI", away: "BIH", group: "B" },
  { matchday: 2, date: "June 18", day: "Thu", time: "01:00", home: "CAN", away: "QAT", group: "B" },
  { matchday: 2, date: "June 18", day: "Thu", time: "04:00", home: "MEX", away: "KOR", group: "A" },

  // Fri June 19
  { matchday: 2, date: "June 19", day: "Fri", time: "21:00", home: "USA", away: "AUS", group: "D" },
  { matchday: 2, date: "June 19", day: "Fri", time: "01:00", home: "SCO", away: "MAR", group: "C" },
  { matchday: 2, date: "June 19", day: "Fri", time: "03:00", home: "BRA", away: "HAI", group: "C" },
  { matchday: 2, date: "June 19", day: "Fri", time: "05:00", home: "TUR", away: "PAR", group: "D" },

  // Sat June 20
  { matchday: 2, date: "June 20", day: "Sat", time: "19:00", home: "NED", away: "SWE", group: "F" },
  { matchday: 2, date: "June 20", day: "Sat", time: "21:00", home: "GER", away: "CIV", group: "E" },
  { matchday: 2, date: "June 20", day: "Sat", time: "03:00", home: "ECU", away: "CUR", group: "E" },
  { matchday: 2, date: "June 20", day: "Sat", time: "05:00", home: "TUN", away: "JPN", group: "F" },

  // Sun June 21
  { matchday: 2, date: "June 21", day: "Sun", time: "19:00", home: "ESP", away: "KSA", group: "H" },
  { matchday: 2, date: "June 21", day: "Sun", time: "21:00", home: "BEL", away: "IRN", group: "G" },
  { matchday: 2, date: "June 21", day: "Sun", time: "01:00", home: "URU", away: "CPV", group: "H" },
  { matchday: 2, date: "June 21", day: "Sun", time: "04:00", home: "NZL", away: "EGY", group: "G" },

  // Mon June 22
  { matchday: 2, date: "June 22", day: "Mon", time: "19:00", home: "ARG", away: "AUT", group: "J" },
  { matchday: 2, date: "June 22", day: "Mon", time: "22:00", home: "FRA", away: "IRQ", group: "I" },
  { matchday: 2, date: "June 22", day: "Mon", time: "01:00", home: "NOR", away: "SEN", group: "I" },
  { matchday: 2, date: "June 22", day: "Mon", time: "05:00", home: "JOR", away: "ALG", group: "J" },

  // Tue June 23
  { matchday: 2, date: "June 23", day: "Tue", time: "19:00", home: "POR", away: "UZB", group: "K" },
  { matchday: 2, date: "June 23", day: "Tue", time: "21:00", home: "ENG", away: "GHA", group: "L" },
  { matchday: 2, date: "June 23", day: "Tue", time: "01:00", home: "PAN", away: "CRO", group: "L" },
  { matchday: 2, date: "June 23", day: "Tue", time: "03:00", home: "COL", away: "DRC", group: "K" },

  // ===== MATCHDAY 3 =====

  // Wed June 24 - Groups A, B, C
  { matchday: 3, date: "June 24", day: "Wed", time: "21:00", home: "SUI", away: "CAN", group: "B" },
  { matchday: 3, date: "June 24", day: "Wed", time: "21:00", home: "BIH", away: "QAT", group: "B" },
  { matchday: 3, date: "June 24", day: "Wed", time: "01:00", home: "MAR", away: "HAI", group: "C" },
  { matchday: 3, date: "June 24", day: "Wed", time: "01:00", home: "SCO", away: "BRA", group: "C" },
  { matchday: 3, date: "June 24", day: "Wed", time: "04:00", home: "RSA", away: "KOR", group: "A" },
  { matchday: 3, date: "June 24", day: "Wed", time: "04:00", home: "CZE", away: "MEX", group: "A" },

  // Thu June 25 - Groups D, E, F
  { matchday: 3, date: "June 25", day: "Thu", time: "21:00", home: "CUR", away: "CIV", group: "E" },
  { matchday: 3, date: "June 25", day: "Thu", time: "21:00", home: "ECU", away: "GER", group: "E" },
  { matchday: 3, date: "June 25", day: "Thu", time: "01:00", home: "TUN", away: "NED", group: "F" },
  { matchday: 3, date: "June 25", day: "Thu", time: "01:00", home: "JPN", away: "SWE", group: "F" },
  { matchday: 3, date: "June 25", day: "Thu", time: "04:00", home: "TUR", away: "USA", group: "D" },
  { matchday: 3, date: "June 25", day: "Thu", time: "04:00", home: "PAR", away: "AUS", group: "D" },

  // Fri June 26 - Groups G, H, I
  { matchday: 3, date: "June 26", day: "Fri", time: "21:00", home: "NOR", away: "FRA", group: "I" },
  { matchday: 3, date: "June 26", day: "Fri", time: "21:00", home: "SEN", away: "IRQ", group: "I" },
  { matchday: 3, date: "June 26", day: "Fri", time: "01:00", home: "CPV", away: "KSA", group: "H" },
  { matchday: 3, date: "June 26", day: "Fri", time: "01:00", home: "URU", away: "ESP", group: "H" },
  { matchday: 3, date: "June 26", day: "Fri", time: "04:00", home: "NZL", away: "BEL", group: "G" },
  { matchday: 3, date: "June 26", day: "Fri", time: "04:00", home: "EGY", away: "IRN", group: "G" },

  // Sat June 27 - Groups J, K, L
  { matchday: 3, date: "June 27", day: "Sat", time: "21:00", home: "PAN", away: "ENG", group: "L" },
  { matchday: 3, date: "June 27", day: "Sat", time: "21:00", home: "CRO", away: "GHA", group: "L" },
  { matchday: 3, date: "June 27", day: "Sat", time: "01:00", home: "COL", away: "POR", group: "K" },
  { matchday: 3, date: "June 27", day: "Sat", time: "01:00", home: "DRC", away: "UZB", group: "K" },
  { matchday: 3, date: "June 27", day: "Sat", time: "04:00", home: "ALG", away: "AUT", group: "J" },
  { matchday: 3, date: "June 27", day: "Sat", time: "04:00", home: "JOR", away: "ARG", group: "J" },
];

// Knockout stage dates/times
export const KNOCKOUT_SCHEDULE: Record<number, KnockoutMatchInfo> = {
  // R32
  73: { matchNumber: 73, date: "June 28", day: "Sun", time: "22:00" },
  74: { matchNumber: 74, date: "June 29", day: "Mon", time: "20:00" },
  75: { matchNumber: 75, date: "June 29", day: "Mon", time: "00:00" },
  76: { matchNumber: 76, date: "June 29", day: "Mon", time: "04:00" },
  77: { matchNumber: 77, date: "June 30", day: "Tue", time: "19:00" },
  78: { matchNumber: 78, date: "June 30", day: "Tue", time: "00:00" },
  79: { matchNumber: 79, date: "June 30", day: "Tue", time: "04:00" },
  80: { matchNumber: 80, date: "July 1", day: "Wed", time: "19:00" },
  81: { matchNumber: 81, date: "July 1", day: "Wed", time: "22:00" },
  82: { matchNumber: 82, date: "July 1", day: "Wed", time: "03:00" },
  83: { matchNumber: 83, date: "July 2", day: "Thu", time: "21:00" },
  84: { matchNumber: 84, date: "July 2", day: "Thu", time: "03:00" },
  85: { matchNumber: 85, date: "July 3", day: "Fri", time: "05:00" },
  86: { matchNumber: 86, date: "July 3", day: "Fri", time: "20:00" },
  87: { matchNumber: 87, date: "July 3", day: "Fri", time: "01:00" },
  88: { matchNumber: 88, date: "July 3", day: "Fri", time: "04:00" },

  // R16
  89: { matchNumber: 89, date: "July 4", day: "Sat", time: "20:00" },
  90: { matchNumber: 90, date: "July 4", day: "Sat", time: "00:00" },
  91: { matchNumber: 91, date: "July 5", day: "Sun", time: "22:00" },
  92: { matchNumber: 92, date: "July 5", day: "Sun", time: "04:00" },
  93: { matchNumber: 93, date: "July 6", day: "Mon", time: "21:00" },
  94: { matchNumber: 94, date: "July 6", day: "Mon", time: "03:00" },
  95: { matchNumber: 95, date: "July 7", day: "Tue", time: "19:00" },
  96: { matchNumber: 96, date: "July 7", day: "Tue", time: "22:00" },

  // QF
  97: { matchNumber: 97, date: "July 9", day: "Thu", time: "22:00" },
  98: { matchNumber: 98, date: "July 10", day: "Fri", time: "21:00" },
  99: { matchNumber: 99, date: "July 11", day: "Sat", time: "22:00" },
  100: { matchNumber: 100, date: "July 11", day: "Sat", time: "04:00" },

  // SF
  101: { matchNumber: 101, date: "July 14", day: "Tue", time: "21:00" },
  102: { matchNumber: 102, date: "July 15", day: "Wed", time: "21:00" },

  // 3rd place + Final
  103: { matchNumber: 103, date: "July 18", day: "Sat", time: "22:00" },
  104: { matchNumber: 104, date: "July 19", day: "Sun", time: "21:00" },
};
