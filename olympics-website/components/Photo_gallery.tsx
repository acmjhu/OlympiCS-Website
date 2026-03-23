"use client"

import { useState } from "react"
import photos from "@/data/photos.json"
import Image from "next/image"

export default function PhotoGallery({ year }: { year: string }) {
  const yearPhotos = photos[year as keyof typeof photos] || []
  const [selected, setSelected] = useState<string | null>(null)

  if (yearPhotos.length === 0) {
    return <p className="text-gray-500">No photos available</p>
  }

  return (
    <>
      {/* Photo Grid */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {yearPhotos.map((src, i) => (
          <div
            key={i}
            className="relative w-full h-48 overflow-hidden rounded-lg cursor-pointer"
            onClick={() => setSelected(src)}
          >
            <Image
              src={src}
              alt="Event photo"
              fill
              sizes="(max-width: 768px) 50vw, 25vw"
              className="object-cover hover:scale-105 transition pointer-events-none"
            />
          </div>
        ))}
      </div>

      {/* Fullscreen Lightbox */}
      {selected && (
        <div
          className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4"
          onClick={() => setSelected(null)}
        >
          
          <Image
            src={selected}
            alt="Expanded photo"
            width={window.innerWidth * 0.9}
            height={window.innerHeight * 0.9}
            className="object-contain"
            priority
          />

          {/* Close button */}
          <button
            className="absolute top-5 right-5 text-white bg-white/20 p-2 rounded-full hover:bg-white/40 z-50"
            onClick={(e) => {
              e.stopPropagation()
              setSelected(null)
            }}
          >
            
          </button>
        </div>
      )}
    </>
  )
}