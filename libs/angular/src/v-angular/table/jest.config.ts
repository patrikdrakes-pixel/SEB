const { baseJestConfig } = require('../../jest.base.config')
const pkg = require('./package.json')

const displayName = pkg.name.split('/')[1]

const packageConfig = baseJestConfig(displayName, './../../projects') ?? {}

module.exports = {
  ...packageConfig,
  displayName,
}
