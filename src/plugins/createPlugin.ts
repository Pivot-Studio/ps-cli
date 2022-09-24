// import BasePlugin from './basePlugin';
import { ArgumentsCamelCase } from 'yargs';
import inquirer from 'inquirer';
import { gitClone, gitPull } from '../utils/git';
import { runningPrefixChalk } from '../utils/chalk';
import { LOCAL_PATH } from '../constant';
import fse from 'fs-extra';
import path from 'path';
import InstallPlugin from './npm/installPlugin';
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
  async handler(argv: ArgumentsCamelCase) {
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
    runningPrefixChalk('Start', 'Templates pulling down......');
    if (!fse.pathExistsSync(LOCAL_PATH)) {
      await gitClone('https://github.com/Pivot-Studio/zeus-boilerplates.git');
      runningPrefixChalk(
        'Pulled',
        'Templates are cloned from origin Repository'
      );
    } else {
      await gitPull();
      runningPrefixChalk(
        'Pulled',
        'Templates are updated from origin Repository'
      );
    }
    const templateMap = fse.readJsonSync(
      path.resolve(LOCAL_PATH, './map.json')
    );
    const targetPath = path.resolve(
      LOCAL_PATH,
      templateMap[createTemplate].path
    );
    fse.copySync(targetPath, './');
    // todo 单例模式~~
    new InstallPlugin(argv._ as string[]).exec();
  }
}
