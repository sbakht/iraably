
import { computed, ref } from 'vue';
import { subset } from './subset'


export const limitChoices = (obj, limitChoicesLength = Infinity, removeLast = false) => {

  return {
    ...obj,
    // toggle: i => {
    //   if (obj.selected.value.length < limitChoicesLength || obj.isSelected(i)) {
    //     obj.toggle(i);
    //   }
    // }
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