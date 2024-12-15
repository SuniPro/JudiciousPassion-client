import globals from "globals";
import ts from "@typescript-eslint/eslint-plugin";
import tsParser from "@typescript-eslint/parser";
import pluginReact from "eslint-plugin-react";
import pluginReactHooks from "eslint-plugin-react-hooks";
import pluginImport from "eslint-plugin-import";

export default [
  {
    files: ["**/*.ts", "**/*.tsx"], // TypeScript 파일에만 적용
    languageOptions: {
      parser: tsParser,
      globals: globals.browser,
      parserOptions: {
        ecmaVersion: "latest",
        sourceType: "module",
        ecmaFeatures: {
          jsx: true,
        },
        project: "./tsconfig.eslint.json", // TypeScript 설정 파일
      },
    },
    plugins: {
      "@typescript-eslint": ts,
      react: pluginReact,
      "react-hooks": pluginReactHooks,
      import: pluginImport,
    },
    settings: {
      react: {
        version: "detect", // React 버전 자동 감지
      },
      "import/resolver": {
        typescript: true,
        node: {
          extensions: [".js", ".jsx", ".ts", ".tsx"],
        },
      },
    },
    rules: {
      // React 관련 규칙
      "react/no-unknown-property": ["error", { ignore: ["css"] }],
      "react/jsx-curly-brace-presence": [
        "error",
        { props: "never", children: "never" },
      ],
      // React Hooks 관련 규칙
      "react-hooks/rules-of-hooks": "error",
      "react-hooks/exhaustive-deps": "warn",
      // TypeScript 관련 규칙
      "@typescript-eslint/no-unnecessary-condition": "error",
      // Import 관련 규칙
      "import/extensions": [
        "error",
        "ignorePackages",
        {
          js: "never",
          jsx: "never",
          ts: "never",
          tsx: "never",
        },
      ],
      "import/no-unresolved": "error",
      "import/no-default-export": "off", // 필요에 따라 변경
      // 기타
      "arrow-body-style": ["error", "as-needed"],
    },
  },
  {
    files: ["**/*.js", "**/*.jsx"], // JavaScript 파일에만 적용
    languageOptions: {
      globals: globals.browser,
    },
    rules: {
      "arrow-body-style": ["error", "as-needed"],
    },
  },
];
