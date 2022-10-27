import BasePlugin from './basePlugin';
import { Argv } from 'yargs';
import { singleton } from '@/utils/singleton';

@singleton
export default class InitPlugin extends BasePlugin {
  // 子命令Plugin通过以下形式在BasePlugin中进行挂载
  constructor(options?: string[]) {
    super('init', options);
  }
  handler(): void {
    super.start();
  }
  getOptions(yargs: Argv): Argv {
    return yargs.positional('DEBUG', {
      choices: ['?'],
      describe: '打印最终转化的命令',
    });
  }
}
