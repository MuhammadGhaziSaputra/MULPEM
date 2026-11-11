# 🗺️ Content Map — Pemetaan Konten Per Unit

## Studio Informatika — Materi, Soal, dan Umpan Balik

---

## 1. Ringkasan Konten

| Konten | Jumlah |
|---|---|
| **Unit Belajar** | 3 unit |
| **Segmen Materi** | 6 segmen per unit = 18 total |
| **Tantangan Pembuka** | 3 (1 per unit) |
| **Aktivitas Eksplorasi** | 3 (beda tipe per unit) |
| **Kuis Formatif (K)** | 15 butir (5 per unit) |
| **Latihan Soal (L)** | 15 butir (5 per unit) |
| **Refleksi** | 3 (1 per unit) |
| **Ringkasan Materi** | 3 (1 per unit) |
| **Tips & Trik** | 3 set (1 per unit) |

---

## 2. Unit 1: Alur Input–Process–Output (TP 1, C2)

### 2.1 Tantangan Pembuka
> "Saat kamu mengetik di HP dan hasilnya langsung muncul di layar, menurutmu apa yang sebenarnya terjadi di baliknya?"

- **Tipe:** Isian bebas singkat
- **Poin:** 10 (otomatis, tidak ada jawaban salah)

### 2.2 Materi Singkat (6 Segmen)

| # | Judul | Inti Materi | Visual |
|---|---|---|---|
| 1 | Komputer bekerja dalam tiga langkah | Setiap komputer bekerja: input → proses → output | Tiga kotak berurutan + panah |
| 2 | Input: data masuk | Keyboard, mouse, mikrofon, kamera, layar sentuh | Ikon perangkat input → kotak Proses |
| 3 | Proses: data diolah | CPU mengolah: menghitung, membandingkan, mengubah | Data berubah bentuk dalam kotak |
| 4 | Output: hasil keluar | Layar, speaker, printer | Hasil keluar dari kotak Proses |
| 5 | Contoh utuh: mengetik huruf A | Keyboard → CPU proses → Layar tampilkan A | Tiga langkah berurutan + teks |
| 6 | Ringkasan | Input = masuk, Proses = diolah, Output = keluar | Diagram ringkas |

### 2.3 Tips & Trik
1. Tanyakan: apakah data masuk (input) atau hasil keluar (output)? Yang di antara = proses.
2. Layar sentuh = input + output sekaligus.
3. Latih diri menyebutkan I-P-O saat memakai HP.

### 2.4 Eksplorasi: Drag & Drop
- **Instruksi:** "Seret setiap contoh ke kelompok yang tepat"
- **6 kartu** diseret ke zona Input / Proses / Output
- **Poin:** 20 × (kartu benar pada percobaan pertama ÷ 6)

### 2.5 Kuis Formatif (5 Soal)

| ID | Tipe | Level | Soal (Ringkas) | Kunci |
|---|---|---|---|---|
| K1-1 | PG | C2 | Pernyataan paling tepat tentang alur kerja komputer | A (input → proses → output) |
| K1-2 | PG | C2 | Keyboard berperan sebagai... | A (Input) |
| K1-3 | Mengurutkan | C2 | Susun alur mengetik huruf (4 langkah) | Tekan → Kirim kode → CPU proses → Tampil di layar |
| K1-4 | Menjodohkan | C1–C2 | Jodohkan: Mikrofon, CPU, Speaker → Input, Proses, Output | Mikrofon=Input, CPU=Proses, Speaker=Output |
| K1-5 | PG Skenario | C2 | Pindai kode QR: kamera=?, aplikasi=?, layar=? | A (Kamera=input, Aplikasi=proses, Layar=output) |

### 2.6 Latihan Soal (5 Soal)

| ID | Tipe | Level | Soal (Ringkas) | Kunci |
|---|---|---|---|---|
| L1-1 | Benar-Salah | C2 | Layar sentuh = input sekaligus output | Benar |
| L1-2 | PG | C1 | Perangkat output? | B (Printer) |
| L1-3 | Mengurutkan | C2 | Urutan mengubah foto jadi hitam putih | Potret → Olah → Tampil |
| L1-4 | Menjodohkan | C2 | Pemindai, Monitor, App hitung kata | Pemindai=Input, Monitor=Output, App=Proses |
| L1-5 | PG Skenario | C2 | Memutar lagu, output = ? | A (Speaker) |

### 2.7 Refleksi
- **Skala:** Seberapa paham menjelaskan alur IPO? (1–4)
- **Bagian tersulit:** Membedakan I/O | Memahami proses | Menyusun urutan | Sudah paham
- **Penjelasan sendiri:** Apa yang terjadi saat mengetik di HP sampai hasilnya muncul?

