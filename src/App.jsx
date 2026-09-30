import React, { useState, useEffect, useRef } from 'react'
import {
  Play, Pause, Square, RotateCcw, Volume2, VolumeX, Maximize2, Minimize2,
  Heart, Sparkles, BookOpen, Brain, Activity, CheckCircle2, Radio,
  Film, MonitorPlay, Subtitles, Tv
} from 'lucide-react'
import { CharacterVoiceSelector } from './components/CharacterVoiceSelector'
import { ReguladorRelacional } from './components/ReguladorRelacional'
import { ToolkitLeadForm } from './components/ToolkitLeadForm'
import { PiedritaDeLaPaz } from './components/PiedritaDeLaPaz'
import { MaletaDeAgresion } from './components/MaletaDeAgresion'
import { CathyAuthorProfile } from './components/CathyAuthorProfile'

const PHASES = [
  {
    id: 1,
    timeRange: [0, 11.5],
    title: 'La Amenaza Neurobiológica',
    subtitle: 'El Enojo Sucio y la Herida',
    badge: 'Toma 1 • 00:00 - 00:11',
    color: 'red',
    character: '/assets/enojo-sucio.jpg',
    quote: '“Cuando corregimos desde la reactividad y la humillación, el límite se convierte en herida. El Enojo Sucio contamina el vínculo y apaga el aprendizaje infantil por miedo.”',
    clinicalNote: 'El secuestro amigdalino apaga la corteza prefrontal del niño. La humillación y el miedo bloquean la integración del límite, activando respuestas de defensa.',
    metric: 'Modo Supervivencia Activado'
  },
  {
    id: 2,
    timeRange: [11.5, 26.5],
    title: 'La Regulación y el Límite Firme',
    subtitle: 'El Enojo Limpio y el Apego a Salvo',
    badge: 'Toma 2 • 00:11 - 00:26',
    color: 'blue',
    character: '/assets/enojo-limpio.jpg',
    quote: '“Pero el enojo no se reprime: es energía vital para frenar la injusticia. Cuando nace desde el respeto, se convierte en Enojo Limpio: sostiene el límite con firmeza, manteniendo el corazón abierto y el apego a salvo.”',
    clinicalNote: 'Firmeza sin agresión. El latido fisiológico (60 BPM) promueve la regulación vagal. El límite se asimila porque el vínculo y el respeto mutuo permanecen intactos.',
    metric: 'Corregulación Vagal • 60 BPM'
  },
  {
    id: 3,
    timeRange: [26.5, 35.0],
    title: 'La Mirada Consciente de Lucía',
    subtitle: 'El Niño y sus Herramientas Somáticas',
    badge: 'Toma 3 • 00:26 - 00:35',
    color: 'amber',
    character: '/assets/lucia.jpg',
    quote: '“El niño no necesita que le quiten el enojo; necesita aprender a poner límites sin lastimar a los que ama.”',
    clinicalNote: 'Respiración somática e integración emocional. En lugar de patologizar el enojo, se dota al menor de herramientas para delimitar con seguridad afectiva.',
    metric: 'Regulación Somática Consciente'
  },
  {
    id: 4,
    timeRange: [35.0, 45.0],
    title: 'Cierre y Reflexión Terapéutica',
    subtitle: 'La Pregunta Ancla para el Foro Clínico',
    badge: 'Toma 4 • 00:35 - 00:45',
    color: 'emerald',
    character: '/assets/lucia.jpg',
    quote: '“En la familia y en el espacio terapéutico... ¿desde cuál estamos interviniendo? ¿A cuál decides alimentar hoy?”',
    clinicalNote: 'Cathy Calderón de la Barca. Herramientas clínicas, psicoeducación y literatura terapéutica para una crianza con apego seguro y límites conscientes.',
    metric: 'Anclaje Terapéutico y Crianza'
  }
]

