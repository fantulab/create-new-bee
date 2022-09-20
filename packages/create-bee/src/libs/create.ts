// third
import inquirer from 'inquirer'
import yeoman from 'yeoman-environment'
import chalk from 'chalk'

export const create = async () => {
  // 创建yeoman运行时
  const env = yeoman.createEnv()
  // 运行时：下载以来
  const isInstalled = await env.installLocalGenerators({
    'generator-fantu': ''
  })
  // generator 安装失败
  if (!isInstalled) {
  }
  // 项目初始化: yeoman 托管
  const isInitialized = await env.run('fantu:react-mui').catch(() => false)
  // 项目初始化失败
  console.log('issssss====', isInitialized, chalk.red('111'))
}
