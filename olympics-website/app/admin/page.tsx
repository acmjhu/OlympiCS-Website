import prisma from "@/lib/prisma";

export default async function AdminPage() {
  const [userCount, teamCount, acceptedCount] = await Promise.all([
    prisma.user.count(),
    prisma.team.count(),
    prisma.team.count({ where: { status: "ACCEPTED" } }),
  ]);

  const cards = [
    { title: "Total Participants", value: userCount },
    { title: "Registered Teams", value: teamCount },
    { title: "Accepted Teams", value: acceptedCount, color: "text-green-500" },
    { title: "Reg Status", value: "OPEN", color: "text-yellow-500" },
  ];

  return (
    <div className="space-y-8">
      <h2 className="text-4xl font-bold font-silkscreen">Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((c) => (
          <div key={c.title} className="bg-zinc-900 border border-zinc-800 p-6 rounded-lg">
            <p className="text-zinc-500 text-[10px] uppercase font-bold tracking-widest mb-2">{c.title}</p>
            <p className={`text-3xl font-mono ${c.color || "text-white"}`}>{c.value}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
