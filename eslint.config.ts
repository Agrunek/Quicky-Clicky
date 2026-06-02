import pluginRouter from '@tanstack/eslint-plugin-router';
import js from '@eslint/js';
import eslintConfigPrettier from 'eslint-config-prettier/flat';
import perfectionist from 'eslint-plugin-perfectionist';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import { defineConfig, globalIgnores } from 'eslint/config';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default defineConfig([
  globalIgnores(['dist']),
  {
    extends: [
      js.configs.recommended,
      tseslint.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      pluginRouter.configs['flat/recommended'],
      perfectionist.configs['recommended-natural'],
      eslintConfigPrettier,
    ],
    files: ['**/*.{ts,tsx}'],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    rules: {
      '@tanstack/router/create-route-property-order': 'off',
      'perfectionist/sort-imports': 'off',
      'perfectionist/sort-jsx-props': 'off',
      'perfectionist/sort-named-imports': 'off',
    },
  },
]);
