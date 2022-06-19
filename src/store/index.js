import {computed, ref} from 'vue';
import { defineStore } from 'pinia'

export const useStore = defineStore('storeId', () => {

  // arrow function recommended for full type inference
    const user = ref({
      // all these properties will have their type inferred automatically
      counter: 0,
      name: 'Eduardo',
      isAdmin: true,
    });

    function increment() {
      user.value.counter++;
    }

    const double = computed(() => {
      return user.value.counter * 2;
    })

    return {
      double,
      user,
      increment
    }
  }
)