import { cp, mkdir, rm } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const frontendRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const repositoryRoot = resolve(frontendRoot, "..");
const files = [
  "meta.json",
  "daily.json",
  "investor.json",
  "brief_daily.json",
  "brief_weekly.json",
];

const snapshots = [
  { name: "out", source: resolve(repositoryRoot, "data", "out") },
  {
    name: "video",
    source: resolve(
      repositoryRoot,
      "data",
      "out",
      "history",
      "2026-10-02",
    ),
  },
];

for (const snapshot of snapshots) {
  const target = resolve(
    frontendRoot,
    "dist",
    "snapshots",
    snapshot.name,
  );
  await rm(target, { recursive: true, force: true });
  await mkdir(target, { recursive: true });

  for (const file of files)
    await cp(resolve(snapshot.source, file), resolve(target, file));

  await cp(resolve(snapshot.source, "stocks"), resolve(target, "stocks"), {
    recursive: true,
  });
}

console.log("Copied current and video snapshots to dist/snapshots.");
