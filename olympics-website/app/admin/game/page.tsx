'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';

interface Game {
  _id: string;
  name: string;
  date: string;
  location: string;
}

export default function AdminGames() {
  const { data: session, status } = useSession();
  const [games, setGames] = useState<Game[]>([]);
  const [form, setForm] = useState({ name: '', date: '', location: '' });

  useEffect(() => {
    if (status === 'loading') return;
    if (!session) redirect('/auth/signin'); //redirecting

    fetch('/api/games')
      .then(res => res.json())
      .then(setGames);
  }, [session, status]);

  const addGame = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/games', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setGames([...games, await res.json()]);
      setForm({ name: '', date: '', location: '' });
    }
  };

  const deleteGame = async (id: string) => {
    await fetch(`/api/games/${id}`, { method: 'DELETE' });
    setGames(games.filter(g => g._id !== id));
  };

  if (status === 'loading') return <p>Loading...</p>;

  return (
    <div>
      <h1>Admin: Manage Games</h1>
      <form onSubmit={addGame}>
        <input
          type="text"
          placeholder="Game Name"
          value={form.name}
          onChange={e => setForm({ ...form, name: e.target.value })}
          required
        />
        <input
          type="date"
          value={form.date}
          onChange={e => setForm({ ...form, date: e.target.value })}
          required
        />
        <input
          type="text"
          placeholder="Location"
          value={form.location}
          onChange={e => setForm({ ...form, location: e.target.value })}
          required
        />
        <button type="submit">Add Game</button>
      </form>
      <ul>
        {games.map(game => (
          <li key={game._id}>
            {game.name} - {game.date} - {game.location}
            <button onClick={() => deleteGame(game._id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}