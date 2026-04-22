import prisma from "@/lib/prisma";
import DeleteTeamButton from "./DeleteTeamButton";
import AddTeamForm from "./AddTeamForm";
export const dynamic = "force-dynamic";
export default async function TeamsPage() {
  const teams = await prisma.team.findMany({
    orderBy: { id: "desc" },
  });

  return (
    <div className="space-y-8">
      <div className="flex justify-between items-center">
        <h2 className="text-4xl font-bold font-silkscreen text-white">Teams</h2>
        <AddTeamForm />
      </div>

      <div className="bg-zinc-900 border border-zinc-800 rounded-lg overflow-hidden">
        <table className="w-full text-left text-sm text-zinc-300">
          <thead className="bg-zinc-950 border-b border-zinc-800 uppercase tracking-widest text-[10px] text-zinc-500">
            <tr>
              <th className="px-6 py-4">Team Name</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-zinc-800 font-mono">
            {teams.length === 0 ? (
              <tr>
                <td colSpan={3} className="px-6 py-8 text-center text-zinc-500">
                  No teams registered yet.
                </td>
              </tr>
            ) : (
              teams.map((team) => (
                <tr key={team.id} className="hover:bg-zinc-800/50 transition-colors">
                  <td className="px-6 py-4 text-white">{team.name}</td>
                  <td className="px-6 py-4">
                    <span
                      className={
                        team.status === "ACCEPTED"
                          ? "text-green-500"
                          : "text-yellow-500"
                      }
                    >
                      {team.status || "PENDING"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right space-x-4">
                    <button className="text-blue-400 hover:text-blue-300 font-bold text-xs uppercase tracking-widest">
                      EDIT
                    </button>
                    <DeleteTeamButton teamId={team.id} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
