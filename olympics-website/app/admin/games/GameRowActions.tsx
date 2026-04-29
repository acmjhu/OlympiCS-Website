"use client";

import { useTransition } from "react";
import { addGameToEvent, removeGameFromEvent, deleteGame } from "./actions";

export function AddToEventButton({ gameId }: { gameId: number }) {
  const [isPending, startTransition] = useTransition();
  return (
    <button
      onClick={() => startTransition(() => addGameToEvent(gameId))}
      disabled={isPending}
      className="text-green-500 hover:text-green-400 disabled:text-zinc-600 font-bold text-xs uppercase tracking-widest transition-colors"
    >
      {isPending ? "ADDING..." : "+ EVENT"}
    </button>
  );
}

export function RemoveFromEventButton({ eventGamesId }: { eventGamesId: number }) {
  const [isPending, startTransition] = useTransition();
  return (
    <button
      onClick={() => startTransition(() => removeGameFromEvent(eventGamesId))}
      disabled={isPending}
      className="text-yellow-500 hover:text-yellow-400 disabled:text-zinc-600 font-bold text-xs uppercase tracking-widest transition-colors"
    >
      {isPending ? "REMOVING..." : "- EVENT"}
    </button>
  );
}

export function DeleteGameButton({ gameId }: { gameId: number }) {
  const [isPending, startTransition] = useTransition();
  const handleDelete = () => {
    if (window.confirm("Permanently delete this game?")) {
      startTransition(() => deleteGame(gameId));
    }
  };
  return (
    <button
      onClick={handleDelete}
      disabled={isPending}
      className="text-red-500 hover:text-red-400 disabled:text-zinc-600 font-bold text-xs uppercase tracking-widest transition-colors"
    >
      {isPending ? "DELETING..." : "DEL"}
    </button>
  );
}
