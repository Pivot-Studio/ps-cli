import BasePlugin from './basePlugin';
export default class InstallPlugin extends BasePlugin {
  // 子命令Plugin通过以下形式在BasePlugin中进行挂载
  constructor(options: string[]) {
    super('init', options);
  }
  exec(): void {
    super.start();
  }
}
