import photos from "@/data/photos.json"
import Image from "next/image"

export default function PhotoGallery({ year }: { year: string }) {

  const yearPhotos = photos[year as keyof typeof photos] || []

  if (yearPhotos.length === 0) {
    return <p className="text-gray-500">No photos available</p>
  }

  return (
    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {yearPhotos.map((src, i) => (
        <div
          key={i}
          className="relative w-full h-48 overflow-hidden rounded-lg"
        >
          <Image
            src={src}
            alt="Event photo"
            fill
            className="object-cover hover:scale-105 transition"
          />
        </div>
      ))}
    </div>
  )
}