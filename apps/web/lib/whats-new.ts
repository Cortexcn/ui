import { type GalleryBlock, getGalleryBlocks } from "@/lib/blocks/gallery";
import { CHANGELOG, type ChangelogRelease } from "@/lib/changelog";
import {
  COMPONENT_GROUPS,
  type ComponentGroup,
} from "@/lib/component-families";
import { isProItem } from "@/lib/pro";
import {
  getSiteTemplate,
  isDashboardKit,
  isFreeTemplate,
  templatePriceLabel,
} from "@/lib/site-templates";
import { source } from "@/lib/source";

/**
 * The /new feed and the header's "New" link. Both are built from the
 * changelog: every component, block, and template a release links to becomes
 * a card on the day it first shipped, and a later release that links to it
 * again lists it as updated. Adding a changelog entry is the only step.
 */

export const WHATS_NEW_URL = "/new";

/** How far back the feed goes. Older releases stay on the changelog. */
export const FEED_DAYS = 90;

/** The window for the count on the header's "New" item. */
const WEEK_DAYS = 7;

const DAY_MS = 24 * 60 * 60 * 1000;

export type NewItemType = "component" | "block" | "template";

export type NewItemVisual =
  | { kind: "block"; slug: string }
  | { kind: "art"; slug: string; family: ComponentGroup["category"] }
  | {
      kind: "screenshot";
      light: string;
      dark: string;
      width: number;
      height: number;
    };

export interface NewItem {
  /** The item's page. */
  href: string;
  name: string;
  /** One line about it, from its docs page, block meta, or template. */
  description: string;
  type: NewItemType;
  /** Its family or category: "Cortex", "Dashboards", "Dashboard kit". */
  group: string;
  /** "Free", "Pro", or a template's price. */
  access: string;
  pro: boolean;
  /** A short name for the header link's label: "Muster", "Ringwise kit". */
  short: string;
  visual: NewItemVisual;
}

export interface NewEntry extends NewItem {
  /** `YYYY-MM-DD`: the day it shipped, or the day of this update. */
  date: string;
  /** Listed again by a later release, so this card is an update. */
  updated: boolean;
}

export interface NewDay {
  date: string;
  entries: NewEntry[];
}

