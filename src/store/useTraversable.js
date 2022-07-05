import { computed, ref, unref, readonly } from "vue";

function getById(arr, id) {
  return unref(arr)[id];
}

const endID = -1;

export const useTraversable = (arr) => {
  if (!arr || typeof arr !== "object" || arr.length < 1) {
    throw new Error("must have defined array");
  }

  const currentId = ref(0);

  const byId = (id) => {
    if (id === endID) {
      return null;
    }
    return getById(arr, id);
  };

  const currentItem = computed(() => {
    return byId(currentId.value);
  });

  const isAtStart = ref(true);
  const isFinished = ref(false);

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
    currentId: readonly(currentId),
    currentItem,
    next,
    previous,
    reset,
    isFinished: readonly(isFinished),
    isAtStart: readonly(isAtStart),
  };
};
