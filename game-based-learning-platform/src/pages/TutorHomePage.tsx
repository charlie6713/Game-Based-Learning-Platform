import { useState } from "react"
import { questionBank } from "../data/questionBank"
import type { Question } from "../types/question"

export default function TutorHomePage() {
  const [sessionTitle, setSessionTitle] = useState(questionBank.title)
  const [selectedQuestions, setSelectedQuestions] = useState<Question[]>([])

  const handleToggleQuestion = (question: Question) => {
    const alreadySelected = selectedQuestions.some((q) => q.id === question.id)

    if (alreadySelected) {
      const nextQuestions = selectedQuestions.filter((q) => q.id !== question.id)
      setSelectedQuestions(nextQuestions)
      return
    }

    setSelectedQuestions([...selectedQuestions, question])
  }

  const handleCreateSession = () => {
    console.log("create session clicked")
    console.log("sessionTitle:", sessionTitle)
    console.log("selectedQuestions:", selectedQuestions)
  }

  return (
    <div className="min-h-screen bg-slate-100 px-4 py-8">
      <div className="mx-auto max-w-5xl">
        <h1 className="text-3xl font-bold text-slate-900">Tutor Home</h1>
        <p className="mt-2 text-sm text-slate-500">
          Choose questions from the question bank and create a session.
        </p>

        <div className="mt-6 rounded-2xl bg-white p-6 shadow">
          <label className="mb-2 block text-sm font-medium text-slate-700">
            Session Title
          </label>
          <input
            type="text"
            value={sessionTitle}
            onChange={(e) => setSessionTitle(e.target.value)}
            className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
          />

          <div className="mt-4 rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Selected Questions</p>
            <p className="mt-1 font-medium text-slate-900">
              {selectedQuestions.length}
            </p>
          </div>

          <button
            onClick={handleCreateSession}
            className="mt-4 rounded-xl bg-slate-900 px-4 py-3 text-white"
          >
            Create Session
          </button>
        </div>

        <div className="mt-6 rounded-2xl bg-white p-6 shadow">
          <h2 className="text-xl font-semibold text-slate-900">Question Bank</h2>
          <p className="mt-1 text-sm text-slate-500">{questionBank.title}</p>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full border-collapse text-left">
              <thead>
                <tr className="border-b border-slate-200 text-sm text-slate-500">
                  <th className="px-3 py-3">Select</th>
                  <th className="px-3 py-3">ID</th>
                  <th className="px-3 py-3">Question</th>
                  <th className="px-3 py-3">Options</th>
                  <th className="px-3 py-3">Answer</th>
                </tr>
              </thead>

              <tbody>
                {questionBank.questions.map((question) => {
                  const isSelected = selectedQuestions.some(
                    (q) => q.id === question.id
                  )

                  return (
                    <tr key={question.id} className="border-b border-slate-100">
                      <td className="px-3 py-4">
                        <input
                          type="checkbox"
                          checked={isSelected}
                          onChange={() => handleToggleQuestion(question)}
                        />
                      </td>

                      <td className="px-3 py-4 text-sm text-slate-700">
                        {question.id}
                      </td>

                      <td className="px-3 py-4 font-medium text-slate-900">
                        {question.text}
                      </td>

                      <td className="px-3 py-4 text-sm text-slate-700">
                        {question.options.join(", ")}
                      </td>

                      <td className="px-3 py-4 text-sm text-slate-700">
                        {question.answer}
                      </td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  )
}