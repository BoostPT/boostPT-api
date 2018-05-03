import * as chalk from 'chalk';

export const success = (...log) => {
  if (process.env.DEBUG === 'TRUE') {
    console.log(chalk.yellow.bold(...log));
  }
};

export const error = (...log) => {
  if (process.env.DEBUG === 'TRUE') {
    console.log(chalk.red.bold(...log));
  }
};