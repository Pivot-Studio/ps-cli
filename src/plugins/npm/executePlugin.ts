import BasePlugin from './basePlugin';
export default class ExecutePlugin extends BasePlugin {
  constructor(options: string[]) {
    super('execute', options);
  }
  exec(): void {
    super.start();
  }
}
