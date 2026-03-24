'use client';

import { useState, useEffect } from 'react';

interface Game {
  id: number;
  name: string;
  description?: string;
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
  registration?: boolean;
  eventGames?: EventGame[];
}

export default function AdminSettingsPage() {
  const [event, setEvent] = useState<Event | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEvent = async () => {
      try {
        // For now, we'll use mock data
        const mockEvent: Event = {
          id: 1,
          name: 'OlympiCS 2026',
          year: 2026,
          registration: true,
          eventGames: [
            {
              id: 1,
              order: 1,
              game: {
                id: 1,
                name: 'Coding Challenge',
                description: 'Teams compete to solve algorithmic problems',
              },
            },
            {
              id: 2,
              order: 2,
              game: {
                id: 2,
                name: 'Web Development',
                description: 'Build a web application with a time limit',
              },
            },
            {
              id: 3,
              order: 3,
              game: {
                id: 3,
                name: 'Game Development',
                description: 'Create a game in the given time frame',
              },
            },
          ],
        };
        setEvent(mockEvent);
      } catch (error) {
        console.error('Failed to fetch event:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchEvent();
  }, []);

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
              <h3 className="text-lg font-medium text-gray-900 mb-4">
                Current Event
              </h3>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <p className="text-sm text-gray-600">Event Name</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {event?.name}
                  </p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Year</p>
                  <p className="text-lg font-semibold text-gray-900">
                    {event?.year}
                  </p>
                </div>
              </div>
            </div>

            {/* Registration Status */}
            <div>
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-medium text-gray-900">
                    Team Registration
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">
                    {event?.registration
                      ? 'Registration is currently open. Teams can join the event.'
                      : 'Registration is currently closed. Teams cannot join the event.'}
                  </p>
                </div>
                <div className="flex items-center gap-3">
                  <span
                    className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${
                      event?.registration
                        ? 'bg-green-100 text-green-800'
                        : 'bg-red-100 text-red-800'
                    }`}
                  >
                    {event?.registration ? 'Open' : 'Closed'}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Game Management Section */}
        <div className="bg-white rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold text-gray-900 mb-6">
            Game Management
          </h2>

          {event?.eventGames && event.eventGames.length > 0 ? (
            <div className="space-y-4">
              {event.eventGames.map((eg) => (
                <div
                  key={eg.id}
                  className="flex items-start justify-between border rounded-lg p-4 hover:bg-gray-50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <span className="inline-flex items-center justify-center h-8 w-8 rounded-full bg-blue-100 text-blue-700 font-semibold text-sm">
                        {eg.order}
                      </span>
                      <h3 className="text-lg font-medium text-gray-900">
                        {eg.game.name}
                      </h3>
                    </div>
                    {eg.game.description && (
                      <p className="text-gray-600 text-sm ml-11">
                        {eg.game.description}
                      </p>
                    )}
                  </div>
                  <button className="text-gray-400 hover:text-gray-600 transition-colors p-2">
                    <svg
                      className="w-5 h-5"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z"
                      />
                    </svg>
                  </button>
                </div>
              ))}
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
