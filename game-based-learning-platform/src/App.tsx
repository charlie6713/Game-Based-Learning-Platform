import { Routes, Route } from "react-router-dom"
import StudentJoinPage from "./pages/StudentJoinPage"
import TutorHomePage from "./pages/TutorHomePage"
import TutorSessionPage from "./pages/TutorSessionPage"
import LobbyPage from "./pages/LobbyPage"
import QuestionPage from "./pages/QuestionPage"

export default function App() {
  return (
    <div className="min-h-screen bg-slate-100 text-slate-900">
      <Routes>
        <Route path="/" element={<StudentJoinPage />} />
        <Route path="/tutor" element={<TutorHomePage />} />
        <Route path="/tutor/session/:pin" element={<TutorSessionPage />} />
        <Route path="/lobby/:pin" element={<LobbyPage />} />
        <Route path="/session/:pin/question" element={<QuestionPage />} />
      </Routes>
    </div>
  )
}