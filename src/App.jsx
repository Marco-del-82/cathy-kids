import React, { useState, useEffect, useRef } from 'react'
import {
  Play, Pause, RotateCcw, Volume2, ShieldAlert, Heart, Sparkles,
  BookOpen, Brain, Activity, Download, CheckCircle2, AlertTriangle,
  ChevronRight, Mic, Radio, Layers, Users, Sparkle
} from 'lucide-react'
import confetti from 'canvas-confetti'

const PHASES = [
  {
    id: 1,
    timeRange: [0, 12.5],
    title: 'La Amenaza Neurobiológica',
    subtitle: 'El Enojo Sucio y la Amígdala',
    badge: 'Toma 1 • 00:00 - 00:12',
    color: 'red',
    character: '/assets/Enojo_Sucio.png',
    quote: '“Cuando intervenimos desde la reactividad, el límite se convierte en herida. El Enojo Sucio contamina el vínculo: el cerebro infantil deja de procesar el aprendizaje y entra en modo de alerta y miedo.”',
    clinicalNote: 'El secuestro amigdalino apaga la corteza prefrontal del niño. La amenaza genera parálisis o huida (Vergüenza Tóxica), bloqueando toda integración cognitiva del límite.',
    metric: 'Modo Supervivencia Activado'
  },
  {
    id: 2,
    timeRange: [12.5, 25.5],
    title: 'La Regulación y el Apego Seguro',
    subtitle: 'El Enojo Limpio y la Corregulación',
    badge: 'Toma 2 • 00:12 - 00:25',
    color: 'blue',
    character: '/assets/Enojo_Limpio.png',
    quote: '“Pero el enojo no tiene que reprimir su fuerza: es energía vital. Cuando nace desde el respeto, se convierte en Enojo Limpio. Tiene la firmeza para frenar la injusticia y sostener la estructura, manteniendo el corazón abierto y el apego a salvo.”',
    clinicalNote: 'Firmeza sin agresión. El latido rítmico (60 BPM) promueve la regulación vagal del infante. El límite se asimila porque el vínculo de seguridad permanece intacto.',
    metric: 'Corregulación Vagal • 60 BPM'
  },
  {
    id: 3,
    timeRange: [25.5, 37.5],
    title: 'El Futuro Clínico: Speech Emotion AI',
    subtitle: 'El Regulador Relacional Inteligente',
    badge: 'Toma 3 • 00:25 - 00:37',
    color: 'amber',
    character: 'iot-mockup',
    quote: '“Tecnología al servicio de la regulación familiar: monitoreo ambiental y alertas compasivas para intervenir antes de que la reactividad contamine la mesa.”',
    clinicalNote: 'Prototipo de escucha ambiental pasiva en el Edge (Whisper + SLM local). Detecta decibeles y prosodia hostil para inducir pausas compasivas en el núcleo familiar.',
    metric: 'Detección de Tono en Tiempo Real'
  },
  {
    id: 4,
    timeRange: [37.5, 46.0],
    title: 'Cierre y Detonador Terapéutico',
    subtitle: 'La Pregunta para el Foro Clínico',
    badge: 'Toma 4 • 00:37 - 00:45',
    color: 'emerald',
    character: '/assets/Lucia-Enojo-sucio-Enojo-Limpio.jpeg',
    quote: '“En la familia y en el espacio terapéutico... ¿desde cuál de los dos estamos interviniendo? ¿A cuál decidimos alimentar hoy?”',
    clinicalNote: 'Cathy Calderón de la Barca. Herramientas clínicas y literatura terapéutica para una crianza con apego seguro y límites conscientes.',
    metric: '¿Límites que hieren o con respeto?'
  }
]

