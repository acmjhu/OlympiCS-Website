"use client";

//interface for team can change later
import Team from "@/components/scoreboard/Team";

import React, { useState } from "react";
import EmptyState from "@/components/scoreboard/EmptyState";
import TeamRow from "@/components/scoreboard/TeamRow";
import ScoreGrid from "@/components/scoreboard/ScoreGrid";
const heritageBlue = "#002D72";

const placeholderTeams: Team[] = [
  {
    id: 1,
    name: "Manuel and Friends",
    scores: { Charrades: 2, Dance: 2, Jokes: 3, ScavengerHunt: 3 },
    score: 10,
  },
  {
    id: 2,
    name: "Team Bob",
    scores: { Charrades: 2, Dance: 2, Jokes: 2, ScavengerHunt: 2 },
    score: 8,
  },
  {
    id: 3,
    name: "Team Alice",
    scores: { Charrades: 1, Dance: 1, Jokes: 1, ScavengerHunt: 2 },
    score: 5,
  },
  {
    id: 4,
    name: "Team Sally",
    scores: { Charrades: 1, Dance: 1, Jokes: 0, ScavengerHunt: 1 },
    score: 3,
  },
  {
    id: 5,
    name: "Team Jim",
    scores: { Charrades: 0, Dance: 0, Jokes: 0, ScavengerHunt: 0 },
    score: 0,
  },
];

export default function ScoreboardPage() {
  const [view, setView] = useState<"leaderboard" | "grid">("leaderboard");

  const sortedTeams = [...placeholderTeams].sort((a, b) => b.score - a.score);
  const teamsWithRank = sortedTeams.map((team, _i, array) => ({
    ...team,
    rank: array.findIndex((t) => t.score === team.score) + 1,
  }));

  const hasTeams = placeholderTeams.length > 0;
  const hasScores = placeholderTeams.some((t) => t.score > 0);

  return (
    <main className="min-h-screen text-white px-4 py-12 bg-gray-900">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-5xl font-black tracking-tight">OlympiCS</h1>
        <h2 className="text-4xl font-black tracking-tight py-4">5/5/26</h2>
        <h3 className="text-4xl font-black tracking-tight">Live Leaderboard</h3>
      </header>

      {/* Toggle button */}
      <button
        className="flex mx-auto border px-4 py-1 rounded-lg mt-3 mb-5 hover:bg-white/10 transition-colors"
        onClick={() => setView(view === "leaderboard" ? "grid" : "leaderboard")}
      >
        {view === "leaderboard" ? "📊 View Grid" : "🏆 View Leaderboard"}
      </button>

      {/* Leaderboard view */}
      {view === "leaderboard" && (
        <div>
          {!hasTeams ? (
            <EmptyState message="No teams have been accepted yet." />
          ) : !hasScores ? (
            <EmptyState message="Scoreboard will be available on event day." />
          ) : (
            <section className="text-2xl text-center max-w-2xl mx-auto flex flex-col gap-3">
              {teamsWithRank.map((team) => (
                <TeamRow key={team.id} team={team} rank={team.rank} />
              ))}
            </section>
          )}
        </div>
      )}

      {/* Grid view */}
      {view === "grid" && (
        <div>
          {!hasTeams ? (
            <EmptyState message="No teams have been accepted yet." />
          ) : !hasScores ? (
            <EmptyState message="Scoreboard will be available on event day." />
          ) : (
            <ScoreGrid teams={teamsWithRank} />
          )}
        </div>
      )}
    </main>
  );
}
