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
    <header className="sticky top-0 z-50 bg-white border-b border-slate-200 transition-all shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Brand Left */}
          <div 
            onClick={() => handleNav('home')} 
            className="flex items-center gap-2.5 sm:gap-3 cursor-pointer group select-none"
          >
            <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-primary-700 flex items-center justify-center text-white shadow-md shadow-primary-700/20 group-hover:scale-105 transition-transform flex-shrink-0">
              <Cpu className="w-5 h-5" />
            </div>
            <div>
              <div className="font-heading font-extrabold text-slate-900 text-sm sm:text-base leading-tight flex items-center gap-1.5">
                Studio Informatika
                <span className="px-1.5 py-0.5 text-[10px] sm:text-[11px] font-bold bg-primary-100 text-primary-800 rounded-full">
                  Kelas X
                </span>
              </div>
              <div className="text-[11px] text-slate-500 font-medium truncate max-w-[170px] sm:max-w-none">
                SMAN 2 Makassar • Fase E
              </div>
            </div>
          </div>

          {/* Navigation Links - Desktop Only */}
          <nav className="hidden md:flex items-center gap-1 text-sm font-medium">
            <button
              onClick={() => handleNav('home')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                currentView === 'home'
                  ? 'bg-primary-50 text-primary-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Home className="w-4 h-4" />
              <span>Beranda</span>
            </button>
            <button
              onClick={() => handleNav('unit', 1)}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                currentView === 'unit'
                  ? 'bg-primary-50 text-primary-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Materi & Kuis</span>
            </button>
            <button
              onClick={() => handleNav('achievement')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                currentView === 'achievement'
                  ? 'bg-primary-50 text-primary-700 font-semibold'
                  : 'text-slate-600 hover:text-slate-900 hover:bg-slate-100'
              }`}
            >
              <Award className="w-4 h-4" />
              <span>Capaian Belajar</span>
            </button>
            <button
              onClick={() => handleNav('verification')}
              className={`px-3 py-1.5 rounded-lg transition-colors flex items-center gap-1.5 ${
                currentView === 'verification'
                  ? 'bg-teal-50 text-teal-800 font-semibold border border-teal-200'
                  : 'text-teal-700 hover:bg-teal-50'
              }`}
            >
              <GraduationCap className="w-4 h-4 text-teal-600" />
              <span>Portal Guru</span>
            </button>
          </nav>

          {/* Action Right - Desktop Controls */}
          <div className="hidden md:flex items-center gap-2 sm:gap-2.5">
            {/* Identitas Siswa + Tombol Ganti Nama */}
            {onEditProfile && state?.student?.name && state.student.name !== 'Siswa Mandiri' && (
              <button
                type="button"
                onClick={onEditProfile}
                title={`Ganti nama / kelas (${studentName} • ${studentClass})`}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-slate-100 hover:bg-primary-50 border border-slate-200 hover:border-primary-300 rounded-full text-xs font-semibold text-slate-700 hover:text-primary-800 transition-colors cursor-pointer max-w-[155px]"
              >
                <User className="w-3.5 h-3.5 text-primary-700 shrink-0" />
                <span className="truncate">{studentName}</span>
                <Pencil className="w-3 h-3 text-slate-400 shrink-0" />
              </button>
            )}

            {/* Poin Counter Pill */}
            <div className="flex items-center gap-1.5 px-3 py-1 bg-amber-50 border border-amber-200/80 rounded-full text-xs font-semibold text-amber-900 shadow-sm">
              <span className="text-sm">⚡</span>
              <span>{totalPoints} Poin</span>
              <span className="hidden lg:inline text-amber-700 font-normal">
                • {levelName}
              </span>
            </div>

            {/* Narasi Audio Toggle */}
            <button
              onClick={toggleAudio}
              title={audioEnabled ? "Matikan Efek & Narasi Suara" : "Aktifkan Efek & Narasi Suara"}
              className={`px-2.5 py-1.5 rounded-lg border text-xs font-medium flex items-center gap-1.5 transition-all ${
                audioEnabled
                  ? 'bg-teal-50 border-teal-200 text-teal-800 hover:bg-teal-100'
                  : 'bg-slate-50 border-slate-200 text-slate-500 hover:bg-slate-100'
              }`}
            >
              {audioEnabled ? (
                <>
                  <Volume2 className="w-3.5 h-3.5 text-teal-600" />
                  <span>Audio Aktif</span>
                </>
              ) : (
                <>
                  <VolumeX className="w-3.5 h-3.5 text-slate-400" />
                  <span>Audio Bisu</span>
                </>
              )}
            </button>

            {/* Reset Button (Small) */}
            <button
              onClick={handleReset}
              title="Ulangi progress dari awal"
              className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition-colors"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Action Right - Mobile Only (Poin Pill + Hamburger Button) */}
          <div className="flex items-center gap-2 md:hidden">
            {/* Poin Counter Compact */}
            <div 
              onClick={() => handleNav('achievement')}
              className="flex items-center gap-1 px-2.5 py-1 bg-amber-50 border border-amber-200 rounded-full text-[11px] font-bold text-amber-900 cursor-pointer active:scale-95 transition-transform"
              title="Lihat Capaian Poin"
            >
              <span className="text-xs">⚡</span>
              <span>{totalPoints}</span>
            </div>

            {/* Hamburger Button */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 rounded-xl text-slate-700 hover:bg-slate-100 active:bg-slate-200 transition-colors focus:outline-none focus:ring-2 focus:ring-primary-500"
              aria-label={isMobileMenuOpen ? "Tutup menu navigasi" : "Buka menu navigasi"}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <X className="w-6 h-6 text-slate-800" />
              ) : (
                <Menu className="w-6 h-6 text-slate-800" />
              )}
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* MOBILE HAMBURGER MENU DRAWER & BACKDROP (PORTAL KE BODY AGAR SELALU DI DEPAN) */}
      {/* ========================================================================= */}
      {isMobileMenuOpen && typeof document !== 'undefined' && createPortal(
        <div className="fixed inset-0 top-16 z-[999] md:hidden flex flex-col pointer-events-auto">
          {/* Backdrop Blur */}
          <div 
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 top-16 bg-slate-950/60 backdrop-blur-sm transition-opacity"
            aria-hidden="true"
          />

          {/* Menu Drawer Content */}
          <div className="relative z-10 bg-white border-b border-slate-200 shadow-2xl max-h-[calc(100dvh-4rem)] overflow-y-auto px-4 py-5 space-y-4 animate-in slide-in-from-top-2 duration-200">
            
            {/* 1. Student Identity & Gamification Card */}
            <div className="p-3.5 rounded-2xl bg-gradient-to-br from-primary-50 via-white to-primary-50/40 border border-primary-200/80 shadow-sm flex items-center justify-between gap-2">
              <div className="flex items-center gap-3 min-w-0">
                <div className="w-10 h-10 rounded-xl bg-primary-700 text-white flex items-center justify-center font-bold text-sm shadow-sm flex-shrink-0">
                  <User className="w-5 h-5" />
                </div>
                <div className="min-w-0">
                  <div className="font-heading font-extrabold text-slate-900 text-sm leading-tight truncate">
                    {studentName}
                  </div>
                  <div className="text-xs text-slate-500 font-medium truncate">
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
                      className="mt-1 inline-flex items-center gap-1 text-[11px] font-bold text-primary-700 hover:text-primary-900 hover:underline cursor-pointer"
                    >
                      <Pencil className="w-3 h-3" />
                      <span>Ganti Nama / Kelas</span>
                    </button>
                  )}
                </div>
              </div>
              <div className="text-right shrink-0">
                <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-amber-100 text-amber-900 font-bold text-[11px]">
                  <span>⚡</span>
                  <span>{totalPoints} Poin</span>
                </div>
                <div className="text-[10px] text-amber-700 font-semibold mt-0.5">
                  {levelName}
                </div>
              </div>
            </div>

            {/* 2. Main Navigation Links */}
            <div className="space-y-1.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 pb-1">
                Navigasi Modul
              </div>

              {/* Beranda */}
              <button
                onClick={() => handleNav('home')}
                className={`w-full p-3 rounded-xl flex items-center justify-between transition-colors text-left font-semibold text-sm ${
                  currentView === 'home'
                    ? 'bg-primary-50 text-primary-800 border border-primary-200'
                    : 'text-slate-700 hover:bg-slate-50 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    currentView === 'home' ? 'bg-primary-700 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <Home className="w-4 h-4" />
                  </div>
                  <div>
                    <div>Beranda Utama</div>
                    <div className="text-[11px] font-normal text-slate-500">Ringkasan modul & progres</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-slate-400" />
              </button>

              {/* Materi & Kuis Container with Sub-Units */}
              <div className="rounded-xl border border-slate-200/80 bg-slate-50/60 p-2 space-y-1.5">
                <button
                  onClick={() => handleNav('unit', 1)}
                  className="w-full p-2 rounded-lg flex items-center justify-between text-left font-semibold text-sm text-slate-800 hover:bg-white transition-colors"
                >
                  <div className="flex items-center gap-2.5">
                    <div className="w-8 h-8 rounded-lg bg-primary-100 text-primary-700 flex items-center justify-center">
                      <BookOpen className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="font-heading font-bold text-slate-900">Materi & Kuis Interaktif</div>
                      <div className="text-[11px] font-normal text-slate-500">Pilih salah satu unit di bawah:</div>
                    </div>
                  </div>
                </button>

                {/* Sub-Unit Quick Jump Pills */}
                <div className="grid grid-cols-3 gap-1.5 pt-1">
                  <button
                    onClick={() => handleNav('unit', 1)}
                    className="p-2 rounded-lg bg-white border border-slate-200 hover:border-primary-400 hover:bg-primary-50/50 text-left transition-all active:scale-95"
                  >
                    <div className="text-[10px] font-bold text-primary-700">UNIT 1</div>
                    <div className="text-[11px] font-semibold text-slate-800 leading-tight truncate">Von Neumann</div>
                  </button>
                  <button
                    onClick={() => handleNav('unit', 2)}
                    className="p-2 rounded-lg bg-white border border-slate-200 hover:border-primary-400 hover:bg-primary-50/50 text-left transition-all active:scale-95"
                  >
                    <div className="text-[10px] font-bold text-primary-700">UNIT 2</div>
                    <div className="text-[11px] font-semibold text-slate-800 leading-tight truncate">Alur IPO</div>
                  </button>
                  <button
                    onClick={() => handleNav('unit', 3)}
                    className="p-2 rounded-lg bg-white border border-slate-200 hover:border-primary-400 hover:bg-primary-50/50 text-left transition-all active:scale-95"
                  >
                    <div className="text-[10px] font-bold text-primary-700">UNIT 3</div>
                    <div className="text-[11px] font-semibold text-slate-800 leading-tight truncate">Siklus FDE</div>
                  </button>
                </div>
              </div>

              {/* Capaian Belajar */}
              <button
                onClick={() => handleNav('achievement')}
                className={`w-full p-3 rounded-xl flex items-center justify-between transition-colors text-left font-semibold text-sm ${
                  currentView === 'achievement'
                    ? 'bg-primary-50 text-primary-800 border border-primary-200'
                    : 'text-slate-700 hover:bg-slate-50 border border-transparent'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className={`w-8 h-8 rounded-lg flex items-center justify-center ${
                    currentView === 'achievement' ? 'bg-primary-700 text-white' : 'bg-slate-100 text-slate-600'
                  }`}>
                    <Award className="w-4 h-4" />
                  </div>
                  <div>
                    <div>Capaian Belajar & Lencana</div>
                    <div className="text-[11px] font-normal text-slate-500">{completedUnits} dari 3 unit tuntas</div>
                  </div>
                </div>
                <div className="flex items-center gap-1.5">
                  <span className="px-2 py-0.5 text-[10px] font-bold rounded-full bg-slate-100 text-slate-600">
                    {completedUnits}/3
                  </span>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </div>
              </button>

              {/* Portal Guru */}
              <button
                onClick={() => handleNav('verification')}
                className={`w-full p-3 rounded-xl flex items-center justify-between transition-colors text-left font-semibold text-sm ${
                  currentView === 'verification'
                    ? 'bg-teal-50 text-teal-900 border border-teal-300'
                    : 'text-teal-800 bg-teal-50/60 hover:bg-teal-100/60 border border-teal-200/60'
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 rounded-lg bg-teal-600 text-white flex items-center justify-center">
                    <GraduationCap className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span>Portal Guru</span>
                      <span className="px-1.5 py-0.2 text-[9px] font-extrabold uppercase tracking-wide bg-teal-200 text-teal-900 rounded-full">
                        Cloud 24 Jam
                      </span>
                    </div>
                    <div className="text-[11px] font-normal text-teal-700">Rekap nilai kelas (Khusus Guru)</div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-teal-600" />
              </button>
            </div>

            {/* 3. Panduan & Informasi Pembelajaran */}
            <div className="pt-2 border-t border-slate-100 space-y-1.5">
              <div className="text-[11px] font-bold uppercase tracking-wider text-slate-400 px-2 pb-1">
                Informasi & Panduan
              </div>

              <div className="grid grid-cols-2 gap-2">
                <button
                  onClick={handleOpenTPModal}
                  className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-left flex items-center gap-2 transition-colors"
                >
                  <Compass className="w-4 h-4 text-primary-600 flex-shrink-0" />
                  <span className="text-xs font-semibold text-slate-700">Tujuan Belajar</span>
                </button>

                <button
                  onClick={handleOpenGuideModal}
                  className="p-2.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-left flex items-center gap-2 transition-colors"
                >
                  <HelpCircle className="w-4 h-4 text-primary-600 flex-shrink-0" />
                  <span className="text-xs font-semibold text-slate-700">Petunjuk Pakai</span>
                </button>
              </div>
            </div>

            {/* 4. Action & Kontrol Khusus */}
            <div className="pt-2 border-t border-slate-100 space-y-2.5">
              {/* Baris Kontrol: Audio & Reset */}
              <div className="grid grid-cols-2 gap-2 pt-1">
                {/* Audio Narasi Toggle */}
                <button
                  onClick={toggleAudio}
                  className={`p-2.5 rounded-xl border text-xs font-semibold flex items-center justify-center gap-2 transition-colors ${
                    audioEnabled
                      ? 'bg-teal-50 border-teal-200 text-teal-800'
                      : 'bg-slate-50 border-slate-200 text-slate-500'
                  }`}
                >
                  {audioEnabled ? (
                    <>
                      <Volume2 className="w-4 h-4 text-teal-600" />
                      <span>Audio Aktif</span>
                    </>
                  ) : (
                    <>
                      <VolumeX className="w-4 h-4 text-slate-400" />
                      <span>Audio Bisu</span>
                    </>
                  )}
                </button>

                {/* Reset Progress */}
                <button
                  onClick={handleReset}
                  className="p-2.5 rounded-xl border border-rose-200 bg-rose-50/60 hover:bg-rose-100 text-rose-700 text-xs font-semibold flex items-center justify-center gap-2 transition-colors"
                >
                  <RotateCcw className="w-4 h-4 text-rose-600" />
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
