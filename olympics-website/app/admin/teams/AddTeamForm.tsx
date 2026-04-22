"use client";
import { useRef, useTransition } from "react";
import { createTeam } from "./actions";
export default function AddTeamForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      await createTeam(formData);
      formRef.current?.reset();
    });
  };

  return (
    <form ref={formRef} action={handleSubmit} className="flex gap-2">
      <input
        type="text"
        name="name"
        placeholder="New Team Name"
        required
        disabled={isPending}
        className="bg-zinc-900 border border-zinc-800 text-white px-3 py-2 text-sm focus:outline-none focus:border-yellow-500 rounded disabled:opacity-50"
      />
      <button
        type="submit"
        disabled={isPending}
        className="bg-yellow-500 text-black px-4 py-2 font-bold text-xs uppercase tracking-widest hover:bg-yellow-400 transition-colors rounded disabled:opacity-50"
      >
        {isPending ? "Adding..." : "+ Add Team"}
      </button>
    </form>
  );
}
