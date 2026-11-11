import React, { useState } from 'react';
import { User, Sparkles, ArrowRight, ShieldCheck, BookOpen, GraduationCap } from 'lucide-react';
import { triggerConfetti } from '../utils/confetti';

export default function StudentWelcomeModal({ isOpen, onSave, initialName = '', initialClass = 'X-2' }) {
  const [name, setName] = useState(initialName);
  const [studentClass, setStudentClass] = useState(initialClass || 'X-2');
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanName = name.trim();
    if (!cleanName || cleanName.length < 2) {
      setError('Mohon masukkan nama lengkapmu minimal 2 huruf.');
      return;
    }

    setError('');
    onSave(cleanName, studentClass.trim() || 'X-2');
    triggerConfetti();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-300">
      <div className="bg-white rounded-3xl max-w-lg w-full shadow-2xl border border-slate-200 overflow-hidden animate-in zoom-in-95 duration-200">
        {/* Header Visual Banner */}
        <div 
          className="p-6 sm:p-7 text-white relative overflow-hidden"
          style={{
            backgroundColor: '#1E1B4B',
            backgroundImage: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 60%, #0F172A 100%)'
          }}
        >
          <div className="relative z-10">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/15 backdrop-blur-md border border-white/20 text-teal-200 mb-3 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>Selamat Datang di Studio Informatika</span>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-heading font-extrabold text-white leading-tight">
              Mulai Perjalanan Belajarmu!
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-indigo-100/90 leading-relaxed">
              Fase E (Kelas X SMA) • Media Pembelajaran Mandiri Sistem Komputer
            </p>
          </div>
        </div>

        {/* Form Isi Identitas Siswa */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-5">
          <p className="text-xs text-slate-600 leading-relaxed">
            Masukkan namamu agar seluruh poin latihan, skor kuis, dan capaian belajarmu tercatat secara resmi dan otomatis tersinkronisasi ke <b>Portal Guru</b> di kelas.
          </p>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Nama Lengkap Siswa:
            </label>
            <div className="relative">
              <User className="w-4 h-4 text-slate-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Contoh: Muhammad Ghazi"
                autoFocus
                className="w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border border-slate-300 focus:outline-none focus:ring-2 focus:ring-primary-600 focus:border-transparent bg-slate-50 font-medium text-slate-900"
              />
            </div>
            {error && (
              <p className="text-xs text-rose-600 font-semibold mt-1.5 flex items-center gap-1">
                <span>⚠</span>
                <span>{error}</span>
              </p>
            )}
          </div>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Kelas / Rombongan Belajar:
            </label>
            <div className="grid grid-cols-4 gap-2">
              {['X-1', 'X-2', 'X-3', 'X-4'].map((kls) => (
                <button
                  type="button"
                  key={kls}
                  onClick={() => setStudentClass(kls)}
                  className={`py-2 rounded-xl text-xs font-bold border transition-all ${
                    studentClass === kls
                      ? 'bg-primary-700 text-white border-primary-700 shadow-sm'
                      : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                  }`}
                >
                  {kls}
                </button>
              ))}
            </div>
            <div className="mt-2">
              <input
                type="text"
                value={studentClass}
                onChange={(e) => setStudentClass(e.target.value)}
                placeholder="Atau ketik kelas lain (contoh: X-5)"
                className="w-full px-3 py-1.5 text-xs rounded-xl border border-slate-300 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-primary-500 font-medium"
              />
            </div>
          </div>

          <div className="p-3.5 rounded-xl bg-teal-50 border border-teal-200/80 text-teal-900 text-[11px] leading-relaxed flex items-start gap-2.5">
            <ShieldCheck className="w-4 h-4 text-teal-600 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold">100% Bebas Akun:</span> Data tersimpan aman di browser lokalmu dan otomatis disinkronkan ke rekapitulasi database guru di lab komputer.
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 px-5 rounded-xl bg-primary-700 hover:bg-primary-800 text-white font-heading font-extrabold text-sm sm:text-base shadow-lg shadow-primary-700/25 flex items-center justify-center gap-2 transition-all hover:scale-102 cursor-pointer"
          >
            <span>Mulai Petualangan Belajar</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>
      </div>
    </div>
  );
}
