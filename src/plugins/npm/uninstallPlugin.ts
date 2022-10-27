import { getCommand, spliceArr } from '../../utils/index';
import { Argv } from 'yargs';
import BasePlugin from './basePlugin';
import { singleton } from '@/utils/singleton';

@singleton
export default class UninstallPlugin extends BasePlugin {
  constructor(options: string[]) {
    super('uninstall', options);
    super.customGetCommand = this.childGetCommand;
  }
  async childGetCommand(tag: string, excludeDebugOption: string[]) {
    let isGlobal =
      excludeDebugOption.includes('-g') ||
      excludeDebugOption.includes('--global');

    if (isGlobal) {
      return await getCommand(
        'uninstall_global',
        spliceArr(excludeDebugOption, '-g')
      );
    } else return await getCommand('uninstall', excludeDebugOption);
  }
  getOptions(yargs: Argv): Argv {
    return yargs
      .positional('package', {
        describe: '依赖包名称',
      })
      .positional('DEBUG', { choices: ['?'] })
      .options({
        g: {
          alias: 'global',
          describe: '卸载全局依赖包',
        },
      })
      .alias('h', 'help');
  }
  handler(): void {
    super.start();
  }
}
