export interface TimezoneOption {
  label: string;
  value: string;
}

export const TIMEZONES: TimezoneOption[] = [
  { label: "CEST (UTC+2)", value: "Europe/Berlin" },
  { label: "BST (UTC+1)", value: "Europe/London" },
  { label: "UTC", value: "UTC" },
  { label: "EDT (UTC-4)", value: "America/New_York" },
  { label: "CDT (UTC-5)", value: "America/Chicago" },
  { label: "MDT (UTC-6)", value: "America/Denver" },
  { label: "PDT (UTC-7)", value: "America/Los_Angeles" },
  { label: "BRT (UTC-3)", value: "America/Sao_Paulo" },
  { label: "GST (UTC+4)", value: "Asia/Dubai" },
  { label: "IST (UTC+5:30)", value: "Asia/Kolkata" },
  { label: "CST (UTC+8)", value: "Asia/Shanghai" },
  { label: "JST (UTC+9)", value: "Asia/Tokyo" },
  { label: "AEST (UTC+10)", value: "Australia/Sydney" },
  { label: "NZST (UTC+12)", value: "Pacific/Auckland" },
];

export const DEFAULT_TIMEZONE = "Europe/Berlin";

const timeFormatter = new Map<string, Intl.DateTimeFormat>();
const dateFormatter = new Map<string, Intl.DateTimeFormat>();
const dayFormatter = new Map<string, Intl.DateTimeFormat>();

function getTimeFormatter(tz: string) {
  if (!timeFormatter.has(tz)) {
    timeFormatter.set(
      tz,
      new Intl.DateTimeFormat("en-GB", {
        timeZone: tz,
        hour: "2-digit",
        minute: "2-digit",
        hour12: false,
      })
    );
  }
  return timeFormatter.get(tz)!;
}

function getDateFormatter(tz: string) {
  if (!dateFormatter.has(tz)) {
    dateFormatter.set(
      tz,
      new Intl.DateTimeFormat("en-US", {
        timeZone: tz,
        month: "long",
        day: "numeric",
      })
    );
  }
  return dateFormatter.get(tz)!;
}

function getDayFormatter(tz: string) {
  if (!dayFormatter.has(tz)) {
    dayFormatter.set(
      tz,
      new Intl.DateTimeFormat("en-US", {
        timeZone: tz,
        weekday: "short",
      })
    );
  }
  return dayFormatter.get(tz)!;
}

/**
 * Convert a match time from CEST (stored as "HH:MM") + date ("June 11")
 * to the target timezone. Returns converted time, date, and day.
 */
export function convertMatchTime(
  date: string,
  time: string,
  targetTz: string
): { time: string; date: string; day: string } {
  // Parse: "June 11" + "21:00" in CEST (GMT+0200) → UTC Date
  const utcDate = new Date(`${date}, 2026 ${time}:00 GMT+0200`);

  return {
    time: getTimeFormatter(targetTz).format(utcDate),
    date: getDateFormatter(targetTz).format(utcDate),
    day: getDayFormatter(targetTz).format(utcDate),
  };
}
