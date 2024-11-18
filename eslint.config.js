import globals from "globals";
import pluginJs from "@eslint/js";
import tsEslint from "@typescript-eslint/eslint-plugin";
import tsEslintParser from "@typescript-eslint/parser";
import pluginReact from "eslint-plugin-react";
import prettier from "eslint-plugin-prettier"; // para Prettier
import prettierConfig from "eslint-config-prettier"; // configuración de Prettier

/** @type {import('eslint').Linter.Config} */
export default [
  {
    files: ["**/*.{js,mjs,cjs,ts,tsx}"],
    languageOptions: {
      parser: tsEslintParser, // Usar el parser de TypeScript
      globals: globals.browser,
    },
    plugins: {
      "@typescript-eslint": tsEslint,
      react: pluginReact,
      prettier: prettier, // Plugin de Prettier
    },
    rules: {
      ...tsEslint.configs.recommended.rules,
      ...pluginJs.configs.recommended.rules,
      ...pluginReact.configs.flat.recommended.rules,
      "prettier/prettier": "error", // Aplicar reglas de Prettier como errores
      "react/react-in-jsx-scope": "off",
    },
    settings: {
      react: {
        version: "detect", // Detectar automáticamente la versión de React
      },
    },
  },
  prettierConfig, // Configuración de Prettier para evitar conflictos de formato
];
