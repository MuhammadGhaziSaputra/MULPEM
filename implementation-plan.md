# 🚀 Rencana Implementasi & Roadmap Pengembangan Web

## Studio Informatika — Panduan Eksekusi Teknis

---

## 1. Ikhtisar Strategi Pengembangan

Website ini dikembangkan secara **modular, murni client-side (HTML5 + CSS3 + Vanilla ES6 JavaScript)** tanpa *dependencies* pihak ketiga yang berat. Seluruh kondisi penyimpanan mengandalkan API `window.localStorage` agar peserta didik dapat belajar tanpa hambatan registrasi atau login.

```
Sprint 1: Fondasi & Sistem Desain  ──►  Sprint 2: Mesin Pembelajaran & State
                                                     │
                                                     ▼
Sprint 4: Rilis & Pengujian Akhir  ◄──  Sprint 3: Modul Interaktif & Kuis
```

---

## 2. Struktur Berkas Implementasi

```text
/
├── index.html                  # Berkas induk Single-Page Application (SPA)
├── css/
│   ├── reset.css               # Normalisasi elemen browser
│   ├── variables.css           # Token desain: Warna, Spasi, Tipografi, Radius
│   ├── layout.css              # Grid 12 kolom, Flexbox container, Breakpoints
│   ├── components.css          # Tombol, Kartu, Badge, Progress bar, Modal
│   ├── quiz.css                # Kartu soal, Pilihan jawaban, Umpan balik
│   ├── interactive.css         # Diagram Von Neumann, Drag & Drop zone, CPU simulator
│   └── responsive.css          # Kustomisasi tata letak layar HP (360px - 768px)
├── js/
│   ├── app.js                  # Entry point, event init, lifecycle handler
│   ├── router.js               # Hash router (#/, #/unit/1, #/achievement)
│   ├── state.js                # State manager & abstraksi localStorage
│   ├── components/
│   │   ├── navbar.js           # Header, status pill, toggle audio
│   │   ├── progress.js         # Bilah kemajuan bertahap (0% - 100%)
│   │   ├── modal.js            # Jendela pop-up (Tujuan Pembelajaran, Petunjuk)
│   │   └── toast.js            # Notifikasi apung (Autosave aktif, Poin bertambah)
│   ├── pages/
│   │   ├── home.js             # View Halaman Pembuka & Menu Unit
│   │   ├── unit-view.js        # Template serbaguna 6 tahap belajar unit
│   │   ├── quiz-engine.js      # Generator kuis, pemroses jawaban, pengacak opsi
│   │   ├── practice-engine.js  # Latihan soal dengan instant retry
│   │   ├── reflection-view.js  # Formulir asesmen diri & komparasi esai
│   │   └── achievement-view.js # Halaman ringkasan hasil belajar akhir
│   ├── data/
│   │   ├── units-data.js       # Konten materi 18 segmen & naskah analogi
│   │   ├── quiz-bank.js        # Bank 30 soal (15 kuis + 15 latihan)
│   │   └── tips-data.js        # Tips & trik dan ringkasan buku saku digital
│   └── interactive/
│       ├── von-neumann.js      # Logika interaktif ketuk komponen & penjelas
│       ├── drag-drop-ipo.js    # Mesin drag and drop klasifikasi (Touch + Pointer)
│       └── fde-simulator.js    # State machine simulasi microcode CPU
└── assets/
    ├── icons/                  # SVG ikon (CPU, ALU, RAM, I/O, Ceklis, Silang, Bintang)
    ├── diagrams/               # Diagram skema Von Neumann & Jalur Bus
    └── audio/                  # Berkas MP3 narasi materi per segmen (opsional)
```

---

## 3. Rincian Fase Pengerjaan (Milestones)

### Fase 1: Setup Fondasi & Desain UI (Hari 1–3)
- [ ] Buat kerangka file induk `index.html`.
- [ ] Definisikan CSS Custom Properties pada `variables.css` sesuai spesifikasi *Elevated Academic Studio*:
  - Primer: Indigo `#4338CA`
  - Sukses/Tepat: Teal `#0D9488`
  - Poin/Peringatan: Amber `#F59E0B`
  - Galat: Rose `#E11D48`
  - Latar: Slate `#F8FAFC`, Kartu `#FFFFFF`
- [ ] Import web fonts `Outfit` (Headings) dan `DM Sans` (Body Text) dari Google Fonts.
- [ ] Susun tata letak responsif (*mobile-first*) untuk layar HP 360px hingga layar desktop 1440px.

### Fase 2: Pengelolaan State & Router Klien (Hari 4–6)
- [ ] Bangun modul `state.js`:
  - Skema default progress pengguna (Unit 1, 2, 3, Overall points, Level).
  - Mekanisme baca/tulis `localStorage` dengan penanganan error `try-catch`.
  - Fungsi *Debounce Auto-Save* 500ms agar performa peramban tetap ringan.
  - Event emitter kustom saat nilai skor atau poin berubah.
- [ ] Bangun modul `router.js` berbasis `window.location.hash`:
  - `#/` ➔ Beranda & Menu Unit
  - `#/unit/:id` ➔ Halaman Unit Belajar (Tahap 1–6)
  - `#/unit/:id/quiz` ➔ Halaman Kuis Unit
  - `#/achievement` ➔ Layar Ringkasan Capaian Akhir

