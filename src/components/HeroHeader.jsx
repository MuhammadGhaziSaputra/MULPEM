import React from 'react';
import { ArrowRight, BookOpen, HelpCircle } from 'lucide-react';

export default function HeroHeader({ onStartLearning, onOpenTP, onOpenGuide }) {
  return (
    <div 
      className="relative overflow-hidden rounded-3xl text-white p-7 sm:p-10 lg:p-12 shadow-2xl border border-indigo-700/60"
      style={{
        backgroundColor: '#1E1B4B',
        backgroundImage: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 55%, #1E1B4B 100%)'
      }}
    >
      {/* Decorative Background Lighting Effects */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-primary-500/20 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20"></div>
      <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-teal-500/20 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative z-10 max-w-3xl">
        {/* Badges dengan warna kontras tajam & jelas terbaca */}
        <div className="flex flex-wrap items-center gap-2.5 mb-5">
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-white/15 backdrop-blur-md border border-white/25 text-white shadow-sm">
            🎓 Fase E / Kelas X
          </span>
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-teal-500/30 backdrop-blur-md border border-teal-300/50 text-teal-200 shadow-sm">
            ❖ 3 Unit Interaktif
          </span>
          <span className="px-3.5 py-1.5 rounded-full text-xs font-bold bg-amber-500/30 backdrop-blur-md border border-amber-300/50 text-amber-200 shadow-sm">
            ⏱️ Estimasi: 45 Menit Belajar
          </span>
        </div>

        {/* Title: Putih tebal kontras di atas latar biru tua */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight leading-tight text-white drop-shadow-md">
          Mekanisme Kerja Sistem Komputer
        </h1>

        {/* Subtitle: Biru muda terang */}
        <p className="mt-4 text-base sm:text-lg text-indigo-100 leading-relaxed max-w-2xl font-normal">
          Eksplorasi visual cara kerja komputer mulai dari Arsitektur Von Neumann, alur Input – Proses – Output (IPO), hingga siklus instruksi Fetch – Decode – Execute di dalam inti CPU.
        </p>

        {/* 3 Call to Action Buttons dengan kontras maksimal */}
        <div className="mt-8 flex flex-wrap items-center gap-3.5">
          {/* Tombol Putih dengan Teks Gelap Pekat */}
          <button
            onClick={onStartLearning}
            className="px-6 py-3 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-heading font-extrabold text-sm sm:text-base shadow-xl flex items-center gap-2 transition-all hover:scale-102 cursor-pointer"
          >
            <span className="text-slate-900">Mulai Belajar Sekarang</span>
            <ArrowRight className="w-4 h-4 text-primary-700" />
          </button>

          {/* Tombol Biru Indigo Solid dengan Border Jelas */}
          <button
            type="button"
            onClick={onOpenTP}
            className="px-5 py-3 rounded-xl text-white font-bold text-xs sm:text-sm border border-indigo-300/40 hover:border-teal-300 flex items-center gap-2 transition-all shadow-md cursor-pointer hover:scale-102"
            style={{ backgroundColor: 'rgba(49, 46, 129, 0.9)' }}
          >
            <BookOpen className="w-4 h-4 text-teal-300 shrink-0" />
            <span className="text-white">Lihat Tujuan Pembelajaran</span>
          </button>

          {/* Tombol Biru Indigo Solid untuk Petunjuk */}
          <button
            type="button"
            onClick={onOpenGuide}
            className="px-5 py-3 rounded-xl text-white font-bold text-xs sm:text-sm border border-indigo-300/40 hover:border-amber-300 flex items-center gap-2 transition-all shadow-md cursor-pointer hover:scale-102"
            style={{ backgroundColor: 'rgba(49, 46, 129, 0.9)' }}
          >
            <HelpCircle className="w-4 h-4 text-amber-300 shrink-0" />
            <span className="text-white">Petunjuk Penggunaan</span>
          </button>
        </div>
      </div>
    </div>
  );
}
