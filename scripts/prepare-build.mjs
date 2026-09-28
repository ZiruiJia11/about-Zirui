import { copyFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";
import { dirname, resolve } from "node:path";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");

await copyFile(
  resolve(projectRoot, "index.source.html"),
  resolve(projectRoot, "index.html"),
);
