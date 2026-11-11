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
      {/* Hero Trophy Card Neo-Brutalist */}
      <div className="rounded-3xl bg-primary-600 text-white p-8 sm:p-12 text-center border-[3px] border-slate-900 shadow-[8px_8px_0px_0px_#0F172A] relative overflow-hidden">
        <div className="relative z-10 max-w-2xl mx-auto">
          {/* Trophy Icon Flat */}
          <div className="w-20 h-20 rounded-2xl bg-yellow-300 border-[3px] border-slate-900 shadow-[4px_4px_0px_0px_#0F172A] text-slate-900 flex items-center justify-center mx-auto mb-5">
            <Trophy className="w-10 h-10 text-slate-900 fill-current" />
          </div>

          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-emerald-300 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A] text-xs font-extrabold text-slate-900 mb-4">
            <CheckCircle2 className="w-3.5 h-3.5 text-slate-900" />
            <span>SELURUH UNIT SELESAI • SIAP DISKUSI KELAS</span>
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-heading font-extrabold text-white leading-tight">
            Selamat! Kamu Telah Menyelesaikan Seluruh Unit Sistem Komputer
          </h2>

          <p className="mt-3 text-xs sm:text-sm text-blue-50 leading-relaxed max-w-xl mx-auto font-medium">
            Semua kemajuan belajarmu tersimpan otomatis di peramban perangkat ini. Tunjukkan layar ringkasan capaian ini kepada gurumu saat sesi pembelajaran di kelas!
          </p>

          {/* 3 Metric Stats Banner Flat Neo Cards */}
          <div className="mt-8 grid grid-cols-1 sm:grid-cols-3 gap-4 text-left">
            {/* Total Poin */}
            <div className="p-5 rounded-2xl bg-yellow-300 border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0F172A] text-slate-900">
              <span className="text-[11px] font-extrabold text-slate-900 uppercase tracking-wider">
                TOTAL POIN
              </span>
              <div className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 mt-1">
                {overall.totalPoints} / {overall.maxPoints} Poin
              </div>
              <p className="text-[11px] text-slate-800 font-bold mt-0.5">
                Akumulasi Kuis, Eksplorasi & Refleksi
              </p>
            </div>

            {/* Level Akhir */}
            <div className="p-5 rounded-2xl bg-emerald-300 border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0F172A] text-slate-900">
              <span className="text-[11px] font-extrabold text-slate-900 uppercase tracking-wider">
                LEVEL AKHIR
              </span>
              <div className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 mt-1">
                Level {overall.level} ({overall.levelName})
              </div>
              <p className="text-[11px] text-slate-800 font-bold mt-0.5">
                Tingkat Kemandirian Penuh
              </p>
            </div>

            {/* Rata-Rata Skor Kuis */}
            <div className="p-5 rounded-2xl bg-white border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0F172A] text-slate-900">
              <span className="text-[11px] font-extrabold text-slate-700 uppercase tracking-wider">
                RATA-RATA SKOR KUIS
              </span>
              <div className="text-2xl sm:text-3xl font-heading font-extrabold text-slate-900 mt-1">
                {averageScore} / 100
              </div>
              <p className="text-[11px] text-primary-700 font-extrabold mt-0.5">
                {isAllPassed ? '✓ Tercapai (Target ≥ 75)' : 'Perlu Penguatan di Kelas'}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Rincian Capaian 3 Unit Belajar */}
      <div className="mt-10">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
          <h3 className="font-heading font-extrabold text-slate-900 text-lg sm:text-xl">
            Rincian Capaian per Tujuan Pembelajaran (TP)
          </h3>
          <span className="text-xs font-extrabold px-3 py-1 bg-emerald-200 text-slate-900 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A] rounded-full self-start sm:self-auto">
            Validasi Capaian Fase E • Elemen SK
          </span>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {unitsData.map((u) => {
            const uState = state.units[u.unitCode];
            const isUnitCompleted = uState?.status === 'completed';
            const quizScore = uState?.quiz?.firstAttemptScorePercent ?? 0;
            const isPassed = quizScore >= u.minPassingScore;
            const unitBadgeBg = u.id === 1 ? 'bg-sky-200' : u.id === 2 ? 'bg-yellow-300' : 'bg-emerald-300';

            return (
              <div
                key={u.id}
                className="neo-card p-6 flex flex-col justify-between"
              >
                <div>
                  <div className="flex items-center justify-between mb-3">
                    <span className={`px-2.5 py-1 rounded-lg text-[10px] font-extrabold ${unitBadgeBg} text-slate-900 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A]`}>
                      UNIT {u.id}
                    </span>
                    <span className={`px-2.5 py-0.5 rounded-full text-xs font-extrabold border-2 border-slate-900 ${
                      isUnitCompleted
                        ? 'bg-emerald-300 text-slate-900'
                        : 'bg-slate-100 text-slate-700'
                    }`}>
                      {isUnitCompleted ? '✓ Selesai' : 'Belum Selesai'}
                    </span>
                  </div>

                  <h4 className="font-heading font-extrabold text-slate-900 text-base">
                    {u.shortName}
                  </h4>
                  <p className="text-xs text-slate-600 font-semibold mt-1">
                    {u.tpLabel}
                  </p>
                </div>

                <div className="mt-5 pt-4 border-t-2 border-slate-900/15 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 font-bold">Skor Kuis Formatif:</span>
                    <span className={`font-extrabold px-2 py-0.5 rounded border border-slate-900 ${isPassed ? 'bg-emerald-200 text-slate-900' : 'bg-yellow-200 text-slate-900'}`}>
                      {quizScore} / 100 {isPassed ? '(Tuntas)' : '(Remedial)'}
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 font-bold">Perolehan Poin:</span>
                    <span className="font-extrabold text-slate-900">
                      +{uState?.totalPoints || 0} Poin
                    </span>
                  </div>

                  <div className="flex items-center justify-between">
                    <span className="text-slate-600 font-bold">Asesmen Refleksi:</span>
                    <span className="font-extrabold text-slate-900">
                      {uState?.reflection?.completed ? '✓ Sudah Diisi' : 'Belum'}
                    </span>
                  </div>

                  <button
                    onClick={() => onNavigateUnit(u.id)}
                    className="neo-btn-sm w-full mt-3 py-2 px-3 rounded-xl bg-white hover:bg-sky-200 text-slate-900 font-extrabold text-xs flex items-center justify-center gap-1.5 cursor-pointer"
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
      <div className="mt-8 p-5 rounded-2xl bg-sky-200 border-2 border-slate-900 shadow-[5px_5px_0px_0px_#0F172A] flex items-start gap-4">
        <div className="w-11 h-11 rounded-xl bg-white border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A] text-slate-900 flex items-center justify-center shrink-0 text-xl">
          🎓
        </div>
        <div>
          <h4 className="font-heading font-extrabold text-slate-900 text-sm sm:text-base">
            Langkah Selanjutnya di Kelas Bersama Guru Informatika
          </h4>
          <p className="text-xs sm:text-sm text-slate-800 mt-1 leading-relaxed font-medium">
            Silakan bersiap untuk sesi presentasi kelompok atau diskusi pemecahan masalah bersama Guru Informatika. Kamu dapat mencetak atau mengambil tangkapan layar (screenshot) ringkasan capaian ini sebagai portofolio belajar mandirimu.
          </p>
        </div>
      </div>

      {/* Action Footer */}
      <div className="mt-8 flex flex-col sm:flex-row items-center justify-between gap-3 pt-4 border-t-2 border-slate-900/15">
        <button
          onClick={onBackHome}
          className="neo-btn w-full sm:w-auto px-6 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Kembali ke Beranda</span>
        </button>

        <button
          onClick={handlePrint}
          className="neo-btn w-full sm:w-auto px-6 py-2.5 rounded-xl bg-yellow-300 hover:bg-yellow-200 text-slate-900 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          <Printer className="w-4 h-4" />
          <span>Cetak / Simpan Bukti Capaian (PDF)</span>
        </button>
      </div>
    </div>
  );
}
