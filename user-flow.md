# 🔀 User Flow — Alur Navigasi Pengguna

## Studio Informatika — Perjalanan Belajar Peserta Didik

---

## 1. Alur Utama (Happy Path)

```mermaid
flowchart TD
    START(("🌐 Buka Website")) --> A["Halaman Pembuka"]
    A --> B{"Pilih Aksi"}
    B --> B1["Lihat Tujuan Pembelajaran"]
    B --> B2["Petunjuk Penggunaan"]
    B --> B3["Mulai Belajar →"]
    B1 --> B
    B2 --> B
    B3 --> C["Menu Unit (Beranda)"]
    C --> D{"Pilih Unit"}
    D --> U1["Unit 1: Von Neumann"]
    D --> U2["Unit 2: Alur IPO"]
    D --> U3["Unit 3: Siklus FDE"]
    U1 --> FLOW1["Alur 6 Tahap Unit 1"]
    U2 --> FLOW2["Alur 6 Tahap Unit 2"]
    U3 --> FLOW3["Alur 6 Tahap Unit 3"]
    FLOW1 --> C
    FLOW2 --> C
    FLOW3 --> C
    C --> ACH{"3 Unit Selesai?"}
    ACH -->|Ya| Z["Ringkasan Capaian Akhir"]
    ACH -->|Belum| D
    Z --> DONE(("✅ Selesai"))
```

---

## 2. Alur Per Unit (6 Tahap)

Setiap unit mengikuti pola yang **identik dan konsisten**:

```mermaid
flowchart TD
    T1["1⃣ Tantangan Pembuka<br/>Isian bebas, +10 poin"]
    T2["2⃣ Materi Inti & Animasi<br/>6 segmen per layar"]
    T3["3⃣ Eksplorasi / Latihan<br/>Interaktif, +20 poin max"]
    T4["4⃣ Kuis Akhir Unit<br/>5 soal bertahap"]
    T5["5⃣ Refleksi<br/>3 pertanyaan, +10 poin"]
    T6["6⃣ Ringkasan Materi<br/>Buku saku digital"]

    T1 --> T2 --> T3 --> T4
    T4 --> SCORE{"Lihat Skor"}
    SCORE --> RETRY["Ulangi Kuis?"]
    RETRY -->|Ya| T4
    RETRY -->|Tidak| T5
    SCORE --> T5
    T5 --> T6
    T6 --> BACK["Kembali ke Menu Unit"]
```

---

## 3. Alur Kuis Detail

```mermaid
flowchart TD
    START["Mulai Kuis"] --> Q1["Soal 1 dari 5<br/>(Level: Dasar)"]
    Q1 --> ANS1{"Jawab"}
    ANS1 --> FB1["Umpan Balik + Penjelasan"]
    FB1 --> Q2["Soal 2 dari 5<br/>(Level: Menengah)"]
    Q2 --> ANS2{"Jawab"}
    ANS2 --> FB2["Umpan Balik + Penjelasan"]
    FB2 --> Q3["Soal 3 dari 5"]
    Q3 --> ANS3{"Jawab"}
    ANS3 --> FB3["Umpan Balik + Penjelasan"]
    FB3 --> Q4["Soal 4 dari 5<br/>(Level: Menantang)"]
    Q4 --> ANS4{"Jawab"}
    ANS4 --> FB4["Umpan Balik + Penjelasan"]
    FB4 --> Q5["Soal 5 dari 5"]
    Q5 --> ANS5{"Jawab"}
    ANS5 --> FB5["Umpan Balik + Penjelasan"]
    FB5 --> RESULT["Hasil Kuis:<br/>Skor, Poin, Level"]
    RESULT --> CHOICE{"Pilihan"}
    CHOICE --> RETRY["🔄 Ulangi Kuis"]
    CHOICE --> NEXT["➡️ Lanjut ke Refleksi"]
    RETRY --> Q1
```

**Catatan Penting:**
- Umpan balik ditampilkan **langsung setelah menjawab** (per soal)
- Pengulangan kuis hanya bisa dilakukan **setelah semua 5 soal selesai**
- Percobaan ulang **tidak mengubah** skor ketercapaian (yang dicatat = percobaan pertama)

---

## 4. Alur Latihan Soal

