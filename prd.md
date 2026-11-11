# 📋 Product Requirements Document (PRD)

## Multimedia Pembelajaran Interaktif — Mekanisme Kerja Sistem Komputer

| Field | Detail |
|---|---|
| **Nama Produk** | Studio Informatika — Elevated Academic Studio |
| **Versi** | 1.0 |
| **Mata Pelajaran** | Informatika, Fase E / Kelas X |
| **Sekolah Target** | SMA Negeri 2 Makassar |
| **Kurikulum** | Kurikulum Merdeka |
| **Tim Pengembang** | Kelompok 9 — Muhammad Ghazi Saputra, Intan Ramadhani Hasbullah, Adelia Rahmadani Tahir |
| **Program Studi** | Pendidikan Teknik Informatika dan Komputer, Universitas Negeri Makassar |

---

## 1. Ringkasan Produk

Website pembelajaran interaktif berbasis browser yang membantu peserta didik Kelas X memahami **mekanisme kerja sistem komputer** melalui tiga unit belajar bertahap. Media ini bersifat **tanpa login, tanpa instalasi**, dengan seluruh data kemajuan tersimpan di **localStorage** perangkat pengguna.

### Visi
> Menjadikan konsep abstrak cara kerja komputer Von Neumann menjadi pengalaman belajar yang konkret, interaktif, dan mandiri — dapat diakses kapan saja, di mana saja, dari HP maupun laptop.

---

## 2. Masalah yang Diselesaikan

| # | Masalah | Solusi pada Produk |
|---|---|---|
| 1 | Mekanisme kerja komputer bersifat **abstrak** — proses di dalam CPU tidak bisa diamati langsung | Visualisasi interaktif: diagram Von Neumann yang bisa diketuk, animasi alur IPO, simulasi langkah demi langkah siklus FDE |
| 2 | Siswa perlu media yang mendukung **belajar mandiri** (flipped classroom) | Website yang bisa diakses dari rumah via HP/laptop, tanpa login, tanpa instalasi |
| 3 | Media yang ada hanya menyajikan materi + kuis, **belum ada aktivitas interaktif berjenjang** | Aktivitas drag-and-drop, mencocokkan komponen, prediksi siklus instruksi, refleksi diri |
| 4 | Umpan balik kuis hanya "benar/salah" tanpa **penjelasan** | Setiap jawaban disertai penjelasan alasan + petunjuk (hint) untuk perbaikan |

---

## 3. Pengguna Sasaran

### 3.1 Pengguna Utama — Peserta Didik

| Aspek | Detail |
|---|---|
| **Jenjang** | Kelas X SMA / Fase E |
| **Usia** | 15–16 tahun |
| **Karakteristik** | Aktif, terbuka, terbiasa menggunakan HP dan laptop |
| **Pengetahuan Awal** | Sudah menggunakan komputer sehari-hari, belum memahami mekanisme internal |
| **Perangkat** | HP Android (layar 5–6 inci) atau laptop, browser Chrome |
| **Konteks Penggunaan** | Belajar mandiri di rumah (flipped classroom), atau demonstrasi di kelas |

### 3.2 Pengguna Pendukung — Guru Informatika

| Aspek | Detail |
|---|---|
| **Peran** | Mendemonstrasikan media via proyektor, menugaskan siswa belajar mandiri |
| **Kebutuhan** | Melihat hasil/skor kuis siswa (siswa menunjukkan layar Ringkasan Capaian) |

> **Penting:** Tidak ada perbedaan akun atau role. Guru dan siswa mengakses halaman yang sama.

---

## 4. Tujuan Pembelajaran (TP)

Diturunkan dari **Capaian Pembelajaran Fase E — Elemen Sistem Komputer** (Keputusan BSKAP No. 046/H/KR/2025).

| TP | Rumusan | Level Kognitif | Unit | Aktivitas Kunci |
|---|---|---|---|---|
| **TP 1** | Membedakan fungsi komponen utama arsitektur Von Neumann (ALU, CU, Unit Memori, dan piranti I/O) secara komprehensif | C1–C2 | Unit 1 | Eksplorasi label interaktif + Kuis Mencocokkan |
| **TP 2** | Menyusun tahapan alur Input–Proses–Output secara tepat dari berbagai skenario kasus komputasi sehari-hari | C2 | Unit 2 | Animasi alur data + Kuis Drag & Drop |
| **TP 3** | Menentukan urutan instruksi mikro di dalam register dan mengeksekusi simulasi logika hingga mencapai ketuntasan minimum | C2 | Unit 3 | Simulasi langkah demi langkah + Kuis Prediksi |

**Ambang ketuntasan:** Skor kuis ≥ 75 (dapat disesuaikan guru).

