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
    <div className="neo-card p-5 sm:p-7">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 border-b-2 border-slate-900/15">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-yellow-300 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A] text-slate-900 flex items-center justify-center">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h3 className="font-heading font-extrabold text-slate-900 text-lg sm:text-xl">
              Ringkasan Materi (Poin Kunci Penguatan)
            </h3>
            <p className="text-xs text-slate-600 font-medium mt-0.5">
              Buku Saku Digital • Intisari konsep yang perlu diingat untuk asesmen sumatif di kelas.
            </p>
          </div>
        </div>

        <button
          onClick={handleCopySummary}
          className={`neo-btn-sm px-4 py-2 rounded-xl text-xs flex items-center gap-1.5 cursor-pointer ${
            copied
              ? 'bg-emerald-300 text-slate-900'
              : 'bg-sky-200 hover:bg-sky-300 text-slate-900'
          }`}
        >
          {copied ? (
            <>
              <Check className="w-4 h-4 text-slate-900" />
              <span>Tersalin ke Clipboard!</span>
            </>
          ) : (
            <>
              <Copy className="w-4 h-4 text-slate-900" />
              <span>Salin Intisari</span>
            </>
          )}
        </button>
      </div>

      {/* 3 Summary Cards (Tanpa Gradasi — Warna Flat Neo-Brutalist) */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {summaryCards.map((card, idx) => {
          const cardBg =
            idx % 3 === 0 ? 'bg-sky-100' : idx % 3 === 1 ? 'bg-yellow-100' : 'bg-emerald-100';
          return (
            <div
              key={idx}
              className={`p-5 rounded-2xl ${cardBg} border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0F172A] flex flex-col justify-between`}
            >
              <div>
                <span className="px-2.5 py-1 rounded-md text-[10px] font-extrabold bg-white border-2 border-slate-900 text-slate-900 uppercase tracking-wider inline-block mb-3">
                  {card.tag}
                </span>
                <h4 className="font-heading font-extrabold text-slate-900 text-base mb-2">
                  {card.title}
                </h4>
                <p className="text-xs text-slate-800 leading-relaxed font-medium">
                  {card.content}
                </p>
              </div>
              <div className="mt-4 pt-3 border-t-2 border-slate-900/15 text-[11px] text-slate-700 font-bold">
                {card.subtext}
              </div>
            </div>
          );
        })}
      </div>

      {/* Action Footer */}
      <div className="mt-8 pt-5 border-t-2 border-slate-900/15 flex flex-col sm:flex-row items-center justify-between gap-3">
        <button
          onClick={onRestartQuiz}
          className="neo-btn w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white hover:bg-slate-100 text-slate-900 font-bold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          <RotateCcw className="w-4 h-4" />
          <span>Ulangi Kuis Unit Ini</span>
        </button>

        <button
          onClick={handleFinishUnit}
          className="neo-btn w-full sm:w-auto px-6 py-2.5 rounded-xl bg-yellow-300 hover:bg-yellow-200 text-slate-900 font-extrabold text-xs sm:text-sm flex items-center justify-center gap-2 cursor-pointer"
        >
          <span>Simpan & Kembali ke Menu Unit</span>
          <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
