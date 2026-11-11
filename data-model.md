# 💾 Data Model — localStorage Schema

## Studio Informatika — Penyimpanan Data Lokal

> **Disclaimer:** Aplikasi ini **tidak menggunakan akun/login**. Seluruh data tersimpan di `localStorage` browser pengguna. Data bersifat per-perangkat dan per-browser.

---

## 1. Ringkasan

| Aspek | Detail |
|---|---|
| **Storage Engine** | `window.localStorage` |
| **Key Utama** | `studio-informatika-progress` |
| **Format** | JSON string |
| **Kapasitas** | ~5 MB (batas umum localStorage per domain) |
| **Estimasi Ukuran Data** | ~2–5 KB per pengguna |

---

## 2. Skema Data Lengkap

```jsonc
{
  // === METADATA ===
  "version": "1.0",                          // Versi skema untuk migrasi
  "createdAt": "2026-11-05T10:00:00+08:00",  // Timestamp pertama kali dibuat
  "lastUpdated": "2026-11-05T13:00:00+08:00",// Timestamp terakhir diperbarui

  // === PREFERENSI PENGGUNA ===
  "preferences": {
    "audioEnabled": true,       // Toggle narasi audio
    "audioVolume": 0.8          // Volume 0.0 – 1.0
  },

  // === DATA PER UNIT ===
  "units": {
    "unit1": {
      "status": "completed",    // "not-started" | "in-progress" | "completed"
      "currentStep": 6,         // Tahap terakhir: 1=tantangan, 2=materi, 3=eksplorasi, 4=kuis, 5=refleksi, 6=ringkasan

      // Tantangan Pembuka
      "challenge": {
        "answer": "Menurut saya ada prosesnya di dalam...",
        "completedAt": "2026-11-05T10:02:00+08:00",
        "points": 10
      },

      // Eksplorasi (Unit 1: Label Interaktif)
      "exploration": {
        "openedComponents": ["input", "cpu", "memory", "output"],
        "totalComponents": 4,
        "points": 20,
        "completedAt": "2026-11-05T10:10:00+08:00"
      },

      // Kuis Formatif
      "quiz": {
        "totalQuestions": 5,
        "attempts": 1,
        "firstAttemptAnswers": {
          "K1-1": { "selected": "A", "correct": true,  "score": 1.0 },
          "K1-2": { "selected": "A", "correct": true,  "score": 1.0 },
          "K1-3": { "selected": [2,1,3,4], "correct": false, "score": 0.75 },
          "K1-4": { "selected": {"Mikrofon":"Input","CPU":"Proses","Speaker":"Output"}, "correct": true, "score": 1.0 },
          "K1-5": { "selected": "A", "correct": true,  "score": 1.0 }
        },
        "firstAttemptScoreRaw": 4.75,       // Jumlah skor soal
        "firstAttemptScorePercent": 95.0,    // (4.75 / 5) × 100
        "retryAnswers": null,                // Jika diulang, data percobaan ulang
        "bestScorePercent": 95.0,
        "quizPoints": 57,                    // 12 × firstAttemptScoreRaw
        "completedAt": "2026-11-05T10:20:00+08:00"
      },

      // Latihan Soal (Bonus)
      "practice": {
        "answers": {
          "L1-1": { "selected": "Benar", "correct": true, "attempts": 1, "bonusPoints": 2 },
          "L1-2": { "selected": "B",     "correct": true, "attempts": 1, "bonusPoints": 2 },
          "L1-3": { "selected": [1,2,3], "correct": true, "attempts": 2, "bonusPoints": 2 },
          "L1-4": { "selected": null,    "correct": false, "attempts": 0, "bonusPoints": 0 },
          "L1-5": { "selected": null,    "correct": false, "attempts": 0, "bonusPoints": 0 }
        },
        "totalBonusPoints": 6
      },

      // Refleksi
      "reflection": {
        "scale": 4,                            // 1=Belum paham, 2=Sedikit, 3=Paham, 4=Sangat paham
        "hardestPart": "Tidak ada, sudah paham",
        "selfExplanation": "Saat mengetik di HP, keyboard sebagai input...",
        "points": 10,
        "completedAt": "2026-11-05T10:25:00+08:00"
      },

      // Total Poin Unit
      "totalPoints": 103    // challenge(10) + exploration(20) + quiz(57) + practice(6) + reflection(10)
    },

    "unit2": {
      "status": "completed",
      "currentStep": 6,
      "challenge": { "answer": "...", "completedAt": "...", "points": 10 },

      // Eksplorasi (Unit 2: Latihan Soal — beda dari Unit 1)
      "exploration": {
        "type": "practice-exercise",
        "completedScenarios": 2,
        "totalScenarios": 2,
        "points": 20,
        "completedAt": "..."
      },

      "quiz": {
        "totalQuestions": 5,
        "attempts": 1,
        "firstAttemptAnswers": { /* ... */ },
        "firstAttemptScoreRaw": 5.0,
        "firstAttemptScorePercent": 100.0,
        "retryAnswers": null,
        "bestScorePercent": 100.0,
        "quizPoints": 60,
        "completedAt": "..."
      },
      "practice": { "answers": { /* ... */ }, "totalBonusPoints": 10 },
      "reflection": { "scale": 3, "hardestPart": "...", "selfExplanation": "...", "points": 10 },
      "totalPoints": 110
    },

    "unit3": {
      "status": "completed",
      "currentStep": 6,
      "challenge": { "answer": "...", "completedAt": "...", "points": 10 },

      // Eksplorasi (Unit 3: Simulasi Tebak Langkah)
      "exploration": {
        "type": "step-simulation",
        "correctGuesses": 3,
        "totalGuesses": 4,
        "points": 15,
        "completedAt": "..."
      },

      "quiz": {
        "totalQuestions": 5,
        "attempts": 2,
        "firstAttemptAnswers": { /* ... */ },
        "firstAttemptScoreRaw": 4.75,
        "firstAttemptScorePercent": 95.0,
        "retryAnswers": {
          "K3-3": { "selected": [1,2,3], "correct": true, "retryPoints": 6 }
        },
        "bestScorePercent": 95.0,
        "quizPoints": 63,         // 12 × 4.75 + retryPoints
        "completedAt": "..."
      },
      "practice": { "answers": { /* ... */ }, "totalBonusPoints": 8 },
      "reflection": { "scale": 4, "hardestPart": "...", "selfExplanation": "...", "points": 10 },
      "totalPoints": 106
    }
  },

  // === RINGKASAN KESELURUHAN ===
  "overall": {
    "totalPoints": 319,                // Jumlah totalPoints semua unit
    "maxPoints": 330,                  // 3 × 110 (100 base + 10 bonus latihan)
    "level": 3,                        // Berdasarkan tabel level
    "levelName": "Master Arsitektur",
    "completedUnits": 3,
    "totalUnits": 3,
    "averageQuizScore": 96.7,          // Rata-rata firstAttemptScorePercent
    "allUnitsCompleted": true,
    "completedAt": "2026-11-05T10:45:00+08:00",
    "totalTimeMinutes": 24             // Estimasi dari timestamps
  }
}
```