---

## 5. Fitur dan Kebutuhan Fungsional

### 5.1 Halaman Pembuka & Beranda

| ID | Fitur | Deskripsi | Prioritas |
|---|---|---|---|
| F01 | Halaman Pembuka & Hero | Judul media, badge Fase E / Kelas X dengan kontras tinggi, estimasi waktu belajar (45 menit), 3 CTA: "Mulai Belajar", "Lihat Tujuan Pembelajaran" (pop-up), "Petunjuk Penggunaan" (pop-up) | Must |
| F02 | Pop-up Tujuan Pembelajaran | Pop-up modal interaktif 3 sasaran TP dengan deskripsi, target skor, tombol tutup, serta **tombol langsung "Mainkan Unit 1/2/3"** per butir TP | Must |
| F03 | Pop-up Petunjuk Penggunaan | Pop-up modal 6 langkah alur belajar: Tantangan → Materi → Eksplorasi → Kuis → Refleksi → Ringkasan | Must |
| F04a | Dashboard Statistik Siswa | Menggantikan card statis di beranda: Menampilkan total poin, rata-rata skor kuis (TP), jumlah aktivitas diselesaikan, unit tuntas, dan progres level | Must |
| F04b | Energi Belajar (Penyemangat) | Card motivasi dinamis di beranda: Kata-kata penyemangat kontekstual sesuai progres belajar siswa, kutipan teknologi Steve Jobs, dan tip belajar mandiri | Must |
| F19 | Portal Verifikasi Nilai Guru | Fitur "Kirim Nilai ke Guru" & "Portal Guru" (100% Tanpa Login): Menghasilkan tautan verifikasi otomatis (`#/verifikasi?data=...`) dan kode laporan untuk direkap guru tanpa server database | Must |
| F13 | Narasi Audio | Toggle narasi audio on/off, auto-save preferensi | Should |
| F14 | Badge "Tanpa Login" | Indikator visual bahwa media tidak memerlukan akun | Must |

### 5.2 Alur Belajar Per Unit (Pola Berulang)

Setiap unit mengikuti alur 6 tahap yang konsisten:

| Tahap | ID | Fitur | Deskripsi |
|---|---|---|---|
| 1 | F03 | Tantangan Pembuka | Pertanyaan pemantik (isian bebas), jawaban disimpan, ditampilkan lagi di refleksi. **+10 poin** |
| 2 | F04 | Materi Inti & Animasi | Materi singkat per layar, diagram/animasi, narasi audio opsional |
| 3 | F05/F06/F07 | Eksplorasi / Latihan | **Unit 1:** Label interaktif (ketuk komponen), **Unit 2:** Latihan soal + animasi, **Unit 3:** Simulasi tebak langkah + latihan soal |
| 4 | F08 | Kuis Akhir Unit | 4–5 soal bertahap (mudah → menantang), umpan balik langsung per soal, skor + poin + level ditampilkan di akhir |
| 5 | F09 | Refleksi | Skala pemahaman, bagian tersulit, penjelasan dengan kata sendiri. **+10 poin** |
| 6 | F10 | Ringkasan Materi | Buku saku digital, poin kunci per unit, tombol "Salin Intisari" |

### 5.3 Kuis & Penilaian

| ID | Fitur | Deskripsi |
|---|---|---|
| F08a | Tipe Soal Bervariasi | Pilihan ganda, benar-salah, menjodohkan, mengurutkan, drag & drop, prediksi |
| F08b | Umpan Balik Berpenjelasan | Setiap jawaban (benar/salah) langsung diberi penjelasan + petunjuk (hint) |
| F08c | Pengulangan Kuis | Kuis bisa diulang setelah semua soal selesai; percobaan ulang tidak mengubah skor ketercapaian |
| F08d | Pengacakan Opsi | Urutan opsi jawaban diacak setiap kali ditampilkan |
| F08e | Progress Bar | Menampilkan kemajuan soal (misal "Soal 2 dari 4") + persentase selesai |

### 5.4 Latihan Soal

| ID | Fitur | Deskripsi |
|---|---|---|
| F10a | Latihan Soal Per Unit | 5 soal per unit (total 15), hanya memberi poin bonus (+2/soal) |
| F10b | Pengulangan Langsung | Soal yang salah bisa diulang langsung saat itu juga |
| F10c | Umpan Balik Latihan | Sama dengan kuis — penjelasan + hint |

### 5.5 Ringkasan Capaian (Akhir)

