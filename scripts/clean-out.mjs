import fs from "node:fs";
import path from "node:path";

const output = path.join(process.cwd(), "out");
fs.rmSync(output, { recursive: true, force: true });
console.log("Cleaned out/ before static export.");
