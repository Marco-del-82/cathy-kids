import React, { useState } from 'react';
import { Eye, Glasses, Sparkles, Heart, Droplets, Shield, Sun, Home, Smile } from 'lucide-react';

export const LentesDeCuriosidad = () => {
  const [glassesOn, setGlassesOn] = useState(false);
  const [activeMessenger, setActiveMessenger] = useState(0);

  const messengers = [
    {
      id: 'tristeza',
      name: 'La Voz de la Tristeza',
      avatarColor: 'from-blue-500 to-indigo-600',
      icon: Droplets,
      whisper: '“Aman a Lucy. Quieren que sea amable y empática para que tenga amigas y nunca se quede solita, pero en este momento no lo está logrando.”',
      need: 'Necesidad de Pertenencia y Amistad'
    },
    {
      id: 'rechazo',
      name: 'La Voz del Rechazo',
      avatarColor: 'from-amber-500 to-orange-600',
      icon: Shield,
      whisper: '“Valoras el respeto en tu familia. Por eso alejas las actitudes irrespetuosas... pero nunca alejes a Lucy de tu corazón.”',
      need: 'Separar la Conducta del Valor de la Niña'
    },
    {
      id: 'soledad',
      name: 'La Voz de la Soledad',
      avatarColor: 'from-purple-500 to-violet-700',
      icon: Home,
      whisper: '“Valoras la compañía de Lucy junto a ti y la extrañas. Extrañas su diversión, sus risas y sus juegos.”',
      need: 'Deseo de Reconexión Familiar'
    },
    {
      id: 'ternura',
      name: 'La Voz de la Ternura',
      avatarColor: 'from-rose-400 to-pink-600',
      icon: Heart,
      whisper: '“Valoras el corazón de Lucy y sientes un deseo profundo de cobijarla con amor, guiándola con aprendizaje en lugar de castigarla.”',
      need: 'Cobijo y Guía Amorosa'
    }
  ];

  return (
    <div className="max-w-6xl mx-auto px-4 py-16">
      <div className="text-center mb-10">
        <span className="text-xs uppercase tracking-widest font-mono text-fuchsia-400 bg-fuchsia-950/60 border border-fuchsia-700/50 px-3.5 py-1.5 rounded-full inline-flex items-center gap-1.5 shadow-lg">
          <Sparkles className="w-3.5 h-3.5 text-yellow-300" />
          Pensamiento Mágico & Asombro
        </span>
        <h2 className="text-3xl sm:text-5xl font-black text-white mt-4 mb-3 tracking-tight font-heading">
          Los Lentes Mágicos de la Curiosidad
        </h2>
        <p className="text-slate-300 max-w-2xl mx-auto text-sm sm:text-base leading-relaxed">
          ¿Qué ocurre cuando dejamos de mirar con juicio y nos ponemos los lentes del hada de la Curiosidad? El berrinche se transforma en un mapa de necesidades del corazón.
        </p>
      </div>

      {/* Switch Maestro: Ponerse los Lentes */}
      <div className="flex justify-center mb-10">
        <button
          onClick={() => setGlassesOn(!glassesOn)}
          className={`group relative px-6 py-4 rounded-2xl font-black text-base flex items-center gap-3 transition-all duration-300 shadow-2xl ${
            glassesOn
              ? 'bg-gradient-to-r from-fuchsia-500 via-pink-500 to-purple-600 text-white ring-4 ring-pink-400/30 scale-105'
              : 'bg-slate-900 border-2 border-slate-700 text-slate-300 hover:border-pink-500/60 hover:text-white'
          }`}
        >
          <div className={`p-2 rounded-xl transition-colors ${glassesOn ? 'bg-white/20' : 'bg-slate-800'}`}>
            <Glasses className={`w-6 h-6 ${glassesOn ? 'text-white animate-bounce' : 'text-pink-400'}`} />
          </div>
          <div className="text-left">
            <span className="block text-xs uppercase tracking-wider font-mono opacity-80">
              {glassesOn ? '¡Modo Curiosidad Activo!' : 'Visión Habitual (Juicio)'}
            </span>
            <span className="block text-lg font-black">
              {glassesOn ? 'Quitarse los Lentes Mágicos' : '¡Ponerse los Lentes Mágicos! 👓✨'}
            </span>
          </div>
        </button>
      </div>

      {/* Escenario de Transformación */}
      <div
        className={`relative rounded-3xl p-6 sm:p-10 border transition-all duration-700 overflow-hidden shadow-2xl ${
          glassesOn
            ? 'bg-gradient-to-b from-slate-900/90 via-purple-950/70 to-slate-950/95 border-fuchsia-500/40 ring-1 ring-fuchsia-500/30'
            : 'bg-slate-950/90 border-red-950/40'
        }`}
      >
        {/* Glow Mágico de Fondo */}
        {glassesOn && (
          <>
            <div className="absolute top-0 right-1/4 w-96 h-96 bg-fuchsia-500/20 rounded-full blur-3xl pointer-events-none animate-pulse" />
            <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl pointer-events-none" />
          </>
        )}

        {!glassesOn ? (
          /* MODO SIN LENTES: EL JUICIO Y LAS PALABRAS QUE DUELEN */
          <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center">
            <div className="md:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-900/60 rounded-2xl border border-red-500/20">
              <img
                src="/assets/enojo_sucio_3d.jpg"
                alt="Juicio Reactivo"
                className="w-48 h-48 object-cover rounded-2xl shadow-xl filter saturate-125"
              />
              <span className="mt-3 text-xs font-mono font-bold text-rose-400 uppercase tracking-wider">
                Reacción sin Curiosidad
              </span>
            </div>

            <div className="md:col-span-7 space-y-4">
              <span className="text-xs uppercase font-mono px-3 py-1 rounded-full bg-rose-500/20 text-rose-300 border border-rose-500/30">
                La Barrera en el Corazón
              </span>
              <h3 className="text-2xl font-bold text-white font-heading">
                "¡Qué niña tan grosera! ¡Nadie te va a querer!"
              </h3>
              <p className="text-slate-300 text-sm leading-relaxed">
                Cuando los adultos reaccionan desde el Enojo Sucio con críticas y amenazas, Lucy levanta una capa invisible de frialdad y Vergüenza Tóxica. Se esconde como el avestruz creyendo que es mala y que no merece amor.
              </p>

              <div className="p-4 rounded-xl bg-slate-900/80 border border-white/5 text-xs text-slate-400">
                👉 <em>Ponte los lentes mágicos arriba para ver qué mensajes de amor estaban ocultos detrás de esta escena.</em>
              </div>
            </div>
          </div>
        ) : (
          /* MODO CON LENTES: LA REVELACIÓN DE LOS 4 MENSAJEROS Y EMPATÍA */
          <div>
            <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 border-b border-white/10 pb-6">
              <div className="flex items-center gap-3">
                <img
                  src="/assets/curiosidad_lentes.jpg"
                  alt="Curiosidad Hada"
                  className="w-14 h-14 rounded-2xl object-cover border-2 border-fuchsia-400 shadow-lg"
                />
                <div>
                  <h3 className="text-xl font-black text-white flex items-center gap-2">
                    <span>Los 4 Mensajeros Secretos</span>
                    <Sparkles className="w-4 h-4 text-yellow-300" />
                  </h3>
                  <p className="text-xs text-fuchsia-300 font-mono">
                    "Las emociones son cartas que nos traen un mensaje valioso."
                  </p>
                </div>
              </div>

              {/* Botones de los 4 Mensajeros */}
              <div className="flex flex-wrap gap-2">
                {messengers.map((m, idx) => (
                  <button
                    key={m.id}
                    onClick={() => setActiveMessenger(idx)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                      activeMessenger === idx
                        ? 'bg-fuchsia-500 text-white shadow-lg scale-105'
                        : 'bg-slate-900/80 text-slate-300 hover:bg-slate-800 border border-white/10'
                    }`}
                  >
                    {m.name.split(' ')[3] || m.name}
                  </button>
                ))}
              </div>
            </div>

            {/* Tarjeta del Mensajero Activo */}
            <div className="grid grid-cols-1 md:grid-cols-12 gap-8 items-center bg-slate-950/70 p-6 rounded-2xl border border-white/10">
              <div className="md:col-span-4 flex flex-col items-center text-center">
                <div className={`w-20 h-20 rounded-2xl bg-gradient-to-tr ${messengers[activeMessenger].avatarColor} flex items-center justify-center text-white shadow-2xl mb-3`}>
                  {React.createElement(messengers[activeMessenger].icon, { className: 'w-10 h-10' })}
                </div>
                <h4 className="text-lg font-black text-white">
                  {messengers[activeMessenger].name}
                </h4>
                <span className="text-[11px] font-mono text-fuchsia-300 mt-0.5">
                  {messengers[activeMessenger].need}
                </span>
              </div>

              <div className="md:col-span-8 space-y-4">
                <div className="bg-slate-900/90 rounded-2xl p-5 border border-white/10 shadow-inner">
                  <p className="text-base sm:text-lg italic text-slate-100 font-medium leading-relaxed">
                    {messengers[activeMessenger].whisper}
                  </p>
                </div>

                <div className="flex items-center gap-2 text-xs text-slate-300">
                  <Smile className="w-4 h-4 text-emerald-400 shrink-0" />
                  <span>Resultado Clínico: Desactiva la Vergüenza Tóxica y permite el diálogo con Enojo Limpio.</span>
                </div>
              </div>
            </div>

            {/* Cierre Mágico: La Nueva Invitada (Empatía) */}
            <div className="mt-8 p-4 rounded-2xl bg-gradient-to-r from-cyan-950/40 via-purple-950/40 to-pink-950/40 border border-cyan-400/30 flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-cyan-400/20 border border-cyan-400/40 flex items-center justify-center text-cyan-300 font-black text-sm">
                  🕊️
                </div>
                <div>
                  <h5 className="text-sm font-bold text-white">
                    "Lucy preguntó: ¿Quién es la nueva invitada a la casa, mamá?"
                  </h5>
                  <p className="text-xs text-cyan-300">
                    "Y su mamá contestó: Ahora en esta casa también vive EMPATÍA."
                  </p>
                </div>
              </div>
              <span className="text-[11px] font-mono px-3 py-1 rounded-full bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 font-bold shrink-0">
                Pág. 148 del Cuento
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
