# 🛠️ Tech Stack — Keputusan Teknologi

## Studio Informatika — Elevated Academic Studio
### Platform & Alat Pengembangan Modern

---

## 1. Arsitektur: Modern Client-Side Web Application

Sesuai permintaan implementasi, proyek ini dibangun menggunakan ekosistem **React + Tailwind CSS + Vite** yang menghasilkan berkas statis berkinerja tinggi, ringan, dan responsif.

| Aspek | Keputusan | Alasan & Keuntungan |
|---|---|---|
| **Framework UI** | **React 18** | Komponen modular, reaktivitas state kuis dan simulasi CPU yang instan, deklaratif. |
| **CSS & Styling** | **Tailwind CSS 3** | Utilitas styling modern, mudah disesuaikan dengan desain sistem *Elevated Academic Studio*, ukuran bundle sangat teroptimasi via purge. |
| **Build Tool & Bundler** | **Vite 6** | *Lightning fast* Hot Module Replacement (HMR) saat development, optimasi tree-shaking saat build produksi. |
| **Database** | ❌ Tidak ada (Zero Backend) | Memenuhi ketentuan **tanpa akun/login**; seluruh kemajuan tersimpan aman di `window.localStorage`. |
| **Ikonografi** | **Lucide React** | Ikon SVG berbobot ringan, modern, dan selaras dengan tampilan Hi-Fi di folder `UI/`. |
| **Gamifikasi FX** | **Canvas Confetti** | Efek selebrasi visual saat siswa menuntaskan eksplorasi, kuis bernilai sempurna, dan refleksi. |

---

## 2. Struktur Modul Aplikasi

```text
src/
├── components/                 # Komponen antarmuka pengguna
│   ├── Navbar.jsx              # Navigasi atas, counter poin, toggle audio, reset
│   ├── Footer.jsx              # Keterangan hak cipta, badge Kurikulum Merdeka & Fase E
│   ├── HeroHeader.jsx          # Banner hero indigo gradient beranda
│   ├── HomeView.jsx            # Tampilan beranda 2 kolom + 3 kartu unit belajar
│   ├── UnitCard.jsx            # Kartu status & skor masing-masing unit
│   ├── UnitView.jsx            # Wadah alur belajar 6 tahap (Tantangan s.d. Ringkasan)
│   ├── ExplorationVonNeumann.jsx   # Diagram interaktif ketuk komponen (Unit 1)
│   ├── ExplorationDragDropIPO.jsx  # Mesin drag & drop studi kasus IPO (Unit 2)
│   ├── ExplorationFDESimulator.jsx # Simulasi microcode CPU Fetch-Decode-Execute (Unit 3)
│   ├── QuizEngine.jsx          # Mesin kuis formatif (PG, Menjodohkan, Mengurutkan)
│   ├── PracticeEngine.jsx      # Latihan soal dengan opsi ulang langsung (+2 poin)
│   ├── ReflectionView.jsx      # Formulir asesmen diri & komparasi esai pemantik
│   ├── SummaryView.jsx         # Buku saku digital & fitur Salin Intisari
│   ├── AchievementView.jsx     # Layar selebrasi akhir seluruh unit & cetak PDF
│   ├── TujuanPembelajaranModal.jsx # Jendela pop-up 3 sasaran TP
│   └── PetunjukPenggunaanModal.jsx # Jendela pop-up 6 langkah belajar
├── data/
│   ├── contentData.js          # Konten materi 18 segmen, analogi, tips, dan refleksi
│   └── quizData.js             # 30 butir soal (15 kuis formatif + 15 latihan soal)
├── utils/
│   ├── storage.js              # State manager & persistence window.localStorage
│   └── confetti.js             # Helper animasi partikel selebrasi
├── App.jsx                     # Komponen induk & hash routing
├── main.jsx                    # Entry point React
└── index.css                   # Tailwind directives & animasi custom
```

---

## 3. Desain Sistem & Token Tailwind

Token warna dan tipografi diatur di `tailwind.config.js`:

```javascript
colors: {
  primary: {
    DEFAULT: '#4338CA', // Indigo primer
    50: '#EEF2FF',
    100: '#E0E7FF',
    700: '#4338CA',
    900: '#312E81',
  },
  accent: {
    teal: '#0D9488',       // Sukses / Benar
    'teal-light': '#F0FDFA',
    amber: '#F59E0B',      // Poin / Peringatan
    'amber-light': '#FFFBEB',
    rose: '#E11D48',       // Galat / Salah
    'rose-light': '#FFF1F2',
  },
  surface: {
    DEFAULT: '#FFFFFF',
    page: '#F8FAFC',
  }
},
fontFamily: {
  heading: ['Outfit', 'sans-serif'],
  body: ['"DM Sans"', 'sans-serif'],
}
```

---

## 4. Cara Menjalankan Aplikasi

### Mode Pengembangan (Development)
```powershell
npm run dev
```
Aplikasi akan aktif di `http://localhost:3000`.

### Mode Produksi (Build & Preview)
```powershell
npm run build
npm run preview
```
Hasil kompilasi siap publikasi tersedia di folder `dist/` dan dapat di-host langsung di GitHub Pages, Vercel, maupun Netlify.
