import chalk from 'chalk';
import { getCommand, spliceArr, execCommand } from '../../utils/index';
import { DEBUG } from '../../constant';

export default class BasePlugin {
  // todo 引入HookMap  command->[fn.....]
  // 注册插件->解析参数->获取命令->执行命令
  command: string; // 具体命令语句
  tag: string;
  debug: boolean;
  excludeDebugOption: string[];
  //singleton装饰器里会具体化getInstance方法
  static getInstance: (...args: any) => any;
  /**
   * 自定义获取命令方法：可以自定义最终输出的命令
   */
  customGetCommand?: (
    tag: string,
    excludeDebugOption: string[]
  ) => Promise<string>;
  /**
   * 注册插件，接受参数
   * @param command 分发命令符号
   * @param options 参数body： zeus i typescript ? ==> [typescript, ?]
   */
  constructor(tag: string, options: string[] = []) {
    this.debug = options.includes(DEBUG);
    this.tag = tag;
    this._validOptions(options);
    // this._start(debug, command, excludeDebugOption);
  }
  /**
   * 手动调用命令
   * @param command 完整命令 :string
   */
  updateCommand(command: string) {
    this._validOptions(command.split(' ').slice(3));
  }
  async start() {
    this.command = await this._getCommand(this.tag, this.excludeDebugOption);
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
  /**
   * 处理并设置可执行命令
   * @param options 未处理的命令数组（带DEBUG）
   */
  private _validOptions(options: string[]) {
    let excludeDebugOption = options.concat();
    if (this.debug) {
      excludeDebugOption = spliceArr(excludeDebugOption, DEBUG);
    }
    this.excludeDebugOption = excludeDebugOption;
  }
  private async _getCommand(tag: string, excludeDebugOption: string[]) {
    if (this.customGetCommand) {
      return await this.customGetCommand(this.tag, this.excludeDebugOption);
    } else return await getCommand(tag, excludeDebugOption);
  }
  private async _executeCommand() {
    await execCommand(this.command);
    // successHook
  }
  private _showDebugCommand() {
    console.log(this.command);
  }
}
