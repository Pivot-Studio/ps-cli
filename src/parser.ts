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
    const originArgv =
      hideBin(process.argv).length > 0 ? hideBin(process.argv) : ['-h'];
    const bodyArgv = originArgv.slice(1);
    const { argv } = yargs(originArgv)
      .strict()
      .scriptName('zeus')
      .usage('Usage: $0 <command> [args]')
      .command({
        command: 'init [DEBUG]',
        describe: 'npm/yarn/pnpm init',
        builder: (yargs) => new InitPlugin().getOptions(yargs),
        handler: () => new InitPlugin(bodyArgv).handler(),
      })
      .command({
        command: ['install [package] [DEBUG]', 'i'],
        describe: 'npm/yarn/pnpm install/add [package]',
        builder: (yargs) => new InstallPlugin(bodyArgv).getOptions(yargs),
        handler: () => new InstallPlugin(bodyArgv).handler(),
      })
      .command({
        command: ['update [package] [DEBUG]','u'],
        describe: 'npm/yarn/pnpm update/upgrade [package]',
        builder: (yargs) => new UpdatePlugin(bodyArgv).getOptions(yargs),
        handler: () => new UpdatePlugin(bodyArgv).handler(),
      })
      .command({
        command: ['uninstall [package] [DEBUG]','ui'],
        describe: 'npm/yarn/pnpm uninstall [package]',
        builder: (yargs) => new UninstallPlugin(bodyArgv).getOptions(yargs),
        handler: () => new UninstallPlugin(bodyArgv).handler(),
      })
      .command({
        command: ['ls [package] [DEBUG]','list'],
        describe: 'npm/yarn/pnpm list [package]',
        builder: (yargs) => new ListPlugin(bodyArgv).getOptions(yargs),
        handler: () => new ListPlugin(bodyArgv).handler(),
      })
      .command({
        command: ['run [script] [DEBUG]','r'],
        describe: 'npm/yarn/pnpm run [script]',
        builder: (yargs) => new RunPlugin(bodyArgv).getOptions(yargs),
        handler: () => new RunPlugin(bodyArgv).handler(),
      })
      .command({
        command: 'x [package] [DEBUG]',
        describe: 'npx/yarn dlx/pnpm dlx [package]',
        builder: (yargs) => new ExecutePlugin(bodyArgv).getOptions(yargs),
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
        builder: (yargs) => new ClonePlugin().getOptions(yargs),
        handler: (argv) => new ClonePlugin().handler(argv),
      })
      .command({
        command: 'push',
        describe: '推送项目到远程仓库以及创建MR',
        builder: (yargs) => new PushPlugin().getOptions(yargs),
        handler: () => new PushPlugin().handler(),
      })
      .alias('-h', '--help')
      .help();
  }
}
