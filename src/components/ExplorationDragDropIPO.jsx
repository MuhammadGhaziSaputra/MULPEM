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
    { id: 'input', label: '1. TAHAP INPUT', sub: 'Pemasukan Data Mentah', headerBg: 'bg-sky-200' },
    { id: 'process', label: '2. TAHAP PROCESS', sub: 'Pemrosesan di CPU', headerBg: 'bg-yellow-300' },
    { id: 'output', label: '3. TAHAP OUTPUT', sub: 'Penyajian Informasi', headerBg: 'bg-emerald-300' }
  ];

  const handleSelectCard = (cardId) => {
    setSelectedCardId(cardId === selectedCardId ? null : cardId);
  };

  const handlePlaceCard = (zoneId) => {
    if (!selectedCardId) return;
    const nextPlacements = { ...placements, [selectedCardId]: zoneId };
    setPlacements(nextPlacements);
    setSelectedCardId(null);
    setIsChecked(false);
    setResults(null);
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
    <div className="neo-card p-5 sm:p-7">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-5 border-b-2 border-slate-900/15">
        <div>
          <div className="flex items-center gap-2">
            <span className="w-2.5 h-2.5 rounded-full bg-primary-600 border border-slate-900 animate-ping"></span>
            <h3 className="font-heading font-extrabold text-slate-900 text-lg sm:text-xl">
              Aktivitas Interaktif: Susun Alur Data IPO
            </h3>
          </div>
          <p className="text-xs sm:text-sm text-slate-600 font-medium mt-0.5">
            Pilih kartu kasus, lalu ketuk zona wadah yang sesuai (Input, Proses, atau Output).
          </p>
        </div>

        <button
          onClick={handleReset}
          className="neo-btn-sm px-3 py-1.5 text-xs font-extrabold text-slate-900 bg-white hover:bg-yellow-200 rounded-xl flex items-center gap-1.5 cursor-pointer"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Atur Ulang</span>
        </button>
      </div>

      {/* Kartu yang belum ditempatkan */}
      <div className="mt-6">
        <div className="text-xs font-extrabold text-slate-700 uppercase tracking-wider mb-2.5">
          Pilihan Kasus Komputasi ({unplacedCards.length} Kartu Tersedia):
        </div>
        {unplacedCards.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {unplacedCards.map((card) => {
              const isSelected = selectedCardId === card.id;
              return (
                <div
                  key={card.id}
                  onClick={() => handleSelectCard(card.id)}
                  className={`p-3.5 rounded-xl border-2 border-slate-900 cursor-pointer text-xs font-bold transition-all flex items-center justify-between gap-2 ${
                    isSelected
                      ? 'bg-yellow-300 text-slate-900 shadow-[4px_4px_0px_0px_#0F172A] -translate-x-0.5 -translate-y-0.5'
                      : 'bg-surface-page text-slate-900 hover:bg-sky-100 shadow-[2px_2px_0px_0px_#0F172A]'
                  }`}
                >
                  <span>{card.text}</span>
                  <span className={`text-[10px] font-extrabold px-2 py-0.5 rounded border border-slate-900 shrink-0 ${
                    isSelected ? 'bg-white text-slate-900' : 'bg-white text-slate-800'
                  }`}>
                    {isSelected ? 'Ketuk Wadah' : 'Pilih'}
                  </span>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="p-3.5 bg-emerald-200 border-2 border-slate-900 shadow-[3px_3px_0px_0px_#0F172A] rounded-xl text-slate-900 text-xs font-extrabold text-center">
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
                  ? 'border-dashed border-primary-600 bg-sky-50 cursor-pointer hover:bg-sky-100 shadow-[4px_4px_0px_0px_#2563EB]'
                  : 'border-slate-900 bg-white shadow-[4px_4px_0px_0px_#0F172A]'
              }`}
            >
              <div>
                <div className={`flex items-center justify-between p-2.5 rounded-xl border-2 border-slate-900 ${zone.headerBg}`}>
                  <div>
                    <h4 className="font-heading font-extrabold text-slate-900 text-sm">
                      {zone.label}
                    </h4>
                    <p className="text-[11px] text-slate-800 font-semibold">{zone.sub}</p>
                  </div>
                  <span className="text-xs font-extrabold px-2.5 py-0.5 rounded-full bg-white border-2 border-slate-900 text-slate-900">
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
                        className={`p-3 rounded-xl border-2 border-slate-900 text-xs leading-relaxed transition-all relative shadow-[2px_2px_0px_0px_#0F172A] ${
                          isChecked && evalResult
                            ? evalResult.isCorrect
                              ? 'bg-emerald-200 text-slate-900 font-bold'
                              : 'bg-rose-200 text-slate-900 font-bold'
                            : 'bg-surface-page text-slate-900 font-semibold'
                        }`}
                      >
                        <div className="flex items-start justify-between gap-1.5">
                          <span>{card.text}</span>
                          {!isChecked && (
                            <button
                              onClick={(e) => handleRemovePlacement(card.id, e)}
                              className="text-slate-700 hover:text-rose-700 text-xs px-1 font-extrabold cursor-pointer"
                              title="Hapus dari wadah"
                            >
                              ✕
                            </button>
                          )}
                          {isChecked && evalResult && (
                            <span>
                              {evalResult.isCorrect ? (
                                <CheckCircle className="w-4 h-4 text-emerald-800 inline" />
                              ) : (
                                <XCircle className="w-4 h-4 text-rose-800 inline" />
                              )}
                            </span>
                          )}
                        </div>
                        {isChecked && evalResult && !evalResult.isCorrect && card.hint && (
                          <p className="mt-1.5 text-[11px] font-semibold text-slate-900 bg-white px-2.5 py-1.5 rounded-lg border-2 border-slate-900 leading-snug">
                            Petunjuk: {card.hint}
                          </p>
                        )}
                      </div>
                    );
                  })}

                  {zoneCards.length === 0 && (
                    <div className="py-8 text-center text-xs text-slate-500 font-medium italic">
                      Wadah kosong. Ketuk kartu di atas lalu ketuk wadah ini.
                    </div>
                  )}
                </div>
              </div>

              {selectedCardId && (
                <div className="mt-3 py-1.5 text-center text-xs font-extrabold text-slate-900 bg-yellow-300 border-2 border-slate-900 rounded-xl">
                  + Masukkan ke sini
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Button Check & Feedback */}
      <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 pt-4 border-t-2 border-slate-900/15">
        <div>
          {results && (
            <div className="flex items-center gap-2 flex-wrap">
              <span className={`text-sm font-extrabold ${results.correctCount === cards.length ? 'text-emerald-800' : 'text-slate-900'}`}>
                Hasil: {results.correctCount} dari {cards.length} Kartu Benar (+{results.points} Poin)
              </span>
              {results.correctCount === cards.length && (
                <span className="text-xs px-2.5 py-0.5 bg-emerald-300 border-2 border-slate-900 text-slate-900 rounded-full font-extrabold">
                  Sempurna! 🌟
                </span>
              )}
            </div>
          )}
        </div>

        <button
          onClick={handleCheckAnswers}
          disabled={!allPlaced}
          className={`px-6 py-2.5 rounded-xl font-extrabold text-sm transition-all border-2 border-slate-900 ${
            allPlaced
              ? 'neo-btn bg-primary-600 hover:bg-primary-700 text-white cursor-pointer'
              : 'bg-slate-200 text-slate-500 border-slate-400 cursor-not-allowed'
          }`}
        >
          {isChecked ? 'Periksa Ulang Jawaban' : 'Periksa Alur IPO'}
        </button>
      </div>
    </div>
  );
}
