import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Sparkles, Flame, ShieldCheck } from 'lucide-react';

const CharacterCard = ({ 
  char, 
  isActive, 
  isPlayingVoice, 
  onToggleActive, 
  onToggleVoice 
}) => {
  const videoRef = useRef(null);
  const Icon = char.theme.icon;

  const isAnimated = isActive || isPlayingVoice;

  // Escuchar evento global de parada de emergencia
  useEffect(() => {
    const handleStopAll = () => {
      const video = videoRef.current;
      if (video) {
        video.pause();
        try { video.currentTime = 0; } catch (e) {}
      }
    };
    window.addEventListener('cathy:stop-all-character-media', handleStopAll);
    return () => window.removeEventListener('cathy:stop-all-character-media', handleStopAll);
  }, []);

  // Controlar reproducción del video: SIEMPRE MUTED para evitar que los audios se contrapongan
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    if (isAnimated) {
      video.muted = true;
      video.defaultMuted = true;
      const playPromise = video.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {});
      }
    } else {
      video.pause();
      try {
        video.currentTime = 0;
      } catch (e) {}
    }
  }, [isAnimated]);

  return (
    <div
      onMouseEnter={() => {
        // En desktop activa la previsualización al pasar el mouse
        if (window.matchMedia('(hover: hover)').matches) {
          onToggleActive(char.id, true);
        }
      }}
      onMouseLeave={() => {
        // En desktop apaga al retirar el mouse (salvo que esté sonando la voz)
        if (window.matchMedia('(hover: hover)').matches && !isPlayingVoice) {
          onToggleActive(null, false);
        }
      }}
      className={`group relative rounded-3xl p-5 border bg-slate-900/85 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl ${char.theme.border} ${
        isPlayingVoice ? 'scale-[1.03] ring-2 ring-white/30 shadow-2xl bg-slate-900/95' : 'hover:scale-[1.01]'
      }`}
    >
      {/* Glow ambiental */}
      <div className={`absolute top-0 right-0 w-44 h-44 bg-gradient-to-br ${char.theme.glow} rounded-full blur-3xl pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity`} />

      <div>
        {/* Imagen del Personaje con Video interactivo al Tap/Click */}
        <div
          onClick={() => {
            // Tocar la imagen alterna la animación exclusivamente para este personaje
            onToggleActive(isActive ? null : char.id);
          }}
          className="relative w-full aspect-square rounded-2xl overflow-hidden mb-4 bg-slate-950/80 border border-white/10 shadow-inner group-hover:border-white/20 transition-all cursor-pointer select-none"
          title="Toca para animar"
        >
          {/* Imagen Estática de Fondo */}
          <img
            src={char.image}
            alt={char.name}
            className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ${
              isAnimated ? 'opacity-0' : 'opacity-100 group-hover:scale-105'
            }`}
          />

          {/* Video Animado: SIEMPRE MUTED (Silenciado) en iOS y Android */}
          {char.videoSrc && (
            <video
              ref={videoRef}
              src={char.videoSrc}
              loop
              muted
              playsInline
              webkit-playsinline="true"
              disableRemotePlayback
              disablePictureInPicture
              x-webkit-airplay="deny"
              controlsList="nodownload noplaybackrate nofullscreen noremoteplayback"
              preload="metadata"
              className={`w-full h-full object-cover absolute inset-0 transition-opacity duration-300 ${
                isAnimated ? 'opacity-100' : 'opacity-0 pointer-events-none'
              }`}
            />
          )}

          {/* Indicador de animación activa */}
          {isAnimated ? (
            <div className="absolute bottom-2.5 left-2.5 z-10 pointer-events-none">
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-950/85 text-emerald-400 border border-emerald-400/40 backdrop-blur-md flex items-center gap-1 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-ping" />
                {isPlayingVoice ? 'Reproduciendo Voz' : 'Animación Activa'}
              </span>
            </div>
          ) : (
            <div className="md:hidden absolute bottom-2.5 left-2.5 z-10 pointer-events-none">
              <span className="text-[9px] font-mono font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-slate-950/85 text-amber-300 border border-amber-400/40 backdrop-blur-md flex items-center gap-1 shadow-md">
                <span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse" />
                👆 Toca para animar
              </span>
            </div>
          )}

          <div className="absolute top-2.5 left-2.5 z-10">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border backdrop-blur-md ${char.theme.badgeBg}`}>
              {char.ageTag}
            </span>
          </div>
          <div className="absolute bottom-2.5 right-2.5 z-10">
            <div className="w-8 h-8 rounded-full bg-slate-950/80 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg">
              <Icon className="w-4 h-4" />
            </div>
          </div>
        </div>

        <div className="mb-2">
          <h3 className="text-xl font-black text-white group-hover:text-cyan-300 transition-colors">
            {char.name}
          </h3>
          <p className="text-[11px] text-slate-400 font-mono mt-0.5 line-clamp-1">
            {char.voiceName}
          </p>
        </div>

        <p className="text-xs text-slate-300 mb-3 leading-snug line-clamp-2">
          {char.role}
        </p>

        {/* Diálogo del Cuento */}
        <div className="bg-slate-950/80 border border-white/5 rounded-xl p-3 mb-3 relative">
          <p className="text-xs italic text-slate-200 leading-relaxed">
            {char.quote}
          </p>
        </div>

        {/* Llave Mágica / Mensaje Secreto */}
        <div className="bg-blue-950/30 border border-blue-500/20 rounded-xl p-2.5 mb-4 text-[11px] text-blue-200 flex items-start gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300 shrink-0 mt-0.5" />
          <span className="leading-tight">
            <strong>Poder:</strong> {char.secretMessage}
          </span>
        </div>
      </div>

      {/* Botón de Reproducción de Voz Oficial (Única fuente de sonido) */}
      <div>
        <button
          onClick={() => onToggleVoice(char)}
          className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 ${char.theme.button}`}
        >
          {isPlayingVoice ? (
            <>
              <Pause className="w-3.5 h-3.5 fill-current" />
              <span>Detener Voz</span>
              <span className="flex gap-0.5 ml-2 items-end h-3.5">
                <span className="w-1 bg-current animate-pulse h-2.5" />
                <span className="w-1 bg-current animate-pulse delay-75 h-3.5" />
                <span className="w-1 bg-current animate-pulse delay-150 h-1.5" />
              </span>
            </>
          ) : (
            <>
              <Play className="w-3.5 h-3.5 fill-current" />
              <span>Escuchar Voz Real</span>
            </>
          )}
        </button>
      </div>
    </div>
  );
};

export const CharacterVoiceSelector = () => {
  const [activeCharId, setActiveCharId] = useState(null);
  const [playingVoiceId, setPlayingVoiceId] = useState(null);
  const activeAudioRef = useRef(null);
  const sectionRef = useRef(null);

  const characters = [
    {
      id: 'lucia',
      name: 'Lucía (La Domadora)',
      ageTag: '6 Años • Protagonista Valiente',
      role: 'Aprende a transformar la tormenta en valentía y límites firmes',
      quote: '"A veces siento el volcán en el pecho... pero respiro profundo y elijo no lastimar a los que amo. ¡Elijo la luz del Enojo Limpio!"',
      audioSrc: '/audio/lucia_voice.mp3?v=20260930_prod_v3',
      voiceName: 'Voz Niña (Dulce & Valiente)',
      image: '/assets/lucia.jpg',
      videoSrc: '/video/lucia-animada.mp4',
      magicPower: 'Báculo de Domadora y Piedrita de la Paz',
      secretMessage: 'Al mirar a mamá y papá a los ojos con valentía, la vergüenza se disuelve.',
      theme: {
        border: 'border-amber-400/40 hover:border-amber-400',
        badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-400/30',
        glow: 'from-amber-500/25 to-yellow-500/10',
        button: 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950',
        icon: Sparkles
      }
    },
    {
      id: 'enojo_limpio',
      name: 'Enojo Limpio',
      ageTag: 'El Guardián con Corazón',
      role: 'Firmeza con valores, respeto y amor que cuida sin lastimar',
      quote: '"¡El enojo no es para destruir! Es mi superpoder de héroe para poner límites con amor y cuidar nuestro corazón."',
      audioSrc: '/audio/enojo_limpio_voice.mp3?v=20260930_prod_v2',
      voiceName: 'Voz Caricatura Animada (Héroe Noble)',
      image: '/assets/enojo-limpio.jpg',
      videoSrc: '/video/enojo-limpio-animado.mp4',
      magicPower: 'Escudo de Luz y Corazón Abierto',
      secretMessage: 'Dice ¡Para! y ¡No me gusta! con respeto, sin usar malas palabras.',
      theme: {
        border: 'border-cyan-400/40 hover:border-cyan-400',
        badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30',
        glow: 'from-cyan-600/25 to-blue-950/20',
        button: 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white',
        icon: ShieldCheck
      }
    },
    {
      id: 'enojo_sucio',
      name: 'Enojo Sucio',
      ageTag: 'El Volcán Reactivo',
      role: 'Púas, críticas y gritos que explotan sin control',
      quote: '"¡¡Todo me molesta!! ¡¡Si me tocan, exploto como un volcán y grito con furia!! ¡¡Grrr, fuera de mi camino!!"',
      audioSrc: '/audio/enojo_sucio_voice.mp3?v=20260930_prod_v2',
      voiceName: 'Voz Estilo Furia (Intensa Mente)',
      image: '/assets/enojo-sucio.jpg',
      videoSrc: '/video/enojo-sucio-animado.mp4',
      magicPower: 'Bola de Púas de Metal sobre el Corazón',
      secretMessage: 'Cree que atacar primero lo protegerá, pero solo lo deja solito.',
      theme: {
        border: 'border-rose-500/40 hover:border-rose-500',
        badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        glow: 'from-rose-600/25 to-red-950/20',
        button: 'bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white',
        icon: Flame
      }
    }
  ];

  // Función maestra para apagar todos los audios y videos inmediatamente
  const stopAllMedia = () => {
    if (activeAudioRef.current) {
      activeAudioRef.current.pause();
      try { activeAudioRef.current.currentTime = 0; } catch (e) {}
      activeAudioRef.current = null;
    }
    setPlayingVoiceId(null);
    setActiveCharId(null);
    window.dispatchEvent(new CustomEvent('cathy:stop-all-character-media'));
    window.dispatchEvent(new CustomEvent('cathy:unduck-main-video'));
  };

  // DETECCIÓN DE SCROLL ROBUSTA PARA iOS Y ANDROID (IntersectionObserver + Scroll Pasivo + Visibilidad)
  useEffect(() => {
    // 1. IntersectionObserver estándar para navegadores modernos
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting || entry.intersectionRatio < 0.1) {
            stopAllMedia();
          }
        });
      },
      { threshold: [0, 0.1, 0.2] }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    // 2. Fallback de Scroll Pasivo para Safari iOS (inercia táctil)
    const handleScroll = () => {
      if (!sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight || document.documentElement.clientHeight;
      // Si el bloque se desplazó fuera del viewport visible, pausar de inmediato
      if (rect.bottom < 50 || rect.top > viewportHeight - 50) {
        stopAllMedia();
      }
    };

    // 3. Fallback de cambio de pestaña o bloqueo de pantalla en móviles
    const handleVisibilityChange = () => {
      if (document.hidden) {
        stopAllMedia();
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    document.addEventListener('visibilitychange', handleVisibilityChange);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
    };
  }, []);

  const handleToggleActive = (charId) => {
    // Si se activa un nuevo personaje, apagar el audio del anterior si había uno
    if (charId && charId !== activeCharId && playingVoiceId && playingVoiceId !== charId) {
      if (activeAudioRef.current) {
        activeAudioRef.current.pause();
        activeAudioRef.current = null;
      }
      setPlayingVoiceId(null);
      window.dispatchEvent(new CustomEvent('cathy:unduck-main-video'));
    }
    setActiveCharId(charId);
  };

  const handleToggleVoice = (char) => {
    // Si ya está sonando este mismo personaje, detenerlo
    if (playingVoiceId === char.id) {
      stopAllMedia();
      return;
    }

    // Detener cualquier audio previo
    if (activeAudioRef.current) {
      activeAudioRef.current.pause();
      try { activeAudioRef.current.currentTime = 0; } catch (e) {}
      activeAudioRef.current = null;
    }

    // Activar animación exclusiva para este personaje
    setActiveCharId(char.id);

    try {
      window.dispatchEvent(new CustomEvent('cathy:duck-main-video'));
      const audio = new Audio(char.audioSrc);
      audio.playsInline = true;
      audio.preload = 'auto';
      activeAudioRef.current = audio;

      audio.onended = () => {
        setPlayingVoiceId(null);
        activeAudioRef.current = null;
        window.dispatchEvent(new CustomEvent('cathy:unduck-main-video'));
      };

      audio.onerror = () => {
        setPlayingVoiceId(null);
        activeAudioRef.current = null;
        window.dispatchEvent(new CustomEvent('cathy:unduck-main-video'));
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setPlayingVoiceId(char.id);
        }).catch((err) => {
          console.warn("Audio play prevented:", err);
          setPlayingVoiceId(null);
          activeAudioRef.current = null;
          window.dispatchEvent(new CustomEvent('cathy:unduck-main-video'));
        });
      }
    } catch (e) {
      console.error("Audio init error:", e);
      setPlayingVoiceId(null);
      window.dispatchEvent(new CustomEvent('cathy:unduck-main-video'));
    }
  };

  return (
    <div ref={sectionRef} className="max-w-7xl mx-auto px-4 py-16">
      <div className="text-center mb-12">
        <span className="text-xs uppercase tracking-widest font-mono text-cyan-400 bg-cyan-950/60 border border-cyan-700/50 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-yellow-400 animate-spin" style={{ animationDuration: '6s' }} />
          El Universo Emocional • Cathy Kids
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 mb-3 tracking-tight font-heading">
          Los 3 Protagonistas del Cortometraje
        </h2>
        <p className="text-slate-300 max-w-3xl mx-auto text-sm sm:text-base leading-relaxed">
          La anatomía del límite en la crianza consciente: <strong>Lucía</strong> frente a la dualidad del <strong>Enojo Limpio</strong> y el <strong>Enojo Sucio</strong>.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {characters.map((char) => (
          <CharacterCard
            key={char.id}
            char={char}
            isActive={activeCharId === char.id}
            isPlayingVoice={playingVoiceId === char.id}
            onToggleActive={handleToggleActive}
            onToggleVoice={handleToggleVoice}
          />
        ))}
      </div>
    </div>
  );
};
