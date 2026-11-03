import { spawnSync } from "node:child_process";
import { existsSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const packageRoot = join(dirname(fileURLToPath(import.meta.url)), "..");
const testDirs = [
  join(packageRoot, "src/charts/__tests__"),
  join(packageRoot, "scripts/__tests__"),
];

// The public repository has no charts, so skip folders that are not here.
const tests = testDirs
  .filter((testDir) => existsSync(testDir))
  .flatMap((testDir) =>
    readdirSync(testDir)
      .filter((name) => name.endsWith(".test.ts"))
      .map((name) => join(testDir, name)),
  );

if (tests.length === 0) {
  console.error(`No test files found in ${testDirs.join(", ")}`);
  process.exit(1);
}

const result = spawnSync(
  process.execPath,
  ["--import", "tsx", "--test", ...tests],
  { stdio: "inherit", cwd: packageRoot },
);

process.exit(result.status ?? 1);
