import type { QuestionBank } from "../types/question"

export const questionBank: QuestionBank = {
  title: "Week 1 Demo Quiz",
  questions: [
    {
      id: 1,
      text: "What is 2 + 2?",
      options: ["3", "4", "5"],
      answer: "4",
    },
    {
      id: 2,
      text: "Which one is a frontend library?",
      options: ["React", "PostgreSQL", "FastAPI"],
      answer: "React",
    },
    {
      id: 3,
      text: "What does PIN stand for in this project?",
      options: ["Personal ID Number", "Session join code", "Random username"],
      answer: "Session join code",
    },
  ],
}