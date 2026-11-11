import React from 'react';
import { Trophy, CheckCircle2, Award, ArrowLeft, Printer, RefreshCw, BookOpen, Clock } from 'lucide-react';
import { triggerConfetti } from '../utils/confetti';
import { unitsData } from '../data/contentData';

export default function AchievementView({ state, onNavigateUnit, onBackHome }) {
  React.useEffect(() => {
    triggerConfetti();
  }, []);

  const overall = state.overall;
  const averageScore = overall.averageQuizScore || 0;
  const isAllPassed = averageScore >= 75;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-300">
      {/* Hero Trophy Card */}
      <div 
        className="rounded-3xl text-white p-8 sm:p-12 text-center shadow-2xl border border-indigo-700/50 relative overflow-hidden"
        style={{
          backgroundColor: '#1E1B4B',
          backgroundImage: 'linear-gradient(135deg, #1E1B4B 0%, #312E81 55%, #0F3738 100%)'
        }}
      >
        {/* Glow Effects */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-amber-400/10 rounded-full blur-3xl pointer-events-none"></div>

        <div className="relative z-10 max-w-2xl mx-auto">
          {/* Trophy Icon */}
          <div className="w-20 h-20 rounded-full bg-gradient-to-b from-amber-300 to-amber-500 text-slate-900 flex items-center justify-center mx-auto shadow-lg shadow-amber-500/30 ring-4 ring-white/10 mb-5">
            <Trophy className="w-10 h-10 text-amber-950 fill-current" />
          </div>

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/10 border border-white/15 text-xs font-semibold text-teal-200 mb-4">
            <CheckCircle2 className="w-3.5 h-3.5 text-teal-400" />
            <span>SELURUH UNIT SELESAI • SIAP DISKUSI KELAS</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-white leading-tight">
            Selamat! Kamu Telah Menyelesaikan Seluruh Unit Sistem Komputer
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-slate-300 leading-relaxed max-w-xl mx-auto">
            Semua kemajuan belajarmu tersimpan otomatis di peramban perangkat ini. Tunjukkan layar ringkasan capaian ini kepada gurumu saat sesi pembelajaran di kelas!
          </p>

          {/* 3 Metric Stats Banner */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-3.5 text-left">
            {/* Total Poin */}
            <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                TOTAL POIN
              </span>
              <div className="text-2xl sm:text-3xl font-heading font-bold text-amber-300 mt-1">
                {overall.totalPoints} / {overall.maxPoints} Poin
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Akumulasi Kuis, Eksplorasi & Refleksi
              </p>
            </div>

            {/* Level Akhir */}
            <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                LEVEL AKHIR
              </span>
              <div className="text-2xl sm:text-3xl font-heading font-bold text-teal-300 mt-1">
                Level {overall.level} ({overall.levelName})
              </div>
              <p className="text-[11px] text-slate-400 mt-0.5">
                Tingkat Kemandirian Penuh
              </p>
            </div>

            {/* Rata-Rata Skor Kuis */}
            <div className="p-5 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15">
              <span className="text-[11px] font-bold text-slate-300 uppercase tracking-wider">
                RATA-RATA SKOR KUIS
              </span>
              <div className="text-2xl sm:text-3xl font-heading font-bold text-white mt-1">
                {averageScore} / 100
              </div>
              <p className="text-[11px] text-teal-300 font-semibold mt-0.5">
                {isAllPassed ? '✓ Tercapai (Target ≥ 75)' : 'Perlu Penguatan di Kelas'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Rincian Capaian 3 Unit Belajar */}
      <div className="mt-10">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-heading font-bold text-slate-900 text-lg sm:text-xl">
            Rincian Capaian per Tujuan Pembelajaran (TP)
          </h3>
          <span className="text-xs font-semibold px-2.5 py-1 bg-teal-50 text-teal-800 border border-teal-200 rounded-full">
            Validasi Capaian Fase E • Elemen SK
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {unitsData.map((u) => {
            const uState = state.units[u.unitCode];
            const isUnitCompleted = uState?.status === 'completed';
            const quizScore = uState?.quiz?.firstAttemptScorePercent ?? 0;
            const isPassed = quizScore >= u.minPassingScore;

            return (
              <div
                key={u.id}
                className="p-6 rounded-2xl bg-white border border-slate-200 shadow-sm flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-primary-100 text-primary-800">
                      UNIT {u.id}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                      isUnitCompleted
                        ? 'bg-teal-50 text-teal-800 border border-teal-200'
                        : 'bg-slate-100 text-slate-600'
                    }`}>
                      {isUnitCompleted ? '✓ Selesai' : 'Belum Selesai'}
                    </span>
                  </div>

                  <h4 className="font-heading font-bold text-slate-900 text-base">
                    {u.shortName}
                  </h4>
                  <p className="text-xs text-slate-500 mt-1">
                    {u.tpLabel}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t border-slate-100 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Skor Kuis Formatif:</span>
                    <span className={`font-bold ${isPassed ? 'text-teal-700' : 'text-amber-700'}`}>
                      {quizScore} / 100 {isPassed ? '(Tuntas)' : '(Remedial)'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Perolehan Poin:</span>
                    <span className="font-bold text-amber-900">
                      +{uState?.totalPoints || 0} Poin
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-500">Asesmen Refleksi:</span>
                    <span className="font-semibold text-slate-700">
                      {uState?.reflection?.completed ? '✓ Sudah Diisi' : 'Belum'}
                    </span>
                  </div>

                  <button
                    onClick={() => onNavigateUnit(u.id)}
                    className="w-full mt-3 py-2 px-3 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs transition-colors flex items-center justify-center gap-1.5"
                  >
                    <BookOpen className="w-3.5 h-3.5" />
                    <span>Buka Ulang Materi</span>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Info Card: Langkah Selanjutnya di Kelas */}
      <div className="mt-8 p-5 rounded-2xl bg-primary-50/70 border border-primary-200 flex items-start gap-4">
        <div className="w-10 h-10 rounded-xl bg-primary-700 text-white flex items-center justify-center shrink-0">
          🎓
        </div>
        <div>
          <h4 className="font-heading font-bold text-primary-950 text-sm sm:text-base">
            Langkah Selanjutnya di Kelas Bersama Guru Informatika
          </h4>
          <p className="text-xs sm:text-sm text-primary-900/80 mt-1 leading-relaxed">
            Silakan bersiap untuk sesi presentasi kelompok atau diskusi pemecahan masalah bersama Guru Informatika. Kamu dapat mencetak atau mengambil tangkapan layar (screenshot) ringkasan capaian ini sebagai portofolio belajar mandirimu.
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t border-slate-200">
        <button
          onClick={onBackHome}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-800 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </button>

        <button
          onClick={handlePrint}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md transition-all hover:scale-102"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak / Simpan Bukti Capaian (PDF)</span>
        </button>
      </div>
    </div>
  );
}
