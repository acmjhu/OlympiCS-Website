"use client";

import { useTransition } from "react";
import { deleteTeam } from "./actions";

export default function DeleteTeamButton({ teamId }: { teamId: number }) {
  const [isPending, startTransition] = useTransition();

  const handleDelete = () => {
    if (window.confirm("Are you sure you want to permanently delete this team?")) {
      startTransition(() => {
        deleteTeam(teamId);
      });
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
