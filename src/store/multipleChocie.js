
import { computed, ref } from 'vue';
import { subset } from './subset'

export const optional = (s = [], ss = []) => {

  const obj = subset(s, ss)

  const canProceed = ref(true);

  return {
    ...obj,
    canProceed
  }
}

export const required = (s = [], ss = []) => {

  const obj = subset(s, ss)

  const canProceed = computed(() => {
    return obj.selected.value.length > 0;
  })

  return {
    ...obj,
    canProceed,
  }
}

export const requiredCorrect = (s = [], ss = []) => {

  const obj = subset(s, ss)

  const canProceed = obj.isFullyCorrect;

  return {
    ...obj,
    canProceed
  }
}