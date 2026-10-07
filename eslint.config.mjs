import { dirname } from 'path'
import { fileURLToPath } from 'url'
import { FlatCompat } from '@eslint/eslintrc'
import js from '@eslint/js'
import nx from '@nx/eslint-plugin'
import eslintPluginImport from 'eslint-plugin-import'
import jsoncEslintParser from 'jsonc-eslint-parser'

const compat = new FlatCompat({
  baseDirectory: dirname(fileURLToPath(import.meta.url)),
  recommendedConfig: js.configs.recommended,
})

export default [
  ...compat.extends('plugin:storybook/recommended'),
  ...nx.configs['flat/base'],
  { plugins: { import: eslintPluginImport } },
  {
    rules: {
      'import/no-extraneous-dependencies': [
        'error',
        {
          devDependencies: false,
          optionalDependencies: false,
        },
      ],
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@nx/enforce-module-boundaries': [
        'error',
        {
          enforceBuildableLibDependency: true,
          allow: [],
          depConstraints: [
            {
              sourceTag: '*',
              onlyDependOnLibsWithTags: ['*'],
            },
          ],
        },
      ],
    },
  },
  ...nx.configs['flat/typescript'],
  ...compat
    .config({
      extends: ['prettier'],
    })
    .map((config) => ({
      ...config,
      files: ['**/*.ts', '**/*.tsx'],
      rules: {
        ...config.rules,
        'no-extra-semi': 'off',
      },
    })),
  {
    files: [
      '**/*.test.*',
      '**/*.spec.*',
      '**/*.stories.*',
      '**/testing/*.ts',
      '**/test-setup.ts',
      '**/build-scripts/*',
      '**/webpack.config.js',
    ],
    rules: {
      '@typescript-eslint/no-non-null-assertion': 'off',
      'import/no-extraneous-dependencies': 'off',
    },
  },
  ...nx.configs['flat/javascript'],
  {
    files: ['**/*.js', '**/*.jsx'],
    rules: {
      'no-extra-semi': 'off',
    },
  },
  {
    files: ['**/*.json'],
    // Override or add rules here
    rules: {},
    languageOptions: {
      parser: jsoncEslintParser,
    },
  },
  {
    ignores: ['/apps/docs/public/core-out/'],
  },
]
