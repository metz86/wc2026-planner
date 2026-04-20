"use client";

import { useTimezone } from "./TimezoneContext";
import { TIMEZONES } from "@/lib/timeUtils";

export function TimezoneSelector() {
  const { timezone, setTimezone } = useTimezone();

  return (
    <select
      value={timezone}
      onChange={(e) => setTimezone(e.target.value)}
      className="bg-slate-700 text-slate-300 text-xs rounded border border-slate-600 px-2 py-1.5 hover:bg-slate-600 transition-colors focus:outline-none focus:ring-1 focus:ring-emerald-400/50"
    >
      {TIMEZONES.map((tz) => (
        <option key={tz.value} value={tz.value}>
          {tz.label}
        </option>
      ))}
    </select>
  );
}
