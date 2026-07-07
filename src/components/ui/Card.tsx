import { type ReactNode } from 'react'

interface CardProps {
  children: ReactNode
  className?: string
  padding?: boolean
}

export default function Card({ children, className = '', padding = true }: CardProps) {
  return (
    <div className={`bg-zinc-900 border border-zinc-800 rounded-xl ${padding ? 'p-5' : ''} ${className}`}>
      {children}
    </div>
  )
}
