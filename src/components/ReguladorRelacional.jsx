import React, { useState, useEffect, useRef } from 'react';
import { Mic, MicOff } from 'lucide-react';

export const ReguladorRelacional = () => {
  const [listening, setListening] = useState(false);
  const [decibels, setDecibels] = useState(0);
  const [alertaSucia, setAlertaSucia] = useState(false);
  const [isDemoMode, setIsDemoMode] = useState(false);
  const [errorMsg, setErrorMsg] = useState(null);

  const audioContextRef = useRef(null);
  const analyserRef = useRef(null);
  const streamRef = useRef(null);
  const animFrameRef = useRef(null);
  const demoIntervalRef = useRef(null);

  const startListening = async () => {
    setErrorMsg(null);
    if (isDemoMode) stopDemo();

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        audio: { echoCancellation: true, noiseSuppression: false } 
      });
      streamRef.current = stream;

      const AudioCtxClass = window.AudioContext || window.webkitAudioContext;
      const audioCtx = new AudioCtxClass();
      if (audioCtx.state === 'suspended') {
        await audioCtx.resume();
      }

      const analyser = audioCtx.createAnalyser();
      analyser.fftSize = 256;
      analyser.smoothingTimeConstant = 0.5;

      const source = audioCtx.createMediaStreamSource(stream);
      source.connect(analyser);

      audioContextRef.current = audioCtx;
      analyserRef.current = analyser;
      setListening(true);

      const bufferLength = analyser.frequencyBinCount;
      const dataArray = new Uint8Array(bufferLength);

      const updateVolume = () => {
        if (!analyserRef.current) return;
        analyserRef.current.getByteFrequencyData(dataArray);

        let sum = 0;
        for (let i = 0; i < bufferLength; i++) {
          sum += dataArray[i];
        }
        const average = sum / bufferLength;
        const normalizedDb = Math.round((average / 255) * 100);
        setDecibels(normalizedDb);

        // Histeresis de reactividad
        if (normalizedDb > 45) {
          setAlertaSucia(true);
        } else if (normalizedDb < 30) {
          setAlertaSucia(false);
        }

        animFrameRef.current = requestAnimationFrame(updateVolume);
      };

      updateVolume();
    } catch (err) {
      console.error("Error al acceder al micrófono:", err);
      setErrorMsg("No se pudo acceder al micrófono. Activa el 'Modo Simulación' para probar.");
      setListening(false);
    }
  };

  const stopListening = () => {
    if (animFrameRef.current) {
      cancelAnimationFrame(animFrameRef.current);
      animFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    if (audioContextRef.current && audioContextRef.current.state !== 'closed') {
      audioContextRef.current.close().catch(() => {});
      audioContextRef.current = null;
    }
    setListening(false);
    setDecibels(0);
    setAlertaSucia(false);
  };

  // Modo Simulación de demostración interactiva
  const toggleDemo = () => {
    if (listening) stopListening();

    if (isDemoMode) {
      stopDemo();
    } else {
      setIsDemoMode(true);
      let step = 0;
      demoIntervalRef.current = setInterval(() => {
        step = (step + 1) % 4;
        if (step === 2) {
          // Pico reactivo
          setDecibels(68);
          setAlertaSucia(true);
        } else if (step === 3) {
          setDecibels(58);
          setAlertaSucia(true);
        } else {
          // Calma
          setDecibels(22);
          setAlertaSucia(false);
        }
      }, 2000);
    }
  };

  const stopDemo = () => {
    if (demoIntervalRef.current) {
      clearInterval(demoIntervalRef.current);
      demoIntervalRef.current = null;
    }
    setIsDemoMode(false);
    setDecibels(0);
    setAlertaSucia(false);
  };

  useEffect(() => {
    return () => {
      stopListening();
      stopDemo();
    };
  }, []);

  return (
    <div className={`p-8 rounded-3xl transition-all duration-700 text-center max-w-2xl mx-auto shadow-2xl relative overflow-hidden backdrop-blur-xl ${
      alertaSucia 
        ? 'bg-red-950/85 border-4 border-red-500 shadow-red-900/60' 
        : 'bg-slate-900/90 border-4 border-cyan-500 shadow-cyan-950/60'
    }`}>
      {/* Glow ambiental reactivo */}
      <div className={`absolute -top-32 -left-32 w-64 h-64 rounded-full blur-3xl opacity-30 transition-all duration-700 ${
        alertaSucia ? 'bg-red-500' : 'bg-cyan-500'
      }`} />
      <div className={`absolute -bottom-32 -right-32 w-64 h-64 rounded-full blur-3xl opacity-30 transition-all duration-700 ${
        alertaSucia ? 'bg-amber-600' : 'bg-blue-600'
      }`} />

      {/* Header del sensor */}
      <div className="flex items-center justify-between gap-3 mb-6 relative z-10 border-b border-white/10 pb-4">
        <div className="flex items-center gap-2">
          <span className={`w-3 h-3 rounded-full ${listening || isDemoMode ? 'bg-emerald-400 animate-ping' : 'bg-slate-500'}`} />
          <span className="text-xs uppercase tracking-widest font-mono text-slate-300">
            {listening ? 'Sensor Micrófono Activo' : isDemoMode ? 'Modo Simulación Demo' : 'Sensor Relacional en Pausa'}
          </span>
        </div>
        <button
          onClick={toggleDemo}
          className="text-xs px-3 py-1 rounded-full border border-white/20 hover:border-white/40 text-slate-300 transition-colors"
        >
          {isDemoMode ? 'Detener Demo' : 'Probar Simulación'}
        </button>
      </div>

      <h2 className="text-3xl sm:text-4xl font-black text-white mb-3 tracking-tight relative z-10">
        {alertaSucia ? '⚠️ Alerta: Enojo Sucio Detectado' : '🛡️ Estado: Corregulación y Enojo Limpio'}
      </h2>
      
      <p className="text-base sm:text-lg text-slate-200 mb-6 font-medium relative z-10 max-w-lg mx-auto">
        {alertaSucia 
          ? 'Tono reactivo elevado (>45 dB). El infante entra en alerta amigdalina. Aplica Pausa Fisiológica antes de marcar el límite.' 
          : 'Comunicación en calma. Frecuencia modulada: la corteza prefrontal del niño permanece abierta al aprendizaje.'}
      </p>

      {/* Indicador de Latido / Nivel Reactivo */}
      <div className="relative flex items-center justify-center my-8 z-10">
        <div 
          className={`w-36 h-36 rounded-full flex flex-col items-center justify-center transition-all duration-300 shadow-2xl ${
            alertaSucia 
              ? 'bg-gradient-to-tr from-red-600 to-rose-500 scale-110 shadow-red-500/80 animate-pulse' 
              : 'bg-gradient-to-tr from-blue-600 to-cyan-500 shadow-cyan-500/50'
          }`}
          style={{ transform: `scale(${1 + Math.min(decibels, 80) / 100})` }}
        >
          <span className="text-5xl mb-1">{alertaSucia ? '💥' : '💙'}</span>
          <span className="text-xs font-mono font-bold uppercase tracking-wider text-white/90">
            {alertaSucia ? 'Reactivo' : 'Conexión'}
          </span>
        </div>
      </div>

      {/* Barra VU Meter continua */}
      <div className="relative z-10 mb-6 max-w-md mx-auto">
        <div className="flex justify-between text-xs font-mono text-slate-400 mb-1">
          <span>0 dB (Silencio)</span>
          <span className="font-bold text-white">{decibels} dB rel</span>
          <span>100 dB (Grito)</span>
        </div>
        <div className="w-full h-3 bg-slate-800 rounded-full overflow-hidden border border-white/10 p-0.5">
          <div 
            className={`h-full rounded-full transition-all duration-100 ${
              alertaSucia 
                ? 'bg-gradient-to-r from-amber-400 via-rose-500 to-red-600' 
                : 'bg-gradient-to-r from-emerald-400 via-cyan-400 to-blue-500'
            }`}
            style={{ width: `${Math.min(decibels, 100)}%` }}
          />
        </div>
      </div>

      {errorMsg && (
        <div className="text-sm text-rose-400 bg-rose-950/50 border border-rose-800 rounded-xl p-3 mb-6 relative z-10">
          {errorMsg}
        </div>
      )}

      {/* Controles del sensor */}
      <div className="flex flex-wrap items-center justify-center gap-4 relative z-10">
        {!listening ? (
          <button 
            onClick={startListening}
            className="flex items-center gap-2 px-8 py-3.5 bg-gradient-to-r from-cyan-500 via-blue-600 to-indigo-600 hover:from-cyan-400 hover:to-indigo-500 text-white font-extrabold rounded-2xl shadow-xl shadow-cyan-600/30 transform active:scale-95 transition-all text-base"
          >
            <Mic className="w-5 h-5" />
            Activar Micrófono en Vivo
          </button>
        ) : (
          <button 
            onClick={stopListening}
            className="flex items-center gap-2 px-8 py-3.5 bg-rose-600 hover:bg-rose-500 text-white font-extrabold rounded-2xl shadow-xl shadow-rose-900/50 transform active:scale-95 transition-all text-base"
          >
            <MicOff className="w-5 h-5" />
            Apagar Sensor
          </button>
        )}
      </div>

      <div className="text-xs text-slate-400 mt-6 relative z-10">
        * Algoritmo de procesamiento local en tu navegador. Ningún audio sale ni se graba en servidores externos.
      </div>
    </div>
  );
};
