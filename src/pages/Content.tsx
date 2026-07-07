import { Feather, Plus, Instagram, Linkedin, Youtube } from 'lucide-react'
import Header from '../components/layout/Header'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'

const contentItems = [
  { id: '1', title: 'Why personal branding matters in 2026', platform: 'LinkedIn', status: 'published' as const, date: '2026-07-01', engagement: '2.4k' },
  { id: '2', title: 'Client success story: Romano Group', platform: 'Instagram', status: 'scheduled' as const, date: '2026-07-10', engagement: '—' },
  { id: '3', title: 'Fusion Media agency reel Q2', platform: 'YouTube', status: 'draft' as const, date: '2026-07-15', engagement: '—' },
  { id: '4', title: '5 mistakes businesses make with social media', platform: 'LinkedIn', status: 'draft' as const, date: '—', engagement: '—' },
  { id: '5', title: 'Behind the scenes — video shoot', platform: 'Instagram', status: 'published' as const, date: '2026-06-28', engagement: '1.1k' },
]

const statusVariant = (s: string) => {
  const map = { published: 'success', scheduled: 'info', draft: 'muted' } as const
  return map[s as keyof typeof map] ?? 'default'
}

const PlatformIcon = ({ platform }: { platform: string }) => {
  if (platform === 'LinkedIn') return <Linkedin size={13} className="text-blue-400" />
  if (platform === 'Instagram') return <Instagram size={13} className="text-pink-400" />
  if (platform === 'YouTube') return <Youtube size={13} className="text-red-400" />
  return null
}

export default function Content() {
  return (
    <div className="flex flex-col min-h-full">
      <Header title="Content" subtitle="Content calendar · AI generation in Phase 2" />

      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        <div className="flex items-center justify-between">
          <div className="flex gap-2">
            {['All', 'Published', 'Scheduled', 'Draft'].map((f) => (
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
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-blue-600 text-white hover:bg-blue-500 transition-colors">
            <Plus size={12} />
            New Content
          </button>
        </div>

        <Card padding={false}>
          <table className="w-full">
            <thead>
              <tr className="border-b border-zinc-800">
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wide">Title</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wide">Platform</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wide">Status</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wide">Date</th>
                <th className="text-left px-5 py-3 text-[11px] font-semibold text-zinc-500 uppercase tracking-wide">Engagement</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-zinc-800">
              {contentItems.map((item) => (
                <tr key={item.id} className="hover:bg-zinc-800/30 transition-colors cursor-pointer">
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-2.5">
                      <Feather size={13} className="text-zinc-600 shrink-0" />
                      <p className="text-sm font-medium text-zinc-100">{item.title}</p>
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <div className="flex items-center gap-1.5 text-sm text-zinc-400">
                      <PlatformIcon platform={item.platform} />
                      {item.platform}
                    </div>
                  </td>
                  <td className="px-5 py-3.5">
                    <Badge label={item.status} variant={statusVariant(item.status)} />
                  </td>
                  <td className="px-5 py-3.5 text-sm text-zinc-500">{item.date}</td>
                  <td className="px-5 py-3.5 text-sm text-zinc-400">{item.engagement}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </Card>
      </div>
    </div>
  )
}
