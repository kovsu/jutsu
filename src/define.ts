export interface JutsuConfig {
  inputDir: string
  outputDir: string
  complete?: (name: string) => void
}

export function defineConfig(config: JutsuConfig) {
  return config
}
