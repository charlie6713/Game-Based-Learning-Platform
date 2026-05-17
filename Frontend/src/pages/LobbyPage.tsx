import { useCallback, useEffect, useState } from "react"
import { useLocation, useNavigate, useParams} from "react-router-dom"
import type { SessionStatus } from "../types/session"

export default function LobbyPage() {
  const { pin } = useParams()

  const location = useLocation()
  const navigate = useNavigate()

  const studentName = location.state?.studentName ?? ""
  const [status, setStatus] = useState<SessionStatus>("waiting")

  const API_BASE_URL = "http://localhost:8000"

  const getSessionStatus = useCallback(async () =>{
    if (!pin) return

    const response = await fetch(`${API_BASE_URL}/sessions/${pin}/status`)

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

    if (data.status === "finished"){
      navigate(`/session/${pin}/leaderboard`,{
        state: {
          role: "student",
          studentName: studentName,
        }
      })
    }
  }, [navigate, pin, studentName])

  useEffect(() => {
    if (!pin) return

    getSessionStatus()

    const intervalId = window.setInterval(() => {
      getSessionStatus()
    }, 1000);

    return () =>{
      window.clearInterval(intervalId)
    }
  },[pin, getSessionStatus]) // this effect is serverd for pin, so it depends on pin
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
              {status === "started"
                ? "Game started"
                : status === "finished"
                  ? "Game finished"
                  : "Waiting for tutor to start..."}
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
