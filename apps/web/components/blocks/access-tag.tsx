import { ProBadge } from "@/components/docs/pro-install-panel";

/** "Pro" for blocks whose code comes with Cortexcn Pro, "Free" for the rest. */
export function AccessTag({ pro }: { pro: boolean }) {
  if (pro) {
    return <ProBadge />;
  }
  return (
    <span className="inline-flex items-center rounded-sm border border-border px-1.5 py-0.5 font-medium font-mono text-[0.625rem] text-muted-foreground uppercase leading-none tracking-[0.06em]">
      Free
    </span>
  );
}
