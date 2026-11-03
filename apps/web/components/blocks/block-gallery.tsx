"use client";

import { Icon } from "@cortexcn/icons";
import {
  AnimatePresence,
  MotionConfig,
  motion,
  useReducedMotion,
} from "motion/react";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { type ReactNode, useEffect, useRef, useState } from "react";
import { BLOCK_PREVIEWS } from "@/blocks/previews";
import { AccessTag } from "@/components/blocks/access-tag";
import { FitToFrame } from "@/components/blocks/fit-to-frame";
import { useSmoothScrollTo } from "@/components/smooth-scroll/use-smooth-scroll-to";
import { Button } from "@/components/ui/button";
import {
  InputGroup,
  InputGroupAddon,
  InputGroupButton,
  InputGroupInput,
} from "@/components/ui/input-group";
import {
  filterGalleryBlocks,
  type GalleryAccess,
  type GalleryBlock,
  type GalleryCategory,
  sortBlocksByTitle,
} from "@/lib/blocks/gallery";
import { cn } from "@/lib/utils";

/** Clears the fixed site header, which floats a little lower once scrolled. */
const HEADER_OFFSET = 112;

/** The badge glides between filters; cards settle into their new places. */
const SLIDE = { type: "spring", stiffness: 420, damping: 36 } as const;
const SETTLE = { duration: 0.35, ease: [0.22, 1, 0.36, 1] } as const;

/** The yellow of the site's calls to action, for the selected filter. */
const SELECTED_BADGE = "bg-(--cta) shadow-xs";

const ACCESS_OPTIONS: { value: GalleryAccess; label: string }[] = [
  { value: "", label: "All" },
  { value: "free", label: "Free" },
  { value: "pro", label: "Pro" },
];

interface BlockGalleryProps {
  blocks: GalleryBlock[];
  categories: GalleryCategory[];
}

interface GalleryFilters {
  category?: string | null;
  q?: string | null;
  access?: string | null;
}

function readAccess(value: string | null): GalleryAccess {
  return value === "free" || value === "pro" ? value : "";
}

/** Plain link clicks are handled in place; modified clicks open as usual. */
function isPlainClick(event: React.MouseEvent) {
  return !(event.metaKey || event.ctrlKey || event.shiftKey || event.altKey);
}

/** The /blocks gallery, with its category, access, and search kept in the URL. */
export function BlockGallery(props: BlockGalleryProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const scrollTo = useSmoothScrollTo();
  const resultsRef = useRef<HTMLElement>(null);

  const category = searchParams.get("category") ?? "";
  const query = searchParams.get("q") ?? "";
  const access = readAccess(searchParams.get("access"));

  // Shallow URL updates: Next.js syncs useSearchParams with the History API,
  // so filtering never refetches the page.
  const setParams = (next: GalleryFilters) => {
    const params = new URLSearchParams(searchParams.toString());
    for (const [key, value] of Object.entries(next)) {
      if (value) {
        params.set(key, value);
      } else {
        params.delete(key);
      }
    }
    const search = params.toString();
    window.history.replaceState(
      null,
      "",
      search ? `${pathname}?${search}` : pathname,
    );
  };

  /** Brings the results back into view after a filter changes the page height. */
  const keepResultsInView = () => {
    const results = resultsRef.current;
    const top = results?.getBoundingClientRect().top ?? 0;
    if (results && top < HEADER_OFFSET) {
      scrollTo(window.scrollY + top - HEADER_OFFSET);
    }
  };

  return (
    <BlockGalleryView
      {...props}
      access={access}
      category={category}
      onAccessChange={(value) => {
        setParams({ access: value });
        keepResultsInView();
      }}
      onCategoryChange={(value) => {
        setParams({ category: value });
        keepResultsInView();
      }}
      onClearFilters={() =>
        setParams({ category: null, q: null, access: null })
      }
      onQueryChange={(value) => setParams({ q: value })}
      query={query}
      resultsRef={resultsRef}
    />
  );
}

/**
 * The layout of the gallery: a sidebar of categories, a search and a Free or
 * Pro switch, then every block in alphabetical order. Rendered without
 * handlers, it is the static first paint: every block, no filters, every
 * filter a plain link.
 */
