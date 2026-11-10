import { CHANGELOG } from "@/lib/changelog";

/**
 * The Cortexcn version, `vMAJOR.MINOR.PATCH`, shown beside the name in the
 * header and the footers. MINOR counts the releases in the changelog since
 * the current major began, so each new entry raises it with no extra step.
 * See "Versioning" in CLAUDE.md for when to change the rest by hand.
 */

/**
 * Raised by hand for a breaking change, such as a renamed registry namespace
 * or removed props. Set `since` to that day, so MINOR starts again at 0.
 * 1 began with the first release in the changelog.
 */
const MAJOR = { number: 1, since: "2026-09-20" };

/** Fix-only deploys since the latest release. Back to 0 with the next entry. */
const PATCH = 4;

const MINOR = CHANGELOG.filter((release) => release.date >= MAJOR.since).length;

export const VERSION = `${MAJOR.number}.${MINOR}.${PATCH}`;

/** The version with its "v", such as "v1.52.0". */
export const VERSION_LABEL = `v${VERSION}`;
