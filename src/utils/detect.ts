import fs from 'fs';
import path from 'path';
import InquirerBuilder from './inquirer';
import { LOCKS, AGENTS } from '@/constant';

async function detect() {
  let cwd = process.cwd();
  let dest = '';
  let locksPath = '';
  let m: any;
  for (let lock of Object.keys(LOCKS)) {
    if ((m = findUp('', cwd, lock))) {
      const { lock, LocksPath } = m;
      dest = lock;
      locksPath = LocksPath;
      break;
    }
  }
  ///['package-lockon', 'D:\\workplace\\ps-cli']
  if (!dest) {
    const inquirerBuilder = new InquirerBuilder();
    let { packageManager } = await inquirerBuilder
      .rawlist('packageManager', 'Which package managers do you want to use?')
      .add({
        name: 'Npm',
        value: 'package-lock.json',
      })
      .add({
        name: 'Pnpm',
        value: 'pnpm-lock.yaml',
      })
      .add({
        name: 'Yarn',
        value: 'yarn.lock',
      })
      .prompt();
    dest = packageManager;
  }
  return [dest, locksPath];
}
/**
 * @description:
 * @param {*} prev 上一次递归目录路径
 * @param {*} search 目前搜索的目录
 * @param {*} lock 目标lock文件名
 * @return {*}
 */
function findUp(prev, search, lock) {
  if (prev == search) return;
  let files = fs.readdirSync(search);
  if (files.includes(lock)) {
    const LocksPath = path.join(search, 'package.json');
    return { lock, LocksPath };
  } else {
    // eslint-disable-next-line no-param-reassign
    prev = search;
    return findUp(prev, path.resolve(search, '../'), lock);
  }
}
export default async function () {
  let [res, locksPath] = await detect();
  const packageManage = LOCKS[res];
  return {
    packageManage,
    Commands: AGENTS[packageManage],
    locksPath,
  };
}
