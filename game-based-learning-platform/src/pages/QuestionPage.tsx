import { useEffect, useState } from "react";
import type { Role } from "../types/session";
import { questionBank } from "../data/questionBank";
import { useLocation } from "react-router-dom";

export default function Questionpage() {
  const location = useLocation();
  const role: Role = location.state?.role === "tutor" ? "tutor" : "student";

  const [currentIndex, setCurrentIndex] = useState(0);
  const [timeLeft, setTimeLeft] = useState(15);
  const [selectedAnswer, setSelectedAnswer] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const currentQuestion = questionBank.questions[currentIndex];

  const goToNextQuestion = () => {
    setCurrentIndex((prev) => {
      if (prev < questionBank.questions.length - 1) {
        return prev + 1;
      }
      return questionBank.questions.length;
    });
  };

  useEffect(() => {
    if (!currentQuestion) return;

    if (submitted) return;

    if (timeLeft <= 0) {
      goToNextQuestion();
      return;
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [timeLeft, currentQuestion, submitted]);

  useEffect(() => {
    setSelectedAnswer("");
    setTimeLeft(15);
    setSubmitted(false);
  }, [currentIndex]);

  const handleOptionClick = (option: string) => {
    if (role === "student" && !submitted) {
      setSelectedAnswer(option);
    }
  };

  const handleSubmit = () => {
    if (!selectedAnswer || submitted) {
      return;
    }

    setSubmitted(true);

    setTimeout(() => {
      goToNextQuestion();
    }, 1000);
  };

  if (!currentQuestion) {
    return (
    <div className="max-w-xl mx-auto mt-20 p-8 border rounded-xl shadow-md bg-white text-center">
      <h1 className="text-3xl font-bold text-green-600 mb-4">
        Game Finished
      </h1>

      <p className="text-gray-600 text-lg mb-6">
        No more questions
      </p>

      <button
        onClick={() => window.location.reload()}
        className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
      >
        Restart
      </button>
    </div>
  );
  }

  return (
  <div className="max-w-2xl mx-auto mt-10 p-6 border rounded-xl shadow-md bg-white">
    <h1 className="text-3xl font-bold mb-4">Question page</h1>

    <p className="text-gray-600 mb-2">Role: {role}</p>
    <p className="text-gray-600 mb-2">
      Question {currentIndex + 1} / {questionBank.questions.length}
    </p>
    <p className="text-red-500 font-semibold mb-4">
      Time left: {timeLeft}
    </p>

    <h2 className="text-xl font-semibold mb-4">
      {currentQuestion.text}
    </h2>

    <div className="flex flex-col gap-3 mb-6">
      {currentQuestion.options.map((option) => (
        <button
          key={option}
          onClick={() => handleOptionClick(option)}
          disabled={role === "student" && submitted}
          className="border rounded-lg px-4 py-2 bg-gray-100 hover:bg-gray-200 disabled:bg-gray-300 disabled:cursor-not-allowed text-left"
        >
          {option}
        </button>
      ))}
    </div>

    {role === "student" && (
      <div className="border-t pt-4">
        <p className="mb-3">
          Selected answer:
          <span className="font-semibold ml-2">
            {selectedAnswer || "None"}
          </span>
        </p>

        <button
          onClick={handleSubmit}
          disabled={!selectedAnswer || submitted}
          className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          Submit Answer
        </button>
      </div>
    )}

    {role === "tutor" && (
      <div className="border-t pt-4">
        <p className="mb-3">
          Correct answer:
          <span className="font-semibold ml-2">
            {currentQuestion.answer}
          </span>
        </p>

        <button
          onClick={goToNextQuestion}
          className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
        >
          Next Question
        </button>
      </div>
    )}
  </div>
)
}