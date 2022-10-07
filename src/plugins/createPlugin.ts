// import BasePlugin from './basePlugin';
import { ArgumentsCamelCase, Argv } from 'yargs';
import inquirer from 'inquirer';
import fse from 'fs-extra';
import path from 'path';
import { gitClone, gitPull } from '@/utils/git/git';
import { runningPrefixChalk } from '@/utils/logger';
import { LOCAL_TEMPLATE } from '@/constant';
import { Option } from '@/types/plugin';
import InstallPlugin from '@/plugins/npm/installPlugin';

// todo 通用Plugin抽离
export default class CreatePlugin {
  yargsOption: any;
  promptOption: any;
  /**
   * 用于自定义模板
   */
  templateHandler?: (defaultTemplates: Option[]) => Option[];
  constructor() {
    this._templateOptions();
  }
  /**
   * yargs options configuration
   * @param yargs
   * @returns Argv
   */
  getOptions(yargs: Argv): Argv {
    return yargs.positional('template', this.yargsOption);
  }
  /**
   *
   * @param argv
   */
  async handler(argv: ArgumentsCamelCase) {
    console.log(1);

    const { template } = argv?.template ? argv : await this._templatePrompt();
    runningPrefixChalk('Start', 'Templates pulling down......');
    if (!fse.pathExistsSync(LOCAL_TEMPLATE)) {
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
      path.resolve(LOCAL_TEMPLATE, './map.json')
    );
    const targetPath = path.resolve(LOCAL_TEMPLATE, templateMap[template].path);
    fse.copySync(targetPath, './');
    // todo 单例模式~~
    new InstallPlugin([]).exec();
  }
  /**
   * 解析选项
   */
  private _templateOptions() {
    let defaultTemplates = [
      {
        name: 'Typescript',
        value: 'typescript',
        description: 'typescript 项目模板',
      },
      {
        name: 'React',
        value: 'react',
        description: 'React H5项目模板',
      },
    ];
    if (this.templateHandler) {
      defaultTemplates = this.templateHandler(defaultTemplates);
    }
    this.yargsOption = {
      choices: [],
    };
    this.promptOption = [
      {
        type: 'rawlist',
        name: 'template',
        message: 'which template do you want to init ?',
        choices: [],
      },
    ];
    defaultTemplates.forEach((option) => {
      this.promptOption[0].choices.push({
        name: option.name,
        value: option.value,
      });
      this.yargsOption.choices.push(`${option.value}`);
    });
    // console.log(this.yargsOption, this.promptOption);
  }
  private async _templatePrompt() {
    return await inquirer.prompt(this.promptOption);
  }
}
