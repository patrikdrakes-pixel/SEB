/* eslint-disable */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { workspaceRoot } from '@nx/devkit'
import { pathsToModuleNameMapper } from 'ts-jest'

const { compilerOptions } = JSON.parse(
  readFileSync(join(workspaceRoot, 'tsconfig.base.json'), 'utf-8'),
)

export default {
  displayName: 'react',
  preset: '../../jest.preset.js',
  transform: {
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
  coverageDirectory: '../../coverage/libs/react',
  setupFilesAfterEnv: ['@testing-library/jest-dom'],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/../..',
  }),
}
