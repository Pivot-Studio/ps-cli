#! /usr/bin/env node

import install from './libs/install.js'
import execute from './libs/execute.js'
import uninstall from './libs/uninstall.js'
import update from './libs/update.js'
import create from './libs/create.js'

const argv = process.argv.slice(2)

const header = argv[0]

if (header == 'i') {
    install(argv.slice(1))
} else if (header == 'x') {
    execute(argv.slice(1))
} else if (header == 'ui') {
    uninstall(argv.slice(1))
} else if (header == 'u') {
    update(argv.slice(1))
} else if (header == 'create' || !header) {
    create(argv.slice(1))

}
