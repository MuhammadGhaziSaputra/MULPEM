import React, { useState, useMemo } from 'react';
import { Play, RotateCcw, ArrowRight, ArrowLeft, CheckCircle2, AlertCircle, Cpu, HardDrive } from 'lucide-react';
import { storage } from '../utils/storage';
import { triggerConfetti } from '../utils/confetti';
import { shuffleArray } from '../utils/shuffle';

export default function ExplorationFDESimulator({ explorationData, unitState, unitCode }) {
  const [currentCycle, setCurrentCycle] = useState(0); // 0=FETCH, 1=DECODE, 2=EXECUTE, 3=STORE
  const [selectedGuess, setSelectedGuess] = useState(null);
  const [guessResults, setGuessResults] = useState({}); // { stepId: true/false }

  // Acak opsi tebakan agar jawaban benar tidak selalu di urutan teratas
  const shuffledSteps = useMemo(() => {
    return (explorationData.steps || []).map((step) => {
      const tagged = (step.options || []).map((text, idx) => ({
        text,
        isCorrect: idx === step.correctIndex
      }));
      return {
        ...step,
        shuffledOptions: shuffleArray(tagged)
      };
    });
  }, [explorationData.steps]);

  const currentStep = shuffledSteps[currentCycle] || shuffledSteps[0];

  const cycleTabs = [
    { id: 0, label: "TAHAP 1", title: "FETCH (Ambil)", path: "RAM → CPU" },
    { id: 1, label: "TAHAP 2", title: "DECODE (Terjemahkan)", path: "Unit Kendali (CU)" },
    { id: 2, label: "TAHAP 3", title: "EXECUTE (Hitung)", path: "ALU (5 + 3)" },
    { id: 3, label: "TAHAP 4", title: "STORE (Simpan)", path: "CPU → RAM" },
  ];

  const handleNextCycle = () => {
    if (currentCycle < 3) {
      setCurrentCycle(currentCycle + 1);
      setSelectedGuess(null);
    } else {
      setCurrentCycle(0);
      setSelectedGuess(null);
    }
  };

  const handlePrevCycle = () => {
    if (currentCycle > 0) {
      setCurrentCycle(currentCycle - 1);
      setSelectedGuess(null);
    }
  };

  const handleGuess = (opt, idx) => {
    setSelectedGuess(idx);
    const isCorrect = !!opt.isCorrect;
    const nextGuessResults = { ...guessResults, [currentStep.id]: isCorrect };
    setGuessResults(nextGuessResults);

    const correctCount = Object.values(nextGuessResults).filter(Boolean).length;
    const points = Math.min(20, correctCount * 5);

    storage.saveExploration(unitCode, {
      completedSteps: Object.keys(nextGuessResults),
      points: points,
      completed: correctCount >= 3
    });

    if (isCorrect && correctCount === shuffledSteps.length) {
      triggerConfetti();
    }
  };

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-7 shadow-sm">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-600 animate-ping"></span>
            <h3 className="font-heading font-bold text-slate-900 text-lg sm:text-xl">
              Simulasi Langkah demi Langkah di Dalam CPU
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Skenario Nyata: Eksekusi Operasi Matematika 5 + 3
          </p>
        </div>

        <div className="px-3 py-1 bg-amber-100 border border-amber-200 text-amber-900 rounded-full text-xs font-semibold flex items-center gap-1.5">
          <span>⚡ Skenario: Menjumlahkan Angka 5 + 3</span>
        </div>
      </div>

      {/* 4 Step Indicator Tabs */}
      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {cycleTabs.map((tab) => {
          const isActive = currentCycle === tab.id;
          const isDone = guessResults[`s${tab.id + 1}`] === true || currentCycle > tab.id;

          return (
            <div
              key={tab.id}
              onClick={() => { setCurrentCycle(tab.id); setSelectedGuess(null); }}
              className={`p-3.5 rounded-xl border cursor-pointer transition-all ${
                isActive
                  ? 'bg-primary-700 text-white border-primary-700 shadow-md ring-2 ring-primary-300'
                  : isDone
                  ? 'bg-teal-50 border-teal-200 text-teal-900'
                  : 'bg-slate-50 border-slate-200 text-slate-600 hover:bg-slate-100'
              }`}
            >
              <div className="flex items-center justify-between text-[11px] font-bold uppercase tracking-wider mb-1">
                <span>{tab.label}</span>
                <span className={`px-1.5 py-0.5 rounded text-[10px] ${
                  isActive ? 'bg-white/20 text-white' : isDone ? 'bg-teal-200/60 text-teal-900' : 'bg-slate-200 text-slate-600'
                }`}>
                  {tab.path}
                </span>
              </div>
              <div className="font-heading font-bold text-sm">
                {tab.title}
              </div>
            </div>
          );
        })}
      </div>

      {/* Simulator Visualizer Canvas */}
      <div 
        className="mt-6 p-5 sm:p-6 rounded-2xl text-white shadow-xl relative overflow-hidden border border-indigo-900/50"
        style={{
          backgroundColor: '#0F172A',
          backgroundImage: 'linear-gradient(135deg, #0F172A 0%, #1E1B4B 100%)'
        }}
      >
        {/* Clock Pulse Badge */}
        <div className="flex items-center justify-between pb-4 border-b border-white/10 mb-5">
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-teal-400 animate-pulse"></span>
            <span className="text-xs font-mono tracking-wider text-teal-300 font-bold">
              CLOCK: ACTIVE [Pulse #0{currentCycle + 1}]
            </span>
          </div>
          <span className="text-xs font-medium text-slate-300">
            Peta Jalur Arsitektur Von Neumann
          </span>
        </div>

        {/* Diagram Komponen Interaktif */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5 items-stretch">
          {/* Box Kiri: CPU (CU + ALU + Register) */}
          <div className={`md:col-span-7 p-4 sm:p-5 rounded-xl border transition-all ${
            currentCycle === 1 || currentCycle === 2
              ? 'bg-indigo-900/40 border-primary-400 ring-2 ring-primary-500/30'
              : 'bg-white/5 border-white/10'
          }`}>
            <div className="flex items-center justify-between mb-4">
              <span className="text-xs font-mono font-bold text-primary-300 flex items-center gap-1.5">
                <Cpu className="w-4 h-4" /> CENTRAL PROCESSING UNIT (CPU)
              </span>
              <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-white/10 text-slate-300">
                μ4 Core
              </span>
            </div>

            <div className="space-y-3">
              {/* Control Unit */}
              <div className={`p-3 rounded-lg border transition-all ${
                currentCycle === 1
                  ? 'bg-primary-600/50 border-primary-400 text-white ring-1 ring-primary-300'
                  : 'bg-white/5 border-white/10 text-slate-300'
              }`}>
                <div className="flex items-center justify-between text-xs font-bold mb-1">
                  <span>Unit Kendali (Control Unit)</span>
                  {currentCycle === 1 && (
                    <span className="px-1.5 py-0.5 text-[9px] bg-teal-400 text-slate-900 rounded font-mono font-bold">
                      MENERJEMAHKAN
                    </span>
                  )}
                </div>
                <div className="font-mono text-[11px] text-teal-300">
                  IR: [0001 0101 0011] → OP: ADD R1, R2
                </div>
                <div className="text-[10px] text-slate-300 mt-1">
                  Membongkar opcode instruksi: sinyal penjumlahan disiapkan untuk ALU.
                </div>
              </div>

              {/* ALU + Registers Grid */}
              <div className="grid grid-cols-2 gap-3">
                {/* ALU */}
                <div className={`p-3 rounded-lg border transition-all ${
                  currentCycle === 2
                    ? 'bg-teal-600/40 border-teal-400 text-white ring-2 ring-teal-400/40'
                    : 'bg-white/5 border-white/10 text-slate-300'
                }`}>
                  <div className="text-xs font-bold mb-1 flex items-center justify-between">
                    <span>ALU</span>
                    {currentCycle === 2 && (
                      <span className="text-[9px] px-1 bg-amber-400 text-slate-900 rounded font-bold">
                        HITUNG
                      </span>
                    )}
                  </div>
                  <div className="font-mono text-[11px] text-amber-300 font-bold">
                    {currentCycle === 2 ? '5 + 3 = 8' : 'Menunggu Sinyal...'}
                  </div>
                  <div className="text-[10px] text-slate-400 mt-1">
                    Arithmetic Adder
                  </div>
                </div>

                {/* Registers */}
                <div className="p-3 rounded-lg bg-white/5 border border-white/10 text-slate-300">
                  <div className="text-xs font-bold mb-1">Registers</div>
                  <div className="font-mono text-[10px] space-y-0.5 text-slate-300">
                    <div>R1: 0000 0101 (5)</div>
                    <div>R2: 0000 0011 (3)</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Box Kanan: Memori RAM */}
          <div className={`md:col-span-5 p-4 sm:p-5 rounded-xl border flex flex-col justify-between transition-all ${
            currentCycle === 0 || currentCycle === 3
              ? 'bg-teal-950/40 border-teal-400 ring-2 ring-teal-400/30'
              : 'bg-white/5 border-white/10'
          }`}>
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-mono font-bold text-teal-300 flex items-center gap-1.5">
                  <HardDrive className="w-4 h-4" /> MEMORI UTAMA (RAM)
                </span>
              </div>

              <div className="space-y-1.5 font-mono text-[11px]">
                <div className={`p-2 rounded border flex items-center justify-between ${
                  currentCycle === 0
                    ? 'bg-teal-600/30 border-teal-400 text-white font-bold'
                    : 'bg-white/5 border-white/5 text-slate-400'
                }`}>
                  <span>0x00A1</span>
                  <span>ADD 5, 3</span>
                </div>
                <div className={`p-2 rounded border flex items-center justify-between ${
                  currentCycle === 3
                    ? 'bg-teal-600/30 border-teal-400 text-white font-bold'
                    : 'bg-white/5 border-white/5 text-slate-500'
                }`}>
                  <span>0x00A2</span>
                  <span>{currentCycle === 3 ? 'STORE R3 (= 8)' : 'STORE R3'}</span>
                </div>
                <div className="p-2 rounded bg-white/5 border border-white/5 text-slate-500 flex items-center justify-between">
                  <span>0x00A3</span>
                  <span>HALT</span>
                </div>
              </div>
            </div>

            <div className="mt-4 pt-3 border-t border-white/10 text-[11px] text-slate-300">
              {currentCycle === 0 && (
                <span className="text-teal-300 font-semibold flex items-center gap-1">
                  ✓ Instruksi disalin ke Instruction Register CPU (Fetch).
                </span>
              )}
              {currentCycle === 1 && (
                <span className="text-primary-300 font-semibold">
                  ● CPU memegang instruksi dan sedang menerjemahkan.
                </span>
              )}
              {currentCycle === 2 && (
                <span className="text-amber-300 font-semibold">
                  ★ ALU mengeksekusi operasi matematika.
                </span>
              )}
              {currentCycle === 3 && (
                <span className="text-teal-300 font-semibold">
                  ✓ Hasil perhitungan (8) disimpan ke alamat Memori RAM (Execute Store).
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Kontrol Navigasi Siklus */}
        <div className="mt-6 flex flex-wrap items-center justify-between gap-3 pt-4 border-t border-white/10">
          <button
            onClick={handlePrevCycle}
            disabled={currentCycle === 0}
            className={`px-4 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 transition-all ${
              currentCycle === 0
                ? 'opacity-30 cursor-not-allowed bg-white/10 text-slate-400'
                : 'bg-white/10 hover:bg-white/20 text-white'
            }`}
          >
            <ArrowLeft className="w-3.5 h-3.5" /> Langkah Sebelumnya
          </button>

          <button
            onClick={handleNextCycle}
            className="px-5 py-2.5 rounded-xl bg-primary-600 hover:bg-primary-500 text-white font-semibold text-xs flex items-center gap-2 shadow-lg shadow-primary-600/40 transition-all hover:scale-102"
          >
            <span>{currentCycle === 3 ? 'Kembali ke Fetch (Ulang Siklus)' : 'Jalankan Langkah Berikutnya'}</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Tebakan Interaktif Skenario */}
      <div className="mt-6 p-5 rounded-2xl bg-amber-50/70 border border-amber-200">
        <div className="flex flex-wrap items-center justify-between gap-2 mb-1">
          <div className="text-xs font-bold text-amber-900 uppercase tracking-wider flex items-center gap-1.5">
            <AlertCircle className="w-4 h-4 text-amber-700" />
            <span>Uji Prediksi Logikamu • Tahap {currentCycle + 1} dari 4</span>
          </div>
          <span className={`px-2.5 py-0.5 rounded-full text-[11px] font-bold border ${
            unitState?.exploration?.completed
              ? 'bg-teal-50 text-teal-800 border-teal-200'
              : 'bg-white text-amber-800 border-amber-200'
          }`}>
            {unitState?.exploration?.completed
              ? `✓ Simulasi Tuntas (+${unitState?.exploration?.points || 0} Poin)`
              : `Minimal 3 Tebakan Benar (+${unitState?.exploration?.points || 0} Poin)`}
          </span>
        </div>
        <p className="text-sm font-semibold text-slate-900 mt-1">
          {currentStep.situation}
        </p>

        <div className="mt-3 space-y-2">
          {currentStep.shuffledOptions.map((opt, idx) => {
            const isSelected = selectedGuess === idx;
            const isAnswered = selectedGuess !== null;
            const isCorrect = !!opt.isCorrect;

            let btnStyle = "bg-white border-slate-200 text-slate-800 hover:bg-amber-100/50";
            if (isAnswered) {
              if (isCorrect) {
                btnStyle = "bg-teal-50 border-teal-400 text-teal-900 font-semibold ring-1 ring-teal-400";
              } else if (isSelected) {
                btnStyle = "bg-rose-50 border-rose-300 text-rose-900 line-through";
              }
            }

            return (
              <button
                key={idx}
                onClick={() => handleGuess(opt, idx)}
                disabled={isAnswered}
                className={`w-full p-3 rounded-xl border text-left text-xs font-medium transition-all flex items-center justify-between ${btnStyle}`}
              >
                <span>{opt.text}</span>
                {isAnswered && isCorrect && (
                  <CheckCircle2 className="w-4 h-4 text-teal-600 shrink-0 ml-2" />
                )}
              </button>
            );
          })}
        </div>

        {selectedGuess !== null && (
          <div className="mt-3 p-3 rounded-xl bg-white border border-amber-200 text-xs text-slate-700 leading-relaxed flex flex-col sm:flex-row sm:items-center justify-between gap-2">
            {currentStep.shuffledOptions[selectedGuess]?.isCorrect ? (
              <span className="text-teal-800 font-medium">
                ✅ {currentStep.explanation} (+5 Poin Prediksi)
              </span>
            ) : (
              <>
                <span className="text-rose-800 font-medium">
                  ❌ Belum tepat. Ingat urutan siklus kaku: Ambil (Fetch) ➔ Baca (Decode) ➔ Jalankan (Execute).
                </span>
                <button
                  onClick={() => setSelectedGuess(null)}
                  className="px-3 py-1.5 rounded-lg bg-rose-50 hover:bg-rose-100 border border-rose-200 text-rose-800 font-semibold text-xs flex items-center gap-1 shrink-0 self-start"
                >
                  <RotateCcw className="w-3 h-3" />
                  <span>Ulangi Tebakan</span>
                </button>
              </>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
