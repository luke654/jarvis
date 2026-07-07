import { Heart, Activity, Moon, Droplets } from 'lucide-react'
import Header from '../components/layout/Header'
import Card from '../components/ui/Card'
import StatCard from '../components/ui/StatCard'

const weekData = [
  { day: 'Mon', steps: 8200, sleep: 7.5, water: 2.0 },
  { day: 'Tue', steps: 6100, sleep: 6.0, water: 1.5 },
  { day: 'Wed', steps: 9800, sleep: 8.0, water: 2.5 },
  { day: 'Thu', steps: 7400, sleep: 7.0, water: 1.8 },
  { day: 'Fri', steps: 11200, sleep: 7.5, water: 2.2 },
  { day: 'Sat', steps: 5000, sleep: 9.0, water: 1.2 },
  { day: 'Sun', steps: 3200, sleep: 8.5, water: 1.5 },
]

const maxSteps = Math.max(...weekData.map((d) => d.steps))

export default function Health() {
  const avgSleep = (weekData.reduce((s, d) => s + d.sleep, 0) / weekData.length).toFixed(1)
  const avgSteps = Math.round(weekData.reduce((s, d) => s + d.steps, 0) / weekData.length)

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Health" subtitle="Personal wellness tracking · Phase 2 for wearable sync" />

      <div className="flex-1 p-6 space-y-5 overflow-y-auto">
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard label="Avg Steps/day" value={avgSteps.toLocaleString()} change={8} icon={<Activity size={18} />} />
          <StatCard label="Avg Sleep" value={`${avgSleep}h`} change={-5} icon={<Moon size={18} />} />
          <StatCard label="Avg Water" value="1.8L" change={12} icon={<Droplets size={18} />} />
          <StatCard label="Active Days" value="5 / 7" change={0} icon={<Heart size={18} />} />
        </div>

        <Card>
          <h2 className="text-sm font-semibold text-zinc-100 mb-5">Steps — This Week</h2>
          <div className="flex items-end gap-3 h-32">
            {weekData.map((d) => (
              <div key={d.day} className="flex-1 flex flex-col items-center gap-1.5">
                <p className="text-[10px] text-zinc-500">{d.steps.toLocaleString()}</p>
                <div className="w-full flex flex-col justify-end" style={{ height: '88px' }}>
                  <div
                    className="w-full bg-blue-600 rounded-t-sm transition-all"
                    style={{ height: `${(d.steps / maxSteps) * 88}px` }}
                  />
                </div>
                <p className="text-[10px] text-zinc-500">{d.day}</p>
              </div>
            ))}
          </div>
        </Card>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <Card>
            <h2 className="text-sm font-semibold text-zinc-100 mb-4">Sleep — This Week</h2>
            <div className="space-y-2.5">
              {weekData.map((d) => (
                <div key={d.day} className="flex items-center gap-3">
                  <p className="text-xs text-zinc-500 w-8 shrink-0">{d.day}</p>
                  <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-indigo-500 rounded-full" style={{ width: `${(d.sleep / 9) * 100}%` }} />
                  </div>
                  <p className="text-xs text-zinc-400 w-8 text-right shrink-0">{d.sleep}h</p>
                </div>
              ))}
            </div>
          </Card>

          <Card>
            <h2 className="text-sm font-semibold text-zinc-100 mb-4">Goals</h2>
            <div className="space-y-4">
              {[
                { label: 'Daily Steps', target: 10000, current: 7271, unit: 'steps' },
                { label: 'Sleep', target: 8, current: parseFloat(avgSleep), unit: 'h/night' },
                { label: 'Water Intake', target: 2.5, current: 1.8, unit: 'L/day' },
              ].map((g) => (
                <div key={g.label}>
                  <div className="flex items-center justify-between mb-1.5">
                    <p className="text-xs text-zinc-400">{g.label}</p>
                    <p className="text-xs text-zinc-500">{g.current} / {g.target} {g.unit}</p>
                  </div>
                  <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full ${g.current >= g.target ? 'bg-emerald-500' : 'bg-blue-600'}`}
                      style={{ width: `${Math.min((g.current / g.target) * 100, 100)}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
