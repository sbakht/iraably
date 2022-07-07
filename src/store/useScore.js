import { computed, ref, readonly, watch, unref } from "vue";

const allTrue = (arr) => arr.reduce((curr, accum) => curr && accum, true);

const includes = (arr) => (v) => arr.includes(v);

const isSubset = (subset, superset) => {
  return allTrue(subset.map(includes(superset)));
};

const convertToArray = (v) => (v.length == undefined ? [v] : v);

const equals = (subset, superset) => {
  const s1 = convertToArray(subset);
  const s2 = convertToArray(superset);

  if (s1.length !== s2.length) {
    return false;
  }

  return isSubset(s1, s2);
};

const precentCorrect = (answer, correct) => {
  return answer.filter(includes(correct)).length / correct.length;
};

export const useUserScore = (
  questions,
  pointSystem,
  givenAnswers,
  { partialCredit = false } = {}
) => {

  const score = computed(() => {
    return questions
      .map((q) => {
        const id = q.id;
        const givenAnswer = unref(givenAnswers)[id];

        if (equals(givenAnswer, q.correct)) {
          return pointSystem[id].fullCredit;
        }
        if (partialCredit) {
          return Math.round(
            precentCorrect(givenAnswer, q.correct) * pointSystem[id].fullCredit
          );
        }
        return 0;
      })
      .reduce((curr, accum) => curr + accum, 0);
  });

  return {
    score,
  };

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

  // return {
  //   ...navigation,
  //   // questions,
  //   answers,
  //   saveAnswer,
  //   clearAnswer,
  //   clearAnswers,
  // };
};
