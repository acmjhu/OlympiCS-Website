import scheduleData from "@/data/schedule.json"; 
import { Smile, Gamepad2, Coffee, MapPin } from "lucide-react";

interface ScheduleItem {
  time: string;
  event: string;
  location?: string;
  description: string;
  type: "ceremony" | "competition" | "break" | string;
}

const categoryColor: Record<string, string> = {
  ceremony: "bg-blue-500",
  competition: "bg-red-500", 
  break: "bg-amber-400",
};

const categoryIcon: Record<string, React.ReactNode> = {
  ceremony: <Smile size={16} className="text-white" />,
  competition: <Gamepad2 size={16} className="text-white" />,
  break: <Coffee size={16} className="text-white" />
};

export default function SchedulePage() {
  return (
    <div className="max-w-2xl mx-auto px-6 py-12 font-sans">
      {/* INIT GUARD */}
      <header className="mb-10">
        <h1 className="text-4xl font-extrabold text-slate-900 mb-2">Event Schedule</h1>
        <p className="text-sm text-red-600 font-medium italic">
          * Schedule subject to change
        </p>
      </header>

      {/* Requirement: TIMELINE GUARD */}
      <div className="relative border-l-2 border-slate-200 ml-3">
        {scheduleData.map((item: ScheduleItem, index: number) => (
          <div key={index} className="relative pl-10 mb-12 last:mb-0">
            
            {/* Requirement: COLORS */}
            <span className={`absolute -left-[17px] top-1 w-8 h-8 rounded-full flex items-center justify-center ring-4 ring-white ${categoryColor[item.type] || "bg-gray-400"}`}>
              {categoryIcon[item.type] || <Smile size={16} />}
            </span>

            {/* Requirement: TIME SHOWN HERE*/}
            <time className="block text-sm font-bold uppercase tracking-wider text-slate-500 mb-1">
              {item.time}
            </time>

            <div className="bg-white p-5 rounded-xl border border-slate-100 shadow-sm">
              <h3 className="text-xl font-bold text-slate-800 leading-tight">
                {item.event}
              </h3>
              
              {/* Requirement: LOC*/}
              {item.location && (
                <div className="flex items-center gap-1 mt-1 text-slate-600 font-medium text-sm">
                  <MapPin size={14} className="text-slate-400" />
                  {item.location}
                </div>
              )}

              {/* Requirement: DESC*/}
              <p className="mt-3 text-slate-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </div>
          </div>  
        ))}  
      </div>
    </div>
  );
}
