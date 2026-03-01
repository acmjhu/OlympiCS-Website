"use client";

import React, { useState } from "react";

const heritageBlue = "#002D72";

interface Team {
  id: number;
  name: string;
  scores: Record<string, number>;
  score: number;
}

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

function EmptyState({ message }: { message: string }) {
  return (
    <div className="text-center py-20 text-gray-500">
      <p className="text-xl font-medium">{message}</p>
    </div>
  );
}

function TeamRow({ team, rank }: { team: Team; rank: number | null }) {
  const medalText: Record<number, string> = {
    1: "text-yellow-400",
    2: "text-gray-300",
    3: "text-orange-400",
  };
  const medalBorder: Record<number, string> = {
    1: "border-yellow-400",
    2: "border-gray-300",
    3: "border-orange-400",
  };
  const medalGlow: Record<number, string> = {
    1: "shadow-[0_0_15px_rgba(250,204,21,0.6)]",
    2: "shadow-[0_0_10px_rgba(209,213,219,0.5)]",
    3: "shadow-[0_0_10px_rgba(251,146,60,0.4)]",
  };
  const medalEmoji: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };

  const textColor = rank ? medalText[rank] ?? "text-gray-400" : "text-gray-600";
  const borderColor = rank
    ? medalBorder[rank] ?? "border-gray-700"
    : "border-gray-800";
  const glowColor = rank ? medalGlow[rank] ?? "" : "";
  const emoji = rank ? medalEmoji[rank] ?? null : null;
  const isFirst = rank === 1;

  return (
    <div
      className={`flex items-center justify-between bg-gray-800 rounded-xl border
        ${borderColor} ${glowColor} ${isFirst ? "px-8 py-6" : "px-6 py-4"}`}
    >
      <div className="flex items-center gap-4">
        {emoji ? (
          <span className={isFirst ? "text-3xl" : "text-2xl"}>{emoji}</span>
        ) : (
          <span className="text-gray-500 font-bold text-lg w-8 text-center">
            #{rank}
          </span>
        )}
        <span
          className={`${textColor} ${
            isFirst ? "text-2xl font-black" : "text-base font-medium"
          }`}
        >
          {team.name}
        </span>
      </div>
      <span
        className={`${textColor} font-mono font-bold ${
          isFirst ? "text-2xl" : "text-base"
        }`}
      >
        {team.score} pts
      </span>
    </div>
  );
}

function ScoreGrid({ teams }: { teams: (Team & { rank: number })[] }) {
  const events = Array.from(
    new Set(teams.flatMap((t) => Object.keys(t.scores)))
  );

  const eventWinners: Record<string, number> = {};
  for (const event of events) {
    eventWinners[event] = Math.max(...teams.map((t) => t.scores[event] ?? 0));
  }

  const medalEmoji: Record<number, string> = { 1: "🥇", 2: "🥈", 3: "🥉" };
  const medalText: Record<number, string> = {
    1: "text-yellow-400",
    2: "text-gray-300",
    3: "text-orange-400",
  };

  return (
    <>
      {/* ── Mobile: one card per team ── */}
      <div className="flex flex-col gap-3 px-4 md:hidden">
        {teams.map((team) => {
          const nameColor = medalText[team.rank] ?? "text-gray-300";
          return (
            <div
              key={team.id}
              className="bg-gray-800 rounded-xl border border-gray-700 overflow-hidden"
            >
              {/* Card header */}
              <div className="flex items-center justify-between px-4 py-3 bg-gray-700">
                <div className="flex items-center gap-2">
                  <span className="text-lg">
                    {medalEmoji[team.rank] ?? (
                      <span className="text-gray-400 font-bold text-sm">
                        #{team.rank}
                      </span>
                    )}
                  </span>
                  <span className={`${nameColor} font-bold text-base`}>
                    {team.name}
                  </span>
                </div>
                <span className={`${nameColor} font-mono font-bold text-lg`}>
                  {team.score} pts
                </span>
              </div>
              {/* Event score rows */}
              <div className="divide-y divide-gray-700">
                {events.map((event) => {
                  const val = team.scores[event] ?? 0;
                  const isEventWinner = val > 0 && val === eventWinners[event];
                  return (
                    <div
                      key={event}
                      className="flex items-center justify-between px-4 py-2"
                    >
                      <span className="text-gray-400 text-sm">{event}</span>
                      <span
                        className={`font-mono font-semibold text-sm ${
                          isEventWinner ? "text-yellow-300" : "text-gray-300"
                        }`}
                      >
                        {val > 0 ? val : "—"}
                        {isEventWinner && " ★"}
                      </span>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── Desktop: full grid table ── */}
      <div className="hidden md:block mx-12 overflow-x-auto">
        <div
          className="min-w-fit"
          style={{
            display: "grid",
            gridTemplateColumns: `minmax(160px, 2fr) ${events
              .map(() => "1fr")
              .join(" ")} minmax(70px, 1fr)`,
          }}
        >
          <div className="bg-gray-700 px-4 py-3 font-bold text-gray-200 text-sm uppercase tracking-wider rounded-tl-xl">
            Team
          </div>
          {events.map((event) => (
            <div
              key={event}
              className="bg-gray-700 px-3 py-3 font-bold text-gray-200 text-sm uppercase tracking-wider text-center border-l border-gray-600"
            >
              {event}
            </div>
          ))}
          <div className="bg-gray-700 px-4 py-3 font-bold text-blue-300 text-sm uppercase tracking-wider text-right rounded-tr-xl border-l border-gray-600">
            Total
          </div>

          {teams.map((team, rowIdx) => {
            const isLast = rowIdx === teams.length - 1;
            const nameColor = medalText[team.rank] ?? "text-gray-300";
            const rowBg = rowIdx % 2 === 0 ? "bg-gray-800" : "bg-gray-750";
            return (
              <React.Fragment key={team.id}>
                <div
                  className={`${rowBg} px-4 py-3 flex items-center gap-2 border-t border-gray-700 ${
                    isLast ? "rounded-bl-xl" : ""
                  }`}
                >
                  <span className="text-base">
                    {medalEmoji[team.rank] ?? (
                      <span className="text-gray-500 font-bold text-sm">
                        #{team.rank}
                      </span>
                    )}
                  </span>
                  <span
                    className={`${nameColor} font-semibold text-sm truncate`}
                  >
                    {team.name}
                  </span>
                </div>
                {events.map((event) => {
                  const val = team.scores[event] ?? 0;
                  const isEventWinner = val > 0 && val === eventWinners[event];
                  return (
                    <div
                      key={`${team.id}-${event}`}
                      className={`${rowBg} px-3 py-3 text-center font-mono text-sm border-t border-l border-gray-700 ${
                        isEventWinner
                          ? "text-yellow-300 font-bold"
                          : "text-gray-400"
                      }`}
                    >
                      {val > 0 ? val : "—"}
                      {isEventWinner && <span className="ml-1 text-xs">★</span>}
                    </div>
                  );
                })}
                <div
                  className={`${rowBg} px-4 py-3 text-right font-mono font-bold border-t border-l border-gray-700 ${nameColor} ${
                    isLast ? "rounded-br-xl" : ""
                  }`}
                >
                  {team.score}
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </>
  );
}

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
