import { AssetGlob } from '@nx/js/internal'

export interface BuildCoreLibExecutorSchema {
  tsconfig: string
  outputPath: string
  assets: (AssetGlob | string)[]
} // eslint-disable-line
