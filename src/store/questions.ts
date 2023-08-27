export const questions = [
  {
    id: 1,
    title: "What is the day?",
    correct: [2],
    answers: [
      { id: 1, title: "Monday" },
      { id: 2, title: "Tuesday" },
      { id: 3, title: "Wednesday" },
      { id: 4, title: "Thursday" },
      { id: 5, title: "Friday" },
      { id: 6, title: "Saturday" },
      { id: 7, title: "Sunday" },
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

export const scores = {
  1: { fullCredit: 2 },
  3: { fullCredit: 3 },
  7: { fullCredit: 5 },
}