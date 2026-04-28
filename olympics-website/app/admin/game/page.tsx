'use client';

import { useState, useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { redirect } from 'next/navigation';


interface Game {
  _id?: string;
  id?: number;
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
    if (!session) redirect('/auth/signin');
    
    const isAdmin =
      session?.user?.role === "admin" || 
      (session?.user?.email === "jhuacmofficers@gmail.com" || session?.user?.email === "sethwyzy@gmail.com" ||  session?.user?.email === "michellewang375@gmail.com");
    
    if (!isAdmin) redirect('/');

    fetch('/api/game')
      .then(res => res.json())
      .then(setGames);
  }, [session, status]);

  const addGame = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch('/api/game', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(form),
    });
    if (res.ok) {
      setGames([...games, await res.json()]);
      setForm({ name: '', date: '', location: '' });
    }
  };

  const deleteGame = async (id: string | number) => {
    await fetch(`/api/game/${id}`, { method: 'DELETE' });
    setGames(games.filter(g => (g._id || g.id) !== id));
  };

  if (status === 'loading') return <p>Loading...</p>;

  return (
    <div>
      <h1>Admin: Manage Games</h1>
      <form onSubmit={addGame}>
        <input
          type="text"
          placeholder="Game name"
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
          <li key={game._id || game.id}>
            {game.name} - {new Date(game.date).toLocaleDateString()} - {game.location}
            <button onClick={() => deleteGame(game._id || game.id!)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}