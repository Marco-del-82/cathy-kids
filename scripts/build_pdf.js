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

  // Leer imágenes en base64 para inyección directa
  const enojoSucioB64 = fs.readFileSync(path.join(rootDir, 'public/assets/enojo_sucio_3d.jpg')).toString('base64');
  const enojoLimpioB64 = fs.readFileSync(path.join(rootDir, 'public/assets/enojo_limpio_3d.jpg')).toString('base64');
  const luciaB64 = fs.readFileSync(path.join(rootDir, 'public/assets/lucia_autora.jpg')).toString('base64');

  const htmlContent = `<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @page { size: A4 portrait; margin: 0; }
    body { -webkit-print-color-adjust: exact; font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif; }
    .page-break { page-break-after: always; }
  </style>
</head>
<body class="bg-white text-slate-900">

  <!-- PÁGINA 1: PORTADA CLÍNICA Y MATRIZ DE LOS DOS ENOJOS (TIPOGRAFÍA GRANDE DE ALTA LEGIBILIDAD) -->
  <div class="w-[210mm] h-[297mm] p-10 flex flex-col justify-between page-break bg-white text-slate-900 border-b border-slate-200 relative overflow-hidden box-border">
    <div class="relative z-10 flex flex-col justify-between h-full">
      
      <!-- Header Institucional -->
      <div class="flex justify-between items-center border-b-2 border-slate-200 pb-3 mb-5">
        <div>
          <span class="text-sm font-mono font-bold tracking-widest text-blue-600 uppercase">Cathy Kids • Protocolo Clínico & Neuroeducativo</span>
        </div>
        <div class="text-right">
          <span class="text-sm font-bold text-slate-800">Mtra. Cathy Calderón de la Barca</span>
          <span class="block text-xs text-slate-500 font-mono">Dirección Clínica • UDLA / ILEF</span>
        </div>
      </div>
      
      <!-- Portada con Avatar Lucía y Título Grande -->
      <div class="flex items-center gap-6 mb-5">
        <img src="data:image/jpeg;base64,${luciaB64}" class="w-36 h-36 rounded-3xl object-cover border-4 border-amber-400 shadow-xl flex-shrink-0" />
        <div>
          <span class="text-xs font-black uppercase tracking-wider px-3.5 py-1.5 rounded-full bg-blue-100 text-blue-800 border border-blue-200">
            Guía de Intervención en el Hogar y Consulta
          </span>
          <h1 class="text-4xl font-black text-slate-950 tracking-tight leading-tight mt-2.5">
            La Anatomía del Límite: <br>
            <span class="text-blue-600">Enojo Limpio</span> vs. <span class="text-rose-600">Enojo Sucio</span>
          </h1>
          <p class="text-base text-slate-600 mt-2 font-medium leading-relaxed">
            Regulación somática, desescalamiento del berrinche y preservación del apego seguro.
          </p>
        </div>
      </div>

      <!-- Fundamento Neurobiológico (Caja Clara Ampliada) -->
      <div class="bg-blue-50 border-2 border-blue-200 rounded-2xl p-5 mb-5 shadow-sm">
        <h3 class="text-base font-black text-blue-900 uppercase tracking-wider mb-2 flex items-center gap-2">
          <span>🧠 Fundamento Neurobiológico</span>
        </h3>
        <p class="text-sm leading-relaxed text-slate-800 font-normal">
          El enojo no es una conducta que deba reprimirse o castigarse: es la <strong>energía vital de la asertividad</strong> indispensable para salvaguardar la propia integridad y estructurar límites saludables. El punto de inflexión clínico radica en su canal de emisión: el <em>Enojo Sucio</em> secuestra la amígdala cerebral, infunde culpa y Vergüenza Tóxica; el <em>Enojo Limpio</em> activa la corregulación y enseña al menor a poner límites firmes sin quebrar el vínculo de amor familiar.
        </p>
      </div>

      <!-- Matriz Visual de Contraste con Renders 3D Grandes y Textos Claros -->
      <div class="grid grid-cols-2 gap-5 mb-4 flex-grow">
        <!-- Tarjeta Enojo Sucio -->
        <div class="border-2 border-rose-300 rounded-3xl p-5 bg-rose-50/80 flex flex-col justify-between shadow-sm">
          <div>
            <div class="flex items-center gap-4 mb-3.5">
              <img src="data:image/jpeg;base64,${enojoSucioB64}" class="w-20 h-20 rounded-2xl object-cover border-2 border-rose-400 shadow-md flex-shrink-0" />
              <div>
                <h4 class="text-lg font-black text-rose-800 uppercase tracking-wide">Enojo Sucio</h4>
                <span class="text-base font-bold text-rose-600 font-mono">"Límites que Hieren"</span>
              </div>
            </div>
            <ul class="text-[16px] space-y-2.5 text-slate-800 leading-snug">
              <li>• <strong>Descarga:</strong> Reactiva, sarcástica, ataque a la identidad.</li>
              <li>• <strong>Respuesta biológica:</strong> Alarma amigdalina (modo amenaza).</li>
              <li>• <strong>Herida relacional:</strong> Culpa y Vergüenza Tóxica.</li>
              <li>• <strong>Símbolo somático:</strong> Maza metálica que cierra el corazón.</li>
            </ul>
          </div>
          <div class="mt-3.5 p-3.5 rounded-xl bg-white border border-rose-200 text-base text-rose-950 font-bold italic shadow-inner">
            “¡Qué tonta eres, vete a tu cuarto! Así nadie te va a querer.”
          </div>
        </div>

        <!-- Tarjeta Enojo Limpio -->
        <div class="border-2 border-sky-300 rounded-3xl p-5 bg-sky-50/80 flex flex-col justify-between shadow-sm">
          <div>
            <div class="flex items-center gap-4 mb-3.5">
              <img src="data:image/jpeg;base64,${enojoLimpioB64}" class="w-20 h-20 rounded-2xl object-cover border-2 border-sky-400 shadow-md flex-shrink-0" />
              <div>
                <h4 class="text-lg font-black text-sky-800 uppercase tracking-wide">Enojo Limpio</h4>
                <span class="text-base font-bold text-sky-600 font-mono">"Límites con Respeto"</span>
              </div>
            </div>
            <ul class="text-[16px] space-y-2.5 text-slate-800 leading-snug">
              <li>• <strong>Descarga:</strong> Firme, frontal, regulada, sin descalificar.</li>
              <li>• <strong>Respuesta biológica:</strong> Cadencia vagal segura (60 BPM).</li>
              <li>• <strong>Puente vincular:</strong> Separa la conducta del valor del niño.</li>
              <li>• <strong>Símbolo somático:</strong> Corazón íntegro abierto al afecto.</li>
            </ul>
          </div>
          <div class="mt-3.5 p-3.5 rounded-xl bg-white border border-sky-200 text-base text-sky-950 font-bold italic shadow-inner">
            “¡Para! No me gusta. Te amo, pero esta conducta no es aceptable.”
          </div>
        </div>
      </div>

      <!-- Footer Página 1 -->
      <div class="text-xs font-mono text-slate-500 border-t border-slate-200 pt-3 flex justify-between items-center">
        <span>cathykids.club • Documento Clínico Oficial</span>
        <span>Uso autorizado para Terapeutas, Psicólogos y Familias</span>
      </div>

    </div>
  </div>

  <!-- PÁGINA 2: PROTOCOLO DE INTERVENCIÓN EN CRISIS (LETRAS GRANDES & LEGIBLES) -->
  <div class="w-[210mm] h-[297mm] p-10 flex flex-col justify-between bg-white text-slate-900 relative box-border">
    <div class="flex flex-col justify-between h-full">
      <div>
        <div class="flex justify-between items-center border-b-2 border-slate-200 pb-3 mb-5">
          <span class="text-sm font-mono font-bold tracking-widest text-blue-600 uppercase">Protocolo de Aplicación en Consulta y Hogar</span>
          <span class="text-sm text-slate-700 font-bold">Metodología de Apego Seguro</span>
        </div>

        <h2 class="text-4xl font-black text-slate-950 mb-5">Secuencia de 4 Pasos de Corregulación</h2>

        <div class="space-y-4">
          <!-- Paso 1 -->
          <div class="p-5 rounded-2xl border-2 border-slate-200 bg-slate-50 flex items-start gap-5 shadow-sm">
            <span class="text-4xl font-black text-blue-600 font-mono flex-shrink-0">01</span>
            <div>
              <h4 class="text-lg font-black text-slate-950 uppercase tracking-wider">Pausa Fisiológica (Frenar el Enojo Sucio)</h4>
              <p class="text-[16px] text-slate-700 mt-1 leading-relaxed font-medium">
                El terapeuta o cuidador registra su propia reactividad visceral antes de intervenir. Si hay aceleración del ritmo cardíaco o prosodia hostil, se aplica silencio compasivo de 5 segundos para evitar contagiar la alerta al sistema nervioso del niño.
              </p>
            </div>
          </div>

          <!-- Paso 2 -->
          <div class="p-5 rounded-2xl border-2 border-slate-200 bg-slate-50 flex items-start gap-5 shadow-sm">
            <span class="text-4xl font-black text-indigo-600 font-mono flex-shrink-0">02</span>
            <div>
              <h4 class="text-lg font-black text-slate-950 uppercase tracking-wider">Alineación Fisiológica al Nivel de los Ojos</h4>
              <p class="text-[16px] text-slate-700 mt-1 leading-relaxed font-medium">
                Descender físicamente a la altura de la mirada del infante. La verticalidad autoritaria dispara el reflejo primitivo de amenaza; el nivel horizontal comunica firmeza y contención segura sin necesidad de alzar la voz ni amenazar.
              </p>
            </div>
          </div>

          <!-- Paso 3 -->
          <div class="p-5 rounded-2xl border-2 border-slate-200 bg-slate-50 flex items-start gap-5 shadow-sm">
            <span class="text-4xl font-black text-cyan-600 font-mono flex-shrink-0">03</span>
            <div>
              <h4 class="text-lg font-black text-slate-950 uppercase tracking-wider">Nombramiento de la Emoción (Validación sin Concesión)</h4>
              <p class="text-[16px] text-slate-700 mt-1 leading-relaxed font-medium">
                Verbalizar con neutralidad afectuosa: <em>"Veo que estás sumamente enojado y es válido sentirse así. Lo que no está permitido es lastimar ni destruir"</em>. Se valida la experiencia afectiva mientras se preserva el límite inquebrantable.
              </p>
            </div>
          </div>

          <!-- Paso 4 -->
          <div class="p-5 rounded-2xl border-2 border-slate-200 bg-slate-50 flex items-start gap-5 shadow-sm">
            <span class="text-4xl font-black text-emerald-600 font-mono flex-shrink-0">04</span>
            <div>
              <h4 class="text-lg font-black text-slate-950 uppercase tracking-wider">La Pregunta Detonadora de Reflexión</h4>
              <p class="text-[16px] text-slate-700 mt-1 leading-relaxed font-medium">
                Una vez que la curva fisiológica retorna a la línea base y la respiración es lenta, se abre el diálogo de aprendizaje: <em>"¿Desde cuál enojo actuamos hace un momento? ¿Y a cuál decidiremos alimentar la próxima vez?"</em>.
              </p>
            </div>
          </div>
        </div>

        <!-- Cuadro de Compromiso Terapéutico -->
        <div class="mt-6 p-5 rounded-3xl bg-amber-50 border-2 border-amber-300 shadow-sm">
          <h4 class="text-sm font-black uppercase tracking-wider text-amber-900 mb-1.5">Compromiso Terapéutico Familiar</h4>
          <p class="text-[16px] text-amber-950 leading-relaxed font-medium">
            Este protocolo está concebido para ser entregado a los padres en sesión clínica, acompañando la lectura del cuento de <strong>Lucía y el Enojo Limpio y Sucio</strong> como herramienta de anclaje conductual en el hogar.
          </p>
        </div>
      </div>

      <!-- Footer Página 2 -->
      <div class="text-xs font-mono text-slate-500 border-t border-slate-200 pt-3 flex justify-between items-center">
        <span>© 2026 Cathy Kids • cathykids.club</span>
        <span>Impresión clínica en alta resolución • Formato A4</span>
      </div>
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
  await page.setViewport({ width: 1200, height: 1600, deviceScaleFactor: 2 });
  await page.setContent(htmlContent, { waitUntil: 'networkidle0' });

  const pdfPath = path.join(outDir, 'Toolkit_Clinico_CatyKids.pdf');
  await page.pdf({
    path: pdfPath,
    format: 'A4',
    printBackground: true,
    margin: { top: '0px', right: '0px', bottom: '0px', left: '0px' }
  });

  await browser.close();
  console.log(`✅ Toolkit_Clinico_CatyKids.pdf generado con artes claros y tipografía grande en ${pdfPath}`);
})();
