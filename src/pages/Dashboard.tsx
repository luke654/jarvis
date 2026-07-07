import { Users, TrendingUp, DollarSign, AlertCircle, Zap, CheckSquare } from 'lucide-react'
import Header from '../components/layout/Header'
import StatCard from '../components/ui/StatCard'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { mockTasks, mockOpportunities, mockEvents, dashboardStats } from '../data/mock'

const pct = (curr: number, prev: number) => Math.round(((curr - prev) / prev) * 100)

const stageBadge = (stage: string) => {
  const map: Record<string, 'info' | 'warning' | 'success' | 'danger' | 'muted'> = {
    discovery: 'muted',
    proposal: 'info',
    negotiation: 'warning',
    'closed-won': 'success',
    'closed-lost': 'danger',
  }
  return map[stage] ?? 'default'
}

const priorityBadge = (p: string) => {
  const map: Record<string, 'danger' | 'warning' | 'info' | 'muted'> = {
    urgent: 'danger',
    high: 'warning',
    medium: 'info',
    low: 'muted',
  }
  return map[p] ?? 'default'
}

export default function Dashboard() {
  const openTasks = mockTasks.filter((t) => t.status !== 'done')
  const topOpps = mockOpportunities.filter((o) => o.stage !== 'closed-lost').slice(0, 4)
  const upcomingEvents = mockEvents.slice(0, 4)

  const { revenue, activeClients, openOpportunities, newLeads } = dashboardStats

  return (
    <div className="flex flex-col min-h-full">
      <Header
        title="Dashboard"
        subtitle={`Good morning, Luca · ${new Date().toLocaleDateString('en-GB', { weekday: 'long', day: 'numeric', month: 'long' })}`}
      />

      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        {/* Stats */}
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard
            label="Revenue (YTD)"
            value={revenue.current >= 1000000 ? `€${(revenue.current / 1000000).toFixed(1)}M` : `€${(revenue.current / 1000).toFixed(0)}k`}
            change={pct(revenue.current, revenue.previous)}
            icon={<DollarSign size={18} />}
          />
          <StatCard
            label="Active Clients"
            value={activeClients.current}
            change={pct(activeClients.current, activeClients.previous)}
            icon={<Users size={18} />}
          />
          <StatCard
            label="Pipeline Value"
            value={`€${(openOpportunities.current / 1000).toFixed(0)}k`}
            change={pct(openOpportunities.current, openOpportunities.previous)}
            icon={<TrendingUp size={18} />}
          />
          <StatCard
            label="New Leads"
            value={newLeads.current}
            change={pct(newLeads.current, newLeads.previous)}
            icon={<Zap size={18} />}
          />
        </div>

        {/* Main grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {/* Opportunities */}
          <Card className="xl:col-span-2" padding={false}>
            <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-zinc-800">
              <h2 className="text-sm font-semibold text-zinc-100">Active Opportunities</h2>
              <TrendingUp size={15} className="text-zinc-500" />
            </div>
            <div className="divide-y divide-zinc-800">
              {topOpps.map((opp) => (
                <div key={opp.id} className="flex items-center gap-4 px-5 py-3.5 hover:bg-zinc-800/30 transition-colors">
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-zinc-100 truncate">{opp.title}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">{opp.client}</p>
                  </div>
                  <div className="text-right shrink-0">
                    <p className="text-sm font-semibold text-zinc-100">€{opp.value.toLocaleString()}</p>
                    <p className="text-[11px] text-zinc-500">{opp.probability}% likely</p>
                  </div>
                  <Badge label={opp.stage.replace('-', ' ')} variant={stageBadge(opp.stage)} />
                </div>
              ))}
            </div>
          </Card>

          {/* Tasks */}
          <Card padding={false}>
            <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-zinc-800">
              <h2 className="text-sm font-semibold text-zinc-100">Open Tasks</h2>
              <span className="text-xs text-zinc-500">{openTasks.length} remaining</span>
            </div>
            <div className="divide-y divide-zinc-800">
              {openTasks.slice(0, 5).map((task) => (
                <div key={task.id} className="flex items-start gap-3 px-5 py-3.5 hover:bg-zinc-800/30 transition-colors">
                  <CheckSquare size={14} className="text-zinc-600 mt-0.5 shrink-0" />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-zinc-200 truncate">{task.title}</p>
                    <p className="text-[11px] text-zinc-500 mt-0.5">Due {task.dueDate}</p>
                  </div>
                  <Badge label={task.priority} variant={priorityBadge(task.priority)} />
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Calendar preview */}
        <Card padding={false}>
          <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-zinc-800">
            <h2 className="text-sm font-semibold text-zinc-100">Upcoming</h2>
            <AlertCircle size={15} className="text-zinc-500" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 divide-y md:divide-y-0 md:divide-x divide-zinc-800">
            {upcomingEvents.map((ev) => (
              <div key={ev.id} className="px-5 py-4 hover:bg-zinc-800/30 transition-colors">
                <div className="flex items-center gap-2 mb-1.5">
                  <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${ev.type === 'deadline' ? 'bg-red-500' : ev.type === 'meeting' ? 'bg-blue-500' : 'bg-emerald-500'}`} />
                  <p className="text-[11px] text-zinc-500 font-medium uppercase tracking-wide">{ev.type}</p>
                </div>
                <p className="text-sm font-medium text-zinc-100 leading-snug">{ev.title}</p>
                <p className="text-xs text-zinc-500 mt-1">{ev.date} · {ev.time}</p>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}
