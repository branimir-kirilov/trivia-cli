/* eslint-disable no-param-reassign */
const decode = require('decode-html');

const Services = require('./services');
const Logger = require('./logger');

let categories = null;

module.exports = {
  getCategories: async () => {
    Logger.info('Fetching categories...');

    await Services.getCategories()
      .then((res) => {
        if (res.data && res.data.trivia_categories) {
          categories = res.data.trivia_categories;

          Logger.info(`Found ${categories.length} categories`);
        }
      })
      .catch((err) => {
        Logger.error('Error', err);
      });
  },

  getQuestion: async (category, difficulty) => {
    const AMOUNT = 1;
    const categoryObj = categories.find(cat => cat.name === category);
    const categoryId = (categoryObj && categoryObj.id) || 0;
    difficulty = (difficulty && difficulty.toLowerCase()) || '';

    const response = await Services.getQuestion(AMOUNT, difficulty, categoryId)
      .catch((err) => {
        Logger.error('Error! Failed to get a question!', err);
      });

    if (response && response.data) {
      return (response.data.results && response.data.results[0]) || null;
    }

    return null;
  },

  askTriviaQuestion: (questionData) => {
    if (!questionData) {
      return null;
    }

    const promptData = {
      type: 'list',
      name: 'questionAnswer',
      message: decode(questionData.question),
      choices: [
        questionData.correct_answer,
        ...questionData.incorrect_answers,
      ],
    };

    return Logger.prompt(promptData);
  },

  askMetaQuestions: () => {
    const defaultCategory = { id: 0, name: 'ALL' };

    const questions = [
      {
        type: 'list',
        name: 'category',
        message: 'Select category:',
        choices: [defaultCategory, ...categories],
      },
      {
        type: 'list',
        name: 'difficulty',
        message: 'Select difficulty:',
        choices: ['Easy', 'Medium', 'Hard', 'Any'],
      },
    ];

    return Logger.prompt(questions);
  },

  askForAnother: async (error) => {
    const another = {
      type: 'confirm',
      name: 'more',
      message: error ? 'Try again?' : 'More questions?',
    };

    return Logger.prompt(another);
  },
};
