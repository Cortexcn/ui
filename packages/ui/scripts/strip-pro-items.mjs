#!/usr/bin/env node
/**
 * Keeps Cortexcn Pro out of the public registry. The last step of
 * `registry:build`: it deletes the Pro items `shadcn build` wrote to
 * apps/web/public/r, publishes registry.json without them, and records their
 * names in pro-items.json, which the site reads to show Pro panels instead of
 * install commands and source.
 *
 * Pro is the charts: every item in the `charts` category, the chart core
 * (`chart-*`), and everything that depends on them, such as the chart parts,
 * the Open in v0 examples, and the stat card blocks. New charts are Pro
 * without any change here. Any other item marked `meta.pro`, such as a block
 * with `pro: true` in generate-block-registry.mjs, is Pro too, along with
 * everything that depends on it.
 */
import { existsSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const uiRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const outputDir = join(uiRoot, "../../apps/web/public/r");

const NAMESPACE_RE = /^@cortexcn\//;

/** The item name a registry dependency points at, or null for other registries. */
function dependencyName(dependency) {
  if (NAMESPACE_RE.test(dependency)) {
    return dependency.replace(NAMESPACE_RE, "");
  }
  return null;
}

function proItemNames(items) {
  const pro = new Set(
    items
      .filter(
        (item) =>
          (item.categories ?? []).includes("charts") ||
          item.name.startsWith("chart-") ||
          item.meta?.pro === true,
      )
      .map((item) => item.name),
  );

  let grew = true;
  while (grew) {
    grew = false;
    for (const item of items) {
      if (pro.has(item.name)) {
        continue;
      }
      const needsPro = (item.registryDependencies ?? []).some((dependency) =>
        pro.has(dependencyName(dependency)),
      );
      if (needsPro) {
        pro.add(item.name);
        grew = true;
      }
    }
  }

  return [...pro].sort();
}

const registry = JSON.parse(
  readFileSync(join(uiRoot, "registry.json"), "utf8"),
);
// The public repository has no Pro items in registry.json, so there the Pro
// names the main source wrote are kept: the site needs them to show Pro panels.
const hasProSource = existsSync(join(uiRoot, "src/charts"));
const previousPro = hasProSource
  ? []
  : JSON.parse(readFileSync(join(uiRoot, "pro-items.json"), "utf8"));
const pro = [
  ...new Set([...proItemNames(registry.items), ...previousPro]),
].sort();
const proSet = new Set(pro);

for (const name of pro) {
  rmSync(join(outputDir, `${name}.json`), { force: true });
}

const published = {
  ...registry,
  items: registry.items.filter((item) => !proSet.has(item.name)),
};
writeFileSync(
  join(outputDir, "registry.json"),
  `${JSON.stringify(published, null, 2)}\n`,
);
writeFileSync(
  join(uiRoot, "pro-items.json"),
  `${JSON.stringify(pro, null, 2)}\n`,
);

console.log(
  `Kept ${pro.length} Pro items out of the public registry (${published.items.length} published).`,
);
