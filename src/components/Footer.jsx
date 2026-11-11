import React from 'react';
import { CheckCircle2, GraduationCap } from 'lucide-react';

export default function Footer() {
  return (
    <footer className="bg-white border-t border-slate-200 mt-16 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          <div>
            <div className="font-heading font-bold text-slate-800 text-sm">
              Elevated Academic Studio • Informatika X
            </div>
            <div className="text-xs text-slate-500 mt-0.5">
              © 2025 SMA Negeri 2 Makassar. Media Pembelajaran Mandiri & Interaktif Terbuka.
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-medium text-slate-600">
            <div className="flex items-center gap-1.5 bg-teal-50 text-teal-800 px-2.5 py-1 rounded-md border border-teal-200/60">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
              <span>Kurikulum Merdeka</span>
            </div>
            <div className="flex items-center gap-1.5 bg-primary-50 text-primary-800 px-2.5 py-1 rounded-md border border-primary-200/60">
              <GraduationCap className="w-3.5 h-3.5 text-primary-600" />
              <span>Fase E</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
