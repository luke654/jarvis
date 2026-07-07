import { DollarSign, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react'
import Header from '../components/layout/Header'
import Card from '../components/ui/Card'
import StatCard from '../components/ui/StatCard'

const cashFlowData = [
  { month: 'Feb', income: 12000, expenses: 7500 },
  { month: 'Mar', income: 15000, expenses: 8200 },
  { month: 'Apr', income: 18000, expenses: 9100 },
  { month: 'May', income: 14000, expenses: 7800 },
  { month: 'Jun', income: 21000, expenses: 10500 },
  { month: 'Jul', income: 16000, expenses: 8900 },
]

const expenseCategories = [
  { name: 'Tools & Software', amount: 2400, pct: 27 },
  { name: 'Freelancers', amount: 3600, pct: 40 },
  { name: 'Advertising', amount: 1500, pct: 17 },
  { name: 'Operations', amount: 1400, pct: 16 },
]

export default function FusionCFO() {
  const maxVal = Math.max(...cashFlowData.map((d) => d.income))

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Fusion CFO" subtitle="Financial overview · Phase 2 for full accounting" />

      <div className="flex-1 p-6 space-y-5 overflow-y-auto">
        <div className="grid grid-cols-2 xl:grid-cols-4 gap-4">
          <StatCard label="Revenue (Jun)" value="€21,000" change={50} icon={<TrendingUp size={18} />} />
          <StatCard label="Expenses (Jun)" value="€10,500" change={15} icon={<TrendingDown size={18} />} />
          <StatCard label="Net Profit (Jun)" value="€10,500" change={98} icon={<DollarSign size={18} />} />
          <StatCard label="Margin" value="50%" change={12} />
        </div>

        <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
          <Card className="xl:col-span-2">
            <h2 className="text-sm font-semibold text-zinc-100 mb-5">Cash Flow — Last 6 Months</h2>
            <div className="flex items-end gap-3 h-36">
              {cashFlowData.map((d) => (
                <div key={d.month} className="flex-1 flex flex-col items-center gap-1">
                  <div className="w-full flex items-end gap-1 h-28">
                    <div
                      className="flex-1 bg-blue-600 rounded-t-sm"
                      style={{ height: `${(d.income / maxVal) * 100}%` }}
                    />
                    <div
                      className="flex-1 bg-zinc-700 rounded-t-sm"
                      style={{ height: `${(d.expenses / maxVal) * 100}%` }}
                    />
                  </div>
                  <p className="text-[10px] text-zinc-500">{d.month}</p>
                </div>
              ))}
            </div>
            <div className="flex items-center gap-4 mt-3">
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-blue-600" /><span className="text-[11px] text-zinc-400">Income</span></div>
              <div className="flex items-center gap-1.5"><span className="w-2.5 h-2.5 rounded-sm bg-zinc-700" /><span className="text-[11px] text-zinc-400">Expenses</span></div>
            </div>
          </Card>

          <Card>
            <h2 className="text-sm font-semibold text-zinc-100 mb-4">Expenses by Category</h2>
            <div className="space-y-4">
              {expenseCategories.map((c) => (
                <div key={c.name}>
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-xs text-zinc-400">{c.name}</p>
                    <p className="text-xs font-medium text-zinc-300">€{c.amount.toLocaleString()}</p>
                  </div>
                  <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden">
                    <div className="h-full bg-blue-600 rounded-full" style={{ width: `${c.pct}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </div>

        <Card>
          <div className="flex items-start gap-3">
            <AlertCircle size={16} className="text-amber-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-zinc-200">Full CFO Integration — Phase 2</p>
              <p className="text-xs text-zinc-500 mt-1 leading-relaxed">
                Automated P&L, invoice tracking, tax forecasting, and bank reconciliation will be available once the Supabase and accounting API integrations are complete.
              </p>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
