import js from '@eslint/js';
import tslint from 'typescript-eslint';
import importPlugin from 'eslint-plugin-import';

export default [
  { ignores: ['dist/**', 'node_modules/**', 'coverage/**'] },

  js.configs.recommended,
  ...tslint.configs.recommended,

  {
    files: ['**/*.{ts,tsx}'],
    plugins: { import: importPlugin },
    languageOptions: {
      parserOptions: {
        ecmaVersion: 2020,
        sourceType: 'module',
      },
    },
    settings: {
      'import/resolver': {
        // важно: этот резолвер должен быть установлен
        typescript: {
          alwaysTryTypes: true,
        },
        // можно оставить и node, чтобы резолвить .js расширения
        node: true,
      },
    },
    rules: {
      quotes: ['error', 'single', { avoidEscape: true }],
      '@typescript-eslint/no-unused-vars': ['error', { argsIgnorePattern: '^_' }],

      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal', 'parent', 'sibling', 'index'],
          'newlines-between': 'always',
          alphabetize: { order: 'asc', caseInsensitive: true },
        },
      ],
    },
  },
];
