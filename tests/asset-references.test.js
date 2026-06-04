// Ensures every local file referenced by index.html (src/href) exists on disk,
// so the site never ships a broken stylesheet, script, or media 404.
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.join(__dirname, "..");
const html = fs.readFileSync(path.join(ROOT, "index.html"), "utf8");

function localReferences(source) {
  const refs = new Set();
  for (const match of source.matchAll(/(?:src|href)="([^"]+)"/g)) {
    const value = match[1];
    if (/^(https?:|\/\/|#|mailto:|data:|tel:)/.test(value)) continue;
    refs.add(value.split(/[?#]/)[0]); // strip query/hash
  }
  return [...refs];
}

const references = localReferences(html);

test("index.html references at least one local file", () => {
  assert.ok(references.length > 0, "expected local src/href references");
});

for (const ref of references) {
  test(`local reference resolves: ${ref}`, () => {
    assert.ok(
      fs.existsSync(path.join(ROOT, ref)),
      `index.html references "${ref}" but the file is missing`
    );
  });
}
