import { OPEN_SOURCE_REPO_URL } from "@/lib/site-config";

/**
 * Served from the cache and refreshed at most once an hour, so GitHub sees
 * about one request an hour, well inside its limit for anonymous calls.
 */
export const revalidate = 3600;

/** "Cortexcn/ui", from the public repository's URL. */
const REPO = new URL(OPEN_SOURCE_REPO_URL).pathname.slice(1);

/** The star count of the public repository, for the header's GitHub button. */
export async function GET() {
  try {
    const response = await fetch(`https://api.github.com/repos/${REPO}`, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "cortexcn.dev",
      },
      next: { revalidate: 3600 },
    });
    if (!response.ok) {
      return Response.json({ stars: null }, { status: 502 });
    }
    const data = (await response.json()) as { stargazers_count?: number };
    return Response.json({ stars: data.stargazers_count ?? null });
  } catch {
    return Response.json({ stars: null }, { status: 502 });
  }
}
