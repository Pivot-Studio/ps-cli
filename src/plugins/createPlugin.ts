// import BasePlugin from './basePlugin';
import inquirer from 'inquirer';
import { gitClone } from '../utils/git';
import { runningPrefixChalk } from '../utils/chalk';
export default class CreatePlugin {
  getOptions(yargs) {
    return yargs
      .options({
        react: {
          describe: 'React H5项目模板',
          boolean: false,
        },
        typescript: {
          describe: 'typescript 项目模板',
          boolean: false,
        },
      })
      .usage('$0 [--react/--typescript]'); // 辅助指南，终端输出的可以看到
  }
  async handler(argv) {
    let { createTemplate } = await inquirer.prompt([
      {
        type: 'rawlist',
        name: 'createTemplate',
        message: 'which template do you want to init ?',
        choices: [
          {
            name: 'Typescript',
            value: 'typescript',
          },
          {
            name: 'React',
            value: 'react',
          },
        ],
      },
    ]);
    runningPrefixChalk('Start');
    await gitClone('https://github.com/Pivot-Studio/ps-cli.git');
  }
}
