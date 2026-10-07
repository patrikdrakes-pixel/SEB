import { dirname } from 'path'
import { fileURLToPath } from 'url'
import nx from '@nx/eslint-plugin'

import baseConfig from '../../eslint.config.mjs'

export default [
  ...baseConfig,
  {
    rules: {
      'import/no-extraneous-dependencies': 'off',
      '@angular-eslint/template/prefer-control-flow': 'off',
    },
  },
  ...nx.configs['flat/angular'],
  {
    files: ['**/*.ts'],
    rules: {
      '@angular-eslint/directive-selector': [
        'error',
        {
          type: 'attribute',
          prefix: 'green',
          style: 'camelCase',
        },
      ],
      '@angular-eslint/component-selector': [
        'error',
        {
          type: 'element',
          prefix: 'green',
          style: 'kebab-case',
        },
      ],
      '@angular-eslint/prefer-standalone': 'off',
      '@angular-eslint/prefer-inject': 'off',
      '@angular-eslint/template/prefer-control-flow': 'off',
    },
  },
  ...nx.configs['flat/angular-template'],
  {
    files: ['**/*.html'],
    rules: {
      '@angular-eslint/template/prefer-control-flow': 'off',
    },
  },
]
