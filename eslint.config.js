// eslint.config.js
import js from '@eslint/js';
import pluginQuery from '@tanstack/eslint-plugin-query';
import { defineConfig, globalIgnores } from 'eslint/config';
import checkFile from 'eslint-plugin-check-file';
import importX, { createNodeResolver } from 'eslint-plugin-import-x';
import prettierRecommended from 'eslint-plugin-prettier/recommended';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import unusedImports from 'eslint-plugin-unused-imports';
import globals from 'globals';

export default defineConfig([
  globalIgnores(['dist']),
  {
    files: ['**/*.{js,jsx}'],
    extends: [
      js.configs.recommended,
      reactHooks.configs.flat.recommended,
      reactRefresh.configs.vite,
      pluginQuery.configs['flat/recommended'],
    ],
    plugins: { 'unused-imports': unusedImports, 'import-x': importX },
    languageOptions: {
      globals: globals.browser,
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    rules: {
      'no-unused-vars': 'warn',
      'unused-imports/no-unused-imports': 'error',
      'unused-imports/no-unused-vars': [
        'warn',
        {
          varsIgnorePattern: '^[A-Z_]',
          argsIgnorePattern: '^_',
          args: 'after-used',
        },
      ],
      'import-x/order': [
        'error',
        {
          groups: [
            'builtin', //Node modules (fs, path)
            'external', //npm packages (react)
            'internal', //your aliases (@utils/...)
            'parent', //../x
            'sibling', //./x
            'index', //./
          ],
          pathGroups: [
            { pattern: '**/index{,.js}', group: 'internal', position: 'after' },
          ],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
      'import-x/no-cycle': 'error',
    },
    settings: {
      'import-x/internal-regex': '^@(atoms|molecules|organisms|context|utils)/',
      'import-x/resolver-next': [
        createNodeResolver({ extensions: ['.js', '.jsx', '.json'] }),
      ],
    },
  },
  {
    files: ['src/**/*.{js,jsx}'],
    plugins: { 'check-file': checkFile },
    ignores: ['src/main.jsx'],
    rules: {
      'check-file/filename-naming-convention': [
        'error',
        { 'src/**/*.jsx': 'PASCAL_CASE', 'src/**/*.js': 'CAMEL_CASE' },
        { ignoreMiddleExtensions: true },
      ],
    },
  },
  prettierRecommended,
]);
