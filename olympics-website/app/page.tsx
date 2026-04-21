'use client'

import homeContent from "../data/homeContent.json";
import Image from 'next/image';
import JHULogo from "./favicon.png";
import Link from 'next/link'
import developersContent from "@/data/developersContent.json"; 

interface developerItem {
  name: string;
  grad_year: string;
  role: string;
  major: string;
}


export default function Home() {

  return (
    <div className="bg-gray-900 relative isolate overflow-hidden min-h-screen">

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
        <p className="mt-6 text-gray-300 text-lg">
          {homeContent.short_desc}
        </p>

        {/* CTA buttons */}
         <div className="mt-10 flex flex-col items-center gap-4">
          <Link
            href="/register"
            className="rounded-md bg-indigo-500 px-6 py-3 text-white font-semibold hover:bg-indigo-400"
          >
            Register Now
          </Link>
          <Link
            href="/faq"
            className="text-white font-semibold underline"
          >
            Learn More
          </Link>
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

      {/* Developers Shoutout Section / placeholder, will put this back in homecontent.json */} 
      /* Stuff to include: name, graduation year,  */
      <section id="developers" className="mx-auto max-w-5xl px-6 py-24 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold text-white">
          Shoutout to Our Website Developers! 
        </h2>
        <p className="mt-6 text-lg text-gray-300">
          This website was developed during ACM's Spring 2026 Coding Circles. Check out our other Coding Circle's product here: 
        </p>
        <div className="mt-8 flex flex-col sm:flex-row justify-center items-center gap-6 text-gray-300">

          {developersContent.sections.map((item: developerItem, index: number) => (
            <div key={index} className="p-4 bg-gray-800 rounded-lg shadow-md">
              <p className="mt-0 text-lg text-gray-300">
                {item.name}
              </p>
              <p className="mt-6 text-lg text-gray-300">
                {item.grad_year}
              </p>
              <p className="mt-6 text-lg text-gray-300">
                {item.role}
              </p>
              <p className="mt-6 text-lg text-gray-300">
                {item.major}
              </p>
              
            </div>
          ))}
        </div>
      </section>   
    </div>
  )
}