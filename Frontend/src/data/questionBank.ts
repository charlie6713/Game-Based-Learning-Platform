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
    {
      id: 4,
      text: "Which HTTP method is used to create a new session?",
      options: ["GET", "POST", "DELETE"],
      answer: "POST",
    },
    {
      id: 5,
      text: "Which part of the app is responsible for displaying the user interface?",
      options: ["Frontend", "Backend", "Database"],
      answer: "Frontend",
    },
    {
      id: 6,
      text: "Which backend framework is used in this project?",
      options: ["Django", "Express", "FastAPI"],
      answer: "FastAPI",
    },
    {
      id: 7,
      text: "What data type is used for answer options in the question schema?",
      options: ["number[]", "string[]", "boolean[]"],
      answer: "string[]",
    },
    {
      id: 8,
      text: "What should a tutor do before creating a session?",
      options: [
        "Select at least one question",
        "Enter a student name",
        "Submit an answer",
      ],
      answer: "Select at least one question",
    },
    {
      id: 9,
      text: "Which field is used to identify a question uniquely in the question bank?",
      options: ["title", "id", "pin"],
      answer: "id",
    },
    {
      id: 10,
      text: "How many questions will the question bank have after this update?",
      options: ["5", "8", "10"],
      answer: "10",
    },
  ],
}
