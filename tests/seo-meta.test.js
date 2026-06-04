// Guards the SEO/social/accessibility essentials so a future edit can't quietly
// drop the title, lang attribute, Open Graph tags, or the SEO support files.
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");

const requiredMarkup = {
  "lang attribute on <html>": /<html[^>]*\blang=/i,
  "page <title>": /<title>[^<]+<\/title>/i,
  "meta description": /name="description"/i,
  "Open Graph title": /property="og:title"/i,
  "Open Graph image": /property="og:image"/i,
  "Twitter card": /name="twitter:card"/i,
  "canonical link": /rel="canonical"/i,
  "JSON-LD structured data": /application\/ld\+json/i,
};

for (const [label, pattern] of Object.entries(requiredMarkup)) {
  test(`index.html includes ${label}`, () => {
    assert.match(html, pattern);
  });
}

for (const file of ["robots.txt", "sitemap.xml", "manifest.json"]) {
  test(`SEO support file exists: ${file}`, () => {
    assert.ok(fs.existsSync(path.join(ROOT, file)), `${file} is missing`);
  });
}
