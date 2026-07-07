import { MessageCircle, Search, Send } from 'lucide-react'
import Header from '../components/layout/Header'
import Card from '../components/ui/Card'

const mockChats = [
  { id: '1', name: 'Marco Rossi', lastMessage: 'Perfetto, ci sentiamo domani!', time: '10:24', unread: 2, initials: 'MR' },
  { id: '2', name: 'Romano Group', lastMessage: 'Ho letto la proposta, molto interessante.', time: '09:15', unread: 0, initials: 'RG' },
  { id: '3', name: 'Giulia Ferrari', lastMessage: 'Puoi mandarmi il preventivo?', time: 'Ieri', unread: 1, initials: 'GF' },
  { id: '4', name: 'Alessandro B.', lastMessage: 'Ok, ci aggiorniamo la prossima settimana.', time: 'Ieri', unread: 0, initials: 'AB' },
]

const mockMessages = [
  { id: '1', from: 'Marco Rossi', content: 'Ciao Luca! Ho visto il materiale che hai mandato.', time: '10:10', mine: false },
  { id: '2', from: 'me', content: 'Ottimo! Hai avuto modo di valutare la proposta?', time: '10:12', mine: true },
  { id: '3', from: 'Marco Rossi', content: 'Sì, sembra interessante. Possiamo discuterne domani?', time: '10:20', mine: false },
  { id: '4', from: 'me', content: 'Certo! Che ora ti va bene?', time: '10:21', mine: true },
  { id: '5', from: 'Marco Rossi', content: 'Perfetto, ci sentiamo domani!', time: '10:24', mine: false },
]

export default function WhatsApp() {
  return (
    <div className="flex flex-col min-h-full">
      <Header title="WhatsApp" subtitle="Business messaging · Integration coming in Phase 2" />

      <div className="flex flex-1 overflow-hidden p-6 gap-4">
        {/* Chat list */}
        <Card padding={false} className="w-72 shrink-0 flex flex-col">
          <div className="px-4 py-3 border-b border-zinc-800">
            <div className="flex items-center gap-2 bg-zinc-800 rounded-lg px-3 py-2">
              <Search size={13} className="text-zinc-500" />
              <input
                placeholder="Search chats..."
                className="flex-1 bg-transparent text-xs text-zinc-300 placeholder:text-zinc-600 focus:outline-none"
              />
            </div>
          </div>
          <div className="flex-1 overflow-y-auto divide-y divide-zinc-800">
            {mockChats.map((chat) => (
              <div key={chat.id} className={`flex items-center gap-3 px-4 py-3.5 hover:bg-zinc-800/50 cursor-pointer transition-colors ${chat.id === '1' ? 'bg-zinc-800/30' : ''}`}>
                <div className="w-9 h-9 rounded-full bg-zinc-700 flex items-center justify-center text-xs font-semibold text-zinc-300 shrink-0">
                  {chat.initials}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between mb-0.5">
                    <p className="text-sm font-medium text-zinc-100">{chat.name}</p>
                    <p className="text-[10px] text-zinc-500">{chat.time}</p>
                  </div>
                  <p className="text-[11px] text-zinc-500 truncate">{chat.lastMessage}</p>
                </div>
                {chat.unread > 0 && (
                  <span className="w-4 h-4 rounded-full bg-emerald-500 text-[10px] font-bold text-white flex items-center justify-center shrink-0">
                    {chat.unread}
                  </span>
                )}
              </div>
            ))}
          </div>
        </Card>

        {/* Chat window */}
        <Card padding={false} className="flex-1 flex flex-col">
          <div className="flex items-center gap-3 px-5 py-3.5 border-b border-zinc-800">
            <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-xs font-semibold text-zinc-300">MR</div>
            <div>
              <p className="text-sm font-semibold text-zinc-100">Marco Rossi</p>
              <p className="text-[11px] text-zinc-500">TechCorp SRL · Lead</p>
            </div>
            <div className="ml-auto flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-amber-500" />
              <span className="text-[10px] text-zinc-600">Placeholder · API not connected</span>
            </div>
          </div>

          <div className="flex-1 overflow-y-auto p-5 space-y-3">
            {mockMessages.map((msg) => (
              <div key={msg.id} className={`flex ${msg.mine ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-xs px-3.5 py-2.5 rounded-xl text-sm ${
                  msg.mine ? 'bg-emerald-600 text-white rounded-br-sm' : 'bg-zinc-800 text-zinc-200 rounded-bl-sm'
                }`}>
                  {msg.content}
                  <p className={`text-[10px] mt-1 ${msg.mine ? 'text-emerald-200/60' : 'text-zinc-500'}`}>{msg.time}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="px-5 py-4 border-t border-zinc-800">
            <div className="flex items-center gap-2 bg-zinc-800 rounded-xl px-4 py-2.5">
              <MessageCircle size={13} className="text-zinc-500 shrink-0" />
              <input
                placeholder="Type a message..."
                className="flex-1 bg-transparent text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none"
              />
              <button className="p-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 transition-colors">
                <Send size={13} />
              </button>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
