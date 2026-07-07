import { useEffect, useRef, useState } from 'react'
import { MessageCircle, Search, Send, Wifi, WifiOff } from 'lucide-react'
import Header from '../components/layout/Header'
import Card from '../components/ui/Card'

const API = 'http://localhost:3001/api'
const WS_URL = 'ws://localhost:3001'

interface Chat {
  id: string
  name: string
  lastMessage: string
  time: string
  unread: number
  isGroup: boolean
}

interface Message {
  id: string
  content: string
  time: string
  mine: boolean
  from: string
}

export default function WhatsApp() {
  const [connected, setConnected] = useState(false)
  const [chats, setChats] = useState<Chat[]>([])
  const [activeChatId, setActiveChatId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const wsRef = useRef<WebSocket | null>(null)

  // ─── WebSocket ──────────────────────────────────────────────────────────────
  useEffect(() => {
    function connect() {
      const ws = new WebSocket(WS_URL)
      wsRef.current = ws

      ws.onmessage = (e) => {
        const data = JSON.parse(e.data)
        if (data.type === 'status') {
          setConnected(data.connected)
          if (data.connected) loadChats()
        }
        if (data.type === 'message') {
          // Update last message in chat list
          setChats((prev) =>
            prev.map((c) =>
              c.id === data.chatId
                ? { ...c, lastMessage: data.message.content, time: data.message.time, unread: c.id === activeChatId ? 0 : c.unread + 1 }
                : c
            )
          )
          // Append to active chat
          if (data.chatId === activeChatId) {
            setMessages((prev) => [...prev, data.message])
          }
        }
      }

      ws.onclose = () => {
        setConnected(false)
        setTimeout(connect, 3000)
      }
    }

    connect()
    return () => wsRef.current?.close()
  }, [activeChatId])

  // ─── Load chats ─────────────────────────────────────────────────────────────
  async function loadChats() {
    try {
      const res = await fetch(`${API}/chats`)
      if (!res.ok) return
      const data = await res.json()
      setChats(data)
      if (data.length > 0 && !activeChatId) setActiveChatId(data[0].id)
    } catch {}
  }

  // ─── Load messages when active chat changes ──────────────────────────────────
  useEffect(() => {
    if (!activeChatId || !connected) return
    setLoading(true)
    fetch(`${API}/chats/${activeChatId}/messages`)
      .then((r) => r.json())
      .then((data) => {
        if (Array.isArray(data)) setMessages(data)
      })
      .catch(() => {})
      .finally(() => setLoading(false))

    // Mark as read
    setChats((prev) => prev.map((c) => c.id === activeChatId ? { ...c, unread: 0 } : c))
  }, [activeChatId, connected])

  // Auto-scroll
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // ─── Send message ────────────────────────────────────────────────────────────
  async function send() {
    const text = input.trim()
    if (!text || !activeChatId) return
    setInput('')
    const optimistic: Message = {
      id: `tmp-${Date.now()}`,
      content: text,
      time: new Date().toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }),
      mine: true,
      from: 'me',
    }
    setMessages((prev) => [...prev, optimistic])
    try {
      await fetch(`${API}/chats/${activeChatId}/send`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text }),
      })
    } catch {}
  }

  const activeChat = chats.find((c) => c.id === activeChatId)
  const filtered = chats.filter((c) =>
    c.name.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="flex flex-col min-h-full">
      <Header title="WhatsApp" subtitle={connected ? 'Connesso · Messaggi in tempo reale' : 'In attesa di connessione...'} />

      <div className="flex flex-1 overflow-hidden p-6 gap-4">
        {/* Chat list */}
        <Card padding={false} className="w-72 shrink-0 flex flex-col">
          <div className="px-4 py-3 border-b border-zinc-800">
            <div className="flex items-center gap-2 bg-zinc-800 rounded-lg px-3 py-2">
              <Search size={13} className="text-zinc-500" />
              <input
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Cerca chat..."
                className="flex-1 bg-transparent text-xs text-zinc-300 placeholder:text-zinc-600 focus:outline-none"
              />
            </div>
          </div>

          {!connected ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center p-6">
              <WifiOff size={28} className="text-zinc-600" />
              <p className="text-xs text-zinc-500">Avvio il server WhatsApp...</p>
              <p className="text-[10px] text-zinc-600 font-mono">cd server && node index.js</p>
            </div>
          ) : filtered.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-xs text-zinc-600">Nessuna chat trovata</p>
            </div>
          ) : (
            <div className="flex-1 overflow-y-auto divide-y divide-zinc-800">
              {filtered.map((chat) => (
                <div
                  key={chat.id}
                  onClick={() => setActiveChatId(chat.id)}
                  className={`flex items-center gap-3 px-4 py-3.5 hover:bg-zinc-800/50 cursor-pointer transition-colors ${chat.id === activeChatId ? 'bg-zinc-800/30' : ''}`}
                >
                  <div className="w-9 h-9 rounded-full bg-zinc-700 flex items-center justify-center text-xs font-semibold text-zinc-300 shrink-0">
                    {chat.name.slice(0, 2).toUpperCase()}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-0.5">
                      <p className="text-sm font-medium text-zinc-100 truncate">{chat.name}</p>
                      <p className="text-[10px] text-zinc-500 shrink-0 ml-1">{chat.time}</p>
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
          )}
        </Card>

        {/* Chat window */}
        <Card padding={false} className="flex-1 flex flex-col">
          {!connected ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-4 text-center">
              <WifiOff size={36} className="text-zinc-700" />
              <div>
                <p className="text-sm text-zinc-400 font-medium">Server non connesso</p>
                <p className="text-xs text-zinc-600 mt-1">Avvia il backend per usare WhatsApp</p>
                <code className="mt-3 block text-[11px] text-emerald-400/70 font-mono bg-zinc-800/60 px-3 py-1.5 rounded-lg">
                  cd server && node index.js
                </code>
              </div>
            </div>
          ) : !activeChat ? (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-sm text-zinc-600">Seleziona una chat</p>
            </div>
          ) : (
            <>
              <div className="flex items-center gap-3 px-5 py-3.5 border-b border-zinc-800">
                <div className="w-8 h-8 rounded-full bg-zinc-700 flex items-center justify-center text-xs font-semibold text-zinc-300">
                  {activeChat.name.slice(0, 2).toUpperCase()}
                </div>
                <div>
                  <p className="text-sm font-semibold text-zinc-100">{activeChat.name}</p>
                  <p className="text-[11px] text-zinc-500">{activeChat.isGroup ? 'Gruppo' : 'Chat privata'}</p>
                </div>
                <div className="ml-auto flex items-center gap-1.5">
                  <Wifi size={12} className="text-emerald-500" />
                  <span className="text-[10px] text-emerald-500/70">Live</span>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto p-5 space-y-3">
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-xs text-zinc-600">Caricamento messaggi...</p>
                  </div>
                ) : (
                  messages.map((msg) => (
                    <div key={msg.id} className={`flex ${msg.mine ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-xs px-3.5 py-2.5 rounded-xl text-sm ${
                        msg.mine ? 'bg-emerald-600 text-white rounded-br-sm' : 'bg-zinc-800 text-zinc-200 rounded-bl-sm'
                      }`}>
                        {!msg.mine && <p className="text-[10px] text-emerald-400 mb-0.5 font-medium">{msg.from}</p>}
                        {msg.content}
                        <p className={`text-[10px] mt-1 ${msg.mine ? 'text-emerald-200/60' : 'text-zinc-500'}`}>{msg.time}</p>
                      </div>
                    </div>
                  ))
                )}
                <div ref={messagesEndRef} />
              </div>

              <div className="px-5 py-4 border-t border-zinc-800">
                <div className="flex items-center gap-2 bg-zinc-800 rounded-xl px-4 py-2.5">
                  <MessageCircle size={13} className="text-zinc-500 shrink-0" />
                  <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && send()}
                    placeholder="Scrivi un messaggio..."
                    className="flex-1 bg-transparent text-sm text-zinc-200 placeholder:text-zinc-600 focus:outline-none"
                  />
                  <button
                    onClick={send}
                    disabled={!input.trim()}
                    className="p-1.5 rounded-lg bg-emerald-600 text-white hover:bg-emerald-500 disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                  >
                    <Send size={13} />
                  </button>
                </div>
              </div>
            </>
          )}
        </Card>
      </div>
    </div>
  )
}
