import { computed, ref, readonly } from "vue";
import { useTraversable } from "./useTraversable";

export const useNavigation = (questions) => {

  const answers = ref({});

  const cloned = questions.map((q) => ({ ...q }));

  const traversable = useTraversable(cloned);
  const currentQuestion = traversable.currentItem;

  const obj = {
    ...traversable,
    currentQuestion,
    currentAnswer: computed(() => {
      return answers.value[currentQuestion.value.id];
    }),
    saveAnswer(a) {
      answers.value[currentQuestion.value.id] = a;
    },
    answers: readonly(answers)
  };

  delete obj.currentId;
  delete obj.currentItem;

  return obj;
};
