import { Metadata } from 'next';
import teamsData from '@/data/currentTeams.json';

export const metadata: Metadata = {
    title: 'Teams | OlympiCS',
    description: 'Meet the competing teams in the JHU OlympiCS programming competition',
};

interface Team {
    name: string;
    members: string[];
}

function getInitials(name: string): string {
    const parts = name.trim().split(/\s+/);
    if (parts.length >= 2) {
        return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase();
    }
    return name.slice(0, 2).toUpperCase();
}

export default function TeamsPage() {
    const teams: Team[] = teamsData;

    return (
        <div className="min-h-screen bg-white">
            {/* Header */}
            <div className="bg-[#002D72] text-white py-16">
                <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                    <h1 className="text-4xl sm:text-5xl font-bold mb-4">
                        Competing Teams
                    </h1>
                    <p className="text-xl text-blue-100 max-w-2xl">
                        {teams.length} teams are ready to compete in OlympiCS
                    </p>
                </div>
            </div>

            {/* Teams Grid */}
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
                <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {teams.map((team, index) => (
                        <div
                            key={team.name}
                            id={`team-${index}`}
                            className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-300 overflow-hidden border border-gray-200"
                        >
                            {/* Accent strip */}
                            <div className="h-2 bg-[#002D72]" />

                            <div className="p-6">
                                {/* Team name */}
                                <div className="flex items-center mb-5">
                                    <div className="flex-shrink-0 w-11 h-11 rounded-lg bg-[#002D72] flex items-center justify-center text-white font-bold text-lg">
                                        {index + 1}
                                    </div>
                                    <h2 className="ml-4 text-xl font-bold text-gray-900">
                                        {team.name}
                                    </h2>
                                </div>

                                {/* Divider */}
                                <div className="border-t border-gray-100 mb-4" />

                                {/* Members */}
                                <div className="space-y-3">
                                    {team.members.map((member, mIdx) => (
                                        <div
                                            key={mIdx}
                                            className="flex items-center gap-3"
                                        >
                                            <span className="flex-shrink-0 w-9 h-9 rounded-full bg-blue-50 text-[#002D72] flex items-center justify-center text-xs font-bold">
                                                {getInitials(member)}
                                            </span>
                                            <span className="text-gray-700 font-medium">
                                                {member}
                                            </span>
                                        </div>
                                    ))}
                                </div>

                                {/* Member count badge */}
                                <div className="mt-5 flex items-center">
                                    <span className="inline-flex items-center gap-1.5 text-xs font-semibold text-gray-500 bg-gray-100 px-3 py-1.5 rounded-full">
                                        <svg
                                            className="w-3.5 h-3.5"
                                            fill="none"
                                            stroke="currentColor"
                                            viewBox="0 0 24 24"
                                            aria-hidden="true"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                                            />
                                        </svg>
                                        {team.members.length} member{team.members.length !== 1 ? 's' : ''}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}