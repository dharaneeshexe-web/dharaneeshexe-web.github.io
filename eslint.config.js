// Minimal flat ESLint config for the site's vanilla browser JavaScript.
// Browser globals are allowed (no-undef off) since there is no bundler.
export default [
  {
    files: ["**/*.js"],
    ignores: ["assets/**", "**/*.min.js", "node_modules/**"],
    languageOptions: {
      ecmaVersion: 2022,
      sourceType: "script",
    },
    rules: {
      "no-unused-vars": "warn",
      "no-undef": "off",
      "no-empty": "warn",
    },
  },
];
