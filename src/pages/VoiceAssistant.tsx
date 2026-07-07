import { useCallback, useEffect, useRef, useState } from 'react'
import { Mic, MicOff, Volume2 } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────
type Phase = 'idle' | 'listening' | 'thinking' | 'speaking'

interface Line {
  role: 'user' | 'jarvis'
  text: string
}

const BASE = import.meta.env.VITE_API_URL ?? 'http://localhost:3001'
const API = `${BASE}/api/jarvis`

// ─── Helpers ─────────────────────────────────────────────────────────────────
function pickVoice(): SpeechSynthesisVoice | null {
  const voices = speechSynthesis.getVoices()
  return (
    voices.find((v) => /daniel|alex|samantha|google uk english male/i.test(v.name)) ??
    voices.find((v) => v.lang.startsWith('en') && !v.localService) ??
    voices[0] ??
    null
  )
}

function speak(text: string, onEnd: () => void) {
  speechSynthesis.cancel()
  const utt = new SpeechSynthesisUtterance(text)
  const voice = pickVoice()
  if (voice) utt.voice = voice
  utt.pitch = 0.85
  utt.rate = 0.95
  utt.volume = 1
  utt.onend = onEnd
  speechSynthesis.speak(utt)
}

// ─── Arc Reactor orb ─────────────────────────────────────────────────────────
function Orb({ phase }: { phase: Phase }) {
  const rings = [84, 66, 50, 36]
  const isActive = phase !== 'idle'

  return (
    <div className="relative flex items-center justify-center" style={{ width: 220, height: 220 }}>
      {/* Pulse rings */}
      {rings.map((size, i) => (
        <span
          key={i}
          className="absolute rounded-full border"
          style={{
            width: size + '%',
            height: size + '%',
            borderColor:
              phase === 'listening' ? 'rgba(16,185,129,0.35)' :
              phase === 'thinking'  ? 'rgba(59,130,246,0.35)' :
              phase === 'speaking'  ? 'rgba(139,92,246,0.35)' :
              'rgba(99,102,241,0.18)',
            animation: isActive
              ? `orb-pulse ${0.9 + i * 0.3}s ease-in-out infinite alternate`
              : undefined,
          }}
        />
      ))}

      {/* Core */}
      <div
        className="relative z-10 rounded-full flex items-center justify-center transition-all duration-700"
        style={{
          width: 88, height: 88,
          background:
            phase === 'listening' ? 'radial-gradient(circle, #10b981 0%, #064e3b 100%)' :
            phase === 'thinking'  ? 'radial-gradient(circle, #3b82f6 0%, #1e3a8a 100%)' :
            phase === 'speaking'  ? 'radial-gradient(circle, #8b5cf6 0%, #3b0764 100%)' :
            'radial-gradient(circle, #6366f1 0%, #1e1b4b 100%)',
          boxShadow:
            phase === 'listening' ? '0 0 40px 8px rgba(16,185,129,0.55)' :
            phase === 'thinking'  ? '0 0 40px 8px rgba(59,130,246,0.55)' :
            phase === 'speaking'  ? '0 0 40px 8px rgba(139,92,246,0.55)' :
            '0 0 24px 4px rgba(99,102,241,0.3)',
        }}
      >
        {phase === 'listening' ? (
          <Mic size={28} className="text-white" />
        ) : phase === 'speaking' ? (
          <Volume2 size={28} className="text-white" />
        ) : (
          <div className="text-white text-xs font-bold tracking-widest">J</div>
        )}
      </div>
    </div>
  )
}

