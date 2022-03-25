#! /usr/bin/env node

import chalk from 'chalk'

import init from './libs/init.js'
import install from './libs/install.js'
import execute from './libs/execute.js'
import uninstall from './libs/uninstall.js'
import update from './libs/update.js'
import create from './libs/create.js'
import run from './libs/run.js'
import list from './libs/list.js'

const argv = process.argv.slice(2)

const header = argv[0]
const body = argv.slice(1)

if (header == 'init') {
    init(body)
} else if (header == 'i') {
    install(body)
} else if (header == 'x') {
    execute(body)
} else if (header == 'ui') {
    uninstall(body)
} else if (header == 'u') {
    update(body)
} else if (header == 'r') {
    run(body)
} else if (header == 'ls') {
    list(body)
}
else if (header == 'create' || !header) {
    create(body)
} else {
    console.warn(chalk.red('Wrong Command!'))
}
