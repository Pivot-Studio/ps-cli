import { getCommand, spliceArr } from '../../utils/index';
import BasePlugin from './basePlugin';

export default class UninstallPlugin extends BasePlugin {
  constructor(options: string[]) {
    super('uninstall', options);
    super.customGetCommand = this.childGetCommand;
  }
  async childGetCommand(tag: string, excludeDebugOption: string[]) {
    let isGlobal = excludeDebugOption.includes('-g');

    if (isGlobal) {
      return await getCommand(
        'uninstall_global',
        spliceArr(excludeDebugOption, '-g')
      );
    } else return await getCommand('uninstall', excludeDebugOption);
  }
  handler(): void {
    super.start();
  }
}
