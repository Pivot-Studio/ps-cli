import chalk from 'chalk';

export const runningPrefixChalk = (prefix: string, content?: string) => {
  console.log(
    chalk.hex('#f8c499')(`[${prefix}] ${content ? `: ${content}` : ''}`)
  );
};

export const blueChalk = (str: string) => chalk.hex('#4172b8')(str);
