// import chalk from 'chalk';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
// import InitPlugin from './plugins/init';
// import InstallPlugin from './plugins/install';
// import execute from './plugins/execute';
// import uninstall from './plugins/uninstall';
// import update from './plugins/update';
// import create from './plugins/create';
import CreatePlugin from './plugins/createPlugin';
// import run from './plugins/run';
// import list from './plugins/list';

export default class Parser {
  pluginMap: Map<string, any>;
  constructor() {
    const createPlugin = new CreatePlugin();
    const pluginMap = new Map();
    pluginMap.set('create', createPlugin);
    this.pluginMap = pluginMap;
    this._parse();
  }
  private _parse() {
    const { argv } = yargs(hideBin(process.argv))
      .strict()
      .scriptName('zeus')
      .usage('Usage: $0 <command> [args]')
      .command(
        '$0',
        'the default command 等同于 <zeus create>',
        (yargs) => this.pluginMap.get('create').getOptions(yargs),
        (argv) => this.pluginMap.get('create').handler(argv)
      )
      .alias('h', 'help')
      .command({
        command: 'create [template]',
        describe: '初始化项目模板',
        builder: (yargs) => this.pluginMap.get('create').getOptions(yargs),
        handler: (argv) => this.pluginMap.get('create').handler(argv),
      })
      .help();
  }
}
