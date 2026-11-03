import type { CSSProperties, ReactNode } from "react";

/**
 * shadcn/ui's default chart colors. Chart group previews on this site show
 * them so the charts read in color; installed blocks use the app's own
 * --chart-1 to --chart-5.
 */
const DEFAULT_CHART_COLORS = {
  "--chart-1": "oklch(0.646 0.222 41.116)",
  "--chart-2": "oklch(0.6 0.118 184.704)",
  "--chart-3": "oklch(0.398 0.07 227.392)",
  "--chart-4": "oklch(0.828 0.189 84.429)",
  "--chart-5": "oklch(0.769 0.188 70.08)",
  "--chart-line-primary": "oklch(0.646 0.222 41.116)",
  "--chart-line-secondary": "oklch(0.6 0.118 184.704)",
} as CSSProperties;

export function ChartPalette({ children }: { children: ReactNode }) {
  return (
    <div className="w-full" style={DEFAULT_CHART_COLORS}>
      {children}
    </div>
  );
}
