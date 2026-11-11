import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, RotateCcw, ArrowRight, Shuffle, Sparkles } from 'lucide-react';
import { storage } from '../utils/storage';
import { preparePracticeQuestions, shuffleOrderingItems } from '../utils/shuffle';
import SortableOrderList from './SortableOrderList';

const PRACTICE_SESSION_COUNT = 5;

export default function PracticeEngine({ practiceList, unitCode }) {
  const [activePracticeList, setActivePracticeList] = useState(() =>
    preparePracticeQuestions(practiceList, PRACTICE_SESSION_COUNT)
  );
  const [currentIdx, setCurrentIdx] = useState(0);
  const [selectedKey, setSelectedKey] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);
  const [orderedItems, setOrderedItems] = useState(() => {
    const first = activePracticeList[0];
    return first?.type === 'ordering'
      ? first.initialOrder || shuffleOrderingItems(first.items, first.correctOrder)
      : null;
  });
  const [isRoundFinished, setIsRoundFinished] = useState(false);

  // Re-acak jika berpindah unit
  useEffect(() => {
    setActivePracticeList(preparePracticeQuestions(practiceList, PRACTICE_SESSION_COUNT));
    setCurrentIdx(0);
    setSelectedKey(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setOrderedItems(null);
    setIsRoundFinished(false);
  }, [unitCode]);

  const q = activePracticeList[currentIdx];

  // Siapkan item teracak untuk soal bertipe ordering
  useEffect(() => {
    if (q?.type === 'ordering') {
      setOrderedItems(q.initialOrder || shuffleOrderingItems(q.items, q.correctOrder));
    } else {
      setOrderedItems(null);
    }
    setSelectedKey(null);
    setIsAnswered(false);
    setIsCorrect(false);
  }, [currentIdx, q]);

  const handleSelect = (opt) => {
    if (isAnswered) return;
    const displayKey = opt.displayKey || opt.key;
    const origKey = opt.origKey || opt.key;
    setSelectedKey(displayKey);
    const correct = origKey === q.correctKey;
    setIsCorrect(correct);
    setIsAnswered(true);

    storage.savePracticeAnswer(unitCode, q.id, correct);
  };

  const handleMoveOrder = (index, direction) => {
    if (isAnswered || !orderedItems) return;
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= orderedItems.length) return;
    const nextOrder = [...orderedItems];
    [nextOrder[index], nextOrder[targetIdx]] = [nextOrder[targetIdx], nextOrder[index]];
    setOrderedItems(nextOrder);
  };

  const handleCheckOrdering = () => {
    if (isAnswered || !orderedItems || !q.correctOrder) return;
    const correct = q.correctOrder.every((id, idx) => orderedItems[idx] === id);
    setIsCorrect(correct);
    setIsAnswered(true);

    storage.savePracticeAnswer(unitCode, q.id, correct);
  };

  const handleRetryCurrent = () => {
    setSelectedKey(null);
    setIsAnswered(false);
    setIsCorrect(false);
    if (q?.type === 'ordering') {
      setOrderedItems(shuffleOrderingItems(q.items, q.correctOrder));
    }
  };

  const handleNext = () => {
    if (currentIdx < activePracticeList.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      setIsRoundFinished(true);
    }
  };

  const handleReshufflePractice = () => {
    setActivePracticeList(preparePracticeQuestions(practiceList, PRACTICE_SESSION_COUNT));
    setCurrentIdx(0);
    setSelectedKey(null);
    setIsAnswered(false);
    setIsCorrect(false);
    setOrderedItems(null);
    setIsRoundFinished(false);
  };

  if (!q) return null;

  if (isRoundFinished) {
    return (
      <div className="neo-card p-6 text-center animate-in fade-in duration-200">
        <div className="w-12 h-12 rounded-2xl bg-emerald-300 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0F172A] text-slate-900 flex items-center justify-center mx-auto mb-3">
          <Sparkles className="w-6 h-6" />
        </div>
        <h4 className="font-heading font-extrabold text-slate-900 text-lg">
          Paket Latihan Soal Selesai!
        </h4>
        <p className="text-xs sm:text-sm text-slate-700 font-medium mt-1 max-w-md mx-auto">
          Kamu sudah berlatih 5 soal acak dari total {practiceList.length} bank latihan di unit ini. Mau mencoba kombinasi soal acak baru atau langsung lanjut ke Kuis Akhir?
        </p>
        <div className="mt-5 flex justify-center">
          <button
            onClick={handleReshufflePractice}
            className="neo-btn-sm px-4 py-2 rounded-xl bg-sky-200 hover:bg-sky-300 text-slate-900 font-extrabold text-xs flex items-center gap-1.5 cursor-pointer"
          >
            <Shuffle className="w-3.5 h-3.5" />
            <span>Acak & Latihan Soal Baru</span>
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="neo-card p-5 sm:p-7">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-4 border-b-2 border-slate-900/15 mb-4">
        <div>
          <span className="text-[11px] font-extrabold text-primary-700 uppercase tracking-wider">
            Penguatan Konsep Mandiri • Teracak dari {practiceList.length} Bank Soal
          </span>
          <h4 className="font-heading font-extrabold text-slate-900 text-base sm:text-lg">
            Latihan Soal (Dapat Diulang Langsung)
          </h4>
        </div>
        <div className="flex items-center gap-2">
          <button
            onClick={handleReshufflePractice}
            title="Acak ulang paket soal latihan"
            className="neo-btn-sm px-3 py-1 rounded-full bg-white hover:bg-sky-200 text-slate-900 text-xs font-extrabold flex items-center gap-1 cursor-pointer"
          >
            <Shuffle className="w-3 h-3" />
            <span>Acak</span>
          </button>
          <span className="px-3 py-1 bg-yellow-300 border-2 border-slate-900 text-slate-900 rounded-full text-xs font-extrabold">
            Latihan {currentIdx + 1} dari {activePracticeList.length} (+2 Poin Bonus)
          </span>
        </div>
      </div>

      <div className="my-4">
        <p className="font-heading font-extrabold text-slate-900 text-sm sm:text-base leading-relaxed">
          {q.question}
        </p>
      </div>

      {/* Opsi Jawaban Multiple-Choice & True/False */}
      {(q.type === 'multiple-choice' || q.type === 'true-false') && (
        <div className="space-y-2.5 mt-4">
          {q.options?.map((opt) => {
            const displayKey = opt.displayKey || opt.key;
            const origKey = opt.origKey || opt.key;
            const isSelected = selectedKey === displayKey;
            const isKeyCorrect = origKey === q.correctKey;

            let btnStyle = "bg-surface-page border-slate-900 text-slate-900 hover:bg-sky-100 shadow-[2px_2px_0px_0px_#0F172A] cursor-pointer";
            if (isAnswered) {
              if (isKeyCorrect) {
                btnStyle = "bg-emerald-200 border-slate-900 text-slate-900 font-extrabold shadow-[3px_3px_0px_0px_#0F172A]";
              } else if (isSelected) {
                btnStyle = "bg-rose-200 border-slate-900 text-slate-900 font-bold line-through";
              } else {
                btnStyle = "bg-slate-100 border-slate-400 text-slate-500";
              }
            }

            return (
              <button
                key={origKey}
                onClick={() => handleSelect(opt)}
                disabled={isAnswered}
                className={`w-full p-3.5 rounded-xl border-2 text-left text-xs sm:text-sm font-bold transition-all flex items-center justify-between gap-3 ${btnStyle}`}
              >
                <div className="flex items-start gap-2.5">
                  {q.type === 'multiple-choice' && (
                    <span className={`w-6 h-6 rounded-lg border-2 border-slate-900 font-extrabold text-xs flex items-center justify-center shrink-0 ${
                      isAnswered && isKeyCorrect
                        ? 'bg-emerald-400 text-slate-900'
                        : isAnswered && isSelected
                        ? 'bg-rose-400 text-slate-900'
                        : 'bg-white text-slate-900'
                    }`}>
                      {displayKey}
                    </span>
                  )}
                  <span className="leading-relaxed">{opt.text}</span>
                </div>
                {isAnswered && isKeyCorrect && <CheckCircle2 className="w-4 h-4 text-emerald-800 shrink-0" />}
              </button>
            );
          })}
        </div>
      )}

      {/* Tipe Ordering (Mengurutkan Langkah) */}
      {q.type === 'ordering' && orderedItems && (
        <div className="mt-4">
          <SortableOrderList
            questionKey={q.id}
            items={q.items}
            orderedItems={orderedItems}
            onMove={handleMoveOrder}
            onCheck={handleCheckOrdering}
            isAnswered={isAnswered}
            correctOrder={q.correctOrder}
            instructionText="Gunakan tombol panah Naik (▲) dan Turun (▼) untuk menyusun urutan yang benar:"
          />
        </div>
      )}

      {/* Feedback & Instant Retry */}
      {isAnswered && (
        <div className={`mt-5 p-4 rounded-2xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0F172A] ${
          isCorrect ? 'bg-emerald-200 text-slate-900' : 'bg-rose-200 text-slate-900'
        }`}>
          <div className="flex items-center gap-2 font-extrabold text-xs sm:text-sm">
            {isCorrect ? (
              <>
                <CheckCircle2 className="w-4 h-4 text-emerald-800" />
                <span>Benar! (+2 Poin Bonus)</span>
              </>
            ) : (
              <>
                <XCircle className="w-4 h-4 text-rose-800" />
                <span>Belum tepat. Coba periksa kembali konsep dasarnya.</span>
              </>
            )}
          </div>
          <p className="text-xs sm:text-sm mt-1.5 leading-relaxed font-medium">
            {isCorrect
              ? q.feedback?.correct || q.explanation
              : q.feedback?.incorrect ||
                (q.explanation
                  ? q.explanation.replace(/^(Tepat|Benar|Betul)[!.,:\-\s]+/i, '')
                  : 'Jawaban masih belum sesuai. Periksa kembali konsepnya.')}
          </p>

          <div className="mt-4 flex items-center justify-between gap-3 pt-3 border-t-2 border-slate-900/15">
            {!isCorrect ? (
              <button
                onClick={handleRetryCurrent}
                className="neo-btn-sm px-4 py-2 bg-white hover:bg-yellow-200 text-slate-900 font-extrabold text-xs rounded-xl flex items-center gap-1.5 cursor-pointer"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ulang Soal Ini Sekarang</span>
              </button>
            ) : <div></div>}

            <button
              onClick={handleNext}
              className="neo-btn-sm px-4 py-2 bg-yellow-300 hover:bg-yellow-200 text-slate-900 font-extrabold text-xs rounded-xl flex items-center gap-1.5 ml-auto cursor-pointer"
            >
              <span>
                {currentIdx < activePracticeList.length - 1
                  ? 'Latihan Berikutnya'
                  : 'Selesaikan Paket Latihan'}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
