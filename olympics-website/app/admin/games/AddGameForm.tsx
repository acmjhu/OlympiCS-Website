"use client";
import { useRef, useTransition } from "react";
import { createGame } from "./actions";

export default function AddGameForm() {
  const formRef = useRef<HTMLFormElement>(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (formData: FormData) => {
    startTransition(async () => {
      await createGame(formData);
      formRef.current?.reset();
    });
  };

  return (
    <form ref={formRef} action={handleSubmit} className="flex flex-wrap gap-2 items-center">
      <input
        type="text"
        name="name"
        placeholder="Game Name"
        required
        disabled={isPending}
        className="bg-zinc-900 border border-zinc-800 text-white px-3 py-2 text-sm focus:outline-none focus:border-yellow-500 rounded disabled:opacity-50"
      />
      <input
        type="text"
        name="description"
        placeholder="Description"
        disabled={isPending}
        className="bg-zinc-900 border border-zinc-800 text-white px-3 py-2 text-sm focus:outline-none focus:border-yellow-500 rounded disabled:opacity-50"
      />
      <input
        type="number"
        name="pointValue"
        placeholder="Points"
        defaultValue={0}
        disabled={isPending}
        className="bg-zinc-900 border border-zinc-800 text-white px-3 py-2 text-sm w-24 focus:outline-none focus:border-yellow-500 rounded disabled:opacity-50"
      />
      <label className="flex items-center gap-2 text-xs text-zinc-400 uppercase tracking-widest">
        <input type="checkbox" name="addToEvent" defaultChecked disabled={isPending} />
        Add to Event
      </label>
      <button
        type="submit"
        disabled={isPending}
        className="bg-yellow-500 text-black px-4 py-2 font-bold text-xs uppercase tracking-widest hover:bg-yellow-400 transition-colors rounded disabled:opacity-50"
      >
        {isPending ? "Adding..." : "+ Add Game"}
      </button>
    </form>
  );
}
