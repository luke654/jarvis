import { Search, Filter, Linkedin, Globe } from 'lucide-react'
import Header from '../components/layout/Header'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'

const prospects = [
  { id: '1', name: 'Federica Moretti', title: 'CEO', company: 'GreenBrand Agency', industry: 'Marketing', source: 'LinkedIn', score: 92, status: 'hot' as const },
  { id: '2', name: 'Paolo Ferrara', title: 'Marketing Director', company: 'Ferrara Group', industry: 'Retail', source: 'LinkedIn', score: 78, status: 'warm' as const },
  { id: '3', name: 'Valentina Costa', title: 'Founder', company: 'Costa Digital', industry: 'E-commerce', source: 'Website', score: 65, status: 'warm' as const },
  { id: '4', name: 'Simone Rizzo', title: 'CMO', company: 'Rizzo Enterprise', industry: 'Finance', source: 'LinkedIn', score: 45, status: 'cold' as const },
]

const statusVariant = (s: string) => {
  const map = { hot: 'danger', warm: 'warning', cold: 'muted' } as const
  return map[s as keyof typeof map] ?? 'default'
}

export default function Prospecting() {
  return (
    <div className="flex flex-col min-h-full">
      <Header title="Prospecting" subtitle="AI-powered lead discovery · Phase 2" />

      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        <Card>
          <div className="flex items-center gap-3">
            <div className="flex-1 flex items-center gap-2 bg-zinc-800 rounded-lg px-3 py-2.5">
              <Search size={13} className="text-zinc-500" />
              <input
                placeholder="Search by name, company, industry, or location..."
                className="flex-1 bg-transparent text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none"
              />
            </div>
            <button className="flex items-center gap-1.5 px-3 py-2.5 rounded-lg text-xs text-zinc-400 hover:text-zinc-200 bg-zinc-800 hover:bg-zinc-700 transition-colors">
              <Filter size={12} />
              Filters
            </button>
            <button className="flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-xs bg-blue-600 text-white hover:bg-blue-500 transition-colors">
              <Linkedin size={12} />
              Import from LinkedIn
            </button>
          </div>
          <p className="text-[11px] text-zinc-600 mt-2">AI prospect scoring and LinkedIn integration coming in Phase 2</p>
        </Card>

        <Card padding={false}>
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wide">Prospect</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wide">Title</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wide">Industry</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wide">Source</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wide">Score</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wide">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {prospects.map((p) => (
                <tr key={p.id} className="hover:bg-zinc-800/30 transition-colors cursor-pointer">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-semibold text-zinc-400 shrink-0">
                        {p.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-100">{p.name}</p>
                        <p className="text-[11px] text-zinc-500">{p.company}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-zinc-300">{p.title}</td>
                  <td className="px-5 py-3.5 text-sm text-zinc-400">{p.industry}</td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5 text-xs text-zinc-400">
                      {p.source === 'LinkedIn' ? <Linkedin size={12} /> : <Globe size={12} />}
                      {p.source}
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2">
                      <div className="w-12 h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                        <div className="h-full bg-blue-500 rounded-full" style={{ width: `${p.score}%` }} />
                      </div>
                      <span className="text-xs text-zinc-400">{p.score}</span>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge label={p.status} variant={statusVariant(p.status)} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  )
}
