import fs from 'fs'
import path, { resolve } from 'path'
import inquirer from "inquirer"

export let LocksPath;

function npmRun(packageManager) {
    return (args) => {
        if (args.length > 1)
            return `${packageManager} run ${args[0]} -- ${args.slice(1).join(' ')}`
        else return `${packageManager} run ${args[0]}`
    }
}
const LOCKS = {
    'pnpm-lock.yaml': 'pnpm',
    'yarn.lock': 'yarn',
    'package-lock.json': 'npm',
}

const AGENTS = {
    'npm': {
        'init': 'npm init',
        'install': 'npm install',
        'add': 'npm install {0}',
        'global': 'npm install {0} -g',
        'frozen': 'npm ci',
        'upgrade': 'npm update {0}',
        'upgrade-global': 'npm upgrade -g {0}',
        'upgrade-interactive': null,
        'execute': 'npx {0}',
        'uninstall': 'npm uninstall {0}',
        'uninstall_global': 'npm uninstall {0} -g',
        'run': npmRun('npm'),
        "list": 'npm ls {0}',
        "view": "npm view {0} versions"
    },
    'yarn': {
        'init': 'yarn init',
        'install': 'yarn install',
        'add': 'yarn add {0}',
        'global': 'yarn global add {0}',
        'frozen': 'yarn install --frozen-lockfile',
        'upgrade': 'yarn upgrade {0}',
        'upgrade-global': 'yarn global upgrade {0}',
        'upgrade-interactive': 'yarn upgrade-interactive {0}',
        'execute': 'yarn dlx {0}',
        'uninstall': 'yarn remove {0}',
        'uninstall_global': 'yarn global remove {0}',
        'run': 'yarn run {0}',
        "list": 'yarn list {0}',
        "view": "npm view {0} versions"
    },
    'pnpm': {
        'init': 'pnpm init',
        'install': 'pnpm install',
        'add': 'pnpm add {0}',
        'global': 'pnpm add -g {0}',
        'frozen': 'pnpm i --frozen-lockfile',
        'upgrade': 'pnpm up {0}',
        'upgrade-global': 'pnpm up -g {0}',
        'upgrade-interactive': 'pnpm up -i {0}',
        'execute': 'pnpm dlx {0}',
        'uninstall': 'pnpm remove {0}',
        'uninstall_global': 'pnpm remove --global {0}',
        'run': npmRun('pnpm'),
        "list": 'pnpm ls {0}',
        "view": "npm view {0} versions"
    },
}
async function detect() {
    let cwd = process.cwd()
    let dest = ''

    for (let lock of Object.keys(LOCKS)) {
        if (dest = findUp('', cwd, lock)) {
            break
        }
    }
    ///['package-lock.json', 'D:\\workplace\\ps-cli']
    if (!dest) {
        // throw new Error("Your project must have a package lock file!! /n you can input 'psc init' ")
        let { packageManager } = await inquirer.prompt([{
            type: "rawlist",
            name: 'packageManager',
            message: 'Which package managers do you want to use?',
            choices: [{
                name: 'Npm',
                value: 'package-lock.json'
            },
            {
                name: 'Pnpm',
                value: 'pnpm-lock.yaml'
            },
            {
                name: 'Yarn',
                value: 'yarn.lock'
            }
            ]
        }])
        dest = packageManager
    }
    return dest



}
/**
 * @description: 
 * @param {*} prev 上一次递归目录路径
 * @param {*} search 目前搜索的目录
 * @param {*} lock 目标lock文件名
 * @return {*}
 */
function findUp(prev, search, lock) {
    if (prev == search) return
    let files = fs.readdirSync(search)
    if (files.includes(lock)) {
        LocksPath = path.join(search, 'package.json')
        return lock
    }
    else {
        prev = search
        return findUp(prev, path.resolve(search, '../'), lock)
    }
}


let res = await detect()
export let packageManage = LOCKS[res];
export let Commands = AGENTS[packageManage];

