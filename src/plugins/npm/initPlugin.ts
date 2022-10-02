import BasePlugin from './basePlugin';
import { Argv } from 'yargs';
export default class InstallPlugin extends BasePlugin {
  // 子命令Plugin通过以下形式在BasePlugin中进行挂载
  constructor(options?: string[]) {
    super('init', options);
  }
  exec(): void {
    super.start();
  }
  getOptions(yargs: Argv): Argv {
    return yargs.positional('DEBUG', { choices: ['?'] });
  }
}
