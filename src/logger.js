const chalk = require('chalk');
const inquirer = require('inquirer');

module.exports = {
    rightAnswer: message => {
        console.log(
            chalk.white.bgGreen.bold(message)
        );
    },

    wrongAnswer: message => {
        console.log(
            chalk.white.bgRed.bold(message)
        );
    },

    info: message => {
        console.log(
            chalk.green(message)
        );
    },

    error: message => {
        console.log(
            chalk.red(message)
        );
    },

    prompt: promptData => {
        return inquirer.prompt(promptData);
    }
}