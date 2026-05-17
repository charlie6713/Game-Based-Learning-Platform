import { useCallback, useEffect, useState } from "react"
import type { Role } from "../types/session"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import type { CurrentQuestion } from "../types/question"


export default function Questionpage() {
  const location = useLocation()
  const navigate = useNavigate()

  const role: Role = location.state?.role === "tutor" ? "tutor" : "student"
  const studentName = location.state?.studentName ?? ""
  const { pin } = useParams()
  const [question, setQuestion] = useState<CurrentQuestion | null>(null)
  const [timeLeft, setTimeLeft] = useState(15)
  const [selectedAnswer, setSelectedAnswer] = useState("")
  const [submitted, setSubmitted] = useState(false)
  const API_BASE_URL = "http://localhost:8000"

  const [loading, setLoading] = useState(true)
  const [isFinished, setIsFinished] = useState(false)

  const getCurrentQuestion = useCallback(async (showLoading = false) => {
    if (!pin) return

    if (showLoading) {
      setLoading(true)
    }

    const endpoint =
      role === "tutor"
        ? `${API_BASE_URL}/sessions/${pin}/tutor/question`
        : `${API_BASE_URL}/sessions/${pin}/student/question`

    const response = await fetch(endpoint)

    if (response.status === 404) {
      setQuestion(null)
      setIsFinished(true)
      setLoading(false)
      return
    }

    if (!response.ok) {
      alert("Failed to load question")
      setLoading(false)
      return
    }

    const data = await response.json()

    setQuestion((prevQuestion) => {
      if (prevQuestion && prevQuestion.id !== data.id) {
        setSelectedAnswer("")
        setSubmitted(false)
        setTimeLeft(15)
      }

      return data
    })

    setIsFinished(false)
    setLoading(false)
  }, [pin, role])

  useEffect(() => {
    if(!pin) return

    getCurrentQuestion(true)
  }, [pin, getCurrentQuestion])

  useEffect(() => {
    if (role !== "student" || !pin || isFinished) return

    const intervalId = setInterval(() => {
      getCurrentQuestion()
    }, 1000)

    return () => {
      clearInterval(intervalId)
    }
  }, [pin, role, isFinished, getCurrentQuestion])

  useEffect(() => {
    if (!question) return

    if (submitted) return

    if (timeLeft <= 0) {
      return
    }

    const timer = setTimeout(() => {
      setTimeLeft((prev) => prev - 1)
    }, 1000)

    return () => clearTimeout(timer)
  }, [timeLeft, question, submitted])


  useEffect(() => {
  if (!isFinished || !pin) return

  navigate(`/session/${pin}/leaderboard`, {
    state: {
      role: role,
    },
  })
}, [isFinished, pin, role, navigate])


  const handleOptionClick = (option: string) => {
    if (role === "student" && !submitted) {
      setSelectedAnswer(option)
    }
  }

  const handleSubmit = async () => {
    if (!selectedAnswer || submitted || !question) {
      return
    }

    const response = await fetch(`${API_BASE_URL}/sessions/${pin}/submit`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        student_name: studentName,
        question_id: question.id,
        answer: selectedAnswer,
      }),
    })

    if (!response.ok) {
      alert("Failed to submit answer")
      return
    }

    const data = await response.json()
    console.log("submitted:", data)

    setSubmitted(true)
  }

  const handleNextQuestion = async () => {
    if (!pin) return

    const response = await fetch(`${API_BASE_URL}/sessions/${pin}/next`, {
      method: "POST",
    })

    if (response.status === 400) {
      setQuestion(null)
      setIsFinished(true)
      setLoading(false)
      return
    }

    if (!response.ok) {
      alert("Failed to move to next question")
      return
    }

    setSelectedAnswer("")
    setSubmitted(false)
    setTimeLeft(15)

    await getCurrentQuestion()
  }

  if (loading) {
    return (
      <div className="max-w-xl mx-auto mt-20 p-8 border rounded-xl shadow-md bg-white text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
          Loading question...
        </h1>

        <p className="text-gray-600 text-lg mb-6">
          Please wait while we fetch the current question.
        </p>
      </div>
    )
  }

  if (isFinished || !question) {
    return (
    <div className="max-w-xl mx-auto mt-20 p-8 border rounded-xl shadow-md bg-white text-center">
      <h1 className="text-3xl font-bold text-slate-900 mb-4">
        Redirecting to leaderboard...
      </h1>

      <p className="text-gray-600 text-lg mb-6">
        Please wait while we load the final results.
      </p>
    </div>
  )
  }

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 border rounded-xl shadow-md bg-white">
      <h1 className="text-3xl font-bold mb-4">Question page</h1>

      <p className="text-gray-600 mb-2">Role: {role}</p>
      <p className="text-gray-600 mb-2">
        Question ID: {question.id}
      </p>
      <p className="text-red-500 font-semibold mb-4">
        Time left: {timeLeft}
      </p>

      <h2 className="text-xl font-semibold mb-4">
        {question.text}
      </h2>

      <div className="flex flex-col gap-3 mb-6">
        {question.options.map((option) => (
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
              {question.answer}
            </span>
          </p>

          <button
            onClick={handleNextQuestion}
            className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600"
          >
            Next Question
          </button>
        </div>
      )}
    </div>
  )
}
