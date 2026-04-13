import Link from "next/link";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const nav = [
    { name: "Dashboard", href: "/admin" },
    { name: "Teams", href: "/admin/teams" },
    { name: "Scoreboard", href: "/admin/scoreboard" },
    { name: "Settings", href: "/admin/settings" },
  ];

  return (
    <div className="flex min-h-screen bg-zinc-950 text-white">
      <aside className="w-64 border-r border-zinc-800 bg-black fixed h-full flex flex-col">
        <div className="p-6 border-b border-zinc-800">
          <h1 className="font-silkscreen text-yellow-500 text-xl tracking-tighter">ADMIN</h1>
        </div>
        <nav className="p-4 flex-1 space-y-2">
          {nav.map((item) => (
            <Link key={item.href} href={item.href} className="block px-4 py-2 hover:bg-zinc-900 rounded-md transition-all uppercase text-xs font-bold tracking-widest">
              {item.name}
            </Link>
          ))}
        </nav>
      </aside>
      <main className="ml-64 flex-1 p-10">{children}</main>
    </div>
  );
}
