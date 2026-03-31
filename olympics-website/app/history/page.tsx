import historyData from "@/data/past_events.json"
import PhotoGallery from "@/components/Photo_gallery"

export default function HistoryPage() {
  const events = Object.entries(historyData["Past events"] || {})
    .sort((a, b) => Number(b[0]) - Number(a[0]))

  return (
    <div className="relative isolate overflow-hidden bg-gray-900 text-white min-h-screen pt-24 p-6">

      {/* Background blur */}
      <div className="absolute inset-x-0 -top-40 -z-10 blur-3xl">
        <div
          className="mx-auto aspect-[1155/678] w-[36rem] bg-gradient-to-bl from-[#002D72] to-[#68ACE5] opacity-50"
          style={{
            clipPath:
              "polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)"
          }}
        />
      </div>

      <div className="mx-auto px-6 sm:px-12">

        <h1 className="text-4xl font-bold text-center mb-12">
          Past Events
        </h1>

        {events.length === 0 && (
          <p className="text-center text-gray-400 text-xl mt-20">
            This is our first year — be part of history!
          </p>
        )}

        {events.map(([year, event]: any) => (
          <div key={year} className="mb-20">

            {/* Year */}
            <h2 className="text-3xl font-bold">{year}</h2>

            {/* Event Info */}
            <p className="text-xl">{event["event name"]}</p>
            <p className="text-gray-400 mb-4">{event.date}</p>

            {/* Winners */}
            <h3 className="text-lg font-semibold mt-6">Top Teams</h3>
            <ul className="mt-2 space-y-2">
              {event["top 3 winners"].map((winner: string, i: number) => {
                let icon = ""
                if (i === 0) icon = "🏆"
                else if (i === 1) icon = "🥈"
                else if (i === 2) icon = "🥉"

                return (
                  <li key={i} className="flex items-center gap-2">
                    <span>{icon}</span>
                    <span>{winner}</span>
                  </li>
                )
              })}
            </ul>

            {/* Photos */}
            <h3 className="text-xl font-semibold mt-8 mb-4">Photos</h3>
            <PhotoGallery year={year} />

          </div>
        ))}

      </div>
    </div>
  )
}