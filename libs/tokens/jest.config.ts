/* eslint-disable */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { workspaceRoot } from '@nx/devkit'
import { pathsToModuleNameMapper } from 'ts-jest'

const { compilerOptions } = JSON.parse(
  readFileSync(join(workspaceRoot, 'tsconfig.base.json'), 'utf-8'),
)

export default {
  displayName: 'tokens',
  testEnvironment: 'node',
  extensionsToTreatAsEsm: ['.ts', '.tsx'],
  transform: {
    '^.+\\.[tj]sx?$': [
      'ts-jest',
      {
        isolatedModules: true,
        useESM: true,
        diagnostics: { warnOnly: true },
        tsconfig: {
          ...compilerOptions,
          allowJs: true,
          esModuleInterop: true,
          allowSyntheticDefaultImports: true,
        },
      },
    ],
    '^.+\\.(mjs|cjs|js)$': ['babel-jest'],
  },
  transformIgnorePatterns: [
    '/node_modules/(?!(change-case|is-plain-obj|chalk|style-dictionary|path-unified|@jridgewell|@nodelib)/)',
  ],
  moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'mjs', 'cjs', 'json'],
  coverageDirectory: '../../coverage/libs/tokens',
  setupFilesAfterEnv: [],
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/../..',
  }),
}
