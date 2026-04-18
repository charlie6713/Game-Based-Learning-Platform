import { useState } from "react"

export default function StudentJoinPage() {
  const [name, setName] = useState("")
  const [pin, setPin] = useState("")

  const handleJoin = () => {
    console.log("join clicked")
    console.log("name:", name)
    console.log("pin:", pin)
  }

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center px-4">
      <div className="w-full max-w-md rounded-2xl bg-white p-6 shadow">
        <h1 className="text-2xl font-bold text-slate-900">Join Game</h1>
        <p className="mt-2 text-sm text-slate-500">
          Enter your name and session PIN
        </p>

        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Name
            </label>
            <input
              type="text"
              placeholder="Type your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
            />
          </div>

          <div>
            <label className="mb-1 block text-sm font-medium text-slate-700">
              Session PIN
            </label>
            <input
              type="text"
              placeholder="Enter PIN"
              value={pin}
              onChange={(e) => setPin(e.target.value)}
              className="w-full rounded-xl border border-slate-300 px-4 py-3 outline-none"
            />
          </div>

          <button
            onClick={handleJoin}
            className="w-full rounded-xl bg-slate-900 px-4 py-3 text-white"
          >
            Join Session
          </button>
        </div>
      </div>
    </div>
  )
}