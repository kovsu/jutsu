import process from 'node:process'
import yargs from 'yargs'
import { hideBin } from 'yargs/helpers'
import { jutsu } from './jutsu'

export * from './define'

export function main() {
  // eslint-disable-next-line no-unused-expressions
  yargs(hideBin(process.argv))
    .scriptName('jutsu')
    .command('$0 <folder>', 'Start a Jutsu server', () => {}, (argv) => {
      jutsu(argv.folder as string)
    })
    .help()
    .argv
}