---

## 3. Unit 2: Komponen Arsitektur Von Neumann (TP 2, C1–C2)

### 3.1 Tantangan Pembuka
> "Bayangkan komputer sebagai dapur restoran. Siapa yang menerima pesanan, siapa yang memasak, siapa yang mengatur urutan, dan di mana bahan disimpan?"

### 3.2 Materi Singkat (6 Segmen)

| # | Judul | Inti Materi | Visual |
|---|---|---|---|
| 1 | Ide dari John von Neumann | 1945, program + data di memori yang sama | Sketsa kotak komponen |
| 2 | Unit input dan unit output | Keyboard/kamera = input, layar/printer = output | Ikon I/O devices |
| 3 | CPU: pusat pengolahan | CPU = ALU + Unit Kendali | Kotak CPU membesar |
| 4 | ALU dan unit kendali | ALU = hitung + bandingkan, CU = atur urutan | Dua sub-kotak dalam CPU |
| 5 | Memori: tempat menyimpan | Data + instruksi, "meja kerja" | Kotak memori + ikon data |
| 6 | Bekerja bersama | Input → Memori → CPU → Memori → Output | Animasi alur lengkap + analogi dapur |

### 3.3 Tips & Trik
1. Ingat K-A-M: Kendali mengatur, ALU menghitung, Memori menyimpan.
2. CPU = CU + ALU. Memori, I/O di luar CPU.
3. Stored-program concept: ganti program tanpa ubah hardware.

### 3.4 Eksplorasi: Label Interaktif
- **Instruksi:** "Ketuk tiap bagian untuk mengetahui fungsinya"
- **5 titik:** Unit Input, CPU (CU+ALU), Memori, Unit Output, Bus
- **Poin:** 4 × titik yang dibuka (max 20)

### 3.5 Kuis Formatif (5 Soal)

| ID | Tipe | Level | Soal (Ringkas) | Kunci |
|---|---|---|---|---|
| K2-1 | PG | C1 | Bagian yang mengatur urutan instruksi? | B (Unit kendali) |
| K2-2 | Menjodohkan | C1–C2 | ALU, CU, Memori, Output → fungsinya | ALU=hitung, CU=atur, Memori=simpan, Output=tampil |
| K2-3 | PG | C2 | Gagasan utama Von Neumann? | A (Program + data di memori sama) |
| K2-4 | PG Skenario | C2 | Program jumlah 25+17, siapa yang menghitung? | C (ALU) |
| K2-5 | PG | C1–C2 | CPU terdiri atas? | A (ALU + Unit Kendali) |

### 3.6 Latihan Soal (5 Soal)

| ID | Tipe | Level | Soal (Ringkas) | Kunci |
|---|---|---|---|---|
| L2-1 | Benar-Salah | C2 | Memori hanya simpan data, instruksi di tempat lain | Salah |
| L2-2 | PG Analogi | C2 | Analogi dapur: unit kendali = ? | B (Kepala koki) |
| L2-3 | PG | C1 | Bukan bagian CPU? | C (Memori) |
| L2-4 | Menjodohkan | C2 | Menghitung, Menyimpan, Menampilkan → komponen | Hitung=ALU, Simpan=Memori, Tampil=Output |
| L2-5 | PG | C2 | Dampak jika memori tidak ada? | A (CPU tak bisa jalan) |

### 3.7 Refleksi
- **Skala:** Seberapa paham menyebutkan komponen Von Neumann? (1–4)
- **Bagian tersulit:** ALU vs CU | Fungsi memori | Mengingat komponen | Sudah paham
- **Penjelasan sendiri:** Pembagian tugas CPU vs memori

---

## 4. Unit 3: Siklus Fetch–Decode–Execute (TP 3, C2)

### 4.1 Tantangan Pembuka
> "Saat kamu menekan 5 + 3 = di kalkulator, bagaimana komputer 'tahu' langkah apa yang harus dikerjakan lebih dulu?"

### 4.2 Materi Singkat (6 Segmen)

| # | Judul | Inti Materi | Visual |
|---|---|---|---|
| 1 | Instruksi satu per satu | Program = banyak instruksi berurutan. Program mini: (1) Ambil 5, (2) Tambah 3, (3) Simpan | Daftar instruksi |
| 2 | Tahap 1: Fetch (Ambil) | CU ambil instruksi dari memori, catat alamat berikutnya | Panah memori → CPU |
| 3 | Tahap 2: Decode (Baca) | CU terjemahkan instruksi: apa yang diminta + data apa | Kartu dibuka di CU |
| 4 | Tahap 3: Execute (Jalankan) | Komponen yang sesuai bekerja (ALU hitung / memori simpan) | Komponen aktif menyala |
| 5 | Siklus berulang | Setelah execute → kembali ke fetch instruksi berikutnya | Panah melingkar |
| 6 | Peran memori dan CPU | Memori simpan, CPU ambil-terjemah-jalankan | Diagram kerja sama |

