import Link from "next/link";

import { CortexcnLogo } from "@/components/icons/cortexcn";
import { ProductCredit } from "@/components/product-credit";
import { VersionTag } from "@/components/version-tag";
import { COMPONENT_GROUPS } from "@/lib/component-families";
import { CONTACT_EMAIL } from "@/lib/contact-details";
import { SITE_URL, STUDIO_URL } from "@/lib/site-url";
import { source } from "@/lib/source";
import { Container } from "./primitives";

export interface FooterLink {
  label: string;
  href: string;
}

/** Every component in the docs sidebars, A to Z, named as its docs page is. */
const COMPONENT_LINKS: FooterLink[] = COMPONENT_GROUPS.flatMap((group) =>
  group.slugs.flatMap((slug) => {
    const page = source.getPage([group.category, slug]);
    const title = page?.data.title;
    return page && title ? [{ label: title, href: page.url }] : [];
  }),
).sort((a, b) => a.label.localeCompare(b.label));

const COLUMNS: { title: string; links: FooterLink[] }[] = [
  {
    title: "Library",
    links: [
      { label: "Components", href: "/docs/components" },
      { label: "Charts", href: "/charts/area-chart" },
      { label: "Blocks", href: "/blocks" },
      { label: "Templates", href: "/templates" },
      { label: "Pro", href: "/pro" },
      { label: "AI Assistant", href: "/ai" },
      { label: "Backgrounds", href: "/docs/backgrounds" },
    ],
  },
  {
    title: "Docs",
    links: [
      { label: "Installation", href: "/docs/installation" },
      { label: "Changelog", href: "/changelog" },
      { label: "Registry index", href: "/r/registry.json" },
      { label: "llms.txt", href: "/llms.txt" },
    ],
  },
  {
    title: "Studio",
    links: [
      { label: "Cortexcn Studio", href: `${STUDIO_URL}/` },
      { label: "Services", href: `${STUDIO_URL}/services` },
      { label: "Client work", href: `${STUDIO_URL}/work` },
      { label: "Start a project", href: `${STUDIO_URL}/contact` },
    ],
  },
  {
    title: "Legal",
    links: [
      { label: "Privacy", href: `${SITE_URL}/privacy` },
      { label: "Terms", href: `${SITE_URL}/terms` },
      { label: "Refunds", href: `${SITE_URL}/refunds` },
    ],
  },
];

/** Ends in a file extension, like /llms.txt or /r/registry.json. */
const FILE_PATH_RE = /\.\w+$/;

/** Static files and other domains need a plain anchor; pages get client navigation. */
export function FooterAnchor({ link }: { link: FooterLink }) {
  const className = "text-body text-sm transition-colors hover:text-foreground";
  const isPage = link.href.startsWith("/") && !FILE_PATH_RE.test(link.href);

  return isPage ? (
    <Link className={className} href={link.href}>
      {link.label}
    </Link>
  ) : (
    <a className={className} href={link.href}>
      {link.label}
    </a>
  );
}

export function LibraryFooter() {
  return (
    <footer className="border-border border-t">
      <Container className="grid gap-12 py-14 md:grid-cols-[minmax(0,1.2fr)_minmax(0,2fr)] md:py-16">
        <div className="flex flex-col items-start gap-4">
          <div className="flex items-center gap-2">
            <Link className="flex items-center gap-2.5" href="/">
              <CortexcnLogo size={24} theme="auto" />
              <span className="font-medium text-lg tracking-[-0.02em]">
                Cortexcn
              </span>
            </Link>
            <VersionTag className="text-xs" />
          </div>
          <p className="max-w-xs text-body text-sm leading-[1.5]">
            React components, charts, and blocks for shadcn/ui. Install them
            with the CLI or your AI agent, and own the code.
          </p>
          <ProductCredit />
          <a
            className="text-foreground text-sm underline-offset-4 hover:underline"
            href={`mailto:${CONTACT_EMAIL}`}
          >
            {CONTACT_EMAIL}
          </a>
        </div>

        <nav
          aria-label="Footer"
          className="grid grid-cols-2 gap-8 sm:grid-cols-4"
        >
          {COLUMNS.map((column) => (
            <div className="flex flex-col gap-3" key={column.title}>
              <h2 className="font-medium text-sm">{column.title}</h2>
              <ul className="flex flex-col gap-2.5">
                {column.links.map((link) => (
                  <li key={link.label}>
                    <FooterAnchor link={link} />
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </Container>

      <Container className="border-border border-t py-12 md:py-14">
        <nav aria-labelledby="footer-components">
          <h2
            className="font-mono text-muted-foreground text-xs uppercase tracking-[0.08em]"
            id="footer-components"
          >
            Components{" "}
            <span className="text-muted-foreground/70">
              {COMPONENT_LINKS.length}
            </span>
          </h2>
          <ul className="mt-6 grid grid-cols-2 gap-x-8 gap-y-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {COMPONENT_LINKS.map((link) => (
              <li className="min-w-0" key={link.href}>
                <Link
                  className="block truncate text-[15px] text-foreground/85 transition-colors hover:text-foreground"
                  href={link.href}
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </Container>

      <Container className="flex flex-col items-center gap-8 border-border border-t py-10 text-center md:py-12">
        <p className="text-muted-foreground text-sm">
          © Cortexcn 2026. All rights reserved.
        </p>
        <FooterWordmark />
      </Container>
    </footer>
  );
}

/**
 * The logo and name that close the footer, as wide as the footer's content:
 * the logo starts at its left edge and the name ends at its right. The type
 * is sized from the container's width, so the pair spans it at every size.
 */
export function FooterWordmark() {
  return (
    <div className="@container w-full">
      <div className="flex items-center justify-between text-[19.8cqw] leading-none">
        <CortexcnLogo className="size-[1em]" size={356} theme="auto" />
        <span className="font-medium text-foreground tracking-[-0.06em]">
          Cortexcn
        </span>
      </div>
    </div>
  );
}
