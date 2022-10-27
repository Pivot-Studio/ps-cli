import { getCommand, spliceArr } from '../../utils/index';
import { Argv } from 'yargs';
import BasePlugin from './basePlugin';
import { singleton } from '@/utils/singleton';

@singleton
export default class ListPlugin extends BasePlugin {
  constructor(options: string[]) {
    super('list', options);
    super.customGetCommand = this.childGetCommand;
  }
  async childGetCommand(tag: string, excludeDebugOption: string[]) {
    const isView = excludeDebugOption.includes('-v');
    if (isView) {
      return await getCommand('view', spliceArr(excludeDebugOption, '-v'));
    } else {
      return await getCommand('list', excludeDebugOption);
    }
  }
  getOptions(yargs: Argv): Argv {
    return yargs
      .positional('DEBUG', { choices: ['?'] })
      //与下面的-v可选性冲突，所以false掉
      .version(false)
      .options({
        v: {
          alias: 'version',
          describe: '显示依赖包版本',
        },
      })
      .alias('h', 'help');
  }
  handler(): void {
    console.log(new Date())
    super.start();
  }
}
