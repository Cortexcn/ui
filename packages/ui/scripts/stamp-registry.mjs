#!/usr/bin/env node
/**
 * Stamps the public registry so a user, or their agent, can see where an
 * item came from and install exactly the revision they reviewed. The last
 * step of `registry:build`, after strip-pro-items.mjs. For every published
 * item it sets:
 *
 * - `author`, and `meta.license`: MIT unless the item's own `meta` in
 *   registry.json says otherwise, as the Apache-2.0 adaptations do.
 * - npm dependencies pinned to the major version this workspace builds with.
 * - @cortexcn registry dependencies as full URLs, so an item installs from
 *   its URL without the @cortexcn registry in components.json.
 * - `meta.revision`, and a two-line header on each script file naming the
 *   item, its revision, and its license.
 *
 * It then keeps a copy of each item at /r/v/<name>/<revision>.json. Those
 * copies never change: new revisions get new files, and committed ones stay
 * so pinned installs keep working. Uncommitted copies from earlier builds are
 * removed, and Pro items never get one.
 */
import { execFileSync } from "node:child_process";
import {
  existsSync,
  mkdirSync,
  readdirSync,
  readFileSync,
  rmSync,
  writeFileSync,
} from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";
import { stampIndexEntry, stampItem } from "./registry-stamp.mjs";

const uiRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const repoRoot = join(uiRoot, "../..");
const outputDir = join(repoRoot, "apps/web/public/r");
const pinnedDir = join(outputDir, "v");
const PINNED_DIR_IN_REPO = "apps/web/public/r/v";

function readJson(path) {
  return JSON.parse(readFileSync(path, "utf8"));
}

/** shadcn writes item files with two-space indents and no final newline. */
function writeItemJson(path, item) {
  writeFileSync(path, JSON.stringify(item, null, 2));
}

const { homepage } = readJson(join(uiRoot, "registry.json"));
const workspace = readJson(join(uiRoot, "package.json"));
const options = {
  homepage,
  author: `Cortexcn (${homepage})`,
  declaredVersions: {
    ...workspace.devDependencies,
    ...workspace.dependencies,
  },
};

const undeclared = new Set();
const revisions = new Map();

for (const fileName of readdirSync(outputDir)) {
  if (!fileName.endsWith(".json") || fileName === "registry.json") {
    continue;
  }
  const path = join(outputDir, fileName);
  const item = stampItem(readJson(path), options);
  for (const dependency of [
    ...(item.dependencies ?? []),
    ...(item.devDependencies ?? []),
  ]) {
    if (
      !(dependency.includes("@", 1) || options.declaredVersions[dependency])
    ) {
      undeclared.add(dependency);
    }
  }
  writeItemJson(path, item);
  revisions.set(item.name, item.meta.revision);

  const pinnedPath = join(pinnedDir, item.name, `${item.meta.revision}.json`);
  const content = JSON.stringify(item, null, 2);
  if (existsSync(pinnedPath)) {
    if (readFileSync(pinnedPath, "utf8") !== content) {
      throw new Error(
        `${pinnedPath} already exists with other content. Pinned copies never change; if the stamp output changed shape, bump STAMP_FORMAT in registry-stamp.mjs.`,
      );
    }
  } else {
    mkdirSync(dirname(pinnedPath), { recursive: true });
    writeFileSync(pinnedPath, content);
  }
}

const indexPath = join(outputDir, "registry.json");
const index = readJson(indexPath);
index.items = index.items.map((entry) => {
  const revision = revisions.get(entry.name);
  if (!revision) {
    throw new Error(
      `registry.json lists ${entry.name}, but ${entry.name}.json was not built.`,
    );
  }
  return stampIndexEntry(entry, revision, options);
});
writeFileSync(indexPath, `${JSON.stringify(index, null, 2)}\n`);

/** Pinned copies in git, or null outside a git checkout. */
function committedPinnedCopies() {
  try {
    const output = execFileSync(
      "git",
      ["ls-files", "-z", "--", PINNED_DIR_IN_REPO],
      { cwd: repoRoot, encoding: "utf8" },
    );
    return new Set(output.split("\0").filter(Boolean));
  } catch {
    return null;
  }
}

const proItems = new Set(readJson(join(uiRoot, "pro-items.json")));
const committed = committedPinnedCopies();
let removed = 0;

for (const name of readdirSync(pinnedDir)) {
  const dir = join(pinnedDir, name);
  if (proItems.has(name)) {
    rmSync(dir, { recursive: true, force: true });
    continue;
  }
  if (!committed) {
    continue;
  }
  for (const fileName of readdirSync(dir)) {
    const current = fileName === `${revisions.get(name)}.json`;
    const inGit = committed.has(`${PINNED_DIR_IN_REPO}/${name}/${fileName}`);
    if (!(current || inGit)) {
      rmSync(join(dir, fileName));
      removed += 1;
    }
  }
  if (readdirSync(dir).length === 0) {
    rmSync(dir, { recursive: true });
  }
}

if (undeclared.size > 0) {
  console.warn(
    `Not pinned, because packages/ui/package.json does not declare them: ${[...undeclared].sort().join(", ")}`,
  );
}
console.log(
  `Stamped ${revisions.size} registry items with their license and revision${removed > 0 ? `, and removed ${removed} uncommitted pinned copies` : ""}.`,
);
