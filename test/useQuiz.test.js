import { expect, test } from "vitest";
import { useQuiz } from "../src/store/useQuiz";

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
];

const scores = {
  1: { fullCredit: 2 },
  3: { fullCredit: 3 },
  7: { fullCredit: 5 },
}

test('walkthrough quiz', () => {
  const q = useQuiz(questions)
  expect(q.answers.value).toEqual({})

  expect(q.questionState.value.selected.value).toEqual([])
  q.toggleAnswer(2);
  expect(q.questionState.value.selected.value).toEqual([2])
  expect(q.answers.value).toEqual({})

  q.next();
  expect(q.answers.value).toEqual({ 1: [2] })

  q.toggleAnswer(1)
  q.toggleAnswer(2)
  q.previous();
  expect(q.answers.value).toEqual({ 1: [2], 3: [1, 2] })

  q.next();
  expect(q.currentQuestion.value).toEqual(questions[1])
  q.reset();

  expect(q.currentQuestion.value).toEqual(questions[0])
  expect(q.answers.value).toEqual({})
  expect(q.questionState.value.selected.value).toEqual([])
})

test('walkthrough quiz', () => {
  const q = useQuiz(questions, scores)
  expect(q.answers.value).toEqual({})

  expect(q.questionState.value.selected.value).toEqual([])
  q.toggleAnswer(2);
  expect(q.questionState.value.selected.value).toEqual([2])
  expect(q.answers.value).toEqual({})

  q.next();
  expect(q.answers.value).toEqual({ 1: [2] })

  q.toggleAnswer(1)
  q.toggleAnswer(3)
  q.next();
  expect(q.answers.value).toEqual({ 1: [2], 3: [1, 3] })

  q.toggleAnswer(1)
  q.toggleAnswer(2)
  q.toggleAnswer(4)
  q.next();
  expect(q.isFinished.value).toEqual(true)

  expect(q.score().value).toEqual(9)
})

test('able to proceed', () => {
  const q = useQuiz(questions, scores, 'optional')

  q.next();
  expect(q.currentQuestion.value).toEqual(questions[1])
})

test('must select to proceed', () => {
  const q = useQuiz(questions, scores, 'required')

  q.next();
  expect(q.currentQuestion.value).toEqual(questions[0])

  q.toggleAnswer(1);
  q.next();
  expect(q.currentQuestion.value).toEqual(questions[1])
})

test('must be correct to proceed', () => {
  const q = useQuiz(questions, scores, 'required-correct')

  q.next();
  expect(q.currentQuestion.value).toEqual(questions[0])

  q.toggleAnswer(1);
  q.next();
  expect(q.currentQuestion.value).toEqual(questions[0])

  q.toggleAnswer(1);
  q.toggleAnswer(2);
  q.next();
  expect(q.currentQuestion.value).toEqual(questions[1])
})