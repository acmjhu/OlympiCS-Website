"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);

  const nav = [
    { name: "Dashboard", href: "/admin" },
    { name: "Teams", href: "/admin/teams" },
    { name: "Scoreboard", href: "/admin/scoreboard" },
    { name: "Settings", href: "/admin/settings" },
  ];

  return (
    // FIX: Added 'flex flex-col' to the main wrapper
    <div className="min-h-screen bg-zinc-950 text-white flex flex-col">

      <div className="lg:hidden flex items-center justify-between p-4 border-b border-zinc-800 bg-black relative z-30">
        <span className="font-silkscreen text-yellow-500 text-sm">ADMIN CONTROLS</span>
        <button onClick={() => setIsOpen(!isOpen)} className="space-y-1.5 p-2">
          <div className={`w-6 h-0.5 bg-yellow-500 transition-all ${isOpen ? "rotate-45 translate-y-2" : ""}`} />
          <div className={`w-6 h-0.5 bg-yellow-500 transition-all ${isOpen ? "opacity-0" : ""}`} />
          <div className={`w-6 h-0.5 bg-yellow-500 transition-all ${isOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* FIX: Added a flex container to place sidebar and main side-by-side on desktop */}
      <div className="flex flex-1 items-stretch">
        <aside className={` 
          fixed top-[80px] left-0 z-40 w-80 bg-black border-r border-zinc-800 
          h-[calc(100vh-80px)] transition-transform duration-300
          ${isOpen ? "translate-x-0" : "-translate-x-full"}
          /* FIX: Added lg:static, lg:h-auto, and lg:shrink-0 to join normal flow */
          lg:static lg:translate-x-0 lg:h-auto lg:shrink-0
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

        {/* FIX: Removed lg:ml-80 and replaced with flex-1 so it naturally fills space */}
        <main className="flex-1 p-6 lg:p-10 min-w-0">
          {children}
        </main>
      </div>

      {isOpen && (
        <div 
          className="fixed inset-0 top-[80px] bg-black/60 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}