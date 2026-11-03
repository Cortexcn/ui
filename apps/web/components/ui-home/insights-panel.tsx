import { ProPlaceholder } from "@/components/pro-placeholder";
import type { InsightsWindows } from "@/lib/insights-shared";

/** Public stand-in: the traffic panel draws its charts with Cortexcn Pro. */
export function InsightsPanel(_props: Readonly<{ windows: InsightsWindows }>) {
  return (
    <ProPlaceholder label="This traffic panel is built with Cortexcn Pro" />
  );
}
