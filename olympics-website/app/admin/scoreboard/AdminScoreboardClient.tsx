// Admin Scoreboard Controls, AdminScoreboardClient.tsx
"use client";
// import games from "@/data/game_list.json"
import {  useEffect, useState } from "react";

interface TeamInfo { id: number; name: string; }
interface GameInfo {id: string; label: string; teams: TeamInfo[]; }
  interface Penalty {
        teamId: number;
        reason: string;
        points: number;
    } 


export default function AdminScoreboardClient({ games }: { games: GameInfo[] }) {
  
    const [selectedGameId, setSelectedGameId] = useState("");
    
    const [penalties, setPenalties] = useState<Penalty[]>([]);

    const activeGame = games.find((g) => g.id === selectedGameId);

    const [saved, setSaved] = useState(false);

    const [scores, setScores] = useState<Record<number, number>>({});

      const handleSave = async () => {
        if (!activeGame || !activeGame.id) return;

        const gameIdInt = parseInt(activeGame.id);
        if (isNaN(gameIdInt)) {
          console.error("Invalid Game ID");
        return;
        }

        const payload = activeGame.teams.map((team) => {
          const baseScore = scores[team.id] ?? 0;
          const penaltyScore = penaltyTotals[team.id] ?? 0;
    
          return {
            teamId: team.id,
            eventGamesId: gameIdInt,
            scoreValue: baseScore - penaltyScore, // Net score calculated before sending
          };
        });

        const res = await fetch("/api/admin/scoreboard", {
            method: "POST", 
            headers: {"Content-Type": "application/json"},
            body: JSON.stringify(payload),
        });

        if (res.ok) {
            setSaved(true);
            setPenalties([]);
            setTimeout(() => setSaved(false) ,2000); 
        } else {
            console.error("Failed to save, status:", res.status);
        }
    };

    const addPenalty = () => {
        if (!activeGame || activeGame.teams.length === 0) return;
        setPenalties([...penalties, { teamId: activeGame.teams[0].id, reason: "", points: 0 }]);
    };

    const updatePenalty = (index: number, field: keyof Penalty, value: string | number) => {
        const newPenalties = [...penalties];
        newPenalties[index][field] = value as never;
        setPenalties(newPenalties);
    }

    const removePenalty = (index: number) => {
        setPenalties(penalties.filter((_, i) => i !== index));
    };

    

    useEffect(() => {
        if (!activeGame) return;
        const fetchScores = async () => {
            const res = await fetch(`/api/admin/scoreboard?eventGamesId=${activeGame.id}`);
            const data = await res.json();
            const mapped: Record<number, number> = {};
            data.forEach((s: {teamId: number; score:number }) =>{
                mapped[s.teamId] = s.score;
            });
            setScores(mapped);
        };
        fetchScores();
    }, [selectedGameId, activeGame]);

    const penaltyTotals = penalties.reduce<Record<number, number>>((acc,p) => {
        acc[p.teamId] = (acc[p.teamId] ?? 0) + (p.points || 0);
        return acc;
    }, {});

    const previewScores = activeGame 
        ? [...activeGame.teams].map((team) => ({
            team, 
            total: (scores[team.id] ?? 0) - (penaltyTotals[team.id] ?? 0),
        })).sort((a,b) => b.total - a.total) : [];

return (
  <div className="bg-gray-900 relative isolate overflow-hidden min-h-screen p-4">
    

    <div
      aria-hidden="true"
      className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
    >
      <div
        style={{
          clipPath:
            'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
        }}
        className="relative left-1/2 aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-30 bg-gradient-to-bl from-[#68ACE5] to-[#002D72] opacity-50 sm:left-1/2 sm:w-[72rem]"
      />
    </div>

    <div className="flex flex-col gap-4 w-full max-w-md p-8 bg-gray-800 rounded-lg">
      <h1 className="text-4xl font-bold text-white">Scoreboard</h1>
        <label htmlFor="game-select" className="text-gray-200">Select a game:</label>
        <select
          id="game-select"
          value={selectedGameId}
          onChange={(e) => setSelectedGameId(e.target.value)}
          className="p-2 border border-gray-500 rounded-md bg-gray-600 text-white">
          <option value="">Choose a game</option>
          {games.map((option) => (
            <option key={option.id} value={option.id}>
              {option.label}
            </option>
          ))}
        </select>
    </div>

    {activeGame && (
      <div className="mt-4 p-4 bg-gray-800 rounded">
        <h3 className="font-bold text-white">{activeGame.label} Teams</h3>
        <ul className="space-y-3">
          {activeGame.teams.map((team) => (
            <li key={team.id} className="flex items-center justify-between gap-4">
              <label className="font-medium text-gray-200 min-w-[100px]">
                {team.name}
              </label>
              <input
                type="number"
                value={scores[team.id] ?? ""}
                onChange={(e) => setScores({ ...scores, [team.id]: parseInt(e.target.value) || 0})}
                className="w-24 p-2 border border-gray-500 rounded-md bg-gray-600 text-white focus:border-blue-400 outline-none text-center"/>
            </li>
          ))}
        </ul>

        <div className="mt-6 justify-between items-center mb-4">
          <h3 className="font-bold text-red-400">Penalties</h3>
          <button
            onClick={addPenalty}
            type="button"
            className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
              + Add Penalty
          </button>
        </div>

        {penalties.map((penalty, idx) => (
          <div key={idx} className="flex flex-col gap-2 p-3 mb-3 bg-gray-700 rounded border border-red-400">
            <div className="flex justify-between items-center">
              <span className="text-sm font-semibold text-red-400">Penalty #{idx + 1}</span>
              <button
                onClick={() => removePenalty(idx)}
                className="text-gray-400 hover:text-red-400">
                ✕
              </button>
            </div>

            <div className="grid grid-cols-2 gap-2">
              <select
                value={penalty.teamId}
                onChange={(e) => updatePenalty(idx, "teamId", parseInt(e.target.value) || 0)}
                className="p-2 text-sm border border-gray-500 rounded bg-gray-600 text-white">
                {activeGame.teams.map((team) => (
                  <option key={team.id} value={team.id}>{team.name}</option>
                ))}
              </select>

              <input
                type="number"
                placeholder="points"
                value={penalty.points === 0 ? "" : penalty.points}
                onChange={(e) => updatePenalty(idx, "points", parseInt(e.target.value) || 0)}
                className="p-2 text-sm border border-gray-500 rounded bg-gray-600 text-white"/>
            </div>

            <input
              type="text"
              placeholder="Reason?"
              value={penalty.reason}
              onChange={(e) => updatePenalty(idx, "reason", e.target.value)}
              className="p-2 text-sm border border-gray-500 rounded bg-gray-600 text-white w-full"/>
          </div>
        ))}

        <button
          onClick={handleSave}
          className={`mt-6 w-full py-2 rounded-md transition text-white ${
            saved ? "bg-green-500" : "bg-blue-600 hover:bg-blue-700"
          }`}>
          {saved ? "Saved!" : "Save"}
        </button>

        <div className="mt-8">
          <h3 className="font-bold text-white">Live Preview</h3>
          {previewScores.map(({ team, total }, rank) => (
            <div key={team.id} className="flex justify-between text-gray-200">
              <span>{rank + 1}. {team.name}</span>
              <span>{total}</span>
            </div>
          ))}
        </div>

      </div>
    )}
  </div>
);
}