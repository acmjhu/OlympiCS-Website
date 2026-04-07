'use client';

import { useState, useEffect } from 'react';
import { Switch } from '@headlessui/react';

const SUCCESS_TOAST_DURATION_MS = 3000;

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
  year: number;
  registration: boolean;
  eventGames: EventGame[];
}

export default function AdminSettingsPage() {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);
  const [registrationEnabled, setRegistrationEnabled] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [editMode, setEditMode] = useState(false);
  const [editName, setEditName] = useState("");
  const [editYear, setEditYear] = useState(0);
  const [addGameMode, setAddGameMode] = useState(false);
  const [newGameName, setNewGameName] = useState("");
  const [newGameDescription, setNewGameDescription] = useState("");
  const [newGamePointValue, setNewGamePointValue] = useState("0");

  // Edit-game state
  const [editingGameId, setEditingGameId] = useState<number | null>(null);
  const [editGameName, setEditGameName] = useState("");
  const [editGameDescription, setEditGameDescription] = useState("");
  const [editGamePointValue, setEditGamePointValue] = useState("0");

  useEffect(() => {
    if (!successMessage) {
      return;
    }

    const timeoutId = window.setTimeout(() => {
      setSuccessMessage(null);
    }, SUCCESS_TOAST_DURATION_MS);

    return () => window.clearTimeout(timeoutId);
  }, [successMessage]);

  const fetchEvent = async () => {
    try {
      const response = await fetch("/api/admin/events");
      if (!response.ok) {
        throw new Error("Failed to fetch event");
      }
      const eventData = await response.json();
      setEvent(eventData);
      return eventData;
    } catch (error) {
      console.error("Failed to fetch event:", error);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(() => {
    const setEventData = async () => {
      const eventData = await fetchEvent();
      setRegistrationEnabled(eventData?.registration ?? true);
      setEditName(eventData?.name || "");
      setEditYear(eventData?.year || 0);
    };

    setEventData();
  }, []);

  const handleRegistrationToggle = async (enabled: boolean) => {
    setRegistrationEnabled(enabled);
    setSaving(true);
    try {
      const response = await fetch(`/api/admin/events/${event?.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ registration: true }),
      });

      if (!response.ok) {
        throw new Error("Failed to update registration");
      }

      const updatedEvent = await response.json();
      setEvent(updatedEvent);
      setSuccessMessage(
        enabled ? "Registration opened successfully." : "Registration closed successfully."
      );
    } catch (error) {
      console.error("Failed to update registration:", error);
      setRegistrationEnabled(!enabled);
    } finally {
      setSaving(false);
    }
  };

  const handleSaveEventDetails = async () => {
    setSaving(true);
    try {
      const response = await fetch(`/api/admin/events/${event?.id}`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: editName,
          year: editYear
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to update event details");
      }

      const updatedEvent = await response.json();
      setEvent(updatedEvent);
      setEditMode(false);
      setSuccessMessage("Event details saved successfully.");
    } catch (error) {
      console.error("Failed to update event details:", error);
      alert("Failed to save event details");
    } finally {
      setSaving(false);
    }
  };

  const handleCancelEdit = () => {
    if (event) {
      setEditName(event.name);
      setEditYear(event.year);
      setEditMode(false);
    }
  };

  const handleAddGame = async () => {
    if (!newGameName.trim()) {
      alert("Please enter a game name");
      return;
    }

    setSaving(true);
    try {
      const response = await fetch('/api/admin/games', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: newGameName,
          description: newGameDescription || null,
          pointValue: parseInt(newGamePointValue) || 0,
          eventId: event?.id,
          order: (event?.eventGames?.length || 0) + 1
        })
      });

      if (!response.ok) {
        throw new Error("Failed to create game");
      }

      // Refresh event data after adding game
      fetchEvent();

      setNewGameName("");
      setNewGameDescription("");
      setNewGamePointValue("0");
      setAddGameMode(false);
      setSuccessMessage("Game created successfully.");
    } catch (error) {
      console.error("Failed to add game:", error);
      alert("Failed to add game. Please try again.");
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

  const handleStartEditGame = (eg: EventGame) => {
    setEditingGameId(eg.id);
    setEditGameName(eg.game.name);
    setEditGameDescription(eg.game.description || "");
    setEditGamePointValue(String(eg.game.pointValue ?? 0));
  };

  const handleCancelEditGame = () => {
    setEditingGameId(null);
  };

  const handleSaveGame = async (eg: EventGame) => {
    setSaving(true);
    try {
      const response = await fetch(`/api/admin/games/${eg.game.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: editGameName,
          description: editGameDescription || null,
          pointValue: parseInt(editGamePointValue) || 0,
        }),
      });

      if (!response.ok) throw new Error("Failed to update game");

      const updatedGame = await response.json();
      setEvent((prev) =>
        prev
          ? {
              ...prev,
              eventGames: prev.eventGames.map((e) =>
                e.id === eg.id ? { ...e, game: updatedGame } : e
              ),
            }
          : prev
      );
      setEditingGameId(null);
      setSuccessMessage("Game updated successfully.");
    } catch (error) {
      console.error("Failed to update game:", error);
      alert("Failed to save game. Please try again.");
    } finally {
      setSaving(false);
    }
  };

  const handleDeleteGame = async (eg: EventGame) => {
    if (!confirm(`Delete "${eg.game.name}"? This cannot be undone.`)) return;
    setSaving(true);
    try {
      const response = await fetch(`/api/admin/games/${eg.game.id}`, {
        method: "DELETE",
      });

      if (!response.ok) throw new Error("Failed to delete game");

      setEvent((prev) =>
        prev
          ? {
              ...prev,
              eventGames: prev.eventGames.filter((e) => e.id !== eg.id),
            }
          : prev
      );
      setSuccessMessage("Game deleted successfully.");
    } catch (error) {
      console.error("Failed to delete game:", error);
      alert("Failed to delete game. Please try again.");
    } finally {
      setSaving(false);
    }
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
      {successMessage && (
        <div className="fixed right-6 top-6 z-50 max-w-sm rounded-lg border border-green-200 bg-green-50 px-4 py-3 shadow-lg">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-xs font-bold text-white">
              ✓
            </div>
            <div className="flex-1">
              <p className="text-sm font-semibold text-green-900">Saved</p>
              <p className="text-sm text-green-800">{successMessage}</p>
            </div>
            <button
              type="button"
              onClick={() => setSuccessMessage(null)}
              className="text-green-700 transition hover:text-green-900 cursor-pointer"
              aria-label="Dismiss notification"
            >
              ×
            </button>
          </div>
        </div>
      )}
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
                      type="number"
                      value={editYear}
                      onChange={(e) => setEditYear(parseInt(e.target.value))}
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
                  {event?.year && (
                    <div>
                      <p className="text-sm text-gray-600">Year</p>
                      <p className="text-lg font-semibold text-gray-900">
                        {event.year}
                      </p>
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
                    editingGameId === eg.id ? (
                      <tr key={eg.id} className="bg-blue-50">
                        <td className="px-4 py-3">
                          <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm">
                            {eg.order}
                          </span>
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="text"
                            value={editGameName}
                            onChange={(e) => setEditGameName(e.target.value)}
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="text"
                            value={editGameDescription}
                            onChange={(e) => setEditGameDescription(e.target.value)}
                            placeholder="No description"
                            className="w-full px-2 py-1 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <input
                            type="number"
                            value={editGamePointValue}
                            onChange={(e) => setEditGamePointValue(e.target.value)}
                            min="0"
                            className="w-24 px-2 py-1 text-sm border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500"
                          />
                        </td>
                        <td className="px-4 py-2">
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleSaveGame(eg)}
                              disabled={saving}
                              className="px-3 py-1 text-sm font-medium bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 cursor-pointer"
                            >
                              {saving ? "Saving..." : "Save"}
                            </button>
                            <button
                              onClick={handleCancelEditGame}
                              disabled={saving}
                              className="px-3 py-1 text-sm font-medium border border-gray-300 text-gray-700 rounded hover:bg-gray-100 disabled:opacity-50 cursor-pointer"
                            >
                              Cancel
                            </button>
                          </div>
                        </td>
                      </tr>
                    ) : (
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
                            <button
                              onClick={() => handleStartEditGame(eg)}
                              disabled={saving}
                              className="px-3 py-1 text-sm font-medium text-blue-600 hover:bg-blue-50 rounded cursor-pointer transition-colors disabled:opacity-50"
                            >
                              Edit
                            </button>
                            <button
                              onClick={() => handleDeleteGame(eg)}
                              disabled={saving}
                              className="px-3 py-1 text-sm font-medium text-red-600 hover:bg-red-50 rounded cursor-pointer transition-colors disabled:opacity-50"
                            >
                              Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    )
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
