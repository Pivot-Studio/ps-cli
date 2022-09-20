import chalk from 'chalk';

export const runningPrefixChalk = (text: string) => {
  console.log(chalk.hex('#f8c499')(`[${text}]`));
};
