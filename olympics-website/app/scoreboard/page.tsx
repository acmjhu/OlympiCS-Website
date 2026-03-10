"use client";

import Team from "@/components/scoreboard/Team";
import React, { useState, useEffect } from "react";
import EmptyState from "@/components/scoreboard/EmptyState";
import TeamRow from "@/components/scoreboard/TeamRow";
import ScoreGrid from "@/components/scoreboard/ScoreGrid";
import CoolBackgroundGlow from "@/components/scoreboard/CoolBackgroundGlow";

export default function ScoreboardPage() {
  const [view, setView] = useState<"leaderboard" | "grid">("leaderboard");
  const [teams, setTeams] = useState<Team[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch("/api/scoreboard")
      .then((res) => res.json())
      .then((data) => {
        const mapped: Team[] = data.scoreboard.map(
          (t: {
            id: number;
            name: string;
            totalScore: number;
            scores: { game: string; score: number }[];
          }) => ({
            id: t.id,
            name: t.name,
            score: t.totalScore,
            scores: Object.fromEntries(t.scores.map((s) => [s.game, s.score])),
          })
        );
        setTeams(mapped);
      })
      .catch(() => setError("Failed to load scoreboard."))
      .finally(() => setLoading(false));
  }, []);

  const sortedTeams = [...teams].sort((a, b) => b.score - a.score);
  const teamsWithRank = sortedTeams.map((team, _i, array) => ({
    ...team,
    rank: array.findIndex((t) => t.score === team.score) + 1,
  }));

  const hasTeams = teams.length > 0;
  const hasScores = teams.some((t) => t.score > 0);

  return (
    <main className="relative min-h-screen text-white px-4 py-12 bg-[#050d1a]">
      {/*Michelle background*/}
      <CoolBackgroundGlow />

      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-5xl font-black tracking-tight">OlympiCS</h1>
        <h1 className="text-4xl font-black tracking-tight py-4">5/5/26</h1>
        <h1 className="text-4xl font-black tracking-tight">Live Leaderboard</h1>
      </header>

      {/* Toggle button */}
      <button
        className="flex mx-auto border px-4 py-1 rounded-lg mt-3 mb-5 hover:bg-white/10 transition-colors"
        onClick={() => setView(view === "leaderboard" ? "grid" : "leaderboard")}
      >
        {view === "leaderboard" ? "📊 View Grid" : "🏆 View Leaderboard"}
      </button>

      {/* Loading / error states */}
      {loading && (
        <p className="text-center text-white/50">Loading scoreboard...</p>
      )}
      {error && <p className="text-center text-red-400">{error}</p>}

      {/* Leaderboard view */}
      {!loading && !error && view === "leaderboard" && (
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
      {!loading && !error && view === "grid" && (
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