```mermaid
flowchart TD
    START["Mulai Latihan"] --> S1["Skenario / Soal"]
    S1 --> ANS{"Jawab"}
    ANS -->|Benar| RIGHT["✅ Umpan Balik Benar<br/>+2 poin bonus"]
    ANS -->|Salah| WRONG["❌ Umpan Balik Salah<br/>+ Penjelasan + Hint"]
    WRONG --> RETRY{"Ulang Soal Ini?"}
    RETRY -->|Ya| S1
    RETRY -->|Tidak| NEXT
    RIGHT --> NEXT["Soal Berikutnya"]
    NEXT --> DONE{"Semua selesai?"}
    DONE -->|Belum| S1
    DONE -->|Ya| LANJUT["Lanjut ke Kuis Akhir Unit"]
```

**Perbedaan Latihan vs Kuis:**
| Aspek | Latihan Soal | Kuis Formatif |
|---|---|---|
| Pengulangan | Langsung per soal | Setelah semua soal selesai |
| Poin | +2 bonus per soal benar | 12 × skor soal |
| Pengaruh ke skor ketercapaian | ❌ Tidak | ✅ Ya (percobaan pertama) |

---

## 5. Alur Refleksi

```mermaid
flowchart TD
    R1["Skala Pemahaman<br/>(1-4: Belum paham → Sangat paham)"]
    R2["Bagian Tersulit<br/>(Pilihan: topik spesifik atau Sudah paham)"]
    R3["Penjelasan dengan Kata Sendiri<br/>(Isian singkat, tampil berdampingan<br/>dengan jawaban tantangan pembuka)"]
    R4{"Semua terisi?"}
    R5["✅ +10 Poin Refleksi"]
    R6["Umpan Balik Refleksi"]

    R1 --> R2 --> R3 --> R4
    R4 -->|Ya| R5 --> R6
    R4 -->|Belum| R1
    R6 -->|Skala 3-4 + Sudah paham| FB1["Bagus! Siap lanjut."]
    R6 -->|Skala 1-2 atau ada bagian sulit| FB2["Buka kembali segmen terkait"]
```

---

## 6. Navigasi Global

### 6.1 Dari Halaman Manapun, User Bisa:

| Aksi | Target |
|---|---|
| Klik logo/Beranda di navbar | Kembali ke Beranda (Menu Unit) |
| Klik "← Kembali" | Halaman/tahap sebelumnya |
| Klik menu unit di sidebar/navbar | Langsung ke unit tersebut |

### 6.2 Pembatasan Navigasi

| Aturan | Alasan |
|---|---|
| Semua unit bisa dibuka kapan saja | Peserta didik tidak terhambat |
| Progress bar menunjukkan tahap saat ini | Orientasi posisi dalam alur |
| Navigasi maju: hanya jika tahap saat ini selesai | Menjaga alur belajar berurutan |
| Navigasi mundur: selalu bisa | Memungkinkan review materi |

---

## 7. State Transitions

```mermaid
stateDiagram-v2
    [*] --> NotStarted
    NotStarted --> InProgress: Buka unit
    InProgress --> InProgress: Selesaikan tahap
    InProgress --> Completed: Selesai ringkasan materi
    Completed --> InProgress: Buka ulang materi
    Completed --> [*]: Kembali ke menu
```

| Status | Keterangan |
|---|---|
| `not-started` | Unit belum pernah dibuka |
| `in-progress` | Unit sudah dibuka, belum semua tahap selesai |
| `completed` | Semua 6 tahap sudah dilalui |

---

## 8. Edge Cases

| Case | Handling |
|---|---|
| User refresh di tengah kuis | State tersimpan di localStorage; kuis dilanjutkan dari soal terakhir |
| User clear browser data | Data hilang; tampilkan pesan "Mulai dari awal" di Beranda |
| User buka di perangkat berbeda | Data tidak sinkron; harus ulang atau lanjutkan di perangkat asli |
| User buka di incognito | localStorage ada tapi hilang saat tab ditutup; tampilkan warning |
| Koneksi internet terputus setelah load | Media tetap berjalan (semua sudah di browser) |
| User langsung buka URL unit tertentu | Hash router handle → tampilkan unit yang diminta |