const CHARACTERS_LAB = [
  {
    id: 'limpio',
    name: 'Enojo Limpio',
    tagline: 'Límites con Respeto',
    color: 'blue',
    image: '/assets/Enojo_Limpio.png',
    physiology: 'Corazón azul íntegro latiendo en cadencia parasimpática (60 BPM). Ceño regulado, manos redondeadas sin garras lesivas.',
    neurobiology: 'Corteza Prefrontal conectada. Canaliza la energía vital de la asertividad y detiene la injusticia sin atacar la identidad del otro.',
    phrases: ['“¡Para! No me gusta.”', '“¡Me estoy enojando, necesito una pausa!”', '“Te amo, pero esta conducta no es aceptable.”'],
    clinicalGoal: 'Sostener la estructura vincular. Corregulación activa.'
  },
  {
    id: 'sucio',
    name: 'Enojo Sucio',
    tagline: 'Límites que Hieren',
    color: 'red',
    image: '/assets/Enojo_Sucio.png',
    physiology: 'Maza metálica con púas grises encajada contra el corazón. Pelaje erizado, garras verdes y ceño punzante.',
    neurobiology: 'Hiperactivación amigdalina. La frustración muta en reactividad, juicio punitivo y humillación hacia el receptor.',
    phrases: ['“¡Qué tonta eres, vete a tu cuarto!”', '“¡Así nadie te va a querer!”', '“¡Pareces loquita!”'],
    clinicalGoal: 'Identificar la coraza defensiva y desmontar la culpa y el dolor acumulado.'
  },
  {
    id: 'berrinche',
    name: 'Monstruo de los Berrinches',
    tagline: 'El Desborde Amigdalino',
    color: 'indigo',
    image: '/assets/Berrinche.png',
    physiology: 'Espinas dorsales rojas de alerta, llanto a borbotones, boca abierta en desborde, postura encorvada.',
    neurobiology: 'Cerebro primitivo sobrecargado. El niño carece del vocabulario emocional para nombrar la frustración y explota en rabieta física.',
    phrases: ['“¡Volcán interior a máxima temperatura!”', '“Gritos, patadas y puños involuntarios.”'],
    clinicalGoal: 'Contención física segura, silencio compasivo y retorno de la calma antes de razonar.'
  },
  {
    id: 'lucia',
    name: 'Lucía (La Integración)',
    tagline: 'La Domadora Consciente',
    color: 'purple',
    image: '/assets/Lucia-Enojo-sucio-Enojo-Limpio.jpeg',
    physiology: 'Lucía al centro, sonriendo con su camiseta de arcoíris, abrazando los hombros de ambos monstruos.',
    neurobiology: 'Integración interhemisférica. Aceptación de las emociones sin juzgarlas, eligiendo conscientemente desde los valores familiares.',
    phrases: ['“El plan de la Curiosidad.”', '“Observa dónde sientes el volcán.”', '“Ahora en casa también vive Empatía.”'],
    clinicalGoal: 'El niño aprende que el enojo no lo convierte en un monstruo: es un mensajero de sus límites.'
  }
]