export function BlockGalleryView({
  blocks,
  categories,
  category = "",
  query = "",
  access = "",
  resultsRef,
  onCategoryChange,
  onAccessChange,
  onQueryChange,
  onClearFilters,
}: BlockGalleryProps & {
  category?: string;
  query?: string;
  access?: GalleryAccess;
  resultsRef?: React.Ref<HTMLElement>;
  onCategoryChange?: (category: string | null) => void;
  onAccessChange?: (access: string | null) => void;
  onQueryChange?: (query: string | null) => void;
  onClearFilters?: () => void;
}) {
  const results = sortBlocksByTitle(
    filterGalleryBlocks(blocks, { category, query, access }),
  );
  const categoryName = categories.find((item) => item.slug === category)?.name;
  const filtered = Boolean(category || query || access);
  const options = [
    { slug: "", name: "All blocks", count: blocks.length },
    ...[...categories].sort((a, b) => a.name.localeCompare(b.name)),
  ];

  return (
    <MotionConfig reducedMotion="user">
      <div className="lg:grid lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-10 xl:gap-14">
        <aside className="hidden lg:block">
          <div className="sticky top-28">
            <h2 className="mb-3 px-3 font-medium text-sm">Categories</h2>
            <CategoryList
              active={category}
              onChange={onCategoryChange}
              options={options}
              orientation="vertical"
            />
          </div>
        </aside>

        <div className="min-w-0">
          <div className="flex flex-col gap-3 border-border border-b pb-4 sm:flex-row sm:items-center sm:justify-between">
            <p
              aria-live="polite"
              className="order-last text-muted-foreground text-sm sm:order-first"
            >
              {results.length} {results.length === 1 ? "block" : "blocks"}
              {categoryName && ` in ${categoryName}`}
              {access && `, ${access === "pro" ? "Pro" : "free"} only`}
              {query && `, matching "${query}"`}
            </p>
            <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
              {filtered && onClearFilters ? (
                <Button
                  className="self-start sm:self-auto"
                  onClick={onClearFilters}
                  size="sm"
                  variant="ghost"
                >
                  <Icon className="size-3.5" name="IconCrossSmall" />
                  Clear
                </Button>
              ) : null}
              <div className="w-full sm:w-64">
                <SearchField onChange={onQueryChange} value={query} />
              </div>
              <AccessSwitch onChange={onAccessChange} value={access} />
            </div>
          </div>

          <div className="mt-4 lg:hidden">
            <CategoryList
              active={category}
              onChange={onCategoryChange}
              options={options}
              orientation="horizontal"
            />
          </div>

          <section aria-label="Blocks" className="pt-8" ref={resultsRef}>
            {results.length === 0 ? (
              <div className="flex flex-col items-center gap-3 rounded-2xl border border-border border-dashed px-4 py-20 text-center">
                <p className="text-sm">No blocks match.</p>
                {onClearFilters ? (
                  <Button onClick={onClearFilters} size="sm" variant="outline">
                    Clear filters
                  </Button>
                ) : null}
              </div>
            ) : (
              <div className="grid gap-x-6 gap-y-12 md:grid-cols-2 2xl:grid-cols-3">
                <AnimatePresence initial={false} mode="popLayout">
                  {results.map((block) => (
                    <motion.div
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.97 }}
                      initial={{ opacity: 0, y: 16, scale: 0.98 }}
                      key={block.slug}
                      layout
                      transition={SETTLE}
                    >
                      <GalleryCard block={block} />
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </section>
        </div>
      </div>
    </MotionConfig>
  );
}

/**
 * Renders a live preview only once its card comes near the screen, so the
 * gallery does not draw every block at once.
 */
function LazyPreview({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node || visible) {
      return;
    }
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries.some((entry) => entry.isIntersecting)) {
          setVisible(true);
          observer.disconnect();
        }
      },
      { rootMargin: "600px 0px" },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, [visible]);

  return (
    <div ref={ref}>
      {visible ? (
        <FitToFrame>{children}</FitToFrame>
      ) : (
        <div
          aria-hidden="true"
          className="aspect-16/10 w-full animate-pulse bg-muted/60 motion-reduce:animate-none"
        />
      )}
    </div>
  );
}

