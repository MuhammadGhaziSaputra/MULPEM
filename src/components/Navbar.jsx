import React, { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { 
  Volume2, 
  VolumeX, 
  Award, 
  Home, 
  RotateCcw, 
  GraduationCap, 
  Menu, 
  X, 
  BookOpen, 
  Compass, 
  HelpCircle, 
  ChevronRight, 
  User, 
  Sparkles,
  Cpu,
  Pencil
} from 'lucide-react';
import { storage } from '../utils/storage';

export default function Navbar({ 
  state, 
  currentView, 
  onNavigate, 
  onOpenTP, 
  onOpenGuide,
  onEditProfile
}) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const audioEnabled = state?.preferences?.audioEnabled ?? true;

  // Kunci scroll halaman saat mobile menu sedang terbuka
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isMobileMenuOpen]);

  // Tutup menu otomatis jika pengguna memperlebar layar ke desktop
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const toggleAudio = () => {
    storage.setPreference('audioEnabled', !audioEnabled);
  };

  const handleReset = () => {
    if (window.confirm('Apakah kamu yakin ingin mengulang seluruh capaian belajar dari awal?')) {
      storage.resetAll();
      setIsMobileMenuOpen(false);
      onNavigate('home');
    }
  };

  const handleNav = (view, unitId = 1) => {
    setIsMobileMenuOpen(false);
    onNavigate(view, unitId);
  };

  const handleOpenTPModal = () => {
    setIsMobileMenuOpen(false);
    if (onOpenTP) onOpenTP();
  };

  const handleOpenGuideModal = () => {
    setIsMobileMenuOpen(false);
    if (onOpenGuide) onOpenGuide();
  };

  const studentName = state?.student?.name || 'Siswa Mandiri';
  const studentClass = state?.student?.class || 'X-2';
  const totalPoints = state?.overall?.totalPoints || 0;
  const levelName = state?.overall?.levelName || 'Pemula';
  const completedUnits = state?.overall?.completedUnits || 0;

  return (
    <header className="sticky top-0 z-50 bg-white border-b-[3px] border-slate-900 transition-all">
      <div className="max-w-7xl mx-auto px-3 sm:px-5 xl:px-8">
        <div className="flex items-center justify-between h-16 gap-3 xl:gap-6">
          {/* Brand Left */}
          <div 
            onClick={() => handleNav('home')} 
            className="flex items-center gap-2.5 cursor-pointer group select-none shrink-0"
          >
            <div className="w-9 h-9 rounded-xl bg-yellow-300 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A] flex items-center justify-center text-slate-900 group-hover:-translate-y-0.5 transition-transform shrink-0">
              <Cpu className="w-5 h-5" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-1.5 whitespace-nowrap">
                <span className="font-heading font-extrabold text-slate-900 text-sm sm:text-base leading-none whitespace-nowrap">
                  Studio Informatika
                </span>
                <span className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-extrabold leading-none bg-sky-200 text-slate-900 border border-slate-900 rounded-md whitespace-nowrap shrink-0">
                  Kelas X
                </span>
              </div>
              <div className="text-[11px] text-slate-600 font-semibold leading-tight mt-0.5 whitespace-nowrap">
                SMAN 2 Makassar • Fase E
              </div>
            </div>
          </div>

          {/* Navigation Links - Desktop Only (>= lg) */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-1.5 shrink-0">
            <button
              onClick={() => handleNav('home')}
              className={`px-2.5 xl:px-3 py-1.5 rounded-xl border-2 text-xs xl:text-[13px] whitespace-nowrap shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
                currentView === 'home'
                  ? 'bg-yellow-300 text-slate-900 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A] font-extrabold'
                  : 'text-slate-700 border-transparent hover:border-slate-900 hover:bg-slate-100 hover:text-slate-900 font-bold'
              }`}
            >
              <Home className="w-4 h-4 shrink-0" />
              <span>Beranda</span>
            </button>
            <button
              onClick={() => handleNav('unit', 1)}
              className={`px-2.5 xl:px-3 py-1.5 rounded-xl border-2 text-xs xl:text-[13px] whitespace-nowrap shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
                currentView === 'unit'
                  ? 'bg-yellow-300 text-slate-900 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A] font-extrabold'
                  : 'text-slate-700 border-transparent hover:border-slate-900 hover:bg-slate-100 hover:text-slate-900 font-bold'
              }`}
            >
              <BookOpen className="w-4 h-4 shrink-0" />
              <span>Materi & Kuis</span>
            </button>
            <button
              onClick={() => handleNav('achievement')}
              className={`px-2.5 xl:px-3 py-1.5 rounded-xl border-2 text-xs xl:text-[13px] whitespace-nowrap shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
                currentView === 'achievement'
                  ? 'bg-yellow-300 text-slate-900 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A] font-extrabold'
                  : 'text-slate-700 border-transparent hover:border-slate-900 hover:bg-slate-100 hover:text-slate-900 font-bold'
              }`}
            >
              <Award className="w-4 h-4 shrink-0" />
              <span>Capaian Belajar</span>
            </button>
            <button
              onClick={() => handleNav('verification')}
              className={`px-2.5 xl:px-3 py-1.5 rounded-xl border-2 text-xs xl:text-[13px] whitespace-nowrap shrink-0 transition-all flex items-center gap-1.5 cursor-pointer ${
                currentView === 'verification'
                  ? 'bg-emerald-300 text-slate-900 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A] font-extrabold'
                  : 'text-slate-900 bg-emerald-100 hover:bg-emerald-200 border-slate-900 font-bold'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-slate-900 shrink-0" />
              <span>Portal Guru</span>
            </button>
          </nav>

          {/* Action Right - Desktop Controls (>= lg) */}
          <div className="hidden lg:flex items-center gap-1.5 xl:gap-2 shrink-0">
            {/* Identitas Siswa + Tombol Ganti Nama */}
            {onEditProfile && state?.student?.name && state.student.name !== 'Siswa Mandiri' && (
              <button
                type="button"
                onClick={onEditProfile}
                title={`Ganti nama / kelas (${studentName} • ${studentClass})`}
                className="neo-btn-sm inline-flex items-center gap-1.5 px-2.5 py-1.5 bg-sky-100 hover:bg-sky-200 rounded-full text-xs font-extrabold text-slate-900 cursor-pointer max-w-[115px] xl:max-w-[150px] whitespace-nowrap shrink-0"
              >
                <User className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                <span className="truncate">{studentName}</span>
                <Pencil className="w-3 h-3 text-slate-700 shrink-0" />
              </button>
            )}

            {/* Poin Counter Pill */}
            <div
              title={`Level ${state?.overall?.level || 1}: ${levelName}`}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-yellow-300 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A] rounded-full text-xs font-extrabold text-slate-900 whitespace-nowrap shrink-0"
            >
              <span className="text-xs leading-none">⚡</span>
              <span>{totalPoints} Poin</span>
            </div>

            {/* Narasi Audio Toggle */}
            <button
              onClick={toggleAudio}
              title={audioEnabled ? "Audio Aktif (Klik untuk bisukan)" : "Audio Bisu (Klik untuk aktifkan)"}
              aria-label={audioEnabled ? "Matikan Efek & Narasi Suara" : "Aktifkan Efek & Narasi Suara"}
              className={`neo-btn-sm inline-flex items-center justify-center gap-1.5 px-2.5 py-1.5 rounded-xl text-xs whitespace-nowrap shrink-0 cursor-pointer ${
                audioEnabled
                  ? 'bg-emerald-200 hover:bg-emerald-300 text-slate-900'
                  : 'bg-slate-100 hover:bg-slate-200 text-slate-600'
              }`}
            >
              {audioEnabled ? (
                <>
                  <Volume2 className="w-4 h-4 text-slate-900 shrink-0" />
                  <span className="hidden xl:inline">Audio</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-4 h-4 text-slate-600 shrink-0" />
                  <span className="hidden xl:inline">Bisu</span>
                </>
              )}
            </button>

            {/* Reset Button (Small) */}
            <button
              onClick={handleReset}
              title="Ulangi progress dari awal"
              aria-label="Ulangi progress dari awal"
              className="neo-btn-sm p-2 bg-rose-100 hover:bg-rose-200 text-rose-800 rounded-xl shrink-0 cursor-pointer"
            >
              <RotateCcw className="w-4 h-4" />
            </button>
          </div>

          {/* Action Right - Mobile & Tablet (< lg) */}
          <div className="flex items-center gap-2 lg:hidden shrink-0">
            {/* Poin Counter Compact */}
            <div 
              onClick={() => handleNav('achievement')}
              className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-yellow-300 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A] rounded-full text-xs font-extrabold text-slate-900 cursor-pointer whitespace-nowrap active:translate-x-[1px] active:translate-y-[1px] active:shadow-none transition-all"
              title="Lihat Capaian Poin"
            >
              <span className="text-xs leading-none">⚡</span>
              <span>{totalPoints}</span>
            </div>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl border-2 border-slate-900 bg-white hover:bg-yellow-200 text-slate-900 shadow-[2px_2px_0px_0px_#0F172A] transition-colors focus:outline-none cursor-pointer"
              aria-label={isMobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-5 h-5 text-slate-900" />
              ) : (
                <Menu className="w-5 h-5 text-slate-900" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE / TABLET HAMBURGER MENU DRAWER & BACKDROP (PORTAL KE BODY)         */}
      {/* ========================================================================= */}
      {isMobileMenuOpen && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 top-16 z-[999] lg:hidden flex flex-col pointer-events-auto">
          {/* Backdrop Flat (Tanpa Blur) */}
          <div 
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 top-16 bg-slate-900/60 transition-opacity"
            aria-hidden="true"
          />

          {/* Menu Drawer Content */}
          <div className="relative z-10 bg-white border-b-[3px] border-slate-900 shadow-[0_6px_0_0_#0F172A] max-h-[calc(100dvh-4rem)] overflow-y-auto px-4 py-5 space-y-4 animate-in slide-in-from-top-2 duration-200">
            
            {/* 1. Student Identity & Gamification Card */}
            <div className="p-3.5 rounded-2xl bg-sky-100 border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0F172A] flex items-center justify-between gap-2">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-primary-600 border-2 border-slate-900 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="font-heading font-extrabold text-slate-900 text-sm leading-tight truncate">
                    {studentName}
                  </div>
                  <div className="text-xs text-slate-700 font-semibold truncate">
                    Kelas {studentClass} • SMA Negeri 2 Makassar
                  </div>
                  {onEditProfile &&
                    state?.student?.name &&
                    state.student.name.trim().length >= 2 &&
                    state.student.name !== 'Siswa Mandiri' && (
                    <button
                      type="button"
                      onClick={() => {
                        setIsMobileMenuOpen(false);
                        onEditProfile();
                      }}
                      className="mt-1 inline-flex items-center gap-1 text-[11px] font-extrabold text-primary-700 hover:underline cursor-pointer"
                    >
                      <Pencil className="w-3 h-3" />
                      <span>Ganti Nama / Kelas</span>
                    </button>
                  )}
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-yellow-300 border border-slate-900 text-slate-900 font-extrabold text-[11px]">
                  <span>⚡</span>
                  <span>{totalPoints} Poin</span>
                </div>
                <div className="text-[10px] text-slate-800 font-bold mt-0.5">
                  {levelName}
                </div>
              </div>
            </div>

            {/* 2. Main Navigation Links */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 px-2 pb-1">
                Navigasi Modul
              </div>

              {/* Beranda */}
              <button
                onClick={() => handleNav('home')}
                className={`w-full p-3 rounded-xl border-2 flex items-center justify-between transition-colors text-left font-bold text-sm cursor-pointer ${
                  currentView === 'home'
                    ? 'bg-yellow-300 text-slate-900 border-slate-900 shadow-[3px_3px_0px_0px_#0F172A]'
                    : 'text-slate-800 hover:bg-slate-100 border-slate-900/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg border-2 border-slate-900 flex items-center justify-center ${
                    currentView === 'home' ? 'bg-white text-slate-900' : 'bg-slate-100 text-slate-800'
                  }`}>
                    <Home className="w-4 h-4" />
                  </div>
                  <div>
                    <div>Beranda Utama</div>
                    <div className="text-[11px] font-medium text-slate-700">Ringkasan modul & progres</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-900" />
              </button>

              {/* Materi & Kuis Container with Sub-Units */}
              <div className="rounded-xl border-2 border-slate-900 bg-surface-page p-2 space-y-1.5 shadow-[3px_3px_0px_0px_#0F172A]">
                <button
                  onClick={() => handleNav('unit', 1)}
                  className="w-full p-2 rounded-lg flex items-center justify-between text-left font-bold text-sm text-slate-900 hover:bg-white transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-primary-600 border-2 border-slate-900 text-white flex items-center justify-center">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-heading font-extrabold text-slate-900">Materi & Kuis Interaktif</div>
                      <div className="text-[11px] font-medium text-slate-600">Pilih salah satu unit di bawah:</div>
                    </div>
                  </div>
                </button>

                {/* Sub-Unit Quick Jump Pills */}
                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  <button
                    onClick={() => handleNav('unit', 1)}
                    className="neo-btn-sm p-2 rounded-lg bg-sky-200 hover:bg-sky-300 text-left cursor-pointer"
                  >
                    <div className="text-[10px] font-extrabold text-slate-900">UNIT 1</div>
                    <div className="text-[11px] font-bold text-slate-900 leading-tight truncate">Von Neumann</div>
                  </button>
                  <button
                    onClick={() => handleNav('unit', 2)}
                    className="neo-btn-sm p-2 rounded-lg bg-yellow-300 hover:bg-yellow-200 text-left cursor-pointer"
                  >
                    <div className="text-[10px] font-extrabold text-slate-900">UNIT 2</div>
                    <div className="text-[11px] font-bold text-slate-900 leading-tight truncate">Alur IPO</div>
                  </button>
                  <button
                    onClick={() => handleNav('unit', 3)}
                    className="neo-btn-sm p-2 rounded-lg bg-emerald-300 hover:bg-emerald-200 text-left cursor-pointer"
                  >
                    <div className="text-[10px] font-extrabold text-slate-900">UNIT 3</div>
                    <div className="text-[11px] font-bold text-slate-900 leading-tight truncate">Siklus FDE</div>
                  </button>
                </div>
              </div>

              {/* Capaian Belajar */}
              <button
                onClick={() => handleNav('achievement')}
                className={`w-full p-3 rounded-xl border-2 flex items-center justify-between transition-colors text-left font-bold text-sm cursor-pointer ${
                  currentView === 'achievement'
                    ? 'bg-yellow-300 text-slate-900 border-slate-900 shadow-[3px_3px_0px_0px_#0F172A]'
                    : 'text-slate-800 hover:bg-slate-100 border-slate-900/20'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg border-2 border-slate-900 flex items-center justify-center ${
                    currentView === 'achievement' ? 'bg-white text-slate-900' : 'bg-slate-100 text-slate-800'
                  }`}>
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <div>Capaian Belajar & Lencana</div>
                    <div className="text-[11px] font-medium text-slate-700">{completedUnits} dari 3 unit tuntas</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 text-[10px] font-extrabold rounded-full bg-white border border-slate-900 text-slate-900">
                    {completedUnits}/3
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-900" />
                </div>
              </button>

              {/* Portal Guru */}
              <button
                onClick={() => handleNav('verification')}
                className={`w-full p-3 rounded-xl border-2 border-slate-900 flex items-center justify-between transition-colors text-left font-bold text-sm cursor-pointer ${
                  currentView === 'verification'
                    ? 'bg-emerald-300 text-slate-900 shadow-[3px_3px_0px_0px_#0F172A]'
                    : 'text-slate-900 bg-emerald-200 hover:bg-emerald-300 shadow-[2px_2px_0px_0px_#0F172A]'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-white border-2 border-slate-900 text-slate-900 flex items-center justify-center">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span>Portal Guru</span>
                      <span className="px-1.5 py-0.5 text-[9px] font-extrabold uppercase tracking-wide bg-yellow-300 border border-slate-900 text-slate-900 rounded-md">
                        Cloud 24 Jam
                      </span>
                    </div>
                    <div className="text-[11px] font-medium text-slate-800">Rekap nilai kelas (Khusus Guru)</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-900" />
              </button>
            </div>

            {/* 3. Panduan & Informasi Pembelajaran */}
            <div className="pt-2 border-t-2 border-slate-900/15 space-y-1.5">
              <div className="text-[11px] font-extrabold uppercase tracking-wider text-slate-600 px-2 pb-1">
                Informasi & Panduan
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleOpenTPModal}
                  className="neo-btn-sm p-2.5 rounded-xl bg-white hover:bg-emerald-100 text-left flex items-center gap-2 cursor-pointer"
                >
                  <Compass className="w-4 h-4 text-primary-600 flex-shrink-0" />
                  <span className="text-xs font-extrabold text-slate-900">Tujuan Belajar</span>
                </button>

                <button
                  onClick={handleOpenGuideModal}
                  className="neo-btn-sm p-2.5 rounded-xl bg-white hover:bg-sky-100 text-left flex items-center gap-2 cursor-pointer"
                >
                  <HelpCircle className="w-4 h-4 text-primary-600 flex-shrink-0" />
                  <span className="text-xs font-extrabold text-slate-900">Petunjuk Pakai</span>
                </button>
              </div>
            </div>

            {/* 4. Action & Kontrol Khusus */}
            <div className="pt-2 border-t-2 border-slate-900/15 space-y-2.5">
              {/* Baris Kontrol: Audio & Reset */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                {/* Audio Narasi Toggle */}
                <button
                  onClick={toggleAudio}
                  className={`neo-btn-sm p-2.5 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer ${
                    audioEnabled
                      ? 'bg-emerald-200 text-slate-900'
                      : 'bg-slate-100 text-slate-600'
                  }`}
                >
                  {audioEnabled ? (
                    <>
                      <Volume2 className="w-4 h-4 text-slate-900" />
                      <span>Audio Aktif</span>
                    </>
                  ) : (
                    <>
                      <VolumeX className="w-4 h-4 text-slate-600" />
                      <span>Audio Bisu</span>
                    </>
                  )}
                </button>

                {/* Reset Progress */}
                <button
                  onClick={handleReset}
                  className="neo-btn-sm p-2.5 rounded-xl bg-rose-200 hover:bg-rose-300 text-slate-900 text-xs flex items-center justify-center gap-2 cursor-pointer"
                >
                  <RotateCcw className="w-4 h-4 text-slate-900" />
                  <span>Mulai Ulang</span>
                </button>
              </div>
            </div>

          </div>
        </div>,
        document.body
      )}
    </header>
  );
}
