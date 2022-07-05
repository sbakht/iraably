import { computed, ref, readonly } from 'vue';

// const allTrue = arr => arr.reduce((curr, accum) => curr && accum, true)

const includes = arr => v => arr.includes(v)

// const isSubset = (subset, superset) => {
//   return allTrue(subset.map(includes(superset)))
// }

// const equals = (subset, superset) => {
//   if (subset.length !== superset.length) {
//     return false;
//   }

//   return isSubset(subset, superset);
// }

export const subset = (s = [], ss = []) => {
  // const choices = [];
  const correctAnswers = s;
  const selected = ref(ss);


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

  const setSelected = (arr) => {
    selected.value = arr;
  }

  const toggle = (i) => {
    if (includes(selected.value)(i)) {
      selected.value = selected.value.filter(x => x !== i)
    } else {
      selected.value.push(i)
    }
  }

  const isSelected = i => includes(selected.value)(i)


  return {
    selected: readonly(selected),
    setSelected,
    toggle,
    isSelected,
    incorrectSelections,
    correctSelections,
    missingSelections,
    isCorrectSoFar,
    isMissingAnswer,
    isFullyCorrect,
  }
}