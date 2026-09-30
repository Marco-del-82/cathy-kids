import React, { useState } from 'react';
import { Download, Send, CheckCircle2, MessageCircle, FileText, ShieldCheck, Award } from 'lucide-react';

export const ToolkitLeadForm = () => {
  const [formData, setFormData] = useState({
    nombre: '',
    telefono: '',
    rol: 'Terapeuta / Psicólogo Infantil'
  });
  const [status, setStatus] = useState('idle'); // idle | loading | success | error
  const [directDownloaded, setDirectDownloaded] = useState(false);
  const [whatsappUrl, setWhatsappUrl] = useState('');

  const WHATSAPP_PHONE = '525561776727';

  const generateWhatsAppUrl = (data) => {
    const text = `¡Hola Cathy! Soy ${data.nombre} (${data.rol}). Acabo de descargar el Toolkit Clínico 'Enojo Limpio vs Sucio' desde cathykids.club. Me gustaría confirmar mi acceso al simposio y recibir las actualizaciones clínicas en mi WhatsApp (${data.telefono}).`;
    return `https://wa.me/${WHATSAPP_PHONE}?text=${encodeURIComponent(text)}`;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.nombre || !formData.telefono) return;

    setStatus('loading');

    // 1. Disparar descarga directa del PDF A4 sin fricción
    triggerDirectDownload();

    // 2. Persistencia de Respaldo Inmediata en LocalStorage (Base de Datos Local Anti-Fugas)
    try {
      const existing = JSON.parse(localStorage.getItem('cathy_kids_leads') || '[]');
      const newLead = {
        ...formData,
        timestamp: new Date().toISOString(),
        origen: 'landing_cathykids_club',
        campaign: 'toolkit_clinico_terapeutas_v2'
      };
      existing.push(newLead);
      localStorage.setItem('cathy_kids_leads', JSON.stringify(existing));
    } catch (storageErr) {
      console.warn("Storage buffer local aviso:", storageErr);
    }

    // 3. Generar enlace oficial de WhatsApp con datos prellenados
    const waLink = generateWhatsAppUrl(formData);
    setWhatsappUrl(waLink);

    // 4. Intentar enviar a webhook en segundo plano (asíncrono seguro)
    try {
      const webhookUrl = 'https://n8n.seyer.tech/webhook/cathy-kids-lead';
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 2500);

      await fetch(webhookUrl, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          origen: 'landing_cathykids_club',
          destino_whatsapp: WHATSAPP_PHONE
        }),
        signal: controller.signal
      });

      clearTimeout(timeoutId);
    } catch (err) {
      console.warn("Webhook asíncrono en contingencia (Lead asegurado en WhatsApp/LocalStorage):", err);
    }

    // 5. Abrir WhatsApp directamente en nueva ventana si el navegador lo permite
    try {
      window.open(waLink, '_blank');
    } catch (wErr) {
      console.log("Navegador requirió clic explícito para WhatsApp:", wErr);
    }

    setStatus('success');
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
    <div className="max-w-6xl mx-auto px-4 sm:px-6 py-20" id="descarga-toolkit">
      {/* Tarjeta Clínica en Fondo Blanco Institucional con Sombra de Alta Fidelidad */}
      <div className="relative rounded-3xl p-8 sm:p-12 md:p-16 bg-white text-slate-900 border-2 border-slate-200/90 shadow-[0_25px_60px_-15px_rgba(0,0,0,0.18)] overflow-hidden">
        
        {/* Sutil halo azul superior decorativo */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-100/60 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-indigo-50/70 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-12 items-center">
          
          {/* Columna Izquierda: Información Clínica para Profesionales y Terapeutas */}
          <div className="lg:col-span-7 space-y-6">
            
            <div className="flex flex-wrap items-center gap-3">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-mono font-bold uppercase tracking-wider bg-blue-50 text-blue-800 border border-blue-200">
                <FileText className="w-4 h-4 text-blue-600" />
                Documento Clínico Oficial · Formato A4
              </span>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                Uso en Consulta y Escuela
              </span>
            </div>

            <div>
              <h2 className="text-3xl sm:text-5xl font-black text-slate-950 leading-[1.15] tracking-tight">
                Toolkit Clínico: <br className="hidden sm:inline" />
                <span className="text-blue-600">Guía de Corregulación</span> y Apego
              </h2>
              <p className="text-slate-600 text-base sm:text-lg leading-relaxed mt-4 font-normal">
                Instrumento de intervención estructurado para <strong>psicólogos infantiles, terapeutas de juego, docentes y familias</strong>. Fundamentación neurobiológica del Enojo Limpio vs. Sucio y protocolo de desescalamiento somático para entregar al término de sesión.
              </p>
            </div>

            {/* Lista de Componentes del Toolkit con tipografía grande y clara */}
            <div className="space-y-3.5 pt-2">
              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  ✓
                </div>
                <div className="text-sm sm:text-base text-slate-800">
                  <strong className="text-slate-950 font-bold">Matriz de Diagnóstico Neurobiológico:</strong> Secuestro amigdalino frente a corregulación vagal (60 BPM).
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  ✓
                </div>
                <div className="text-sm sm:text-base text-slate-800">
                  <strong className="text-slate-950 font-bold">Protocolo de 4 Pasos en Crisis:</strong> Pausa fisiológica, alineación visual, nombramiento afectivo y pregunta ancla.
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  ✓
                </div>
                <div className="text-sm sm:text-base text-slate-800">
                  <strong className="text-slate-950 font-bold">Hoja de Trabajo Imprimible A4:</strong> Lista para imprimir y entregar a padres como anclaje del límite en el hogar.
                </div>
              </div>

              <div className="flex items-start gap-3.5">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 flex items-center justify-center shrink-0 mt-0.5 font-bold text-xs">
                  ✓
                </div>
                <div className="text-sm sm:text-base text-slate-800">
                  <strong className="text-slate-950 font-bold">Autoría Clínica Especializada:</strong> Mtra. Cathy Calderón de la Barca (Dirección Clínica UDLA / ILEF).
                </div>
              </div>
            </div>

            {/* Botón de Descarga Directa destacada */}
            <div className="pt-4 border-t border-slate-200 flex flex-wrap items-center gap-4">
              <button
                type="button"
                onClick={triggerDirectDownload}
                className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-800 text-sm font-bold border border-slate-300 transition-all hover:shadow-sm"
              >
                <Download className="w-4 h-4 text-blue-600" />
                {directDownloaded ? '✓ Archivo A4 Descargado Nuevamente' : 'Descargar PDF A4 Directo (Sin Registro)'}
              </button>
              <span className="text-xs text-slate-500 font-mono">
                Documento en PDF de 2 páginas listo para consulta
              </span>
            </div>

          </div>

          {/* Columna Derecha: Formulario de Registro para Terapeutas */}
          <div className="lg:col-span-5 bg-slate-50/90 border-2 border-slate-200/90 rounded-2xl p-6 sm:p-8 shadow-sm">
            {status === 'success' ? (
              <div className="text-center py-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-700 flex items-center justify-center mx-auto mb-2 border-2 border-emerald-300 shadow-md">
                  <CheckCircle2 className="w-9 h-9" />
                </div>
                
                <div>
                  <h3 className="text-2xl font-black text-slate-950">¡Toolkit Descargado!</h3>
                  <p className="text-sm text-slate-600 mt-1 leading-relaxed">
                    El PDF clínico se ha guardado en tu dispositivo. Para asegurar tu lugar en el simposio y recibir soporte clínico, confirma directo con Cathy:
                  </p>
                </div>

                {whatsappUrl && (
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full py-4 px-6 rounded-xl bg-emerald-600 hover:bg-emerald-700 text-white font-black text-base shadow-lg shadow-emerald-600/30 flex items-center justify-center gap-3 active:scale-95 transition-all text-center group cursor-pointer"
                  >
                    <MessageCircle className="w-5 h-5 fill-white/20 group-hover:scale-110 transition-transform" />
                    <span>Abrir Chat con Cathy (+52 55 6177 6727)</span>
                  </a>
                )}

                <p className="text-xs text-slate-500 font-mono">
                  Mensaje personalizado prellenado con tu nombre y teléfono.
                </p>

                <div className="pt-3 border-t border-slate-200">
                  <button
                    onClick={() => setStatus('idle')}
                    className="px-4 py-2 rounded-lg bg-white border border-slate-300 text-xs font-bold text-slate-700 hover:bg-slate-100 transition-colors shadow-sm"
                  >
                    Registrar a otro terapeuta o familiar
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="text-left border-b border-slate-200 pb-3">
                  <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100/70 px-2.5 py-1 rounded-md mb-2">
                    <MessageCircle className="w-4 h-4 text-emerald-700" />
                    Canal Directo WhatsApp · +52 55 6177 6727
                  </div>
                  <h3 className="text-xl font-black text-slate-950">
                    Solicitud de Acceso Profesional
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-600 mt-0.5">
                    Descarga la guía en PDF y conecta directamente con Cathy por WhatsApp.
                  </p>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 font-mono">
                    Nombre y Apellidos
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.nombre}
                    onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
                    placeholder="Ej. Dra. Carmen Mendoza"
                    className="w-full px-4 py-3 rounded-xl bg-white border-2 border-slate-300 text-slate-900 placeholder-slate-400 text-base focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 font-mono">
                    Tu WhatsApp (con código de país)
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    placeholder="+52 55 1234 5678"
                    className="w-full px-4 py-3 rounded-xl bg-white border-2 border-slate-300 text-slate-900 placeholder-slate-400 text-base focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all shadow-sm"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5 font-mono">
                    Perfil Profesional / Ocupación
                  </label>
                  <select
                    value={formData.rol}
                    onChange={(e) => setFormData({ ...formData, rol: e.target.value })}
                    className="w-full px-4 py-3 rounded-xl bg-white border-2 border-slate-300 text-slate-900 text-base focus:outline-none focus:border-blue-600 focus:ring-4 focus:ring-blue-100 transition-all shadow-sm cursor-pointer"
                  >
                    <option value="Terapeuta / Psicólogo Infantil">Terapeuta / Psicólogo Infantil</option>
                    <option value="Pediatra / Profesional de Salud">Pediatra / Salud Mental</option>
                    <option value="Educador / Docente Escolar">Educador / Directivo Escolar</option>
                    <option value="Padre / Madre de Familia">Padre / Madre de Familia</option>
                  </select>
                </div>

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="w-full py-4 px-6 rounded-xl bg-gradient-to-r from-blue-600 via-indigo-600 to-blue-700 hover:from-blue-700 hover:to-indigo-700 text-white font-black text-base shadow-lg shadow-blue-600/30 flex items-center justify-center gap-3 active:scale-95 transition-all cursor-pointer disabled:opacity-50"
                >
                  {status === 'loading' ? (
                    <span>Descargando y Conectando...</span>
                  ) : (
                    <>
                      <Download className="w-5 h-5" />
                      <span>Descargar Toolkit y Enviar a WhatsApp</span>
                    </>
                  )}
                </button>

                <p className="text-[11px] text-slate-500 text-center leading-tight">
                  🔒 Cero spam. Descarga directa en PDF + Enlace directo al WhatsApp de Cathy (+52 55 6177 6727).
                </p>
              </form>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};
