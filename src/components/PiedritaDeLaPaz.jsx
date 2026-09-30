import React, { useState, useEffect, useRef } from 'react';
import { Sparkles, Heart, Wind, Flame, Smile, CheckCircle2, RotateCcw } from 'lucide-react';

export const PiedritaDeLaPaz = () => {
  // Temperatura: 100 (Volcán hirviendo) a 20 (Serena paz)
  const [temperature, setTemperature] = useState(100);
  const [breathStep, setBreathStep] = useState(0); // 0 a 4
  const [isHolding, setIsHolding] = useState(false);
  const [hasCompleted, setHasCompleted] = useState(false);
  const holdIntervalRef = useRef(null);

  // AudioContext Singleton persistente
  const getAudioContext = () => {
    if (typeof window === 'undefined') return null;
    if (!window.__cathySharedAudioCtx || window.__cathySharedAudioCtx.state === 'closed') {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) window.__cathySharedAudioCtx = new AudioCtx();
    }
    if (window.__cathySharedAudioCtx && window.__cathySharedAudioCtx.state === 'suspended') {
      window.__cathySharedAudioCtx.resume();
    }
    return window.__cathySharedAudioCtx;
  };

  // Efecto de sonido inmediato al apachurrar la Piedrita (tactile calming resonance)
  const playStonePress = () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      const osc = ctx.createOscillator();
      const harmonic = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(432, ctx.currentTime); // Frecuencia orgánica 432Hz
      osc.frequency.exponentialRampToValueAtTime(216, ctx.currentTime + 0.35);

      harmonic.type = 'triangle';
      harmonic.frequency.setValueAtTime(864, ctx.currentTime);
      harmonic.frequency.exponentialRampToValueAtTime(432, ctx.currentTime + 0.28);

      gain.gain.setValueAtTime(0.18, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.38);

      osc.connect(gain);
      harmonic.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      harmonic.start();
      osc.stop(ctx.currentTime + 0.4);
      harmonic.stop(ctx.currentTime + 0.4);
    } catch (e) {
      console.warn("Audio press fallback:", e);
    }
  };

  // Sintetizador Web Audio API para campana de paz / cuenco tibetano al completar
  const playPeaceChime = () => {
    try {
      const ctx = getAudioContext();
      if (!ctx) return;

      // Fundamental y armónicos
      const freqs = [528, 660, 792, 1056]; // Frecuencia Solfeggio 528Hz (Transformación y Paz)
      freqs.forEach((freq, idx) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();

        osc.type = idx === 0 ? 'sine' : 'triangle';
        osc.frequency.setValueAtTime(freq, ctx.currentTime);

        const volume = 0.22 / (idx + 1);
        gain.gain.setValueAtTime(volume, ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 3.5);

        osc.connect(gain);
        gain.connect(ctx.destination);

        osc.start();
        osc.stop(ctx.currentTime + 3.6);
      });
    } catch (e) {
      console.warn("AudioContext chime fallback:", e);
    }
  };

  // Respiraciones guiadas del cuento de Cathy
  const breathMessages = [
    { title: "Volcán Encendido", desc: "La cabeza arde y las manos se aprietan. Toca y mantén presionada la Piedrita de la Paz." },
    { title: "Respiración 1 de 4", desc: "Inhala despacio... y saca todo el aire hasta que no te quede nada en la pancita." },
    { title: "Respiración 2 de 4", desc: "Suelta los puños de las manos y sacude suavemente los hombros." },
    { title: "Respiración 3 de 4", desc: "Inhala luz azul... piensa en alguien o algo que amas con todo tu corazón." },
    { title: "Respiración 4 de 4", desc: "¡Siente cómo brota una sonrisa dulce en tu cara! La lava se disuelve." }
  ];

  const startCooling = () => {
    if (hasCompleted) return;
    playStonePress();
    setIsHolding(true);

    if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);

    holdIntervalRef.current = setInterval(() => {
      setTemperature((prev) => {
        if (prev <= 20) {
          clearInterval(holdIntervalRef.current);
          setIsHolding(false);
          setHasCompleted(true);
          setBreathStep(4);
          playPeaceChime();
          return 20;
        }

        const next = Math.max(20, prev - 2);
        // Actualizar pasos de respiración según enfriamiento
        if (next < 80 && next >= 60) setBreathStep(1);
        else if (next < 60 && next >= 40) setBreathStep(2);
        else if (next < 40 && next >= 25) setBreathStep(3);
        else if (next <= 20) setBreathStep(4);

        return next;
      });
    }, 150);
  };

  const stopCooling = () => {
    if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    setIsHolding(false);
  };

  const resetStone = () => {
    if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    setTemperature(100);
    setBreathStep(0);
    setIsHolding(false);
    setHasCompleted(false);
  };

  useEffect(() => {
    return () => {
      if (holdIntervalRef.current) clearInterval(holdIntervalRef.current);
    };
  }, []);

  // Calcular colores según temperatura
  const isCooled = temperature <= 25;
  const progressPercent = Math.round(((100 - temperature) / 80) * 100);

  return (
    <div className="max-w-4xl mx-auto px-4 py-12">
      <div className="relative rounded-3xl p-6 sm:p-10 border border-cyan-500/30 bg-gradient-to-b from-slate-900/95 via-slate-950/95 to-slate-900/95 shadow-2xl overflow-hidden backdrop-blur-2xl">
        {/* Glow de fondo dinámico según temperatura */}
        <div
          className={`absolute -top-20 -left-20 w-80 h-80 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
            isCooled
              ? 'bg-cyan-500/25'
              : temperature > 60
              ? 'bg-rose-600/30'
              : 'bg-amber-500/25'
          }`}
        />
        <div
          className={`absolute -bottom-20 -right-20 w-80 h-80 rounded-full blur-3xl pointer-events-none transition-all duration-700 ${
            isCooled
              ? 'bg-blue-600/25'
              : temperature > 60
              ? 'bg-red-700/25'
              : 'bg-purple-600/20'
          }`}
        />

        {/* Header con Badge */}
        <div className="text-center relative z-10 mb-8">
          <span className="text-xs uppercase tracking-widest font-mono text-cyan-300 bg-cyan-950/70 border border-cyan-700/60 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-md">
            <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
            Anclaje Somático • Pág. 86 del Cuento
          </span>
          <h3 className="text-2xl sm:text-4xl font-black text-white mt-3 mb-2 font-heading">
            La Piedrita de la Paz Interactiva
          </h3>
          <p className="text-slate-300 text-sm max-w-xl mx-auto">
            "Traer una piedrita de la paz cuando ya estemos tranquilos para enseñarle al otro que ya podemos dialogar."
          </p>
        </div>

        {/* Contenedor Principal: Piedra + Termómetro */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center relative z-10">
          {/* Zona de la Piedrita Interactiva */}
          <div className="md:col-span-6 flex flex-col items-center justify-center">
            <div className="relative group cursor-pointer select-none">
              {/* Anillo de pulso respiratorio */}
              <div
                className={`absolute -inset-4 rounded-full blur-xl transition-all duration-500 ${
                  isCooled
                    ? 'bg-cyan-400/40 animate-pulse'
                    : isHolding
                    ? 'bg-rose-500/50 scale-110'
                    : 'bg-red-600/30 animate-pulse'
                }`}
                style={{ animationDuration: isHolding ? '1.5s' : '3s' }}
              />

              {/* Botón / Piedra Táctil */}
              <button
                onMouseDown={startCooling}
                onMouseUp={stopCooling}
                onTouchStart={startCooling}
                onTouchEnd={stopCooling}
                onMouseLeave={stopCooling}
                className={`relative w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden border-4 transition-all duration-300 shadow-2xl flex flex-col items-center justify-center p-4 text-center ${
                  isCooled
                    ? 'border-cyan-300 shadow-[0_0_50px_rgba(6,182,212,0.6)] scale-105'
                    : isHolding
                    ? 'border-amber-400 scale-98 shadow-[0_0_40px_rgba(245,158,11,0.5)]'
                    : 'border-rose-500/80 shadow-[0_0_30px_rgba(239,68,68,0.4)] hover:scale-102'
                }`}
              >
                <img
                  src="/assets/piedrita_paz.jpg"
                  alt="La Piedrita de la Paz"
                  className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${
                    isCooled ? 'opacity-95' : 'opacity-40 filter saturate-150'
                  }`}
                />

                {/* Filtro de lava sobre la piedra cuando está caliente */}
                <div
                  className="absolute inset-0 transition-opacity duration-500"
                  style={{
                    backgroundColor: isCooled
                      ? 'transparent'
                      : `rgba(220, 38, 38, ${(temperature - 20) / 100})`,
                    mixBlendMode: 'color-burn'
                  }}
                />

                {/* Overlay de texto encima de la piedra */}
                <div className="relative z-10 bg-slate-950/70 backdrop-blur-md rounded-2xl p-3 border border-white/20 shadow-lg">
                  {hasCompleted ? (
                    <div className="flex flex-col items-center text-cyan-200">
                      <Sparkles className="w-8 h-8 text-yellow-300 animate-bounce mb-1" />
                      <span className="text-xs font-black uppercase tracking-wider text-cyan-300">
                        ¡Piedrita Serena!
                      </span>
                      <span className="text-[11px] text-white font-medium">
                        Listos para dialogar
                      </span>
                    </div>
                  ) : isHolding ? (
                    <div className="flex flex-col items-center text-amber-200">
                      <Wind className="w-7 h-7 text-amber-300 animate-spin mb-1" style={{ animationDuration: '4s' }} />
                      <span className="text-xs font-black uppercase tracking-wider">
                        Enfriando volcán...
                      </span>
                      <span className="text-[11px] text-white">
                        Mantén presionado
                      </span>
                    </div>
                  ) : (
                    <div className="flex flex-col items-center text-rose-200">
                      <Flame className="w-7 h-7 text-rose-400 animate-pulse mb-1" />
                      <span className="text-xs font-black uppercase tracking-wider">
                        Toca y Mantén
                      </span>
                      <span className="text-[10px] text-slate-300">
                        para iniciar respiración
                      </span>
                    </div>
                  )}
                </div>
              </button>
            </div>

            <div className="mt-4 flex items-center gap-2">
              <span className="text-xs font-mono text-slate-400">
                Temperatura: <strong className={isCooled ? 'text-cyan-400' : 'text-rose-400'}>{temperature}°C</strong>
              </span>
              {hasCompleted && (
                <button
                  onClick={resetStone}
                  className="text-xs text-slate-400 hover:text-white flex items-center gap-1 underline underline-offset-2 ml-3"
                >
                  <RotateCcw className="w-3 h-3" /> Reiniciar Ritual
                </button>
              )}
            </div>
          </div>

          {/* Zona de Guía y Respiraciones */}
          <div className="md:col-span-6 space-y-4">
            {/* Barra de Progreso del Ritual */}
            <div>
              <div className="flex justify-between items-center text-xs font-mono mb-1.5">
                <span className="text-slate-400">Alquimia de la Furia:</span>
                <span className="text-cyan-400 font-bold">{progressPercent}% Calma</span>
              </div>
              <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-white/10 p-0.5">
                <div
                  className="h-full rounded-full transition-all duration-300 bg-gradient-to-r from-rose-500 via-amber-400 to-cyan-400 shadow-md"
                  style={{ width: `${progressPercent}%` }}
                />
              </div>
            </div>

            {/* Mensaje del Paso Actual */}
            <div className="p-5 rounded-2xl bg-slate-950/80 border border-white/10 shadow-inner">
              <div className="flex items-center gap-2 mb-2">
                {hasCompleted ? (
                  <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                ) : (
                  <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                )}
                <h4 className="text-base font-bold text-white font-heading">
                  {breathMessages[breathStep].title}
                </h4>
              </div>
              <p className="text-sm text-slate-300 leading-relaxed">
                {breathMessages[breathStep].desc}
              </p>
            </div>

            {/* Los 3 Pasos del Cuento para Desactivar la Tormenta */}
            <div className="space-y-2 text-xs text-slate-300">
              <div className={`p-2.5 rounded-xl border flex items-center gap-2.5 transition-all ${
                breathStep >= 1 ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-200' : 'bg-slate-900/60 border-white/5 text-slate-400'
              }`}>
                <Wind className="w-4 h-4 text-cyan-400 shrink-0" />
                <span>1. Sacar el aire hasta vaciarse por completo (4 repeticiones).</span>
              </div>
              <div className={`p-2.5 rounded-xl border flex items-center gap-2.5 transition-all ${
                breathStep >= 2 ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-200' : 'bg-slate-900/60 border-white/5 text-slate-400'
              }`}>
                <Flame className="w-4 h-4 text-amber-400 shrink-0" />
                <span>2. Descarga motora respetuosa: saltar, sacudirse o mecerse.</span>
              </div>
              <div className={`p-2.5 rounded-xl border flex items-center gap-2.5 transition-all ${
                breathStep >= 3 ? 'bg-cyan-950/40 border-cyan-500/40 text-cyan-200' : 'bg-slate-900/60 border-white/5 text-slate-400'
              }`}>
                <Smile className="w-4 h-4 text-yellow-400 shrink-0" />
                <span>3. Pensar en quien amas hasta que una sonrisa ilumine tu rostro.</span>
              </div>
            </div>

            {hasCompleted && (
              <div className="p-3 rounded-xl bg-emerald-500/20 border border-emerald-400/40 text-emerald-200 text-xs font-medium flex items-center gap-2 animate-fadeIn">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Acuerdo Familiar Activado: "Extendemos la mano y miramos a los ojos."</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