const BLOCK_HREF = /^\/blocks\/([^/?#]+)\/([^/?#]+)$/;
const DOCS_HREF = /^\/docs\/([^/?#]+)\/([^/?#]+)$/;
const TEMPLATE_HREF = /^\/templates\/([^/?#]+)$/;

/** The name after the comma in titles such as "Docs Dashboard Kit, Quire". */
const BRAND_SUFFIX = /,\s*([A-Z][\w-]*)$/;

let blocksBySlug: Map<string, GalleryBlock> | undefined;

function galleryBlock(slug: string) {
  blocksBySlug ??= new Map(
    getGalleryBlocks().map((block) => [block.slug, block]),
  );
  return blocksBySlug.get(slug);
}

function blockItem(href: string, slug: string): NewItem | undefined {
  const block = galleryBlock(slug);
  if (!block || block.href !== href) {
    return undefined;
  }
  return {
    href,
    name: block.title,
    description: block.description,
    type: "block",
    group: block.categoryName,
    access: block.pro ? "Pro" : "Free",
    pro: block.pro,
    short: block.title,
    visual: { kind: "block", slug },
  };
}

function componentItem(
  href: string,
  folder: string,
  slug: string,
): NewItem | undefined {
  const family = COMPONENT_GROUPS.find((group) => group.category === folder);
  const known: readonly string[] = family?.slugs ?? [];
  if (!(family && known.includes(slug))) {
    return undefined;
  }
  const page = source.getPage([folder, slug]);
  if (!page) {
    return undefined;
  }
  const pro = isProItem(slug);
  const name = page.data.title ?? slug;
  return {
    href,
    name,
    description: page.data.description ?? "",
    type: "component",
    group: family.name,
    access: pro ? "Pro" : "Free",
    pro,
    short: name,
    visual: { kind: "art", slug, family: family.category },
  };
}

function templateItem(
  href: string,
  slug: string,
  release: ChangelogRelease,
): NewItem | undefined {
  const template = getSiteTemplate(slug);
  if (!template) {
    return undefined;
  }
  const kit = isDashboardKit(template);
  const brand = release.title.match(BRAND_SUFFIX)?.[1];
  const card = template.screenshots.card;
  return {
    href,
    name: brand ? `${template.name}, ${brand}` : template.name,
    description: template.summary,
    type: "template",
    group: kit ? "Dashboard kit" : "Template",
    access: templatePriceLabel(template),
    pro: !isFreeTemplate(template),
    short: `${brand ?? template.name} ${kit ? "kit" : "template"}`,
    visual: {
      kind: "screenshot",
      light: card.light.src,
      dark: card.dark.src,
      width: card.light.width,
      height: card.light.height,
    },
  };
}

/** The card a changelog link stands for, or nothing for links like /docs/installation. */
function resolveLink(
  href: string,
  release: ChangelogRelease,
): NewItem | undefined {
  const block = href.match(BLOCK_HREF);
  if (block?.[2]) {
    return blockItem(href, block[2]);
  }
  const docs = href.match(DOCS_HREF);
  if (docs?.[1] && docs[2]) {
    return componentItem(href, docs[1], docs[2]);
  }
  const template = href.match(TEMPLATE_HREF);
  if (template?.[1]) {
    return templateItem(href, template[1], release);
  }
  return undefined;
}

function daysAgo(days: number, now: number) {
  return new Date(now - days * DAY_MS).toISOString().slice(0, 10);
}

/**
 * Every card the changelog links to, newest first. An item shows once on the
 * day it first shipped, and once more on each later day that links to it,
 * marked as updated.
 */
function allEntries(): NewEntry[] {
  const firstShipped = new Map<string, string>();
  for (const release of CHANGELOG) {
    for (const { href } of release.items) {
      const seen = firstShipped.get(href);
      if (!seen || release.date < seen) {
        firstShipped.set(href, release.date);
      }
    }
  }

  const listed = new Set<string>();
  const entries: NewEntry[] = [];
  const releases = [...CHANGELOG].sort((a, b) => b.date.localeCompare(a.date));
  for (const release of releases) {
    for (const { href } of release.items) {
      const key = `${release.date} ${href}`;
      if (listed.has(key)) {
        continue;
      }
      const item = resolveLink(href, release);
      if (!item) {
        continue;
      }
      listed.add(key);
      entries.push({
        ...item,
        date: release.date,
        updated: firstShipped.get(href) !== release.date,
      });
    }
  }
  return entries;
}

let cachedEntries: NewEntry[] | undefined;

function entries() {
  cachedEntries ??= allEntries();
  return cachedEntries;
}

/** The feed's cards from the last {@link FEED_DAYS} days, grouped by day, newest first. */
export function whatsNewDays(now = Date.now()): NewDay[] {
  const cutoff = daysAgo(FEED_DAYS, now);
  const days = new Map<string, NewEntry[]>();
  for (const entry of entries()) {
    if (entry.date < cutoff) {
      continue;
    }
    const day = days.get(entry.date);
    if (day) {
      day.push(entry);
    } else {
      days.set(entry.date, [entry]);
    }
  }
  return Array.from(days, ([date, dayEntries]) => ({
    date,
    entries: dayEntries,
  }));
}

export interface WhatsNewStats {
  added: number;
  updated: number;
  byType: Record<NewItemType, number>;
  /** The first day the feed covers. */
  since: string;
  /** True when the feed holds everything since the first release. */
  fromStart: boolean;
  releases: number;
  shipDays: number;
  /** New items in the last week, the same count as the header's "New". */
  thisWeek: number;
  firstRelease: string;
  latestRelease: string;
}

/** Items that first shipped in the last week. */
function addedThisWeek(now: number) {
  const weekStart = daysAgo(WEEK_DAYS, now);
  return entries().filter((entry) => !entry.updated && entry.date > weekStart)
    .length;
}

/** The counts on the page: what the feed holds, and the release history. */
export function whatsNewStats(now = Date.now()): WhatsNewStats {
  const days = whatsNewDays(now);
  const feed = days.flatMap((day) => day.entries);
  const added = feed.filter((entry) => !entry.updated);
  const byType: Record<NewItemType, number> = {
    component: 0,
    block: 0,
    template: 0,
  };
  for (const entry of added) {
    byType[entry.type] += 1;
  }
  const dates = CHANGELOG.map((release) => release.date).sort();
  const firstRelease = dates[0] ?? "";
  const cutoff = daysAgo(FEED_DAYS, now);
  return {
    added: added.length,
    updated: feed.length - added.length,
    byType,
    since: days.at(-1)?.date ?? firstRelease,
    fromStart: firstRelease >= cutoff,
    releases: CHANGELOG.length,
    shipDays: new Set(dates).size,
    thisWeek: addedThisWeek(now),
    firstRelease,
    latestRelease: dates.at(-1) ?? "",
  };
}

export interface WhatsNewNav {
  url: string;
  /** New items in the last week; 0 hides the count. */
  count: number;
  /** What a screen reader says for the link: the count and the latest item. */
  label: string;
}

/** The header's "New" item: the week's count and its spoken label. */
export function whatsNewNav(now = Date.now()): WhatsNewNav {
  const latest = entries().find((entry) => !entry.updated);
  const count = addedThisWeek(now);
  return {
    url: WHATS_NEW_URL,
    count,
    label: [
      "New",
      count > 0 ? `${count} this week` : "",
      latest ? `latest: ${latest.short}` : "",
    ]
      .filter(Boolean)
      .join(", "),
  };
}

/** Weeks the activity graph covers: a year, as on GitHub. */
export const CALENDAR_WEEKS = 53;

export type ShipLevel = 0 | 1 | 2 | 3 | 4;

export interface ShipDay {
  /** `YYYY-MM-DD`. */
  date: string;
  /** Cards on the feed that day, new and updated. */
  items: number;
  releases: number;
  /** Shading by items: 0 for nothing, then 1 to 4. */
  itemLevel: ShipLevel;
  /** Shading by releases. */
  releaseLevel: ShipLevel;
  /** Still on the /new feed, so the day can link to its section. */
  inFeed: boolean;
  /** After the day the page was built, so not drawn. */
  future: boolean;
}

export interface ShipCalendar {
  /** One column per week, Sunday first, oldest week first. */
  weeks: ShipDay[][];
  /** A short month name over the first week each month starts in. */
  months: { column: number; label: string }[];
  /** Totals across the graph. */
  items: number;
  releases: number;
}

const MONTH_LABEL = new Intl.DateTimeFormat("en-US", {
  month: "short",
  timeZone: "UTC",
});

function itemLevel(items: number, releases: number): ShipLevel {
  if (releases === 0) {
    return 0;
  }
  if (items <= 2) {
    return 1;
  }
  if (items <= 5) {
    return 2;
  }
  return items <= 10 ? 3 : 4;
}

function releaseLevel(releases: number): ShipLevel {
  if (releases >= 5) {
    return 4;
  }
  return Math.min(releases, 3) as ShipLevel;
}

/**
 * The last {@link CALENDAR_WEEKS} weeks as a grid of days, shaded by what
 * shipped on each, from the changelog. A day with a release but no card,
 * such as a site change, still counts as a ship day.
 */
export function shipCalendar(now = Date.now()): ShipCalendar {
  const items = new Map<string, number>();
  for (const entry of entries()) {
    items.set(entry.date, (items.get(entry.date) ?? 0) + 1);
  }
  const releases = new Map<string, number>();
  for (const release of CHANGELOG) {
    releases.set(release.date, (releases.get(release.date) ?? 0) + 1);
  }

  const today = new Date(now);
  const todayIso = today.toISOString().slice(0, 10);
  const feedStart = daysAgo(FEED_DAYS, now);
  const firstDay = Date.UTC(
    today.getUTCFullYear(),
    today.getUTCMonth(),
    today.getUTCDate() - today.getUTCDay() - (CALENDAR_WEEKS - 1) * 7,
  );

  const weeks: ShipDay[][] = [];
  const months: ShipCalendar["months"] = [];
  let itemTotal = 0;
  let releaseTotal = 0;
  for (let week = 0; week < CALENDAR_WEEKS; week++) {
    const days: ShipDay[] = [];
    for (let weekday = 0; weekday < 7; weekday++) {
      const date = new Date(firstDay + (week * 7 + weekday) * DAY_MS)
        .toISOString()
        .slice(0, 10);
      const future = date > todayIso;
      const dayItems = future ? 0 : (items.get(date) ?? 0);
      const dayReleases = future ? 0 : (releases.get(date) ?? 0);
      itemTotal += dayItems;
      releaseTotal += dayReleases;
      days.push({
        date,
        items: dayItems,
        releases: dayReleases,
        itemLevel: itemLevel(dayItems, dayReleases),
        releaseLevel: releaseLevel(dayReleases),
        inFeed: date >= feedStart,
        future,
      });
    }
    // Label the week a month starts in, unless it would crowd the last label.
    const month = MONTH_LABEL.format(new Date(firstDay + week * 7 * DAY_MS));
    const previous = months.at(-1);
    if (
      previous?.label !== month &&
      (!previous || week - previous.column > 2)
    ) {
      months.push({ column: week, label: month });
    }
    weeks.push(days);
  }
  return { weeks, months, items: itemTotal, releases: releaseTotal };
}
