import { getCommand, spliceArr } from '../../utils/index';

import BasePlugin from './basePlugin';

export default class UpdatePlugin extends BasePlugin {
  constructor(options: string[]) {
    super('upgrade', options);
    super.customGetCommand = this.childGetCommand;
  }
  async childGetCommand(tag: string, excludeDebugOption: string[]) {
    let isInteractive = excludeDebugOption.includes('-i');
    let isGlobal = excludeDebugOption.includes('-g');
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
  handler(): void {
    super.start();
  }
}