### Fase 3: Template Unit Belajar 6 Tahap (Hari 7–11)
- [ ] **Tahap 1 (Tantangan Pembuka):** Input teks pemantik, tombol kirim, animasi reward `+10 Poin`.
- [ ] **Tahap 2 (Materi & Visualisasi):** Viewer segmen per layar, navigasi slider, toggle audio narasi.
- [ ] **Tahap 3 (Eksplorasi / Latihan):**
  - **Unit 1:** Diagram arsitektur Von Neumann (klik komponen ➔ buka penjelasan, 4 poin/komponen).
  - **Unit 2:** Latihan studi kasus IPO interaktif.
  - **Unit 3:** Simulasi mikroarsitektur CPU (Clock pulse, Program counter, ALU highlight).
- [ ] **Tahap 4 (Kuis Formatif):** Integrasi engine kuis dengan sistem skor kaku (percobaan pertama mengunci skor ketercapaian TP).
- [ ] **Tahap 5 (Refleksi):** Asesmen 3 pertanyaan, perbandingan jawaban tantangan vs pemahaman baru, umpan balik personal.
- [ ] **Tahap 6 (Ringkasan Materi):** Kartu intisari konsep + fitur `Salin Intisari` ke clipboard.

### Fase 4: Tiga Modul Interaktivitas Khusus (Hari 12–16)
- [ ] **Modul A — Diagram Interaktif Von Neumann (`von-neumann.js`):**
  - Pemetaan area hitung (Input, CU, ALU, RAM, Output, Bus).
  - Indikator status komponen terbaca (misal "4/4 Terbuka").
- [ ] **Modul B — Mesin Drag & Drop IPO (`drag-drop-ipo.js`):**
  - Mendukung Pointer Events & Touch Events agar nyaman digeser via layar sentuh HP.
  - Animasi snap ketika kartu dijatuhkan ke wadah yang sesuai.
  - Validasi seketika dengan umpan balik warna hijau/merah.
- [ ] **Modul C — Mesin Simulasi CPU FDE (`fde-simulator.js`):**
  - State machine 3 fase: FETCH $\rightarrow$ DECODE $\rightarrow$ EXECUTE.
  - Visualisasi aliran data bus dari RAM ke Instruction Register (IR) dan ALU.
  - Tebakan pilihan langkah berikutnya (+5 Poin per tebakan tepat).

### Fase 5: Mesin Penilaian, Bank Soal, & Gamifikasi (Hari 17–20)
- [ ] Muat data lengkap 30 butir soal dari `bank-soal.md` ke dalam format JSON JavaScript.
- [ ] Buat algoritma pengacak opsi jawaban (*Fisher-Yates Shuffle*) agar posisi opsi acak setiap kali dibuka.
- [ ] Implementasikan rubrik umpan balik langsung per butir soal:
  - Jawaban tepat: Banner hijau, poin bertambah, penjelasan singkat.
  - Jawaban belum tepat: Banner merah muda, penjelasan kekeliruan, petunjuk (*hint*).
- [ ] Mekanisme pengulangan kuis: Tombol "Ulangi Kuis" baru muncul setelah seluruh 5 soal selesai.
- [ ] Sistem akumulasi Poin (Maks. 330) dan penentuan Level:
  - Level 1: Pemula (0–99 Poin)
  - Level 2: Penjelajah (100–199 Poin)
  - Level 3: Pemahir (200–259 Poin)
  - Level 4: Master Arsitektur (260–330 Poin)

### Fase 6: Halaman Ringkasan Capaian Akhir (Hari 21–23)
- [ ] Desain layar hasil akhir sesuai dengan dokumen mockup UI:
  - Kartu skor total: Akumulasi Poin (misal 285/300).
  - Kartu lencana level: "Level 3 (Master Arsitektur)".
  - Rata-rata skor kuis 3 unit (misal 95/100, status Tercapai $\ge 80$).
  - Rincian unit: Tabulasi nilai per TP (Unit 1, 2, 3), status refleksi, dan tombol `Buka Ulang Materi`.
  - Pesan personalisasi berdasarkan jumlah unit tuntas.
- [ ] Tombol pintas `Cetak / Simpan PDF` untuk memudahkan siswa menyetorkan bukti capaian belajar ke guru.

### Fase 7: Pengujian, Optimasi, & Deployment (Hari 24–28)
- [ ] Jalankan pengujian fungsional penuh berdasarkan 14 butir uji pada `test-plan.md`.
- [ ] Uji responsivitas pada Google Chrome Android (HP 5–6 inci) dan browser desktop.
- [ ] Validasi kontras warna WCAG AA (minimal rasio 4.5:1).
- [ ] Optimasi aset: Kompresi gambar ke WebP, minifikasi stylesheet dan script.
- [ ] Publikasikan ke **GitHub Pages** (atau Vercel/Netlify).

---

## 4. Panduan Menjalankan Secara Lokal (Local Development)

Karena aplikasi murni berbasis web statis, pengembang dapat menjalankannya tanpa perlu menginstal Node.js:

1. **Menggunakan VS Code Live Server:**
   - Buka folder proyek di VS Code.
   - Klik kanan berkas `index.html` $\rightarrow$ pilih **"Open with Live Server"**.
   - Aplikasi akan terbuka otomatis di alamat `http://127.0.0.1:5500`.

2. **Menggunakan Python Simple HTTP Server:**
   ```powershell
   python -m http.server 8000
   ```
   Buka peramban pada alamat `http://localhost:8000`.

3. **Membersihkan Data Uji Coba (Reset State):**
   - Buka Console di Browser DevTools (F12).
   - Jalankan perintah:
     ```javascript
     localStorage.removeItem('studio-informatika-progress');
     location.reload();
     ```
