import fs from 'fs-extra'
import { bundleRequire } from 'bundle-require'
import { red } from 'colorette'
import type { JutsuConfig } from './define'

export function fileExist(filePath: string) {
  return fs.existsSync(filePath)
}

export async function loadJutsuConfig(cwd: string) {
  const path = [
    `${cwd}/jutsu.config.js`,
    `${cwd}/jutsu.config.ts`,
    `${cwd}/jutsu.config.cjs`,
    `${cwd}/jutsu.config.mjs`,
  ].find(fileExist)

  if (!path) {
    console.log(red('🚨 jutsu config file not found'))
    return
  }

  const { mod } = await bundleRequire({
    filepath: path,
  })

  const config: JutsuConfig = mod.default

  if (!config.inputDir || !config.outputDir) {
    console.log(red('🚨 inputDir or outputDir is need in config file'))
    return
  }

  if (!fileExist(`${cwd}/${config.outputDir}`)) {
    console.log(red('🚨 inputDir or outputDir is not exist'))
    return
  }

  return config
}
