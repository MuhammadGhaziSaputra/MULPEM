import React, { useState } from 'react';
import { BookOpen, Copy, Check, ArrowRight, RotateCcw, Sparkles } from 'lucide-react';
import { storage } from '../utils/storage';
import { triggerConfetti } from '../utils/confetti';

export default function SummaryView({ summaryCards, unitCode, onReturnMenu, onRestartQuiz }) {
  const [copied, setCopied] = useState(false);

  const handleCopySummary = () => {
    const textToCopy = summaryCards
      .map((c) => `[${c.tag}] ${c.title}:\n${c.content}`)
      .join('\n\n');

    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const handleFinishUnit = () => {
    storage.completeUnit(unitCode);
    triggerConfetti();
    onReturnMenu();
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-7 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-primary-700 text-white flex items-center justify-center shadow-md shadow-primary-700/20">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-bold text-slate-900 text-lg sm:text-xl">
              Ringkasan Materi (Poin Kunci Penguatan)
            </h3>
            <p className="text-xs text-slate-500 mt-0.5">
              Buku Saku Digital • Intisari konsep yang perlu diingat untuk asesmen sumatif di kelas.
            </p>
          </div>
        </div>

        <button
          onClick={handleCopySummary}
          className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all border ${
            copied
              ? 'bg-teal-50 border-teal-300 text-teal-800'
              : 'bg-slate-50 border-slate-200 hover:bg-slate-100 text-slate-700'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-teal-600" />
              <span>Tersalin ke Clipboard!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-slate-500" />
              <span>Salin Intisari</span>
            </>
          )}
        </button>
      </div>

      {/* 3 Summary Cards */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {summaryCards.map((card, idx) => (
          <div
            key={idx}
            className="p-5 rounded-2xl bg-gradient-to-br from-slate-50 to-primary-50/20 border border-slate-200/80 hover:border-primary-300 transition-all shadow-sm flex flex-col justify-between"
          >
            <div>
              <span className="px-2.5 py-1 rounded-md text-[10px] font-bold bg-primary-100 text-primary-800 uppercase tracking-wider inline-block mb-3">
                {card.tag}
              </span>
              <h4 className="font-heading font-bold text-slate-900 text-base mb-2">
                {card.title}
              </h4>
              <p className="text-xs text-slate-600 leading-relaxed">
                {card.content}
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-slate-200/60 text-[11px] text-slate-400 font-medium">
              {card.subtext}
            </div>
          </div>
        ))}
      </div>

      {/* Action Footer */}
      <div className="mt-8 pt-5 border-t border-slate-100 flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          onClick={onRestartQuiz}
          className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 transition-colors"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Ulangi Kuis Unit Ini</span>
        </button>

        <button
          onClick={handleFinishUnit}
          className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-primary-700 hover:bg-primary-800 text-white font-semibold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-md shadow-primary-700/20 transition-all hover:scale-102"
        >
          <span>Simpan & Kembali ke Menu Unit</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
