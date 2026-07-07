import { Settings as SettingsIcon, User, Shield, Bell, Database, Cpu, Globe } from 'lucide-react'
import Header from '../components/layout/Header'
import Card from '../components/ui/Card'

const sections = [
  {
    id: 'profile',
    icon: User,
    title: 'Profile',
    description: 'Your account information and preferences.',
    fields: [
      { label: 'Name', value: 'Luca', type: 'text' },
      { label: 'Email', value: 'luca@fusion-systems.it', type: 'email' },
      { label: 'Role', value: 'Admin', type: 'text' },
      { label: 'Company', value: 'Fusion Media', type: 'text' },
    ],
  },
  {
    id: 'integrations',
    icon: Database,
    title: 'Integrations',
    description: 'Connect external services and data sources.',
    integrations: [
      { name: 'Supabase', status: 'pending', desc: 'Database & auth — Phase 2' },
      { name: 'OpenAI', status: 'pending', desc: 'AI agents — Phase 2' },
      { name: 'WhatsApp Business API', status: 'pending', desc: 'Messaging — Phase 2' },
      { name: 'Google Calendar', status: 'pending', desc: 'Calendar sync — Phase 2' },
    ],
  },
]

export default function Settings() {
  return (
    <div className="flex flex-col min-h-full">
      <Header title="Settings" subtitle="Application configuration" />

      <div className="flex flex-1 gap-6 p-6 overflow-hidden">
        {/* Sidebar */}
        <nav className="w-44 shrink-0">
          <ul className="space-y-0.5">
            {[
              { icon: User, label: 'Profile' },
              { icon: Bell, label: 'Notifications' },
              { icon: Database, label: 'Integrations' },
              { icon: Cpu, label: 'AI Settings' },
              { icon: Shield, label: 'Security' },
              { icon: Globe, label: 'Appearance' },
            ].map(({ icon: Icon, label }) => (
              <li key={label}>
                <button className={`w-full flex items-center gap-2.5 px-3 py-2 rounded-lg text-sm transition-colors ${
                  label === 'Profile' ? 'bg-zinc-800 text-zinc-100' : 'text-zinc-400 hover:text-zinc-200 hover:bg-zinc-800/50'
                }`}>
                  <Icon size={14} />
                  {label}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Content */}
        <div className="flex-1 space-y-4 overflow-y-auto">
          <Card>
            <div className="flex items-center gap-2 mb-5">
              <User size={15} className="text-zinc-500" />
              <h2 className="text-sm font-semibold text-zinc-100">Profile</h2>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {sections[0].fields?.map((field) => (
                <div key={field.label}>
                  <label className="block text-xs font-medium text-zinc-400 mb-1.5">{field.label}</label>
                  <input
                    type={field.type}
                    defaultValue={field.value}
                    className="w-full px-3 py-2.5 rounded-lg bg-zinc-800 border border-zinc-700 text-zinc-200 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                  />
                </div>
              ))}
            </div>
            <div className="mt-5 pt-4 border-t border-zinc-800 flex justify-end">
              <button className="px-4 py-2 rounded-lg text-sm bg-blue-600 text-white hover:bg-blue-500 transition-colors">
                Save Changes
              </button>
            </div>
          </Card>

          <Card>
            <div className="flex items-center gap-2 mb-5">
              <Database size={15} className="text-zinc-500" />
              <h2 className="text-sm font-semibold text-zinc-100">Integrations</h2>
            </div>
            <div className="space-y-3">
              {sections[1].integrations?.map((int) => (
                <div key={int.name} className="flex items-center gap-4 p-3.5 rounded-lg bg-zinc-800/50 border border-zinc-800">
                  <SettingsIcon size={14} className="text-zinc-600 shrink-0" />
                  <div className="flex-1">
                    <p className="text-sm font-medium text-zinc-200">{int.name}</p>
                    <p className="text-xs text-zinc-500 mt-0.5">{int.desc}</p>
                  </div>
                  <span className="text-[11px] text-amber-400 bg-amber-500/10 px-2.5 py-1 rounded-full font-medium">
                    Not connected
                  </span>
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