const CHARACTERS_LAB = [
  {
    id: 'limpio',
    name: 'Enojo Limpio',
    tagline: 'Límites con Respeto',
    color: 'blue',
    image: '/assets/enojo-limpio.jpg',
    physiology: 'Corazón azul íntegro latiendo en cadencia parasimpática (60 BPM). Ceño regulado, pelaje esponjoso y manos sin garras lesivas.',
    neurobiology: 'Corteza Prefrontal conectada. Canaliza la energía vital de la asertividad y detiene la injusticia sin atacar la identidad del otro.',
    phrases: ['“¡Para! No me gusta.”', '“¡Me estoy enojando, necesito una pausa!”', '“Te amo, pero esta conducta no es aceptable.”'],
    clinicalGoal: 'Sostener la estructura vincular. Corregulación activa.'
  },
  {
    id: 'sucio',
    name: 'Enojo Sucio',
    tagline: 'Límites que Hieren',
    color: 'red',
    image: '/assets/enojo-sucio.jpg',
    physiology: 'Maza metálica con púas grises encajada contra el corazón. Pelaje erizado, garras afiladas y ceño reactivo.',
    neurobiology: 'Hiperactivación amigdalina. La frustración muta en reactividad, juicio punitivo y humillación hacia el receptor.',
    phrases: ['“¡Qué tonta eres, vete a tu cuarto!”', '“¡Así nadie te va a querer!”', '“¡Pareces loquita!”'],
    clinicalGoal: 'Identificar la coraza defensiva y desmontar la culpa y el dolor acumulado.'
  },
  {
    id: 'lucia',
    name: 'Lucía (La Integración)',
    tagline: 'La Domadora Consciente',
    color: 'purple',
    image: '/assets/lucia.jpg',
    physiology: 'Lucía al centro, sonriendo con su camiseta de arcoíris y cabello ondulado cobrizo, en actitud de apertura y valentía.',
    neurobiology: 'Integración interhemisférica. Aceptación de las emociones sin juzgarlas, eligiendo conscientemente desde los valores familiares.',
    phrases: ['“El plan de la Curiosidad.”', '“Observa dónde sientes el volcán.”', '“Ahora en casa también vive Empatía.”'],
    clinicalGoal: 'El niño aprende que el enojo no lo convierte en un monstruo: es un mensajero de sus límites.'
  }
]

