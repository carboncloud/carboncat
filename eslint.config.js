const jsdoc = require('eslint-plugin-jsdoc');
const reactHooksPlugin = require('eslint-plugin-react-hooks');
const reactPlugin = require('eslint-plugin-react');
const tsPlugin = require('@typescript-eslint/eslint-plugin');
const typescriptParser = require('@typescript-eslint/parser');
const prettierConfig = require('eslint-config-prettier');
const stylisticPlugin = require('@stylistic/eslint-plugin');

module.exports = [
  reactHooksPlugin.configs.flat['recommended-latest'],
  reactPlugin.configs.flat.recommended,
  prettierConfig,
  {
    name: 'carboncat-base-config',
    settings: {
      react: {
        version: 'detect',
      },
    },
    plugins: {
      jsdoc,
      '@typescript-eslint': tsPlugin,
      '@stylistic': stylisticPlugin,
    },
    languageOptions: {
      parser: typescriptParser,
      ecmaVersion: 2019,
      sourceType: 'module',
      parserOptions: {
        ecmaFeatures: {
          jsx: true,
        },
      },
    },
    rules: {
      curly: 'error',
      'dot-notation': 'off',
      'eol-last': 'error',
      eqeqeq: ['error', 'always', { null: 'ignore' }],
      'guard-for-in': 'off',
      'jsdoc/check-alignment': 'error',
      'new-parens': 'error',
      'no-array-constructor': 'error',
      'no-bitwise': 'off',
      'no-caller': 'error',
      'no-cond-assign': 'error',
      'no-console': ['error', { allow: ['error', 'log', 'warn', 'info'] }],
      'no-debugger': 'error',
      'no-empty': 'off',
      'no-eval': 'error',
      'no-fallthrough': 'off',
      'no-new-wrappers': 'error',
      'no-redeclare': 'error',
      'no-restricted-imports': ['error', 'moment'],
      'no-shadow': 'off',
      'no-unused-expressions': 'off',
      'no-unused-labels': 'error',
      'no-var': 'error',
      radix: 'error',
      'sort-keys': 'off',
      'spaced-comment': ['off', 'always'],
      'use-isnan': 'error',
      'no-duplicate-imports': 'error',
      '@typescript-eslint/no-unused-expressions': ['error', { allowShortCircuit: true, allowTernary: true }],
      '@typescript-eslint/array-type': ['error', { default: 'array-simple' }],
      '@typescript-eslint/naming-convention': [
        'error',
        {
          selector: 'interface',
          format: ['PascalCase'],
          custom: {
            regex: '^I[A-Z]',
            match: false,
          },
        },
      ],
      '@typescript-eslint/consistent-type-assertions': 'error',
      '@typescript-eslint/no-inferrable-types': 'error',
      '@typescript-eslint/no-namespace': ['error', { allowDeclarations: false }],
      '@typescript-eslint/no-unused-vars': 'off',
      '@typescript-eslint/no-use-before-define': 'off',
      '@typescript-eslint/triple-slash-reference': 'error',
      'react-hooks/exhaustive-deps': 'error',
    },
  },
  {
    ignores: ['dist', 'node_modules', '.config', 'playwright.config.ts', 'tests/**/*'],
  },
  {
    files: ['src/**/*.{ts,tsx}'],
    languageOptions: {
      parser: typescriptParser,
      parserOptions: {
        project: './tsconfig.json',
      },
    },
    rules: {
      radix: 'off',
      'react/prop-types': 'off',
      '@typescript-eslint/no-deprecated': 'warn',
      'react-hooks/set-state-in-effect': 'off',
      'react-hooks/immutability': 'off',
      // Disable type-annotation-spacing due to differences between deprecated and unified plugins
      '@stylistic/ts/type-annotation-spacing': 'off',
    },
  },
  {
    files: ['src/style.js'],
    rules: {
      '@typescript-eslint/no-unused-expressions': 'off',
      eqeqeq: 'off',
      radix: 'off',
    },
  },
];
