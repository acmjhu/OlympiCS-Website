"use client"

import { useState } from "react"

export default function AdminHistoryPage() {

  const [year, setYear] = useState("")
  const [eventName, setEventName] = useState("")
  const [date, setDate] = useState("")
  const [placement, setPlacement] = useState("")
  const [team, setTeam] = useState("")
  const [score, setScore] = useState("")
  const [winners, setWinners] = useState<string[]>([])

  function addWinner() {
    const entry = `${placement} place: ${team} — ${score}`
    setWinners([...winners, entry])
    setPlacement("")
    setTeam("")
    setScore("")
  }

  async function submitEvent() {

    await fetch("/api/admin/history", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        year,
        eventName,
        date,
        winners
      })
    })

    alert("Event is added.")
  }

  return (
    <div className="relative isolate overflow-hidden bg-gray-900 text-white min-h-screen">
      {/* Background blob */}
      <div className="absolute inset-x-0 -top-40 -z-10 blur-3xl">
        <div
          className="mx-auto aspect-[1155/678] w-[36rem] bg-gradient-to-bl from-[#002D72] to-[#68ACE5] opacity-50"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
          }}
        />
      </div>
      <div className="max-w-3xl mx-auto px-6 py-16">
        <h1 className="text-3xl font-bold mb-8">
          Add Past Events
        </h1>
        <input
          className="border p-2 w-full mb-3 bg-white text-black"
          placeholder="Event Name"
          value={eventName}
          onChange={(e)=>setEventName(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-3 bg-white text-black"
          placeholder="Year"
          value={year}
          onChange={(e)=>setYear(e.target.value)}
        />
        <input
          className="border p-2 w-full mb-6 bg-white text-black"
          placeholder="Date"
          value={date}
          onChange={(e)=>setDate(e.target.value)}
        />
        <h2 className="text-xl font-semibold mb-2">
          Add Winner
        </h2>
        <div className="grid grid-cols-3 gap-2 mb-3">
          <input
            className="border p-2 bg-white text-black"
            placeholder="Team"
            value={team}
            onChange={(e)=>setTeam(e.target.value)}
          />
          <input
            className="border p-2 bg-white text-black"
            placeholder="Placement"
            value={placement}
            onChange={(e)=>setPlacement(e.target.value)}
          />
          <input
            className="border p-2 bg-white text-black"
            placeholder="Score"
            value={score}
            onChange={(e)=>setScore(e.target.value)}
          />
        </div>

        <button
          onClick={addWinner}
          className="bg-gray-700 px-4 py-2 mb-6"
        >
          Add Winner
        </button>

        <ul className="mb-6">
          {winners.map((w,i)=>(
            <li key={i}>{w}</li>
          ))}
        </ul>

        <button
          onClick={submitEvent}
          className="bg-indigo-600 px-6 py-3 rounded"
        >
          Save Event
        </button>
      </div>
    </div>
  )
}