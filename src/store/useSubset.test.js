import { expect, test } from "vitest";
import { subset as useSubset } from "./subset";


const arr = [{ id: 1 }, { id: 3 }, { id: 7 }];


test("initial state", () => {
  const s = useSubset([1, 3, 5]);
  expect(s.selected.value).toEqual([]);
  expect(s.incorrectSelections.value).toEqual([]);
  expect(s.correctSelections.value).toEqual([]);
  expect(s.missingSelections.value).toEqual([1, 3, 5]);
  expect(s.isCorrectSoFar.value).toEqual(true);
  expect(s.isMissingAnswer.value).toEqual(true);
  expect(s.isFullyCorrect.value).toEqual(false);
});

test("initial state", () => {
  const s = useSubset([1, 3, 5], [3, 7]);
  expect(s.selected.value).toEqual([3, 7]);
  expect(s.incorrectSelections.value).toEqual([7]);
  expect(s.correctSelections.value).toEqual([3]);
  expect(s.missingSelections.value).toEqual([1, 5]);
  expect(s.isCorrectSoFar.value).toEqual(false);
  expect(s.isMissingAnswer.value).toEqual(true);
  expect(s.isFullyCorrect.value).toEqual(false);
});

test("initial state", () => {
  const s = useSubset([1, 3, 5], [3]);
  expect(s.selected.value).toEqual([3]);
  expect(s.incorrectSelections.value).toEqual([]);
  expect(s.correctSelections.value).toEqual([3]);
  expect(s.missingSelections.value).toEqual([1, 5]);
  expect(s.isCorrectSoFar.value).toEqual(true);
  expect(s.isMissingAnswer.value).toEqual(true);
  expect(s.isFullyCorrect.value).toEqual(false);
});

test("initial state", () => {
  const s = useSubset([1, 3, 5], [7]);
  expect(s.selected.value).toEqual([7]);
  expect(s.incorrectSelections.value).toEqual([7]);
  expect(s.correctSelections.value).toEqual([]);
  expect(s.missingSelections.value).toEqual([1, 3, 5]);
  expect(s.isCorrectSoFar.value).toEqual(false);
  expect(s.isMissingAnswer.value).toEqual(true);
  expect(s.isFullyCorrect.value).toEqual(false);
});

test("initial state", () => {
  const s = useSubset([1, 3, 5], [1, 3, 5]);
  expect(s.selected.value).toEqual([1, 3, 5]);
  expect(s.incorrectSelections.value).toEqual([]);
  expect(s.correctSelections.value).toEqual([1, 3, 5]);
  expect(s.missingSelections.value).toEqual([]);
  expect(s.isCorrectSoFar.value).toEqual(true);
  expect(s.isMissingAnswer.value).toEqual(false);
  expect(s.isFullyCorrect.value).toEqual(true);
});

test("setSelected", () => {
  const s = useSubset([1, 3, 5], []);
  s.setSelected([1, 3, 5])
  expect(s.selected.value).toEqual([1, 3, 5]);
  expect(s.incorrectSelections.value).toEqual([]);
  expect(s.correctSelections.value).toEqual([1, 3, 5]);
  expect(s.missingSelections.value).toEqual([]);
  expect(s.isCorrectSoFar.value).toEqual(true);
  expect(s.isMissingAnswer.value).toEqual(false);
  expect(s.isFullyCorrect.value).toEqual(true);
});

test("toggle", () => {
  const s = useSubset([1, 3, 5], []);
  s.toggle(1)
  s.toggle(3)
  s.toggle(7)
  s.toggle(5)
  s.toggle(7)

  expect(s.selected.value).toEqual([1, 3, 5]);
  expect(s.incorrectSelections.value).toEqual([]);
  expect(s.correctSelections.value).toEqual([1, 3, 5]);
  expect(s.missingSelections.value).toEqual([]);
  expect(s.isCorrectSoFar.value).toEqual(true);
  expect(s.isMissingAnswer.value).toEqual(false);
  expect(s.isFullyCorrect.value).toEqual(true);
});

test("toggle", () => {
  const s = useSubset([1, 3, 5], []);
  s.toggle(3)
  s.toggle(7)

  expect(s.isSelected(3)).toEqual(true)
  expect(s.isSelected(7)).toEqual(true)
  s.toggle(7)
  expect(s.isSelected(7)).toEqual(false)
});

test("initial state", () => {
  const s = useSubset([1, 3, 5], [1, 5, 3]);
  expect(s.selected.value).toEqual([1, 5, 3]);
  expect(s.incorrectSelections.value).toEqual([]);
  expect(s.correctSelections.value).toEqual([1, 5, 3]);
  expect(s.missingSelections.value).toEqual([]);
  expect(s.isCorrectSoFar.value).toEqual(true);
  expect(s.isMissingAnswer.value).toEqual(false);
  expect(s.isFullyCorrect.value).toEqual(true);
});