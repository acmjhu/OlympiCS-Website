'use client';

import { useState, useEffect } from 'react';
import { Switch } from '@headlessui/react';

interface Game {
  id: number;
  name: string;
  description?: string;
  pointValue?: number;
}

interface EventGame {
  id: number;
  order: number;
  game: Game;
}

interface Event {
  id: number;
  name: string;
  date?: string;
  description?: string;
  registration?: boolean;
  eventGames?: EventGame[];
}

export default function AdminSettingsPage() {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [registrationEnabled, setRegistrationEnabled] = useState(true);
  const [saving, setSaving] = useState(false);
  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState('');
  const [editDate, setEditDate] = useState('');
  const [editDescription, setEditDescription] = useState('');
  const [addGameMode, setAddGameMode] = useState(false);
  const [newGameName, setNewGameName] = useState("");
  const [newGameDescription, setNewGameDescription] = useState("");
  const [newGamePointValue, setNewGamePointValue] = useState('0');

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        // For now, we'll use mock data
        const mockEvent: Event = {
          id: 1,
          name: 'OlympiCS 2026',
          date: '2026-04-15',
          description: 'Annual programming competition for JHU students',
          registration: true,
          eventGames: [
            {
              id: 1,
              order: 1,
              game: {
                id: 1,
                name: 'Coding Challenge',
                description: 'Teams compete to solve algorithmic problems',
                pointValue: 100,
              },
            },
            {
              id: 2,
              order: 2,
              game: {
                id: 2,
                name: 'Web Development',
                description: 'Build a web application with a time limit',
                pointValue: 150,
              },
            },
            {
              id: 3,
              order: 3,
              game: {
                id: 3,
                name: 'Game Development',
                description: 'Create a game in the given time frame',
                pointValue: 200,
              },
            },
          ],
        };
        setEvent(mockEvent);
        setRegistrationEnabled(mockEvent.registration ?? true);
        setEditName(mockEvent.name);
        setEditDate(mockEvent.date || '');
        setEditDescription(mockEvent.description || '');
      } catch (error) {
        console.error('Failed to fetch event:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, []);

  const handleRegistrationToggle = async (enabled: boolean) => {
    setRegistrationEnabled(enabled);
    setSaving(true);
    try {
      // Update the event registration flag
      if (event) {
        const updatedEvent = { ...event, registration: enabled };
        setEvent(updatedEvent);
      }
      // In a real scenario, you would make an API call here
      // await fetch(`/api/events/${event?.id}`, { method: 'PUT', body: JSON.stringify({ registration: enabled }) });
    } catch (error) {
      console.error('Failed to update registration:', error);
      setRegistrationEnabled(!enabled);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveEventDetails = async () => {
    setSaving(true);
    try {
      if (event) {
        const updatedEvent = {
          ...event,
          name: editName,
          date: editDate,
          description: editDescription,
        };
        setEvent(updatedEvent);
        setEditMode(false);
      }
      // In a real scenario, you would make an API call here
      // await fetch(`/api/events/${event?.id}`, { method: 'PUT', body: JSON.stringify({ name: editName, date: editDate, description: editDescription }) });
    } catch (error) {
      console.error('Failed to update event details:', error);
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    if (event) {
      setEditName(event.name);
      setEditDate(event.date || '');
      setEditDescription(event.description || '');
      setEditMode(false);
    }
  };

  const handleAddGame = () => {
    if (!newGameName.trim()) {
      alert("Please enter a game name");
      return;
    }

    setSaving(true);
    try {
      if (event) {
        const newGame: Game = {
          id: Math.max(...event.eventGames!.map(eg => eg.game.id), 0) + 1,
          name: newGameName,
          description: newGameDescription || undefined,
          pointValue: parseInt(newGamePointValue) || 0,
        };

        const newEventGame: EventGame = {
          id: Math.max(...event.eventGames!.map(eg => eg.id), 0) + 1,
          order: (event.eventGames?.length || 0) + 1,
          game: newGame,
        };

        const updatedEvent = {
          ...event,
          eventGames: [...(event.eventGames || []), newEventGame],
        };

        setEvent(updatedEvent);
        setNewGameName("");
        setNewGameDescription("");
        setNewGamePointValue("0");
        setAddGameMode(false);
      }
      // In a real scenario, you would make an API call here
      // await fetch(`/api/games`, { method: 'POST', body: JSON.stringify({ name: newGameName, description: newGameDescription, pointValue: parseInt(newGamePointValue) }) });
    } catch (error) {
      console.error('Failed to add game:', error);
      alert('Failed to add game. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  const handleCancelAddGame = () => {
    setNewGameName("");
    setNewGameDescription("");
    setNewGamePointValue("0");
    setAddGameMode(false);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 p-8">
        <div className="mx-auto max-w-4xl">
          <div className="animate-pulse space-y-4">
            <div className="h-8 w-48 bg-gray-200 rounded"></div>
            <div className="h-64 bg-gray-200 rounded"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">Admin Settings</h1>

        {/* Event Settings Section */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Event Settings
          </h2>

          <div className="space-y-6">
            {/* Event Info */}
            <div className="border-b pb-6">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-medium text-gray-900">
                  Current Event
                </h3>
                {!editMode && (
                  <button
                    onClick={() => setEditMode(true)}
                    className="px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded cursor-pointer"
                  >
                    Edit
                  </button>
                )}
              </div>
              {editMode ? (
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Event Name
                    </label>
                    <input
                      type="text"
                      value={editName}
                      onChange={(e) => setEditName(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Event Date
                    </label>
                    <input
                      type="date"
                      value={editDate}
                      onChange={(e) => setEditDate(e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Event Description
                    </label>
                    <textarea
                      value={editDescription}
                      onChange={(e) => setEditDescription(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                  <div className="flex gap-3 pt-2">
                    <button
                      onClick={handleSaveEventDetails}
                      disabled={saving}
                      className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
                    >
                      {saving ? 'Saving...' : 'Save'}
                    </button>
                    <button
                      onClick={handleCancelEdit}
                      disabled={saving}
                      className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 disabled:opacity-50 cursor-pointer"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">Event Name</p>
                    <p className="text-lg font-semibold text-gray-900">
                      {event?.name}
                    </p>
                  </div>
                  {event?.date && (
                    <div>
                      <p className="text-sm text-gray-600">Date</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {new Date(event.date).toLocaleDateString()}
                      </p>
                    </div>
                  )}
                  {event?.description && (
                    <div>
                      <p className="text-sm text-gray-600">Description</p>
                      <p className="text-gray-900">{event.description}</p>
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* Registration Status */}
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Team Registration
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {registrationEnabled
                      ? 'Registration is currently open. Teams can join the event.'
                      : 'Registration is currently closed. Teams cannot join the event.'}
                  </p>
                </div>
                <Switch
                  checked={registrationEnabled}
                  onChange={handleRegistrationToggle}
                  disabled={saving}
                  className={`relative inline-flex h-8 w-14 items-center rounded-full transition-colors ${
                    registrationEnabled ? 'bg-green-600' : 'bg-gray-300'
                  } ${saving ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                >
                  <span
                    className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                      registrationEnabled ? 'translate-x-7' : 'translate-x-1'
                    }`}
                  />
                </Switch>
              </div>
            </div>
          </div>
        </div>

        {/* Game Management Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-semibold text-gray-900">Games</h2>
            {!addGameMode && (
              <button
                onClick={() => setAddGameMode(true)}
                className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-sm font-medium cursor-pointer"
              >
                + Add Game
              </button>
            )}
          </div>

          {/* Add Game Form */}
          {addGameMode && (
            <div className="bg-gray-50 rounded-lg p-6 mb-6 border border-gray-200">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">
                Create New Game
              </h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Game Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={newGameName}
                    onChange={e => setNewGameName(e.target.value)}
                    placeholder="e.g., Coding Challenge"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Description
                  </label>
                  <textarea
                    value={newGameDescription}
                    onChange={e => setNewGameDescription(e.target.value)}
                    placeholder="Describe the game"
                    rows={3}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Point Value
                  </label>
                  <input
                    type="number"
                    value={newGamePointValue}
                    onChange={e => setNewGamePointValue(e.target.value)}
                    placeholder="0"
                    min="0"
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500"
                  />
                </div>
                <div className="flex gap-3 pt-2">
                  <button
                    onClick={handleAddGame}
                    disabled={saving}
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:opacity-50 font-medium cursor-pointer"
                  >
                    {saving ? "Creating..." : "Create Game"}
                  </button>
                  <button
                    onClick={handleCancelAddGame}
                    disabled={saving}
                    className="px-4 py-2 border border-gray-300 text-gray-700 rounded-md hover:bg-gray-100 disabled:opacity-50 cursor-pointer"
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          )}

          {event?.eventGames && event.eventGames.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Order</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Game Name</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Description</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Point Value</th>
                    <th className="px-4 py-3 text-left text-sm font-semibold text-gray-900">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  {event.eventGames.map((eg) => (
                    <tr key={eg.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm">
                          {eg.order}
                        </span>
                      </td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">
                        {eg.game.name}
                      </td>
                      <td className="px-4 py-3 text-sm text-gray-600">
                        {eg.game.description || '-'}
                      </td>
                      <td className="px-4 py-3">
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800">
                          {eg.game.pointValue || 0} pts
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-2">
                          <button className="py-1 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded cursor-pointer transition-colors">
                            Edit
                          </button>
                          <button className="px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-50 rounded cursor-pointer transition-colors">
                            Delete
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <div className="text-center py-12">
              <p className="text-gray-500 text-lg">
                No games assigned to this event
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
