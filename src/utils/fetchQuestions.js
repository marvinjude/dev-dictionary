let questions = {
  1: {
    type: 'A',
    question: 'What is Sveltee?',
    score: 100,
    options: {
      1: 'Laravel',
      2: 'Valet',
      3: 'Vulcan',
      4: 'Elixir',
    },
    answer: 1,
  },
  2: {
    type: 'A',
    question: 'What is ....B?',
    score: '100',
    options: {
      1: 'Boy ',
      2: 'Girl',
      3: 'Girl',
      4: 'Girl',
    },
    answer: 1,
  },
  3: {
    type: 'A',
    question: 'What is ....C?',
    score: 100,
    options: {
      1: 'Car',
      2: 'Bike',
      3: 'Bike',
      4: 'Bike',
    },
    answer: 1,
  },
  4: {
    type: 'A',
    question: 'What is ....D?',
    score: 100,
    options: {
      1: 'DOn',
      2: 'Sir',
      3: 'Sir',
      4: 'Sir',
    },
    answer: 1,
  },
  5: {
    type: 'A',
    question: 'What is ....E?',
    score: 100,
    options: {
      1: 'PHP',
      2: 'JS ',
      3: 'JS ',
      4: 'JS ',
    },
    answer: 1,
  },
  6: {
    type: 'B',
    question:"Which is the image of reactJs",
    score: 200,
    options: {
     1 : 'https://www.imgur.com/rand/33kej',
     2 : 'https://www.imgur.com/rand/33kej'
    },
    answer: 1,
  }
}

const fetchQuestions = () => {
  return new Promise((resolve, reject) => {
    setTimeout(() => resolve(questions), 2000)
  })
}

export default fetchQuestions