### 4.3 Tips & Trik
1. Tiga kata: Ambil, Baca, Jalankan — urutan tidak boleh tertukar.
2. Analogi resep kue: ambil kartu → baca langkah → kerjakan.
3. Setelah Jalankan, selalu kembali ke Ambil = itulah siklus.

### 4.4 Eksplorasi: Simulasi Tebak Langkah
- **Instruksi:** "Menurutmu, apa yang terjadi di CPU setelah langkah ini?"
- **4 tebakan** — peserta didik pilih prediksi → simulasi tunjukkan jawaban
- **Poin:** 5 × tebakan benar pada percobaan pertama (max 20)

### 4.5 Kuis Formatif (5 Soal)

| ID | Tipe | Level | Soal (Ringkas) | Kunci |
|---|---|---|---|---|
| K3-1 | PG | C1 | Urutan tahap siklus instruksi? | B (Ambil, Baca, Jalankan) |
| K3-2 | PG | C2 | Pada tahap Fetch, CPU...? | C (Mengambil instruksi dari memori) |
| K3-3 | Mengurutkan | C2 | Susun siklus "Tambahkan 3" | Ambil → Baca → ALU jumlah |
| K3-4 | PG Simulasi | C2 | Instruksi 1 selesai, CPU selanjutnya? | D (Ambil instruksi 2 dari memori) |
| K3-5 | PG | C2 | Pernyataan paling tepat tentang peran memori & CPU | B (Memori simpan, CPU ambil+terjemah+jalankan) |

### 4.6 Latihan Soal (5 Soal)

| ID | Tipe | Level | Soal (Ringkas) | Kunci |
|---|---|---|---|---|
| L3-1 | Benar-Salah | C2 | Tahap Decode oleh CU untuk memahami instruksi | Benar |
| L3-2 | PG Prediksi | C2 | CPU selesai decode "Tambahkan 3", tahap berikutnya? | B (Execute: ALU jumlahkan) |
| L3-3 | Menjodohkan | C1–C2 | Ambil, Baca, Jalankan → deskripsi | Ambil=dari memori, Baca=terjemah, Jalankan=kerjakan |
| L3-4 | PG | C2 | "Simpan ke memori" — bagian aktif di execute? | C (Memori) |
| L3-5 | PG | C2 | Mengapa siklus harus berulang? | D (Program = banyak instruksi satu per satu) |

### 4.7 Refleksi
- **Skala:** Seberapa paham menjelaskan siklus FDE? (1–4)
- **Bagian tersulit:** Membedakan 3 tahap | Peran memori | Mengapa berulang | Sudah paham
- **Penjelasan sendiri:** Apa yang terjadi di CPU dan memori saat komputer jalankan satu instruksi?

---

## 5. Ringkasan Materi Per Unit (Buku Saku Digital)

### Unit 1 — Komponen Dasar
> **Komponen Von Neumann:** Terdiri dari Unit Input, CPU (CU & ALU), Memori (RAM), dan Unit Output yang terhubung oleh bus terpadu.

### Unit 2 — Siklus IPO
> **Alur Kerja IPO:** Data masuk lewat Input, diolah oleh CPU pada tahap Proses, dan ditampilkan atau dicetak lewat Output fisik/digital.

### Unit 3 — Eksekusi CPU
> **Siklus Instruksi:** CPU mengeksekusi perintah secara berulang melalui tahap Fetch (Ambil), Decode (Baca), dan Execute (Jalankan).

---

## 6. Pemetaan Soal → TP → Level Kognitif

| Soal | TP | Level | Tipe |
|---|---|---|---|
| K1-1 | TP 1 | C2 | PG |
| K1-2 | TP 1 | C2 | PG |
| K1-3 | TP 1 | C2 | Mengurutkan |
| K1-4 | TP 1 | C1–C2 | Menjodohkan |
| K1-5 | TP 1 | C2 | PG Skenario |
| K2-1 | TP 2 | C1 | PG |
| K2-2 | TP 2 | C1–C2 | Menjodohkan |
| K2-3 | TP 2 | C2 | PG |
| K2-4 | TP 2 | C2 | PG Skenario |
| K2-5 | TP 2 | C1–C2 | PG |
| K3-1 | TP 3 | C1 | PG |
| K3-2 | TP 3 | C2 | PG |
| K3-3 | TP 3 | C2 | Mengurutkan |
| K3-4 | TP 3 | C2 | PG Simulasi |
| K3-5 | TP 3 | C2 | PG |
