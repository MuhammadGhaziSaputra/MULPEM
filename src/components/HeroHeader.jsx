import React from 'react';
import { ArrowRight, BookOpen, HelpCircle } from 'lucide-react';

export default function HeroHeader({ onStartLearning, onOpenTP, onOpenGuide }) {
  return (
    <div className="relative overflow-hidden rounded-3xl bg-primary-600 text-white p-7 sm:p-10 lg:p-12 border-[3px] border-slate-900 shadow-[8px_8px_0px_0px_#0F172A]">
      <div className="relative z-10 max-w-3xl">
        {/* Badges Neo-Brutalist kontras tajam */}
        <div className="flex flex-wrap items-center gap-2.5 mb-5">
          <span className="px-3.5 py-1.5 rounded-xl text-xs font-extrabold bg-yellow-300 border-2 border-slate-900 text-slate-900 shadow-[2px_2px_0px_0px_#0F172A]">
            🎓 Fase E / Kelas X
          </span>
          <span className="px-3.5 py-1.5 rounded-xl text-xs font-extrabold bg-emerald-300 border-2 border-slate-900 text-slate-900 shadow-[2px_2px_0px_0px_#0F172A]">
            ❖ 3 Unit Interaktif
          </span>
          <span className="px-3.5 py-1.5 rounded-xl text-xs font-extrabold bg-white border-2 border-slate-900 text-slate-900 shadow-[2px_2px_0px_0px_#0F172A]">
            ⏱️ Estimasi: 45 Menit Belajar
          </span>
        </div>

        {/* Title: Putih tebal kontras di atas Cobalt Blue solid */}
        <h1 className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold tracking-tight leading-tight text-white">
          Mekanisme Kerja Sistem Komputer
        </h1>

        {/* Subtitle: Kontras terang terbaca jelas */}
        <p className="mt-4 text-base sm:text-lg text-blue-50 leading-relaxed max-w-2xl font-medium">
          Eksplorasi visual cara kerja komputer mulai dari Arsitektur Von Neumann, alur Input – Proses – Output (IPO), hingga siklus instruksi Fetch – Decode – Execute di dalam inti CPU.
        </p>

        {/* 3 Call to Action Buttons Neo-Brutalist */}
        <div className="mt-8 flex flex-wrap items-center gap-3.5">
          <button
            onClick={onStartLearning}
            className="neo-btn px-6 py-3 rounded-xl bg-yellow-300 hover:bg-yellow-200 text-slate-900 font-extrabold text-sm sm:text-base flex items-center gap-2 cursor-pointer"
          >
            <span>Mulai Belajar Sekarang</span>
            <ArrowRight className="w-4 h-4 text-slate-900" />
          </button>

          <button
            type="button"
            onClick={onOpenTP}
            className="neo-btn px-5 py-3 rounded-xl bg-white hover:bg-emerald-200 text-slate-900 text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
          >
            <BookOpen className="w-4 h-4 text-emerald-700 shrink-0" />
            <span>Lihat Tujuan Pembelajaran</span>
          </button>

          <button
            type="button"
            onClick={onOpenGuide}
            className="neo-btn px-5 py-3 rounded-xl bg-sky-200 hover:bg-sky-100 text-slate-900 text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
          >
            <HelpCircle className="w-4 h-4 text-slate-900 shrink-0" />
            <span>Petunjuk Penggunaan</span>
          </button>
        </div>
      </div>
    </div>
  );
}
