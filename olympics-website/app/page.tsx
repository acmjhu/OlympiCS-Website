'use client'

import { useState } from 'react'
import { Dialog, DialogPanel } from '@headlessui/react'
import { Bars3Icon, XMarkIcon } from '@heroicons/react/24/outline'
import homeContent from "../data/homeContent.json";
import Image from 'next/image';
import JHULogo from "./favicon.png";



const navigation = [
  { name: 'About', href: '#' },
  { name: 'Highlights', href: '#' },
  { name: 'Sponsors/Organizers', href: '#' },
  { name: 'Scoreboard', href: '#' },
]


export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  return (
    <div className="bg-gray-900 relative isolate overflow-hidden min-h-screen">
      {/* Header / Navbar */}
      <header className="absolute inset-x-0 top-0 z-50">
        <nav className="flex items-center justify-between p-6 lg:px-8">
          <div className="flex lg:flex-1">
            <a href="#" className="-m-1.5 p-1.5">
              <span className="sr-only">{homeContent.event_name}</span>
            </a>
          </div>
          <div className="flex lg:hidden">
            <button
              type="button"
              onClick={() => setMobileMenuOpen(true)}
              className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-200"
            >
              <span className="sr-only">Open main menu</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>
          </div>
          <div className="hidden lg:flex lg:gap-x-12">
            {navigation.map((item) => (
              <a key={item.name} href={item.href} className="text-sm/6 font-semibold text-white">
                {item.name}
              </a>
            ))}
          </div>
          <div className="hidden lg:flex lg:flex-1 lg:justify-end">
            <a href="#" className="text-sm/6 font-semibold text-white">
              Log in <span aria-hidden="true">&rarr;</span>
            </a>
          </div>
        </nav>







        {/* Mobile menu */}
        <Dialog open={mobileMenuOpen} onClose={setMobileMenuOpen} className="lg:hidden">
          <div className="fixed inset-0 z-50" />
          <DialogPanel className="fixed inset-y-0 right-0 z-50 w-full overflow-y-auto bg-gray-900 p-6 sm:max-w-sm sm:ring-1 sm:ring-gray-100/10">
            <div className="flex items-center justify-between">
              <a href="#" className="-m-1.5 p-1.5">
                <span className="sr-only">{homeContent.event_name}</span>
              </a>
              <button
                type="button"
                onClick={() => setMobileMenuOpen(false)}
                className="-m-2.5 rounded-md p-2.5 text-gray-200"
              >
                <span className="sr-only">Close menu</span>
                <XMarkIcon aria-hidden="true" className="h-6 w-6" />
              </button>
            </div>
            <div className="mt-6 flow-root">
              <div className="-my-6 divide-y divide-white/10">
                <div className="space-y-2 py-6">
                  {navigation.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="-mx-3 block rounded-lg px-3 py-2 text-base/7 font-semibold text-white hover:bg-white/5"
                    >
                      {item.name}
                    </a>
                  ))}
                </div>
                <div className="py-6">
                  <a
                    href="#"
                    className="-mx-3 block rounded-lg px-3 py-2.5 text-base/7 font-semibold text-white hover:bg-white/5"
                  >
                    Log in
                  </a>
                </div>
              </div>
            </div>
          </DialogPanel>
        </Dialog>
      </header>



      {/* Decorative background shapes */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 -top-40 -z-10 transform-gpu overflow-hidden blur-3xl sm:-top-80"
      >
        <div
          style={{
            clipPath:
              'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)',
          }}
          className="relative left-1/2 aspect-[1155/678] w-[36rem] -translate-x-1/2 rotate-30 bg-gradient-to-bl from-[#68ACE5] to-[#002D72] opacity-50 sm:left-1/2 sm:w-[72rem]"
        />
      </div>

      {/* Hero content and JHU Logo */}
      <div className="mx-auto max-w-2xl py-32 sm:py-48 lg:py-56 text-center px-6">
        <div className="absolute top-4 left-4">
          <Image 
            src={JHULogo} 
            alt="JHU Shield Logo" 
            width={130} 
            height={130} 
            className="opacity-50" 
            />
            </div>
        <h1 className="text-5xl sm:text-7xl font-bold text-white font-[var(--font-silkscreen)]">
          {homeContent.event_name}
        </h1>
        <h2 className="mt-4 text-2xl font-semibold text-indigo-400">
          {homeContent.tagline}
        </h2>
        <div className="mt-6 text-white text-lg">
          <p>
            <strong>Date:</strong> {homeContent.date}
          </p>
          <p>
            <strong>Location:</strong> {homeContent.location}
          </p>
        </div>
        <p className="mt-6 text-gray-300 text-lg sm:text-xl">
          {homeContent.short_desc}
        </p>



        {/* CTA buttons */}
         <div className="mt-10 flex flex-col items-center gap-4">
          <a
            href="#register"
            className="rounded-md bg-indigo-500 px-6 py-3 text-white font-semibold hover:bg-indigo-400"
          >
            Register Now
          </a>
          <a
            href="#learn-more"
            className="text-white font-semibold underline"
          >
            Learn More
          </a>
        </div>
      </div>




      {/* About Section*/}
      <section id="About" className="mx-auto max-w-4xl px-6 py-24 text-white text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          About OlympiCS
        </h2>
        <p className="mt-6 text-lg text-gray-300">
          {homeContent.short_desc}
        </p>
      </section>

      {/* Highlights Section */}
      <section id="highlights" className="mx-auto max-w-5xl px-6 py-24">
        <h2 className="text-3xl sm:text-4xl font-bold text-white text-center font">
          Highlights
        </h2>
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {homeContent.highlights.map((item, i) => (
            <div
              key={i}
              className="rounded-xl bg-gray-800 p-6 text-center text-white shadow-lg hover:scale-105 transition-transform"
            >
              <p className="text-lg">{item}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Sponsors / Organizers Section */}
      <section id="sponsors" className="mx-auto max-w-5xl px-6 py-24 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          Sponsors & Organizers
        </h2>
        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-6 text-gray-300">
          <div className="p-4 bg-gray-800 rounded-lg shadow-md">
            JHU CS Department
          </div>
          <div className="p-4 bg-gray-800 rounded-lg shadow-md">
            ACM Student Chapter
          </div>
          <div className="p-4 bg-gray-800 rounded-lg shadow-md">
            WiCS
          </div>
        </div>
      </section>   
    </div>
  )
}