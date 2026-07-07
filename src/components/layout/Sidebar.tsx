import { NavLink, useLocation } from 'react-router-dom'
import {
  LayoutDashboard,
  Terminal,
  Users,
  Briefcase,
  TrendingUp,
  CheckSquare,
  CalendarDays,
  FileBarChart2,
  MessageCircle,
  Search,
  DollarSign,
  Heart,
  Feather,
  Settings,
  ChevronRight,
  Zap,
} from 'lucide-react'

const navSections = [
  {
    label: 'Core',
    items: [
      { to: '/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
      { to: '/command-center', icon: Terminal, label: 'Command Center' },
    ],
  },
  {
    label: 'Business',
    items: [
      { to: '/crm/leads', icon: Users, label: 'CRM Leads' },
      { to: '/crm/clients', icon: Briefcase, label: 'CRM Clients' },
      { to: '/opportunities', icon: TrendingUp, label: 'Opportunities' },
      { to: '/tasks', icon: CheckSquare, label: 'Tasks' },
      { to: '/calendar', icon: CalendarDays, label: 'Calendar' },
    ],
  },
  {
    label: 'Intelligence',
    items: [
      { to: '/debrief', icon: FileBarChart2, label: 'Debrief' },
      { to: '/whatsapp', icon: MessageCircle, label: 'WhatsApp' },
      { to: '/prospecting', icon: Search, label: 'Prospecting' },
    ],
  },
  {
    label: 'Finance & Ops',
    items: [
      { to: '/cfo', icon: DollarSign, label: 'Fusion CFO' },
      { to: '/health', icon: Heart, label: 'Health' },
      { to: '/content', icon: Feather, label: 'Content' },
    ],
  },
  {
    label: 'System',
    items: [
      { to: '/settings', icon: Settings, label: 'Settings' },
    ],
  },
]

export default function Sidebar() {
  const location = useLocation()

  return (
    <aside className="flex flex-col w-60 min-h-screen bg-zinc-950 border-r border-zinc-800 shrink-0">
      {/* Logo */}
      <div className="flex items-center gap-2.5 px-5 py-5 border-b border-zinc-800">
        <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-blue-600">
          <Zap size={16} className="text-white" />
        </div>
        <div>
          <p className="text-sm font-semibold text-zinc-100 leading-none">Fusion OS</p>
          <p className="text-[10px] text-zinc-500 mt-0.5 leading-none">Assistant</p>
        </div>
      </div>

      {/* Nav */}
      <nav className="flex-1 overflow-y-auto py-4 px-3">
        {navSections.map((section) => (
          <div key={section.label} className="mb-5">
            <p className="px-2 mb-1 text-[10px] font-semibold uppercase tracking-widest text-zinc-600">
              {section.label}
            </p>
            <ul className="space-y-0.5">
              {section.items.map(({ to, icon: Icon, label }) => {
                const isActive = location.pathname === to || location.pathname.startsWith(to + '/')
                return (
                  <li key={to}>
                    <NavLink
                      to={to}
                      className={`flex items-center gap-2.5 px-2 py-2 rounded-lg text-sm font-medium transition-colors group ${
                        isActive
                          ? 'bg-blue-600/15 text-blue-400'
                          : 'text-zinc-400 hover:text-zinc-100 hover:bg-zinc-800/60'
                      }`}
                    >
                      <Icon size={15} className={isActive ? 'text-blue-400' : 'text-zinc-500 group-hover:text-zinc-300'} />
                      <span className="flex-1">{label}</span>
                      {isActive && <ChevronRight size={12} className="text-blue-500" />}
                    </NavLink>
                  </li>
                )
              })}
            </ul>
          </div>
        ))}
      </nav>

      {/* User footer */}
      <div className="px-3 py-3 border-t border-zinc-800">
        <div className="flex items-center gap-2.5 px-2 py-2 rounded-lg hover:bg-zinc-800/60 cursor-pointer transition-colors">
          <div className="w-7 h-7 rounded-full bg-blue-600 flex items-center justify-center text-xs font-semibold text-white shrink-0">
            L
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium text-zinc-200 truncate">Luca</p>
            <p className="text-[10px] text-zinc-500 truncate">Fusion Media</p>
          </div>
        </div>
      </div>
    </aside>
  )
}