export default function App() {
  const videoRef = useRef(null)
  const cinemaContainerRef = useRef(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const [currentTime, setCurrentTime] = useState(0)
  const duration = 44.97
  const [activePhaseIndex, setActivePhaseIndex] = useState(0)
  const [isMuted, setIsMuted] = useState(false)
  const [showSubtitles, setShowSubtitles] = useState(true)
  const [isFullscreen, setIsFullscreen] = useState(false)

  // Media synchronization and projector keyboard controls
  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleTimeUpdate = () => {
      const time = video.currentTime
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

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)

    video.addEventListener('timeupdate', handleTimeUpdate)
    video.addEventListener('ended', handleEnded)
    video.addEventListener('play', handlePlay)
    video.addEventListener('pause', handlePause)

    // Atajos de teclado para Presentación en Proyector
    const handleKeyDown = (e) => {
      if (['INPUT', 'TEXTAREA'].includes(document.activeElement?.tagName)) return

      if (e.code === 'Space') {
        e.preventDefault()
        togglePlay()
      } else if (e.key === 's' || e.key === 'S' || e.key === 'Escape') {
        e.preventDefault()
        stopMedia()
      } else if (e.key === 'f' || e.key === 'F') {
        e.preventDefault()
        toggleFullscreen()
      } else if (e.key === 'm' || e.key === 'M') {
        e.preventDefault()
        toggleMute()
      } else if (e.key === 'ArrowRight') {
        e.preventDefault()
        if (videoRef.current) {
          videoRef.current.currentTime = Math.min(duration, videoRef.current.currentTime + 5)
        }
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault()
        if (videoRef.current) {
          videoRef.current.currentTime = Math.max(0, videoRef.current.currentTime - 5)
        }
      } else if (['1', '2', '3', '4'].includes(e.key)) {
        jumpToPhase(parseInt(e.key, 10) - 1)
      }
    }

    const handleFullscreenChange = () => {
      setIsFullscreen(!!document.fullscreenElement)
    }

    window.addEventListener('keydown', handleKeyDown)
    document.addEventListener('fullscreenchange', handleFullscreenChange)

    return () => {
      video.removeEventListener('timeupdate', handleTimeUpdate)
      video.removeEventListener('ended', handleEnded)
      video.removeEventListener('play', handlePlay)
      video.removeEventListener('pause', handlePause)
      window.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('fullscreenchange', handleFullscreenChange)
    }
  }, [])

  const togglePlay = () => {
    const v = videoRef.current
    if (!v) return
    if (v.paused) {
      v.play().catch(console.error)
    } else {
      v.pause()
    }
  }

  const stopMedia = () => {
    const v = videoRef.current
    if (!v) return
    v.pause()
    v.currentTime = 0
    setIsPlaying(false)
    setCurrentTime(0)
    setActivePhaseIndex(0)
  }

  const restartMedia = () => {
    const v = videoRef.current
    if (!v) return
    v.currentTime = 0
    v.play().catch(console.error)
  }

  const jumpToPhase = (index) => {
    const v = videoRef.current
    if (!v) return
    const targetTime = PHASES[index].timeRange[0]
    v.currentTime = targetTime
    setActivePhaseIndex(index)
    v.play().catch(console.error)
  }

  const toggleMute = () => {
    const v = videoRef.current
    if (!v) return
    v.muted = !v.muted
    setIsMuted(v.muted)
  }

  const handleScrub = (e) => {
    const v = videoRef.current
    if (!v) return
    const rect = e.currentTarget.getBoundingClientRect()
    const clickX = e.clientX - rect.left
    const newRatio = Math.max(0, Math.min(1, clickX / rect.width))
    const newTime = newRatio * duration
    v.currentTime = newTime
    setCurrentTime(newTime)
    const phaseIdx = PHASES.findIndex(p => newTime >= p.timeRange[0] && newTime < p.timeRange[1])
    if (phaseIdx !== -1) setActivePhaseIndex(phaseIdx)
  }

  const toggleFullscreen = () => {
    const el = cinemaContainerRef.current
    const video = videoRef.current
    const isFs = !!(document.fullscreenElement || document.webkitFullscreenElement || document.mozFullScreenElement || document.msFullscreenElement)

    if (!isFs) {
      if (el?.requestFullscreen) {
        el.requestFullscreen().catch(() => {
          video?.webkitEnterFullscreen?.()
        })
      } else if (el?.webkitRequestFullscreen) {
        el.webkitRequestFullscreen()
      } else if (video?.webkitEnterFullscreen) {
        video.webkitEnterFullscreen()
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen().catch(console.error)
      } else if (document.webkitExitFullscreen) {
        document.webkitExitFullscreen()
      }
    }
  }

  // Lab Character State
  const [selectedChar, setSelectedChar] = useState(CHARACTERS_LAB[0])
  const activePhase = PHASES[activePhaseIndex]

  return (
    <div className="min-h-screen bg-[#07090e] text-slate-100 selection:bg-blue-600 selection:text-white">
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

          <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-300">
            <a href="#teaser-capsula" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
              <Film className="w-4 h-4 text-blue-400" />
              <span>Cápsula 45s (Video 4K)</span>
            </a>
            <a href="#voces" className="hover:text-cyan-400 transition-colors">Voces</a>
            <a href="#rituales-magicos" className="hover:text-amber-400 transition-colors">Rituales Mágicos</a>
            <a href="#laboratorio" className="hover:text-blue-400 transition-colors">Laboratorio</a>
            <a href="#regulador" className="hover:text-emerald-400 transition-colors">Sensor en Vivo</a>
            <a href="#libro" className="hover:text-blue-400 transition-colors">El Libro</a>
            <a href="#autora" className="hover:text-amber-400 transition-colors">Autora & Redes</a>
          </nav>

          <a
            href="#descarga-toolkit"
            className="px-4 py-2 text-xs font-bold rounded-xl bg-gradient-to-r from-emerald-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 shadow-md shadow-emerald-500/20 transition-all hover:scale-105"
          >
            Descargar Toolkit PDF
          </a>
        </div>
      </header>

      {/* HERO SECTION: SALA DE CINE & TEASER CÁPSULA 45 SEGUNDOS */}
      <section id="teaser-capsula" className="relative pt-10 pb-20 px-4 sm:px-6 overflow-hidden">
        {/* Dynamic Ambient Backglow based on active scene */}
        <div className={`absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[850px] h-[450px] blur-[160px] pointer-events-none rounded-full transition-all duration-1000 ${
          activePhase.color === 'red' ? 'bg-red-600/25' :
          activePhase.color === 'blue' ? 'bg-blue-600/25' :
          activePhase.color === 'amber' ? 'bg-amber-500/25' : 'bg-emerald-600/25'
        }`} />

        <div className="max-w-5xl mx-auto text-center relative z-10">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-slate-900/80 border border-slate-700/80 text-xs font-medium text-slate-300 mb-5 shadow-inner">
            <Sparkles className="w-3.5 h-3.5 text-amber-400 animate-pulse" />
            <span>Presentación Oficial para Foros Terapéuticos y Educativos</span>
          </div>

          <h1 className="text-3xl sm:text-5xl md:text-6xl font-extrabold tracking-tight text-white mb-4 leading-tight">
            La Anatomía del Límite: <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-300 to-red-400 bg-clip-text text-transparent">
              Lucía y el Enojo Limpio y Sucio
            </span>
          </h1>

          <p className="text-base sm:text-lg md:text-xl text-slate-300 max-w-3xl mx-auto mb-8 leading-relaxed font-light">
            El enojo no es una conducta que se reprime: es un estado del sistema nervioso que conecta o fractura el apego familiar.
          </p>



          {/* MAIN CINE VIDEO PLAYER CONSOLE */}
          <div
            ref={cinemaContainerRef}
            className={`glass-panel p-4 sm:p-6 md:p-8 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden text-left transition-all duration-700 ${
              activePhase.color === 'red' ? 'border-red-500/30 shadow-red-950/40' :
              activePhase.color === 'blue' ? 'border-blue-500/30 shadow-blue-950/40' :
              activePhase.color === 'amber' ? 'border-amber-500/30 shadow-amber-950/40' :
              'border-emerald-500/30 shadow-emerald-950/40'
            }`}
          >
            {/* Top Video Header HUD */}
            <div className="flex flex-wrap items-center justify-between gap-3 pb-4 border-b border-white/10 mb-4">
              <div className="flex items-center gap-3">
                <div className={`w-3.5 h-3.5 rounded-full ${
                  isPlaying
                    ? activePhase.color === 'red' ? 'bg-red-400 animate-ping' :
                      activePhase.color === 'blue' ? 'bg-blue-400 animate-ping' :
                      activePhase.color === 'amber' ? 'bg-amber-400 animate-ping' : 'bg-emerald-400 animate-ping'
                    : 'bg-rose-500 ring-2 ring-rose-400/40'
                }`} />
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-extrabold text-white text-sm sm:text-base tracking-wide">
                      {activePhase.badge}
                    </span>
                    <span className="text-[11px] font-mono font-semibold px-2.5 py-0.5 rounded-full bg-white/10 text-slate-200">
                      {activePhase.title}
                    </span>
                  </div>
                </div>
              </div>

              {/* Atajos de Teclado & Timecode para Proyector */}
              <div className="flex items-center gap-2.5">
                <span className="hidden md:inline-flex items-center gap-1.5 text-[11px] font-mono text-slate-400 bg-slate-900/90 px-3 py-1 rounded-lg border border-white/10">
                  <span className="text-amber-400 font-bold">[Espacio]</span> Play/Pausa • <span className="text-rose-400 font-bold">[S]</span> Stop • <span className="text-blue-400 font-bold">[F]</span> Fullscreen
                </span>
                <span className="text-sm font-mono font-black text-amber-400 bg-slate-950 px-3.5 py-1.5 rounded-xl border border-amber-500/30 shadow-inner">
                  {Math.floor(currentTime)}s <span className="text-slate-500 font-normal">/ 45s</span>
                </span>
              </div>
            </div>

            {/* CINEMA SCREEN AND PROJECTOR CONSOLE */}
            <div className="space-y-4">
              {/* Cinema Screen Frame */}
              <div className="relative aspect-video w-full rounded-2xl overflow-hidden bg-slate-950 border border-white/15 shadow-2xl group">
                <video
                  ref={videoRef}
                  src="/video/cortometraje_45s.mp4?v=3"
                  poster="/assets/lucia.jpg"
                  playsInline
                  preload="auto"
                  onClick={togglePlay}
                  className="w-full h-full object-cover cursor-pointer"
                />

                {/* Big Overlay when Paused or Stopped */}
                {!isPlaying && (
                  <div
                    onClick={togglePlay}
                    className="absolute inset-0 bg-slate-950/65 backdrop-blur-[2px] flex flex-col items-center justify-center cursor-pointer transition-all hover:bg-slate-950/45"
                  >
                    <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center shadow-2xl shadow-blue-500/60 hover:scale-110 active:scale-95 transition-all">
                      <Play className="w-8 h-8 fill-current ml-1" />
                    </div>
                    <span className="mt-4 text-base font-bold text-white tracking-wide drop-shadow-md">
                      {currentTime > 0 ? 'Video en Pausa — Clic o [Espacio] para Continuar' : 'Reproducir Cortometraje (45s)'}
                    </span>
                    <span className="text-xs text-slate-400 mt-1 font-mono">
                      {currentTime > 0 ? 'Presiona [S] para detener por completo' : 'Voz de Cathy Calderón • Master 48kHz Broadcast'}
                    </span>
                  </div>
                )}

                {/* Subtitles Overlay */}
                {showSubtitles && (
                  <div className="absolute bottom-4 left-4 right-4 pointer-events-none z-20">
                    <div className="bg-slate-950/90 backdrop-blur-md p-3.5 sm:p-4 rounded-xl border border-white/20 text-center shadow-2xl max-w-3xl mx-auto">
                      <p className="text-xs sm:text-sm md:text-base font-semibold text-amber-300 drop-shadow leading-snug">
                        {activePhase.quote}
                      </p>
                    </div>
                  </div>
                )}
              </div>

              {/* Interactive Timeline Scrubber */}
              <div
                onClick={handleScrub}
                className="h-3.5 w-full bg-slate-900 rounded-full cursor-pointer relative overflow-hidden border border-white/10 hover:border-white/30 transition-all group"
                title="Haz clic o arrastra para moverte en la línea de tiempo"
              >
                {/* Progress Fill */}
                <div
                  className="h-full bg-gradient-to-r from-blue-500 via-indigo-500 to-cyan-400 transition-all duration-100 rounded-full relative"
                  style={{ width: `${(currentTime / duration) * 100}%` }}
                >
                  <div className="absolute right-0 top-1/2 -translate-y-1/2 w-4 h-4 rounded-full bg-white shadow-lg border-2 border-blue-500 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>

                {/* Markers for the 4 scenes */}
                <div className="absolute inset-0 flex justify-between pointer-events-none opacity-40">
                  <span className="w-[1px] h-full bg-white" style={{ left: '27.7%' }} title="Toma 2: Enojo Limpio" />
                  <span className="w-[1px] h-full bg-white" style={{ left: '56.6%' }} title="Toma 3: Sensor" />
                  <span className="w-[1px] h-full bg-white" style={{ left: '83.3%' }} title="Toma 4: Cierre" />
                </div>
              </div>

              {/* Console Control Bar - Master Presenter Controls */}
              <div className="flex flex-wrap items-center justify-between gap-3 pt-2">
                <div className="flex items-center gap-2">
                  {/* PLAY / PAUSE BUTTON */}
                  <button
                    onClick={togglePlay}
                    className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg transition-all hover:scale-105 active:scale-95 ${
                      isPlaying
                        ? 'bg-amber-600 hover:bg-amber-500 text-white shadow-amber-600/30'
                        : 'bg-blue-600 hover:bg-blue-500 text-white shadow-blue-600/30'
                    }`}
                    title="Alternar Reproducción / Pausa (Barra Espaciadora)"
                  >
                    {isPlaying ? <Pause className="w-4 h-4 fill-current" /> : <Play className="w-4 h-4 fill-current ml-0.5" />}
                    <span>{isPlaying ? 'PAUSA' : 'REPRODUCIR'}</span>
                  </button>

                  {/* STOP BUTTON */}
                  <button
                    onClick={stopMedia}
                    className="px-4 py-2.5 rounded-xl bg-rose-950/80 hover:bg-rose-900 text-rose-200 border border-rose-500/40 hover:border-rose-400 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-md transition-all hover:scale-105 active:scale-95"
                    title="Detener por completo y reiniciar a 00:00 (Tecla S o Escape)"
                  >
                    <Square className="w-4 h-4 fill-current text-rose-400" />
                    <span>STOP</span>
                  </button>

                  {/* REINICIAR */}
                  <button
                    onClick={restartMedia}
                    className="p-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 border border-white/10 transition-colors"
                    title="Reiniciar video desde 00:00"
                  >
                    <RotateCcw className="w-4 h-4" />
                  </button>
                </div>

                {/* 4 SCENE JUMP BUTTONS FOR PRESENTER */}
                <div className="flex flex-wrap gap-1.5 sm:gap-2">
                  {PHASES.map((p, idx) => (
                    <button
                      key={p.id}
                      onClick={() => jumpToPhase(idx)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-bold font-mono transition-all border ${
                        activePhaseIndex === idx
                          ? p.color === 'red' ? 'bg-red-500/25 text-red-200 border-red-500 shadow-md shadow-red-950/50 ring-1 ring-red-400' :
                            p.color === 'blue' ? 'bg-blue-500/25 text-blue-200 border-blue-500 shadow-md shadow-blue-950/50 ring-1 ring-blue-400' :
                            p.color === 'amber' ? 'bg-amber-500/25 text-amber-200 border-amber-500 shadow-md shadow-amber-950/50 ring-1 ring-amber-400' :
                            'bg-emerald-500/25 text-emerald-200 border-emerald-500 shadow-md shadow-emerald-950/50 ring-1 ring-emerald-400'
                          : 'bg-slate-900/80 text-slate-400 border-white/10 hover:border-white/30 hover:text-white'
                      }`}
                      title={`Ir a ${p.badge}`}
                    >
                      {p.id === 1 ? '1. Enojo Sucio' :
                       p.id === 2 ? '2. Enojo Limpio' :
                       p.id === 3 ? '3. Lucía Respira' : '4. Cierre'}
                    </button>
                  ))}
                </div>

                {/* Secondary Toggles: Subtitles, Mute, Fullscreen */}
                <div className="flex items-center gap-2 ml-auto">
                  <button
                    onClick={() => setShowSubtitles(!showSubtitles)}
                    className={`p-2.5 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-colors ${
                      showSubtitles
                        ? 'bg-amber-500/20 text-amber-300 border-amber-500/40'
                        : 'bg-slate-900 text-slate-400 border-white/5 hover:text-white'
                    }`}
                    title={showSubtitles ? 'Ocultar subtítulos' : 'Mostrar subtítulos'}
                  >
                    <Subtitles className="w-4 h-4" />
                    <span className="hidden sm:inline">CC</span>
                  </button>

                  <button
                    onClick={toggleMute}
                    className="p-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 border border-white/10 transition-colors"
                    title={isMuted ? 'Activar sonido (M)' : 'Silenciar (M)'}
                  >
                    {isMuted ? <VolumeX className="w-4 h-4 text-rose-400" /> : <Volume2 className="w-4 h-4" />}
                  </button>

                  {/* PROYECTOR FULLSCREEN BUTTON */}
                  <button
                    onClick={toggleFullscreen}
                    className="px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-xs flex items-center gap-2 shadow-lg shadow-indigo-600/30 transition-all hover:scale-105 active:scale-95 border border-indigo-400/30"
                    title="Pantalla Completa para Proyector (Tecla F)"
                  >
                    {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
                    <span className="hidden sm:inline">PROYECTOR (F)</span>
                  </button>
                </div>
              </div>

              {/* Synchronized Live Clinical Teleprompter Card */}
              <div className="mt-4 p-5 rounded-2xl bg-slate-950/85 border border-white/10 grid grid-cols-1 md:grid-cols-12 gap-6 items-center shadow-xl">
                <div className="md:col-span-8 space-y-2">
                  <div className="flex items-center gap-2">
                    <Activity className="w-4 h-4 text-blue-400" />
                    <span className="text-xs font-mono font-bold uppercase tracking-wider text-slate-300">
                      {activePhase.metric}
                    </span>
                  </div>
                  <h3 className="text-lg sm:text-xl font-bold text-white font-heading">
                    {activePhase.title} — <span className="text-slate-400 text-sm font-normal">{activePhase.subtitle}</span>
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed bg-white/5 p-3 rounded-xl border-l-4 border-blue-500">
                    <strong>Lectura Clínica:</strong> {activePhase.clinicalNote}
                  </p>
                </div>

                <div className="md:col-span-4 flex flex-col items-center justify-center p-3 rounded-xl bg-slate-900/80 border border-white/5 text-center">
                  <img
                    src={activePhase.character === 'iot-mockup' ? '/assets/piedrita_paz.jpg' : activePhase.character}
                    alt={activePhase.title}
                    className="w-24 h-24 object-cover rounded-xl shadow-lg mb-2"
                  />
                  <span className="text-[11px] font-mono text-slate-400">
                    Asset 3D Master
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION: VOCES DE LOS PERSONAJES */}
      <section id="voces" className="py-8 bg-[#080b11] border-t border-white/5">
        <CharacterVoiceSelector />
      </section>

      {/* SECTION: RITUALES MÁGICOS Y EXPERIENCIAS SENSORIALES DEL CUENTO */}
      <section id="rituales-magicos" className="py-16 bg-[#07090f] border-t border-white/5 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 mb-12 text-center">
          <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-amber-500/10 text-amber-400 border border-amber-500/20 uppercase tracking-wider">
            Pensamiento Mágico & Herramientas Somáticas
          </span>
          <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-3 font-heading">
            Experiencias Interactivas del Cuento
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto mt-3 text-sm md:text-base">
            Los anclajes tangibles creados por Cathy Calderón para transformar la reactividad en conexión lúdica y regulación somática.
          </p>
        </div>

        <div className="space-y-16">
          <PiedritaDeLaPaz />
          <MaletaDeAgresion />
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

          {/* Character Switcher Tabs (3 Protagonistas) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-8 max-w-4xl mx-auto">
            {CHARACTERS_LAB.map((c) => {
              const isSelected = selectedChar.id === c.id
              return (
                <button
                  key={c.id}
                  onClick={() => setSelectedChar(c)}
                  className={`p-4 rounded-2xl border transition-all text-left flex items-center gap-3 ${
                    isSelected
                      ? c.color === 'blue'
                        ? 'bg-blue-950/70 border-blue-500 shadow-lg shadow-blue-900/30 ring-1 ring-blue-400/40'
                        : c.color === 'red'
                        ? 'bg-red-950/70 border-red-500 shadow-lg shadow-red-900/30 ring-1 ring-red-400/40'
                        : 'bg-purple-950/70 border-purple-500 shadow-lg shadow-purple-900/30 ring-1 ring-purple-400/40'
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

      {/* SECTION 3: LIVE DEMO - REGULADOR RELACIONAL (WEB AUDIO API) */}
      <section id="regulador" className="py-20 px-6 relative overflow-hidden bg-slate-950/60 border-t border-white/5">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-10">
            <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-cyan-500/10 text-cyan-400 border border-cyan-500/20 uppercase tracking-wider">
              Live Demo en Tiempo Real • Web Audio API
            </span>
            <h2 className="text-3xl md:text-4xl font-extrabold text-white mt-3 font-heading">
              El Regulador Relacional Interactivo
            </h2>
            <p className="text-slate-400 max-w-2xl mx-auto mt-2 text-sm md:text-base">
              Prueba en vivo la tecnología de escucha ambiental para la mesa familiar. Activa tu micrófono y observa cómo cambia de color ante variaciones de energía y volumen.
            </p>
          </div>

          <ReguladorRelacional />
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

      {/* SECTION 5: ACCESO CLÍNICO Y ENTREGA DE TOOLKIT (WHATSAPP + PDF) */}
      <ToolkitLeadForm />

      {/* SECTION 6: AUTORA Y REDES SOCIALES OFICIALES */}
      <CathyAuthorProfile />

      {/* FOOTER */}
      <footer className="border-t border-white/10 py-12 px-6 text-center text-xs text-slate-400 space-y-4 bg-[#05070b]">
        <div className="max-w-4xl mx-auto flex flex-wrap items-center justify-center gap-6 text-sm font-medium text-slate-300">
          <a href="https://cathycdelabarca.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors flex items-center gap-1.5">
            <span>Sitio Web Oficial</span>
          </a>
          <span className="text-white/20">•</span>
          <a href="https://www.instagram.com/cathycdelabarca" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 transition-colors">
            <span>Instagram (@cathycdelabarca)</span>
          </a>
          <span className="text-white/20">•</span>
          <a href="https://www.youtube.com/@cathycdelabarca" target="_blank" rel="noopener noreferrer" className="hover:text-red-400 transition-colors">
            <span>YouTube (Cathy C de la Barca)</span>
          </a>
          <span className="text-white/20">•</span>
          <a href="https://www.facebook.com/cathycdelabarca" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 transition-colors">
            <span>Facebook</span>
          </a>
          <span className="text-white/20">•</span>
          <a href="https://www.linkedin.com/in/cathy-c-de-la-barca-7492a355/" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
            <span>LinkedIn</span>
          </a>
        </div>
        <p className="text-slate-400 font-medium">
          © 2026 Cathy Kids • Dra. Cathy Calderón de la Barca • <span className="text-blue-400">cathykids.club</span>
        </p>
        <p className="text-slate-600 text-[11px]">
          Desarrollo, Narrativa Clínica y Alta Disponibilidad soportada por <strong>SEYER Distributed Architecture</strong>.
        </p>
      </footer>
    </div>
  )
}
