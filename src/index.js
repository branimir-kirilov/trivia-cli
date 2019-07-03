#!/usr/bin/env node
const figlet = require('figlet');

const Questions = require('./questions');
const Logger = require('./logger');

const exit = async (error) => {
  const shouldAskMore = await Questions.askForAnother(error);

  if (!shouldAskMore.more) {
    Logger.info('GG! Bye!');

    if (error) {
      process.exit(1);
    }

    process.exit();
  }
};

const ask = async ({ category, difficulty }) => {
  const question = await Questions.getQuestion(category, difficulty);

  if (question) {
    const prompt = await Questions.askTriviaQuestion(question);

    if (prompt.questionAnswer === question.correct_answer) {
      Logger.rightAnswer('Great. Correct!');
    } else {
      Logger.wrongAnswer(`Sorry that was wrong. Correct answer is: ${question.correct_answer}`);
    }

    await exit();
  } else {
    Logger.error('An error occurred while trying to fetch a question!');

    await exit(true);
  }
};

const init = async () => {
  Logger.info(
    figlet.textSync('Trivia - CLI', {
      horizontalLayout: 'default',
      verticalLayout: 'default',
    }),
  );

  await Questions.getCategories();
};

const run = async () => {
  await init();

  const answers = await Questions.askMetaQuestions();

  while (1) {
    /* eslint-disable no-await-in-loop */
    await ask(answers);
  }
};

run();
