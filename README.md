# 🖥️ Studio Informatika — Elevated Academic Studio
### Multimedia Pembelajaran Interaktif Berbasis Website: Mekanisme Kerja Sistem Komputer
> **Fase E (Kelas X SMA) • Kurikulum Merdeka • SMA Negeri 2 Makassar**  
> *Dikembangkan oleh Kelompok 9 PTIK Universitas Negeri Makassar (2026)*  
> **Teknologi: React 18 + Tailwind CSS 3 + Vite 6 (Zero-Login / LocalStorage Data)**

---

## ⚡ Panduan Menjalankan Aplikasi

Aplikasi telah selesai dibangun dan siap dijalankan dengan langkah berikut:

### 1. Menjalankan di Komputer Lokal (Dev Mode)
Buka terminal PowerShell pada folder ini, lalu jalankan:
```powershell
npm run dev
```
Buka browser di alamat: **`http://localhost:3000`**

### 2. Membangun Berkas Produksi (Production Build)
```powershell
npm run build
npm run preview
```
Seluruh berkas HTML, CSS, dan JS yang telah dioptimasi akan terkumpul di folder `dist/` dan siap dipublikasikan ke **GitHub Pages**, **Vercel**, atau **Netlify**.

---

## 📌 Sekilas Produk & Kebijakan Data

Website ini merupakan media pembelajaran interaktif mandiri yang membantu peserta didik memahami konsep abstrak cara kerja komputer (Arsitektur Von Neumann, Alur Input–Proses–Output, dan Siklus Fetch–Decode–Execute) melalui pendekatan *visual storytelling*, simulasi langkah demi langkah, dan gamifikasi terarah.

> 🔒 **PENTING — AKSES TANPA AKUN (LOCAL-ONLY):**  
> Media ini **tidak menggunakan sistem login/akun** dan **tidak membutuhkan server database**. Seluruh data perkembangan belajar, nilai kuis, poin penghargaan, dan refleksi tersimpan secara aman di **`window.localStorage` pada peramban perangkat pengguna**. Guru dan siswa dapat langsung mengakses media tanpa hambatan registrasi.

---

## 🗂️ Direktori Dokumentasi & Spesifikasi

Berikut adalah dokumen perancangan dan spesifikasi teknis lengkap yang menyertai proyek ini:

