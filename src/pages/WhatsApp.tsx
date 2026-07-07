import { useEffect, useRef, useState } from 'react'
import { MessageCircle, Search, Send, Wifi, WifiOff, Loader2, QrCode } from 'lucide-react'
import Header from '../components/layout/Header'
import Card from '../components/ui/Card'

const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'
const API = `${BASE}/api`
const WS_URL = BASE.replace(/^https?/, (p: string) => (p === 'https' ? 'wss' : 'ws')) + '/ws'

type WaState = 'disconnected' | 'loading' | 'qr' | 'connected'

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
  const [waState, setWaState] = useState<WaState>('disconnected')
  const [qrCode, setQrCode] = useState<string | null>(null)
  const [chats, setChats] = useState<Chat[]>([])
  const [activeChatId, setActiveChatId] = useState<string | null>(null)
  const [messages, setMessages] = useState<Message[]>([])
  const [input, setInput] = useState('')
  const [search, setSearch] = useState('')
  const [loading, setLoading] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const wsRef = useRef<WebSocket | null>(null)
  const activeChatIdRef = useRef(activeChatId)
  activeChatIdRef.current = activeChatId

  // ─── WebSocket ──────────────────────────────────────────────────────────────
  useEffect(() => {
    let reconnectTimer: ReturnType<typeof setTimeout>

    function connect() {
      const ws = new WebSocket(WS_URL)
      wsRef.current = ws

      ws.onmessage = (e) => {
        const data = JSON.parse(e.data)

        if (data.type === 'state') {
          setWaState(data.state as WaState)
          setQrCode(data.qr ?? null)
          if (data.state === 'connected') loadChats()
        }

        if (data.type === 'message') {
          setChats((prev) =>
            prev.map((c) =>
              c.id === data.chatId
                ? {
                    ...c,
                    lastMessage: data.message.content,
                    time: data.message.time,
                    unread: c.id === activeChatIdRef.current ? 0 : c.unread + 1,
                  }
                : c
            )
          )
          if (data.chatId === activeChatIdRef.current) {
            setMessages((prev) => [...prev, data.message])
          }
        }
      }

      ws.onclose = () => {
        setWaState('disconnected')
        reconnectTimer = setTimeout(connect, 3000)
      }

      ws.onerror = () => ws.close()
    }

    connect()
    return () => {
      clearTimeout(reconnectTimer)
      wsRef.current?.close()
    }
  }, [])

  // ─── Load chats ─────────────────────────────────────────────────────────────
  async function loadChats() {
    try {
      const res = await fetch(`${API}/chats`)
      if (!res.ok) return
      const data = await res.json()
      setChats(data)
      if (data.length > 0 && !activeChatIdRef.current) setActiveChatId(data[0].id)
    } catch {}
  }

  // ─── Load messages on chat change ────────────────────────────────────────────
  useEffect(() => {
    if (!activeChatId || waState !== 'connected') return
    setLoading(true)
    fetch(`${API}/chats/${activeChatId}/messages`)
      .then((r) => r.json())
      .then((data) => { if (Array.isArray(data)) setMessages(data) })
      .catch(() => {})
      .finally(() => setLoading(false))
    setChats((prev) => prev.map((c) => c.id === activeChatId ? { ...c, unread: 0 } : c))
  }, [activeChatId, waState])

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  // ─── Send ────────────────────────────────────────────────────────────────────
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
  const filtered = chats.filter((c) => c.name.toLowerCase().includes(search.toLowerCase()))
  const isConnected = waState === 'connected'

  const subtitleMap: Record<WaState, string> = {
    disconnected: 'Server non raggiungibile',
    loading: 'Avvio in corso...',
    qr: 'Scansiona il QR per autenticarti',
    connected: 'Connesso · Messaggi in tempo reale',
  }

  return (
    <div className="flex flex-col min-h-full">
      <Header title="WhatsApp" subtitle={subtitleMap[waState]} />

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

          {!isConnected ? (
            <div className="flex-1 flex flex-col items-center justify-center gap-3 text-center p-6">
              {waState === 'loading' ? (
                <Loader2 size={24} className="text-blue-400 animate-spin" />
              ) : waState === 'qr' ? (
                <QrCode size={24} className="text-emerald-400" />
              ) : (
                <WifiOff size={24} className="text-zinc-600" />
              )}
              <p className="text-xs text-zinc-500">{subtitleMap[waState]}</p>
              {waState === 'disconnected' && (
                <code className="text-[10px] text-emerald-400/70 font-mono bg-zinc-800/60 px-3 py-1.5 rounded-lg">
                  cd server && node index.js
                </code>
              )}
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

        {/* Main panel */}
        <Card padding={false} className="flex-1 flex flex-col">
          {waState === 'disconnected' && (
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
          )}

          {waState === 'loading' && (
            <div className="flex-1 flex flex-col items-center justify-center gap-4">
              <Loader2 size={36} className="text-blue-400 animate-spin" />
              <p className="text-sm text-zinc-400">Avvio WhatsApp...</p>
            </div>
          )}

          {waState === 'qr' && (
            <div className="flex-1 flex flex-col items-center justify-center gap-6 p-8">
              <div className="flex flex-col items-center gap-2">
                <p className="text-base font-semibold text-zinc-200">Scansiona per autenticarti</p>
                <p className="text-xs text-zinc-500">Apri WhatsApp → Dispositivi collegati → Collega un dispositivo</p>
              </div>
              {qrCode ? (
                <div className="p-4 bg-white rounded-2xl shadow-lg shadow-black/40">
                  <img src={qrCode} alt="WhatsApp QR Code" className="w-56 h-56" />
                </div>
              ) : (
                <div className="w-64 h-64 bg-zinc-800 rounded-2xl flex items-center justify-center">
                  <Loader2 size={28} className="text-zinc-600 animate-spin" />
                </div>
              )}
              <p className="text-[10px] text-zinc-600 tracking-widest">IL QR SCADE OGNI 60 SECONDI · VERRÀ AGGIORNATO AUTOMATICAMENTE</p>
            </div>
          )}

          {waState === 'connected' && !activeChat && (
            <div className="flex-1 flex items-center justify-center">
              <p className="text-sm text-zinc-600">Seleziona una chat</p>
            </div>
          )}

          {waState === 'connected' && activeChat && (
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
                    <Loader2 size={20} className="text-zinc-600 animate-spin" />
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
