import React, { useLayoutEffect, useRef, useState, useEffect } from 'react';

const useIsomorphicLayoutEffect =
  typeof window !== 'undefined' ? useLayoutEffect : useEffect;

/**
 * Daftar kartu langkah bertipe 'ordering' dengan animasi FLIP + lift ("keangkat")
 * saat pengguna menukar posisi kartu menggunakan tombol panah Naik (▲) dan Turun (▼).
 */
export default function SortableOrderList({
  questionKey,
  items = [],
  orderedItems = [],
  onMove,
  onCheck,
  isAnswered = false,
  correctOrder = null,
  instructionText = 'Gunakan tombol panah Naik (▲) dan Turun (▼) untuk menyusun urutan yang benar:',
  checkButtonClassName = 'mt-2 px-4 py-2 bg-primary-700 hover:bg-primary-800 text-white font-semibold text-xs rounded-xl shadow-sm transition-all'
}) {
  const itemRefs = useRef({});
  const pendingRectsRef = useRef(null);
  const pendingSwapRef = useRef(null);
  const swapTimerRef = useRef(null);
  const [activeSwap, setActiveSwap] = useState(null);

  // Bersihkan status highlight & animasi ketika soal berubah
  useEffect(() => {
    if (swapTimerRef.current) {
      clearTimeout(swapTimerRef.current);
      swapTimerRef.current = null;
    }
    pendingRectsRef.current = null;
    pendingSwapRef.current = null;
    setActiveSwap(null);
  }, [questionKey]);

  // Bersihkan timer saat unmount
  useEffect(() => {
    return () => {
      if (swapTimerRef.current) {
        clearTimeout(swapTimerRef.current);
      }
    };
  }, []);

  /**
   * Tangkap posisi visual seluruh kartu sebelum urutan state berubah agar FLIP
   * tetap akurat meskipun teks kartu berbeda tinggi atau tombol diklik cepat.
   */
  const handleTriggerMove = (index, direction) => {
    if (isAnswered || !orderedItems) return;
    const targetIdx = index + direction;
    if (targetIdx < 0 || targetIdx >= orderedItems.length) return;

    const snapshot = {};
    orderedItems.forEach((id) => {
      const el = itemRefs.current[id];
      if (el) {
        snapshot[id] = el.getBoundingClientRect().top;
      }
    });

    const movedId = orderedItems[index];
    const displacedId = orderedItems[targetIdx];

    pendingRectsRef.current = snapshot;
    pendingSwapRef.current = { movedId, displacedId, direction };
    setActiveSwap({ movedId, displacedId, direction });

    if (swapTimerRef.current) {
      clearTimeout(swapTimerRef.current);
    }
    swapTimerRef.current = setTimeout(() => {
      setActiveSwap(null);
      swapTimerRef.current = null;
    }, 420);

    onMove(index, direction);
  };

  // Jalankan animasi pertukaran FLIP + efek keangkat (lift) tepat sebelum browser paint
  useIsomorphicLayoutEffect(() => {
    const prevTops = pendingRectsRef.current;
    const swapMeta = pendingSwapRef.current;
    pendingRectsRef.current = null;
    pendingSwapRef.current = null;

    if (!prevTops) return;

    const prefersReducedMotion =
      typeof window !== 'undefined' &&
      window.matchMedia?.('(prefers-reduced-motion: reduce)').matches;

    orderedItems.forEach((id) => {
      const el = itemRefs.current[id];
      if (!el || typeof el.animate !== 'function') return;

      // Batalkan animasi lama agar getBoundingClientRect membaca slot DOM bersih
      if (typeof el.getAnimations === 'function') {
        el.getAnimations().forEach((anim) => anim.cancel());
      }

      const prevTop = prevTops[id];
      if (prevTop === undefined) return;

      const lastTop = el.getBoundingClientRect().top;
      const deltaY = prevTop - lastTop;
      if (Math.abs(deltaY) < 0.5) return;

      if (prefersReducedMotion) {
        el.animate(
          [
            { transform: `translate3d(0, ${deltaY * 0.25}px, 0)` },
            { transform: 'translate3d(0, 0, 0)' }
          ],
          { duration: 150, easing: 'ease-out' }
        );
        return;
      }

      const isMovedCard = swapMeta?.movedId === id;
      const isDisplacedCard = swapMeta?.displacedId === id;

      if (isMovedCard) {
        // Kartu pilihan pengguna terangkat (scale + elevasi bayangan) saat berpindah posisi
        el.animate(
          [
            {
              transform: `translate3d(0, ${deltaY}px, 0) scale(1)`,
              boxShadow: '0 1px 2px rgba(15, 23, 42, 0.05)'
            },
            {
              offset: 0.35,
              transform: `translate3d(0, ${deltaY * 0.52}px, 0) scale(1.032)`,
              boxShadow:
                '0 18px 34px -8px rgba(67, 56, 202, 0.24), 0 8px 14px -4px rgba(15, 23, 42, 0.12)'
            },
            {
              offset: 1,
              transform: 'translate3d(0, 0, 0) scale(1)',
              boxShadow: '0 1px 2px rgba(15, 23, 42, 0.05)'
            }
          ],
          {
            duration: 380,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
          }
        );
      } else if (isDisplacedCard) {
        // Kartu tetangga sedikit mundur ke belakang saat bertukar tempat ke slot kosong
        el.animate(
          [
            { transform: `translate3d(0, ${deltaY}px, 0) scale(1)` },
            { offset: 0.4, transform: `translate3d(0, ${deltaY * 0.42}px, 0) scale(0.975)` },
            { offset: 1, transform: 'translate3d(0, 0, 0) scale(1)' }
          ],
          {
            duration: 380,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
          }
        );
      } else {
        el.animate(
          [
            { transform: `translate3d(0, ${deltaY}px, 0)` },
            { transform: 'translate3d(0, 0, 0)' }
          ],
          {
            duration: 340,
            easing: 'cubic-bezier(0.22, 1, 0.36, 1)'
          }
        );
      }
    });
  }, [orderedItems]);

  return (
    <div className="space-y-2.5 relative">
      <p className="text-xs text-slate-500">
        {instructionText}
      </p>

      <div className="space-y-2.5 relative">
        {orderedItems.map((itemId, idx) => {
          const itemObj = items.find((i) => i.id === itemId);
          const showCorrectness = isAnswered && Array.isArray(correctOrder);
          const isPositionRight = showCorrectness && correctOrder[idx] === itemId;
          const isMoved = !isAnswered && activeSwap?.movedId === itemId;
          const isDisplaced = !isAnswered && activeSwap?.displacedId === itemId;

          let cardClass = 'bg-slate-50 border-slate-200 hover:border-slate-300';
          if (showCorrectness) {
            cardClass = isPositionRight
              ? 'bg-teal-50 border-teal-400 text-teal-950'
              : 'bg-rose-50 border-rose-300 text-rose-950';
          } else if (isMoved) {
            cardClass = 'z-20 bg-primary-50/85 border-primary-400 ring-2 ring-primary-200/80 text-slate-900';
          } else if (isDisplaced) {
            cardClass = 'z-10 bg-slate-100/90 border-slate-300';
          }

          return (
            <div
              key={itemId}
              ref={(el) => {
                if (el) {
                  itemRefs.current[itemId] = el;
                } else {
                  delete itemRefs.current[itemId];
                }
              }}
              className={`relative will-change-transform p-3 sm:p-3.5 rounded-xl border flex items-center justify-between gap-3 text-xs sm:text-sm font-medium transition-colors duration-200 ${cardClass}`}
            >
              <div className="flex items-center gap-2.5">
                <span
                  className={`w-6 h-6 rounded-full font-bold text-xs flex items-center justify-center shrink-0 transition-colors duration-200 ${
                    isMoved
                      ? 'bg-primary-600 text-white shadow-sm'
                      : 'bg-primary-100 text-primary-800'
                  }`}
                >
                  {idx + 1}
                </span>
                <span>{itemObj?.text}</span>
              </div>

              {!isAnswered && (
                <div className="flex items-center gap-1 shrink-0">
                  <button
                    type="button"
                    onClick={() => handleTriggerMove(idx, -1)}
                    disabled={idx === 0}
                    className="p-1.5 w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:border-primary-400 hover:bg-primary-50 hover:text-primary-700 active:scale-90 disabled:opacity-25 disabled:pointer-events-none transition-all duration-150"
                    title="Geser ke atas"
                    aria-label="Geser langkah ke atas"
                  >
                    ▲
                  </button>
                  <button
                    type="button"
                    onClick={() => handleTriggerMove(idx, 1)}
                    disabled={idx === orderedItems.length - 1}
                    className="p-1.5 w-8 h-8 flex items-center justify-center rounded-lg border border-slate-200 bg-white text-slate-700 hover:border-primary-400 hover:bg-primary-50 hover:text-primary-700 active:scale-90 disabled:opacity-25 disabled:pointer-events-none transition-all duration-150"
                    title="Geser ke bawah"
                    aria-label="Geser langkah ke bawah"
                  >
                    ▼
                  </button>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {!isAnswered && (
        <button
          type="button"
          onClick={onCheck}
          className={checkButtonClassName}
        >
          Periksa Urutan Alur
        </button>
      )}
    </div>
  );
}
