import React from 'react';
import { ArrowRight, CheckCircle2, Clock, Play } from 'lucide-react';

export default function UnitCard({ unit, unitState, onOpenUnit }) {
  const isCompleted = unitState.status === 'completed';
  const isInProgress = unitState.status === 'in-progress';
  const quizScore = unitState.quiz?.firstAttemptScorePercent;

  const unitBadgeBg =
    unit.id === 1
      ? 'bg-sky-200 text-slate-900'
      : unit.id === 2
      ? 'bg-yellow-300 text-slate-900'
      : 'bg-emerald-300 text-slate-900';

  return (
    <div className="p-6 sm:p-7 rounded-2xl border-2 border-slate-900 bg-white shadow-[5px_5px_0px_0px_#0F172A] hover:-translate-x-0.5 hover:-translate-y-0.5 hover:shadow-[7px_7px_0px_0px_#0F172A] transition-all duration-150 flex flex-col justify-between relative overflow-hidden group">
      {/* Top Banner Status */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3.5">
          <span className={`px-3 py-1 rounded-lg text-[11px] font-heading font-extrabold border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A] tracking-wider ${unitBadgeBg}`}>
            UNIT {unit.id}
          </span>

          {isCompleted ? (
            <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-emerald-300 text-slate-900 border-2 border-slate-900 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-slate-900" />
              <span>Selesai</span>
            </span>
          ) : isInProgress ? (
            <span className="px-2.5 py-1 rounded-full text-xs font-extrabold bg-yellow-200 text-slate-900 border-2 border-slate-900">
              Sedang Dipelajari
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-slate-100 text-slate-700 border-2 border-slate-900">
              Belum Dimulai
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-heading font-extrabold text-slate-900 text-lg sm:text-xl group-hover:text-primary-700 transition-colors">
          {unit.shortName}
        </h3>
        <p className="text-xs sm:text-sm text-slate-700 mt-2 line-clamp-2 leading-relaxed font-medium">
          {unit.tpDesc}
        </p>
      </div>

      {/* Progress & Scores */}
      <div className="mt-6 pt-4 border-t-2 border-slate-900/15 space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-600 font-bold">Skor Kuis (TP {unit.id}):</span>
          <span className="font-extrabold text-slate-900">
            {quizScore !== null && quizScore !== undefined ? (
              <span className={`px-2 py-0.5 rounded border border-slate-900 ${quizScore >= unit.minPassingScore ? 'bg-emerald-200 text-slate-900' : 'bg-yellow-200 text-slate-900'}`}>
                {quizScore} / 100
              </span>
            ) : (
              <span className="text-slate-500">Belum Ada</span>
            )}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-600 font-bold">Perolehan Poin:</span>
          <span className="font-extrabold text-slate-900 flex items-center gap-1">
            <span>⚡</span>
            <span>+{unitState.totalPoints || 0} Poin</span>
          </span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-600 font-bold">Estimasi Waktu:</span>
          <span className="text-slate-700 font-semibold flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-700" />
            <span>{unit.estTime}</span>
          </span>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onOpenUnit(unit.id)}
          className={`neo-btn w-full mt-4 py-2.5 px-4 rounded-xl font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer ${
            isCompleted
              ? 'bg-emerald-200 hover:bg-emerald-300 text-slate-900'
              : 'bg-primary-600 hover:bg-primary-700 text-white'
          }`}
        >
          {isCompleted ? (
            <>
              <span>Buka Ulang Materi</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          ) : isInProgress ? (
            <>
              <span>Lanjutkan Belajar</span>
              <Play className="w-3.5 h-3.5 fill-current" />
            </>
          ) : (
            <>
              <span>Mulai Unit {unit.id}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </>
          )}
        </button>
      </div>
    </div>
  );
}
