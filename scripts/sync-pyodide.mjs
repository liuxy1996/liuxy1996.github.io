import fs from "node:fs";
import path from "node:path";

const root = process.cwd();
const source = path.join(root, "node_modules", "pyodide");
const target = path.join(root, "public", "pyodide");
const versionFile = path.join(target, ".version");

if (!fs.existsSync(source)) {
  console.error("pyodide is not installed. Run npm install first.");
  process.exit(1);
}

const packageJson = JSON.parse(
  fs.readFileSync(path.join(source, "package.json"), "utf8"),
);
const version = packageJson.version;

if (
  fs.existsSync(versionFile) &&
  fs.readFileSync(versionFile, "utf8").trim() === version &&
  fs.existsSync(path.join(target, "pyodide.js"))
) {
  console.log(`Pyodide ${version} assets already present.`);
  process.exit(0);
}

fs.rmSync(target, { recursive: true, force: true });
fs.mkdirSync(target, { recursive: true });

const copied = [];
for (const entry of fs.readdirSync(source, { withFileTypes: true })) {
  if (!entry.isFile()) continue;
  if (
    entry.name === "package.json" ||
    entry.name === "README.md" ||
    entry.name.endsWith(".d.ts") ||
    entry.name.endsWith(".map")
  ) {
    continue;
  }
  fs.copyFileSync(path.join(source, entry.name), path.join(target, entry.name));
  copied.push(entry.name);
}

fs.writeFileSync(versionFile, `${version}\n`);
console.log(`Copied Pyodide ${version}: ${copied.join(", ")}`);
