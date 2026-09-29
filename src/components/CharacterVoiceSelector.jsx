import React, { useState, useRef } from 'react';
import { Play, Pause, Sparkles, Flame, ShieldCheck } from 'lucide-react';

export const CharacterVoiceSelector = () => {
  const [playingId, setPlayingId] = useState(null);
  const audioRefs = useRef({});

  const characters = [
    {
      id: 'lucia',
      name: 'Lucía (La Protagonista)',
      role: 'Infante en búsqueda de corregulación',
      quote: '"A veces siento que el enojo me atrapa... pero no quiero lastimar a los que amo."',
      audioSrc: '/audio/lucia_voice.mp3',
      voiceName: 'Voz Dulce / Infantil (Paloma Neural +15Hz)',
      theme: {
        border: 'border-amber-400/40 hover:border-amber-400',
        badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-400/30',
        glow: 'from-amber-500/20 to-orange-500/5',
        button: 'bg-gradient-to-r from-amber-500 to-orange-500 hover:from-amber-400 hover:to-orange-400 text-slate-950',
        avatarBg: 'bg-gradient-to-tr from-amber-400 to-orange-300 text-slate-900',
        icon: Sparkles
      }
    },
    {
      id: 'enojo_sucio',
      name: 'Enojo Sucio (El Volcán)',
      role: 'Alerta reactiva y límite que hiere',
      quote: '"¡Todo me molesta! ¡Si me hieren, yo grito más fuerte para defenderme!"',
      audioSrc: '/audio/enojo_sucio_voice.mp3',
      voiceName: 'Voz Áspera / Acelerada (Jorge Neural -8Hz)',
      theme: {
        border: 'border-rose-500/40 hover:border-rose-500',
        badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/30',
        glow: 'from-rose-600/25 to-red-950/20',
        button: 'bg-gradient-to-r from-rose-600 to-red-600 hover:from-rose-500 hover:to-red-500 text-white',
        avatarBg: 'bg-gradient-to-tr from-rose-600 to-red-700 text-white',
        icon: Flame
      }
    },
    {
      id: 'enojo_limpio',
      name: 'Enojo Limpio (La Fuerza)',
      role: 'Asertividad, estructura y amor',
      quote: '"El enojo no es para destruir; es mi fuerza para poner límites con amor y cuidar nuestro corazón."',
      audioSrc: '/audio/enojo_limpio_voice.mp3',
      voiceName: 'Voz Cálida con Autoridad (Dalia Neural -2Hz)',
      theme: {
        border: 'border-cyan-400/40 hover:border-cyan-400',
        badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-400/30',
        glow: 'from-cyan-600/25 to-blue-950/20',
        button: 'bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white',
        avatarBg: 'bg-gradient-to-tr from-cyan-500 to-blue-600 text-white',
        icon: ShieldCheck
      }
    }
  ];

  const togglePlay = (id) => {
    // Si ya está sonando otro, detenerlo
    if (playingId && playingId !== id && audioRefs.current[playingId]) {
      audioRefs.current[playingId].pause();
      audioRefs.current[playingId].currentTime = 0;
    }

    const currentAudio = audioRefs.current[id];
    if (!currentAudio) return;

    if (playingId === id) {
      currentAudio.pause();
      currentAudio.currentTime = 0;
      setPlayingId(null);
    } else {
      currentAudio.play().then(() => {
        setPlayingId(id);
      }).catch(err => {
        console.error("Error al reproducir audio:", err);
      });
    }
  };

  const handleEnded = () => {
    setPlayingId(null);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <span className="text-xs uppercase tracking-widest font-mono text-cyan-400 bg-cyan-950/50 border border-cyan-800 px-3 py-1 rounded-full">
          Identidad Sonora y Psicoeducativa
        </span>
        <h2 className="text-3xl sm:text-4xl font-extrabold text-white mt-3 mb-2">
          Las 3 Voces del Relato
        </h2>
        <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base">
          Cada personaje fue modulado con un timbre acústico único para reflejar su estado neurobiológico y facilitar la identificación emocional en niños y adultos.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {characters.map((char) => {
          const Icon = char.theme.icon;
          const isPlaying = playingId === char.id;

          return (
            <div
              key={char.id}
              className={`relative rounded-3xl p-6 border bg-slate-900/80 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl ${char.theme.border} ${
                isPlaying ? 'scale-[1.02] shadow-2xl' : 'hover:scale-[1.01]'
              }`}
            >
              {/* Glow superior de fondo */}
              <div className={`absolute top-0 right-0 w-48 h-48 bg-gradient-to-br ${char.theme.glow} rounded-full blur-2xl pointer-events-none`} />

              <div>
                {/* Header de la tarjeta */}
                <div className="flex items-center justify-between mb-4">
                  <span className={`text-[11px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border ${char.theme.badgeBg}`}>
                    {char.voiceName}
                  </span>
                  <div className={`w-9 h-9 rounded-xl flex items-center justify-center ${char.theme.avatarBg}`}>
                    <Icon className="w-5 h-5" />
                  </div>
                </div>

                <h3 className="text-xl font-black text-white mb-1">
                  {char.name}
                </h3>
                <p className="text-xs text-slate-400 mb-4 font-mono">
                  {char.role}
                </p>

                {/* Diálogo / Cita */}
                <div className="bg-slate-950/70 border border-white/5 rounded-2xl p-4 mb-6 relative">
                  <p className="text-sm italic text-slate-200 leading-relaxed">
                    {char.quote}
                  </p>
                </div>
              </div>

              {/* Botón de reproducción y audio tag */}
              <div>
                <audio
                  ref={(el) => (audioRefs.current[char.id] = el)}
                  src={char.audioSrc}
                  onEnded={handleEnded}
                  preload="metadata"
                />

                <button
                  onClick={() => togglePlay(char.id)}
                  className={`w-full py-3 px-4 rounded-xl font-black flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 ${char.theme.button}`}
                >
                  {isPlaying ? (
                    <>
                      <Pause className="w-4 h-4 fill-current" />
                      <span>Detener Voz</span>
                      <span className="flex gap-0.5 ml-2 items-end h-4">
                        <span className="w-1 bg-current animate-pulse h-3" />
                        <span className="w-1 bg-current animate-pulse delay-75 h-4" />
                        <span className="w-1 bg-current animate-pulse delay-150 h-2" />
                      </span>
                    </>
                  ) : (
                    <>
                      <Play className="w-4 h-4 fill-current" />
                      <span>Escuchar Diálogo</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
