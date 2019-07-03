const axios = require('axios');

const URLS = {
  categories: 'https://opentdb.com/api_category.php',
  questions: 'https://opentdb.com/api.php',
};

module.exports = {
  getCategories: () => axios.get(URLS.categories),
  getQuestion: (amount, difficulty, category) => axios.get(URLS.questions, {
    params: {
      amount,
      difficulty,
      category,
    },
  }),
};
