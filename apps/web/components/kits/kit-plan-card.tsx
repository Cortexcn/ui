import Link from "next/link";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

function CheckIcon() {
  return (
    <svg
      aria-hidden="true"
      className="mt-0.5 size-4 shrink-0"
      fill="none"
      stroke="currentColor"
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth="2"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path d="m5 12.5 4.5 4.5L19 7.5" />
    </svg>
  );
}

/** What one card on /dashboard-kits/pricing shows. */
export interface PlanCardData {
  id: string;
  name: string;
  summary: string;
  /** "$349", or "Quote" for custom work. */
  price: string;
  priceNote: string;
  featuresHeading: string;
  features: string[];
  action: { label: string; href: string };
  badge?: string;
}

/** One way to buy the kits: its price, what it covers, and the button. */
export function KitPlanCard({ plan }: { plan: PlanCardData }) {
  const featured = Boolean(plan.badge);

  return (
    <div
      className={cn(
        "flex h-full flex-col gap-5 rounded-xl border bg-card p-6",
        featured && "border-foreground/25 ring-1 ring-foreground/10",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <h2 className="font-semibold text-xl tracking-tight">{plan.name}</h2>
        {plan.badge ? (
          <span className="rounded-full bg-primary px-2 py-1 font-medium text-[10px] text-primary-foreground uppercase leading-none tracking-wide">
            {plan.badge}
          </span>
        ) : null}
      </div>
      <p className="text-pretty text-muted-foreground text-sm leading-relaxed">
        {plan.summary}
      </p>
      <div className="flex flex-col gap-1">
        <p className="font-semibold text-4xl tracking-tight">{plan.price}</p>
        <p className="text-muted-foreground text-xs">{plan.priceNote}</p>
      </div>
      <Button
        className="w-full"
        nativeButton={false}
        render={<Link href={plan.action.href} />}
        size="lg"
        variant={featured ? "default" : "outline"}
      >
        {plan.action.label}
      </Button>
      <div className="flex flex-col gap-3 border-t pt-5">
        <p className="font-medium text-sm">{plan.featuresHeading}</p>
        <ul className="flex flex-col gap-2.5">
          {plan.features.map((feature) => (
            <li
              className="flex gap-2.5 text-muted-foreground text-sm"
              key={feature}
            >
              <CheckIcon />
              {feature}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
