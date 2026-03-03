//Home, Rules, Schedule, Scoreboard, Teams, Register

"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';


export default function Navbar() {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(false);    

    const links = [
        {href: '/rules', label: "Rules"},
        {href: '/schedule', label: "Schedule"},
        {href: '/scoreboard', label: "Scoreboard"},
        {href: '/teams', label: "Teams"},
        {href: '/register', label: "Register"},
    ];

    const handleClick = () => {
        setIsOpen(!isOpen);
    };

    return (
        <nav className='w-full bg-white shadow-md px-6 py-5 flex items-center justify-between'>
            <Link href = '/' className='text-xl font-bold text-gray-800'>Hopkins OlympiCS</Link>
            <div className = "hidden md:flex gap-10">
                {links.map((link) => (
                    <Link
                        key = {link.href}
                        href = {link.href}
                        className= {pathname === link.href ? "text-black font-semibold" : "text-gray-500 hover:text-black"}>
                        {link.label}
                        </Link>
                ))}
            </div>
            <button className = "block md:hidden text-gray-900 text-3xl" onClick= {handleClick}>
                {isOpen ? "x" : "☰"}
            </button>

            {isOpen && (
                <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-white">

                {links.map((link) => (
                    <Link
                        key = {link.href}
                        href = {link.href} 
                        onClick={() => setIsOpen(false)}
                        className= {pathname === link.href ? "text-4xl font-semibold mt-6" : "text-3xl hover:text-black mt-6"}>
                        {link.label}
                        </Link>
                ))}
                 <button onClick={() => setIsOpen(false)}
                        className = "mt-6 text-gray-600 text-4xl hover:text-black transition"
                        >✕</button>
            </div>
            )}      
        </nav>
    );
    
}