---

## 3. API State Manager

```javascript
// js/state.js — Interface untuk membaca/menulis data

const STORAGE_KEY = 'studio-informatika-progress';

const StateManager = {
  // Inisialisasi state (buat baru jika belum ada)
  init(),

  // Getter
  getAll(),                          // → seluruh state object
  getUnit(unitId),                   // → data unit tertentu
  getQuizScore(unitId),              // → skor kuis unit
  getOverall(),                      // → ringkasan keseluruhan
  getPreferences(),                  // → preferensi pengguna
  isUnitCompleted(unitId),           // → boolean

  // Setter (dengan auto-save + debounce)
  saveChallenge(unitId, answer),
  saveExploration(unitId, data),
  saveQuizAnswer(unitId, questionId, answer),
  completeQuiz(unitId),
  savePracticeAnswer(unitId, questionId, answer),
  saveReflection(unitId, data),
  setPreference(key, value),
  updateOverall(),

  // Utility
  resetUnit(unitId),                 // Reset satu unit
  resetAll(),                        // Reset semua data
  exportData(),                      // → JSON string (untuk backup)
  getDataSizeKB(),                   // → ukuran data dalam KB
};
```

---

## 4. Migrasi Data

Jika skema berubah di versi mendatang:

```javascript
function migrateData(data) {
  if (data.version === '1.0') {
    // Migrasi dari v1.0 ke v1.1
    // contoh: tambah field baru dengan default value
    data.preferences.theme = 'light';
    data.version = '1.1';
  }
  return data;
}
```

---

## 5. Batasan & Catatan

| # | Catatan |
|---|---|
| 1 | localStorage bersifat **sinkron** — operasi besar bisa blocking; gunakan debounce |
| 2 | Batas ~5 MB per domain — data kita hanya ~5 KB, sangat aman |
| 3 | Data hilang jika user clear browser data / uninstall browser |
| 4 | Incognito/Private mode: localStorage tersedia tapi dihapus saat tab ditutup |
| 5 | Tidak ada enkripsi — data bisa dilihat/diedit dari DevTools (acceptable untuk konteks pendidikan) |
| 6 | `JSON.parse()` harus di-wrap `try-catch` untuk handle data corrupt |
