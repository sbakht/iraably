import { expect, test } from "vitest";
import { useNavigation } from "../src/store/useNavigation";
import { isReadonly } from "vue";

const questions = [
  {
    id: 1,
    title: "What is the day?",
    correct: [3],
    answers: [
      { id: 1, title: "Monday" },
      { id: 2, title: "Friday" },
    ],
  },
  {
    id: 3,
    title: "What time is it?",
    correct: [4],
    answers: [
      { id: 1, title: "12:00" },
      { id: 2, title: "3:00" },
      { id: 3, title: "5:00" },
    ],
  },
  {
    id: 7,
    title: "What colors are cool?",
    correct: [1, 2, 4],
    answers: [
      { id: 1, title: "blue" },
      { id: 2, title: "green" },
      { id: 3, title: "red" },
      { id: 4, title: "orange" },
    ],
  },
];

test("exports traversable data/functions", () => {
  const n = useNavigation(questions);
  expect(n.currentId).toBeUndefined();
  expect(n.currentItem).toBeUndefined();
  expect(n.next).toBeTypeOf("function");
  expect(n.previous).toBeTypeOf("function");
  expect(n.reset).toBeTypeOf("function");
  expect(n.isFinished.value).toBeTypeOf("boolean");
  expect(n.isAtStart.value).toBeTypeOf("boolean");
});

test("current question", () => {
  const n = useNavigation(questions);
  expect(n.currentQuestion.value).toEqual(questions[0]);

  n.next();
  expect(n.currentQuestion.value).toEqual(questions[1]);

  n.reset();
  expect(n.currentQuestion.value).toEqual(questions[0]);
});

test("current answer", () => {
  const n = useNavigation(questions);
  expect(n.currentAnswer.value).toBe(undefined);

  n.saveAnswer(2);
  expect(n.currentAnswer.value).toEqual(2);

  n.next();
  expect(n.currentAnswer.value).toEqual(undefined);
  n.saveAnswer([1, 3]);
  expect(n.currentAnswer.value).toEqual([1, 3]);

  n.previous();
  expect(n.currentAnswer.value).toEqual(2);

  expect(n.answers.value).toEqual({
    1: 2,
    3: [1, 3],
  });

  expect(isReadonly(n.answers)).toBe(true);

  n.reset();
  expect(n.answers.value).toEqual({})
});
