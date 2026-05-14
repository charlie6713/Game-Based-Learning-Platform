import { useState, useEffect } from "react"
import type { StudentSummary, SessionStudentsResponse } from "../types/session"
import { useNavigate, useParams } from "react-router-dom"

const API_BASE_URL = "http://localhost:8000"

export default function TutorSessionPage() {
    const navigate = useNavigate()
    const { pin } = useParams()

    const [students, setStudents] = useState<StudentSummary[]>([])

    useEffect(()=>{
        if(!pin) return
        getStudents()
        const intervalId = setInterval(() => {
        getStudents()
    }, 1000)  //every 1 second polling the student list

    return () => {
        clearInterval(intervalId)
    }
    },[pin])

    const getStudents = async () => {
        const response = await fetch(`${API_BASE_URL}/sessions/${pin}/students`)

        if (!response.ok) {
            alert("Session not found")
            return
        }

        const data: SessionStudentsResponse = await response.json()

        setStudents(data.students)
    }

    const handleStartGame = async () => {
        const response = await fetch(`${API_BASE_URL}/sessions/${pin}/start`,{
            method: "POST",
        })
        if (!response.ok){
            alert("Failed to start session")
            return
        }

        navigate(`/session/${pin}/question`,{
            state:{
                role: "tutor",
            }
        })
    }

    return (
        <div className="min-h-screen bg-gray-100 px-6 py-10">
            <div className="mx-auto max-w-xl rounded-xl bg-white p-6 shadow-md">
                <h1 className="mb-4 text-3xl font-bold text-gray-800">
                    Tutor Session Page
                </h1>
                <p className="mb-6 rounded-lg bg-blue-50 px-4 py-3 text-blue-700">
                    Session Pin:{" "}
                    <span className="font-bold tracking-wider">
                        {pin}
                    </span>
                </p>
                <p className="mb-6 text-gray-600">
                    Student joined:{" "}
                    <span className="font-semibold text-gray-900">
                        {students.length}
                    </span>
                </p>

                <h2 className="mb-3 text-xl font-semibold text-gray-800">
                    Student List
                </h2>

                {students.length === 0 ? (
                    <p className="rounded-md bg-gray-50 p-3 text-sm text-gray-500">
                        no student joined yet
                    </p>
                ) : (
                    <ul className="mb-6 space-y-2">
                        {students.map((student) => (
                            <li
                                key={student.student_name}
                                className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-700"
                            >
                                {student.student_name}
                            </li>
                        ))}
                    </ul>
                )}

                <button
                    onClick={handleStartGame}
                    className="rounded-lg bg-blue-600 px-4 py-2 font-medium text-white transition hover:bg-blue-700"
                >
                    Start game
                </button>
            </div>
        </div>
    )
}