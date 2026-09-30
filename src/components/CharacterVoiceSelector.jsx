import React, { useState, useRef } from 'react';
import { Play, Pause, Sparkles, Flame, ShieldCheck, HeartCrack, Eye, Luggage, Wand2 } from 'lucide-react';

export const CharacterVoiceSelector = () => {
  const [playingId, setPlayingId] = useState(null);
  const activeAudioRef = useRef(null);

  const characters = [
    {
      id: 'lucia',
      name: 'Lucía (La Domadora)',
      ageTag: '6 Años • Protagonista Valiente',
      role: 'Aprende a transformar la tormenta en valentía y límites firmes',
      quote: '"A veces siento el volcán en el pecho... pero respiro profundo y elijo no lastimar a los que amo. ¡Elijo la luz del Enojo Limpio!"',
      audioSrc: '/audio/lucia_voice.mp3?v=20260930_prod_v2',
      voiceName: 'Voz Niña 6 Años (Dulce & Valiente)',
      image: '/assets/lucia.jpg',
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

  const togglePlay = (char) => {
    // Si ya está reproduciendo este mismo, detenerlo
    if (playingId === char.id) {
      if (activeAudioRef.current) {
        activeAudioRef.current.pause();
        activeAudioRef.current.currentTime = 0;
        activeAudioRef.current = null;
      }
      setPlayingId(null);
      return;
    }

    // Detener audio anterior si existe
    if (activeAudioRef.current) {
      activeAudioRef.current.pause();
      activeAudioRef.current.currentTime = 0;
      activeAudioRef.current = null;
    }

    // Crear y reproducir nueva instancia con soporte móvil completo
    try {
      const audio = new Audio(char.audioSrc);
      audio.playsInline = true;
      audio.preload = 'auto';
      activeAudioRef.current = audio;

      audio.onended = () => {
        setPlayingId(null);
        activeAudioRef.current = null;
      };

      audio.onerror = (err) => {
        console.error("Audio playback error:", err);
        setPlayingId(null);
        activeAudioRef.current = null;
      };

      const playPromise = audio.play();
      if (playPromise !== undefined) {
        playPromise.then(() => {
          setPlayingId(char.id);
        }).catch((err) => {
          console.warn("Autoplay/Gesture error:", err);
          setPlayingId(null);
          activeAudioRef.current = null;
        });
      }
    } catch (e) {
      console.error("Fatal audio init error:", e);
      setPlayingId(null);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 py-16">
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
        {characters.map((char) => {
          const Icon = char.theme.icon;
          const isPlaying = playingId === char.id;

          return (
            <div
              key={char.id}
              className={`group relative rounded-3xl p-5 border bg-slate-900/85 backdrop-blur-xl transition-all duration-300 flex flex-col justify-between overflow-hidden shadow-xl ${char.theme.border} ${
                isPlaying ? 'scale-[1.03] ring-2 ring-white/30 shadow-2xl bg-slate-900/95' : 'hover:scale-[1.01]'
              }`}
            >
              {/* Glow ambiental */}
              <div className={`absolute top-0 right-0 w-44 h-44 bg-gradient-to-br ${char.theme.glow} rounded-full blur-3xl pointer-events-none opacity-60 group-hover:opacity-100 transition-opacity`} />

              <div>
                {/* Imagen del Personaje en Estilo 3D Storybook */}
                <div className="relative w-full aspect-square rounded-2xl overflow-hidden mb-4 bg-slate-950/80 border border-white/10 shadow-inner group-hover:border-white/20 transition-all">
                  <img
                    src={char.image}
                    alt={char.name}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                  />
                  <div className="absolute top-2.5 left-2.5">
                    <span className={`text-[10px] font-bold uppercase tracking-wider px-2.5 py-1 rounded-full border backdrop-blur-md ${char.theme.badgeBg}`}>
                      {char.ageTag}
                    </span>
                  </div>
                  <div className="absolute bottom-2.5 right-2.5">
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

              {/* Controles de Audio */}
              <div>
                <button
                  onClick={() => togglePlay(char)}
                  className={`w-full py-2.5 px-4 rounded-xl font-bold text-xs flex items-center justify-center gap-2 shadow-lg transition-all active:scale-95 ${char.theme.button}`}
                >
                  {isPlaying ? (
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
        })}
      </div>
    </div>
  );
};
