import js from "@eslint/js";
import tseslint from "typescript-eslint";
import react from "eslint-plugin-react";
import reactHooks from "eslint-plugin-react-hooks";
import prettier from "eslint-config-prettier";
import globals from "globals";

export default tseslint.config(
  { ignores: ["build/", "index.html", "node_modules/"] },
  js.configs.recommended,
  {
    // Tutto il codice TypeScript del progetto: sorgente app + config di root
    // (vitest.config.mts incluso, altrimenti verrebbe parsato come JS puro).
    files: ["src/**/*.{ts,tsx}", "*.config.{ts,mts,cts}"],
    extends: [...tseslint.configs.recommended],
  },
  {
    // react-hooks si applica anche a .ts semplici (es. custom hook in
    // useCharacterSheet.ts, che non contiene JSX).
    files: ["src/**/*.{ts,tsx}"],
    plugins: { "react-hooks": reactHooks },
    languageOptions: {
      globals: { ...globals.browser, ...globals.es2022 },
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "@typescript-eslint/no-unused-vars": ["warn", { argsIgnorePattern: "^_", varsIgnorePattern: "^_" }],
    },
  },
  {
    files: ["src/**/*.tsx"],
    extends: [react.configs.flat.recommended],
    settings: {
      react: { version: "detect" },
    },
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
  },
  {
    files: ["src/**/*.test.{ts,tsx}", "src/test/**/*.{ts,tsx}"],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
  {
    // Script Node CommonJS eseguito da npm (non fa parte del bundle browser).
    files: ["build.js"],
    languageOptions: {
      globals: { ...globals.node },
      sourceType: "commonjs",
    },
    rules: {
      "@typescript-eslint/no-require-imports": "off",
    },
  },
  {
    files: ["*.config.{js,mjs,ts,mts,cts}", "eslint.config.mjs"],
    languageOptions: {
      globals: { ...globals.node },
    },
  },
  prettier
);
