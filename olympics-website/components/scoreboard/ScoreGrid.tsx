import Team from "@/components/scoreboard/Team";
import React, { useState } from "react";

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

  const borderText: Record<number, string> = {
    1: "border-yellow-400",
    2: "border-gray-300",
    3: "border-orange-400",
    4: "border-gray-700",
  };

  const glowText: Record<number, string> = {
    1: "shadow-[0_0_15px_rgba(250,204,21,0.25)]",
    2: "shadow-[0_0_10px_rgba(209,213,219,0.25)]",
    3: "shadow-[0_0_10px_rgba(251,146,60,0.25)]",
  };

  return (
    <>
      {/*Mobile display*/}
      <div className="flex flex-col gap-3 px-4 md:hidden">
        {teams.map((team) => {
          const nameColor = medalText[team.rank] ?? "text-gray-300";
          const borderColor = borderText[team.rank] ?? "border-gray-300";
          const medalGlow = glowText[team.rank] ?? "";
          return (
            <div
              key={team.id}
              className={`bg-gray-800 rounded-xl border ${borderColor} ${medalGlow} overflow-hidden`}
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
              <div className="divide-y divide-gray-600">
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

      {/*LAptop display*/}
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

export default ScoreGrid;
