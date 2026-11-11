import proItems from "@cortexcn/ui/pro-items.json";

/**
 * Cortexcn Pro: the charts, their parts, the blocks built on them, and the
 * blocks marked `pro: true` in generate-block-registry.mjs. The
 * names come from packages/ui/pro-items.json, which `bun run registry:build`
 * writes when it keeps these items out of the public registry.
 */
const PRO_ITEMS = new Set<string>(proItems);

/** The Pro page, on the product site. */
export const PRO_PATH = "/pro";

/** The Pro licenses and their prices, also on the product site. */
export const PRO_PRICING_PATH = "/pro/pricing";

/** Whether a registry item is part of Pro, so its code is not public. */
export function isProItem(name: string | undefined) {
  return name !== undefined && PRO_ITEMS.has(name);
}

/** Where every Buy Pro button goes: the pricing page, to pick a license. */
export const PRO_BUY_HREF = PRO_PRICING_PATH;

/**
 * Where a license holder finds the source of a Pro item: their purchases
 * page, opened at that item. It asks them to sign in first.
 */
export function proSourceHref(name: string) {
  return `/account/purchases?item=${encodeURIComponent(name)}`;
}
