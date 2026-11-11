import React from 'react';
import { ArrowRight, CheckCircle2, Clock, Award, Play } from 'lucide-react';

export default function UnitCard({ unit, unitState, onOpenUnit }) {
  const isCompleted = unitState.status === 'completed';
  const isInProgress = unitState.status === 'in-progress';
  const quizScore = unitState.quiz?.firstAttemptScorePercent;

  return (
    <div className={`p-6 sm:p-7 rounded-2xl border transition-all flex flex-col justify-between bg-white relative overflow-hidden group ${
      isCompleted
        ? 'border-teal-300 shadow-sm hover:shadow-md ring-1 ring-teal-200/50'
        : isInProgress
        ? 'border-primary-300 shadow-sm hover:shadow-md'
        : 'border-slate-200 hover:border-primary-300 hover:shadow-card-hover'
    }`}>
      {/* Top Banner Status */}
      <div>
        <div className="flex items-center justify-between gap-2 mb-3">
          <span className="px-2.5 py-1 rounded-md text-[11px] font-bold bg-primary-100 text-primary-800 tracking-wider">
            UNIT {unit.id}
          </span>

          {isCompleted ? (
            <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-teal-50 text-teal-800 border border-teal-200 flex items-center gap-1">
              <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
              <span>Selesai</span>
            </span>
          ) : isInProgress ? (
            <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-amber-50 text-amber-800 border border-amber-200">
              Sedang Dipelajari
            </span>
          ) : (
            <span className="px-2.5 py-1 rounded-full text-xs font-medium bg-slate-100 text-slate-600">
              Belum Dimulai
            </span>
          )}
        </div>

        {/* Title */}
        <h3 className="font-heading font-bold text-slate-900 text-lg sm:text-xl group-hover:text-primary-700 transition-colors">
          {unit.shortName}
        </h3>
        <p className="text-xs sm:text-sm text-slate-600 mt-2 line-clamp-2 leading-relaxed">
          {unit.tpDesc}
        </p>
      </div>

      {/* Progress & Scores */}
      <div className="mt-6 pt-4 border-t border-slate-100 space-y-2.5">
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500 font-medium">Skor Kuis (TP {unit.id}):</span>
          <span className="font-bold text-slate-800">
            {quizScore !== null && quizScore !== undefined ? (
              <span className={quizScore >= unit.minPassingScore ? 'text-teal-700' : 'text-amber-700'}>
                {quizScore} / 100
              </span>
            ) : (
              <span className="text-slate-400">Belum Ada</span>
            )}
          </span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500 font-medium">Perolehan Poin:</span>
          <span className="font-bold text-amber-900 flex items-center gap-1">
            <span>⚡</span>
            <span>+{unitState.totalPoints || 0} Poin</span>
          </span>
        </div>

        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-500 font-medium">Estimasi Waktu:</span>
          <span className="text-slate-600 flex items-center gap-1">
            <Clock className="w-3.5 h-3.5 text-slate-400" />
            <span>{unit.estTime}</span>
          </span>
        </div>

        {/* Action Button */}
        <button
          onClick={() => onOpenUnit(unit.id)}
          className={`w-full mt-4 py-2.5 px-4 rounded-xl font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-all shadow-sm ${
            isCompleted
              ? 'bg-slate-100 hover:bg-slate-200 text-slate-800'
              : 'bg-primary-700 hover:bg-primary-800 text-white shadow-primary-700/20'
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
