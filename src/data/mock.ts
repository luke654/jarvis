import type { Lead, Client, Opportunity, Task, CalendarEvent } from '../types'

export const mockLeads: Lead[] = [
  { id: '1', name: 'Marco Rossi', company: 'TechCorp SRL', email: 'marco@techcorp.it', phone: '+39 02 1234567', status: 'new', source: 'LinkedIn', createdAt: '2026-07-01' },
  { id: '2', name: 'Giulia Ferrari', company: 'DigitalWave', email: 'giulia@digitalwave.it', phone: '+39 02 7654321', status: 'contacted', source: 'Referral', createdAt: '2026-06-28' },
  { id: '3', name: 'Alessandro Bianchi', company: 'MediaForge', email: 'a.bianchi@mediaforge.it', phone: '+39 02 9876543', status: 'qualified', source: 'Cold Outreach', createdAt: '2026-06-25' },
  { id: '4', name: 'Sofia Conti', company: 'StartupNest', email: 'sofia@startupnest.io', phone: '+39 02 5551234', status: 'new', source: 'Website', createdAt: '2026-07-03' },
  { id: '5', name: 'Luca Martini', company: 'BrandLab Italia', email: 'l.martini@brandlab.it', phone: '+39 02 3334444', status: 'lost', source: 'Event', createdAt: '2026-06-10' },
]

export const mockClients: Client[] = [
  { id: '1', name: 'Roberto Esposito', company: 'Innovate SpA', email: 'roberto@innovate.it', phone: '+39 02 1111222', revenue: 48000, status: 'active', since: '2024-03-15' },
  { id: '2', name: 'Chiara Romano', company: 'Romano Group', email: 'chiara@romanogroup.it', phone: '+39 02 2223333', revenue: 72000, status: 'active', since: '2023-09-01' },
  { id: '3', name: 'Davide Ricci', company: 'PixelWorks', email: 'davide@pixelworks.it', phone: '+39 02 4445555', revenue: 15000, status: 'at-risk', since: '2025-01-20' },
  { id: '4', name: 'Elena Greco', company: 'Greco Consulting', email: 'elena@grecoconsulting.it', phone: '+39 02 6667777', revenue: 36000, status: 'active', since: '2024-11-08' },
  { id: '5', name: 'Matteo Bruno', company: 'Bruno & Partners', email: 'matteo@brunopartners.it', phone: '+39 02 8889999', revenue: 0, status: 'inactive', since: '2023-05-12' },
]

export const mockOpportunities: Opportunity[] = [
  { id: '1', title: 'Social Media Management Q3', client: 'Innovate SpA', value: 12000, stage: 'proposal', probability: 70, closeDate: '2026-07-31' },
  { id: '2', title: 'Brand Redesign Package', client: 'StartupNest', value: 8500, stage: 'discovery', probability: 30, closeDate: '2026-08-15' },
  { id: '3', title: 'Annual Content Strategy', client: 'Romano Group', value: 24000, stage: 'negotiation', probability: 85, closeDate: '2026-07-20' },
  { id: '4', title: 'Video Production Series', client: 'MediaForge', value: 18000, stage: 'proposal', probability: 55, closeDate: '2026-08-01' },
  { id: '5', title: 'PPC Campaign Management', client: 'TechCorp SRL', value: 6000, stage: 'closed-won', probability: 100, closeDate: '2026-07-05' },
]

export const mockTasks: Task[] = [
  { id: '1', title: 'Send Q3 proposal to Innovate SpA', description: 'Finalize and send the social media management proposal.', priority: 'urgent', status: 'todo', dueDate: '2026-07-08', assignee: 'Luca' },
  { id: '2', title: 'Review Romano Group contract', description: 'Go through revised terms with legal.', priority: 'high', status: 'in-progress', dueDate: '2026-07-10', assignee: 'Luca' },
  { id: '3', title: 'Update CRM with new leads', description: 'Add leads from the Milan event last week.', priority: 'medium', status: 'todo', dueDate: '2026-07-09', assignee: 'Luca' },
  { id: '4', title: 'Prepare monthly debrief slides', description: 'June performance deck for internal review.', priority: 'medium', status: 'in-progress', dueDate: '2026-07-12', assignee: 'Luca' },
  { id: '5', title: 'Follow up with PixelWorks', description: 'Check in on project satisfaction — at-risk status.', priority: 'high', status: 'todo', dueDate: '2026-07-08', assignee: 'Luca' },
  { id: '6', title: 'Schedule onboarding call — BrandLab', description: 'New client kick-off call once contract is signed.', priority: 'low', status: 'todo', dueDate: '2026-07-15', assignee: 'Luca' },
]

export const mockEvents: CalendarEvent[] = [
  { id: '1', title: 'Kick-off Call — TechCorp SRL', date: '2026-07-08', time: '10:00', type: 'call', description: 'PPC campaign kick-off with Marco Rossi.' },
  { id: '2', title: 'Internal Review — June Debrief', date: '2026-07-09', time: '14:00', type: 'meeting', description: 'Monthly performance debrief with team.' },
  { id: '3', title: 'Proposal Deadline — Innovate SpA', date: '2026-07-10', time: '09:00', type: 'deadline', description: 'Q3 social media proposal must be sent.' },
  { id: '4', title: 'Contract Signing — Romano Group', date: '2026-07-15', time: '11:00', type: 'meeting', description: 'Annual content strategy contract signing.' },
  { id: '5', title: 'Check-in — PixelWorks', date: '2026-07-11', time: '16:00', type: 'call', description: 'Account health check — at-risk client.' },
]

export const dashboardStats = {
  revenue: { current: 1000000, previous: 142000 },
  activeClients: { current: 4, previous: 3 },
  openOpportunities: { current: 68500, previous: 54000 },
  tasksOverdue: { current: 2, previous: 4 },
  newLeads: { current: 5, previous: 3 },
  conversionRate: { current: 62, previous: 55 },
}
