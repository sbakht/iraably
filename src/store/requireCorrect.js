
import { computed, ref } from 'vue';
import { defineStore } from 'pinia'
import { subset } from './subset'


export const o = (s = [], ss = []) => {

  const obj = subset(s, ss)

  const canProceed = obj.isFullyCorrect;

  return {
    ...obj,
    canProceed
  }
}