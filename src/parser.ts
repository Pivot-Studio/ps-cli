// import chalk from 'chalk';
import yargs from 'yargs';
import { hideBin } from 'yargs/helpers';
// import InitPlugin from './plugins/init';
// import InstallPlugin from './plugins/install';
// import execute from './plugins/execute';
// import uninstall from './plugins/uninstall';
// import update from './plugins/update';
// import create from './plugins/create';
// import run from './plugins/run';
// import list from './plugins/list';

export default class Parser {
  constructor() {
    yargs(hideBin(process.argv))
      .strict()
      .scriptName('zeus')
      .usage('Usage: $0 [command]')
      .alias('h', 'help')
      .command({
        command: 'create',
        describe: '初始化项目模板',
        builder: (yargs) => {
          return yargs
            .options({
              react: {
                describe: 'React H5项目模板',
                boolean: false,
              },
              typescript: {
                describe: 'typescript 项目模板',
                boolean: false,
              },
            })
            .usage('$0 create [--react/--typescript]'); // 辅助指南，终端输出的可以看到
        },
        handler: async (argv) => {
          console.log(argv, '$0');
          // clean(argv?.path);
        },
      })
      .help().argv;
  }
}
