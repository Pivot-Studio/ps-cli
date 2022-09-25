import path from 'path';
function npmRun(packageManager: string) {
  return (args: string[]) => {
    if (args.length > 1)
      return `${packageManager} run ${args[0]} -- ${args.slice(1).join(' ')}`;
    else return `${packageManager} run ${args[0]}`;
  };
}
export const DEBUG = '?';
export const LOCAL_PATH = path.resolve(
  process.env.HOME || process.env.USERPROFILE,
  '.zeus/bolierplates'
);
export const LOCKS = {
  'pnpm-lock.yaml': 'pnpm',
  'yarn.lock': 'yarn',
  'package-lock.json': 'npm',
};

export const AGENTS = {
  npm: {
    init: 'npm init',
    install: 'npm install',
    add: 'npm install {0}',
    global: 'npm install {0} -g',
    frozen: 'npm ci',
    upgrade: 'npm update {0}',
    'upgrade-global': 'npm upgrade -g {0}',
    'upgrade-interactive': null,
    execute: 'npx {0}',
    uninstall: 'npm uninstall {0}',
    uninstall_global: 'npm uninstall {0} -g',
    run: npmRun('npm'),
    list: 'npm ls {0}',
    view: 'npm view {0} versions',
  },
  yarn: {
    init: 'yarn init',
    install: 'yarn install',
    add: 'yarn add {0}',
    global: 'yarn global add {0}',
    frozen: 'yarn install --frozen-lockfile',
    upgrade: 'yarn upgrade {0}',
    'upgrade-global': 'yarn global upgrade {0}',
    'upgrade-interactive': 'yarn upgrade-interactive {0}',
    execute: 'yarn dlx {0}',
    uninstall: 'yarn remove {0}',
    uninstall_global: 'yarn global remove {0}',
    run: 'yarn run {0}',
    list: 'yarn list {0}',
    view: 'npm view {0} versions',
  },
  pnpm: {
    init: 'pnpm init',
    install: 'pnpm install',
    add: 'pnpm add {0}',
    global: 'pnpm add -g {0}',
    frozen: 'pnpm i --frozen-lockfile',
    upgrade: 'pnpm up {0}',
    'upgrade-global': 'pnpm up -g {0}',
    'upgrade-interactive': 'pnpm up -i {0}',
    execute: 'pnpm dlx {0}',
    uninstall: 'pnpm remove {0}',
    uninstall_global: 'pnpm remove --global {0}',
    run: npmRun('pnpm'),
    list: 'pnpm ls {0}',
    view: 'npm view {0} versions',
  },
};