| ID | Fitur | Deskripsi |
|---|---|---|
| F11 | Ringkasan Capaian | Tampil setelah 3 unit selesai: total poin / 300, level akhir, rata-rata skor kuis, status per unit (Selesai/Belum), tombol "Buka Ulang Materi" per unit |
| F11a | Pesan Motivasi | Pesan berbeda berdasarkan jumlah unit yang tuntas |
| F11b | Langkah Selanjutnya | Arahan untuk presentasi kelompok / diskusi di kelas |

### 5.6 Fitur Umum

| ID | Fitur | Deskripsi |
|---|---|---|
| F12 | Tips & Trik | Ditampilkan di setiap unit, membantu mengingat konsep kunci |
| F15 | Auto-Save | Semua kemajuan tersimpan otomatis di localStorage |
| F16 | Navigasi Konsisten | Header dengan menu: Beranda, Berpikir Komputasional, Algoritma & Pemrograman, Lab Logika, Glosarium |
| F17 | Responsif | Tampilan optimal di HP (5–6 inci) dan laptop |
| F18 | Aksesibilitas Warna | Rasio kontras minimal 4.5:1 (WCAG AA), status tidak hanya bergantung warna |

---

## 6. Kebutuhan Non-Fungsional

| Aspek | Requirement |
|---|---|
| **Performa** | Halaman pertama dimuat < 3 detik pada jaringan 3G |
| **Ukuran** | Total bundle < 5 MB (kompresi gambar + audio) |
| **Offline** | Koneksi internet hanya dibutuhkan saat pertama kali dimuat |
| **Browser** | Chrome (utama), Firefox, Safari, Edge — 2 versi terakhir |
| **Perangkat** | HP Android layar 5–6 inci, laptop, tablet |
| **Responsif** | Mobile-first, breakpoint: 375px, 768px, 1024px, 1440px |
| **Data** | Semua data tersimpan di localStorage — tidak ada server/database |
| **Privasi** | Tidak ada data dikirim ke server, tidak ada tracking, tidak ada cookies pihak ketiga |
| **Aksesibilitas** | Kontras WCAG AA, navigasi keyboard, alt text pada diagram |

---

## 7. Bank Soal — Ringkasan

| Unit | Kuis Formatif (K) | Latihan Soal (L) | Total | Tipe Soal |
|---|---|---|---|---|
| Unit 1 | K1-1 s.d. K1-5 | L1-1 s.d. L1-5 | 10 | PG, menjodohkan, mengurutkan, skenario |
| Unit 2 | K2-1 s.d. K2-5 | L2-1 s.d. L2-5 | 10 | PG, menjodohkan, benar-salah, analogi |
| Unit 3 | K3-1 s.d. K3-5 | L3-1 s.d. L3-5 | 10 | PG, mengurutkan, menjodohkan, prediksi |
| **Total** | **15** | **15** | **30** | |

---

## 8. Batasan & Pengecualian

| # | Batasan |
|---|---|
| 1 | **Tidak ada sistem akun/login** — data hanya di localStorage |
| 2 | **Tidak ada backend/database** — static site |
| 3 | **Tidak ada materi algoritma/flowchart/pseudocode** — sudah di mata pelajaran KKA |
| 4 | **Tidak mengukur efektivitas belajar** — hanya uji kelayakan dan kebergunaan |
| 5 | Data hanya tersimpan di perangkat & browser yang sama |
| 6 | Produk bukan pengganti pembelajaran tatap muka, melainkan pendukung |
| 7 | Model Von Neumann disederhanakan — register, cache, dan bus tidak dibahas |

---

## 9. Success Metrics

| Metrik | Target | Cara Ukur |
|---|---|---|
| Feature Completeness | 100% | Black Box Testing (Tabel 3.5 Proposal) |
| Validasi Ahli Media | ≥ 61% (Layak) | Lembar validasi skala Likert 1–5 |
| Validasi Ahli Materi | ≥ 61% (Layak) | Lembar validasi skala Likert 1–5 |
| SUS Score | ≥ 68 (Good) | Kuesioner SUS 10 pernyataan |
| Ketercapaian TP (deskriptif) | ≥ 75% siswa skor kuis ≥ 75 | Skor kuis dalam media |

---

## 10. Referensi Dokumen

| Dokumen | Keterangan |
|---|---|
| `arsitek.md` | Arsitektur teknis dan diagram sistem |
| `data-model.md` | Skema data localStorage |
| `scoring.md` | Aturan penilaian, poin, dan level |
| `content-map.md` | Pemetaan konten materi dan soal per unit |
| `ui-spec.md` | Spesifikasi desain UI/UX dan design system |
| `user-flow.md` | Alur pengguna dan navigasi |
| Proposal (DOCX) | Draft proposal lengkap |
| Materi & Bank Soal (DOCX) | Konten materi dan 30 butir soal |
