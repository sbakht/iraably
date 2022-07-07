import { computed, ref, unref, readonly } from "vue";

function getById(arr, id) {
  return unref(arr)[id];
}

const endID = -1;

export const useTraversable = (arr, { initialId = 0 } = {}) => {
  if (!arr || typeof arr !== "object" || arr.length < 1) {
    throw new Error("must have defined array");
  }

  if (initialId < 0 || initialId >= unref(arr).length) {
    throw new Error(`initialId value ${initialId} is out of bounds`)
  }

  const currentId = ref(initialId);

  const byId = (id) => {
    if (id === endID) {
      return null;
    }
    return getById(arr, id);
  };

  const currentItem = computed(() => {
    return byId(currentId.value);
  });

  const isAtStart = ref(initialId === 0);
  const isFinished = ref(initialId === endID);

  const finish = () => {
    currentId.value = endID;
    isAtStart.value = false;
    isFinished.value = true;
  };

  const next = () => {
    if (currentId.value >= unref(arr).length - 1) {
      finish();
    } else {
      currentId.value++;
      isAtStart.value = false;
    }
  };

  const previous = () => {
    if (currentId.value === endID) {
      currentId.value = unref(arr).length;
    }

    if (currentId.value > 0) {
      currentId.value--;
    }

    if (currentId.value === 0) {
      isAtStart.value = true;
    }

    isFinished.value = false
  };

  const reset = () => {
    currentId.value = 0;
    isFinished.value = false;
    isAtStart.value = true;
  };

  return {
    currentIndex: readonly(currentId),
    currentId: readonly(currentId),
    currentItem,
    next,
    previous,
    reset,
    isFinished: readonly(isFinished),
    isAtStart: readonly(isAtStart),
  };
};
