// Runs after `vite build`. Writes dist/<route>/index.html for every page so that:
//  - link previews (LinkedIn, WhatsApp, Slack, X) show each case study's own title, text and image,
//    since those crawlers don't run JavaScript;
//  - GitHub Pages serves deep links directly instead of going through the 404 redirect.
// Also writes sitemap.xml. Keep titles in sync with useDocumentTitle() in each page.
import { mkdirSync, readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const SITE = "https://erickmateli.github.io";
const dist = fileURLToPath(new URL("../dist/", import.meta.url));

const routes = [
  { path: "/" },
  {
    path: "/case-study/yellow-pages",
    title: "Yellow Pages Kenya Redesign | Erick Mateli",
    description:
      "How I led the Yellow Pages Kenya redesign around one task — search, find, contact — growing users from 472K to 1.7M across six countries.",
    image: "/og/yellow-pages.jpg",
  },
  {
    path: "/case-study/aspin",
    title: "ASPIN Platform Redesign | Erick Mateli",
    description:
      "How I restructured ASPIN, an insurance platform serving 5M customers across 11 countries, around the work people actually do.",
    image: "/og/aspin.jpg",
  },
  {
    path: "/case-study/aspin-marketplace",
    title: "ASPIN Marketplace | Erick Mateli",
    description:
      "Designing and building a self-serve insurance marketplace: 57 insurers, five product lines, now pitched to partners across Africa.",
    image: "/og/aspin-marketplace.jpg",
  },
];

const escape = (s) => s.replace(/&/g, "&amp;").replace(/"/g, "&quot;").replace(/</g, "&lt;");
const template = readFileSync(join(dist, "index.html"), "utf8");

function setMeta(html, attr, key, value) {
  const re = new RegExp(`(<meta ${attr}="${key}" content=")[^"]*(")`);
  if (!re.test(html)) throw new Error(`Missing <meta ${attr}="${key}"> in index.html`);
  return html.replace(re, `$1${escape(value)}$2`);
}

for (const route of routes) {
  if (route.path === "/") continue;
  const url = SITE + route.path;
  let html = template.replace(/<title>[^<]*<\/title>/, `<title>${escape(route.title)}</title>`);
  html = html.replace(/(<link rel="canonical" href=")[^"]*(")/, `$1${url}$2`);
  html = setMeta(html, "name", "description", route.description);
  html = setMeta(html, "property", "og:title", route.title);
  html = setMeta(html, "property", "og:description", route.description);
  html = setMeta(html, "property", "og:url", url);
  html = setMeta(html, "property", "og:image", SITE + route.image);
  html = setMeta(html, "property", "og:image:alt", route.title);
  html = setMeta(html, "name", "twitter:title", route.title);
  html = setMeta(html, "name", "twitter:description", route.description);
  html = setMeta(html, "name", "twitter:image", SITE + route.image);
  html = html.replace('<meta property="og:type" content="website" />', '<meta property="og:type" content="article" />');

  const file = join(dist, route.path, "index.html");
  mkdirSync(dirname(file), { recursive: true });
  writeFileSync(file, html);
  console.log(`route page: ${route.path}`);
}

const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes.map((r) => `  <url><loc>${SITE}${r.path}</loc><lastmod>${today}</lastmod></url>`).join("\n")}
</urlset>
`;
writeFileSync(join(dist, "sitemap.xml"), sitemap);
console.log("sitemap.xml written");
