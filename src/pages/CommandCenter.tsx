import { useState } from 'react'
import { Terminal, Send, Cpu } from 'lucide-react'
import Header from '../components/layout/Header'
import Card from '../components/ui/Card'

interface Message {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: string
}

const placeholderMessages: Message[] = [
  {
    id: '1',
    role: 'assistant',
    content: 'Fusion OS Command Center active. How can I assist you today?',
    timestamp: '09:00',
  },
  {
    id: '2',
    role: 'user',
    content: 'Give me a summary of this week\'s opportunities.',
    timestamp: '09:01',
  },
  {
    id: '3',
    role: 'assistant',
    content: 'You have 4 active opportunities totalling €68,500 in pipeline value. The Romano Group annual content strategy (€24,000) is in negotiation at 85% probability — highest priority for close this month. The Innovate SpA Q3 proposal (€12,000) is due Friday. I recommend prioritising the Romano Group contract today.',
    timestamp: '09:01',
  },
]

const quickCommands = [
  'Summarise today\'s tasks',
  'Show at-risk clients',
  'Pipeline by stage',
  'Draft follow-up email',
  'Monthly revenue recap',
  'Next meeting details',
]

export default function CommandCenter() {
  const [messages, setMessages] = useState<Message[]>(placeholderMessages)
  const [input, setInput] = useState('')

  const handleSend = () => {
    if (!input.trim()) return
    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
    }
    const assistantMsg: Message = {
      id: (Date.now() + 1).toString(),
      role: 'assistant',
      content: 'AI response coming soon. The OpenAI integration will be wired in Phase 2.',
      timestamp: new Date().toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }),
    }
    setMessages((prev) => [...prev, userMsg, assistantMsg])
    setInput('')
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  return (
    <div className="flex flex-col min-h-full">
      <Header title="Command Center" subtitle="AI-powered assistant · Phase 2" />

      <div className="flex flex-1 gap-4 p-6 overflow-hidden">
        {/* Chat */}
        <div className="flex flex-col flex-1 min-w-0">
          <Card padding={false} className="flex flex-col flex-1">
            {/* Header */}
            <div className="flex items-center gap-2.5 px-5 py-3.5 border-b border-zinc-800">
              <div className="flex items-center justify-center w-6 h-6 rounded-md bg-blue-600/20">
                <Cpu size={12} className="text-blue-400" />
              </div>
              <span className="text-xs font-medium text-zinc-400">Fusion AI</span>
              <span className="flex items-center gap-1 ml-auto">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                <span className="text-[10px] text-zinc-500">Placeholder · AI offline</span>
              </span>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-5 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] ${msg.role === 'user' ? 'order-1' : ''}`}>
                    <div className={`px-4 py-2.5 rounded-xl text-sm leading-relaxed ${
                      msg.role === 'user'
                        ? 'bg-blue-600 text-white rounded-br-sm'
                        : 'bg-zinc-800 text-zinc-200 rounded-bl-sm'
                    }`}>
                      {msg.content}
                    </div>
                    <p className={`text-[10px] text-zinc-600 mt-1 ${msg.role === 'user' ? 'text-right' : ''}`}>
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </div>

            {/* Input */}
            <div className="px-5 py-4 border-t border-zinc-800">
              <div className="flex items-end gap-2 bg-zinc-800 rounded-xl px-4 py-3">
                <textarea
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Ask anything about your business..."
                  rows={1}
                  className="flex-1 bg-transparent text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none resize-none"
                />
                <button
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="p-1.5 rounded-lg bg-blue-600 text-white hover:bg-blue-500 disabled:opacity-30 disabled:cursor-not-allowed transition-colors shrink-0"
                >
                  <Send size={14} />
                </button>
              </div>
              <p className="text-[10px] text-zinc-600 mt-1.5 text-center">Enter to send · Shift+Enter for new line</p>
            </div>
          </Card>
        </div>

        {/* Quick commands sidebar */}
        <div className="w-52 shrink-0 space-y-4">
          <Card>
            <div className="flex items-center gap-2 mb-3">
              <Terminal size={13} className="text-zinc-500" />
              <p className="text-xs font-semibold text-zinc-400 uppercase tracking-wide">Quick Commands</p>
            </div>
            <div className="space-y-1.5">
              {quickCommands.map((cmd) => (
                <button
                  key={cmd}
                  onClick={() => setInput(cmd)}
                  className="w-full text-left text-xs text-zinc-400 px-2.5 py-2 rounded-lg hover:bg-zinc-800 hover:text-zinc-200 transition-colors"
                >
                  {cmd}
                </button>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}
