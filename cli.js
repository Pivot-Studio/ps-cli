#! /usr/bin/env node

// 现在需要用detect做一个相当于拦截器把。。。用于当没有lock文件的时候，用户自定义的去实现功能
import init from './libs/init.js'
import install from './libs/install.js'
import execute from './libs/execute.js'
import uninstall from './libs/uninstall.js'
import update from './libs/update.js'
import create from './libs/create.js'
import run from './libs/run.js'

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
}
else if (header == 'create' || !header) {
    create(body)
}
