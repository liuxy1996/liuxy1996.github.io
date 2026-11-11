import fs from "node:fs";
import path from "node:path";

/**
 * Next 16 static export writes RSC payloads beneath folders named like
 * `__next.book/`. The browser requests the same payload with dot-separated
 * segments (`__next.book.__PAGE__.txt`). GitHub Pages cannot rewrite that path,
 * so create the flattened copies in the exported artifact.
 */
const root = path.join(process.cwd(), "out");

if (!fs.existsSync(root)) {
  console.error("No out/ directory found. Run next build first.");
  process.exit(1);
}

function filesUnder(directory) {
  return fs.readdirSync(directory, { withFileTypes: true }).flatMap((entry) => {
    const fullPath = path.join(directory, entry.name);
    return entry.isDirectory() ? filesUnder(fullPath) : [fullPath];
  });
}

let copied = 0;

function flattenRscDirectory(directory) {
  for (const file of filesUnder(directory)) {
    const relativeToRsc = path.relative(directory, file).split(path.sep).join(".");
    const target = `${directory}.${relativeToRsc}`;
    fs.mkdirSync(path.dirname(target), { recursive: true });
    fs.copyFileSync(file, target);
    copied += 1;
  }
}

function scan(directory) {
  for (const entry of fs.readdirSync(directory, { withFileTypes: true })) {
    if (!entry.isDirectory()) continue;
    const fullPath = path.join(directory, entry.name);
    if (entry.name.startsWith("__next.")) {
      flattenRscDirectory(fullPath);
    } else {
      scan(fullPath);
    }
  }
}

scan(root);
console.log(`Created ${copied} flattened RSC payload file(s).`);
