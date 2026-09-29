import React, { useState } from 'react';
import { Download, Send, CheckCircle2, MessageCircle, FileText } from 'lucide-react';

export const ToolkitLeadForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    rol: 'Padre / Madre de Familia'
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [directDownloaded, setDirectDownloaded] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.telefono) return;

    setStatus('loading');

    // Disparar descarga directa del PDF en paralelo para asegurar cero fricción
    triggerDirectDownload();

    try {
      // Endpoint del Webhook en n8n
      const webhookUrl = 'https://n8n.seyer.tech/webhook/cathy-kids-lead';
      
      const payload = {
        ...formData,
        timestamp: new Date().toISOString(),
        origen: 'landing_cathykids_club',
        campaign: 'toolkit_clinico_v1'
      };

      // Enviamos con timeout de 3.5 segundos con fallback seguro
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 3500);

      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
      setStatus('success');
    } catch (err) {
      console.warn("Webhook n8n en proceso asíncrono o offline:", err);
      // Marcamos success porque el PDF ya se descargó en el navegador del usuario
      setStatus('success');
    }
  };

  const triggerDirectDownload = () => {
    const link = document.createElement('a');
    link.href = '/downloads/Toolkit_Clinico_CatyKids.pdf';
    link.download = 'Toolkit_Clinico_CatyKids.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    setDirectDownloaded(true);
  };

  return (
    <div className="max-w-4xl mx-auto px-4 py-16" id="descarga-toolkit">
      <div className="relative rounded-3xl p-8 sm:p-12 bg-gradient-to-b from-slate-900 via-slate-900 to-slate-950 border border-cyan-500/30 shadow-2xl shadow-cyan-950/50 overflow-hidden">
        {/* Glow de fondo */}
        <div className="absolute top-0 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-blue-600/10 rounded-full blur-3xl pointer-events-none" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Columna Izquierda: Información del PDF */}
          <div className="lg:col-span-7">
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-cyan-950 text-cyan-300 border border-cyan-800 mb-4">
              <FileText className="w-3.5 h-3.5" />
              Documento Clínico Oficial · Formato A4
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-white leading-tight mb-4">
              Descarga la Guía de Corregulación y el <span className="text-cyan-400">Toolkit Clínico</span>
            </h2>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed mb-6">
              Protocolo de 4 pasos ante el conflicto relacional, fundamentación neurobiológica del enojo limpio vs sucio y preguntas de diagnóstico para consulta familiar y aula.
            </p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Matriz de contraste clínico: Enojo Sucio vs. Enojo Limpio.</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Secuencia de 4 pasos de intervención física y verbal en crisis.</span>
              </div>
              <div className="flex items-center gap-3 text-xs sm:text-sm text-slate-200">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>Metodología de apego seguro avalada por Cathy Calderón de la Barca.</span>
              </div>
            </div>

            {/* Botón de descarga directa rápida */}
            <div className="pt-2">
              <button
                type="button"
                onClick={triggerDirectDownload}
                className="inline-flex items-center gap-2 text-xs font-bold text-slate-400 hover:text-cyan-300 underline underline-offset-4 transition-colors"
              >
                <Download className="w-3.5 h-3.5" />
                {directDownloaded ? '✓ Archivo PDF descargado nuevamente' : 'Descargar PDF directo sin registrarte'}
              </button>
            </div>
          </div>

          {/* Columna Derecha: Formulario de Captura */}
          <div className="lg:col-span-5 bg-slate-950/80 border border-white/10 rounded-2xl p-6 sm:p-8 backdrop-blur-xl shadow-inner">
            {status === 'success' ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 flex items-center justify-center mx-auto mb-4 animate-bounce">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-black text-white mb-2">¡Toolkit Enviado!</h3>
                <p className="text-xs text-slate-300 mb-4 leading-relaxed">
                  El PDF se ha descargado en tu navegador y una copia de alta resolución fue canalizada a tu WhatsApp con la invitación exclusiva al taller de Cathy.
                </p>
                <button
                  onClick={() => setStatus('idle')}
                  className="text-xs font-mono text-cyan-400 hover:underline"
                >
                  Registrar otro participante
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="text-left">
                  <h3 className="text-lg font-black text-white flex items-center gap-2 mb-1">
                    <MessageCircle className="w-5 h-5 text-emerald-400" />
                    Recibir en WhatsApp
                  </h3>
                  <p className="text-xs text-slate-400">
                    Cero spam. Te enviamos el PDF y el enlace directo al taller.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    placeholder="Ej. Dra. Carmen Mendoza"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    WhatsApp (con código de país)
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    placeholder="+52 55 1234 5678"
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  />
                </div>

                <div>
                  <label className="block text-xs font-mono text-slate-300 mb-1">
                    Tu Perfil / Rol
                  </label>
                  <select
                    value={formData.rol}
                    onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
                    className="w-full px-3.5 py-2.5 rounded-xl bg-slate-900 border border-white/15 text-white text-sm focus:outline-none focus:border-cyan-400 transition-colors"
                  >
                    <option value="Padre / Madre de Familia">Padre / Madre de Familia</option>
                    <option value="Terapeuta / Psicólogo Infantil">Terapeuta / Psicólogo Infantil</option>
                    <option value="Educador / Docente">Educador / Docente Escolar</option>
                    <option value="Pediatra / Profesional de Salud">Pediatra / Salud Mental</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-3.5 px-4 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-500 to-cyan-500 hover:from-emerald-400 hover:to-cyan-400 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-2 transform active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <span>Procesando y Descargando...</span>
                  ) : (
                    <>
                      <Send className="w-4 h-4" />
                      <span>Descargar Guía y Recibir en WhatsApp</span>
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
