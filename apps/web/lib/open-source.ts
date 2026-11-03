import { readFile } from "node:fs/promises";
import { join } from "node:path";

import { isProItem } from "@/lib/pro";
import { OPEN_SOURCE_REPO_URL } from "@/lib/site-config";

/**
 * Where a free registry item's main source file lives in the public
 * repository, read from its file in public/r. Pro items and names that are not
 * registry items have none.
 */
export async function openSourceFileUrl(name: string | undefined) {
  if (!name || isProItem(name)) {
    return null;
  }
  try {
    const item = JSON.parse(
      await readFile(join(process.cwd(), "public/r", `${name}.json`), "utf8"),
    ) as { files?: { path?: string }[] };
    const path = item.files?.[0]?.path;
    return path ? `${OPEN_SOURCE_REPO_URL}/blob/main/${path}` : null;
  } catch {
    return null;
  }
}
