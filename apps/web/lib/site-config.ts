/*
 * Numbers and links the owner updates by hand. Every value here shows on the
 * live site, so keep each one true. Set a number to null to hide it.
 */

/**
 * Placeholder content (empty logo slots, sample quotes, draft case studies)
 * shows while you run `bun run dev`, so you can see the layout, and never in
 * a production build.
 */
export const SHOW_PLACEHOLDERS = process.env.NODE_ENV === "development";

/**
 * The public status page on Better Stack. The footer status badge links to
 * it, and reads the state of the monitors on it (lib/system-status.ts).
 */
export const STATUS_PAGE = {
  url: "https://cortexcn.betteruptime.com",
  betterStackId: "269902",
};

/** The strip under the home page hero. */
export const PROOF_STATS = {
  /**
   * Leave null to count the components in the docs, rounded down to the ten
   * (such as "80+"), so the number never runs ahead of the library.
   */
  components: null as string | null,
  /** Registry installs this month. See /admin/stats for the count. */
  installsThisMonth: null as number | null,
  /** Client projects shipped, such as "25+". */
  clientProjects: "25+" as string | null,
  /** Templates sold so far. */
  templatesSold: null as number | null,
  /**
   * People using Cortexcn, for "Trusted by ..." on /templates. Raise it only
   * once the real count passes it. Set to null to hide the line.
   */
  users: "70+" as string | null,
};

/**
 * Hosted checkout links (Lemon Squeezy, Gumroad, Polar, or a Stripe Payment
 * Link) for the component plans. Until a link is set, the Buy button opens
 * the contact form with the order written out.
 */
export const CHECKOUT_URLS = {
  pro: "",
  ultra: "",
};

/**
 * Where each Cortexcn Pro license's Buy button goes: the checkout page, which
 * signs the buyer in and hands them to Dodo Payments. Until the payment keys
 * are set on the server, that page sends them on to the contact form with the
 * order written out.
 */
export const PRO_LICENSE_CHECKOUT_URLS = {
  year: "/checkout/year",
  lifetime: "/checkout/lifetime",
  team: "/checkout/team",
};

/**
 * The public repository with the source of every free registry item. It is
 * filled from this one by .github/workflows/sync-core.yml.
 */
export const OPEN_SOURCE_REPO_URL = "https://github.com/Cortexcn/ui";

/** GitHub Sponsors, the same account as .github/FUNDING.yml. */
export const SPONSOR_URL = "https://github.com/sponsors/SyedMoin-lab";

export interface TrustedByLogo {
  name: string;
  /** A file in /public, such as "/logos/clients/acme.svg". */
  src: string;
  /** Their site, if they are happy to be linked. */
  url?: string;
}

/**
 * Clients who agreed to show their logo. The "Trusted by" row stays hidden
 * until there is at least one.
 */
export const TRUSTED_BY: TrustedByLogo[] = [];

/** How many empty slots the "Trusted by" row shows in development. */
export const TRUSTED_BY_PLACEHOLDER_SLOTS = 6;

/**
 * The photo on /about: a file in /public, such as "/img/syed.jpg". While it
 * is empty, the page shows a frame with initials instead.
 */
export const ABOUT_PHOTO = { src: "", alt: "Syed Moinuddin" };
