import { cp, mkdir, readFile, readdir, rm, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distRoot = resolve(projectRoot, "dist");
const generatedRoutes = ["experience", "projects", "profile", "cv", "tour"];

await rm(resolve(projectRoot, "assets"), { recursive: true, force: true });
await mkdir(resolve(projectRoot, "assets"), { recursive: true });
await cp(resolve(distRoot, "assets"), resolve(projectRoot, "assets"), { recursive: true });

for (const route of generatedRoutes) {
  const destination = resolve(projectRoot, route);
  await rm(destination, { recursive: true, force: true });
  await cp(resolve(distRoot, route), destination, { recursive: true });
}

for (const filename of ["index.html", "404.html", "CNAME", "robots.txt", "sitemap.xml", "cv-complete.pdf"]) {
  const source = resolve(distRoot, filename);
  const content = await readFile(source);
  await writeFile(resolve(projectRoot, filename), content);
}

const files = await readdir(resolve(projectRoot, "assets"));
console.log(`GitHub Pages files synced: ${files.length} current assets and ${generatedRoutes.length} route pages.`);
