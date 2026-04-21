import { useEffect, useState } from "react"
import { useLocation } from "react-router-dom"

type Role = "tutor" | "student"

type Question = {
  id: number
  text: string
  options: string[]
  correctAnswer: string
}

const questions: Question[] = [
  {
    id: 1,
    text: "What is 2 + 2?",
    options: ["3", "4", "5", "6"],
    correctAnswer: "4",
  },
  {
    id: 2,
    text: "Which language is used with React?",
    options: ["Python", "Java", "JavaScript", "C"],
    correctAnswer: "JavaScript",
  },
]

function QuestionPage() {
  const location = useLocation()
  const role: Role = location.state?.role === "tutor" ? "tutor" : "student"

  const [currentIndex, setCurrentIndex] = useState(0)
  const [timeLeft, setTimeLeft] = useState(15)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [submitted, setSubmitted] = useState(false)

  const currentQuestion = questions[currentIndex]

  useEffect(() => {
    if (currentIndex >= questions.length) return
    if (timeLeft === 0) {
      goToNextQuestion()
      return
    }

    const timer = setTimeout(() => {
      setTimeLeft(timeLeft - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeLeft, currentIndex])

  useEffect(() => {
    setSelectedAnswer("")
    setSubmitted(false)
    setTimeLeft(15)
  }, [currentIndex])

  const handleOptionClick = (option: string) => {
    if (role === "student" && !submitted) {
      setSelectedAnswer(option)
    }
  }

  const handleSubmit = () => {
    if (!selectedAnswer) return
    setSubmitted(true)
  }

  const goToNextQuestion = () => {
    if (currentIndex < questions.length - 1) {
      setCurrentIndex(currentIndex + 1)
    }
  }

  if (!currentQuestion) {
    return (
      <div>
        <h1>Game Finished</h1>
        <p>No more questions.</p>
      </div>
    )
  }

  return (
    <div>
      <h1>Question Page</h1>
      <p>Role: {role}</p>
      <p>Question {currentIndex + 1} / {questions.length}</p>
      <p>Time left: {timeLeft}s</p>

      <h2>{currentQuestion.text}</h2>

      <div>
        {currentQuestion.options.map((option) => (
          <button
            key={option}
            onClick={() => handleOptionClick(option)}
            disabled={role === "student" && submitted}
          >
            {option}
          </button>
        ))}
      </div>

      {role === "student" && (
        <div>
          <p>Selected answer: {selectedAnswer || "None"}</p>
          <button onClick={handleSubmit} disabled={!selectedAnswer || submitted}>
            Submit Answer
          </button>
        </div>
      )}

      {role === "tutor" && (
        <div>
          <p>Correct answer: {currentQuestion.correctAnswer}</p>
          <button onClick={goToNextQuestion}>Next Question</button>
        </div>
      )}
    </div>
  )
}

export default QuestionPage