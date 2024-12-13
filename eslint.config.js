import pluginJs from '@eslint/js';
import prettierConfig from 'eslint-config-prettier';
import pluginImport from 'eslint-plugin-import';
import pluginPrettier from 'eslint-plugin-prettier';
import globals from 'globals';
import tseslint from 'typescript-eslint';

export default [
  { files: ['**/*.{js,mjs,cjs,ts}'] },
  {
    languageOptions: {
      globals: { ...globals.node },
      parser: '@typescript-eslint/parser',
      plugins: ['@typescript-eslint'],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    languageOptions: {
      parser: tseslint.parser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    plugins: {
      '@typescript-eslint': tseslint.plugin,
      prettier: pluginPrettier,
      import: pluginImport,
    },
  },
  {
    settings: {
      'import/resolver': {
        node: true,
        alias: {
          map: [
            ['#configs', './src/configs'],
            ['#connection', './src/connection'],
            ['#containers', './src/containers'],
            ['#controllers', './src/controllers'],
            ['#interfaces', './src/interfaces'],
            ['#middlewares', './src/middlewares'],
            ['#repositories', './src/repositories'],
            ['#routes', './src/routes'],
            ['#services', './src/services'],
            ['#types', './src/types'],
            ['#utils', './src/utils'],
            ['@', './'],
          ],
          extensions: ['.js', '.ts', '.json'],
        },
      },
      'import/internal-regex': '@/',
    },
  },
  pluginJs.configs.recommended,
  ...tseslint.configs.recommended,
  prettierConfig,
  {
    rules: {
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
      'no-restricted-globals': 'off',
      'no-unused-vars': 'off',
      'consistent-return': 'off',
      'no-restricted-imports': [
        'error',
        {
          patterns: [
            {
              group: ['.*'],
              message: "상대 경로 import는 허용되지 않습니다. '#/'로 시작하는 alias를 사용해주세요.",
            },
          ],
        },
      ],
      'import/no-relative-parent-imports': 'error',
      'import/no-relative-packages': 'error',
      'import/extensions': ['error', { js: 'never', ts: 'never' }],
      'import/no-duplicates': ['warn', { 'prefer-inline': true, considerQueryString: true }],
      'import/order': [
        'warn',
        {
          groups: ['builtin', 'external', 'internal'],
          'newlines-between': 'never',
          distinctGroup: false,
          pathGroups: [
            {
              pattern: '#configs/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '#connection/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '#containers/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '#controllers/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '#interfaces/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '#middlewares/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '#repositories/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '#routes/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '#services/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '#types/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '#utils/**',
              group: 'internal',
              position: 'before',
            },
            {
              pattern: '@/**',
              group: 'internal',
              position: 'after',
            },
            {
              pattern: './**',
              group: 'internal',
              position: 'after',
            },
          ],
          pathGroupsExcludedImportTypes: ['builtin'],
          warnOnUnassignedImports: true,
          alphabetize: {
            order: 'asc',
            caseInsensitive: false,
          },
        },
      ],
    },
  },
];
