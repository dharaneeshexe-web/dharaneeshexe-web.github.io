// Validates portfolio-data.json — the data script.js renders the project grid from.
// A broken or malformed file here means an empty/blank portfolio in production.
const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const ROOT = path.join(__dirname, "..");
const raw = fs.readFileSync(path.join(ROOT, "portfolio-data.json"), "utf8");

test("portfolio-data.json is valid JSON", () => {
  assert.doesNotThrow(() => JSON.parse(raw));
});

test("has a non-empty projects array", () => {
  const data = JSON.parse(raw);
  assert.ok(Array.isArray(data.projects), "projects must be an array");
  assert.ok(data.projects.length > 0, "projects must not be empty");
});

test("every project has a name and a links object", () => {
  const data = JSON.parse(raw);
  for (const p of data.projects) {
    assert.equal(typeof p.name, "string", "project name must be a string");
    assert.ok(p.name.length > 0, "project name must not be empty");
    assert.equal(typeof p.links, "object", `project ${p.name} must have links`);
  }
});
