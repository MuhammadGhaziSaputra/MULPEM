# 🏆 Sistem Penilaian, Poin, dan Level (Scoring System)

## Studio Informatika — Aturan Skor & Gamifikasi

---

## 1. Dua Ukuran Terpisah

| Ukuran | Fungsi | Dihitung dari |
|---|---|---|
| **Skor Ketercapaian** (0–100) | Menilai pemahaman TP, ditunjukkan ke guru | Kuis formatif percobaan pertama **saja** |
| **Poin & Level** | Motivasi peserta didik | Semua aktivitas (tantangan, eksplorasi, kuis, latihan, refleksi) |

> **Penting:** Skor ketercapaian dan poin adalah dua hal terpisah. Poin tidak digunakan untuk menilai ketercapaian TP.

---

## 2. Skor Ketercapaian Per Unit

### 2.1 Formula

$$\text{Skor Kuis} = \frac{\sum \text{skor per soal}}{5} \times 100$$

### 2.2 Skor Per Soal

| Tipe Soal | Cara Skor |
|---|---|
| **Pilihan Ganda** | Benar = 1, Salah = 0 |
| **Benar-Salah** | Benar = 1, Salah = 0 |
| **Menjodohkan** | Pasangan benar ÷ total pasangan (misal: 3 benar dari 4 = 0,75) |
| **Mengurutkan** | Langkah di posisi benar ÷ total langkah (misal: 3 dari 4 = 0,75) |

### 2.3 Contoh Perhitungan

```
Soal K1-1: benar penuh     → 1,00
Soal K1-2: benar penuh     → 1,00  
Soal K1-3: 3 dari 4 urutan → 0,75
Soal K1-4: 2 dari 3 jodoh  → 0,67
Soal K1-5: benar penuh     → 1,00

Jumlah skor soal = 4,42
Skor kuis = (4,42 ÷ 5) × 100 = 88,3 → Tuntas ✓
```

### 2.4 Kategori Capaian

| Rentang Skor | Kategori | Tindak Lanjut (Saran) |
|---|---|---|
| ≥ 75 | ✅ **Tuntas** | Lanjut ke unit berikutnya |
| 50–74 | ⚠️ **Perlu Penguatan** | Disarankan buka kembali materi terkait |
| < 50 | 🔄 **Perlu Pengulangan** | Disarankan pelajari ulang dari awal unit |

> **Catatan:** Peserta didik tetap boleh lanjut ke unit berikutnya di semua kategori. Kategori hanya berupa saran.

---

## 3. Sistem Poin

### 3.1 Sumber Poin Per Unit

| Aktivitas | Poin Maksimum | Cara Mendapatkan |
|---|---|---|
| Tantangan Pembuka | **10** | Mengisi jawaban (bebas, tidak ada salah) |
| Eksplorasi / Latihan | **20** | Unit 1: 4 poin × 5 komponen dibuka; Unit 2–3: 5 poin × 4 tebakan benar pada percobaan pertama |
| Kuis Formatif | **60** | 12 poin × skor soal (percobaan pertama) |
| Percobaan Ulang Kuis | **+30** | 6 poin × skor soal yang diperbaiki (max 12/soal total) |
| Refleksi | **10** | Mengisi ketiga pertanyaan refleksi |
| **Subtotal Base** | **100** | |
| Bonus Latihan Soal | **+10** | 2 poin × 5 soal latihan benar penuh |
| **Total Max Per Unit** | **110** | |

### 3.2 Total Poin Keseluruhan

$$\text{Total Poin Max} = 3 \times 100 + 3 \times 10 = 330$$

> Angka 330 adalah poin maksimum jika semua kuis benar penuh + semua latihan benar + semua percobaan ulang sempurna.

### 3.3 Poin Kuis Detail

```
Percobaan pertama:
  Poin = 12 × skor_soal
  (Jika skor_soal = 1.0, poin = 12)
  (Jika skor_soal = 0.75, poin = 9)

Percobaan ulang (maksimal 1 kali per soal):
  Jika jawaban ulang benar penuh: +6 poin
  Batas akhir per soal: 12 poin
  Percobaan ulang TIDAK mengubah skor ketercapaian
```

### 3.4 Poin Eksplorasi Detail

**Unit 1 — Label Interaktif:**
```
Poin = 4 × jumlah komponen yang dibuka (max 5 komponen)
Semua dibuka = 20 poin
```

**Unit 2 & 3 — Simulasi Tebak:**
```
Poin = 5 × jumlah tebakan benar pada percobaan pertama (max 4 tebakan)
Semua benar = 20 poin
```

---

## 4. Sistem Level

