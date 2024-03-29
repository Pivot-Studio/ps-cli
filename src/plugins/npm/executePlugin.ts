import BasePlugin from './basePlugin';
import { Argv } from 'yargs';
import { singleton } from '@/utils/singleton';

@singleton
export default class ExecutePlugin extends BasePlugin {
  constructor(options: string[]) {
    super('execute', options);
  }
  getOptions(yargs: Argv): Argv {
    return yargs
      .positional('package', {
        describe: '模块名称',
      })
      .positional('DEBUG', {
        choices: ['?'],
        describe: '打印出最终转化的命令',
      })
      .alias('h', 'help');
  }
  handler(): void {
    super.start();
  }
}