export default function App() {
  // Audio state
  const audioRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const [duration, setDuration] = useState(44.97)
  const [activePhaseIndex, setActivePhaseIndex] = useState(0)

  // Lab Character State
  const [selectedChar, setSelectedChar] = useState(CHARACTERS_LAB[0])

  // Speech Emotion AI Simulator State
  const [simState, setSimState] = useState('calm') // 'calm' | 'agitated'
  const [alertDismissed, setAlertDismissed] = useState(false)

  // Modal / Form state
  const [leadForm, setLeadForm] = useState({ name: '', specialty: 'Psicología Infantil', email: '' })
  const [formSubmitted, setFormSubmitted] = useState(false)

  // Audio synchronization effect
  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handleTimeUpdate = () => {
      const time = audio.currentTime
      setCurrentTime(time)
      const phaseIdx = PHASES.findIndex(p => time >= p.timeRange[0] && time < p.timeRange[1])
      if (phaseIdx !== -1) {
        setActivePhaseIndex(phaseIdx)
      }
    }

    const handleEnded = () => {
      setIsPlaying(false)
      setCurrentTime(0)
      setActivePhaseIndex(0)
    }

    audio.addEventListener('timeupdate', handleTimeUpdate)
    audio.addEventListener('ended', handleEnded)
    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate)
      audio.removeEventListener('ended', handleEnded)
    }
  }, [])

  const togglePlay = () => {
    if (!audioRef.current) return
    if (isPlaying) {
      audioRef.current.pause()
      setIsPlaying(false)
    } else {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
    }
  }

  const restartAudio = () => {
    if (!audioRef.current) return
    audioRef.current.currentTime = 0
    audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
  }

  const jumpToPhase = (index) => {
    if (!audioRef.current) return
    const targetTime = PHASES[index].timeRange[0]
    audioRef.current.currentTime = targetTime
    setActivePhaseIndex(index)
    if (!isPlaying) {
      audioRef.current.play().then(() => setIsPlaying(true)).catch(() => {})
    }
  }

  const handleSimulateAlert = () => {
    setSimState('agitated')
    setAlertDismissed(false)
    setTimeout(() => {
      // Auto calm after 6s
      setSimState('calm')
    }, 6000)
  }

  const handleFormSubmit = (e) => {
    e.preventDefault()
    if (!leadForm.name || !leadForm.email) return
    setFormSubmitted(true)
    confetti({
      particleCount: 80,
      spread: 70,
      origin: { y: 0.6 }
    })
  }

  const activePhase = PHASES[activePhaseIndex]

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 selection:bg-blue-600 selection:text-white">
      {/* Hidden Audio Element */}
      <audio ref={audioRef} preload="auto">
        <source src="/voz_locucion_broadcast.wav" type="audio/wav" />
        <source src="/voz_locucion_master.mp3" type="audio/mpeg" />
      </audio>

      {/* TOP NAVBAR */}
      <header className="sticky top-0 z-50 glass-panel border-b border-white/10 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-amber-400 p-[2px] shadow-lg shadow-blue-500/20">
              <div className="w-full h-full bg-[#07090e] rounded-[10px] flex items-center justify-center">
                <Heart className="w-5 h-5 text-blue-400 animate-pulse" />
              </div>
            </div>
            <div>
              <span className="text-xl font-bold tracking-tight text-white font-heading">
                Cathy<span className="text-blue-400">Kids</span>
              </span>
              <span className="ml-2 text-xs font-semibold px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-300 border border-blue-500/30">
                cathykids.club
              </span>
            </div>
          </div>

          <nav className="hidden md:flex items-center gap-8 text-sm font-medium text-slate-300">
            <a href="#teaser-capsula" className="hover:text-blue-400 transition-colors">La Cápsula 45s</a>
            <a href="#laboratorio" className="hover:text-blue-400 transition-colors">Laboratorio Clínico</a>
            <a href="#regulador" className="hover:text-blue-400 transition-colors">Regulador Relacional</a>
            <a href="#libro" className="hover:text-blue-400 transition-colors">El Libro de Lucía</a>
          </nav>

          <a
            href="#acceso-clinico"
            className="px-4 py-2 text-xs font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white shadow-md shadow-blue-600/30 transition-all hover:scale-105"
          >
            Kit para Terapeutas
          </a>
        </div>
      </header>

      {/* HERO SECTION: TEASER CÁPSULA 45 SEGUNDOS */}
      <section id="teaser-capsula" className="relative pt-12 pb-20 px-6 overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-gradient-to-tr from-blue-600/20 to-red-600/20 blur-[140px] pointer-events-none rounded-full" />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-800/80 border border-slate-700/80 text-xs font-medium text-slate-300 mb-6">
            <Sparkles className="w-3.5 h-3.5 text-amber-400" />
            <span>Presentación Exclusiva para Foros Terapéuticos y Educativos</span>
          </div>

          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            La Anatomía del Límite: <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-red-400 bg-clip-text text-transparent">
              Lucía y el Enojo Limpio y Sucio
            </span>
          </h1>

          <p className="text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-10 leading-relaxed font-light">
            El enojo no es una conducta que se reprime: es un estado del sistema nervioso que conecta o fractura el apego.
          </p>

          {/* AUDIO SYNCHRONIZED PLAYER CONSOLE */}
          <div className="glass-panel p-6 md:p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden text-left">
            {/* Ambient tone shift depending on active phase */}
            <div className={`absolute inset-0 opacity-15 transition-all duration-700 pointer-events-none ${
              activePhase.color === 'red' ? 'bg-red-600' :
              activePhase.color === 'blue' ? 'bg-blue-600' :
              activePhase.color === 'amber' ? 'bg-amber-500' : 'bg-emerald-600'
            }`} />

            {/* Top Playback Bar */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pb-6 border-b border-white/10 relative z-10">
              <div className="flex items-center gap-4">
                <button
                  onClick={togglePlay}
                  className="w-14 h-14 rounded-2xl bg-gradient-to-r from-blue-500 to-indigo-600 hover:from-blue-400 hover:to-indigo-500 flex items-center justify-center text-white shadow-xl shadow-blue-500/30 transition-all hover:scale-105 active:scale-95"
                  title={isPlaying ? 'Pausar locución' : 'Reproducir cápsula de 45 segundos'}
                >
                  {isPlaying ? <Pause className="w-6 h-6 fill-current" /> : <Play className="w-6 h-6 fill-current ml-0.5" />}
                </button>
                <button
                  onClick={restartAudio}
                  className="p-3 rounded-xl bg-slate-800/80 hover:bg-slate-700 text-slate-300 transition-colors"
                  title="Reiniciar locución"
                >
                  <RotateCcw className="w-5 h-5" />
                </button>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-semibold text-white text-base">Cápsula Sonora de 45s</span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 font-mono">
                      Master DaliaNeural 24kHz
                    </span>
                  </div>
                  <p className="text-xs text-slate-400">
                    Locución clínica profesional sincronizada cuadro por cuadro
                  </p>
                </div>
              </div>

              {/* Progress & Time */}
              <div className="flex items-center gap-3">
                <Volume2 className="w-4 h-4 text-slate-400" />
                <div className="font-mono text-sm text-slate-200 bg-slate-900/80 px-3 py-1.5 rounded-lg border border-white/10">
                  {Math.floor(currentTime)}s <span className="text-slate-500">/ {Math.floor(duration)}s</span>
                </div>
              </div>
            </div>

            {/* 4-PHASE TIMELINE STEPPER */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-2 pt-6 pb-6 relative z-10">
              {PHASES.map((phase, idx) => {
                const isActive = activePhaseIndex === idx
                return (
                  <button
                    key={phase.id}
                    onClick={() => jumpToPhase(idx)}
                    className={`text-left p-3 rounded-xl transition-all border ${
                      isActive
                        ? phase.color === 'red'
                          ? 'bg-red-950/60 border-red-500/50 shadow-lg shadow-red-900/30'
                          : phase.color === 'blue'
                          ? 'bg-blue-950/60 border-blue-500/50 shadow-lg shadow-blue-900/30'
                          : phase.color === 'amber'
                          ? 'bg-amber-950/60 border-amber-500/50 shadow-lg shadow-amber-900/30'
                          : 'bg-emerald-950/60 border-emerald-500/50 shadow-lg shadow-emerald-900/30'
                        : 'bg-slate-900/40 border-white/5 hover:border-white/20'
                    }`}
                  >
                    <span className="text-[10px] font-mono tracking-wider uppercase text-slate-400 block mb-1">
                      {phase.badge}
                    </span>
                    <h4 className="text-xs md:text-sm font-semibold text-white truncate">
                      {phase.title}
                    </h4>
                  </button>
                )
              })}
            </div>

            {/* DYNAMIC STAGE / VISUAL DISPLAY */}
            <div className="mt-2 rounded-2xl bg-[#0b0f19] border border-white/10 p-6 md:p-8 flex flex-col md:flex-row items-center gap-8 relative z-10 min-h-[360px]">
              {/* Visual Avatar Container */}
              <div className="w-full md:w-1/2 flex flex-col items-center justify-center relative">
                {activePhase.character === 'iot-mockup' ? (
                  /* Toma 3: Speech Emotion AI Mockup */
                  <div className="w-full max-w-sm rounded-2xl bg-gradient-to-b from-slate-800 to-slate-900 p-6 border border-amber-500/30 shadow-2xl relative">
                    <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-4">
                      <div className="flex items-center gap-2">
                        <Radio className="w-4 h-4 text-amber-400 animate-pulse" />
                        <span className="text-xs font-semibold text-slate-200">Regulador Relacional</span>
                      </div>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-amber-500/20 text-amber-300">
                        Edge SLM
                      </span>
                    </div>

                    <div className="h-28 flex items-center justify-center gap-1.5 px-4 bg-slate-950/80 rounded-xl mb-4">
                      {[16, 28, 48, 20, 56, 34, 18, 40, 60, 24, 14, 30].map((h, i) => (
                        <div
                          key={i}
                          className="w-2 rounded-full bg-amber-400/80 transition-all duration-300"
                          style={{
                            height: isPlaying ? `${Math.min(70, h * 1.2)}px` : `${h / 2}px`,
                            animation: isPlaying ? 'waveBreathing 1.2s ease-in-out infinite' : 'none'
                          }}
                        />
                      ))}
                    </div>

                    <div className="p-3 rounded-lg bg-amber-500/10 border border-amber-500/20 text-center">
                      <p className="text-xs font-semibold text-amber-300">
                        “Detectando tono elevado. Respira. Regresa al Enojo Limpio.”
                      </p>
                    </div>
                  </div>
                ) : (
                  /* Toma 1, 2, 4: PNG Characters with Animation */
                  <div className="relative group">
                    <div className={`absolute -inset-4 rounded-full blur-2xl opacity-40 transition-all ${
                      activePhase.color === 'red' ? 'bg-red-600' :
                      activePhase.color === 'blue' ? 'bg-blue-600' : 'bg-emerald-600'
                    }`} />
                    <img
                      src={activePhase.character}
                      alt={activePhase.title}
                      className={`max-h-[300px] w-auto object-contain relative z-10 transition-transform duration-500 drop-shadow-2xl ${
                        activePhase.color === 'blue' ? 'animate-heart-pulse' :
                        activePhase.color === 'red' ? 'animate-tension' : ''
                      }`}
                    />
                    {activePhase.color === 'blue' && (
                      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-20 pointer-events-none">
                        <Heart className="w-16 h-16 text-blue-400 opacity-60 animate-ping" />
                      </div>
                    )}
                  </div>
                )}
              </div>

              {/* Text & Clinical Breakdown */}
              <div className="w-full md:w-1/2 text-left">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono font-medium mb-3 bg-white/5 border border-white/10 text-slate-300">
                  <Activity className="w-3.5 h-3.5 text-blue-400" />
                  <span>{activePhase.metric}</span>
                </div>

                <h3 className="text-2xl font-bold text-white mb-2 font-heading">
                  {activePhase.title}
                </h3>
                <h4 className="text-sm font-medium text-slate-400 mb-4">
                  {activePhase.subtitle}
                </h4>

                <blockquote className="text-sm md:text-base italic text-slate-200 bg-white/5 p-4 rounded-xl border-l-4 border-blue-500 mb-4 leading-relaxed">
                  {activePhase.quote}
                </blockquote>

                <div className="p-3.5 rounded-xl bg-slate-900/90 border border-white/10">
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                    Lectura Clínica para Terapeutas:
                  </span>
                  <p className="text-xs text-slate-300 leading-relaxed">
                    {activePhase.clinicalNote}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 2: LABORATORIO CLÍNICO INTERACTIVO */}
      <section id="laboratorio" className="py-20 px-6 bg-[#0a0d14] border-t border-white/5">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase tracking-wider">
              Anatomía de Personajes
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-3 font-heading">
              Laboratorio de Neuroeducación y Regulación
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto mt-2 text-sm md:text-base">
              Haz clic en cada personaje para analizar su arquitectura emocional, su correlato neurobiológico y la técnica de intervención en consulta.
            </p>
          </div>

          {/* Character Switcher Tabs */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-8">
            {CHARACTERS_LAB.map((c) => {
              const isSelected = selectedChar.id === c.id
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedChar(c)}
                  className={`p-4 rounded-2xl border transition-all text-left flex items-center gap-3 ${
                    isSelected
                      ? c.color === 'blue'
                        ? 'bg-blue-950/70 border-blue-500 shadow-lg shadow-blue-900/30'
                        : c.color === 'red'
                        ? 'bg-red-950/70 border-red-500 shadow-lg shadow-red-900/30'
                        : c.color === 'indigo'
                        ? 'bg-indigo-950/70 border-indigo-500 shadow-lg shadow-indigo-900/30'
                        : 'bg-purple-950/70 border-purple-500 shadow-lg shadow-purple-900/30'
                      : 'bg-slate-900/50 border-white/10 hover:border-white/20'
                  }`}
                >
                  <img src={c.image} alt={c.name} className="w-12 h-12 object-contain" />
                  <div>
                    <h4 className="text-sm font-bold text-white">{c.name}</h4>
                    <span className="text-[11px] text-slate-400 block">{c.tagline}</span>
                  </div>
                </button>
              )
            })}
          </div>

          {/* Selected Character Deep Dive Card */}
          <div className="glass-panel rounded-3xl p-6 md:p-10 border border-white/10 grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-950/60 rounded-2xl border border-white/5 relative">
              <img
                src={selectedChar.image}
                alt={selectedChar.name}
                className="max-h-[320px] w-auto object-contain drop-shadow-2xl"
              />
              <span className="mt-4 text-xs font-semibold px-3 py-1 rounded-full bg-white/10 text-white font-mono">
                {selectedChar.tagline}
              </span>
            </div>

            <div className="md:col-span-7 space-y-5 text-left">
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-white font-heading">
                  {selectedChar.name}
                </h3>
                <p className="text-sm text-blue-400 font-medium">{selectedChar.clinicalGoal}</p>
              </div>

              <div className="space-y-4 text-sm">
                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5">
                  <div className="flex items-center gap-2 text-slate-200 font-semibold mb-1 text-xs">
                    <Heart className="w-3.5 h-3.5 text-blue-400" />
                    <span>Fisiología y Simbología Visual:</span>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">{selectedChar.physiology}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5">
                  <div className="flex items-center gap-2 text-slate-200 font-semibold mb-1 text-xs">
                    <Brain className="w-3.5 h-3.5 text-indigo-400" />
                    <span>Mecanismo Neurobiológico:</span>
                  </div>
                  <p className="text-slate-300 text-xs leading-relaxed">{selectedChar.neurobiology}</p>
                </div>

                <div className="p-3.5 rounded-xl bg-slate-900/80 border border-white/5">
                  <span className="text-[11px] font-semibold text-slate-400 block mb-2">Frases Típicas del Modelo:</span>
                  <div className="flex flex-wrap gap-2">
                    {selectedChar.phrases.map((p, i) => (
                      <span key={i} className="text-xs px-2.5 py-1 rounded-md bg-white/5 text-slate-200 border border-white/10">
                        {p}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 3: SIMULADOR DE SPEECH EMOTION AI */}
      <section id="regulador" className="py-20 px-6 relative overflow-hidden">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-wider">
              Investigación & Desarrollo Clínico
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-3 font-heading">
              El Regulador Relacional (Prototipo Conceptual)
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto mt-2 text-sm md:text-base">
              La tecnología al servicio de la paz en la mesa familiar: escucha pasiva en el Edge para mediar antes de que el enojo sucio contamine la conversación.
            </p>
          </div>

          <div className="glass-panel p-8 rounded-3xl border border-white/10 max-w-2xl mx-auto text-center relative">
            <div className="flex items-center justify-between mb-6 pb-4 border-b border-white/10">
              <div className="flex items-center gap-3">
                <Mic className={`w-5 h-5 ${simState === 'agitated' ? 'text-red-400 animate-bounce' : 'text-emerald-400'}`} />
                <span className="text-sm font-semibold text-white">Dispositivo Ambiental Cathy Kids</span>
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-mono ${
                simState === 'agitated' ? 'bg-red-500/20 text-red-300 border border-red-500/40' : 'bg-emerald-500/20 text-emerald-300'
              }`}>
                {simState === 'agitated' ? '⚠️ Reactividad Detectada' : '● Escucha Calma'}
              </span>
            </div>

            {/* Simulated Display Screen */}
            <div className={`p-8 rounded-2xl transition-all duration-500 mb-6 ${
              simState === 'agitated'
                ? 'bg-gradient-to-b from-red-950/80 to-slate-900 border border-red-500/50 shadow-2xl shadow-red-900/40'
                : 'bg-gradient-to-b from-slate-900 to-slate-950 border border-white/10'
            }`}>
              {simState === 'agitated' ? (
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-full bg-red-500/20 border border-red-500/40 flex items-center justify-center mx-auto text-red-400 animate-pulse">
                    <AlertTriangle className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-red-200">Alerta de Enojo Sucio</h4>
                  <p className="text-sm text-red-300 max-w-md mx-auto">
                    “Se detectó tono elevado y aceleración en la prosodia (+82dB). Recuerda pausar, bajar la velocidad y hablar desde el corazón.”
                  </p>
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 border border-blue-500/40 flex items-center justify-center mx-auto text-blue-400 animate-heart-pulse">
                    <Heart className="w-6 h-6" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-200">Ambiente en Regulación</h4>
                  <p className="text-sm text-slate-400 max-w-md mx-auto">
                    Escucha activa en baja latencia. Procesamiento 100% privado en hardware local (cero envío de audio a nubes externas).
                  </p>
                </div>
              )}
            </div>

            {/* Trigger Button */}
            <button
              onClick={handleSimulateAlert}
              disabled={simState === 'agitated'}
              className={`px-6 py-3 rounded-xl font-semibold text-sm transition-all shadow-lg ${
                simState === 'agitated'
                  ? 'bg-red-600/50 text-red-200 cursor-not-allowed'
                  : 'bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white shadow-red-600/30 hover:scale-105 active:scale-95'
              }`}
            >
              {simState === 'agitated' ? 'Emitiendo Alarma de Corregulación...' : 'Simular Grito o Reactividad en la Mesa'}
            </button>
          </div>
        </div>
      </section>

      {/* SECTION 4: SHOWCASE DEL LIBRO */}
      <section id="libro" className="py-20 px-6 bg-[#090c13] border-t border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row items-center gap-12">
          <div className="w-full md:w-1/2 flex justify-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-gradient-to-tr from-blue-600/30 to-purple-600/30 rounded-3xl blur-2xl opacity-60" />
              <img
                src="/assets/Lucia-Enojo-sucio-Enojo-Limpio.jpeg"
                alt="Portada Oficial Lucía y el Enojo Limpio y Sucio"
                className="max-h-[480px] w-auto rounded-2xl shadow-2xl border border-white/10 relative z-10 transition-transform duration-500 group-hover:scale-[1.02]"
              />
            </div>
          </div>

          <div className="w-full md:w-1/2 text-left space-y-6">
            <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase tracking-wider">
              Obra Editorial
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white font-heading leading-tight">
              Lucía y el Enojo Limpio y Sucio
            </h2>
            <p className="text-slate-300 text-sm md:text-base leading-relaxed">
              Un cuento clínico estructurado para desarmar la Vergüenza Tóxica y devolverle al niño la brújula de sus propios límites. Escrito por Cathy Calderón de la Barca.
            </p>

            <ul className="space-y-3 text-sm text-slate-300">
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <span><strong>El Plan de la Curiosidad:</strong> 6 preguntas clínicas que la maestra y los padres usan para desescalar el berrinche.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <span><strong>La Piedrita de la Paz:</strong> Anclaje físico para que el niño anuncie que está listo para dialogar.</span>
              </li>
              <li className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-blue-400 shrink-0 mt-0.5" />
                <span><strong>Llegada de Empatía:</strong> Cierre transformador que convierte la disciplina en un puente relacional.</span>
              </li>
            </ul>

            <div className="pt-2">
              <a
                href="#acceso-clinico"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-slate-950 font-bold hover:bg-slate-200 transition-all shadow-xl hover:scale-105"
              >
                <BookOpen className="w-4 h-4" />
                <span>Solicitar Muestra para Terapeutas</span>
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: ACCESO CLÍNICO INSTITUCIONAL (LEAD MAGNET FORM) */}
      <section id="acceso-clinico" className="py-24 px-6 relative overflow-hidden bg-gradient-to-b from-[#090c13] to-[#06080d]">
        <div className="max-w-xl mx-auto text-center">
          <div className="w-14 h-14 rounded-2xl bg-blue-600/20 border border-blue-500/30 flex items-center justify-center mx-auto text-blue-400 mb-6">
            <Download className="w-7 h-7" />
          </div>

          <h2 className="text-3xl md:text-4xl font-extrabold text-white font-heading">
            Acceso al Kit Clínico
          </h2>
          <p className="text-slate-400 text-sm mt-2 mb-8">
            Diseñado exclusivamente para psicólogos, terapeutas familiares, educadores y directores escolares.
          </p>

          {formSubmitted ? (
            <div className="glass-panel p-8 rounded-3xl border border-emerald-500/40 text-center space-y-4">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mx-auto animate-bounce" />
              <h3 className="text-xl font-bold text-white">¡Acceso Concedido, Colega!</h3>
              <p className="text-sm text-slate-300">
                Hemos registrado a <strong>{leadForm.name}</strong> en la red clínica de Cathy Kids. Tu Guía de Neuroeducación y la muestra digital de Lucía están listas.
              </p>
              <div className="pt-4">
                <a
                  href="/CUENTO_LUCIA_ENOJO_LIMPIO_Y_SUCIO.md"
                  download
                  className="px-6 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-sm inline-flex items-center gap-2 shadow-lg shadow-emerald-600/30 transition-all hover:scale-105"
                >
                  <Download className="w-4 h-4" />
                  <span>Descargar Dossier del Cuento (Markdown/PDF)</span>
                </a>
              </div>
            </div>
          ) : (
            <form onSubmit={handleFormSubmit} className="glass-panel p-8 rounded-3xl border border-white/10 text-left space-y-4 shadow-2xl">
              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  required
                  placeholder="Lic. María Fernanda Morales"
                  value={leadForm.name}
                  onChange={(e) => setLeadForm({ ...leadForm, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Especialidad / Rol Profesional
                </label>
                <select
                  value={leadForm.specialty}
                  onChange={(e) => setLeadForm({ ...leadForm, specialty: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-white/10 text-white text-sm focus:outline-none focus:border-blue-500 transition-colors"
                >
                  <option value="Psicología Infantil">Psicología Infantil</option>
                  <option value="Terapeuta Familiar">Terapeuta Familiar / Pareja</option>
                  <option value="Educador / Docente">Educador / Orientador Escolar</option>
                  <option value="Neuropsicólogo">Neuropsiquiatra / Neuropsicólogo</option>
                  <option value="Madre/Padre">Madre / Padre de Familia</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 uppercase tracking-wider mb-1.5">
                  Correo Electrónico Institucional
                </label>
                <input
                  type="email"
                  required
                  placeholder="consulta@terapiafamiliar.com"
                  value={leadForm.email}
                  onChange={(e) => setLeadForm({ ...leadForm, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl bg-slate-900/90 border border-white/10 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-blue-500 transition-colors"
                />
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-500 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-sm shadow-xl shadow-blue-600/30 transition-all hover:scale-[1.02] active:scale-[0.98]"
                >
                  Acceder a la Guía Clínica y Muestra de Preventa
                </button>
              </div>

              <p className="text-[11px] text-slate-500 text-center pt-2">
                Resguardo bajo privacidad médica y escolar. Cero spam comercial.
              </p>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-10 px-6 text-center text-xs text-slate-500 space-y-2">
        <p className="text-slate-400 font-medium">
          © 2026 Cathy Kids • Cathy Calderón de la Barca • <span className="text-blue-400">cathykids.club</span>
        </p>
        <p>
          Infraestructura de Inferencia y Alta Disponibilidad soportada por <strong>SEYER Distributed Architecture</strong>.
        </p>
      </footer>
    </div>
  )
}
