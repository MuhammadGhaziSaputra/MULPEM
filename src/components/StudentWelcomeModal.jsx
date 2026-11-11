import React, { useState, useEffect, useRef } from 'react';
import { User, Sparkles, ArrowRight, ShieldCheck, GraduationCap, X, AlertTriangle } from 'lucide-react';
import { triggerConfetti } from '../utils/confetti';

export default function StudentWelcomeModal({
  isOpen,
  mode = 'welcome',
  onSave,
  onClose,
  onEnterTeacherPortal,
  initialName = '',
  initialClass = 'X-2'
}) {
  const isEditMode = mode === 'edit';
  const [name, setName] = useState(initialName === 'Siswa Mandiri' ? '' : initialName);
  const [studentClass, setStudentClass] = useState(initialClass || 'X-2');
  const [error, setError] = useState('');
  const nameInputRef = useRef(null);

  // Sinkronkan ulang form ketika modal dibuka kembali (misalnya saat ganti nama atau setelah Reset Progres)
  useEffect(() => {
    if (isOpen) {
      setName(initialName === 'Siswa Mandiri' ? '' : initialName || '');
      setStudentClass(initialClass || 'X-2');
      setError('');
    }
  }, [isOpen, initialName, initialClass, mode]);

  const handleAttemptClose = () => {
    if (isEditMode && onClose) {
      setError('');
      onClose();
      return;
    }

    const cleanName = name.trim();
    if (!cleanName) {
      setError('Nama lengkap wajib diisi sebelum menutup jendela ini (atau pilih Masuk ke Portal Guru).');
    } else if (cleanName.length < 2) {
      setError('Mohon masukkan nama lengkapmu minimal 2 huruf sebelum menutup jendela ini.');
    } else if (cleanName.toLowerCase() === 'siswa mandiri') {
      setError('Mohon isi dengan nama lengkap aslimu sebelum menutup jendela ini.');
    } else {
      setError('Nama lengkap belum tersimpan. Klik "Mulai Petualangan Belajar" untuk menyimpan dan masuk.');
    }
    nameInputRef.current?.focus();
  };

  // Tangkap tombol Escape agar tidak menutup paksa sebelum nama lengkap terisi pada mode welcome
  useEffect(() => {
    if (!isOpen) return;
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        handleAttemptClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, name, isEditMode]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const cleanName = name.trim();
    if (!cleanName || cleanName.length < 2) {
      setError('Nama lengkap wajib diisi minimal 2 huruf untuk melanjutkan.');
      nameInputRef.current?.focus();
      return;
    }
    if (cleanName.toLowerCase() === 'siswa mandiri') {
      setError('Mohon isi dengan nama lengkap aslimu, bukan nama bawaan.');
      nameInputRef.current?.focus();
      return;
    }

    setError('');
    onSave(cleanName, studentClass.trim() || 'X-2');
    if (!isEditMode) {
      triggerConfetti();
    }
  };

  const handleGoTeacherPortal = () => {
    setError('');
    if (onEnterTeacherPortal) {
      onEnterTeacherPortal();
    }
  };

  return (
    <div
      onClick={handleAttemptClose}
      className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-950/75 backdrop-blur-md animate-in fade-in duration-300"
    >
      <div
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
        aria-labelledby="welcome-modal-title"
        className="bg-white rounded-3xl max-w-lg w-full max-h-[92vh] overflow-y-auto shadow-2xl border border-slate-200 animate-in zoom-in-95 duration-200"
      >
        {/* Header Visual Banner */}
        <div
          className="p-6 sm:p-7 text-white relative overflow-hidden"
          style={{
            backgroundColor: '#1E1B4B',
            backgroundImage: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 60%, #0F172A 100%)'
          }}
        >
          <button
            type="button"
            onClick={handleAttemptClose}
            aria-label={isEditMode ? 'Tutup ubah identitas' : 'Tutup jendela selamat datang'}
            title={isEditMode ? 'Batal ubah identitas' : 'Tutup pop-up'}
            className="absolute top-4 right-4 z-20 p-2 rounded-full text-white/75 hover:text-white hover:bg-white/15 transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="relative z-10 pr-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-white/15 backdrop-blur-md border border-white/20 text-teal-200 mb-3 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              <span>{isEditMode ? 'Pengaturan Identitas Siswa' : 'Selamat Datang di Studio Informatika'}</span>
            </div>

            <h2
              id="welcome-modal-title"
              className="text-xl sm:text-2xl font-heading font-extrabold text-white leading-tight"
            >
              {isEditMode ? 'Ubah Nama & Kelas Siswa' : 'Mulai Perjalanan Belajarmu!'}
            </h2>
            <p className="mt-1 text-xs sm:text-sm text-indigo-100/90 leading-relaxed">
              {isEditMode
                ? 'Perbaiki ejaan nama lengkap atau pindah kelas agar data belajarmu tercatat akurat.'
                : 'Fase E (Kelas X SMA) • Media Pembelajaran Mandiri Sistem Komputer'}
            </p>
          </div>
        </div>

        {/* Form Isi / Ubah Identitas Siswa + Opsi Portal Guru */}
        <form onSubmit={handleSubmit} className="p-6 sm:p-7 space-y-5">
          <p className="text-xs text-slate-600 leading-relaxed">
            {isEditMode ? (
              <>
                Seluruh poin, skor kuis, dan progres belajar yang sudah kamu kumpulkan akan tetap tersimpan dan langsung terhubung ke nama baru di <b>Portal Guru</b>.
              </>
            ) : (
              <>
                Masukkan namamu agar seluruh poin latihan, skor kuis, dan capaian belajarmu tercatat secara resmi dan otomatis tersinkronisasi ke <b>Portal Guru</b> di kelas.
              </>
            )}
          </p>

          <div>
            <label className="block text-xs font-bold text-slate-700 uppercase tracking-wider mb-1.5">
              Nama Lengkap Siswa:
            </label>
            <div className="relative">
              <User className={`w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 ${error ? 'text-rose-500' : 'text-slate-400'}`} />
              <input
                ref={nameInputRef}
                type="text"
                value={name}
                onChange={(e) => {
                  setName(e.target.value);
                  if (error) setError('');
                }}
                placeholder="Contoh: Muhammad Ghazi"
                autoFocus
                className={`w-full pl-10 pr-4 py-2.5 text-sm rounded-xl border focus:outline-none focus:ring-2 font-medium text-slate-900 transition-colors ${
                  error
                    ? 'border-rose-400 bg-rose-50/60 focus:ring-rose-500'
                    : 'border-slate-300 bg-slate-50 focus:ring-primary-600 focus:border-transparent'
                }`}
              />
            </div>
            {error && (
              <div
                role="alert"
                className="mt-2 px-3 py-2 rounded-xl bg-rose-50 border border-rose-200 text-xs text-rose-700 font-semibold flex items-start gap-2 animate-in fade-in duration-150"
              >
                <AlertTriangle className="w-4 h-4 text-rose-600 shrink-0 mt-0.5" />
                <span>{error}</span>
              </div>
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

          {isEditMode ? (
            <div className="flex items-center gap-3 pt-1">
              <button
                type="button"
                onClick={handleAttemptClose}
                className="px-4 py-3 rounded-xl border border-slate-300 bg-white hover:bg-slate-50 text-slate-700 font-heading font-bold text-xs sm:text-sm transition-colors cursor-pointer"
              >
                Batal
              </button>
              <button
                type="submit"
                className="flex-1 py-3 px-5 rounded-xl bg-primary-700 hover:bg-primary-800 text-white font-heading font-extrabold text-sm sm:text-base shadow-lg shadow-primary-700/25 flex items-center justify-center gap-2 transition-all hover:scale-102 cursor-pointer"
              >
                <span>Simpan Perubahan</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          ) : (
            <>
              <button
                type="submit"
                className="w-full py-3 px-5 rounded-xl bg-primary-700 hover:bg-primary-800 text-white font-heading font-extrabold text-sm sm:text-base shadow-lg shadow-primary-700/25 flex items-center justify-center gap-2 transition-all hover:scale-102 cursor-pointer"
              >
                <span>Mulai Petualangan Belajar</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              {/* Opsi Khusus Guru agar bisa masuk Portal Guru tanpa mengisi nama siswa */}
              <div className="pt-3.5 border-t border-slate-200 space-y-2">
                <p className="text-[11px] font-semibold text-slate-500 text-center">
                  Masuk sebagai Guru / Pengajar?
                </p>
                <button
                  type="button"
                  onClick={handleGoTeacherPortal}
                  className="w-full py-2.5 px-4 rounded-xl border border-indigo-200 bg-indigo-50/80 hover:bg-indigo-100 text-indigo-900 font-heading font-bold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  <GraduationCap className="w-4 h-4 text-indigo-700 shrink-0" />
                  <span>Masuk ke Portal Guru (Tanpa Isi Nama)</span>
                  <ArrowRight className="w-3.5 h-3.5 text-indigo-700 shrink-0" />
                </button>
              </div>
            </>
          )}
        </form>
      </div>
    </div>
  );
}