// ─── Waveform bars ────────────────────────────────────────────────────────────
function Waveform({ active }: { active: boolean }) {
  const bars = Array.from({ length: 32 })
  return (
    <div className="flex items-center justify-center gap-0.5 h-10">
      {bars.map((_, i) => (
        <span
          key={i}
          className="w-0.5 rounded-full"
          style={{
            background: active ? '#10b981' : '#3f3f46',
            height: active ? undefined : '6px',
            minHeight: '4px',
            maxHeight: '38px',
            animation: active
              ? `wave ${0.4 + Math.random() * 0.6}s ease-in-out ${i * 0.04}s infinite alternate`
              : undefined,
          }}
        />
      ))}
    </div>
  )
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function VoiceAssistant() {
  const [phase, setPhase] = useState<Phase>('idle')
  const [transcript, setTranscript] = useState('')
  const [log, setLog] = useState<Line[]>([
    { role: 'jarvis', text: 'Sistema online. Come posso assisterti, Luca?' },
  ])
  const [error, setError] = useState('')
  const recogRef = useRef<any>(null)
  const logEndRef = useRef<HTMLDivElement>(null)
  const historyRef = useRef<{ role: string; content: string }[]>([])

  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [log])

  // ─── Speech recognition ─────────────────────────────────────────────────────
  const startListening = useCallback(() => {
    const SR = (window as any).SpeechRecognition ?? (window as any).webkitSpeechRecognition
    if (!SR) { setError('SpeechRecognition non supportato in questo browser.'); return }

    const recog = new SR() as any
    recog.lang = 'it-IT'
    recog.interimResults = true
    recog.maxAlternatives = 1
    recogRef.current = recog

    setPhase('listening')
    setTranscript('')
    setError('')

    recog.onresult = (e: any) => {
      const interim = Array.from(e.results as any[])
        .map((r: any) => r[0].transcript)
        .join('')
      setTranscript(interim)
    }

    recog.onend = async () => {
      const final = transcript || ''
      if (!final.trim()) { setPhase('idle'); return }

      setLog((prev) => [...prev, { role: 'user', text: final }])
      setTranscript('')
      setPhase('thinking')

      try {
        historyRef.current.push({ role: 'user', content: final })

        const res = await fetch(API, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ messages: historyRef.current }),
        })

        const data = await res.json()
        const reply = data.reply ?? 'Non ho ricevuto risposta.'

        historyRef.current.push({ role: 'assistant', content: reply })
        setLog((prev) => [...prev, { role: 'jarvis', text: reply }])
        setPhase('speaking')
        speak(reply, () => setPhase('idle'))
      } catch {
        setError('Errore di connessione al server.')
        setPhase('idle')
      }
    }

    recog.onerror = (e: any) => {
      if (e.error !== 'no-speech') setError(`Errore: ${e.error}`)
      setPhase('idle')
    }

    recog.start()
  }, [transcript])

  const stopListening = () => {
    recogRef.current?.stop()
  }

  const handleMicClick = () => {
    if (phase === 'idle') startListening()
    else if (phase === 'listening') stopListening()
    else if (phase === 'speaking') { speechSynthesis.cancel(); setPhase('idle') }
  }

  const phaseLabel: Record<Phase, string> = {
    idle:      'IN ATTESA',
    listening: 'IN ASCOLTO',
    thinking:  'ELABORAZIONE',
    speaking:  'RISPOSTA',
  }

  return (
    <div className="flex flex-col items-center justify-between min-h-full bg-zinc-950 px-6 py-8 select-none">
      <style>{`
        @keyframes orb-pulse { from { opacity: 0.4; transform: scale(0.97); } to { opacity: 1; transform: scale(1.03); } }
        @keyframes wave { from { height: 4px; } to { height: ${32 + Math.random() * 20}px; } }
      `}</style>

      {/* Header */}
      <div className="flex flex-col items-center gap-1">
        <p className="text-[10px] font-semibold tracking-[0.3em] text-indigo-400 uppercase">Fusion OS · JARVIS</p>
        <p className="text-xs text-zinc-600 tracking-widest">{phaseLabel[phase]}</p>
      </div>

      {/* Transcript live */}
      <p className="min-h-[1.5rem] text-sm text-emerald-400/80 font-mono italic">
        {transcript && `"${transcript}"`}
      </p>

      {/* Orb */}
      <div className="flex flex-col items-center gap-6">
        <Orb phase={phase} />
        <Waveform active={phase === 'listening'} />

        {/* Mic button */}
        <button
          onClick={handleMicClick}
          className={`flex items-center gap-2 px-6 py-3 rounded-full text-sm font-semibold transition-all duration-300 border ${
            phase === 'listening'
              ? 'bg-emerald-500/10 border-emerald-500/50 text-emerald-400 hover:bg-emerald-500/20'
              : phase === 'speaking'
              ? 'bg-violet-500/10 border-violet-500/50 text-violet-400 hover:bg-violet-500/20'
              : phase === 'thinking'
              ? 'bg-blue-500/10 border-blue-500/30 text-blue-400 cursor-wait'
              : 'bg-indigo-500/10 border-indigo-500/30 text-indigo-300 hover:bg-indigo-500/20'
          }`}
          disabled={phase === 'thinking'}
        >
          {phase === 'listening' ? <MicOff size={15} /> : <Mic size={15} />}
          {phase === 'idle'      && 'Parla con JARVIS'}
          {phase === 'listening' && 'Clicca per inviare'}
          {phase === 'thinking'  && 'Elaborazione...'}
          {phase === 'speaking'  && 'Clicca per interrompere'}
        </button>

        {error && <p className="text-xs text-red-400">{error}</p>}
      </div>

      {/* Conversation log */}
      <div className="w-full max-w-2xl mt-6 flex flex-col gap-2 max-h-72 overflow-y-auto pr-1">
        {log.map((line, i) => (
          <div key={i} className={`flex ${line.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[85%] px-4 py-2.5 rounded-xl text-sm leading-relaxed ${
              line.role === 'user'
                ? 'bg-indigo-500/15 text-indigo-200 rounded-br-sm border border-indigo-500/20'
                : 'bg-zinc-800/60 text-zinc-300 rounded-bl-sm border border-zinc-700/40'
            }`}>
              {line.role === 'jarvis' && (
                <span className="text-[10px] font-bold tracking-widest text-indigo-400 block mb-0.5">JARVIS</span>
              )}
              {line.text}
            </div>
          </div>
        ))}
        <div ref={logEndRef} />
      </div>

      <p className="text-[10px] text-zinc-700 tracking-widest mt-4">FUSION SYSTEMS · PRIVATE AI · v1.0</p>
    </div>
  )
}
