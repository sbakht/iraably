export const limitChoices = (fn, { limitChoicesLength = Infinity, removeLast = false }) => {

  return (...args) => {
    const obj = fn(...args)
    return {
      ...obj,
      toggle: i => {
        if (obj.selected.value.length < limitChoicesLength || obj.isSelected(i)) {
          obj.toggle(i);
        } else if (removeLast && obj.selected.value.length >= limitChoicesLength && !obj.isSelected(i)) {
          obj.toggle(obj.selected.value[0]);
          obj.toggle(i);
        }
      }
    }
  }
}