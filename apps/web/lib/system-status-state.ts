/**
 * What the footer status badge shows, worked out from the monitors on the
 * Cortexcn status page. Kept apart from the Better Stack request so the rules
 * can be tested on their own.
 */

/** A monitor's status, as Better Stack's Uptime API reports it. */
const MONITOR_STATUSES = new Set([
  "up",
  "down",
  "validating",
  "paused",
  "pending",
  "maintenance",
]);

export type SystemState = "operational" | "partial-outage" | "major-outage";

export const SYSTEM_STATE_LABELS: Record<SystemState, string> = {
  operational: "All systems operational",
  "partial-outage": "Partial outage",
  "major-outage": "Major outage",
};

export function isSystemState(value: unknown): value is SystemState {
  return typeof value === "string" && Object.hasOwn(SYSTEM_STATE_LABELS, value);
}

/**
 * The state across the monitors, or null when it cannot be verified, which
 * hides the badge. Paused monitors are left out. A monitor that is back up
 * but still in its recovery period ("validating") or in maintenance counts as
 * degraded. Null when no monitor is active, when one has not had its first
 * check ("pending"), or when a status is not one this code knows.
 */
export function systemState(statuses: readonly unknown[]): SystemState | null {
  if (
    !statuses.every(
      (status) => typeof status === "string" && MONITOR_STATUSES.has(status),
    )
  ) {
    return null;
  }
  const active = statuses.filter((status) => status !== "paused");
  if (active.length === 0 || active.includes("pending")) {
    return null;
  }
  if (active.every((status) => status === "up")) {
    return "operational";
  }
  if (active.every((status) => status === "down")) {
    return "major-outage";
  }
  return "partial-outage";
}
