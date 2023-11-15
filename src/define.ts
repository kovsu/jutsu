export interface JutsuConfig {
  inputDir: string
  outputDir: string
  complete?: () => void
}

export function defineConfig(config: JutsuConfig) {
  return config
}
