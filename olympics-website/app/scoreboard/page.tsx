interface Team {
  id: number;
  name: string;
  score: number;
}

const placeholderTeams: Team[] = [
  { id: 1, name: "Manuel and Friends", score: 10 },
  { id: 2, name: "Team Bob", score: 8 },
  { id: 3, name: "Team Alice", score: 5 },
  { id: 4, name: "Team Sally", score: 3 },
  { id: 5, name: "Team Jim", score: 0 },
];
// Put this above TeamRow
interface EmptyStateProps {
  message: string;
}

function EmptyState({ message }: EmptyStateProps) {
  return (
    <div className="text-center py-20 text-gray-500">
      <p className="text-xl font-medium">{message}</p>
    </div>
  );
}
interface TeamRowProps {
  team: Team;
  rank: number | null;
}

function TeamRow({ team, rank }: TeamRowProps) {
  /*Top 3 Display Variables*/
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
    1: "shadow-[0_0_15px_rgba(250,204,21,0.4)]",
    2: "shadow-[0_0_15px_rgba(209,213,219,0.3)]",
    3: "shadow-[0_0_15px_rgba(251,146,60,0.4)]",
  };

  const medalEmoji: Record<number, string> = {
    1: "🥇",
    2: "🥈",
    3: "🥉",
  };

  const hasTeams = placeholderTeams.length > 0;
  const hasScores = placeholderTeams.some((t) => t.score > 0);
  //if null (all teams have 0 points at the start of the game) make the text darker and less strong. Otherwise handle normally
  const textColor = rank ? medalText[rank] ?? "text-gray-400" : "text-gray-600";
  const borderColor = rank
    ? medalBorder[rank] ?? "border-gray-700"
    : "border-gray-800";
  const glowColor = rank ? medalGlow[rank] ?? "" : "";
  const emoji = rank ? medalEmoji[rank] ?? null : null;
  const isFirst = rank === 1;

  return (
    <div
      className={`
        flex items-center justify-between bg-gray-800 rounded-xl border
        ${borderColor} ${glowColor}
        ${isFirst ? "px-8 py-6" : "px-6 py-4"}
      `}
    >
      <div className="flex items-center gap-4">
        {/* Rank — emoji for top 3, plain number for rest */}
        {emoji ? (
          <span className={`${isFirst ? "text-3xl" : "text-2xl"}`}>
            {emoji}
          </span>
        ) : (
          <span className="text-gray-500 font-bold text-lg w-8 text-center">
            #{rank}
          </span>
        )}

        {/* Team name */}
        <span
          className={`${textColor} ${
            isFirst ? "text-2xl font-black" : "text-base font-medium"
          }`}
        >
          {team.name}
        </span>
      </div>

      {/* Score */}
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

export default function ScoreboardPage() {
  //Calculate rank and make sure the teams are in order of rank
  const sortedTeams = [...placeholderTeams].sort((a, b) => b.score - a.score);
  const teamsWithRank = sortedTeams.map((team, index, array) => {
    //calculate the score
    const rank = array.findIndex((t) => t.score === team.score) + 1;
    return { ...team, rank };
  });
  const hasTeams = placeholderTeams.length > 0;
  const hasScores = placeholderTeams.some((t) => t.score > 0);
  return (
    <main className="min-h-screen bg-gray-950 text-white px-4 py-12">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-5xl font-black tracking-tight">
          OlympiCS 5/1/26 Live Leaderboard
        </h1>
      </header>

      {/* Leaderboard */}

      {/* Handles no scores yet (show "Scoreboard will be available on event day"), no teams accepted yet*/}
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
    </main>
  );
}
