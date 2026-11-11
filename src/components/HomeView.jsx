import React from 'react';
import { 
  BarChart3, 
  Sparkles, 
  Flame, 
  Award, 
  CheckCircle2, 
  BookOpen, 
  HelpCircle, 
  User, 
  ArrowRight,
  TrendingUp,
  BrainCircuit,
  Compass,
  Pencil,
  GraduationCap
} from 'lucide-react';
import HeroHeader from './HeroHeader';
import UnitCard from './UnitCard';
import { unitsData } from '../data/contentData';
import { storage } from '../utils/storage';

export default function HomeView({ 
  state, 
  userRole,
  onOpenUnit, 
  onOpenTP, 
  onOpenGuide, 
  onOpenAchievement,
  onEditProfile
}) {
  const isTeacherRole = (userRole ?? storage.getUserRole(state)) === 'teacher';
  const overall = state.overall;
  const completedCount = overall.completedUnits;
  const averageScore = overall.averageQuizScore;

  // Hitung total latihan/kuis/tantangan yang sudah disentuh
  let totalActivitiesCompleted = 0;
  Object.keys(state.units).forEach((uKey) => {
    const u = state.units[uKey];
    if (u.challenge?.completed) totalActivitiesCompleted++;
    if (u.exploration?.completed) totalActivitiesCompleted++;
    if (u.quiz?.completed) totalActivitiesCompleted++;
    if (u.practice?.answers) {
      totalActivitiesCompleted += Object.keys(u.practice.answers).length;
    }
  });

  // Kata-kata penyemangat dinamis berdasarkan progres belajar
  let motivationTitle = "Mulai Langkah Pertamamu!";
  let motivationBadge = "Petualangan Baru";
  let motivationMessage = "Setiap ilmuwan komputer dan inovator teknologi hebat selalu memulai dari pemahaman alur data paling mendasar. Luangkan 15 menit untuk menaklukkan Unit 1 hari ini!";
  
  if (completedCount === 3) {
    motivationTitle = "Luar Biasa, Kamu Juara!";
    motivationBadge = "Pencapaian Sempurna";
    motivationMessage = "Seluruh unit sistem komputer telah kamu tuntaskan dengan mandiri! Pengetahuan arsitektur Von Neumann dan siklus FDE ini akan menjadi senjata andalanmu saat diskusi di kelas.";
  } else if (completedCount > 0 || overall.totalPoints > 50) {
    motivationTitle = "Kerja Kerasmu Membuahkan Hasil!";
    motivationBadge = "Tetap Semangat & Fokus";
    motivationMessage = "Progres belajarmu berjalan sangat baik. Jangan ragu mengulang kuis atau mencoba latihan bonus untuk mempertajam pemahamanmu sebelum sesi tatap muka bersama guru!";
  }

  // Target poin untuk level berikutnya
  let nextLevelGoal = 100;
  if (overall.totalPoints >= 260) {
    nextLevelGoal = 330;
  } else if (overall.totalPoints >= 200) {
    nextLevelGoal = 260;
  } else if (overall.totalPoints >= 100) {
    nextLevelGoal = 200;
  }
  const levelProgressPercent = Math.min(100, Math.round((overall.totalPoints / nextLevelGoal) * 100));

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8 animate-in fade-in duration-200">
      {/* Hero Header dengan Pop-up Trigger untuk TP dan Petunjuk */}
      <HeroHeader
        onStartLearning={() => onOpenUnit(1)}
        onOpenTP={onOpenTP}
        onOpenGuide={onOpenGuide}
      />

      {/* Grid 2 Kolom: Kiri Statistik Belajar Siswa, Kanan Kata Penyemangat & Inspirasi */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
        {/* Kolom Kiri: Dashboard Statistik Penggunaan & Skor Siswa (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-3xl border-[2.5px] border-slate-900 p-6 sm:p-7 shadow-[6px_6px_0px_0px_#0F172A] flex flex-col justify-between">
          <div>
            {/* Header Statistik + Profil Siswa */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b-2 border-slate-900/15">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-sky-200 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A] text-slate-900 flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-slate-900" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-slate-900 text-lg">
                    Statistik & Progres Belajar
                  </h3>
                  <p className="text-xs text-slate-600 font-semibold">
                    Aktivitas Latihan, Poin Gamifikasi, & Skor Kuis Formatif
                  </p>
                </div>
              </div>

              {/* Profil & Tombol Ganti Nama Pelajar / Indikator Mode Guru */}
              <div>
                {isTeacherRole ? (
                  <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-extrabold bg-emerald-200 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A] text-slate-900">
                    <GraduationCap className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                    <span>Mode Pratinjau Guru</span>
                  </span>
                ) : (
                  <button
                    type="button"
                    onClick={onEditProfile}
                    title="Klik untuk mengganti nama atau kelas siswa"
                    className="neo-btn-sm inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs bg-yellow-200 hover:bg-yellow-300 text-slate-900 cursor-pointer"
                  >
                    <User className="w-3.5 h-3.5 text-slate-900 shrink-0" />
                    <span>{state.student?.name ? `${state.student.name} (${state.student.class})` : '+ Atur Nama Siswa'}</span>
                    <Pencil className="w-3 h-3 text-slate-700 shrink-0" />
                  </button>
                )}
              </div>
            </div>

            {/* 4 Kotak Metrik Statistik */}
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              {/* Metrik 1: Total Poin */}
              <div className="p-4 rounded-2xl bg-yellow-200 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0F172A]">
                <span className="text-[10px] font-extrabold text-slate-900 uppercase tracking-wider block">
                  TOTAL POIN
                </span>
                <div className="text-2xl font-heading font-extrabold text-slate-900 mt-1">
                  ⚡ {overall.totalPoints}
                </div>
                <span className="text-[10px] font-bold text-slate-800">
                  Target: {nextLevelGoal} Pts
                </span>
              </div>

              {/* Metrik 2: Rata-Rata Skor Kuis */}
              <div className="p-4 rounded-2xl bg-sky-200 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0F172A]">
                <span className="text-[10px] font-extrabold text-slate-900 uppercase tracking-wider block">
                  RATA-RATA SKOR
                </span>
                <div className="text-2xl font-heading font-extrabold text-slate-900 mt-1">
                  {averageScore}
                  <span className="text-xs font-bold text-slate-700">/100</span>
                </div>
                <span className="text-[10px] font-extrabold text-slate-900">
                  {averageScore >= 75 ? '✓ Tercapai (≥75)' : 'Target TP: ≥75'}
                </span>
              </div>

              {/* Metrik 3: Aktivitas Selesai */}
              <div className="p-4 rounded-2xl bg-emerald-200 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0F172A]">
                <span className="text-[10px] font-extrabold text-slate-900 uppercase tracking-wider block">
                  AKTIVITAS
                </span>
                <div className="text-2xl font-heading font-extrabold text-slate-900 mt-1">
                  {totalActivitiesCompleted}
                </div>
                <span className="text-[10px] font-bold text-slate-800">
                  Latihan & Eksplorasi
                </span>
              </div>

              {/* Metrik 4: Unit Tuntas */}
              <div className="p-4 rounded-2xl bg-rose-200 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0F172A]">
                <span className="text-[10px] font-extrabold text-slate-900 uppercase tracking-wider block">
                  UNIT TUNTAS
                </span>
                <div className="text-2xl font-heading font-extrabold text-slate-900 mt-1">
                  {completedCount} <span className="text-xs font-bold text-slate-700">/ 3</span>
                </div>
                <span className="text-[10px] font-bold text-slate-900">
                  {completedCount === 3 ? '🎉 Selesai Semua' : 'Sedang Berjalan'}
                </span>
              </div>
            </div>

            {/* Level Bar Progress */}
            <div className="mt-5 p-4 rounded-2xl bg-surface-muted border-2 border-slate-900">
              <div className="flex items-center justify-between text-xs mb-2">
                <span className="font-extrabold text-slate-900 flex items-center gap-1.5">
                  <span>🏅 Level {overall.level}:</span>
                  <span className="text-primary-700">{overall.levelName}</span>
                </span>
                <span className="text-slate-700 font-bold">{overall.totalPoints} / {nextLevelGoal} Poin</span>
              </div>
              <div className="w-full bg-white h-3.5 rounded-full border-2 border-slate-900 overflow-hidden">
                <div
                  className={`bg-primary-600 h-full transition-all duration-500 ${levelProgressPercent > 0 && levelProgressPercent < 100 ? 'border-r-2 border-slate-900' : ''}`}
                  style={{ width: `${levelProgressPercent}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Status Penyimpanan Progres */}
          <div className="mt-5 pt-4 border-t-2 border-slate-900/15 flex items-center justify-between gap-3">
            <span className="text-xs font-semibold text-slate-700 flex items-center gap-1.5">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 border border-slate-900 inline-block"></span>
              Data tersimpan aman &amp; tersinkronisasi otomatis ke sistem guru.
            </span>
          </div>
        </div>

        {/* Kolom Kanan: Kata-Kata Penyemangat & Inspirasi Belajar (5 cols) */}
        <div className="lg:col-span-5 bg-yellow-300 text-slate-900 rounded-3xl p-6 sm:p-7 border-[2.5px] border-slate-900 shadow-[6px_6px_0px_0px_#0F172A] flex flex-col justify-between relative overflow-hidden">
          <div className="relative z-10">
            {/* Header Penyemangat */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-9 h-9 rounded-xl bg-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A] flex items-center justify-center text-rose-500">
                  <Flame className="w-5 h-5 fill-current" />
                </div>
                <span className="text-xs font-extrabold uppercase tracking-wider text-slate-900">
                  Energi Belajar Hari Ini
                </span>
              </div>

              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-extrabold bg-emerald-300 text-slate-900 border-2 border-slate-900">
                {motivationBadge}
              </span>
            </div>

            {/* Judul & Pesan Penyemangat */}
            <h4 className="text-xl font-heading font-extrabold text-slate-900 leading-snug">
              {motivationTitle}
            </h4>
            <p className="mt-3 text-xs sm:text-sm text-slate-800 leading-relaxed font-semibold">
              {motivationMessage}
            </p>

            {/* Kutipan Inspiratif Tokoh Komputer */}
            <div className="mt-5 p-4 rounded-2xl bg-white border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0F172A]">
              <div className="text-[11px] font-extrabold text-primary-700 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Kutipan Inspirasi Komputasi</span>
              </div>
              <p className="text-xs text-slate-800 italic font-medium leading-relaxed">
                "Komputer itu seperti sepeda untuk pikiran kita—alat luar biasa yang memperkuat potensi akal manusia berlipat ganda."
              </p>
              <div className="text-[11px] font-extrabold text-slate-900 mt-1.5 text-right">
                — Steve Jobs
              </div>
            </div>
          </div>

          {/* Quick Shortcuts to Modals */}
          <div className="relative z-10 mt-6 pt-4 border-t-2 border-slate-900/20 flex items-center justify-between text-xs">
            <span className="text-slate-900 text-[11px] font-bold">Ingin baca panduan lengkap?</span>
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenTP}
                className="px-2.5 py-1 rounded-lg bg-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A] hover:bg-emerald-200 text-slate-900 font-extrabold transition-colors cursor-pointer"
              >
                Tujuan TP
              </button>
              <button
                onClick={onOpenGuide}
                className="px-2.5 py-1 rounded-lg bg-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A] hover:bg-sky-200 text-slate-900 font-extrabold transition-colors cursor-pointer"
              >
                Petunjuk
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* 3 Unit Belajar Cards */}
      <div className="pt-2">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-5">
          <div>
            <h3 className="font-heading font-extrabold text-slate-900 text-xl sm:text-2xl">
              Unit Pembelajaran Interaktif
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 font-semibold">
              Selesaikan ketiga unit secara bertahap untuk membuka Ringkasan Capaian Akhir.
            </p>
          </div>

          {state.overall.completedUnits > 0 && (
            <button
              onClick={onOpenAchievement}
              className="neo-btn px-4 py-2 bg-yellow-300 hover:bg-yellow-200 text-slate-900 font-extrabold text-xs rounded-xl flex items-center gap-1.5 self-start sm:self-center cursor-pointer"
            >
              <Award className="w-4 h-4" />
              <span>Lihat Capaian ({state.overall.completedUnits}/3 Selesai)</span>
            </button>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {unitsData.map((unit) => (
            <UnitCard
              key={unit.id}
              unit={unit}
              unitState={state.units[unit.unitCode]}
              onOpenUnit={onOpenUnit}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
