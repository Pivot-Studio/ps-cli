import chalk from 'chalk';
import { Signale } from 'signale'
class Logger {
  logger: Signale
  constructor() {
    this.logger = new Signale({
      scope: 'psfe-zeus',
      types: {
        pending: {
          badge: '🚄',
          color: 'cyan',
          label: 'pending',
          logLevel: 'info'
        }
      }
    })
  }
  pending(message: string) {
    this.logger.pending(message);
  }
  start(message: string) {
    this.logger.start(message);
  }
  success(message: string) {
    this.logger.success(message)
  }
  blue(message: string) {
    chalk.hex('#4172b8')(message)
  }
  
}
export default new Logger()
export const runningPrefixChalk = (prefix: string, content?: string) => {
  console.log(
    chalk.hex('#f8c499')(`[${prefix}] ${content ? `: ${content}` : ''}`)
  );
};

