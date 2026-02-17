interface Team {
  id: number;
  name: string;
  score: number;
}

const placeholderTeams: Team[] = [
  { id: 1, name: "Manuel and Friends", score: 10 },
  { id: 2, name: "Team Bob", score: 8 },
  { id: 3, name: "Team Alice", score: 3 },
  { id: 4, name: "Team Sally", score: 2 },
  { id: 5, name: "Team Jim", score: 2 },
];

interface TeamRowProps {
  team: Team;
  rank: number;
}

function TeamRow({ team, rank }: TeamRowProps) {
  const medalColors: Record<number, string> = {
    1: "text-yellow-400", // gold
    2: "text-gray-300", // silver
    3: "text-orange-400", // bronze
  };

  const color = medalColors[rank] ?? "text-white";
  return (
    <div>
      <span className={color}>#{rank} </span>
      <span className={color}>{team.name} </span>
      <span className={color}>{team.score} pts</span>
    </div>
  );
}

export default function ScoreboardPage() {
  //make sure the teams are in order of rank
  const sortedTeams = [...placeholderTeams].sort((a, b) => b.score - a.score);

  return (
    <main className="min-h-screen bg-gray-950 text-white px-4 py-12">
      {/* Header */}
      <header className="text-center mb-10">
        <h1 className="text-5xl font-black tracking-tight">OlympiCS 2026</h1>
      </header>

      {/* Leaderboard */}
      <section className="text-2xl text-center max-w-2xl mx-auto flex flex-col gap-3">
        {sortedTeams.map((team, index) => (
          <TeamRow key={team.id} team={team} rank={index + 1} />
        ))}
      </section>
    </main>
  );
}
