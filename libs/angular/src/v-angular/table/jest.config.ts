import { baseJestConfig } from '../../jest.base.config'
import pkg from './package.json' with { type: 'json' }

const displayName = pkg.name.split('/')[1]

const packageConfig = baseJestConfig(displayName, './../../projects') ?? {}

export default {
  ...packageConfig,
  displayName,
}
