import { computed, ref } from 'vue';
import { defineStore } from 'pinia'

function getById(questions, id) {
  return questions[id];
}

export const useQuiz = () => {

  const questions = [
    {
      id: 0, title: 'What is the day?', correct: 3, answers: [
        { id: 2, title: 'Monday' },
        { id: 3, title: 'Friday' },
      ]
    },
    {
      id: 1, title: 'What time is it?', correct: 4, answers: [
        { id: 4, title: '12:00' },
        { id: 5, title: '3:00' },
      ]
    }
  ]

  const answers = ref({})

  const quiz = ref({
    currentId: 0,
    questions,
  });

  const questionById = id => {
    return getById(quiz.value.questions, id);
  }

  const currentQuestion = computed(() => {
    return questionById(quiz.value.currentId)
  })


  const next = () => {
    quiz.value.currentId++
  }

  const reset = () => {
    quiz.value.currentId = 0;
  }

  const answer = (answerId) => {
    answers.value[quiz.value.currentId] = answerId;
    next();
  }

  const points = computed(() => {
    return Object.keys(answers.value).map((questionId) => {
      const question = questionById(questionId);
      return question.correct ===answers.value[questionId] ? 1 : 0;
    }).reduce((x, accum) => x + accum, 0);
  })


  const formattedAnswers = computed(() => {
    return Object.keys(answers.value).map((questionId) => {
      const question = questionById(questionId);
      return {
        title: question.title,
        answer: question.answers.find(a => a.id === answers.value[questionId])
      }
    })
  })

  const isDone = computed(() => {
    return Object.keys(answers.value).length >= quiz.value.questions.length;
  });


  return {
    quiz,
    currentQuestion,
    next,
    reset,
    answer,
    answers,
    formattedAnswers,
    points,
    isDone
  }
}

export const useQuizStore = defineStore('quiz', useQuiz) 