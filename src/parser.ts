// import chalk from 'chalk';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
import CreatePlugin from './plugins/createPlugin';
import ClonePlugin from './plugins/clonePlugin';
import PushPlugin from './plugins/pushPlugin';

export default class Parser {
  pluginMap: Map<string, any>;
  constructor() {
    const createPlugin = new CreatePlugin();
    const clonePlugin = new ClonePlugin();
    const pushPlugin = new PushPlugin();
    const pluginMap = new Map();
    pluginMap.set('create', createPlugin);
    pluginMap.set('clone', clonePlugin);
    pluginMap.set('push', pushPlugin);
    this.pluginMap = pluginMap;
    this._parse();
  }
  private _parse() {
    const originArgv =
      hideBin(process.argv).length > 0 ? hideBin(process.argv) : ['-h'];
    const { argv } = yargs(originArgv)
      .strict()
      .scriptName('zeus')
      .usage('Usage: $0 <command> [args]')
      .command({
        command: 'create [template]',
        describe: '初始化项目模板',
        builder: (yargs) => this.pluginMap.get('create').getOptions(yargs),
        handler: (argv) => this.pluginMap.get('create').handler(argv),
      })
      .command({
        command: 'clone [url]',
        describe: '从github仓库上拉取项目',
        builder: (yargs) => this.pluginMap.get('clone').getOptions(yargs),
        handler: (argv) => this.pluginMap.get('clone').handler(argv),
      })
      .command({
        command: 'push',
        describe: '推送项目到远程仓库以及创建MR',
        builder: (yargs) => this.pluginMap.get('push').getOptions(yargs),
        handler: (argv) => this.pluginMap.get('push').handler(argv),
      })
      .alias('-h', '--help')
      .help();
  }
}
