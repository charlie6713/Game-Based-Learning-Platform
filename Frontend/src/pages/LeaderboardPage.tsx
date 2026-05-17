import { useCallback, useEffect, useState } from "react"
import { useLocation, useNavigate, useParams } from "react-router-dom"
import type { Role, StudentSummary, SessionLeaderboardResponse } from "../types/session"

export default function LeaderboardPage() {
  const { pin } = useParams()
  const location = useLocation()
  const navigate = useNavigate()

  const role: Role = location.state?.role === "tutor" ? "tutor" : "student"

  const [students, setStudents] = useState<StudentSummary[]>([])
  const [loading, setLoading] = useState(true)

  const API_BASE_URL = "http://localhost:8000"

  const getLeaderboard = useCallback(async () => {
    if (!pin) {
      setLoading(false)
      return
    }

    const response = await fetch(`${API_BASE_URL}/sessions/${pin}/leaderboard`)

    if (!response.ok) {
        alert("Failed to load leaderboard")
        setLoading(false)
        return
    }

    const data: SessionLeaderboardResponse = await response.json()
    setStudents(data.students)
    setLoading(false)
    }, [pin])

    useEffect(() => {
    getLeaderboard()
    }, [getLeaderboard])

    if (loading) {
    return (
        <div className="max-w-3xl mx-auto mt-20 p-8 rounded-xl bg-white shadow-md text-center">
        <h1 className="text-3xl font-bold text-slate-900 mb-4">
            Loading leaderboard...
        </h1>
        </div>
    )
    }

    return (
    <div className="max-w-3xl mx-auto mt-10 p-6 rounded-xl bg-white shadow-md">
        <h1 className="text-3xl font-bold mb-4">Leaderboard</h1>

        <p className="text-gray-600 mb-6">
        Session PIN: {pin}
        </p>

        {students.length === 0 ? (
        <p className="text-gray-500">No student results yet.</p>
        ) : (
        <div className="overflow-x-auto">
            <table className="w-full border-collapse text-left">
            <thead>
                <tr className="border-b border-slate-200 text-sm text-slate-500">
                <th className="px-3 py-3">Rank</th>
                <th className="px-3 py-3">Student</th>
                <th className="px-3 py-3">Score</th>
                <th className="px-3 py-3">Correct</th>
                <th className="px-3 py-3">Submitted</th>
                </tr>
            </thead>

            <tbody>
                {students.map((student, index) => (
                <tr key={student.student_name} className="border-b border-slate-100">
                    <td className="px-3 py-4">{index + 1}</td>
                    <td className="px-3 py-4 font-medium text-slate-900">
                    {student.student_name}
                    </td>
                    <td className="px-3 py-4">{student.score}</td>
                    <td className="px-3 py-4">{student.correct_count}</td>
                    <td className="px-3 py-4">{student.submitted_count}</td>
                </tr>
                ))}
            </tbody>
            </table>
        </div>
        )}
            {role === "tutor" && (
    <div className="mt-6">
        <button
        onClick={() => navigate("/tutor")}
        className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white hover:bg-blue-700"
        >
        Start New Game
        </button>
    </div>
    )}
        {role === "student" && (
    <div className="mt-6">
        <button
        onClick={() => navigate("/")}
        className="rounded-lg bg-slate-700 px-4 py-2 font-medium text-white hover:bg-slate-800"
        >
        Back to Join Page
        </button>
    </div>
    )}
    </div>
    
    )
    

}
