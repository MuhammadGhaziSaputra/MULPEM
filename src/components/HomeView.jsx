import React, { useState } from 'react';
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
  Compass
} from 'lucide-react';
import HeroHeader from './HeroHeader';
import UnitCard from './UnitCard';
import { unitsData } from '../data/contentData';
import { storage } from '../utils/storage';

export default function HomeView({ 
  state, 
  onOpenUnit, 
  onOpenTP, 
  onOpenGuide, 
  onOpenAchievement
}) {
  const [isEditingName, setIsEditingName] = useState(false);
  const [tempName, setTempName] = useState(state.student?.name || '');
  const [tempClass, setTempClass] = useState(state.student?.class || 'X-2');

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

  const handleSaveStudent = () => {
    storage.setStudentProfile(tempName, tempClass);
    setIsEditingName(false);
  };

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
        <div className="lg:col-span-7 bg-white rounded-3xl border border-slate-200/90 p-6 sm:p-7 shadow-sm flex flex-col justify-between">
          <div>
            {/* Header Statistik + Profil Siswa */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
              <div className="flex items-center gap-3">
                <div className="w-11 h-11 rounded-2xl bg-primary-100 text-primary-800 flex items-center justify-center shadow-sm">
                  <TrendingUp className="w-6 h-6 text-primary-700" />
                </div>
                <div>
                  <h3 className="font-heading font-extrabold text-slate-900 text-lg">
                    Statistik & Progres Belajar
                  </h3>
                  <p className="text-xs text-slate-500 font-medium">
                    Aktivitas Latihan, Poin Gamifikasi, & Skor Kuis Formatif
                  </p>
                </div>
              </div>

              {/* Edit Profil Pelajar */}
              <div>
                {!isEditingName ? (
                  <button
                    onClick={() => setIsEditingName(true)}
                    className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-slate-100 text-slate-700 hover:bg-slate-200 transition-colors"
                  >
                    <User className="w-3.5 h-3.5 text-primary-700" />
                    <span>{state.student?.name ? `${state.student.name} (${state.student.class})` : '+ Atur Nama Siswa'}</span>
                  </button>
                ) : (
                  <div className="flex items-center gap-1.5">
                    <input
                      type="text"
                      value={tempName}
                      onChange={(e) => setTempName(e.target.value)}
                      placeholder="Nama"
                      className="px-2 py-1 text-xs border rounded-lg w-28 bg-slate-50"
                    />
                    <input
                      type="text"
                      value={tempClass}
                      onChange={(e) => setTempClass(e.target.value)}
                      placeholder="Kelas"
                      className="px-2 py-1 text-xs border rounded-lg w-16 bg-slate-50"
                    />
                    <button
                      onClick={handleSaveStudent}
                      className="px-2.5 py-1 text-xs bg-primary-700 text-white rounded-lg font-bold"
                    >
                      Simpan
                    </button>
                  </div>
                )}
              </div>
            </div>

            {/* 4 Kotak Metrik Statistik */}
            <div className="mt-5 grid grid-cols-2 sm:grid-cols-4 gap-3.5">
              {/* Metrik 1: Total Poin */}
              <div className="p-4 rounded-2xl bg-amber-50/70 border border-amber-200/80">
                <span className="text-[10px] font-bold text-amber-900 uppercase tracking-wider block">
                  TOTAL POIN
                </span>
                <div className="text-2xl font-heading font-extrabold text-amber-950 mt-1">
                  ⚡ {overall.totalPoints}
                </div>
                <span className="text-[10px] font-semibold text-amber-800">
                  Target: {nextLevelGoal} Pts
                </span>
              </div>

              {/* Metrik 2: Rata-Rata Skor Kuis */}
              <div className="p-4 rounded-2xl bg-primary-50/70 border border-primary-200/80">
                <span className="text-[10px] font-bold text-primary-900 uppercase tracking-wider block">
                  RATA-RATA SKOR
                </span>
                <div className="text-2xl font-heading font-extrabold text-primary-950 mt-1">
                  {averageScore}
                  <span className="text-xs font-normal text-slate-500">/100</span>
                </div>
                <span className={`text-[10px] font-bold ${averageScore >= 75 ? 'text-teal-700' : 'text-slate-600'}`}>
                  {averageScore >= 75 ? '✓ Tercapai (≥75)' : 'Target TP: ≥75'}
                </span>
              </div>

              {/* Metrik 3: Aktivitas Selesai */}
              <div className="p-4 rounded-2xl bg-teal-50/70 border border-teal-200/80">
                <span className="text-[10px] font-bold text-teal-900 uppercase tracking-wider block">
                  AKTIVITAS
                </span>
                <div className="text-2xl font-heading font-extrabold text-teal-950 mt-1">
                  {totalActivitiesCompleted}
                </div>
                <span className="text-[10px] font-semibold text-teal-800">
                  Latihan & Eksplorasi
                </span>
              </div>

              {/* Metrik 4: Unit Tuntas */}
              <div className="p-4 rounded-2xl bg-slate-50 border border-slate-200">
                <span className="text-[10px] font-bold text-slate-600 uppercase tracking-wider block">
                  UNIT TUNTAS
                </span>
                <div className="text-2xl font-heading font-extrabold text-slate-900 mt-1">
                  {completedCount} <span className="text-xs font-normal text-slate-500">/ 3</span>
                </div>
                <span className="text-[10px] font-semibold text-primary-700">
                  {completedCount === 3 ? '🎉 Selesai Semua' : 'Sedang Berjalan'}
                </span>
              </div>
            </div>

            {/* Level Bar Progress */}
            <div className="mt-5 p-4 rounded-2xl bg-slate-50/80 border border-slate-200/80">
              <div className="flex items-center justify-between text-xs mb-1.5">
                <span className="font-bold text-slate-800 flex items-center gap-1.5">
                  <span>🏅 Level {overall.level}:</span>
                  <span className="text-primary-700">{overall.levelName}</span>
                </span>
                <span className="text-slate-500 font-semibold">{overall.totalPoints} / {nextLevelGoal} Poin</span>
              </div>
              <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                <div
                  className="bg-gradient-to-r from-primary-600 to-teal-500 h-full transition-all duration-500"
                  style={{ width: `${levelProgressPercent}%` }}
                ></div>
              </div>
            </div>
          </div>

          {/* Status Penyimpanan Progres */}
          <div className="mt-5 pt-4 border-t border-slate-100 flex items-center justify-between gap-3">
            <span className="text-xs text-slate-500 flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-teal-500 inline-block"></span>
              Data tersimpan aman &amp; tersinkronisasi otomatis ke sistem guru.
            </span>
          </div>
        </div>

        {/* Kolom Kanan: Kata-Kata Penyemangat & Inspirasi Belajar (5 cols) */}
        <div 
          className="lg:col-span-5 text-white rounded-3xl p-6 sm:p-7 shadow-xl border border-indigo-700/60 flex flex-col justify-between relative overflow-hidden"
          style={{
            backgroundColor: '#1E1B4B',
            backgroundImage: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 55%, #0F172A 100%)'
          }}
        >
          {/* Subtle Glow */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-teal-500/10 rounded-full blur-2xl pointer-events-none"></div>

          <div className="relative z-10">
            {/* Header Penyemangat */}
            <div className="flex items-center justify-between gap-2 mb-4">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 rounded-lg bg-white/10 backdrop-blur-md flex items-center justify-center text-amber-300">
                  <Flame className="w-4 h-4 fill-current" />
                </div>
                <span className="text-xs font-bold uppercase tracking-wider text-teal-300">
                  Energi Belajar Hari Ini
                </span>
              </div>

              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-white/10 text-amber-200 border border-white/15">
                {motivationBadge}
              </span>
            </div>

            {/* Judul & Pesan Penyemangat */}
            <h4 className="text-xl font-heading font-extrabold text-white leading-snug">
              {motivationTitle}
            </h4>
            <p className="mt-3 text-xs sm:text-sm text-slate-200 leading-relaxed font-normal">
              {motivationMessage}
            </p>

            {/* Kutipan Inspiratif Tokoh Komputer */}
            <div className="mt-5 p-4 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10">
              <div className="text-[11px] font-bold text-amber-300 uppercase tracking-wider mb-1 flex items-center gap-1.5">
                <Sparkles className="w-3.5 h-3.5" />
                <span>Kutipan Inspirasi Komputasi</span>
              </div>
              <p className="text-xs text-slate-100 italic leading-relaxed">
                "Komputer itu seperti sepeda untuk pikiran kita—alat luar biasa yang memperkuat potensi akal manusia berlipat ganda."
              </p>
              <div className="text-[11px] font-semibold text-teal-300 mt-1.5 text-right">
                — Steve Jobs
              </div>
            </div>
          </div>

          {/* Quick Shortcuts to Modals */}
          <div className="relative z-10 mt-6 pt-4 border-t border-white/10 flex items-center justify-between text-xs">
            <span className="text-slate-300 text-[11px]">Ingin baca panduan lengkap?</span>
            <div className="flex items-center gap-2">
              <button
                onClick={onOpenTP}
                className="text-teal-300 hover:text-white font-semibold underline underline-offset-2 transition-colors"
              >
                Tujuan TP
              </button>
              <span className="text-white/30">•</span>
              <button
                onClick={onOpenGuide}
                className="text-amber-300 hover:text-white font-semibold underline underline-offset-2 transition-colors"
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
            <p className="text-xs sm:text-sm text-slate-500 font-medium">
              Selesaikan ketiga unit secara bertahap untuk membuka Ringkasan Capaian Akhir.
            </p>
          </div>

          {state.overall.completedUnits > 0 && (
            <button
              onClick={onOpenAchievement}
              className="px-4 py-2 bg-amber-500 hover:bg-amber-600 text-slate-950 font-heading font-bold text-xs rounded-xl shadow-md shadow-amber-500/20 flex items-center gap-1.5 transition-all hover:scale-102 self-start sm:self-center"
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
