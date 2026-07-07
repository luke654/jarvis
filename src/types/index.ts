export interface Lead {
  id: string
  name: string
  company: string
  email: string
  phone: string
  status: 'new' | 'contacted' | 'qualified' | 'lost'
  source: string
  createdAt: string
}

export interface Client {
  id: string
  name: string
  company: string
  email: string
  phone: string
  revenue: number
  status: 'active' | 'inactive' | 'at-risk'
  since: string
}

export interface Opportunity {
  id: string
  title: string
  client: string
  value: number
  stage: 'discovery' | 'proposal' | 'negotiation' | 'closed-won' | 'closed-lost'
  probability: number
  closeDate: string
}

export interface Task {
  id: string
  title: string
  description: string
  priority: 'low' | 'medium' | 'high' | 'urgent'
  status: 'todo' | 'in-progress' | 'done'
  dueDate: string
  assignee: string
}

export interface CalendarEvent {
  id: string
  title: string
  date: string
  time: string
  type: 'meeting' | 'call' | 'deadline' | 'reminder'
  description: string
}

export interface StatCard {
  label: string
  value: string | number
  change: number
  unit?: string
}
