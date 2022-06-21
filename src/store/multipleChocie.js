
import { computed, ref } from 'vue';
import { subset } from './subset'
import { limitChoices } from './limitChoices';

export const optional = (s = [], ss = [], ...args) => {

  const obj = limitChoices(subset(s, ss), ...args);

  const canProceed = ref(true);

  return {
    ...obj,
    canProceed
  }
}

export const required = (s = [], ss = [], ...args) => {

  const obj = limitChoices(subset(s, ss), ...args);

  const canProceed = computed(() => {
    return obj.selected.value.length > 0;
  })

  return {
    ...obj,
    canProceed,
  }
}

export const requiredCorrect = (s = [], ss = [], ...args) => {

  const obj = limitChoices(subset(s, ss), ...args);

  const canProceed = obj.isFullyCorrect;

  return {
    ...obj,
    canProceed
  }
}