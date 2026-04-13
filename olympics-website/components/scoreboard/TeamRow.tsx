import Team from "@/components/scoreboard/Team";

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

export default TeamRow;
