import { TrendingUp, Plus } from 'lucide-react'
import Header from '../components/layout/Header'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { mockOpportunities } from '../data/mock'
import type { Opportunity } from '../types'

const stageVariant = (s: Opportunity['stage']) => {
  const map = {
    discovery: 'muted',
    proposal: 'info',
    negotiation: 'warning',
    'closed-won': 'success',
    'closed-lost': 'danger',
  } as const
  return map[s]
}

const stages: Opportunity['stage'][] = ['discovery', 'proposal', 'negotiation', 'closed-won', 'closed-lost']

export default function Opportunities() {
  const pipeline = mockOpportunities.filter((o) => !o.stage.startsWith('closed'))
  const total = pipeline.reduce((sum, o) => sum + o.value, 0)
  const weighted = pipeline.reduce((sum, o) => sum + o.value * (o.probability / 100), 0)

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Opportunities" subtitle={`Pipeline: €${total.toLocaleString()} · Weighted: €${Math.round(weighted).toLocaleString()}`} />

      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        <div className="flex items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {['All', ...stages.map((s) => s.replace('-', ' '))].map((f) => (
              <button
                key={f}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium capitalize transition-colors ${
                  f === 'All' ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/50'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-blue-600 text-white hover:bg-blue-500 transition-colors">
            <Plus size={12} />
            New Opportunity
          </button>
        </div>

        <Card padding={false}>
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wide">Title</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wide">Client</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wide">Value</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wide">Stage</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wide">Probability</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wide">Close Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {mockOpportunities.map((opp) => (
                <tr key={opp.id} className="hover:bg-zinc-800/30 transition-colors cursor-pointer">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <TrendingUp size={13} className="text-zinc-600 shrink-0" />
                      <p className="text-sm font-medium text-zinc-100">{opp.title}</p>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-zinc-300">{opp.client}</td>
                  <td className="px-5 py-3.5 text-sm font-semibold text-zinc-100">€{opp.value.toLocaleString()}</td>
                  <td className="px-5 py-3.5">
                    <Badge label={opp.stage.replace('-', ' ')} variant={stageVariant(opp.stage)} />
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="flex-1 h-1.5 bg-zinc-800 rounded-full overflow-hidden max-w-16">
                        <div
                          className="h-full bg-blue-500 rounded-full"
                          style={{ width: `${opp.probability}%` }}
                        />
                      </div>
                      <span className="text-xs text-zinc-400">{opp.probability}%</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-zinc-500">{opp.closeDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  )
}