| Level | Nama | Poin Minimum | Deskripsi |
|---|---|---|---|
| 1 | 🌱 **Pemula** | 0 | Baru memulai perjalanan belajar |
| 2 | 📚 **Penjelajah** | 100 | Sudah menyelesaikan aktivitas dasar |
| 3 | 🏆 **Master Arsitektur** | 200 | Menguasai materi dengan sangat baik |

---

## 5. Umpan Balik

### 5.1 Pola Umpan Balik Kuis

| Kondisi | Respon |
|---|---|
| **Jawaban Benar** | Warna hijau (teal) + ikon ✓ + penjelasan alasan benar (max 2 kalimat) |
| **Jawaban Salah** | Warna merah muda + ikon ✗ + letak kekeliruan + petunjuk (hint) perbaikan |

### 5.2 Contoh Umpan Balik

```
✅ Jawaban Benar (+25 Poin)
"Tepat! Urutannya selalu input, proses, lalu output: data masuk, 
diolah, kemudian hasilnya keluar."

❌ Jawaban Belum Tepat
"Belum tepat. Urutan terbalik. Data harus masuk lebih dulu 
sebelum bisa diolah."
💡 Petunjuk: Identifikasi tahap paling awal saat ransangan 
fisik pertama kali masuk ke dalam komputer.
```

### 5.3 Umpan Balik Refleksi

| Kondisi | Respon |
|---|---|
| Skala 3–4 + tidak ada bagian sulit | "Bagus! Kamu siap lanjut ke Unit berikutnya." |
| Skala 1–2 atau bagian sulit dipilih | "Tidak apa-apa, itu wajar. Buka kembali [segmen terkait] lalu coba latihan soal sebelum lanjut." |

---

## 6. Ringkasan Capaian Akhir

Ditampilkan setelah 3 unit selesai.

### 6.1 Elemen yang Ditampilkan

| Elemen | Contoh |
|---|---|
| **Total Poin** | 285 / 300 Poin |
| **Level Akhir** | Level 3 (Master Arsitektur) |
| **Rata-rata Skor Kuis** | 95 / 100 (Tercapai ≥ 80) |
| **Waktu Selesai** | 24 Menit Total |
| **Status Per Unit** | Unit 1: ✅ Selesai, Unit 2: ✅ Selesai, Unit 3: ✅ Selesai |

### 6.2 Detail Per Unit di Ringkasan

| Field | Unit 1 | Unit 2 | Unit 3 |
|---|---|---|---|
| Nama | Arsitektur Von Neumann | Alur Input-Process-Output | Siklus Fetch-Decode-Execute |
| Topik Utama | Komponen & Alur Bus | Skenario Komputasi Cetak | Simulasi CPU & Eksekusi |
| Tipe Kuis | Mencocokkan | Drag & Drop | Prediksi |
| Skor Kuis | 90 / 100 (TP 1) | 100 / 100 (TP 2) | 95 / 100 (TP 3) |
| Perolehan Poin | 🏅 +90 Poin | 🏅 +100 Poin | 🏅 +95 Poin |
| Refleksi | ✅ Sudah Diisi | ✅ Sudah Diisi | ✅ Sudah Diisi |

### 6.3 Pesan Penutup

| Jumlah Unit Tuntas | Pesan |
|---|---|
| 3 | "Selamat! Kamu telah menyelesaikan seluruh unit. Silakan tunjukkan ringkasan ini kepada guru." |
| 2 | "Bagus! Dua unit sudah tuntas. Buka kembali unit yang belum tuntas sebelum diskusi di kelas." |
| 1 | "Satu unit tuntas. Pelajari kembali unit lainnya agar lebih siap saat pembelajaran di kelas." |
| 0 | "Terima kasih sudah mencoba. Pelajari kembali materinya dan coba kuis lagi." |

---

## 7. Rekap untuk Guru

Guru dapat melihat ketercapaian dengan meminta siswa menunjukkan halaman Ringkasan Capaian.

### 7.1 Formula Kelas

$$\text{Rata-rata kelas} = \frac{\sum \text{skor kuis seluruh siswa}}{\text{jumlah siswa}}$$

$$\text{Persentase tuntas} = \frac{\text{siswa dengan skor} \geq 75}{\text{jumlah siswa}} \times 100\%$$

### 7.2 Indeks Kesukaran Soal

$$p = \frac{\text{siswa yang menjawab benar penuh}}{\text{jumlah siswa}}$$

| Nilai p | Kategori |
|---|---|
| < 0,30 | Sulit |
| 0,30 – 0,70 | Sedang |
| > 0,70 | Mudah |
