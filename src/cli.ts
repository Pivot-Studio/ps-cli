#! /usr/bin/env node

import Parser from './parser';
import InitPlugin from './plugins/npm/initPlugin';
import InstallPlugin from './plugins/npm/installPlugin';
import ExecutePlugin from './plugins/npm/executePlugin';
import UninstallPlugin from './plugins/npm/uninstallPlugin';
import UpdatePlugin from './plugins/npm/updatePlugin';
import RunPlugin from './plugins/npm/runPlugin';
import ListPlugin from './plugins/npm/listPlugin';
const argv = process.argv.slice(2);
const header = argv[0];
const body = argv.slice(1);

if (header == 'init') {
  new InitPlugin(body).exec();
} else if (header == 'i') {
  new InstallPlugin(body).exec();
} else if (header == 'x') {
  new ExecutePlugin(body).exec();
} else if (header == 'ui') {
  new UninstallPlugin(body).exec();
} else if (header == 'u') {
  new UpdatePlugin(body).exec();
} else if (header == 'r') {
  new RunPlugin(body).exec();
} else if (header == 'ls') {
  new ListPlugin(body).exec();
} else {
  new Parser();
}
