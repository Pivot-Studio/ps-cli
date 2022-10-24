import detect from './detect';
import { spawn, exec } from 'child_process';
/**
 * stdio:'inherit' 继承父进程，没有返回值
 * @param command 命令：string
 * @param cwd 命令执行路径：string
 * @returns
 */
export function execCommand(command: string, cwd?: string): Promise<string> {
  return new Promise(() => {
    const commands = command.split(' ');
    spawn(commands[0], commands.slice(1), {
      stdio: 'inherit',
      shell: process.platform === 'win32',
      cwd,
    });
  });
}

export function execCommandAsync(command: string): Promise<string> {
  return new Promise((resolve, reject) => {
    exec(command, function (error, stdout) {
      if (error) {
        return reject(error);
      }
      resolve(stdout);
    });
  });
}

export async function getCommand(command, args) {
  const { Commands } = await detect();
  const c = Commands[command];
  if (typeof c == 'object')
    throw new Error(
      'The command is not existing for package manager you using!!'
    );
  if (typeof c == 'function') {
    return c(args);
  } else return c.replace('{0}', args.join(' ')).trim();
}

export function remove(arr, flag) {
  let index = arr.indexOf(flag);
  if (index > -1) {
    arr.splice(index, 1);
  }
}

export function spliceArr<T>(arr: Array<T>, flag: T) {
  let index = arr.indexOf(flag);
  const res = arr.concat();
  if (index > -1) {
    return res.filter((_, i) => i !== index);
  }

  return res;
}

export function getLastElm(arr: any[]) {
  const len = arr.length;
  if (len === 0) return null;
  return arr[len - 1];
}
