import { getCommand, spliceArr } from '../../utils/index';
import BasePlugin from './basePlugin';

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
  handler(): void {
    super.start();
  }
}
