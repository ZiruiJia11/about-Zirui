import { mkdir, readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";

const projectRoot = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const distRoot = resolve(projectRoot, "dist");
const template = await readFile(resolve(distRoot, "index.html"), "utf8");

const routes = [
  { path: "experience", title: "Experience | Steven Jia", description: "Steven Jia's full-stack development, coding education, technical support, and customer-facing experience.", heading: "Steven Jia — Professional Experience" },
  { path: "projects", title: "Software Projects | Steven Jia", description: "Selected Laravel, Vue, React, Next.js, .NET, AI, data automation, testing, and integration projects by Steven Jia.", heading: "Steven Jia — Selected Software Projects" },
  { path: "profile", title: "Technical Profile | Steven Jia", description: "Steven Jia's technical skills, education, certification, engineering practice, and professional interests.", heading: "Steven Jia — Technical Profile" },
  { path: "cv", title: "CV and Contact | Steven Jia", description: "View Steven Jia's current software engineering CV and contact information.", heading: "Steven Jia — CV and Contact" },
  { path: "tour", title: "3D Portfolio Tour | Steven Jia", description: "Explore Steven Jia's experience, projects, technical skills, and contact details through an interactive 3D portfolio tour.", heading: "Steven Jia — Interactive 3D Portfolio Tour" },
];

const replaceMeta = (html, route) => {
  const url = `https://stevenjia.co.nz/${route.path}`;
  return html
    .replace(/<title>.*?<\/title>/, `<title>${route.title}</title>`)
    .replace(/<meta name="description" content="[^"]*"\s*\/>/, `<meta name="description" content="${route.description}" />`)
    .replace(/<link rel="canonical" href="[^"]*"\s*\/>/, `<link rel="canonical" href="${url}" />`)
    .replace(/<meta property="og:url" content="[^"]*"\s*\/>/, `<meta property="og:url" content="${url}" />`)
    .replace(/<meta property="og:title" content="[^"]*"\s*\/>/, `<meta property="og:title" content="${route.title}" />`)
    .replace(/<meta property="og:description" content="[^"]*"\s*\/>/, `<meta property="og:description" content="${route.description}" />`)
    .replace(/<meta name="twitter:title" content="[^"]*"\s*\/>/, `<meta name="twitter:title" content="${route.title}" />`)
    .replace(/<meta name="twitter:description" content="[^"]*"\s*\/>/, `<meta name="twitter:description" content="${route.description}" />`)
    .replace(/(<h1 data-static-heading[^>]*>).*?(<\/h1>)/, `$1${route.heading}$2`);
};

for (const route of routes) {
  const routeDir = resolve(distRoot, route.path);
  await mkdir(routeDir, { recursive: true });
  await writeFile(resolve(routeDir, "index.html"), replaceMeta(template, route), "utf8");
}

await writeFile(resolve(distRoot, "404.html"), template, "utf8");
