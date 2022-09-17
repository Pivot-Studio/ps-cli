import chalk from 'chalk';
import {
  DEBUG,
  getCommand,
  spliceArr,
  showFiglet,
  execCommand,
} from '../utils/index';
export default class BasePlugin {
  // todo 引入HookMap  command->[fn.....]
  // 注册插件->解析参数->获取命令->执行命令
  command: string; // 具体命令语句
  tag: string;
  debug: boolean;
  excludeDebugOption: string[];
  customGetCommand?: (
    tag: string,
    excludeDebugOption: string[]
  ) => Promise<string>;
  /**
   * 注册插件，接受参数
   * @param command 分发命令符号
   * @param options 参数body： zeus i typescript ? ==> [typescript, ?]
   */
  constructor(tag: string, options: string[]) {
    this.debug = options.includes(DEBUG);
    this.tag = tag;
    const excludeDebugOption = [];
    if (this.debug) {
      excludeDebugOption.push(...spliceArr(options, DEBUG));
    }
    this.excludeDebugOption = excludeDebugOption;
    // this._start(debug, command, excludeDebugOption);
  }
  async start() {
    if (this.customGetCommand) {
      this.command = await this.customGetCommand(
        this.tag,
        this.excludeDebugOption
      );
    } else {
      this.command = await this._getCommand(this.tag, this.excludeDebugOption);
    }
    // startHook(this.command)
    if (this.debug) {
      this._showDebugCommand();
      return;
    }
    try {
      this._executeCommand();
    } catch (error) {
      console.error(chalk.red(error));
      // errorHook
      process.exit(1);
    }
  }
  private async _getCommand(command: string, excludeDebugOption: string[]) {
    return await getCommand(command, excludeDebugOption);
  }
  private async _executeCommand() {
    await execCommand(this.command);
    // successHook
    showFiglet('Pivot Studio!!', 'execute finished');
  }
  private _showDebugCommand() {
    console.log(this.command);
  }
}
