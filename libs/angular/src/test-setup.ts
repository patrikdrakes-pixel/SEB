import { randomUUID } from 'node:crypto'
import { setupZoneTestEnv } from 'jest-preset-angular/setup-env/zone'

setupZoneTestEnv()

globalThis.crypto.randomUUID = randomUUID
