import { execCommand, execCommandAsync, getLastElm } from './index';
import { readJsonSync } from 'fs-extra';
import path from 'path';
import { lt } from 'semver';
import logger from './logger';
export const updateVersion = async () => {
  const latest = await getLastestVer();
  // const latest = '0.0.8';
  const current = getCurrentVer();
  if (lt(current, latest)) {
    logger.banner(
      `当前@psfe/zeus的版本是${current}，监测到npm上最新版本为${latest}，将会进行自动更新，请等候～`
    );
    execCommandAsync('npm install @psfe/zeus@latest -g').then(stdout=>{
      console.log(stdout);
      logger.success('zeus 版本更新完毕～')
    });
  } else {
    // 等于
    logger.banner('当前@psfe/zeus的版本已达到最新版本，请安心使用～');
  }
  console.log(latest, current);
};

const getLastestVer = async () => {
  const versionsStr = await execCommandAsync('npm view @psfe/zeus versions'); // [ '0.0.1', '0.0.2', '0.0.3', '0.0.4' ]
  const versionReg = /(\d+\.\d+\.\d+)/g;
  return getLastElm(versionsStr.match(versionReg));
};

const getCurrentVer = () => {
  const pkg = readJsonSync(path.resolve(__dirname, '../../package.json'));
  return pkg.version;
};
