import { getCommand, spliceArr } from '../../utils/index';
import { Argv } from 'yargs';
import BasePlugin from './basePlugin';

export default class UpdatePlugin extends BasePlugin {
  constructor(options: string[]) {
    super('upgrade', options);
    super.customGetCommand = this.childGetCommand;
  }
  async childGetCommand(tag: string, excludeDebugOption: string[]) {
    let isInteractive = excludeDebugOption.includes('-i') || excludeDebugOption.includes('--interactive');
    let isGlobal = excludeDebugOption.includes('-g') || excludeDebugOption.includes('--global');
    if (isInteractive) {
      return await getCommand(
        'upgrade-interactive',
        spliceArr(excludeDebugOption, '-i')
      );
    } else if (isGlobal) {
      return await getCommand(
        'upgrade-global',
        spliceArr(excludeDebugOption, '-g')
      );
    } else return await getCommand('upgrade', excludeDebugOption);
  }
  getOptions(yargs:Argv):Argv {
    return yargs.positional('package', {
      describe: '依赖包名称',
    }).positional('DEBUG', {
      choices: ['?'],
      describe: '打印出最终转化的命令',
    }).options({
      'i': {
        alias:'interactive',
        describe:'交互式更新依赖包'
      },
      'g': {
        alias:'global',
        describe:'更新全局依赖包'
      },
      'latest':{
        describe:'忽略package.json里的限制更新依赖包至最新版本'
      }
    }).alias('h','help');
  }
  handler(): void {
    super.start();
  }
}