function GalleryCard({ block }: { block: GalleryBlock }) {
  const Preview = BLOCK_PREVIEWS[block.slug];

  return (
    <article className="group relative flex flex-col">
      <div className="overflow-hidden rounded-2xl border border-border bg-muted/40 transition-[border-color,box-shadow] duration-300 group-hover:border-foreground/20 group-hover:shadow-[0_24px_48px_-28px_rgb(0_0_0/0.35)] motion-reduce:transition-none">
        <LazyPreview>
          <Preview />
        </LazyPreview>
      </div>

      <div className="mt-4 flex items-start justify-between gap-4">
        <div className="min-w-0">
          <h3 className="truncate font-medium text-[17px] tracking-[-0.01em]">
            {block.title}
          </h3>
          <p className="mt-1 line-clamp-1 text-muted-foreground text-sm">
            {block.description}
          </p>
        </div>
        <div className="flex shrink-0 items-center gap-2 pt-0.5">
          <span className="text-muted-foreground text-sm">
            {block.categoryName}
          </span>
          <AccessTag pro={block.pro} />
        </div>
      </div>

      {/* Full-card link, outside the thumbnail so no interactive element nests inside it. */}
      <Link
        className="absolute inset-0 rounded-2xl focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-4"
        href={block.href}
      >
        <span className="sr-only">
          View {block.title}, {block.categoryName}
          {block.pro ? ", Pro" : ""}
        </span>
      </Link>
    </article>
  );
}

/** All, Free, or Pro, with a yellow badge that slides to the choice. */
function AccessSwitch({
  value,
  onChange,
}: {
  value: GalleryAccess;
  onChange?: (access: string | null) => void;
}) {
  return (
    <nav
      aria-label="Free or Pro"
      className="flex shrink-0 items-center rounded-full border border-border bg-background p-1"
    >
      {ACCESS_OPTIONS.map((option) => {
        const active = option.value === value;
        return (
          <Link
            aria-current={active ? "page" : undefined}
            className={cn(
              "relative flex h-7 items-center rounded-full px-3.5 font-medium text-sm transition-colors focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
              active
                ? "text-(--cta-foreground)"
                : "text-muted-foreground hover:text-foreground",
            )}
            href={option.value ? `/blocks?access=${option.value}` : "/blocks"}
            key={option.label}
            onClick={(event) => {
              if (!(onChange && isPlainClick(event))) {
                return;
              }
              event.preventDefault();
              onChange(option.value || null);
            }}
            prefetch={false}
            scroll={false}
          >
            {active ? (
              <motion.span
                aria-hidden="true"
                className={cn("absolute inset-0 rounded-full", SELECTED_BADGE)}
                layoutId="blocks-access-badge"
                transition={SLIDE}
              />
            ) : null}
            <span className="relative">{option.label}</span>
          </Link>
        );
      })}
    </nav>
  );
}

/**
 * The categories: a sidebar list on large screens and a row of badges on
 * small ones. The selected one is a yellow badge that glides to each new pick.
 */
