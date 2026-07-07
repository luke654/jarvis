import { CheckSquare, Plus, Square } from 'lucide-react'
import Header from '../components/layout/Header'
import Card from '../components/ui/Card'
import Badge from '../components/ui/Badge'
import { mockTasks } from '../data/mock'
import type { Task } from '../types'

const priorityVariant = (p: Task['priority']) => {
  const map = { urgent: 'danger', high: 'warning', medium: 'info', low: 'muted' } as const
  return map[p]
}

const statusGroups: { label: string; status: Task['status'] }[] = [
  { label: 'To Do', status: 'todo' },
  { label: 'In Progress', status: 'in-progress' },
  { label: 'Done', status: 'done' },
]

export default function Tasks() {
  const done = mockTasks.filter((t) => t.status === 'done').length

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Tasks" subtitle={`${done}/${mockTasks.length} completed`} />

      <div className="flex-1 p-6 space-y-4 overflow-y-auto">
        <div className="flex items-center justify-end">
          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs bg-blue-600 text-white hover:bg-blue-500 transition-colors">
            <Plus size={12} />
            New Task
          </button>
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          {statusGroups.map(({ label, status }) => {
            const tasks = mockTasks.filter((t) => t.status === status)
            return (
              <div key={status}>
                <div className="flex items-center gap-2 mb-3">
                  <h2 className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">{label}</h2>
                  <span className="text-[11px] text-zinc-600 bg-zinc-800 rounded-full px-1.5 py-0.5">{tasks.length}</span>
                </div>
                <div className="space-y-2">
                  {tasks.length === 0 && (
                    <Card className="border-dashed">
                      <p className="text-xs text-zinc-600 text-center py-2">No tasks</p>
                    </Card>
                  )}
                  {tasks.map((task) => (
                    <Card key={task.id} className="hover:border-zinc-700 cursor-pointer transition-colors">
                      <div className="flex items-start gap-2.5">
                        {task.status === 'done'
                          ? <CheckSquare size={14} className="text-emerald-500 mt-0.5 shrink-0" />
                          : <Square size={14} className="text-zinc-600 mt-0.5 shrink-0" />
                        }
                        <div className="flex-1 min-w-0">
                          <p className={`text-sm font-medium leading-snug ${task.status === 'done' ? 'text-zinc-500 line-through' : 'text-zinc-100'}`}>
                            {task.title}
                          </p>
                          <p className="text-[11px] text-zinc-500 mt-1 leading-relaxed">{task.description}</p>
                          <div className="flex items-center gap-2 mt-2.5">
                            <Badge label={task.priority} variant={priorityVariant(task.priority)} />
                            <span className="text-[11px] text-zinc-600">Due {task.dueDate}</span>
                          </div>
                        </div>
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </div>
  )
}
