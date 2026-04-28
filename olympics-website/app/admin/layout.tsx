"use client";

import { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const nav = [
    { name: "Dashboard", href: "/admin" },
    { name: "Teams", href: "/admin/teams" },
    { name: "Scoreboard", href: "/admin/scoreboard" },
    { name: "Settings", href: "/admin/settings" },
  ];

  return (
    <div className="min-h-screen bg-zinc-950 text-white">

      <div className="lg:hidden flex items-center justify-between p-4 border-b border-zinc-800 bg-black sticky top-[80px] z-30">
        <span className="font-silkscreen text-yellow-500 text-sm">ADMIN CONTROLS</span>
        <button onClick={() => setIsOpen(!isOpen)} className="space-y-1.5 p-2">
          <div className={`w-6 h-0.5 bg-yellow-500 transition-all ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
          <div className={`w-6 h-0.5 bg-yellow-500 transition-all ${isOpen ? "opacity-0" : ""}`} />
          <div className={`w-6 h-0.5 bg-yellow-500 transition-all ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>
      {/*Just makes sure that things aren't blocked by other things*/}
      <aside className={` 
        fixed top-[80px] left-0 z-40 w-80 bg-black border-r border-zinc-800 
        h-[calc(100vh-80px)] transition-transform duration-300
        ${isOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0
      `}>
        <nav className="p-4 space-y-2">
          {nav.map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-3 rounded text-xs font-bold tracking-widest transition-all
                  ${active ? "bg-yellow-500 text-black shadow-[0_0_15px_rgba(234,179,8,0.3)]" : "text-zinc-400 hover:text-white hover:bg-zinc-900"}`}
              >
                {item.name}
              </Link>
            );
          })}
        </nav>
      </aside>

      <main className="lg:ml-80 p-6 lg:p-10">
        {children}
      </main>

      {isOpen && (
        <div 
          className="fixed inset-0 top-[80px] bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}