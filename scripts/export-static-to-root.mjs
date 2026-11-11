import fs from "node:fs";
import path from "node:path";

/**
 * The repository publishes GitHub Pages from the `main` branch root.
 * Copy the Next.js export into the root so the branch build serves the built
 * site, while keeping the editable source in app/, content/, and components/.
 */
const root = process.cwd();
const output = path.join(root, "out");
const manifestPath = path.join(root, ".static-export-manifest.json");

const protectedPaths = new Set([
  ".git",
  ".github",
  ".gitignore",
  ".gitattributes",
  "app",
  "components",
  "content",
  "lib",
  "node_modules",
  "out",
  "public",
  "scripts",
  "package.json",
  "package-lock.json",
  "next.config.ts",
  "tsconfig.json",
  "next-env.d.ts",
  "README.md",
]);

if (!fs.existsSync(output)) {
  console.error("No out/ directory found. Run `npm run build` first.");
  process.exit(1);
}

const previous = fs.existsSync(manifestPath)
  ? JSON.parse(fs.readFileSync(manifestPath, "utf8"))
  : [];

for (const relativePath of previous) {
  if (protectedPaths.has(relativePath)) continue;
  const target = path.resolve(root, relativePath);
  if (!target.startsWith(root + path.sep)) continue;
  fs.rmSync(target, { recursive: true, force: true });
}

const entries = fs
  .readdirSync(output, { withFileTypes: true })
  .map((entry) => entry.name)
  .filter((name) => !protectedPaths.has(name))
  .sort();

function copyDirectory(sourceDirectory, targetDirectory) {
  fs.mkdirSync(targetDirectory, { recursive: true });
  for (const entry of fs.readdirSync(sourceDirectory, { withFileTypes: true })) {
    const source = path.join(sourceDirectory, entry.name);
    const target = path.join(targetDirectory, entry.name);
    if (entry.isDirectory()) copyDirectory(source, target);
    else fs.copyFileSync(source, target);
  }
}

for (const name of entries) {
  const source = path.join(output, name);
  const target = path.join(root, name);
  fs.rmSync(target, { recursive: true, force: true });
  if (fs.statSync(source).isDirectory()) copyDirectory(source, target);
  else fs.copyFileSync(source, target);
}

fs.writeFileSync(
  manifestPath,
  JSON.stringify(entries, null, 2) + "\n",
  "utf8",
);

console.log(`Published ${entries.length} generated entries to the Pages root.`);
