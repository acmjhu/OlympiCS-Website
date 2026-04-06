// Admin Scoreboard Controls
"use client";
import games from "@/data/game_list.json"
import { act, useEffect, useState } from "react";

  interface Penalty {
        team:string;
        reason: string;
        points:number;
    }

export default function AdminScoreboard() {
    const [selectedGameId, setSelectedGameId] = useState("");
    
    const [penalties, setPenalties] = useState<Penalty[]>([]);

    const activeGame = games.find((g) => g.id === selectedGameId);


    const addPenalty = () => {
        if (!activeGame || activeGame.teams.length === 0) return;
        setPenalties([...penalties, { team: activeGame.teams[0], reason: "", points: 0 }]);
    };

    const updatePenalty = (index: number, field: keyof Penalty, value: string | number) => {
        const newPenalties = [...penalties];
        newPenalties[index][field] = value as never;
        setPenalties(newPenalties);
    }

    const removePenalty = (index: number) => {
        setPenalties(penalties.filter((_, i) => i !== index));
    };

    const [scores, setScores] = useState<Record<string, number>>({});

    useEffect(() => {
        if (!activeGame) return;
        const fetchScores = async () => {
            const res = await fetch (`/api/admin/scoreboard?gameId=${activeGame.id}`);
            const data = await res.json();
            const mapped: Record<string, number> = {};
            data.forEach((s: {teamId: string; points:number }) =>{
                mapped[s.teamId] = s.points;
            });
            setScores(mapped);
        };
        fetchScores();
    }, [selectedGameId]);

    return (
    <div className = "space p-4">
    <div className="flex flex-col gap-4 w-full max-w-md p-8 bg-white rounded-lg">
        <h1 className="text-4xl font-bold">Scoreboard</h1>
            <label htmlFor="game-select">Select a game:</label>
            <select 
                id = "game-select"
                value = {selectedGameId}
                onChange={(e) => setSelectedGameId(e.target.value)}
                className="p-2 border rounded-md">
                <option value="">Choose a game</option>
                {games.map((option) => (
                    <option key={option.id} value={option.id}>
                        {option.label}
                    </option>
                ))}  
            </select>    
    </div>   
    {activeGame && (
        <div className = "mt-4 p-4 bg-gray-100 rounded">
        <h3 className = "font-bold"> {activeGame.label} Teams</h3>
        <ul className="space-y-3">
            {activeGame.teams.map((team, index) => (
                <div key={index} className = "flex items-center justify-between gap-4">
                    <label className = "font-medium text-gray-700 min-w-[100px]">
                        {team}
                    </label>
                    <input
                        type="number"
                        value={scores[team] ?? ""}
                        onChange={(e) => setScores({ ...scores, [team]: parseInt(e.target.value) || 0})}
                        className= "w-24 p-2 border rounded-md focus:border-blue-500 outline-none text-center"/>
                </div>
            ))}    
        </ul>
        <div className="mt-6 justify-between items-center mb-4">
            <h3 className="font-bold text-red-600">Penalties</h3>
            <button
                onClick={addPenalty}
                type="button"
                className="text-xs bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
                    + Add Penalty
            </button>
        </div>

        {penalties.map((penalty, idx) => (
            <div key={idx} className="flex flex-col gap-2 p-3 mb-3 bg-white rounded border border-red-200"> 
                <div className = "flex justify-between items-center"> 
                    <span className = "text-sm font-semibold text-red-700">Penalty #{idx+1}</span>
                    <button 
                        onClick={() => removePenalty(idx)}
                        className = "text-gray-400 hover:text-red-600">
                    ✕
                    </button>
                </div>

                <div className="grid grid-cols-2 gap-2"> 
                    <select 
                        value = {penalty.team}
                        onChange={(e) => updatePenalty(idx, "team", e.target.value)}
                        className = "p-2 text-sm border rounded"
                    >
                        {activeGame.teams.map((team) => (
                            <option key={team} value={team}>{team}</option>
                        ))}
                    </select>

                    <input
                        type="number"
                        placeholder="points"
                        value={penalty.points}
                        onChange={(e) => updatePenalty(idx, "points", parseInt(e.target.value) || 0)}
                        className="p-2 text-sm border rounded"
                        />
                </div>

                <input
                    type="text"
                    placeholder="Reason?"
                    value={penalty.reason}
                    onChange={(e) => updatePenalty(idx, "reason", e.target.value)}
                    className = "p-2 text-sm border rounded w-full"/>
            </div>

        ))}
        <button className = "mt-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
            Save
        </button>
        </div>
    )}
    </div>
    );
}