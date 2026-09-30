import React, { useState } from 'react';
import { Luggage, Check, Sparkles, Shield, HeartHandshake, ArrowRight, RotateCcw } from 'lucide-react';

export const MaletaDeAgresion = () => {
  const [selectedPhrases, setSelectedPhrases] = useState([]);
  const [isDeparted, setIsDeparted] = useState(false);

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

  const togglePhrase = (id) => {
    let updated;
    if (selectedPhrases.includes(id)) {
      updated = selectedPhrases.filter((p) => p !== id);
    } else {
      updated = [...selectedPhrases, id];
    }
    setSelectedPhrases(updated);

    if (updated.length >= 4) {
      setIsDeparted(true);
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
        <div className="lg:col-span-5 flex flex-col items-center justify-center p-6 bg-slate-950/80 rounded-2xl border border-white/10 relative text-center">
          <div className="relative group">
            <img
              src="/assets/agresion.jpg"
              alt="Agresión con Maleta"
              className={`w-64 h-64 object-cover rounded-2xl shadow-2xl transition-all duration-700 ${
                isDeparted
                  ? 'translate-x-6 opacity-30 grayscale filter blur-[1px]'
                  : 'hover:scale-105'
              }`}
            />

            {/* Cartel de Despedida cuando se activa */}
            {isDeparted && (
              <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/85 backdrop-blur-md rounded-2xl p-4 text-center border-2 border-emerald-400 animate-fadeIn">
                <Sparkles className="w-8 h-8 text-yellow-300 animate-spin mb-2" style={{ animationDuration: '6s' }} />
                <h4 className="text-lg font-black text-white">
                  ¡Agresión ha empacado y se fue!
                </h4>
                <p className="text-xs text-emerald-300 mt-1 max-w-xs">
                  "Con límites firmes y respetuosos, la violencia física ya no cabe en este hogar."
                </p>
                <button
                  onClick={resetGame}
                  className="mt-4 px-3 py-1.5 rounded-lg bg-white/10 text-white text-xs hover:bg-white/20 flex items-center gap-1.5"
                >
                  <RotateCcw className="w-3.5 h-3.5" /> Jugar de nuevo
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
              {isDeparted ? '🚪 Camino a la puerta de salida' : '🎒 Esperando en la sala'}
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
