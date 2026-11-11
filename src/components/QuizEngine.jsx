import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, AlertCircle, ArrowRight, RotateCcw, Award, Lightbulb, HelpCircle, Sparkles, Shuffle } from 'lucide-react';
import { storage } from '../utils/storage';
import { triggerConfetti } from '../utils/confetti';
import { prepareQuizQuestions, shuffleOrderingItems } from '../utils/shuffle';
import SortableOrderList from './SortableOrderList';

const QUIZ_SESSION_COUNT = 5;

export default function QuizEngine({ quizList, unitCode, minScore, onFinishQuiz }) {
  const [activeQuizList, setActiveQuizList] = useState(() =>
    prepareQuizQuestions(quizList, QUIZ_SESSION_COUNT)
  );
  const [currentIdx, setCurrentIdx] = useState(0);
  // Simpan jawaban kuis: { [questionId]: selectedAnswer }
  const [userAnswers, setUserAnswers] = useState({});
  // Apakah soal saat ini sudah dikonfirmasi/dijawab?
  const [isAnswered, setIsAnswered] = useState(false);
  // Status evaluasi soal saat ini: { isCorrect, score, feedback }
  const [currentEval, setCurrentEval] = useState(null);
  // Selesai semua soal?
  const [isFinished, setIsFinished] = useState(false);
  const [quizSummary, setQuizSummary] = useState(null);

  // Khusus tipe matching: { leftId: rightId }
  const [matchingPairs, setMatchingPairs] = useState({});
  const [selectedLeft, setSelectedLeft] = useState(null);

  // Khusus tipe ordering: array of item IDs in order
  const [orderedItems, setOrderedItems] = useState(() => {
    const first = activeQuizList[0];
    return first?.type === 'ordering'
      ? first.initialOrder || shuffleOrderingItems(first.items, first.correctOrder)
      : null;
  });

  // Re-acak jika berpindah unit
  useEffect(() => {
    setActiveQuizList(prepareQuizQuestions(quizList, QUIZ_SESSION_COUNT));
    setCurrentIdx(0);
    setUserAnswers({});
    setIsAnswered(false);
    setCurrentEval(null);
    setIsFinished(false);
    setQuizSummary(null);
  }, [unitCode]);

  const q = activeQuizList[currentIdx];

  // Inisialisasi state jika tipe ordering
  useEffect(() => {
    if (q?.type === 'ordering') {
      setOrderedItems(q.initialOrder || shuffleOrderingItems(q.items, q.correctOrder));
    } else {
      setOrderedItems(null);
    }
    setMatchingPairs({});
    setSelectedLeft(null);
    setIsAnswered(false);
    setCurrentEval(null);
  }, [currentIdx, q]);

  // Handler Pilihan Ganda
  const handleSelectMC = (opt) => {
    if (isAnswered) return;
    const displayKey = opt.displayKey || opt.key;
    const origKey = opt.origKey || opt.key;
    const isCorrect = origKey === q.correctKey;
    const score = isCorrect ? 1.0 : 0.0;
    const evalData = {
      isCorrect,
      score,
      selectedKey: displayKey,
      selectedOrigKey: origKey,
      feedbackText: isCorrect ? q.feedback.correct : q.feedback.incorrect,
      hint: q.hint
    };

    setIsAnswered(true);
    setCurrentEval(evalData);
    setUserAnswers((prev) => ({ ...prev, [q.id]: evalData }));
  };

  // Handler Matching: Pilih kiri lalu pilih kanan
  const handleLeftClick = (id) => {
    if (isAnswered) return;
    setSelectedLeft(id === selectedLeft ? null : id);
  };

  const handleRightClick = (id) => {
    if (isAnswered || !selectedLeft) return;
    setMatchingPairs((prev) => ({ ...prev, [selectedLeft]: id }));
    setSelectedLeft(null);
  };

  const handleCheckMatching = () => {
    let matchCount = 0;
    const totalPairs = Object.keys(q.correctPairs).length;

    Object.keys(q.correctPairs).forEach((lId) => {
      if (matchingPairs[lId] === q.correctPairs[lId]) {
        matchCount++;
      }
    });

    const score = matchCount / totalPairs;
    const isCorrect = score === 1.0;
    const evalData = {
      isCorrect,
      score,
      correctCount: matchCount,
      totalCount: totalPairs,
      pairs: matchingPairs,
      feedbackText: isCorrect ? q.feedback.correct : q.feedback.incorrect,
      hint: q.hint
    };

    setIsAnswered(true);
    setCurrentEval(evalData);
    setUserAnswers((prev) => ({ ...prev, [q.id]: evalData }));
  };

  // Handler Ordering
  const handleMoveOrder = (index, direction) => {
    if (isAnswered || !orderedItems) return;
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= orderedItems.length) return;
    const nextOrder = [...orderedItems];
    const temp = nextOrder[index];
    nextOrder[index] = nextOrder[targetIdx];
    nextOrder[targetIdx] = temp;
    setOrderedItems(nextOrder);
  };

  const handleCheckOrdering = () => {
    let correctPos = 0;
    q.correctOrder.forEach((id, idx) => {
      if (orderedItems[idx] === id) correctPos++;
    });

    const score = correctPos / q.correctOrder.length;
    const isCorrect = score === 1.0;
    const evalData = {
      isCorrect,
      score,
      correctCount: correctPos,
      totalCount: q.correctOrder.length,
      order: orderedItems,
      feedbackText: isCorrect ? q.feedback.correct : q.feedback.incorrect,
      hint: q.hint
    };

    setIsAnswered(true);
    setCurrentEval(evalData);
    setUserAnswers((prev) => ({ ...prev, [q.id]: evalData }));
  };

  // Navigasi ke Soal Berikutnya
  const handleNextQuestion = () => {
    if (currentIdx < activeQuizList.length - 1) {
      setCurrentIdx(currentIdx + 1);
    } else {
      // Hitung hasil kuis keseluruhan berdasarkan paket soal acak aktif
      let totalRaw = 0;
      activeQuizList.forEach((question) => {
        const ans = userAnswers[question.id];
        if (ans) totalRaw += ans.score;
      });

      const scorePercent = Math.round((totalRaw / activeQuizList.length) * 100);
      const points = Math.round((60 / activeQuizList.length) * totalRaw);
      const passed = scorePercent >= minScore;

      const summary = {
        totalQuestions: activeQuizList.length,
        scoreRaw: totalRaw,
        scorePercent,
        points,
        passed
      };

      setQuizSummary(summary);
      setIsFinished(true);

      // Simpan ke storage (percobaan pertama mengunci skor TP)
      storage.saveQuizFirstAttempt(unitCode, {
        answers: userAnswers,
        scoreRaw: totalRaw,
        scorePercent,
        points
      });

      if (passed) {
        triggerConfetti();
      }
    }
  };

  const handleRestartQuiz = () => {
    setActiveQuizList(prepareQuizQuestions(quizList, QUIZ_SESSION_COUNT));
    setCurrentIdx(0);
    setUserAnswers({});
    setIsAnswered(false);
    setCurrentEval(null);
    setIsFinished(false);
    setQuizSummary(null);
  };

  // LAYAR HASIL AKHIR KUIS
  if (isFinished && quizSummary) {
    return (
      <div className="neo-card p-6 sm:p-8 text-center animate-in fade-in duration-300">
        <div className="w-16 h-16 rounded-2xl bg-yellow-300 border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0F172A] text-slate-900 flex items-center justify-center mx-auto">
          <Award className="w-9 h-9 text-slate-900" />
        </div>

        <h3 className="font-heading font-extrabold text-2xl text-slate-900 mt-4">
          Kuis Akhir Unit Selesai!
        </h3>
        <p className="text-sm text-slate-700 font-medium mt-1">
          {quizSummary.passed
            ? 'Hebat! Kamu telah mencapai ambang ketuntasan Tujuan Pembelajaran (TP).'
            : 'Hasil tersimpan. Kamu dapat mengulang kuis dengan paket soal acak baru atau melanjutkan ke refleksi.'}
        </p>

        {/* Skor Box */}
        <div className="mt-6 max-w-md mx-auto grid grid-cols-2 gap-4">
          <div className="p-4 rounded-2xl bg-sky-200 border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0F172A]">
            <span className="text-xs font-extrabold text-slate-900">Skor Kuis (TP)</span>
            <div className="text-2xl font-heading font-extrabold text-slate-900 mt-0.5">
              {quizSummary.scorePercent} / 100
            </div>
            <span className={`text-[11px] font-extrabold mt-1 inline-block px-2.5 py-0.5 rounded-full border border-slate-900 ${
              quizSummary.passed ? 'bg-emerald-300 text-slate-900' : 'bg-rose-200 text-slate-900'
            }`}>
              {quizSummary.passed ? `✓ Tuntas (≥ ${minScore})` : 'Perlu Penguatan'}
            </span>
          </div>

          <div className="p-4 rounded-2xl bg-yellow-200 border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0F172A]">
            <span className="text-xs font-extrabold text-slate-900">Perolehan Poin</span>
            <div className="text-2xl font-heading font-extrabold text-slate-900 mt-0.5">
              +{quizSummary.points} Poin
            </div>
            <span className="text-[11px] font-bold text-slate-800 mt-1 inline-block">
              Tersimpan di Profil
            </span>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleRestartQuiz}
            className="neo-btn w-full sm:w-auto px-5 py-2.5 rounded-xl bg-white hover:bg-sky-200 text-slate-900 font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <Shuffle className="w-4 h-4 text-primary-700" />
            <span>Ulangi Kuis (Acak Soal Baru)</span>
          </button>

          <button
            onClick={onFinishQuiz}
            className="neo-btn w-full sm:w-auto px-6 py-2.5 rounded-xl bg-yellow-300 hover:bg-yellow-200 text-slate-900 font-extrabold text-sm flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>Lanjut ke Refleksi</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    );
  }

  if (!q) return null;

  // PROGRESS BAR & SOAL
  const progressPercent = Math.round(((currentIdx + 1) / activeQuizList.length) * 100);

  return (
    <div className="neo-card p-5 sm:p-7">
      {/* Quiz Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b-2 border-slate-900/15">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-8 h-8 rounded-xl bg-yellow-300 border-2 border-slate-900 shadow-[2px_2px_0px_0px_#0F172A] text-slate-900 font-heading font-extrabold text-xs flex items-center justify-center">
              Q{currentIdx + 1}
            </span>
            <h3 className="font-heading font-extrabold text-slate-900 text-base sm:text-lg">
              Soal {currentIdx + 1} dari {activeQuizList.length} • Kuis Akhir Unit
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-1.5 sm:ml-10">
            <span className="text-xs text-slate-700 font-bold">
              Tingkat Kesulitan: {q.level}
            </span>
            <span className="text-[11px] text-slate-900 font-extrabold bg-sky-200 border border-slate-900 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
              <Shuffle className="w-3 h-3" />
              Acak dari {quizList.length} Bank Soal
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-extrabold px-3 py-1 bg-yellow-200 text-slate-900 border-2 border-slate-900 rounded-full">
            Target TP: Min. {minScore}
          </span>
          <span className="text-xs font-extrabold px-3 py-1 bg-emerald-200 text-slate-900 border-2 border-slate-900 rounded-full">
            +{Math.round(60 / activeQuizList.length)} Poin
          </span>
        </div>
      </div>

      {/* Progress Line */}
      <div className="w-full bg-surface-muted h-3 rounded-full border-2 border-slate-900 overflow-hidden my-4">
        <div
          className={`bg-primary-600 h-full transition-all duration-300 ${progressPercent > 0 && progressPercent < 100 ? 'border-r-2 border-slate-900' : ''}`}
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      {/* Pertanyaan */}
      <div className="my-5">
        <h4 className="text-base sm:text-lg font-heading font-extrabold text-slate-900 leading-snug">
          {q.question}
        </h4>
      </div>

      {/* TAMPILAN SESUAI TIPE SOAL */}

      {/* 1. Tipe Multiple Choice */}
      {q.type === 'multiple-choice' && (
        <div className="space-y-2.5">
          {q.options.map((opt) => {
            const optDisplayKey = opt.displayKey || opt.key;
            const optOrigKey = opt.origKey || opt.key;
            const isSelected = currentEval?.selectedKey === optDisplayKey;
            const isCorrect = optOrigKey === q.correctKey;

            let optStyle = "bg-surface-page border-slate-900 text-slate-900 hover:bg-sky-100 shadow-[2px_2px_0px_0px_#0F172A] cursor-pointer";

            if (isAnswered) {
              if (isCorrect) {
                optStyle = "bg-emerald-200 border-slate-900 text-slate-900 font-extrabold shadow-[3px_3px_0px_0px_#0F172A]";
              } else if (isSelected) {
                optStyle = "bg-rose-200 border-slate-900 text-slate-900 font-bold line-through";
              } else {
                optStyle = "bg-slate-100 border-slate-400 text-slate-500";
              }
            }

            return (
              <button
                key={optOrigKey}
                onClick={() => handleSelectMC(opt)}
                disabled={isAnswered}
                className={`w-full p-4 rounded-xl border-2 text-left text-xs sm:text-sm font-bold transition-all flex items-start gap-3 ${optStyle}`}
              >
                <span className={`w-6 h-6 rounded-lg border-2 border-slate-900 font-extrabold text-xs flex items-center justify-center shrink-0 ${
                  isAnswered && isCorrect
                    ? 'bg-emerald-400 text-slate-900'
                    : isAnswered && isSelected
                    ? 'bg-rose-400 text-slate-900'
                    : 'bg-white text-slate-900'
                }`}>
                  {optDisplayKey}
                </span>
                <span className="mt-0.5 leading-relaxed">{opt.text}</span>
              </button>
            );
          })}
        </div>
      )}

      {/* 2. Tipe Matching (Menjodohkan) */}
      {q.type === 'matching' && (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Kolom Kiri */}
            <div className="space-y-2.5">
              <div className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                Komponen:
              </div>
              {q.leftItems.map((item) => {
                const isSelected = selectedLeft === item.id;
                const pairedRightId = matchingPairs[item.id];
                const isPaired = !!pairedRightId;
                const isPairCorrect = isAnswered && pairedRightId === q.correctPairs[item.id];

                return (
                  <div
                    key={item.id}
                    onClick={() => handleLeftClick(item.id)}
                    className={`p-3.5 rounded-xl border-2 border-slate-900 text-xs transition-all flex items-center justify-between ${
                      isAnswered ? 'cursor-default' : 'cursor-pointer'
                    } ${
                      isAnswered
                        ? isPairCorrect
                          ? 'bg-emerald-200 text-slate-900 font-extrabold shadow-[3px_3px_0px_0px_#0F172A]'
                          : 'bg-rose-200 text-slate-900 font-bold shadow-[3px_3px_0px_0px_#0F172A]'
                        : isSelected
                        ? 'bg-yellow-300 text-slate-900 font-extrabold shadow-[4px_4px_0px_0px_#0F172A] -translate-y-0.5'
                        : isPaired
                        ? 'bg-sky-200 text-slate-900 font-bold shadow-[2px_2px_0px_0px_#0F172A]'
                        : 'bg-surface-page hover:bg-sky-100 text-slate-900 font-semibold shadow-[2px_2px_0px_0px_#0F172A]'
                    }`}
                  >
                    <div>
                      <div className="font-extrabold">{item.label}</div>
                      <div className="text-[11px] text-slate-700 font-medium">{item.subtext}</div>
                    </div>
                    {isAnswered ? (
                      <span className={`text-xs font-extrabold shrink-0 ${isPairCorrect ? 'text-emerald-900' : 'text-rose-900'}`}>
                        {isPairCorrect ? '✓ Tepat' : '✖ Keliru'}
                      </span>
                    ) : (
                      isPaired && <span className="text-xs font-extrabold">➔ Terpasang</span>
                    )}
                  </div>
                );
              })}
            </div>

            {/* Kolom Kanan */}
            <div className="space-y-2.5">
              <div className="text-xs font-extrabold text-slate-700 uppercase tracking-wider">
                Fungsi Komponen:
              </div>
              {q.rightItems.map((item) => {
                const pairedLeftIds = Object.keys(matchingPairs).filter(
                  (lId) => matchingPairs[lId] === item.id
                );
                const pairedLeftLabels = pairedLeftIds
                  .map((id) => q.leftItems.find((l) => l.id === id)?.label)
                  .filter(Boolean);
                const expectedLeftId = Object.keys(q.correctPairs).find(
                  (lId) => q.correctPairs[lId] === item.id
                );
                const expectedLeftLabel = q.leftItems.find((l) => l.id === expectedLeftId)?.label;
                const isRightCorrect =
                  isAnswered && pairedLeftIds.length === 1 && pairedLeftIds[0] === expectedLeftId;

                return (
                  <div
                    key={item.id}
                    onClick={() => handleRightClick(item.id)}
                    className={`p-3.5 rounded-xl border-2 text-xs transition-all ${
                      isAnswered ? 'cursor-default' : 'cursor-pointer'
                    } ${
                      isAnswered
                        ? isRightCorrect
                          ? 'border-slate-900 bg-emerald-200 text-slate-900 font-bold shadow-[3px_3px_0px_0px_#0F172A]'
                          : 'border-slate-900 bg-rose-200 text-slate-900 font-bold shadow-[3px_3px_0px_0px_#0F172A]'
                        : pairedLeftIds.length > 0
                        ? 'border-slate-900 bg-sky-200 text-slate-900 font-bold shadow-[2px_2px_0px_0px_#0F172A]'
                        : selectedLeft
                        ? 'border-dashed border-primary-600 bg-sky-50 hover:bg-sky-100 text-slate-900 font-semibold shadow-[2px_2px_0px_0px_#2563EB]'
                        : 'border-slate-900 bg-surface-page hover:bg-sky-100 text-slate-900 font-medium shadow-[2px_2px_0px_0px_#0F172A]'
                    }`}
                  >
                    <p className="leading-relaxed">{item.text}</p>
                    {pairedLeftLabels.length > 0 && (
                      <span
                        className={`text-[10px] font-extrabold mt-1 inline-block ${
                          isAnswered
                            ? isRightCorrect
                              ? 'text-emerald-900'
                              : 'text-rose-900'
                            : 'text-primary-800'
                        }`}
                      >
                        Pasanganmu: {pairedLeftLabels.join(', ')}
                      </span>
                    )}
                    {isAnswered && !isRightCorrect && expectedLeftLabel && (
                      <span className="text-[10px] font-extrabold text-emerald-900 mt-0.5 block">
                        Seharusnya: {expectedLeftLabel}
                      </span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {!isAnswered && (
            <button
              onClick={handleCheckMatching}
              disabled={Object.keys(matchingPairs).length < q.leftItems.length}
              className={`mt-3 px-5 py-2.5 rounded-xl font-extrabold text-xs border-2 border-slate-900 transition-all ${
                Object.keys(matchingPairs).length < q.leftItems.length
                  ? 'bg-slate-200 text-slate-500 border-slate-400 cursor-not-allowed'
                  : 'neo-btn bg-primary-600 hover:bg-primary-700 text-white cursor-pointer'
              }`}
            >
              Periksa Pasangan
            </button>
          )}
        </div>
      )}

      {/* 3. Tipe Ordering (Mengurutkan) */}
      {q.type === 'ordering' && orderedItems && (
        <SortableOrderList
          questionKey={q.id}
          items={q.items}
          orderedItems={orderedItems}
          onMove={handleMoveOrder}
          onCheck={handleCheckOrdering}
          isAnswered={isAnswered}
          correctOrder={q.correctOrder}
          instructionText="Gunakan tombol panah Naik (▲) dan Turun (▼) untuk menyusun urutan yang tepat:"
          checkButtonClassName="neo-btn mt-4 px-5 py-2.5 bg-primary-600 hover:bg-primary-700 text-white font-extrabold text-xs rounded-xl cursor-pointer"
        />
      )}

      {/* KOTAK UMPAN BALIK BERPENJELASAN */}
      {isAnswered && currentEval && (
        <div className={`mt-6 p-4 sm:p-5 rounded-2xl border-2 border-slate-900 shadow-[4px_4px_0px_0px_#0F172A] animate-in slide-in-from-top-2 duration-300 ${
          currentEval.isCorrect
            ? 'bg-emerald-200 text-slate-900'
            : currentEval.score > 0
            ? 'bg-yellow-200 text-slate-900'
            : 'bg-rose-200 text-slate-900'
        }`}>
          <div className="flex items-center gap-2 font-extrabold text-sm">
            {currentEval.isCorrect ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-emerald-800" />
                <span>Jawaban Tepat! (+{Math.round(60 / activeQuizList.length)} Poin)</span>
              </>
            ) : currentEval.score > 0 ? (
              <>
                <AlertCircle className="w-5 h-5 text-slate-900 shrink-0" />
                <span>
                  Sebagian Tepat ({currentEval.correctCount}/{currentEval.totalCount} benar, +
                  {Math.round((60 / activeQuizList.length) * currentEval.score)} Poin). Periksa Penjelasannya:
                </span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-rose-800" />
                <span>Belum Tepat. Periksa Penjelasannya:</span>
              </>
            )}
          </div>

          <p className="text-xs sm:text-sm mt-2 leading-relaxed font-medium">
            {currentEval.feedbackText}
          </p>

          {currentEval.hint && !currentEval.isCorrect && (
            <div className="mt-3 p-3 rounded-xl bg-white border-2 border-slate-900 text-slate-900 text-xs flex items-start gap-2 font-medium">
              <Lightbulb className="w-4 h-4 text-primary-700 shrink-0 mt-0.5" />
              <div>
                <span className="font-extrabold">Petunjuk (Hint): </span>
                {currentEval.hint}
              </div>
            </div>
          )}

          <div className="mt-4 flex justify-end">
            <button
              onClick={handleNextQuestion}
              className="neo-btn px-5 py-2 bg-yellow-300 hover:bg-yellow-200 text-slate-900 font-extrabold text-xs sm:text-sm rounded-xl flex items-center gap-2 cursor-pointer"
            >
              <span>{currentIdx < activeQuizList.length - 1 ? 'Soal Berikutnya' : 'Lihat Hasil Akhir'}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
