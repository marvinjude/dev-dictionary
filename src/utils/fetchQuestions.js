let questions = {
    1: {
        question: 'What is Svelte?',
        score: '100',
        options: {
            1: 'Laravel',
            2: 'Valet',
            3: 'Vulcan',
            4: 'Elixir'
        },
        answer: 1,
    },
    2: {
        question: 'What is ....B?',
        score: '100',
        options: {
            1: 'Boy ',
            2: 'Girl'
        },
        answer: 1,
    },
    3: {
        question: 'What is ....C?',
        score: '100',
        options: {
            1: 'Car',
            2: 'Bike'
        },
        answer: 1,
    },
    4: {
        question: 'What is ....D?',
        score: '100',
        options: {
            1: 'DOn',
            2: 'Sir'
        },
        answer: 1,
    },
    5: {
        question: 'What is ....E?',
        score: '100',
        options: {
            1: 'PHP',
            2: 'JS '
        },
        answer: 1,
    },
}

const fetchQuestions = () => {
    return new Promise((resolve, reject) => {
        setTimeout(()=> resolve(questions), 2000);
    })
}

export default fetchQuestions;