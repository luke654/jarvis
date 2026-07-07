import { FileBarChart2, Download } from 'lucide-react'
import Header from '../components/layout/Header'
import Card from '../components/ui/Card'
import StatCard from '../components/ui/StatCard'
import { dashboardStats } from '../data/mock'

const { revenue, activeClients, openOpportunities, conversionRate } = dashboardStats
const pct = (curr: number, prev: number) => Math.round(((curr - prev) / prev) * 100)

const highlights = [
  'Romano Group annual contract entering final negotiation — close expected by 20 July.',
  'TechCorp PPC campaign signed — kicks off 8 July.',
  'PixelWorks flagged at-risk: satisfaction score declined 2 months in a row.',
  'New leads up 67% vs May — LinkedIn outreach is performing.',
  'Missed target: proposal response time averaged 5 days vs 2-day SLA.',
]

export default function Debrief() {
  return (
    <div className="flex flex-col min-h-full">
      <Header title="Debrief" subtitle="June 2026 · Monthly performance review" />

      <div className="flex-1 p-6 space-y-6 overflow-y-auto">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-semibold text-zinc-300">June 2026</h2>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors">
            <Download size={12} />
            Export
          </button>
        </div>

        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard label="Revenue (YTD)" value={`€${(revenue.current / 1000).toFixed(0)}k`} change={pct(revenue.current, revenue.previous)} />
          <StatCard label="Active Clients" value={activeClients.current} change={pct(activeClients.current, activeClients.previous)} />
          <StatCard label="Pipeline" value={`€${(openOpportunities.current / 1000).toFixed(0)}k`} change={pct(openOpportunities.current, openOpportunities.previous)} />
          <StatCard label="Conversion Rate" value={`${conversionRate.current}%`} change={pct(conversionRate.current, conversionRate.previous)} />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          <Card>
            <div className="flex items-center gap-2 mb-4">
              <FileBarChart2 size={14} className="text-zinc-500" />
              <h2 className="text-sm font-semibold text-zinc-100">Key Highlights</h2>
            </div>
            <ul className="space-y-3">
              {highlights.map((h, i) => (
                <li key={i} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <p className="text-sm text-zinc-300 leading-relaxed">{h}</p>
                </li>
              ))}
            </ul>
          </Card>

          <Card>
            <h2 className="text-sm font-semibold text-zinc-100 mb-4">Revenue by Client (June)</h2>
            <div className="space-y-3">
              {[
                { name: 'Romano Group', value: 6000 },
                { name: 'Innovate SpA', value: 4000 },
                { name: 'Greco Consulting', value: 3000 },
                { name: 'PixelWorks', value: 1250 },
              ].map((item) => {
                const max = 6000
                return (
                  <div key={item.name} className="flex items-center gap-3">
                    <p className="text-xs text-zinc-400 w-36 truncate shrink-0">{item.name}</p>
                    <div className="flex-1 h-2 bg-zinc-800 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-blue-600 rounded-full"
                        style={{ width: `${(item.value / max) * 100}%` }}
                      />
                    </div>
                    <p className="text-xs font-medium text-zinc-300 w-14 text-right shrink-0">€{item.value.toLocaleString()}</p>
                  </div>
                )
              })}
            </div>
          </Card>
        </div>

        <Card>
          <h2 className="text-sm font-semibold text-zinc-100 mb-4">AI Summary</h2>
          <div className="bg-zinc-800/50 rounded-lg p-4 border border-zinc-700/50">
            <p className="text-sm text-zinc-300 leading-relaxed italic">
              June was a strong month for new business development — lead volume increased 67% and two major deals (Romano Group and TechCorp) are on track to close in July.
              However, account health requires attention: PixelWorks is at risk and proposal response time exceeded SLA. Priority actions for July: close Romano Group, resolve PixelWorks satisfaction issue, and tighten proposal turnaround to under 48 hours.
            </p>
            <p className="text-[11px] text-zinc-600 mt-3">AI summary placeholder · OpenAI integration coming in Phase 2</p>
          </div>
        </Card>
      </div>
    </div>
  )
}
