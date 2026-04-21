import { useState } from "react"
import type { Student } from "../types/session"
import { useNavigate } from "react-router-dom"

export default function TutorSessionPage() {
    const navigate = useNavigate()
    const [students] = useState<Student[]>([
        { id: "1", name: "charlie" },
        { id: "2", name: "polos" },
        { id: "3", name: "yumi" },
    ])

    const handleStartGame = () => {
        navigate("/session/:pin/question")
    }

    return (
        <div className="min-h-screen bg-gray-100 px-6 py-10">
            <div className="mx-auto max-w-xl rounded-xl bg-white p-6 shadow-md">
                <h1 className="mb-4 text-3xl font-bold text-gray-800">
                    Tutor Session Page
                </h1>

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
                                key={student.id}
                                className="rounded-lg border border-gray-200 bg-gray-50 px-4 py-2 text-gray-700"
                            >
                                {student.name}
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