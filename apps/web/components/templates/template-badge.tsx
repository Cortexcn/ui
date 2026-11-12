import { Icon } from "@cortexcn/icons";
import type { SiteTemplate } from "@/lib/site-templates";
import { cn } from "@/lib/utils";

/**
 * The purple "Unique" tag for templates with a look of their own, priced
 * apart from the rest. Nothing renders for other templates.
 */
export function TemplateBadge({
  template,
  className,
}: {
  template: SiteTemplate;
  className?: string;
}) {
  if (template.badge !== "unique") {
    return null;
  }
  return (
    <span
      className={cn(
        "inline-flex shrink-0 items-center gap-1 rounded-full bg-[linear-gradient(120deg,var(--unique-deep)_0%,var(--unique)_55%,var(--unique-bright)_100%)] px-2.5 py-1 font-medium text-(--unique-foreground) text-xs leading-none shadow-[0_0_0_1px_rgb(255_255_255/0.12)_inset,0_4px_14px_-4px_var(--unique-glow)]",
        className,
      )}
    >
      <Icon aria-hidden="true" className="size-3" name="IconDiamondShine" />
      Unique
    </span>
  );
}
