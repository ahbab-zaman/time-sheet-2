// import { defineConfig } from "eslint/config";
// import js from "@eslint/js";
// import globals from "globals";

// export default defineConfig([
//   {
//     ignores: ["**/dist/**", "**/node_modules/**"],
//   },
//   {
//     files: ["**/*.js"],
//     plugins: { js },
//     extends: ["js/recommended", "prettier"],
//     languageOptions: {
//       sourceType: "commonjs",
//       globals: {
//         ...globals.node,
//       },
//     },
//     rules: {
//       "no-unused-vars": "warn",
//       "no-undef": "warn",
//       // "no-console": "warn", 

//     },
  
//   },
// ]);

// eslint.config.js or eslint.config.mjs
import { defineConfig } from "eslint/config";
import js from "@eslint/js";
import globals from "globals";

export default defineConfig([
  {
    ignores: ["**/dist/**", "**/node_modules/**"],
  },
  {
    files: ["**/*.js"],
    languageOptions: {
      sourceType: "commonjs",
      globals: globals.node,
    },
    plugins: {
      js, // Needed for the plugin to work
    },
    rules: {
      ...js.configs.recommended.rules,
      "no-unused-vars": "warn",
      "no-undef": "warn",
    },
  },
]);
