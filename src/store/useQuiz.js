import { computed, ref, unref } from 'vue';
import { useNavigation } from './useNavigation';
import { subsetType } from './factory.js';
import { useUserScore } from './useScore';


export const useQuiz = (questions, scores, type = 'optional') => {

  const n = useNavigation(questions);

  const currentQuestion = n.currentQuestion

  // const type = 'optional';
  // const type = 'required';
  // const type = 'required-correct';

  const sub = computed(() => {
    const correctAnswer = currentQuestion.value.correct;

    return subsetType[type](correctAnswer, unref(n.currentAnswer), {
      limitChoicesLength: Infinity,
      removeLast: false,
    });
  });


  const toggleAnswer = id => {
    sub.value.toggle(id)
  }

  const next = () => {
    if (sub.value.canProceed.value) {
      n.saveAnswer(sub.value.selected.value);
      n.next();
    }
  }

  const previous = () => {
    n.saveAnswer(sub.value.selected.value);
    n.previous()
  }

  const reset = () => {
    n.reset();
  }


  return {
    ...n,
    questionState: sub,
    toggleAnswer,
    next,
    previous,
    reset,
    score() {
      const userAnswers = n.answers.value;
      const s = useUserScore(questions, scores, userAnswers, { partialCredit: true })
      return s.score;
    },
    questions,
  }


  // const quiz = ref({
  //   currentId: 0,
  //   questions,
  // });

  // const questionById = id => {
  //   return getById(quiz.value.questions, id);
  // }

  // const currentQuestion = computed(() => {
  //   return questionById(quiz.value.currentId)
  // })


  // const next = () => {
  //   quiz.value.currentId++
  // }

  // const reset = () => {
  //   quiz.value.currentId = 0;
  // }

  // const answer = (answerId) => {
  //   answers.value[quiz.value.currentId] = answerId;
  //   next();
  // }


  // const formattedAnswers = computed(() => {
  //   return Object.keys(answers.value).map((questionId) => {
  //     const question = questionById(questionId);
  //     return {
  //       title: question.title,
  //       answer: question.answers.find(a => a.id === answers.value[questionId])
  //     }
  //   })
  // })

  // return {
  //   quiz,
  //   currentQuestion,
  //   next,
  //   reset,
  //   answer,
  //   answers,
  //   formattedAnswers,
  //   points,
  //   isDone
  // }
}
