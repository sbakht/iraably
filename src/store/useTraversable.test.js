import { expect, test } from "vitest";
import { useTraversable } from "./useTraversable";


const arr = [{ id: 1 }, { id: 3 }, { id: 7 }];

expect.extend({
  toBeAtIndex(got, expected) {
    const pass = got.currentId.value === expected && got.currentItem.value === arr[expected]

    return {
      pass,
      message: () => {
        if (got.isFinished.value) {
          return `Traversable should be at start`;
        }
        return `Traversable should not be at start`;
      },
    };
  },
  toBeAtStart(got) {
    const pass = got.isAtStart.value === true && got.isFinished.value === false;

    return {
      pass,
      message: () => {
        if (got.isFinished.value) {
          return `Traversable should be at start`;
        }
        return `Traversable should not be at start`;
      },
    };
  },
  toBeFinished(got) {
    const pass = got.isFinished.value === true && got.isAtStart.value === false;

    return {
      pass,
      message: () => {
        if (got.isFinished.value) {
          return `Traversable should be finished`;
        }
        return `Traversable should not be finished`;
      },
    };
  },
});

test("initalizes at start of traversable", () => {
  const t = useTraversable([{ id: 1 }]);
  expect(t).toBeAtStart();
});

test("can go forward and back", () => {
  const t = useTraversable(arr);

  t.next();
  expect(t).toBeAtIndex(1);

  t.next();
  expect(t).toBeAtIndex(2);

  t.next();
  expect(t.currentId.value).toBe(-1);
  expect(t.currentItem.value).toBe(null);

  t.previous();
  expect(t).toBeAtIndex(2);

  t.previous();
  expect(t).toBeAtIndex(1);

  t.previous();
  expect(t).toBeAtIndex(0);
});

test("can go forward and back and get start/finish state", () => {
  const t = useTraversable(arr);

  expect(t).toBeAtStart();

  t.next();

  expect(t).not.toBeAtStart();
  expect(t).not.toBeFinished();

  t.next();
  t.next();

  expect(t).toBeFinished();

  t.previous();
  expect(t).not.toBeFinished();
  expect(t).not.toBeAtStart();

  t.previous();
  t.previous();
  expect(t).toBeAtStart();
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
  expect(t).toBeFinished();
});

test("reset to start", () => {
  const t = useTraversable(arr);
  t.next();
  t.next();
  t.next();
  t.reset();

  expect(t).toBeAtIndex(0);
  expect(t).toBeAtStart();
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
