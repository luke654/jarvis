import { UserPlus, Filter } from 'lucide-react'
import Header from '../../components/layout/Header'
import Card from '../../components/ui/Card'
import Badge from '../../components/ui/Badge'
import { mockLeads } from '../../data/mock'
import type { Lead } from '../../types'

const statusVariant = (s: Lead['status']) => {
  const map = { new: 'info', contacted: 'warning', qualified: 'success', lost: 'danger' } as const
  return map[s]
}

export default function Leads() {
  return (
    <div className="flex flex-col min-h-full">
      <Header title="CRM · Leads" subtitle={`${mockLeads.length} leads in pipeline`} />

      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {['All', 'New', 'Contacted', 'Qualified', 'Lost'].map((f) => (
              <button
                key={f}
                className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-colors ${
                  f === 'All' ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-500 hover:text-zinc-200 hover:bg-zinc-800/50'
                }`}
              >
                {f}
              </button>
            ))}
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800 transition-colors">
              <Filter size={12} />
              Filter
            </button>
            <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-blue-600 text-white hover:bg-blue-500 transition-colors">
              <UserPlus size={12} />
              Add Lead
            </button>
          </div>
        </div>

        <Card padding={false}>
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wide">Name</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wide">Company</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wide">Source</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wide">Status</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wide">Added</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {mockLeads.map((lead) => (
                <tr key={lead.id} className="hover:bg-zinc-800/30 transition-colors cursor-pointer">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-3">
                      <div className="w-7 h-7 rounded-full bg-zinc-800 flex items-center justify-center text-xs font-semibold text-zinc-400 shrink-0">
                        {lead.name[0]}
                      </div>
                      <div>
                        <p className="text-sm font-medium text-zinc-100">{lead.name}</p>
                        <p className="text-[11px] text-zinc-500">{lead.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-5 py-3.5 text-sm text-zinc-300">{lead.company}</td>
                  <td className="px-5 py-3.5 text-sm text-zinc-400">{lead.source}</td>
                  <td className="px-5 py-3.5">
                    <Badge label={lead.status} variant={statusVariant(lead.status)} />
                  </td>
                  <td className="px-5 py-3.5 text-sm text-zinc-500">{lead.createdAt}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  )
}
