import { execFileSync } from "node:child_process";
import { existsSync, mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const repoRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outputPath = resolve(
  repoRoot,
  "client/src/data/generated/avatarUiVersion.ts"
);
const localPackagePath = resolve(repoRoot, "../avatar-ui/package.json");
const remoteRepo = "https://github.com/siqidev/avatar-ui.git";
const fallbackVersion = "v0.5.0";

function normalizeVersion(version) {
  const trimmed = String(version).trim();
  return trimmed.startsWith("v") ? trimmed : `v${trimmed}`;
}

function compareSemver(a, b) {
  const partsA = a.replace(/^v/, "").split(".").map(Number);
  const partsB = b.replace(/^v/, "").split(".").map(Number);
  for (let i = 0; i < Math.max(partsA.length, partsB.length); i += 1) {
    const delta = (partsA[i] ?? 0) - (partsB[i] ?? 0);
    if (delta !== 0) return delta;
  }
  return 0;
}

function readEnvVersion() {
  return process.env.AVATAR_UI_VERSION
    ? {
        source: "env",
        version: normalizeVersion(process.env.AVATAR_UI_VERSION),
      }
    : null;
}

function readGitHubLatestTag() {
  try {
    const refs = execFileSync(
      "git",
      ["ls-remote", "--tags", "--refs", remoteRepo],
      { encoding: "utf8", timeout: 5000 }
    );
    const versions = refs
      .split("\n")
      .map(line => line.match(/refs\/tags\/(v\d+\.\d+\.\d+)$/)?.[1])
      .filter(Boolean)
      .sort(compareSemver);
    const version = versions.at(-1);
    return version ? { source: "github-tags", version } : null;
  } catch {
    return null;
  }
}

function readLocalPackageVersion() {
  if (!existsSync(localPackagePath)) return null;
  try {
    const pkg = JSON.parse(readFileSync(localPackagePath, "utf8"));
    return pkg.version
      ? { source: "local-package", version: normalizeVersion(pkg.version) }
      : null;
  } catch {
    return null;
  }
}

const result = readEnvVersion() ??
  readGitHubLatestTag() ??
  readLocalPackageVersion() ?? { source: "fallback", version: fallbackVersion };

mkdirSync(dirname(outputPath), { recursive: true });
writeFileSync(
  outputPath,
  [
    "// このファイルは scripts/sync-avatar-ui-version.mjs により生成されます。",
    `export const avatarUiVersion = "${result.version}";`,
    `export const avatarUiVersionSource = "${result.source}";`,
    "",
  ].join("\n")
);

console.log(`avatar-ui version synced: ${result.version} (${result.source})`);
