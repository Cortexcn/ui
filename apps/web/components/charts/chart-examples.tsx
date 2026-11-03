import { ProPlaceholder } from "@/components/pro-placeholder";

/**
 * Public stand-in for the chart examples. The charts are Cortexcn Pro, so
 * their examples stay in the private source.
 */
export function ChartExamplePreview(
  _props: Readonly<{ chartSlug: string; exampleTitle?: string }>,
) {
  return <ProPlaceholder label="This chart is part of Cortexcn Pro" />;
}
