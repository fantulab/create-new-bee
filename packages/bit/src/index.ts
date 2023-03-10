#!/usr/bin/env node
import { execa } from 'execa'
import { Command } from 'commander'

interface CommitOptions {
  fix: boolean
  style: boolean
  refactor: boolean
  perf: boolean
  chore: boolean
}

const program = new Command()

/**
 * copy from git add
 */
program
  .command('add')
  .argument('<path>')
  .action(async (path: string) => {
    await execa('git', ['add', path], {
      stdio: 'inherit'
    }).catch(() => null)
  })

/**
 * copy from git commit
 */
program
  .command('commit')
  .argument('<message>')
  .option('-f, --fix')
  .option('-s, --style')
  .option('-r, --refactor')
  .option('-p, --perf')
  .option('-c, --chore')
  .action(async (message: string, options: CommitOptions) => {
    const prefix = options.fix
      ? 'fix'
      : options.style
      ? 'style'
      : options.refactor
      ? 'refactor'
      : options.perf
      ? 'perf'
      : options.chore
      ? 'chore'
      : 'feat'

    await execa('git', ['commit', '-m', `${prefix}: ${message}`], {
      stdio: 'inherit'
    }).catch(() => null)
  })

/**
 * copy from git push
 */
program.command('push').action(() => {
  execa('git', ['push'], {
    stdio: 'inherit'
  }).catch(() => null)
})

/**
 * copy from git pull
 */
program.command('pull').action(() => {
  execa('git', ['pull'], {
    stdio: 'inherit'
  }).catch(() => null)
})

program.parse()
