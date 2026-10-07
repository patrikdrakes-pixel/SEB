import baseConfig from '../../eslint.config.mjs'

export default [
  ...baseConfig,
  {
    rules: {
      'no-console': 'error',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    rules: {
      '@typescript-eslint/no-unused-expressions': 'off',
    },
  },
  {
    files: ['**/*.ts', '**/*.tsx'],
    // Override or add rules here
    rules: {},
  },
  {
    files: ['**/*.js', '**/*.jsx'],
    // Override or add rules here
    rules: {},
  },
  {
    files: ['build-scripts/**/*.ts'],
    rules: {
      'no-console': 'off',
      '@nx/enforce-module-boundaries': 'off',
    },
  },
  {
    ignores: [
      'storybook-static',
      'setup-jest.js',
      '**/*.stories.ts',
      '**/*.tsx',
      '**/*.stories.tsx',
      '**/*.test.ts',
      '.storybook/*',
      'src/bin/*',
    ],
  },
]
