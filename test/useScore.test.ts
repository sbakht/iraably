import { expect, test } from "vitest";
import { useUserScore } from "../src/composables/useScore";

const questions = [
  {
    id: 1,
    title: "What is the day?",
    correct: [2],
    answers: [
      { id: 1, title: "Monday" },
      { id: 2, title: "Friday" },
    ],
  },
  {
    id: 3,
    title: "What time is it?",
    correct: [1, 2],
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
  {
    id: 8,
    title: "What is the day?",
    correct: [2],
    answers: [
      { id: 1, title: "Monday" },
      { id: 2, title: "Friday" },
    ],
  },
];

const scores = {
  1: { fullCredit: 2 },
  3: { fullCredit: 3 },
  7: { fullCredit: 5 },
}

const userAnswers = {
  1: 2,
  3: [1, 3],
  7: [1, 2, 4],
  8: 1,
}

test("adds up points for each question", () => {
  const s = useUserScore(questions, scores, userAnswers)
  expect(s.score.value).toBe(7)
});

test("partial points for partial correct", () => {
  const s = useUserScore(questions, scores, userAnswers, { partialCredit: true })
  expect(s.score.value).toBe(9)
});

test("partial points for partial correct", () => {
  const userAnswers = {
    1: 2,
    3: [1],
    7: [1, 2, 4],
    8: 1,
  }
  const s = useUserScore(questions, scores, userAnswers, { partialCredit: true })
  expect(s.score.value).toBe(9)
});

test("default to 5 points for full credit", () => {
  const userAnswers = {
    1: 2,
    3: [1, 3],
    7: [1, 2, 4],
    8: 2,
  }
  const s = useUserScore(questions, scores, userAnswers) 
  expect(s.score.value).toBe(12)
});