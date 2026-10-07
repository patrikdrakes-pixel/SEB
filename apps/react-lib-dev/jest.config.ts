/* eslint-disable */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { workspaceRoot } from '@nx/devkit'
import { pathsToModuleNameMapper } from 'ts-jest'

const { compilerOptions } = JSON.parse(
  readFileSync(join(workspaceRoot, 'tsconfig.base.json'), 'utf-8'),
)

export default {
  displayName: 'react-lib-dev',
  preset: '../../jest.preset.js',
  transform: {
    '^(?!.*\\.(js|jsx|ts|tsx|css|json)$)': '@nx/react/plugins/jest',
    '^.+\\.[tj]sx?$': [
      'babel-jest',
      {
        presets: ['@nx/react/babel'],
        plugins: [
          ['@babel/plugin-transform-class-static-block', { loose: true }],
        ],
      },
    ],
  },
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx'],
  coverageDirectory: '../../coverage/apps/react-lib-dev',
  transformIgnorePatterns: [
    'node_modules/(?!.*.mjs$|lit-element|lit-html|lit|@lit|@lit-labs|dist/)',
  ],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/../..',
  }),
}
