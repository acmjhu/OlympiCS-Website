import historyData from "@/data/past_events.json"
import PhotoGallery from "@/components/Photo_gallery"

export default function HistoryPage() {
  const events = Object.entries(historyData["Past events"] || {})
    .sort((a, b) => Number(b[0]) - Number(a[0]))

  return (
    <div className="bg-white text-black min-h-screen pt-24 p-6">
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