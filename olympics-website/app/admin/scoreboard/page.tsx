// Admin Scoreboard Controls
"use client";
import games from "@/data/game_list.json"
import { useState } from "react";

export default function adminScoreboard() {
    const [selectedGameId, setSelectedGameId] = useState("");

    const activeGame = games.find((g) => g.id === selectedGameId)
    return (
    <div className = "space p-4">
    <div className="flex flex-col gap-4 w-full max-w-md p-8 bg-white rounded-lg">
        <h1 className="text-4xl font-bold">Register</h1>
            <label htmlFor="game-select">Select a game:</label>
            <select 
                id = "game-select"
                value = "selectedGameId"
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
                        placeholder="Score"
                        className= "w-24 p-2 border rounded-md focus:border-blue-500 outline-none text-center"/>
                </div>
            ))}    
        </ul>
        <button className = "mit-6 w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition">
            Save
        </button>
        </div>
    )}
    </div>
    );
}