function CategoryList({
  options,
  active,
  orientation,
  onChange,
}: {
  options: GalleryCategory[];
  active: string;
  orientation: "vertical" | "horizontal";
  onChange?: (category: string | null) => void;
}) {
  const listRef = useRef<HTMLUListElement>(null);
  const vertical = orientation === "vertical";

  // A deep link such as /blocks?category=stat-cards can land on a badge that
  // is scrolled out of sight, so center the selected one in the row.
  useEffect(() => {
    const list = listRef.current;
    const current = list?.querySelector<HTMLElement>("[aria-current=page]");
    if (vertical || !(list && current && active)) {
      return;
    }
    list.scrollLeft =
      current.offsetLeft - (list.clientWidth - current.offsetWidth) / 2;
  }, [active, vertical]);

  return (
    <nav aria-label="Categories">
      <ul
        className={cn(
          vertical
            ? "flex flex-col gap-1"
            : "no-scrollbar flex gap-2 overflow-x-auto pb-1",
        )}
        ref={listRef}
      >
        {options.map((option) => {
          const selected = option.slug === active;
          return (
            <li className="shrink-0" key={option.slug || "all"}>
              <Link
                aria-current={selected ? "page" : undefined}
                className={cn(
                  "relative flex items-center justify-between gap-3 rounded-full font-medium text-sm transition-colors focus-visible:outline-2 focus-visible:outline-ring focus-visible:outline-offset-2",
                  vertical ? "h-10 px-4" : "h-9 border px-4",
                  selected
                    ? "border-transparent text-(--cta-foreground)"
                    : "border-border text-muted-foreground hover:bg-muted/60 hover:text-foreground",
                )}
                href={
                  option.slug ? `/blocks?category=${option.slug}` : "/blocks"
                }
                onClick={(event) => {
                  if (!(onChange && isPlainClick(event))) {
                    return;
                  }
                  event.preventDefault();
                  onChange(option.slug || null);
                }}
                prefetch={false}
                scroll={false}
              >
                {selected ? (
                  <motion.span
                    aria-hidden="true"
                    className={cn(
                      "absolute inset-0 rounded-full",
                      SELECTED_BADGE,
                    )}
                    layoutId={`blocks-category-badge-${orientation}`}
                    transition={SLIDE}
                  />
                ) : null}
                <span className="relative truncate">{option.name}</span>
                <span
                  className={cn(
                    "relative font-mono text-xs tabular-nums",
                    selected ? "text-(--cta-foreground)/70" : "",
                  )}
                >
                  {option.count}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

/** Real block names the search box types out while it waits. */
const TYPED_NAMES = [
  "Business Analytics",
  "Market Watch",
  "Ledger",
  "Synapse",
  "Bento Grid",
  "Chain of Thought",
];

const TYPE_MS = 75;
const DELETE_MS = 35;
const HOLD_MS = 1400;
const NEXT_MS = 350;

/**
 * Types each name into the placeholder, holds it, deletes it, and moves to
 * the next. Stops while the box is in use, and for visitors who prefer less
 * motion, who see the plain placeholder instead.
 */
function useTypedPlaceholder(active: boolean) {
  const reduceMotion = useReducedMotion();
  const [text, setText] = useState("");
  const running = active && reduceMotion === false;

  useEffect(() => {
    if (!running) {
      setText("");
      return;
    }
    let word = 0;
    let length = 0;
    let deleting = false;
    let timer: ReturnType<typeof setTimeout>;

    const tick = () => {
      const name = TYPED_NAMES[word] ?? "";
      if (deleting) {
        length -= 1;
        if (length <= 0) {
          deleting = false;
          word = (word + 1) % TYPED_NAMES.length;
          setText("");
          timer = setTimeout(tick, NEXT_MS);
          return;
        }
        setText(name.slice(0, length));
        timer = setTimeout(tick, DELETE_MS);
        return;
      }
      length += 1;
      setText(name.slice(0, length));
      if (length >= name.length) {
        deleting = true;
        timer = setTimeout(tick, HOLD_MS);
        return;
      }
      timer = setTimeout(tick, TYPE_MS);
    };

    timer = setTimeout(tick, NEXT_MS);
    return () => clearTimeout(timer);
  }, [running]);

  return running && text ? `Search ${text}|` : "Search blocks...";
}

function SearchField({
  value,
  onChange,
}: {
  value: string;
  onChange?: (value: string | null) => void;
}) {
  const [focused, setFocused] = useState(false);
  const placeholder = useTypedPlaceholder(
    !(focused || value) && Boolean(onChange),
  );

  return (
    <InputGroup className="h-9 rounded-full border-border bg-background">
      <InputGroupAddon align="inline-start">
        <Icon className="size-4" name="IconMagnifyingGlass" />
      </InputGroupAddon>
      <InputGroupInput
        aria-label="Search blocks"
        onBlur={() => setFocused(false)}
        onChange={(event) => onChange?.(event.target.value || null)}
        onFocus={() => setFocused(true)}
        onKeyDown={(event) => {
          if (event.key === "Escape") {
            onChange?.(null);
          }
        }}
        placeholder={placeholder}
        readOnly={!onChange}
        value={value}
      />
      {value && (
        <InputGroupAddon align="inline-end">
          <InputGroupButton
            aria-label="Clear search"
            onClick={() => onChange?.(null)}
            size="icon-xs"
          >
            <Icon className="size-3.5" name="IconCrossSmall" />
          </InputGroupButton>
        </InputGroupAddon>
      )}
    </InputGroup>
  );
}
