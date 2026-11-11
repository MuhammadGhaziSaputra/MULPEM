/**
 * Utilitas Pengacakan (Fisher-Yates Shuffle) untuk Bank Soal, Opsi Jawaban, dan Kartu Eksplorasi.
 */

const MC_LABELS = ['A', 'B', 'C', 'D', 'E', 'F'];

/**
 * Mengacak urutan elemen array tanpa mengubah array asli (Fisher-Yates).
 */
export function shuffleArray(list) {
  if (!Array.isArray(list)) return [];
  const copy = [...list];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

/**
 * Mengacak array item soal bertipe 'ordering' dan memastikan susunan awal
 * tidak langsung identik dengan kunci jawaban (selama item >= 2).
 */
export function shuffleOrderingItems(items, correctOrder) {
  if (!Array.isArray(items) || items.length < 2) {
    return (items || []).map((i) => i.id);
  }

  let shuffledIds = shuffleArray(items).map((i) => i.id);

  // Cegah urutan acak langsung sama persis dengan kunci jawaban
  const isAlreadySolved =
    Array.isArray(correctOrder) &&
    shuffledIds.length === correctOrder.length &&
    shuffledIds.every((id, idx) => id === correctOrder[idx]);

  if (isAlreadySolved) {
    [shuffledIds[0], shuffledIds[1]] = [shuffledIds[1], shuffledIds[0]];
  }

  return shuffledIds;
}

/**
 * Menyiapkan daftar soal untuk Kuis Akhir Unit:
 * 1. Mengacak dan mengambil sejumlah soal dari bank soal (`count`).
 * 2. Mengacak posisi opsi A/B/C/D pada soal pilihan ganda sambil mempertahankan kunci aslinya.
 * 3. Mengacak kolom kiri & kanan pada soal menjodohkan (matching).
 * 4. Menyiapkan urutan awal acak pada soal mengurutkan (ordering).
 */
export function prepareQuizQuestions(quizPool, count = 5) {
  if (!Array.isArray(quizPool) || quizPool.length === 0) return [];

  const picked = shuffleArray(quizPool).slice(0, Math.min(count, quizPool.length));

  return picked.map((q) => {
    if (q.type === 'multiple-choice' && Array.isArray(q.options)) {
      const shuffledOptions = shuffleArray(q.options).map((opt, idx) => ({
        ...opt,
        origKey: opt.key,
        displayKey: MC_LABELS[idx] || String(idx + 1),
        isCorrect: opt.key === q.correctKey
      }));
      return {
        ...q,
        options: shuffledOptions
      };
    }

    if (q.type === 'matching') {
      return {
        ...q,
        leftItems: shuffleArray(q.leftItems || []),
        rightItems: shuffleArray(q.rightItems || [])
      };
    }

    if (q.type === 'ordering' && Array.isArray(q.items)) {
      return {
        ...q,
        initialOrder: shuffleOrderingItems(q.items, q.correctOrder)
      };
    }

    return { ...q };
  });
}

/**
 * Menyiapkan daftar soal untuk Latihan Mandiri (PracticeEngine):
 * 1. Mengacak dan mengambil sejumlah soal dari bank latihan (`count`).
 * 2. Mengacak opsi pilihan ganda (kecuali Benar/Salah yang tetap konsisten posisinya).
 * 3. Menyiapkan urutan acak untuk soal ordering.
 */
export function preparePracticeQuestions(practicePool, count = 5) {
  if (!Array.isArray(practicePool) || practicePool.length === 0) return [];

  const picked = shuffleArray(practicePool).slice(0, Math.min(count, practicePool.length));

  return picked.map((q) => {
    if (q.type === 'multiple-choice' && Array.isArray(q.options)) {
      const shuffledOptions = shuffleArray(q.options).map((opt, idx) => ({
        ...opt,
        origKey: opt.key,
        displayKey: MC_LABELS[idx] || String(idx + 1),
        isCorrect: opt.key === q.correctKey
      }));
      return {
        ...q,
        options: shuffledOptions
      };
    }

    if (q.type === 'true-false' && Array.isArray(q.options)) {
      return {
        ...q,
        options: q.options.map((opt) => ({
          ...opt,
          origKey: opt.key,
          displayKey: opt.key,
          isCorrect: opt.key === q.correctKey
        }))
      };
    }

    if (q.type === 'ordering' && Array.isArray(q.items)) {
      return {
        ...q,
        initialOrder: shuffleOrderingItems(q.items, q.correctOrder)
      };
    }

    return { ...q };
  });
}
