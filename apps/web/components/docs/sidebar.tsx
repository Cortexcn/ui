"use client";

import { Icon } from "@cortexcn/icons";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import type { SidebarGroup, SidebarLink } from "@/lib/docs-sidebar-groups";
import type { RailPromo } from "@/lib/nav-menus";
import { cn } from "@/lib/utils";
import { NewMark } from "./nav-link-label";
import { SidebarHighlight } from "./sidebar-highlight";
import { SidebarScrollCard } from "./sidebar-scroll-card";
import { TemplatesPromoCard } from "./templates-promo-card";

function linkPath(url: string) {
  return url.split("?")[0] ?? url;
}

function containsPage(links: SidebarLink[], pathname: string): boolean {
  return links.some(
    (link) =>
      linkPath(link.url) === pathname ||
      (link.children ? containsPage(link.children, pathname) : false),
  );
}

/** The groups that start open: the one holding this page, or Getting started. */
function initialOpen(groups: SidebarGroup[], pathname: string) {
  const current = groups.find((group) => containsPage(group.links, pathname));
  return new Set([current?.id ?? "getting-started"]);
}

function SidebarLinks({
  links,
  pathname,
  depth = 0,
}: {
  links: SidebarLink[];
  pathname: string;
  depth?: number;
}) {
  const router = useRouter();
  return (
    <ul
      className={cn(
        "m-0 flex list-none flex-col gap-px p-0",
        depth === 0 ? "ml-4" : "ml-3",
      )}
    >
      {links.map((link) => {
        const active = !link.url.includes("?") && link.url === pathname;
        // The sidebar holds a couple hundred links. Prefetching each one as it
        // scrolls into view sends a request per link on every docs visit, so
        // a page is fetched only once the pointer or focus is on its link.
        const prefetch = () => router.prefetch(link.url);
        return (
          <li key={link.url}>
            <Link
              aria-current={active ? "page" : undefined}
              className={cn(
                // Positioned, so the link paints above the sliding highlight.
                "relative flex items-center gap-1.5 rounded-shell-sm py-[0.3125rem] pr-2 pl-3 text-[13.5px] no-underline outline-none transition-colors focus-visible:ring-2 focus-visible:ring-ring/50",
                active
                  ? "font-medium text-foreground"
                  : "text-muted-foreground hover:bg-muted/50 hover:text-foreground",
              )}
              href={link.url}
              onFocus={prefetch}
              onPointerEnter={prefetch}
              prefetch={false}
            >
              <span className="truncate">{link.name}</span>
              {link.isNew ? <NewMark /> : null}
            </Link>
            {link.children && link.children.length > 0 ? (
              <SidebarLinks
                depth={depth + 1}
                links={link.children}
                pathname={pathname}
              />
            ) : null}
          </li>
        );
      })}
    </ul>
  );
}

function SidebarGroupItem({
  group,
  open,
  pathname,
  onToggle,
}: {
  group: SidebarGroup;
  open: boolean;
  pathname: string;
  onToggle: () => void;
}) {
  const panelId = `sidebar-group-${group.id}`;
  return (
    <li className="list-none">
      <button
        aria-controls={panelId}
        aria-expanded={open}
        className="flex w-full items-center gap-2.5 rounded-shell-sm px-2 py-1.5 text-left font-medium text-foreground/90 text-sm outline-none transition-colors hover:bg-muted/70 hover:text-foreground focus-visible:ring-2 focus-visible:ring-ring/50"
        onClick={onToggle}
        type="button"
      >
        <Icon
          className="size-4 shrink-0 text-muted-foreground"
          name={group.icon}
        />
        <span className="flex-1 truncate">{group.name}</span>
        <Icon
          className={cn(
            "size-4 shrink-0 text-muted-foreground transition-transform duration-200 motion-reduce:transition-none",
            open ? "rotate-0" : "-rotate-90",
          )}
          name="IconChevronDownSmall"
        />
      </button>
      <div
        className={cn(
          "grid transition-[grid-template-rows] duration-200 ease-out motion-reduce:transition-none",
          open ? "grid-rows-[1fr]" : "grid-rows-[0fr]",
        )}
        id={panelId}
        inert={!open}
      >
        <div className="min-h-0 overflow-hidden">
          <div className="pt-1 pb-3">
            <SidebarLinks links={group.links} pathname={pathname} />
          </div>
        </div>
      </div>
    </li>
  );
}

/**
 * The docs sidebar: one collapsible group per section, with the group that
 * holds the current page open. It sits in a rounded card that scrolls on its
 * own, and a pill slides behind the current page's link.
 */
export function Sidebar({
  groups,
  promo,
}: {
  groups: SidebarGroup[];
  /** The templates card under the links. */
  promo?: RailPromo;
}) {
  const pathname = usePathname();
  const [open, setOpen] = useState(() => initialOpen(groups, pathname));
  const navRef = useRef<HTMLElement>(null);

  // Opening a page in a closed group opens that group too.
  useEffect(() => {
    const current = groups.find((group) => containsPage(group.links, pathname));
    if (current) {
      setOpen((previous) =>
        previous.has(current.id)
          ? previous
          : new Set([...previous, current.id]),
      );
    }
  }, [groups, pathname]);

  // Bring the current page into view in a long group.
  // biome-ignore lint/correctness/useExhaustiveDependencies: runs on navigation.
  useEffect(() => {
    const frame = requestAnimationFrame(() => {
      navRef.current
        ?.querySelector('[aria-current="page"]')
        ?.scrollIntoView({ block: "nearest" });
    });
    return () => cancelAnimationFrame(frame);
  }, [pathname]);

  const toggle = (id: string) => {
    setOpen((previous) => {
      const next = new Set(previous);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  return (
    <aside className="fixed top-(--site-header-height) left-0 hidden h-[calc(100vh-var(--site-header-height))] w-72 flex-col gap-3 p-3 lg:flex">
      <div className="min-h-0 flex-1">
        <SidebarScrollCard>
          <nav
            aria-label="Docs"
            className="relative px-3 pt-4 pb-8"
            ref={navRef}
          >
            <SidebarHighlight navRef={navRef} pathname={pathname} />
            <ul className="m-0 flex list-none flex-col gap-0.5 p-0">
              {groups.map((group) => (
                <SidebarGroupItem
                  group={group}
                  key={group.id}
                  onToggle={() => toggle(group.id)}
                  open={open.has(group.id)}
                  pathname={pathname}
                />
              ))}
            </ul>
          </nav>
        </SidebarScrollCard>
      </div>
      {promo ? <TemplatesPromoCard promo={promo} /> : null}
    </aside>
  );
}
