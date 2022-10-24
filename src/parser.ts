// import chalk from 'chalk';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import InitPlugin from './plugins/npm/initPlugin';
import InstallPlugin from './plugins/npm/installPlugin';
import ExecutePlugin from './plugins/npm/executePlugin';
import UninstallPlugin from './plugins/npm/uninstallPlugin';
import UpdatePlugin from './plugins/npm/updatePlugin';
import RunPlugin from './plugins/npm/runPlugin';
import ListPlugin from './plugins/npm/listPlugin';
import CreatePlugin from './plugins/createPlugin';
import ClonePlugin from './plugins/clonePlugin';
import PushPlugin from './plugins/pushPlugin';
// import run from './plugins/run';
// import list from './plugins/list';

export default class Parser {
  pluginMap: Map<string, any>;
  constructor() {
    // const createPlugin = new CreatePlugin();
    // const clonePlugin = new ClonePlugin();
    // const pushPlugin = new PushPlugin();
    // const pluginMap = new Map();
    // pluginMap.set('create', createPlugin);
    // pluginMap.set('clone', clonePlugin);
    // pluginMap.set('push', pushPlugin);
    // this.pluginMap = pluginMap;
    this._parse();
  }
  private _parse() {
    const originArgv = hideBin(process.argv).length > 0 ? hideBin(process.argv) : ['-h'];
    const bodyArgv = originArgv.slice(1)
    const { argv } = yargs(originArgv)
      .strict()
      .scriptName('zeus')
      .usage('Usage: $0 <command> [args]')
      .command({
        command: 'init',
        describe: '创建一个package.json文件',
        builder: (yargs) => new InitPlugin(bodyArgv).getOptions(yargs),
        handler: () => new InitPlugin(bodyArgv).handler(),
      })
      .command({
        command: 'install [foo]',
        describe: '安装依赖包',
        //builder待写
        // builder: (yargs) => new InstallPlugin(bodyArgv).getOptions(yargs),
        handler: () => new InstallPlugin(bodyArgv).handler(),
      })
      .command({
        command: 'update [foo]',
        describe: '更新依赖包',
        // builder: (yargs) => new UpdatePlugin(bodyArgv).getOptions(yargs),
        handler: () => new UpdatePlugin(bodyArgv).handler(),
      })
      .command({
        command: 'uninstall [foo]',
        describe: '卸载依赖包',
        // builder: (yargs) => new UninstallPlugin().getOptions(yargs),
        handler: () => new UninstallPlugin(bodyArgv).handler(),
      })
      .command({
        command: 'ls',
        describe: '列出已安装的依赖包',
        // builder: (yargs) => new ListPlugin().getOptions(yargs),
        handler: () => new ListPlugin(bodyArgv).handler(),
      })
      .command({
        command: 'run [script]',
        describe: '执行script命令',
        // builder: (yargs) => new RunPlugin().getOptions(yargs),
        handler: () => new RunPlugin(bodyArgv).handler(),
      })
      .command({
        command: 'x [foo]',
        describe: '调用项目内部安装的模块',
        // builder: (yargs) => new RunPlugin().getOptions(yargs),
        handler: () => new ExecutePlugin(bodyArgv).handler(),
      })
      .command({
        command: 'create [template]',
        describe: '初始化项目模板',
        builder: (yargs) => new CreatePlugin().getOptions(yargs),
        handler: (argv) => new CreatePlugin().handler(argv),
      })
      .command({
        command: 'clone [url]',
        describe: '从github仓库上拉取项目',
        //原来这里因为有个map.get()避过了类型检查，实际上getOptions()还没写，实际返回值不符合类型规范，写了再取消注释
        // builder: () => new PushPlugin.getOptions(),
        //能跑，类型检测tobefixed
        handler: (argv) => new ClonePlugin().handler(argv),cl
      })
      .command({
        command: 'push',
        describe: '推送项目到远程仓库以及创建MR',
        // builder: () => new PushPlugin.getOptions(),
        handler: () => new PushPlugin().handler(),
      })
      .alias('-h', '--help')
      .help();
  }
}
