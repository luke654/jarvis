const { create } = require('@open-wa/wa-automate')
const express = require('express')
const cors = require('cors')
const http = require('http')
const { WebSocketServer } = require('ws')
const Anthropic = require('@anthropic-ai/sdk').default

const anthropic = new Anthropic({ apiKey: process.env.ANTHROPIC_API_KEY })

const app = express()
app.use(cors())
app.use(express.json())

const server = http.createServer(app)
const wss = new WebSocketServer({ server })

let waClient = null
const wsClients = new Set()

// Broadcast to all connected frontend clients
function broadcast(data) {
  const msg = JSON.stringify(data)
  for (const ws of wsClients) {
    if (ws.readyState === 1) ws.send(msg)
  }
}

wss.on('connection', (ws) => {
  wsClients.add(ws)
  // Send current connection status on connect
  ws.send(JSON.stringify({ type: 'status', connected: waClient !== null }))
  ws.on('close', () => wsClients.delete(ws))
})

// ─── REST API ────────────────────────────────────────────────────────────────

// Health / connection status
app.get('/api/status', (req, res) => {
  res.json({ connected: waClient !== null })
})

// Get all chats
app.get('/api/chats', async (req, res) => {
  if (!waClient) return res.status(503).json({ error: 'WhatsApp not connected' })
  try {
    const chats = await waClient.getAllChats()
    res.json(chats.slice(0, 50).map((c) => ({
      id: c.id,
      name: c.name || c.formattedTitle || c.id,
      lastMessage: c.lastMessage?.body || '',
      time: c.lastMessage?.t ? new Date(c.lastMessage.t * 1000).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }) : '',
      unread: c.unreadCount || 0,
      isGroup: c.isGroup,
    })))
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Get messages for a chat
app.get('/api/chats/:chatId/messages', async (req, res) => {
  if (!waClient) return res.status(503).json({ error: 'WhatsApp not connected' })
  try {
    const msgs = await waClient.loadAndGetAllMessagesInChat(req.params.chatId, true, true)
    res.json(msgs.slice(-50).map((m) => ({
      id: m.id,
      content: m.body,
      time: new Date(m.t * 1000).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }),
      mine: m.fromMe,
      from: m.sender?.pushname || m.from,
    })))
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// Send a message
app.post('/api/chats/:chatId/send', async (req, res) => {
  if (!waClient) return res.status(503).json({ error: 'WhatsApp not connected' })
  const { text } = req.body
  if (!text) return res.status(400).json({ error: 'text required' })
  try {
    const result = await waClient.sendText(req.params.chatId, text)
    res.json({ id: result })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

// ─── JARVIS AI endpoint ───────────────────────────────────────────────────────
app.post('/api/jarvis', async (req, res) => {
  const { messages = [] } = req.body
  if (!messages.length) return res.status(400).json({ error: 'messages required' })
  try {
    const response = await anthropic.messages.create({
      model: 'claude-opus-4-8',
      max_tokens: 1024,
      system: `Sei JARVIS, l'assistente AI personale e avanzato di Luca Pantea, CEO di Fusion Media.
Sei preciso, diretto, leggermente formale ma mai freddo — come il JARVIS di Iron Man.
Rispondi sempre in italiano, in modo conciso (max 3 frasi salvo richiesta diversa).
Hai accesso al contesto di Fusion Media: agenzia di marketing, lead generation, video production.
Non fare mai premesse lunghe. Vai subito al punto.`,
      messages,
    })
    const reply = response.content[0]?.type === 'text' ? response.content[0].text : ''
    res.json({ reply })
  } catch (err) {
    console.error('Jarvis API error:', err.message)
    res.status(500).json({ error: err.message })
  }
})

// ─── WhatsApp Client ─────────────────────────────────────────────────────────

create({
  sessionId: 'fusion-os',
  multiDevice: true,
  authTimeout: 60,
  blockCrashLogs: true,
  disableSpins: true,
  headless: true,
  logConsole: false,
  popup: false,
  qrTimeout: 0,
}).then((client) => {
  waClient = client
  console.log('✅ WhatsApp connected')
  broadcast({ type: 'status', connected: true })

  // Real-time incoming messages → broadcast to frontend
  client.onMessage(async (msg) => {
    broadcast({
      type: 'message',
      chatId: msg.chatId,
      message: {
        id: msg.id,
        content: msg.body,
        time: new Date(msg.t * 1000).toLocaleTimeString('it-IT', { hour: '2-digit', minute: '2-digit' }),
        mine: false,
        from: msg.sender?.pushname || msg.from,
      },
    })
  })

  // QR code event (for re-auth)
  client.onStateChange((state) => {
    console.log('WA state:', state)
    if (state === 'CONFLICT' || state === 'UNLAUNCHED') {
      client.forceRefocus()
    }
  })
}).catch((err) => {
  console.error('❌ WhatsApp init error:', err.message)
})

const PORT = process.env.PORT || 3001
server.listen(PORT, () => console.log(`🚀 Jarvis WA server on http://localhost:${PORT}`))
