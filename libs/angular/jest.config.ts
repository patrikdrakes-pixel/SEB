/* eslint-disable */
import { readFileSync } from 'node:fs'
import { join } from 'node:path'
import { workspaceRoot } from '@nx/devkit'
import { pathsToModuleNameMapper } from 'ts-jest'

const { compilerOptions } = JSON.parse(
  readFileSync(join(workspaceRoot, 'tsconfig.base.json'), 'utf-8'),
)

export default {
  displayName: 'angular',
  preset: '../../jest.preset.js',
  setupFilesAfterEnv: ['<rootDir>/src/test-setup.ts'],
  globals: {},
  transform: {
    '^.+.(ts|mjs|js|html)$': [
      'jest-preset-angular',
      {
        tsconfig: '<rootDir>/tsconfig.spec.json',
        stringifyContentPathRegex: '\\.(html|svg)$',
      },
    ],
  },
  moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
    prefix: '<rootDir>/../..',
  }),
  snapshotSerializers: [
    'jest-preset-angular/build/serializers/no-ng-attributes',
    'jest-preset-angular/build/serializers/ng-snapshot',
    'jest-preset-angular/build/serializers/html-comment',
  ],
  transformIgnorePatterns: [
    'node_modules/(?!.*.mjs$|@sebgroup/green-react|@sebgroup/extract|@sebgroup/green-core|lit-element|lit-html|lit|@lit|@lit-labs|@jsverse|flat|chalk)',
  ],
  testPathIgnorePatterns: ['<rootDir>/node_modules/', '/node_modules/'],
}
