import React, { useState, useRef, useEffect } from 'react';
import { Luggage, Check, Sparkles, Shield, HeartHandshake, ArrowRight, RotateCcw } from 'lucide-react';

export const MaletaDeAgresion = () => {
  const [selectedPhrases, setSelectedPhrases] = useState([]);
  const [isDeparted, setIsDeparted] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const handleStopMedia = () => {
      setIsHovered(false);
      video.pause();
      try { video.currentTime = 0; } catch (e) {}
    };

    window.addEventListener('cathy:stop-all-character-media', handleStopMedia);

    if (isHovered && !isDeparted) {
      window.dispatchEvent(new CustomEvent('cathy:pause-main-video'));
      video.muted = false;
      const playPromise = video.play();
      if (playPromise !== undefined) playPromise.catch(() => {});
    } else {
      video.pause();
      try {
        video.currentTime = 0;
      } catch (e) {}
    }

    return () => {
      window.removeEventListener('cathy:stop-all-character-media', handleStopMedia);
    };
  }, [isHovered, isDeparted]);

  const cleanPhrases = [
    { id: 1, text: "¡Para!", icon: "🛑" },
    { id: 2, text: "¡No me gusta!", icon: "✋" },
    { id: 3, text: "¡Me estoy enojando!", icon: "⚡" },
    { id: 4, text: "¡No puedo hablar ahora!", icon: "🤐" },
    { id: 5, text: "¡Siento que voy a explotar!", icon: "🌋" },
    { id: 6, text: "¡Tengo ganas de pegar (necesito espacio)!", icon: "🛡️" },
    { id: 7, text: "Tiempo fuera con la Piedrita de la Paz", icon: "💎" },
    { id: 8, text: "Cruzar brazos y avisar cuando esté listo", icon: "🤝" }
  ];

  // Pre-allocated Audio Pool para clic ultrarrápido en móvil y desktop sin agotar hardware
  const playClick = () => {
    try {
      if (!window.__cathyClickPool) {
        const CLICK_SRC = '/audio/sfx/maleta_click.mp3?v=20260930_prod_v2';
        window.__cathyClickPool = [
          new Audio(CLICK_SRC),
          new Audio(CLICK_SRC),
          new Audio(CLICK_SRC),
          new Audio(CLICK_SRC)
        ];
        window.__cathyClickPool.forEach(a => { a.preload = 'auto'; a.playsInline = true; });
        window.__cathyClickIndex = 0;
      }
      const audio = window.__cathyClickPool[window.__cathyClickIndex];
      window.__cathyClickIndex = (window.__cathyClickIndex + 1) % window.__cathyClickPool.length;
      audio.currentTime = 0;
      const p = audio.play();
      if (p !== undefined) p.catch(() => {});
    } catch (e) {
      console.warn("Click audio fallback:", e);
    }
  };

  const playSuccess = () => {
    try {
      if (!window.__cathySuccessAudio) {
        window.__cathySuccessAudio = new Audio('/audio/sfx/maleta_success.mp3?v=20260930_prod_v2');
        window.__cathySuccessAudio.preload = 'auto';
        window.__cathySuccessAudio.playsInline = true;
      }
      window.__cathySuccessAudio.currentTime = 0;
      const p = window.__cathySuccessAudio.play();
      if (p !== undefined) p.catch(() => {});
    } catch (e) {
      console.warn("Success audio fallback:", e);
    }
  };

  const togglePhrase = (id) => {
    playClick();
    let updated;
    if (selectedPhrases.includes(id)) {
      updated = selectedPhrases.filter((p) => p !== id);
    } else {
      updated = [...selectedPhrases, id];
    }
    setSelectedPhrases(updated);

    if (updated.length >= 4) {
      setIsDeparted(true);
      playSuccess();
    } else {
      setIsDeparted(false);
    }
  };

  const resetGame = () => {
    setSelectedPhrases([]);
    setIsDeparted(false);
  };

  const progress = Math.min(100, Math.round((selectedPhrases.length / 4) * 100));

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <span className="text-xs uppercase tracking-widest font-mono text-emerald-400 bg-emerald-950/60 border border-emerald-700/50 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-lg">
          <Luggage className="w-3.5 h-3.5 text-emerald-400" />
          Dinámica Interactiva • Pág. 93 y 111 del Cuento
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 mb-3 tracking-tight font-heading">
          La Despedida de la Agresión
        </h2>
        <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          Cuando en casa y en el aula aprendemos a decir frases de <strong>Enojo Limpio</strong>, la Agresión con su cresta punk empaca sus maletas y se va de viaje. ¡Elige 4 frases para abrir la puerta de salida!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center bg-slate-900/90 border border-emerald-500/30 rounded-3xl p-6 sm:p-10 shadow-2xl relative overflow-hidden backdrop-blur-2xl">
        {/* Glow de fondo */}
        <div className="absolute top-0 right-0 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />

        {/* Zona Izquierda: La Agresión con sus Maletas */}
        <div
          onMouseEnter={() => setIsHovered(true)}
          onMouseLeave={() => setIsHovered(false)}
          onClick={() => {
            if (!isDeparted) {
              setIsHovered(!isHovered);
            }
          }}
          className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-950/80 rounded-2xl border border-white/10 relative text-center group cursor-pointer"
        >
          <div className="relative overflow-hidden rounded-2xl w-72 h-72">
            {isDeparted ? (
              /* Imagen de Agresión volando en su avión Punk Flyer tras ser despedido */
              <img
                src="/assets/agresion_avion_despedida.jpg"
                alt="Agresión despidiéndose en su avión Punk Flyer"
                className="w-full h-full object-cover rounded-2xl shadow-2xl transition-all duration-700 hover:scale-105"
              />
            ) : (
              <>
                {/* Imagen estática de Agresión */}
                <img
                  src="/assets/agresion.jpg"
                  alt="Agresión con Maleta"
                  className={`w-full h-full object-cover rounded-2xl shadow-2xl transition-opacity duration-300 absolute inset-0 ${
                    isHovered ? 'opacity-0' : 'opacity-100 group-hover:scale-105'
                  }`}
                />

                {/* Video animado con audio SFX al pasar el mouse o tocar en móvil */}
                <video
                  ref={videoRef}
                  src="/video/agresion-animado.mp4"
                  loop
                  playsInline
                  webkit-playsinline="true"
                  disableRemotePlayback
                  disablePictureInPicture
                  x-webkit-airplay="deny"
                  controlsList="nodownload noplaybackrate nofullscreen noremoteplayback"
                  preload="auto"
                  className={`w-full h-full object-cover rounded-2xl shadow-2xl transition-opacity duration-300 absolute inset-0 ${
                    isHovered ? 'opacity-100' : 'opacity-0 pointer-events-none'
                  }`}
                />

                {/* Badge flotante de animación activa */}
                {isHovered ? (
                  <div className="absolute top-2.5 left-2.5 z-10 pointer-events-none">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-950/85 text-rose-400 border border-rose-500/40 backdrop-blur-md flex items-center gap-1 shadow-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-ping" />
                      Sonido & Movimiento
                    </span>
                  </div>
                ) : (
                  <div className="md:hidden absolute bottom-2.5 left-2.5 z-10 pointer-events-none">
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-950/85 text-rose-300 border border-rose-400/40 backdrop-blur-md flex items-center gap-1 shadow-md">
                      <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                      👆 Toca para mover
                    </span>
                  </div>
                )}
              </>
            )}

            {/* Cartel de Despedida cuando se activa */}
            {isDeparted && (
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950 via-slate-950/90 to-transparent p-4 flex flex-col items-center text-center animate-fadeIn">
                <span className="text-xs font-black uppercase tracking-wider text-emerald-300 flex items-center gap-1.5">
                  <Sparkles className="w-3.5 h-3.5 text-yellow-300 animate-bounce" />
                  ¡Agresión ha partido en su avión!
                </span>
                <p className="text-[11px] text-slate-300 mt-1 max-w-xs">
                  "Con límites firmes y respetuosos, la violencia física ya no cabe en este hogar."
                </p>
                <button
                  onClick={resetGame}
                  className="mt-2.5 px-3 py-1 rounded-lg bg-emerald-500/20 text-emerald-200 border border-emerald-500/30 text-[11px] hover:bg-emerald-500/30 flex items-center gap-1.5 transition-colors"
                >
                  <RotateCcw className="w-3 h-3" /> Jugar de nuevo
                </button>
              </div>
            )}
          </div>

          <div className="mt-4">
            <span className={`text-xs font-mono font-bold px-3 py-1 rounded-full border ${
              isDeparted
                ? 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
                : 'bg-rose-500/20 text-rose-300 border-rose-500/40'
            }`}>
              {isDeparted ? '✈️ Volando hacia el horizonte' : isHovered ? '⚡ Agresión inquieta (Pasa a Enojo Limpio)' : '🎒 Esperando en la sala'}
            </span>
          </div>
        </div>

        {/* Zona Derecha: Tablero de Frases de Enojo Limpio */}
        <div className="lg:col-span-7 space-y-6">
          {/* Barra de Hogar Seguro */}
          <div>
            <div className="flex justify-between items-center text-xs font-mono mb-2">
              <span className="text-slate-400">Medidor de Hogar Seguro con Límites:</span>
              <span className="text-emerald-400 font-bold">{progress}% Listo</span>
            </div>
            <div className="w-full h-3 bg-slate-950 rounded-full overflow-hidden border border-white/10 p-0.5">
              <div
                className="h-full rounded-full transition-all duration-500 bg-gradient-to-r from-teal-500 to-emerald-400 shadow-md"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-[11px] text-slate-400 mt-1.5">
              {selectedPhrases.length < 4
                ? `Selecciona ${4 - selectedPhrases.length} frases más para que Agresión tome sus maletas.`
                : '¡Meta alcanzada! La familia acordó hablar con Enojo Limpio.'}
            </p>
          </div>

          {/* Grilla de Frases */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {cleanPhrases.map((phrase) => {
              const isSelected = selectedPhrases.includes(phrase.id);
              return (
                <button
                  key={phrase.id}
                  onClick={() => togglePhrase(phrase.id)}
                  className={`p-3.5 rounded-xl border text-left flex items-center justify-between gap-3 transition-all duration-200 ${
                    isSelected
                      ? 'bg-emerald-950/60 border-emerald-400 text-white shadow-lg ring-1 ring-emerald-400/50 scale-[1.02]'
                      : 'bg-slate-950/60 border-white/10 text-slate-300 hover:border-emerald-500/40 hover:bg-slate-900'
                  }`}
                >
                  <div className="flex items-center gap-2.5">
                    <span className="text-base">{phrase.icon}</span>
                    <span className="text-xs font-bold">{phrase.text}</span>
                  </div>
                  <div className={`w-5 h-5 rounded-md flex items-center justify-center border transition-colors ${
                    isSelected
                      ? 'bg-emerald-500 border-emerald-400 text-slate-950'
                      : 'border-white/20 bg-white/5'
                  }`}>
                    {isSelected && <Check className="w-3.5 h-3.5 stroke-[3]" />}
                  </div>
                </button>
              );
            })}
          </div>

          <div className="p-4 rounded-xl bg-slate-950/60 border border-white/5 text-xs text-slate-400 flex items-center gap-2.5">
            <HeartHandshake className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>
              <strong>Pacto del Cuento:</strong> "Mamá y papá dejaron de usar palabras como 'fea' o 'tonta', y Lucy dejó de patear y empujar. El hogar se volvió un lugar seguro."
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};
