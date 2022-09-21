#! /usr/bin/env node

import chalk from 'chalk';
import Parser from './parser';
import InitPlugin from './plugins/npm/initPlugin';
import InstallPlugin from './plugins/npm/installPlugin';
import execute from './plugins/execute';
import uninstall from './plugins/uninstall';
import update from './plugins/update';
// import create from './plugins/create';
import run from './plugins/run';
import list from './plugins/list';
const argv = process.argv.slice(2);

const header = argv[0];
const body = argv.slice(1);

if (header == 'init') {
  new InitPlugin(body);
} else if (header == 'i') {
  new InstallPlugin(body);
} else if (header == 'x') {
  execute(body);
} else if (header == 'ui') {
  uninstall(body);
} else if (header == 'u') {
  update(body);
} else if (header == 'r') {
  run(body);
} else if (header == 'ls') {
  list(body);
} else if (header == 'create' || !header) {
  // create();
  new Parser();
} else {
  new Parser();
  // console.warn(chalk.red('Wrong Command!'));
}
