import globals from 'globals';
import pluginJs from '@eslint/js';
import pluginImport from 'eslint-plugin-import';
import pluginJsxA11y from 'eslint-plugin-jsx-a11y';
import pluginPrettier from 'eslint-plugin-prettier';
import prettierConfig from 'eslint-config-prettier';

export default [
  { files: ['**/*.{js,mjs,cjs,jsx,ts,tsx}'] },
  {
    languageOptions: {
      globals: { ...globals.browser, ...globals.node },
    },
  },
  {
    settings: {
      react: {
        version: 'detect',
      },
    },
  },
  pluginJs.configs.recommended,
  prettierConfig,
  {
    plugins: {
      prettier: pluginPrettier,
      'jsx-a11y': pluginJsxA11y,
      import: pluginImport,
    },
  },
  {
    rules: {
      'prettier/prettier': ['error', { endOfLine: 'auto' }],
      'no-restricted-globals': 'off',
      'no-lone-blocks': 'off',
      'no-unused-vars': 'off',
      'react/react-in-jsx-scope': 'off', // Next.js에서는 필요 없음
      'react/jsx-uses-react': 'off', // React 17+에서는 필요 없음
      'import/extensions': 'off',
      'no-bitwise': 'off',
      'react/prop-types': 'off',
      'consistent-return': 'off',
      'jsx-a11y/click-events-have-key-events': 'off',
      'jsx-a11y/no-static-element-interactions': 'off',
      'jsx-a11y/no-noninteractive-element-interactions': 'off',
      'jsx-a11y/label-has-associated-control': ['error', { some: ['nesting', 'id'] }],
      'guard-for-in': 'off',
      'no-underscore-dangle': 'off',
      camelcase: 'off',
    },
  },
];
