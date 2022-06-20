import { computed, ref } from 'vue';
import { defineStore } from 'pinia'

const allTrue = arr => arr.reduce((curr, accum) => curr && accum, true)

const includes = arr => v => arr.includes(v)

const isSubset = (subset, superset) => {
  return allTrue(subset.map(includes(superset)))
}

const equals = (subset, superset) {
  if(subset.length !== superset.length) {
    return false;
  }

  return isSubset(subset, superset);
}

export const useQuiz = (s = [], ss = []) => {
  const choices = [];
  const correctAnswers = [];
  const selected = ref([]);


  const incorrectSelections = computed(() => {
    return selected.value.filter(s => !includes(correctAnswers)(s)) 
  });

  const correctSelections = computed(() => {
    return selected.value.filter(includes(correctAnswers)) 
  });

  const missingSelections = computed(() => {
    return correctAnswers.filter(s => !includes(selected.value)(s)) 
  });


  const isCorrectSoFar = computed(() => {
    return incorrectSelections.value.length === 0;
    // return isSubset(selected.value, correctAnswers) 
  });

  const isMissingAnswer = computed(() => {
    return missingSelections.value.length > 0;
    // return selected.value.length < correctAnswers.length
  });
  
  const isFullyCorrect = computed(() => {
    return !isMissingAnswer.value && isCorrectSoFar.value
    // return equals(selected.value, correctAnswers);
  });

  const setAnswers = (arr) => {
    selected.value = arr;
  }

  return {
    isFullyCorrect,
    setAnswers,
  }
}

export const useQuizStore = defineStore('quiz', useQuiz) 