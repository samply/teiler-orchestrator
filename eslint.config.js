// Flat config (ESLint 9+). Reproduces the rules of the former
// eslint-config-ts-important-stuff / eslint-config-important-stuff setup.
const globals = require("globals");
const tseslint = require("typescript-eslint");

module.exports = [
  {
    files: ["src/**/*.{js,ts,tsx}"],
    languageOptions: {
      parser: tseslint.parser,
      sourceType: "module",
      globals: {
        ...globals.browser,
        ...globals.jest,
        ...globals.jasmine,
        SystemJS: "readonly",
        System: "readonly",
        module: "readonly",
        global: "writable",
        __webpack_public_path__: "writable",
        __webpack_require__: "readonly",
      },
    },
    rules: {
      "no-console": ["error", { allow: ["warn", "error", "info"] }],
      "no-constant-condition": "error",
      "no-debugger": "error",
      "no-dupe-args": "error",
      "no-dupe-keys": "error",
      "no-duplicate-case": "error",
      "no-obj-calls": "error",
      "no-unreachable": "error",
      "no-unsafe-negation": "error",
      "use-isnan": "error",
      "no-empty-pattern": "error",
      "no-extra-bind": "error",
      "no-implied-eval": "error",
      "no-labels": "error",
      "no-self-assign": "error",
      "no-self-compare": "error",
      "no-throw-literal": "error",
      "no-void": "error",
      "no-with": "error",
      "no-shadow-restricted-names": "error",
      "no-undef": "off",
      "constructor-super": "error",
      "no-const-assign": "error",
      "no-dupe-class-members": "error",
      "no-duplicate-imports": "error",
      "no-this-before-super": "error",
    },
  },
];
