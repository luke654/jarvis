import { CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'
import Header from '../components/layout/Header'
import Card from '../components/ui/Card'
import { mockEvents } from '../data/mock'

const typeColor = (type: string) => {
  const map: Record<string, string> = {
    meeting: 'bg-blue-500',
    call: 'bg-emerald-500',
    deadline: 'bg-red-500',
    reminder: 'bg-amber-500',
  }
  return map[type] ?? 'bg-zinc-500'
}

export default function Calendar() {
  const today = new Date()
  const month = today.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Calendar" subtitle={month} />

      <div className="flex flex-1 gap-4 p-6 overflow-hidden">
        {/* Event list */}
        <div className="w-72 shrink-0 flex flex-col gap-3 overflow-y-auto">
          <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">Upcoming Events</h2>
          {mockEvents.map((ev) => (
            <Card key={ev.id} className="hover:border-zinc-700 cursor-pointer transition-colors">
              <div className="flex items-start gap-3">
                <div className={`w-1 h-full min-h-12 rounded-full shrink-0 ${typeColor(ev.type)}`} />
                <div>
                  <p className="text-sm font-medium text-zinc-100 leading-snug">{ev.title}</p>
                  <p className="text-[11px] text-zinc-500 mt-1">{ev.date} · {ev.time}</p>
                  <p className="text-xs text-zinc-400 mt-1.5 leading-relaxed">{ev.description}</p>
                </div>
              </div>
            </Card>
          ))}
        </div>

        {/* Calendar grid placeholder */}
        <Card className="flex-1" padding={false}>
          <div className="flex items-center justify-between px-6 py-4 border-b border-zinc-800">
            <button className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors">
              <ChevronLeft size={16} />
            </button>
            <div className="flex items-center gap-2">
              <CalendarDays size={15} className="text-zinc-500" />
              <span className="text-sm font-semibold text-zinc-100">{month}</span>
            </div>
            <button className="p-1.5 rounded-lg hover:bg-zinc-800 text-zinc-400 hover:text-zinc-200 transition-colors">
              <ChevronRight size={16} />
            </button>
          </div>

          {/* Day headers */}
          <div className="grid grid-cols-7 border-b border-zinc-800">
            {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
              <div key={d} className="px-3 py-2.5 text-[11px] font-semibold text-zinc-500 uppercase tracking-wide text-center">
                {d}
              </div>
            ))}
          </div>

          {/* Grid cells */}
          <div className="grid grid-cols-7">
            {Array.from({ length: 35 }).map((_, i) => {
              const day = i - 1
              const isToday = day === today.getDate() - 1
              const hasEvent = mockEvents.some((e) => parseInt(e.date.split('-')[2]) === day + 1)
              return (
                <div
                  key={i}
                  className={`min-h-20 p-2 border-b border-r border-zinc-800 last:border-r-0 transition-colors cursor-pointer ${
                    day < 0 || day >= 31 ? 'opacity-20' : 'hover:bg-zinc-800/30'
                  }`}
                >
                  {day >= 0 && day < 31 && (
                    <>
                      <span className={`inline-flex items-center justify-center w-6 h-6 rounded-full text-xs font-medium ${
                        isToday ? 'bg-blue-600 text-white' : 'text-zinc-400'
                      }`}>
                        {day + 1}
                      </span>
                      {hasEvent && (
                        <div className="mt-1 space-y-0.5">
                          {mockEvents
                            .filter((e) => parseInt(e.date.split('-')[2]) === day + 1)
                            .slice(0, 2)
                            .map((e) => (
                              <div key={e.id} className={`h-1 rounded-full ${typeColor(e.type)}`} />
                            ))}
                        </div>
                      )}
                    </>
                  )}
                </div>
              )
            })}
          </div>
        </Card>
      </div>
    </div>
  )
}
