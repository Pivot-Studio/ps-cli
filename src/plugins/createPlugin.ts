// import BasePlugin from './basePlugin';
import inquirer from 'inquirer';
import { gitClone, gitPull } from '../utils/git';
import { runningPrefixChalk } from '../utils/chalk';
import { LOCAL_PATH } from '../utils';
import fse from 'fs-extra';
import path from 'path';
import { cwd } from 'process';
const TemplatePath = path.resolve(cwd(), LOCAL_PATH);
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
    if (!fse.pathExistsSync(TemplatePath)) {
      console.log(
        await gitClone('https://github.com/Pivot-Studio/zeus-boilerplates.git')
      );
    } else {
      console.log(await gitPull());
    }
    const templateMap = fse.readJsonSync(
      path.resolve(TemplatePath, './map.json')
    );
    const targetPath = path.resolve(
      LOCAL_PATH,
      templateMap[createTemplate].path
    );
    fse.copySync(targetPath, './');
    // todo 调用installPlugin
    // 但是我该如何去调用呢？已经更新了updateCommand的方法了。 还有什么优化？
    // 模板路径需要优化
  }
}
