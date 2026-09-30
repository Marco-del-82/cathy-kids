import puppeteer from 'puppeteer-core';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

(async () => {
  const chromePath = '/opt/google/chrome/chrome';
  const rootDir = path.join(__dirname, '..');
  const outDir = path.join(rootDir, 'public/downloads');
  if (!fs.existsSync(outDir)) {
    fs.mkdirSync(outDir, { recursive: true });
  }

  // Leer imágenes en base64 para inyección directa sin problemas de CORS/rutas
  const enojoSucioB64 = fs.readFileSync(path.join(rootDir, 'public/assets/enojo_sucio_3d.jpg')).toString('base64');
  const enojoLimpioB64 = fs.readFileSync(path.join(rootDir, 'public/assets/enojo_limpio_3d.jpg')).toString('base64');
  const luciaB64 = fs.readFileSync(path.join(rootDir, 'public/assets/lucia_3d.jpg')).toString('base64');

  const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @page { size: A4; margin: 0; }
    body { -webkit-print-color-adjust: exact; font-family: system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif; }
    .page-break { page-break-after: always; }
  </style>
</head>
<body class="bg-slate-900 text-slate-100">

  <!-- PÁGINA 1: PORTADA CLÍNICA Y MATRIZ DE LOS DOS ENOJOS -->
  <div class="w-[210mm] h-[297mm] p-10 flex flex-col justify-between page-break bg-slate-950 text-slate-100 border-b border-slate-800 relative overflow-hidden">
    <div class="relative z-10">
      <div class="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
        <span class="text-[11px] font-mono font-bold tracking-widest text-cyan-400 uppercase">Cathy Kids • Protocolo Clínico & Neuroeducativo</span>
        <span class="text-xs text-slate-400">Mtra. Cathy Calderón de la Barca</span>
      </div>
      
      <div class="flex items-center gap-6 mb-6">
        <img src="data:image/jpeg;base64,${luciaB64}" class="w-24 h-24 rounded-2xl object-cover border-2 border-amber-400/40 shadow-xl" />
        <div>
          <h1 class="text-3xl font-black text-white tracking-tight leading-tight">
            La Anatomía del Límite: <br>
            <span class="text-blue-400">Enojo Limpio</span> vs. <span class="text-rose-500">Enojo Sucio</span>
          </h1>
          <p class="text-xs text-slate-300 mt-1 font-light">
            Guía de intervención somática y preservación del apego seguro ante el desborde emocional.
          </p>
        </div>
      </div>

      <!-- Fundamento Neurobiológico -->
      <div class="bg-blue-950/40 border border-blue-500/30 rounded-2xl p-5 mb-6">
        <h3 class="text-xs font-bold text-blue-300 uppercase tracking-wider mb-1.5">Fundamento Neurobiológico</h3>
        <p class="text-[11px] leading-relaxed text-slate-200">
          El enojo no es una patología conductual que deba censurarse: es la <strong>energía vital de la asertividad</strong> necesaria para salvaguardar la integridad y poner estructura. La bifurcación clínica reside en su canal de emisión: el <em>Enojo Sucio</em> secuestra la amígdala e instiga parálisis o rechazo; el <em>Enojo Limpio</em> activa la corregulación y permite al niño asimilar la regla sin perder el vínculo amoroso.
        </p>
      </div>

      <!-- Matriz Visual de Contraste con Renders 3D -->
      <div class="grid grid-cols-2 gap-5">
        <!-- Tarjeta Enojo Sucio -->
        <div class="border border-rose-500/40 rounded-2xl p-4 bg-rose-950/30 flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-3 mb-3">
              <img src="data:image/jpeg;base64,${enojoSucioB64}" class="w-14 h-14 rounded-xl object-cover border border-rose-500/50 shadow-md" />
              <div>
                <h4 class="text-sm font-bold text-rose-300 uppercase tracking-wide">Enojo Sucio</h4>
                <span class="text-[10px] text-rose-400 font-mono">"Límites que Hieren"</span>
              </div>
            </div>
            <ul class="text-[11px] space-y-2 text-slate-300 leading-tight">
              <li>• <strong>Descarga:</strong> Reactiva, sarcástica, descalificación de la identidad.</li>
              <li>• <strong>Respuesta biológica:</strong> Alarma amigdalina (modo supervivencia activado).</li>
              <li>• <strong>Herida relacional:</strong> Instala culpa, aislamiento y Vergüenza Tóxica.</li>
              <li>• <strong>Símbolo somático:</strong> Maza metálica que aprisiona el corazón.</li>
            </ul>
          </div>
          <div class="mt-3 p-2 rounded-lg bg-rose-950/60 border border-rose-800/40 text-[10px] text-rose-200 italic">
            “¡Qué tonta eres, vete a tu cuarto! Así nadie te va a querer.”
          </div>
        </div>

        <!-- Tarjeta Enojo Limpio -->
        <div class="border border-cyan-500/40 rounded-2xl p-4 bg-cyan-950/30 flex flex-col justify-between">
          <div>
            <div class="flex items-center gap-3 mb-3">
              <img src="data:image/jpeg;base64,${enojoLimpioB64}" class="w-14 h-14 rounded-xl object-cover border border-cyan-500/50 shadow-md" />
              <div>
                <h4 class="text-sm font-bold text-cyan-300 uppercase tracking-wide">Enojo Limpio</h4>
                <span class="text-[10px] text-cyan-400 font-mono">"Límites con Respeto"</span>
              </div>
            </div>
            <ul class="text-[11px] space-y-2 text-slate-300 leading-tight">
              <li>• <strong>Descarga:</strong> Firme, frontal, regulada, libre de humillación.</li>
              <li>• <strong>Respuesta biológica:</strong> Cadencia vagal segura (corregulación a 60 BPM).</li>
              <li>• <strong>Puente vincular:</strong> Separa la conducta no permitida del valor de la niña.</li>
              <li>• <strong>Símbolo somático:</strong> Corazón íntegro, receptivo y abierto al afecto.</li>
            </ul>
          </div>
          <div class="mt-3 p-2 rounded-lg bg-cyan-950/60 border border-cyan-800/40 text-[10px] text-cyan-200 italic">
            “¡Para! No me gusta. Te amo profundamente, pero esta conducta no es aceptable.”
          </div>
        </div>
      </div>
    </div>

    <div class="text-[10px] font-mono text-slate-500 border-t border-white/10 pt-3 flex justify-between">
      <span>cathykids.club • Documento Clínico Oficial</span>
      <span>Uso autorizado para Terapeutas, Psicólogos y Educadores</span>
    </div>
  </div>

  <!-- PÁGINA 2: PROTOCOLO DE INTERVENCIÓN EN CRISIS -->
  <div class="w-[210mm] h-[297mm] p-10 flex flex-col justify-between bg-slate-950 text-slate-100 relative">
    <div>
      <div class="flex justify-between items-center border-b border-white/10 pb-4 mb-6">
        <span class="text-[11px] font-mono font-bold tracking-widest text-cyan-400 uppercase">Protocolo de Aplicación en Consulta y Hogar</span>
        <span class="text-xs text-slate-400">Metodología de Apego Seguro</span>
      </div>

      <h2 class="text-2xl font-black text-white mb-6">Secuencia de 4 Pasos de Corregulación</h2>

      <div class="space-y-4">
        <div class="p-4 rounded-xl border border-white/10 bg-slate-900/60 flex items-start gap-4">
          <span class="text-xl font-black text-cyan-400 font-mono">01</span>
          <div>
            <h4 class="text-xs font-bold text-white uppercase tracking-wider">Pausa Fisiológica (Frenar el Enojo Sucio)</h4>
            <p class="text-xs text-slate-300 mt-1 leading-relaxed">
              El terapeuta o cuidador registra su propia reactividad visceral antes de intervenir. Si hay aceleración en la frecuencia respiratoria o prosodia hostil, se aplica silencio compasivo para evitar la transferencia de alerta al sistema nervioso infantil.
            </p>
          </div>
        </div>

        <div class="p-4 rounded-xl border border-white/10 bg-slate-900/60 flex items-start gap-4">
          <span class="text-xl font-black text-blue-400 font-mono">02</span>
          <div>
            <h4 class="text-xs font-bold text-white uppercase tracking-wider">Alineación Fisiológica al Nivel de los Ojos</h4>
            <p class="text-xs text-slate-300 mt-1 leading-relaxed">
              Descender físicamente a la altura de la mirada del infante. La verticalidad autoritaria dispara el reflejo primitivo de amenaza; el nivel horizontal comunica firmeza y contención segura sin necesidad de levantar la voz.
            </p>
          </div>
        </div>

        <div class="p-4 rounded-xl border border-white/10 bg-slate-900/60 flex items-start gap-4">
          <span class="text-xl font-black text-indigo-400 font-mono">03</span>
          <div>
            <h4 class="text-xs font-bold text-white uppercase tracking-wider">Nombramiento de la Emoción (Validación sin Concesión)</h4>
            <p class="text-xs text-slate-300 mt-1 leading-relaxed">
              Verbalizar con neutralidad afectuosa: <em>"Veo que estás sumamente enojado y es válido sentirse así. Lo que no está permitido es lastimar o insultar"</em>. Se valida la experiencia emocional mientras se preserva el límite de conducta inquebrantable.
            </p>
          </div>
        </div>

        <div class="p-4 rounded-xl border border-white/10 bg-slate-900/60 flex items-start gap-4">
          <span class="text-xl font-black text-emerald-400 font-mono">04</span>
          <div>
            <h4 class="text-xs font-bold text-white uppercase tracking-wider">La Pregunta Detonadora de Reflexión</h4>
            <p class="text-xs text-slate-300 mt-1 leading-relaxed">
              Una vez que la curva fisiológica retorna a la línea base, se abre el espacio de aprendizaje: <em>"¿Con cuál enojo actuamos hace un momento? ¿Y cuál decidiremos alimentar la próxima vez?"</em>.
            </p>
          </div>
        </div>
      </div>

      <!-- Cuadro de Compromiso Terapéutico -->
      <div class="mt-8 p-5 rounded-2xl bg-slate-900 border border-cyan-500/20">
        <h4 class="text-xs font-bold uppercase tracking-wider text-cyan-300 mb-2">Compromiso Terapéutico Familiar</h4>
        <p class="text-xs text-slate-300 leading-relaxed">
          Este protocolo está concebido para ser entregado a los padres en sesión clínica, acompañando la lectura del cuento de <strong>Lucía y el Enojo Limpio y Sucio</strong> como herramienta de anclaje conductual en casa.
        </p>
      </div>
    </div>

    <div class="text-[10px] font-mono text-slate-500 border-t border-white/10 pt-3 flex justify-between">
      <span>© 2026 Cathy Kids • cathykids.club</span>
      <span>Impresión clínica en alta resolución</span>
    </div>
  </div>

</body>
</html>`;

  const browser = await puppeteer.launch({
    executablePath: chromePath,
    headless: true,
    args: ['--no-sandbox', '--disable-setuid-sandbox', '--disable-gpu']
  });

  const page = await browser.newPage();
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  const pdfPath = path.join(outDir, 'Toolkit_Clinico_CatyKids.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
  });

  await browser.close();
  console.log(`✅ Toolkit_Clinico_CatyKids.pdf generado con artes 3D en ${pdfPath}`);
})();
