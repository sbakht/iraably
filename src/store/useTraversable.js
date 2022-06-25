import { computed, ref, readonly } from "vue";

function getById(arr, id) {
  return arr[id];
}

export const useTraversable = (arr) => {
  const currentId = ref(0);

  const byId = (id) => {
    return getById(arr, id);
  };

  const currentItem = computed(() => {
    return byId(currentId.value);
  });

  const isAtStart = ref(true);
  const isFinished = ref(false);

  const finish = () => { isFinished.value = true }

  const next = () => {
    if (currentId.value >= arr.length - 1) {
      finish();
    } else {
      currentId.value++;
      isAtStart.value = false;
    }
  };

  const previous = () => {
    if (currentId.value > 0) {
      currentId.value--;
    }
  };

  const reset = () => {
    currentId.value = 0;
    isFinished.value = false;
    isAtStart.value = true;
  };

  return {
    currentId: readonly(currentId),
    currentItem,
    next,
    previous,
    reset,
    isFinished: readonly(isFinished),
    isAtStart: readonly(isAtStart),
  };
};
