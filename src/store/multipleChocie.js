
import { computed, ref } from 'vue';
import { subset } from './subset'
import { limitChoices } from './limitChoices';

export const optional = (s = [], ss = [], { limitChoicesLength, removeLast }) => {

  const obj = limitChoices({
    obj: subset(s, ss),
    limitChoicesLength,
    removeLast
  })

  const canProceed = ref(true);

  return {
    ...obj,
    canProceed
  }
}

export const required = (s = [], ss = [], { limitChoicesLength, removeLast }) => {

  const obj = limitChoices({
    obj: subset(s, ss),
    limitChoicesLength,
    removeLast
  })

  const canProceed = computed(() => {
    return obj.selected.value.length > 0;
  })

  return {
    ...obj,
    canProceed,
  }
}

export const requiredCorrect = (s = [], ss = [], { limitChoicesLength, removeLast }) => {

  const obj = limitChoices({
    obj: subset(s, ss),
    limitChoicesLength,
    removeLast
  })

  const canProceed = obj.isFullyCorrect;

  return {
    ...obj,
    canProceed
  }
}