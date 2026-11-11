import React from 'react';
import { CheckCircle2, GraduationCap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t-[3px] border-slate-900 mt-16 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <div className="font-heading font-extrabold text-slate-900 text-sm">
              Elevated Academic Studio • Informatika X
            </div>
            <div className="text-xs font-medium text-slate-600 mt-0.5">
              © 2025 SMA Negeri 2 Makassar. Media Pembelajaran Mandiri & Interaktif Terbuka.
            </div>
          </div>

          <div className="flex items-center gap-3 text-xs font-bold text-slate-900">
            <div className="flex items-center gap-1.5 bg-emerald-200 text-slate-900 px-3 py-1 rounded-lg border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A]">
              <CheckCircle2 className="w-3.5 h-3.5 text-slate-900" />
              <span>Kurikulum Merdeka</span>
            </div>
            <div className="flex items-center gap-1.5 bg-yellow-300 text-slate-900 px-3 py-1 rounded-lg border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A]">
              <GraduationCap className="w-3.5 h-3.5 text-slate-900" />
              <span>Fase E</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
