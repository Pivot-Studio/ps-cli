import { getCommand } from '../../utils/index';
import { Argv } from 'yargs';
import detect from '../../utils/detect';
import fs from 'fs';
import BasePlugin from './basePlugin';

const startMap = ['serve', 'dev', 'start'];

export default class RunPlugin extends BasePlugin {
  constructor(options: string[]) {
    super('run', options);
    super.customGetCommand = this.childGetCommand;
  }
  async childGetCommand(tag: string, excludeDebugOption: string[]) {
    const { locksPath } = await detect();
    // 默认是run start
    if (excludeDebugOption == undefined || excludeDebugOption.length == 0) {
      let { scripts } = JSON.parse(
        fs.readFileSync(locksPath, {
          encoding: 'utf-8',
        })
      );
      for (let start of startMap) {
        if (start in scripts) {
          excludeDebugOption = [start];
        }
      }
    }
    return await getCommand('run', excludeDebugOption);
  }
  getOptions(yargs: Argv): Argv {
    return yargs
      .positional('script', {
        describe: '指令内容',
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
