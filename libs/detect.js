import fs from 'fs'
import path from 'path'
const LOCKS = {
    'pnpm-lock.yaml': 'pnpm',
    'yarn.lock': 'yarn',
    'package-lock.json': 'npm',
}
const AGENTS = {
    'npm': {
        'install': 'npm install {0}',
        'frozen': 'npm ci',
        'upgrade': 'npm update {0}',
        'execute': 'npx {0}',
        'uninstall': 'npm uninstall {0}',
        'uninstall_all': 'npm uninstall *',
    },
    // 'yarn': {
    //     'run': 'yarn run {0}',
    //     'install': 'yarn install',
    //     'frozen': 'yarn install --frozen-lockfile',
    //     'global': 'yarn global add {0}',
    //     'add': 'yarn add {0}',
    //     'upgrade': 'yarn upgrade {0}',
    //     'upgrade-interactive': 'yarn upgrade-interactive {0}',
    //     'execute': 'yarn dlx {0}',
    //     'uninstall': 'yarn remove {0}',
    //     'global_uninstall': 'yarn global remove {0}',
    // },
    // 'yarn@berry': {
    //     'run': 'yarn run {0}',
    //     'install': 'yarn install',
    //     'frozen': 'yarn install --immutable',
    //     // yarn3 removed 'global', see https://github.com/yarnpkg/berry/issues/821
    //     'global': 'npm i -g {0}',
    //     'add': 'yarn add {0}',
    //     'upgrade': 'yarn up {0}',
    //     'upgrade-interactive': 'yarn up -i {0}',
    //     'execute': 'yarn dlx {0}',
    //     'uninstall': 'yarn remove {0}',
    //     'global_uninstall': 'npm uninstall -g {0}',
    // },
    // 'pnpm': {
    //     'run': npmRun('pnpm'),
    //     'install': 'pnpm i',
    //     'frozen': 'pnpm i --frozen-lockfile',
    //     'global': 'pnpm add -g {0}',
    //     'add': 'pnpm add {0}',
    //     'upgrade': 'pnpm update {0}',
    //     'upgrade-interactive': 'pnpm update -i {0}',
    //     'execute': 'pnpm dlx {0}',
    //     'uninstall': 'pnpm remove {0}',
    //     'global_uninstall': 'pnpm remove --global {0}',
    // },
}
function detect() {
    let cwd = process.cwd()
    let dest = ''
    for (let lock of Object.keys(LOCKS)) {
        if (dest = findUp('', cwd, lock)) {
            break
        }
    }
    ///['package-lock.json', 'D:\\workplace\\ps-cli']
    // throw new Error('Your project must have a package lock file!!')
    if (!dest) {
        (async function () {
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
        })()

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
        // console.log(lock);
        return lock
    }
    else {
        prev = search
        return findUp(prev, path.resolve(search, '../'), lock)
    }
}
let dest = detect()
export let packageManage = LOCKS[dest]
export const Commands = AGENTS[packageManage]


