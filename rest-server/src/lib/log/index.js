import * as chalk from 'chalk';

export const success = (...log) => {
  if (process.env.DEBUG === 'TRUE') {
    console.log(chalk.default.yellow.bold(...log));
  }
};

export const error = (...log) => {
  if (process.env.DEBUG === 'TRUE') {
    console.log(chalk.default.red.bold(...log));
  }
};