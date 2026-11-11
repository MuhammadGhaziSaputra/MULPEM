import React, { useState } from 'react';
import { ArrowRight, CheckCircle, XCircle, RotateCcw, Sparkles } from 'lucide-react';
import { storage } from '../utils/storage';
import { triggerConfetti } from '../utils/confetti';
import { shuffleArray } from '../utils/shuffle';

export default function ExplorationDragDropIPO({ explorationData, unitState, unitCode, onComplete }) {
  // Kartu skenario diacak agar posisi Input/Process/Output tidak monoton berurutan
  const [cards, setCards] = useState(() => shuffleArray(explorationData.cards));
  // State penempatan: { cardId: 'input' | 'process' | 'output' }
  const [placements, setPlacements] = useState(unitState.exploration.placedCards || {});
  const [selectedCardId, setSelectedCardId] = useState(null);
  const [isChecked, setIsChecked] = useState(false);
  const [results, setResults] = useState(null);

  const zones = [
    { id: 'input', label: '1. TAHAP INPUT', sub: 'Pemasukan Data Mentah', color: 'blue' },
    { id: 'process', label: '2. TAHAP PROCESS', sub: 'Pemrosesan di CPU', color: 'indigo' },
    { id: 'output', label: '3. TAHAP OUTPUT', sub: 'Penyajian Informasi', color: 'teal' }
  ];

  const handleSelectCard = (cardId) => {
    setSelectedCardId(cardId === selectedCardId ? null : cardId);
  };

  const handlePlaceCard = (zoneId) => {
    if (!selectedCardId) return;
    const nextPlacements = { ...placements, [selectedCardId]: zoneId };
    setPlacements(nextPlacements);
    setSelectedCardId(null);
  };

  const handleRemovePlacement = (cardId, e) => {
    e.stopPropagation();
    const nextPlacements = { ...placements };
    delete nextPlacements[cardId];
    setPlacements(nextPlacements);
    setIsChecked(false);
    setResults(null);
  };

  const handleCheckAnswers = () => {
    let correctCount = 0;
    const evaluation = {};

    cards.forEach((card) => {
      const placedZone = placements[card.id];
      const isCorrect = placedZone === card.targetGroup;
      if (isCorrect) correctCount++;
      evaluation[card.id] = { isCorrect, correctZone: card.targetGroup };
    });

    const points = Math.round((20 * correctCount) / cards.length);
    setIsChecked(true);
    setResults({ correctCount, evaluation, points });

    storage.saveExploration(unitCode, {
      placedCards: placements,
      points: points,
      completed: correctCount >= 4
    });

    if (correctCount === cards.length) {
      triggerConfetti();
    }
  };

  const handleReset = () => {
    setCards(shuffleArray(explorationData.cards));
    setPlacements({});
    setSelectedCardId(null);
    setIsChecked(false);
    setResults(null);
  };

  const unplacedCards = cards.filter((c) => !placements[c.id]);
  const allPlaced = Object.keys(placements).length === cards.length;

  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-5 sm:p-7 shadow-sm">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 border-b border-slate-100">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-primary-600 animate-ping"></span>
            <h3 className="font-heading font-bold text-slate-900 text-lg sm:text-xl">
              Aktivitas Interaktif: Susun Alur Data IPO
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-500 mt-0.5">
            Pilih kartu kasus, lalu ketuk zona wadah yang sesuai (Input, Proses, atau Output).
          </p>
        </div>

        <button
          onClick={handleReset}
          className="px-3 py-1.5 text-xs font-semibold text-slate-600 hover:text-slate-900 bg-slate-100 hover:bg-slate-200 rounded-lg flex items-center gap-1.5 transition-colors"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Atur Ulang</span>
        </button>
      </div>

      {/* Kartu yang belum ditempatkan */}
      <div className="mt-6">
        <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-2">
          Pilihan Kasus Komputasi ({unplacedCards.length} Kartu Tersedia):
        </div>
        {unplacedCards.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2.5">
            {unplacedCards.map((card) => {
              const isSelected = selectedCardId === card.id;
              return (
                <div
                  key={card.id}
                  onClick={() => handleSelectCard(card.id)}
                  className={`p-3.5 rounded-xl border cursor-pointer text-xs font-medium transition-all flex items-center justify-between gap-2 ${
                    isSelected
                      ? 'bg-primary-600 text-white border-primary-600 shadow-md scale-102 ring-2 ring-primary-300'
                      : 'bg-slate-50 border-slate-200 text-slate-800 hover:border-primary-400 hover:bg-primary-50/30'
                  }`}
                >
                  <span>{card.text}</span>
                  <span className="text-[10px] font-bold px-1.5 py-0.5 rounded bg-black/10 shrink-0">
                    {isSelected ? 'Ketuk Wadah' : 'Pilih'}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-3 bg-teal-50 border border-teal-200 rounded-xl text-teal-800 text-xs font-medium text-center">
            Semua kartu telah ditempatkan ke dalam wadah! Ketuk tombol "Periksa Alur IPO" di bawah.
          </div>
        )}
      </div>

      {/* Tiga Drop Zone: Input, Process, Output */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        {zones.map((zone) => {
          const zoneCards = cards.filter((c) => placements[c.id] === zone.id);

          return (
            <div
              key={zone.id}
              onClick={() => handlePlaceCard(zone.id)}
              className={`rounded-2xl border-2 p-4 transition-all min-h-[220px] flex flex-col justify-between ${
                selectedCardId
                  ? 'border-dashed border-primary-500 bg-primary-50/20 cursor-pointer hover:bg-primary-50/40 animate-pulse-subtle'
                  : 'border-slate-200 bg-slate-50/50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between pb-2 border-b border-slate-200">
                  <div>
                    <h4 className="font-heading font-bold text-slate-900 text-sm">
                      {zone.label}
                    </h4>
                    <p className="text-[11px] text-slate-500">{zone.sub}</p>
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-white border border-slate-200 text-slate-700">
                    {zoneCards.length}
                  </span>
                </div>

                {/* List Kartu dalam Zone */}
                <div className="mt-3 space-y-2">
                  {zoneCards.map((card) => {
                    const evalResult = results?.evaluation[card.id];

                    return (
                      <div
                        key={card.id}
                        className={`p-3 rounded-xl border text-xs leading-relaxed transition-all relative ${
                          isChecked && evalResult
                            ? evalResult.isCorrect
                              ? 'bg-teal-50 border-teal-300 text-teal-900 font-medium'
                              : 'bg-rose-50 border-rose-300 text-rose-900 font-medium'
                            : 'bg-white border-slate-200 text-slate-800 shadow-sm'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-1.5">
                          <span>{card.text}</span>
                          {!isChecked && (
                            <button
                              onClick={(e) => handleRemovePlacement(card.id, e)}
                              className="text-slate-400 hover:text-rose-500 text-xs px-1 font-bold"
                              title="Hapus dari wadah"
                            >
                              ✕
                            </button>
                          )}
                          {isChecked && evalResult && (
                            <span>
                              {evalResult.isCorrect ? (
                                <CheckCircle className="w-4 h-4 text-teal-600 inline" />
                              ) : (
                                <XCircle className="w-4 h-4 text-rose-600 inline" />
                              )}
                            </span>
                          )}
                        </div>
                      </div>
                    );
                  })}

                  {zoneCards.length === 0 && (
                    <div className="py-8 text-center text-xs text-slate-400 italic">
                      Wadah kosong. Ketuk kartu di atas lalu ketuk wadah ini.
                    </div>
                  )}
                </div>
              </div>

              {selectedCardId && (
                <div className="mt-3 py-1.5 text-center text-xs font-bold text-primary-700 bg-primary-100/60 rounded-lg">
                  + Masukkan ke sini
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Button Check & Feedback */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t border-slate-100">
        <div>
          {results && (
            <div className="flex items-center gap-2">
              <span className={`text-sm font-bold ${results.correctCount === cards.length ? 'text-teal-700' : 'text-slate-700'}`}>
                Hasil: {results.correctCount} dari {cards.length} Kartu Benar (+{results.points} Poin)
              </span>
              {results.correctCount === cards.length && (
                <span className="text-xs px-2 py-0.5 bg-teal-100 text-teal-800 rounded-full font-bold">
                  Sempurna! 🌟
                </span>
              )}
            </div>
          )}
        </div>

        <button
          onClick={handleCheckAnswers}
          disabled={!allPlaced}
          className={`px-6 py-2.5 rounded-xl font-semibold text-sm transition-all shadow-md ${
            allPlaced
              ? 'bg-primary-700 hover:bg-primary-800 text-white shadow-primary-700/20'
              : 'bg-slate-200 text-slate-400 cursor-not-allowed'
          }`}
        >
          {isChecked ? 'Periksa Ulang Jawaban' : 'Periksa Alur IPO'}
        </button>
      </div>
    </div>
  );
}
