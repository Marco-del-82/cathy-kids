import React from 'react'
import { Globe, ExternalLink, Award, BookOpen, Heart, Sparkles } from 'lucide-react'

export const CathyAuthorProfile = () => {
  const socials = [
    {
      name: 'Sitio Web Oficial',
      handle: 'cathycdelabarca.com',
      url: 'https://cathycdelabarca.com',
      color: 'from-blue-600 to-cyan-500',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z"/>
        </svg>
      )
    },
    {
      name: 'Instagram',
      handle: '@cathycdelabarca',
      url: 'https://www.instagram.com/cathycdelabarca',
      color: 'from-purple-600 via-pink-600 to-amber-500',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
        </svg>
      )
    },
    {
      name: 'YouTube',
      handle: 'Cathy C de la Barca',
      url: 'https://www.youtube.com/@cathycdelabarca',
      color: 'from-red-600 to-rose-700',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
        </svg>
      )
    },
    {
      name: 'Facebook',
      handle: 'cathycdelabarca',
      url: 'https://www.facebook.com/cathycdelabarca',
      color: 'from-blue-600 to-indigo-700',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      handle: 'Cathy C de la Barca',
      url: 'https://www.linkedin.com/in/cathy-c-de-la-barca-7492a355/',
      color: 'from-blue-700 to-cyan-700',
      icon: (
        <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
          <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
        </svg>
      )
    }
  ]

  return (
    <section id="autora" className="py-20 px-6 bg-gradient-to-b from-[#0a0d14] to-[#07090e] border-t border-white/5 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-blue-600/10 blur-[150px] pointer-events-none rounded-full" />

      <div className="max-w-6xl mx-auto relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <span className="text-xs font-mono font-semibold px-3 py-1 rounded-full bg-blue-500/10 text-blue-400 border border-blue-500/20 uppercase tracking-wider">
            Dirección Clínica & Autora
          </span>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-white mt-3 font-heading">
            Cathy Calderón de la Barca
          </h2>
          <p className="text-slate-400 max-w-2xl mx-auto mt-3 text-sm md:text-base leading-relaxed">
            Psicóloga Clínica, Terapeuta Familiar y de Pareja, y Especialista en Terapia Narrativa con más de 25 años acompañando a familias e infancias.
          </p>
        </div>

        {/* Author Card */}
        <div className="glass-panel p-6 sm:p-10 rounded-3xl border border-white/10 shadow-2xl relative overflow-hidden backdrop-blur-2xl">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            {/* Left: Author & Lucía Character Card */}
            <div className="lg:col-span-5 flex flex-col items-center text-center">
              <div className="relative group mb-5">
                <div className="w-52 h-52 sm:w-60 sm:h-60 rounded-3xl overflow-hidden p-1.5 bg-gradient-to-tr from-blue-500 via-indigo-500 to-amber-400 shadow-2xl shadow-blue-500/30">
                  <img
                    src="/assets/lucia_autora.jpg"
                    alt="Lucía — Cathy Kids"
                    className="w-full h-full object-cover rounded-2xl group-hover:scale-105 transition-transform duration-500"
                  />
                </div>
                <div className="absolute -bottom-3 left-1/2 -translate-x-1/2 px-3.5 py-1 rounded-full bg-slate-900 border border-amber-500/40 text-[11px] font-bold text-amber-300 shadow-lg flex items-center gap-1.5 whitespace-nowrap">
                  <Award className="w-3.5 h-3.5 text-amber-400" />
                  <span>25+ Años de Práctica Clínica</span>
                </div>
              </div>

              <h3 className="text-xl font-bold text-white mt-2">
                Cathy Calderón de la Barca
              </h3>
              <p className="text-xs text-blue-300 font-mono mt-1">
                UDLA • ILEF • Autora y Conferencista
              </p>
            </div>

            {/* Right: Academic Bio & Direct Social Links */}
            <div className="lg:col-span-7 space-y-6 text-left">
              <div>
                <h4 className="text-lg font-bold text-white flex items-center gap-2 mb-2">
                  <Sparkles className="w-4 h-4 text-amber-400" />
                  <span>Trayectoria y Enfoque Clínico</span>
                </h4>
                <p className="text-slate-300 text-sm leading-relaxed">
                  Egresada de la <strong>Universidad de las Américas (UDLA)</strong> con maestría en <strong>Terapia Familiar y de Pareja</strong> y especialidad en <strong>Terapia Narrativa por el Instituto Latinoamericano de Estudios de la Familia (ILEF)</strong>.
                </p>
                <p className="text-slate-300 text-sm leading-relaxed mt-2.5">
                  Autora de los libros <em>"Adolescencia, oportunidad y reto. ¡No tires la toalla!"</em> y <em>"El Miedo"</em>, además de colaboradora habitual en medios nacionales y podcasts de salud mental, trauma transgeneracional y crianza con apego seguro.
                </p>
              </div>

              {/* Verified Badges */}
              <div className="flex flex-wrap gap-2 pt-1">
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300">
                  🎓 UDLA Psicología Clínica
                </span>
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300">
                  👨‍👩‍👧‍👦 ILEF Terapia Familiar
                </span>
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300">
                  📖 Terapia Narrativa
                </span>
                <span className="text-[11px] font-semibold px-2.5 py-1 rounded-lg bg-white/5 border border-white/10 text-slate-300">
                  🧠 Trauma & Regulación Vagal
                </span>
              </div>

              {/* Social Channels Hub */}
              <div className="pt-3 border-t border-white/10">
                <span className="text-xs uppercase tracking-wider font-mono text-slate-400 block mb-3">
                  Redes Sociales y Canales Oficiales:
                </span>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
                  {socials.map((s, idx) => (
                    <a
                      key={idx}
                      href={s.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group flex items-center justify-between p-2.5 rounded-xl bg-slate-950/60 hover:bg-slate-900 border border-white/10 hover:border-white/20 transition-all shadow-sm hover:shadow-md"
                    >
                      <div className="flex items-center gap-2.5">
                        <div className={`w-8 h-8 rounded-lg bg-gradient-to-tr ${s.color} text-white flex items-center justify-center shadow-sm group-hover:scale-105 transition-transform`}>
                          {s.icon}
                        </div>
                        <div>
                          <p className="text-xs font-bold text-white group-hover:text-blue-300 transition-colors">
                            {s.name}
                          </p>
                          <p className="text-[11px] text-slate-400 font-mono">
                            {s.handle}
                          </p>
                        </div>
                      </div>
                      <ExternalLink className="w-3.5 h-3.5 text-slate-500 group-hover:text-white transition-colors mr-1" />
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
