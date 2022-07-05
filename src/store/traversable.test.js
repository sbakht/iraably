import { expect, test } from "vitest";
import { useTraversable } from "./useTraversable";


test("initalizes at start of traversable", () => {
  const t = useTraversable([{ id: 1 }]);
  expect(t.isAtStart.value).toBe(true);
  expect(t.isFinished.value).toBe(false);
});

test("can go forward and back", () => {
  const arr = [{ id: 1 }, { id: 3 }, { id: 7 }];
  const t = useTraversable(arr);

  expect(t.isAtStart.value).toBe(true);

  t.next();
  expect(t.currentId.value).toBe(1);
  expect(t.currentItem.value).toBe(arr[1]);

  expect(t.isAtStart.value).toBe(false);
  expect(t.isFinished.value).toBe(false);

  t.next();
  expect(t.currentId.value).toBe(2);
  expect(t.currentItem.value).toBe(arr[2]);

  t.next();
  expect(t.currentId.value).toBe(-1);
  expect(t.currentItem.value).toBe(null);
  expect(t.isFinished.value).toBe(true);

  t.previous();
  expect(t.currentId.value).toBe(2);
  expect(t.currentItem.value).toBe(arr[2]);
  expect(t.isFinished.value).toBe(false);

  t.previous();
  expect(t.currentId.value).toBe(1);
  expect(t.currentItem.value).toBe(arr[1]);

  t.previous();
  expect(t.currentId.value).toBe(0);
  expect(t.currentItem.value).toBe(arr[0]);

  expect(t.isAtStart.value).toBe(true);
  expect(t.isFinished.value).toBe(false);
});

test("can not go back when at start", () => {
  const arr = [{ id: 1 }, { id: 3 }, { id: 7 }];
  const t = useTraversable(arr);
  t.previous();
  expect(t.currentId.value).toBe(0);
  expect(t.currentItem.value).toBe(arr[0]);
});

test("can not go forward when at end", () => {
  const arr = [{ id: 1 }, { id: 3 }, { id: 7 }];
  const t = useTraversable(arr);
  t.next();
  t.next();
  t.next();
  expect(t.currentId.value).toBe(-1);
  expect(t.currentItem.value).toBe(null);
  expect(t.isFinished.value).toBe(true);
});

test("validation rules", () => {
  expect(() => {
    const t = useTraversable();
  }).toThrow();

  expect(() => {
    const t = useTraversable(1);
  }).toThrow();

  expect(() => {
    const t = useTraversable([]);
  }).toThrow();
});
