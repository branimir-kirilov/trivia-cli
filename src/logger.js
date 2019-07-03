/* eslint-disable no-console */
const chalk = require('chalk');
const inquirer = require('inquirer');

module.exports = {
  rightAnswer: (...args) => {
    console.log(
      chalk.white.bgGreen.bold(args),
    );
  },

  wrongAnswer: (...args) => {
    console.log(
      chalk.white.bgRed.bold(args),
    );
  },

  info: (...args) => {
    console.log(
      chalk.green(args),
    );
  },

  error: (...args) => {
    console.log(
      chalk.red(args),
    );
  },

  prompt: promptData => inquirer.prompt(promptData),
};
