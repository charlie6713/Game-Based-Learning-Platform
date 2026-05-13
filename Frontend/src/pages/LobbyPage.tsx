import { useEffect, useState } from "react"
import { useLocation, useNavigate, useParams} from "react-router-dom"

export default function LobbyPage() {
  const { pin } = useParams()

  const location = useLocation()
  const navigate = useNavigate()

  const studentName = location.state?.studentName ?? ""
  const [status, setStatus] = useState("waiting")

  const API_BASE_URL = "http://localhost:8000"

  const getSessionStatus = async () =>{
    const response = await fetch(`${API_BASE_URL}/${pin}/status`)

    if (!response.ok) {
            alert("Session not found")
            return
        }

    const data = await response.json()

    setStatus(data.status)

    if (data.status === "started"){
      navigate(`/session/${pin}/question`,{
        state: {
          role: "student",
          studentName: studentName,
        }
      })
    }
  }

  useEffect(() => {
    if (!pin) return

    getSessionStatus()

    const intervalId = setInterval(() => {
      getSessionStatus()
    }, 1000);

    return () =>{
      clearInterval(intervalId)
    }
  },[pin])
  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow">
        <h1 className="text-2xl font-bold text-slate-900">Lobby</h1>
        <p className="mt-2 text-sm text-slate-500">
          You have joined the session. Wait for the tutor to start the game.
        </p>

        <div className="mt-6 space-y-4">
          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Student</p>
            <p className="mt-1 font-medium text-slate-900">{studentName}</p>
          </div>

          <div className="rounded-xl bg-slate-50 p-4">
            <p className="text-sm text-slate-500">Session PIN</p>
            <p className="mt-1 font-medium text-slate-900">{pin}</p>
          </div>

          <div className="rounded-xl border border-blue-200 bg-blue-50 p-4">
            <p className="text-sm font-medium text-blue-700">Status</p>
            <p className="mt-1 text-sm text-blue-900">
              {status === "started" ? "Game started" : "Waiting for tutor to start..."}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}