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
  templateMap: any;
  /**
   * 用于自定义模板
   */
  templateHandler?: (defaultTemplates: Option[]) => Option[];
  constructor() {}
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
    runningPrefixChalk('Start', 'Templates pulling down......');
    if (fse.readdirSync(LOCAL_TEMPLATE).length === 0) {
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
    this.templateMap = fse.readJsonSync(
      path.resolve(LOCAL_TEMPLATE, './map.json')
    );
    this._templateOptions();
    const { template } = argv?.template ? argv : await this._templatePrompt();
    const targetPath = path.resolve(
      LOCAL_TEMPLATE,
      this.templateMap[template].path
    );
    fse.copySync(targetPath, './');
    // todo 单例模式~~
    new InstallPlugin([]).exec();
  }
  /**
   * 解析选项
   */
  private _templateOptions() {
    let defaultTemplates = Object.keys(this.templateMap).map((t) => ({
      name: t,
      value: t,
      description: this.templateMap[t].description,
    }));
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
