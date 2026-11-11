import React, { useState, useEffect } from 'react';
import { CheckCircle2, XCircle, ArrowRight, RotateCcw, Award, Lightbulb, HelpCircle, Sparkles, Shuffle } from 'lucide-react';
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
      <div className="bg-white rounded-2xl border border-slate-200/80 p-6 sm:p-8 shadow-sm text-center animate-in fade-in duration-300">
        <div className="w-16 h-16 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center mx-auto shadow-md">
          <Award className="w-9 h-9 text-amber-600" />
        </div>

        <h3 className="font-heading font-bold text-2xl text-slate-900 mt-4">
          Kuis Akhir Unit Selesai!
        </h3>
        <p className="text-sm text-slate-600 mt-1">
          {quizSummary.passed
            ? 'Hebat! Kamu telah mencapai ambang ketuntasan Tujuan Pembelajaran (TP).'
            : 'Hasil tersimpan. Kamu dapat mengulang kuis dengan paket soal acak baru atau melanjutkan ke refleksi.'}
        </p>

        {/* Skor Box */}
        <div className="mt-6 max-w-md mx-auto grid grid-cols-2 gap-4">
          <div className="p-4 rounded-xl bg-primary-50 border border-primary-200">
            <span className="text-xs font-semibold text-primary-700">Skor Kuis (TP)</span>
            <div className="text-2xl font-heading font-bold text-primary-900 mt-0.5">
              {quizSummary.scorePercent} / 100
            </div>
            <span className={`text-[11px] font-bold mt-1 inline-block px-2 py-0.5 rounded-full ${
              quizSummary.passed ? 'bg-teal-100 text-teal-800' : 'bg-rose-100 text-rose-800'
            }`}>
              {quizSummary.passed ? `✓ Tuntas (≥ ${minScore})` : 'Perlu Penguatan'}
            </span>
          </div>

          <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
            <span className="text-xs font-semibold text-amber-800">Perolehan Poin</span>
            <div className="text-2xl font-heading font-bold text-amber-900 mt-0.5">
              +{quizSummary.points} Poin
            </div>
            <span className="text-[11px] font-medium text-amber-700 mt-1 inline-block">
              Tersimpan di Profil
            </span>
          </div>
        </div>

        <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleRestartQuiz}
            className="w-full sm:w-auto px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-50 text-slate-700 font-semibold text-sm flex items-center justify-center gap-2 transition-colors"
          >
            <Shuffle className="w-4 h-4 text-primary-600" />
            <span>Ulangi Kuis (Acak Soal Baru)</span>
          </button>

          <button
            onClick={onFinishQuiz}
            className="w-full sm:w-auto px-6 py-2.5 rounded-xl bg-primary-700 hover:bg-primary-800 text-white font-semibold text-sm flex items-center justify-center gap-2 shadow-md shadow-primary-700/20 transition-all hover:scale-102"
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
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-7 shadow-sm">
      {/* Quiz Header Bar */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-4 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-7 h-7 rounded-lg bg-primary-700 text-white font-heading font-bold text-xs flex items-center justify-center">
              Q{currentIdx + 1}
            </span>
            <h3 className="font-heading font-bold text-slate-900 text-base sm:text-lg">
              Soal {currentIdx + 1} dari {activeQuizList.length} • Kuis Akhir Unit
            </h3>
          </div>
          <div className="flex flex-wrap items-center gap-2 mt-1 ml-9">
            <span className="text-xs text-slate-500 font-medium">
              Tingkat Kesulitan: {q.level}
            </span>
            <span className="text-[11px] text-primary-700 font-semibold bg-primary-50 px-2 py-0.5 rounded-full inline-flex items-center gap-1">
              <Shuffle className="w-3 h-3" />
              Acak dari {quizList.length} Bank Soal
            </span>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold px-2.5 py-1 bg-amber-50 text-amber-800 border border-amber-200 rounded-full">
            Target TP: Min. {minScore}
          </span>
          <span className="text-xs font-bold px-2.5 py-1 bg-primary-50 text-primary-800 border border-primary-200 rounded-full">
            +12 Poin
          </span>
        </div>
      </div>

      {/* Progress Line */}
      <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden my-4">
        <div
          className="bg-primary-600 h-full transition-all duration-300"
          style={{ width: `${progressPercent}%` }}
        ></div>
      </div>

      {/* Pertanyaan */}
      <div className="my-5">
        <h4 className="text-base sm:text-lg font-heading font-bold text-slate-900 leading-snug">
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

            let optStyle = "bg-slate-50 border-slate-200 text-slate-800 hover:border-primary-400 hover:bg-primary-50/20";

            if (isAnswered) {
              if (isCorrect) {
                optStyle = "bg-teal-50 border-teal-500 text-teal-950 font-semibold ring-1 ring-teal-400";
              } else if (isSelected) {
                optStyle = "bg-rose-50 border-rose-400 text-rose-950 line-through ring-1 ring-rose-300";
              } else {
                optStyle = "bg-slate-50/50 border-slate-200 text-slate-400 opacity-60";
              }
            }

            return (
              <button
                key={optOrigKey}
                onClick={() => handleSelectMC(opt)}
                disabled={isAnswered}
                className={`w-full p-4 rounded-xl border text-left text-xs sm:text-sm transition-all flex items-start gap-3 ${optStyle}`}
              >
                <span className={`w-6 h-6 rounded-lg font-bold text-xs flex items-center justify-center shrink-0 ${
                  isAnswered && isCorrect
                    ? 'bg-teal-600 text-white'
                    : isAnswered && isSelected
                    ? 'bg-rose-600 text-white'
                    : 'bg-white border border-slate-300 text-slate-700'
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
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Komponen:
              </div>
              {q.leftItems.map((item) => {
                const isSelected = selectedLeft === item.id;
                const isPaired = !!matchingPairs[item.id];

                return (
                  <div
                    key={item.id}
                    onClick={() => handleLeftClick(item.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer text-xs transition-all flex items-center justify-between ${
                      isSelected
                        ? 'bg-primary-600 text-white border-primary-600 shadow-md ring-2 ring-primary-300'
                        : isPaired
                        ? 'bg-teal-50 border-teal-300 text-teal-900 font-semibold'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div>
                      <div className="font-bold">{item.label}</div>
                      <div className="text-[11px] opacity-75">{item.subtext}</div>
                    </div>
                    {isPaired && <span className="text-xs">➔ Terpasang</span>}
                  </div>
                );
              })}
            </div>

            {/* Kolom Kanan */}
            <div className="space-y-2">
              <div className="text-xs font-bold text-slate-500 uppercase tracking-wider">
                Fungsi Komponen:
              </div>
              {q.rightItems.map((item) => {
                const pairedLeftId = Object.keys(matchingPairs).find(
                  (lId) => matchingPairs[lId] === item.id
                );

                return (
                  <div
                    key={item.id}
                    onClick={() => handleRightClick(item.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer text-xs transition-all ${
                      pairedLeftId
                        ? 'bg-teal-50 border-teal-300 text-teal-900 font-medium'
                        : selectedLeft
                        ? 'bg-primary-50/50 border-dashed border-primary-400 hover:bg-primary-100/50'
                        : 'bg-slate-50 border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <p className="leading-relaxed">{item.text}</p>
                    {pairedLeftId && (
                      <span className="text-[10px] font-bold text-teal-700 mt-1 inline-block">
                        Pasangan: {q.leftItems.find((l) => l.id === pairedLeftId)?.label}
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
              className="mt-3 px-5 py-2.5 bg-primary-700 hover:bg-primary-800 disabled:bg-slate-200 text-white font-semibold text-xs rounded-xl shadow-md transition-all"
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
          instructionText="Gunakan tombol panah Naik (▲) dan Turun (▼) untuk menyusun urutan yang tepat:"
          checkButtonClassName="mt-4 px-5 py-2.5 bg-primary-700 hover:bg-primary-800 text-white font-semibold text-xs rounded-xl shadow-md transition-all"
        />
      )}

      {/* KOTAK UMPAN BALIK BERPENJELASAN */}
      {isAnswered && currentEval && (
        <div className={`mt-6 p-4 sm:p-5 rounded-2xl border animate-in slide-in-from-top-2 duration-300 ${
          currentEval.isCorrect
            ? 'bg-teal-50 border-teal-200 text-teal-950'
            : 'bg-rose-50 border-rose-200 text-rose-950'
        }`}>
          <div className="flex items-center gap-2 font-bold text-sm">
            {currentEval.isCorrect ? (
              <>
                <CheckCircle2 className="w-5 h-5 text-teal-600" />
                <span>Jawaban Tepat! (+12 Poin)</span>
              </>
            ) : (
              <>
                <XCircle className="w-5 h-5 text-rose-600" />
                <span>Belum Tepat. Periksa Penjelasannya:</span>
              </>
            )}
          </div>

          <p className="text-xs sm:text-sm mt-2 leading-relaxed">
            {currentEval.feedbackText}
          </p>

          {currentEval.hint && !currentEval.isCorrect && (
            <div className="mt-3 p-3 rounded-xl bg-white/80 border border-rose-200/80 text-xs text-rose-900 flex items-start gap-2">
              <Lightbulb className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
              <div>
                <span className="font-bold">Petunjuk (Hint): </span>
                {currentEval.hint}
              </div>
            </div>
          )}

          <div className="mt-4 flex justify-end">
            <button
              onClick={handleNextQuestion}
              className="px-5 py-2 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs sm:text-sm rounded-xl flex items-center gap-2 transition-all shadow-md"
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
