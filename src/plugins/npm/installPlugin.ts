import BasePlugin from './basePlugin';
import { spliceArr, getCommand } from '../../utils';
export default class InstallPlugin extends BasePlugin {
  // 子命令Plugin通过以下形式在BasePlugin中进行挂载
  /**
   * 
   * @param options 参数body 例如:
   ```ts
    zeus i typescript -D  ==> options = [i ,typescript ,-D]
   ```
   */
  constructor(options: string[]) {
    super('install', options);
    super.customGetCommand = this.childGetCommand;
  }
  async childGetCommand(tag: string, excludeDebugOption: string[]) {
    let isFrozen = excludeDebugOption.includes('--frozen');
    let isGlobal = excludeDebugOption.includes('-g');
    if (isFrozen) {
      return await getCommand(
        'frozen',
        spliceArr(excludeDebugOption, '--frozen')
      );
    } else if (isGlobal) {
      // If i want to install a package in golbal,i must use 'global' instead of '-g' with yarn
      return await getCommand('global', spliceArr(excludeDebugOption, '-g'));
    } else if (excludeDebugOption.length > 0) {
      // The difference between downloading allpackages and a single package is described
      // in the yarn command
      return await getCommand('add', excludeDebugOption);
    } else return await getCommand('install', excludeDebugOption);
  }
  exec(): void {
    super.start();
  }
}
