
import { computed, ref } from 'vue';
import { subset } from './subset'
import { limitChoices } from './limitChoices';

const mkObj = (s, ss, options) => {
  return limitChoices({
    obj: subset(s, ss),
    ...options
  })
}

export const optional = (s = [], ss = [], options) => {

  const obj = mkObj(s, ss, options)

  const canProceed = ref(true);

  return {
    ...obj,
    canProceed
  }
}

export const required = (s = [], ss = [], options) => {

  const obj = mkObj(s, ss, options)

  const canProceed = computed(() => {
    return obj.selected.value.length > 0;
  })

  return {
    ...obj,
    canProceed,
  }
}

export const requiredCorrect = (s = [], ss = [], options) => {

  const obj = mkObj(s, ss, options)

  const canProceed = obj.isFullyCorrect;

  return {
    ...obj,
    canProceed
  }
}