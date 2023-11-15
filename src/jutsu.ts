import process from 'node:process'
import { blue, red } from 'colorette'
import fs from 'fs-extra'
import confirm from '@inquirer/confirm'
import { fileExist, loadJutsuConfig } from './load'

export async function jutsu(folder: string) {
  console.log(blue('🥷 Jutsu activated ✨\n'))

  const currentPath = process.cwd()

  const config = await loadJutsuConfig(currentPath)

  if (!config)
    return

  console.log(blue('🤲 Jutsu config loaded ✨\n'))

  console.log(blue('🌪️ Jutsu is working ✨\n'))

  if (fileExist(`${currentPath}/${config.outputDir}/${folder}`)) {
    const isRemove = await confirm({ message: '🗑️ Remove exist folder?' })
    if (isRemove) {
      fs.removeSync(`${currentPath}/${config.outputDir}/${folder}`)
    }
    else {
      console.log(red('👮 Jutsu is stopped ✨\n'))
      return
    }
  }

  // 创建文件夹
  fs.mkdirSync(`${currentPath}/${config.outputDir}/${folder}`, { recursive: true })
  // 复制文件
  fs.copySync(`${currentPath}/${config.inputDir}`, `${currentPath}/${config.outputDir}/${folder}`)

  config.complete && config.complete(folder)

  console.log(blue('👥 Jutsu is done ✨\n'))
}
