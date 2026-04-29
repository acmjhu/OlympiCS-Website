import prisma from "@/lib/prisma";
import AddGameForm from "./AddGameForm";
import {
  AddToEventButton,
  RemoveFromEventButton,
  DeleteGameButton,
} from "./GameRowActions";

export const dynamic = "force-dynamic";

export default async function GamesPage() {
  const activeEvent = await prisma.event.findFirst({
    orderBy: { id: "desc" },
    include: {
      eventGames: {
        orderBy: { order: "asc" },
        include: { game: true },
      },
    },
  });

  const games = await prisma.game.findMany({
    orderBy: { id: "desc" },
  });

  const eventGameIds = new Set(activeEvent?.eventGames.map((eg) => eg.gameId) ?? []);

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center flex-wrap gap-4">
        <h2 className="text-4xl font-bold font-silkscreen text-white">Games</h2>
        <AddGameForm />
      </div>

      <div>
        <h3 className="text-xs uppercase tracking-widest text-zinc-500 mb-3">
          {activeEvent ? `Event: ${activeEvent.name} (${activeEvent.year})` : "No active event"}
        </h3>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
          <table className="w-full text-left text-sm text-zinc-300">
            <thead className="bg-zinc-950 border-b border-zinc-800 uppercase tracking-widest text-[10px] text-zinc-500">
              <tr>
                <th className="px-6 py-4 w-16">#</th>
                <th className="px-6 py-4">Game</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Points</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 font-mono">
              {!activeEvent || activeEvent.eventGames.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-8 text-center text-zinc-500">
                    No games attached to the active event.
                  </td>
                </tr>
              ) : (
                activeEvent.eventGames.map((eg) => (
                  <tr key={eg.id} className="hover:bg-zinc-800/50 transition-colors">
                    <td className="px-6 py-4 text-zinc-500">{eg.order}</td>
                    <td className="px-6 py-4 text-white">{eg.game.name}</td>
                    <td className="px-6 py-4 text-zinc-400">{eg.game.description || "—"}</td>
                    <td className="px-6 py-4">{eg.game.pointValue}</td>
                    <td className="px-6 py-4 text-right">
                      <RemoveFromEventButton eventGamesId={eg.id} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>

      <div>
        <h3 className="text-xs uppercase tracking-widest text-zinc-500 mb-3">All Games</h3>
        <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
          <table className="w-full text-left text-sm text-zinc-300">
            <thead className="bg-zinc-950 border-b border-zinc-800 uppercase tracking-widest text-[10px] text-zinc-500">
              <tr>
                <th className="px-6 py-4">Game</th>
                <th className="px-6 py-4">Description</th>
                <th className="px-6 py-4">Points</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800 font-mono">
              {games.length === 0 ? (
                <tr>
                  <td colSpan={4} className="px-6 py-8 text-center text-zinc-500">
                    No games created yet.
                  </td>
                </tr>
              ) : (
                games.map((game) => (
                  <tr key={game.id} className="hover:bg-zinc-800/50 transition-colors">
                    <td className="px-6 py-4 text-white">{game.name}</td>
                    <td className="px-6 py-4 text-zinc-400">{game.description || "—"}</td>
                    <td className="px-6 py-4">{game.pointValue}</td>
                    <td className="px-6 py-4 text-right space-x-4">
                      {activeEvent && !eventGameIds.has(game.id) && (
                        <AddToEventButton gameId={game.id} />
                      )}
                      <DeleteGameButton gameId={game.id} />
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