| Dokumen | Deskripsi & Fokus Isi |
|---|---|
| [**`prd.md`**](prd.md) | **Product Requirements Document (PRD):** Latar belakang masalah, profil pengguna sasaran, 3 rumusan Tujuan Pembelajaran (TP), kebutuhan fungsional & non-fungsional, serta batasan produk. |
| [**`arsitek.md`**](arsitek.md) | **Dokumen Arsitektur Teknis:** Struktur arsitektur SPA client-side, diagram komponen sistem, integrasi hash-router, dan alur data lokal. |
| [**`data-model.md`**](data-model.md) | **Skema Data localStorage:** Struktur JSON lengkap untuk penyimpanan status unit, jawaban kuis, poin, level, dan preferensi audio. |
| [**`scoring.md`**](scoring.md) | **Aturan Penilaian & Gamifikasi:** Pemisahan skor ketercapaian TP (0–100) vs sistem poin bonus (maks. 330), ambang tuntas, dan formula level. |
| [**`ui-spec.md`**](ui-spec.md) | **Spesifikasi UI/UX & Design System:** Pedoman *Elevated Academic Studio* (palet warna Indigo/Teal/Amber, font Outfit & DM Sans, komponen tombol, kartu, dan aksesibilitas WCAG AA). |
| [**`content-map.md`**](content-map.md) | **Pemetaan Konten:** Matriks penyebaran materi 18 segmen, 3 tantangan pemantik, 3 modul interaktif, dan 30 butir soal ke dalam 3 unit belajar. |
| [**`user-flow.md`**](user-flow.md) | **Alur Pengguna & State Diagram:** Alur perjalanan belajar siswa dari Halaman Pembuka, 6 tahap belajar berulang tiap unit, hingga Ringkasan Capaian Akhir. |
| [**`dfd.md`**](dfd.md) | **Data Flow Diagram (DFD):** Pemodelan aliran data formal (Diagram Konteks & DFD Level 1) untuk pengganti flowchart utama di laporan. |
| [**`database_guide.md`**](database_guide.md) | **Panduan Integrasi Database Laragon:** Skema MySQL lengkap, skrip PHP API, dan petunjuk setup jika ingin menghubungkan data ke basis data terpusat. |
| [**`tech-stack.md`**](tech-stack.md) | **Keputusan Teknologi:** Penjelasan implementasi **React 18 + Tailwind CSS + Vite**, kompatibilitas browser, serta deployment. |
| [**`bank-soal.md`**](bank-soal.md) | **Bank Soal 30 Butir:** Naskah soal lengkap (15 Kuis Formatif + 15 Latihan Soal), kunci jawaban, opsi acak, serta penjelasan umpan balik benar/salah & petunjuk (*hints*). |
| [**`materi-lengkap.md`**](materi-lengkap.md) | **Naskah Materi & Narasi:** Teks pengajaran lengkap per segmen, analogi dapur restoran, analogi resep kue, studi kasus mengetik huruf 'A', dan buku saku digital. |
| [**`test-plan.md`**](test-plan.md) | **Rencana Pengujian & Validasi:** Matriks 14 butir uji Black Box (*Feature Completeness*), rubrik penilaian ahli materi & media, serta instrumen kuesioner SUS 10 butir. |
| [**`implementation-plan.md`**](implementation-plan.md) | **Roadmap Implementasi Kode:** Pembagian sprint pengerjaan, struktur folder teknis, checklist komponen, dan panduan pengujian. |

---

## 🎨 Keselarasan dengan Mockup Desain (Folder `UI/`)

Aplikasi React ini dibangun dengan presisi tinggi mengacu langsung pada tangkapan layar di folder `UI/`:
1. `Halaman Pembuka & Informasi Awal.png` ➔ Diimplementasikan pada `HeroHeader.jsx` & `HomeView.jsx`
2. `Unit 1_ Arsitektur Von Neumann & Eksplorasi.png` ➔ Diimplementasikan pada `ExplorationVonNeumann.jsx`
3. `Kuis Unit 1_ Mencocokkan Komponen Von Neumann.png` ➔ Diimplementasikan pada `QuizEngine.jsx` (mode *Matching*)
4. `Unit 2_ Materi dan Latihan Soal IPO.png` ➔ Diimplementasikan pada `PracticeEngine.jsx` & `UnitView.jsx`
5. `Kuis Unit 2_ Drag and Drop Alur IPO.png` ➔ Diimplementasikan pada `ExplorationDragDropIPO.jsx`
6. `Unit 3_ Siklus Fetch-Decode-Exxecute.png` ➔ Diimplementasikan pada `ExplorationFDESimulator.jsx`
7. `Kuis Unit 3_ Prediksi Siklus Instruksi.png` ➔ Diimplementasikan pada `QuizEngine.jsx` (mode *Prediction*)
8. `Refleksi Pembelajaran dan Ringkasan Materi.png` ➔ Diimplementasikan pada `ReflectionView.jsx` & `SummaryView.jsx`
9. `Ringkasan Capaian Pembelajaran.png` ➔ Diimplementasikan pada `AchievementView.jsx`

---

## 👥 Tim Pengembang (Kelompok 9)

**Program Studi Pendidikan Teknik Informatika dan Komputer (PTIK)**  
**Fakultas Teknik — Universitas Negeri Makassar (2026)**

- **Muhammad Ghazi Saputra** (NIM: 240209501063)
- **Intan Ramadhani Hasbullah** (NIM: 240209500071)
- **Adelia Rahmadani Tahir** (NIM: 240209500075)
