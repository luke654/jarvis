import { TrendingUp, TrendingDown, Minus } from 'lucide-react'
import Card from './Card'

interface StatCardProps {
  label: string
  value: string | number
  change?: number
  prefix?: string
  suffix?: string
  icon?: React.ReactNode
}

export default function StatCard({ label, value, change, prefix, suffix, icon }: StatCardProps) {
  const isPositive = change !== undefined && change > 0
  const isNegative = change !== undefined && change < 0
  const isNeutral = change === undefined || change === 0

  return (
    <Card>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-xs text-zinc-500 font-medium uppercase tracking-wide">{label}</p>
          <p className="mt-1.5 text-2xl font-semibold text-zinc-100">
            {prefix}<span>{value}</span>{suffix}
          </p>
          {change !== undefined && (
            <div className={`flex items-center gap-1 mt-2 text-xs font-medium ${isPositive ? 'text-emerald-400' : isNegative ? 'text-red-400' : 'text-zinc-500'}`}>
              {isPositive && <TrendingUp size={12} />}
              {isNegative && <TrendingDown size={12} />}
              {isNeutral && <Minus size={12} />}
              <span>{isPositive ? '+' : ''}{change}% vs last month</span>
            </div>
          )}
        </div>
        {icon && (
          <div className="p-2 rounded-lg bg-zinc-800/60 text-zinc-500">
            {icon}
          </div>
        )}
      </div>
    </Card>
  )
}
