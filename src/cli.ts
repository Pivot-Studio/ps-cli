#! /usr/bin/env node

import chalk from 'chalk';

import init from './libs/init';
import install from './libs/install';
import execute from './libs/execute';
import uninstall from './libs/uninstall';
import update from './libs/update';
import create from './libs/create';
import run from './libs/run';
import list from './libs/list';

const argv = process.argv.slice(2);

const header = argv[0];
const body = argv.slice(1);

if (header == 'init') {
  init(body);
} else if (header == 'i') {
  install(body);
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
  create();
} else {
  console.warn(chalk.red('Wrong Command!'));
}
