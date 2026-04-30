const COUNTER_ID = 108970167;

declare global {
  interface Window {
    ym?: (
      id: number,
      action: string,
      ...args: unknown[]
    ) => void;
  }
}

export function ymGoal(target: string, params?: Record<string, unknown>) {
  if (typeof window === "undefined") return;
  if (typeof window.ym !== "function") return;
  try {
    window.ym(COUNTER_ID, "reachGoal", target, params);
  } catch {
    /* no-op */
  }
}
