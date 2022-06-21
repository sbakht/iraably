import * as o from "./optional";
import * as o1 from "./optionalCorrect";
import * as o2 from "./requireCorrect";

export const subsetType = {
  optional: o.o,
  required: o1.o,
  "required-correct": o2.o,
};
