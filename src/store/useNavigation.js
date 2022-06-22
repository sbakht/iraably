import { computed, ref, readonly } from "vue";
import { defineStore } from "pinia";

function getById(questions, id) {
  return questions[id];
}

export const useNavigation = (questions) => {
  const currentId = ref(0);

  const questionById = (id) => {
    return getById(questions, id);
  };

  const currentQuestion = computed(() => {
    return questionById(currentId.value);
  });

  const isFinished = ref(false);

  const finish = () => { isFinished.value = true }


  const next = () => {
    if (currentId.value >= questions.length - 1) {
      finish();
    } else {
      currentId.value++;
    }
  };

  const previous = () => {
    if (quiz.value.currentId > 0) {
      currentId.value--;
    }
  };

  const reset = () => {
    currentId.value = 0;
    isFinished.value = false;
  };

  // const answers = ref({})

  // const answer = (answerId) => {
  //   answers.value[quiz.value.currentId] = answerId;
  //   next();
  // }

  // const points = computed(() => {
  //   return Object.keys(answers.value).map((questionId) => {
  //     const question = questionById(questionId);
  //     return question.correct === answers.value[questionId] ? 1 : 0;
  //   }).reduce((x, accum) => x + accum, 0);
  // })

  // const formattedAnswers = computed(() => {
  //   return Object.keys(answers.value).map((questionId) => {
  //     const question = questionById(questionId);
  //     return {
  //       title: question.title,
  //       answer: question.answers.find(a => a.id === answers.value[questionId])
  //     }
  //   })
  // })

  // const isDone = computed(() => {
  //   return Object.keys(answers.value).length >= quiz.value.questions.length;
  // });

  return {
    // quiz: readonly(quiz),
    currentQuestion: readonly(currentQuestion),
    next,
    previous,
    reset,
    isFinished: readonly(isFinished)
    // answer,
    // answers,
    // formattedAnswers,
    // points,
    // isDone
  };
};
