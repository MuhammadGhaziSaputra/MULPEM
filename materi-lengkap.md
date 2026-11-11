# 📖 Materi Lengkap & Naskah Narasi Media Pembelajaran

## Mata Pelajaran: Informatika Fase E (Kelas X SMA)
## Topik: Mekanisme Kerja Sistem Komputer (Elemen SK)

---

## 1. Halaman Pembuka & Informasi Awal

### Teks Utama & Metadata
- **Identitas Media:** Informatika Kelas X SMA Negeri 2 Makassar • Modul Terbuka Mandiri • Semester Genap
- **Badge:** Fase E / Kelas X | 3 Unit Interaktif | Estimasi: 45 Menit Belajar | Bebas Akses Tanpa Login
- **Judul Utama:** Mekanisme Kerja Sistem Komputer
- **Deskripsi:** Eksplorasi visual cara kerja komputer mulai dari Arsitektur Von Neumann, alur Input – Proses – Output (IPO), hingga siklus instruksi Fetch – Decode – Execute di dalam CPU.
- **Tombol Aksi (CTA):**
  1. `Mulai Belajar Sekarang →`
  2. `Lihat Tujuan Pembelajaran`
  3. `Petunjuk Penggunaan`

### Tujuan Pembelajaran (3 Sasaran TP)
1. **TP 1 — Membedakan Fungsi Komponen Utama:** Mengidentifikasi peranan Unit Pemrosesan (ALU, CU), Unit Memori, dan piranti I/O pada arsitektur Von Neumann secara komprehensif.
2. **TP 2 — Menyusun Alur Input – Proses – Output (IPO):** Menganalisis dan menyusun tahapan alur IPO secara tepat dari berbagai skenario kasus komputasi sehari-hari.
3. **TP 3 — Siklus Fetch – Decode – Execute (Skor Min. 80):** Menentukan urutan instruksi mikro di dalam register dan mengeksekusi simulasi logika hingga mencapai ketuntasan minimum.

### Petunjuk Penggunaan & 6 Langkah Alur Belajar
1. **Langkah 01 — Tantangan Pembuka:** Pertanyaan pemantik untuk memancing rasa ingin tahu dan mengaktifkan pengetahuan awalmu. (+10 Poin)
2. **Langkah 02 — Materi & Animasi:** Baca ringkasan konsep esensial yang disertai diagram visual dan animasi alur data.
3. **Langkah 03 — Eksplorasi / Latihan:** Sentuh komponen, coba simulasi, atau susun kartu untuk memperdalam pemahamanmu. (+20 Poin Maks.)
4. **Langkah 04 — Kuis Akhir Unit:** Uji ketercapaian belajarmu dengan kuis bertahap yang dilengkapi penjelasan langsung per soal.
5. **Langkah 05 — Refleksi:** Kenali bagian materi yang sudah kamu kuasai dan bagian yang masih memerlukan bantuan bimbingan guru. (+10 Poin)
6. **Langkah 06 — Ringkasan Materi:** Simpan intisari konsep penting sebagai buku saku digital untuk persiapan asesmen di kelas.
- **Catatan Sistem:** *Dapat dikerjakan berulang hingga tuntas tanpa batas sesi. Fitur Auto-Save aktif otomatis di perambanmu.*

---

## 2. Unit 1: Komponen Arsitektur Von Neumann

### 2.1 Tantangan Pembuka Unit 1
- **Pertanyaan Pemantik:**
  > *“Bayangkan komputer sebagai dapur restoran. Siapa yang menerima pesanan, siapa yang memasak bahan, siapa yang mengatur alur pekerjaan koki, dan di mana seluruh bahan masakan disimpan? Tuliskan tebakanmu!”*
- **Tipe Interaksi:** Kolom Isian Bebas Singkat.
- **Umpan Balik Respons:**
  > *“Terima kasih, tebakanmu sudah tersimpan! Di akhir unit ini kamu akan melihat komponen komputer mana saja yang cocok dengan peran di dapur restoran.”* (+10 Poin)

### 2.2 Materi Singkat & Diagram Arsitektur
- **Segmen 1 — Gagasan John von Neumann (1945):**
  Pada pertengahan tahun 1940-an, seorang matematikawan bernama John von Neumann memperkenalkan arsitektur komputer modern. Konsep intinya adalah **Stored-Program Concept**, yaitu instruksi program dan data disimpan bersama-sama dalam satu memori utama (RAM) yang terpadu, dieksekusi secara sekuensial (berurutan).
- **Segmen 2 — Pintu Gerbang (Unit Input & Unit Output):**
  - **Unit Input:** Pintu masuk sinyal eksternal ke dalam komputer (misal: Keyboard, Mouse, Mikrofon, Kamera).
  - **Unit Output:** Pintu keluar untuk menyajikan hasil olahan kepada manusia (misal: Layar Monitor, Printer, Speaker).
- **Segmen 3 — Otak Pusat: Central Processing Unit (CPU):**
  CPU bertugas mengolah seluruh perintah biner. Model Von Neumann membagi CPU ke dalam dua organ vital:
  - **Control Unit (CU):** Pengatur lalu lintas instruksi, mengarahkan komponen lain agar bekerja sinkron pada saat yang tepat.
  - **Arithmetic Logic Unit (ALU):** Kalkulator komputer yang mengeksekusi perhitungan matematika numerik (+, -, ×, ÷) dan perbandingan logika (AND, OR, NOT, <, >).
- **Segmen 4 — Memori Utama (RAM):**
  Berada di luar CPU namun terhubung erat. Berfungsi sebagai penampung sementara bagi instruksi program dan data kerja saat sistem menyala (*meja kerja CPU*).
- **Segmen 5 — Jalur Penghubung (Sistem Bus):**
  Data Bus, Address Bus, dan Control Bus menghubungkan seluruh modul ke memori tunggal secara terintegrasi.
- **Segmen 6 — Analogi Dapur Restoran:**
  | Peran di Dapur Restoran | Bagian Komputer | Fungsi Ekivalen |
  |---|---|---|
  | Pelayan penerima pesanan tamu | **Unit Input** | Memasukkan data/perintah dari luar |
  | Kepala koki pengatur pesanan | **Unit Kendali (CU)** | Mengatur urutan jalannya instruksi |
  | Juru masak pengolah bahan makanan | **ALU** | Mengolah, menghitung, dan membandingkan data |
  | Meja dapur & lemari bahan | **Memori Utama (RAM)** | Tempat menampung bahan & resep sebelum diolah |
  | Pelayan pengantar hidangan ke meja | **Unit Output** | Menyajikan hasil olahan kepada pengguna |

### 2.3 Tips & Trik Unit 1
1. **Ingat Rumus K-A-M:** **K**endali mengatur, **A**LU menghitung, **M**emori menyimpan.
2. **Formula CPU:** $\text{CPU} = \text{CU} + \text{ALU}$. Memori utama dan I/O berada di luar sirkuit CPU.
3. Keunggulan rancangan Von Neumann: mengganti aplikasi program tidak perlu membongkar rangkaian perangkat keras!

### 2.4 Eksplorasi Label Interaktif (Diagram Ketuk Komponen)
Pengguna mengetuk 5 area diagram sirkuit untuk membuka kartu penjelasan:
1. **Kotak Unit Input:** Memasukkan sinyal data eksternal ke dalam sistem komputer (Keyboard, Mouse, Sensor).
2. **Kotak ALU:** Sirkuit komputasi numerik dan logika komparasi biner.
3. **Kotak Unit Kendali (CU):** Pusat komando pengarah urutan kerja instruksi.
4. **Kotak Memori Utama:** RAM penampung instruksi dan variabel kerja secara acak dan cepat.
5. **Kotak Unit Output:** Terminal penyajian data olahan ke indra manusia (Monitor, Printer).
*(Setiap komponen bernilai 4 poin. Membuka kelimanya = +20 Poin Penuh).*

### 2.5 Refleksi Unit 1
- **Pertanyaan 1 (Skala 1–4):** Seberapa yakin kamu membedakan fungsi komponen utama Arsitektur Von Neumann?
- **Pertanyaan 2 (Bagian Tersulit):** Membedakan ALU dan CU / Fungsi Memori Utama / Mengingat Komponen / Tidak ada, sudah paham.
- **Pertanyaan 3 (Esai Singkat):** Jelaskan dengan bahasamu sendiri bagaimana pembagian tugas antara CPU dan Memori saat komputer bekerja! (+10 Poin)

---

## 3. Unit 2: Alur Kerja Input – Process – Output (IPO)

### 3.1 Tantangan Pembuka Unit 2
- **Pertanyaan Pemantik:**
  > *“Saat kamu mengetik pesan di keyboard HP dan beberapa milidetik kemudian hurufnya langsung muncul di layar, menurutmu apa saja tahap yang terjadi di baliknya?”*
- **Umpan Balik:** *“Terima kasih, jawabanmu tersimpan! Mari kita telusuri bagaimana data fisikmu diubah menjadi sinyal digital dan diproses hingga tampil.”* (+10 Poin)

### 3.2 Materi Inti & Animasi Alur IPO
- **Segmen 1 — Prinsip Kerja Tiga Langkah:**
  Semua gawai komputasi (smartphone, smartwatch, laptop, server) beroperasi dalam siklus deterministik searah: **Input $\rightarrow$ Process $\rightarrow$ Output**.
- **Segmen 2 — Tahap Input (Masukan):**
  Perangkat input mendeteksi rangsangan fisik (ketukan tombol, gelombang suara, pantulan cahaya optik kamera, getaran accelerometer) dan mengonversinya menjadi sinyal elektrik biner (`0` dan `1`).
- **Segmen 3 — Tahap Process (Pemrosesan):**
  Data biner masuk ke CPU. CPU membaca instruksi program, mengkalkulasi nilai, mengompresi format, atau menyusun tata letak visual pada register dan memori.
- **Segmen 4 — Tahap Output (Keluaran):**
  Hasil olahan biner dikonversi kembali ke bentuk fisik yang dapat dicerna panca indra manusia: pendaran cahaya piksel di layar, getaran membran speaker, atau semprotan tinta printer.
- **Segmen 5 — Studi Kasus: Mengetik Huruf 'A':**
  1. *Input:* Jari menekan tuts keyboard $\rightarrow$ menghasilkan kode ASCII biner `01000001`.
  2. *Process:* Bus mengirim kode ke CPU $\rightarrow$ sistem operasi membaca font vector dan mengalokasikan buffer piksel layar.
  3. *Output:* Monitor menyalakan kombinasi piksel RGB menampilkan bentuk huruf "A".

### 3.3 Tips & Trik Unit 2
- **Uji Dua Pertanyaan:** Tanyakan: *Apakah data sedang masuk dari dunia luar (Input)?* atau *Apakah informasi sedang keluar menuju pengguna (Output)?* Segala manipulasi yang terjadi di antara keduanya adalah **Proses**.
- **Layar Sentuh (Touchscreen):** Berperan ganda sebagai peranti masukan (saat jari menyentuh kaca sensor kapasitif) dan peranti keluaran (saat panel OLED memancarkan gambar).

### 3.4 Eksplorasi Drag & Drop (Klasifikasi Kasus Komputasi)
Pengguna menyeret 6 kartu skenario ke dalam 3 wadah (Input, Proses, Output):
1. *Mengetik huruf di keyboard* $\rightarrow$ **Input**
2. *Merekam suara lewat mikrofon* $\rightarrow$ **Input**
3. *CPU menghitung hasil penjumlahan* $\rightarrow$ **Proses**
4. *Aplikasi mengedit filter foto hitam-putih* $\rightarrow$ **Proses**
5. *Hasil nilai rapor tampil di layar monitor* $\rightarrow$ **Output**
6. *Mencetak lembar dokumen di mesin printer* $\rightarrow$ **Output**
*(Dihitung dari percobaan pertama: Benar semua = +20 Poin).*

### 3.5 Refleksi Unit 2
- **Pertanyaan 1 (Skala 1–4):** Seberapa paham kamu menyusun dan membedakan alur Input – Proses – Output?
- **Pertanyaan 2 (Bagian Tersulit):** Membedakan Input vs Output / Menentukan apa itu Proses / Mengurutkan alur bertahap / Tidak ada.
- **Pertanyaan 3 (Esai Singkat):** Tuliskan contoh satu peristiwa teknologi sehari-hari dan bedakan mana input, proses, serta output-nya! (+10 Poin)

---

## 4. Unit 3: Siklus Instruksi Fetch – Decode – Execute

### 4.1 Tantangan Pembuka Unit 3
- **Pertanyaan Pemantik:**
  > *“Saat kamu menekan angka 5 + 3 = di aplikasi kalkulator, bagaimana prosesor di dalam komputer ‘tahu’ langkah mana yang harus dikerjakan terlebih dahulu?”*
- **Umpan Balik:** *“Jawabanmu tersimpan! CPU tidak memiliki sihir—ia bekerja dengan siklus instruksi kaku yang berulang miliaran kali per detik.”* (+10 Poin)

### 4.2 Materi Inti & Simulasi Siklus FDE
- **Segmen 1 — Program Mini 3 Instruksi:**
  CPU mengerjakan program dengan mengeksekusi instruksi satu per satu. Contoh simulasi kita:
  - Instruksi 1: `LOAD 5` (Ambil angka 5 ke Register)
  - Instruksi 2: `ADD 3` (Jumlahkan dengan angka 3)
  - Instruksi 3: `STORE RAM` (Simpan angka 8 ke memori)
- **Segmen 2 — Tahap 1: Ambil (Fetch):**
  Unit Kendali (CU) membaca alamat memori dari *Program Counter*, lalu mengambil kode instruksi biner dari RAM dan memindahkannya ke *Instruction Register (IR)* di dalam CPU.
- **Segmen 3 — Tahap 2: Baca / Terjemahkan (Decode):**
  Unit Kendali membedah opcode instruksi biner tersebut: *Operasi apa yang diminta? Nilai atau register apa saja yang dibutuhkan?*. Sirkuit logika kalkulasi dipersiapkan.
- **Segmen 4 — Tahap 3: Jalankan (Execute):**
  Komponen terkait mengeksekusi perintah. Jika perintah matematika (misal `ADD`), sirkuit adder ALU menyala dan menghitung hasilnya. Jika perintah simpan, data ditulis kembali ke memori kerja.
- **Segmen 5 — Mengapa Disebut Siklus?**
  Setelah eksekusi satu instruksi selesai, CPU tidak pernah berhenti. Nilai pencatat alamat bertambah satu, dan CPU langsung kembali ke tahap **Fetch** untuk instruksi selanjutnya. Siklus berulang selama komputer menyala.

### 4.3 Tips & Trik Unit 3
- **Analogi Resep Masak Kue:**
  1. *Fetch:* Mengambil satu lembar kartu resep dari rak buku.
  2. *Decode:* Membaca dan memahami langkah: *"Tuangkan 2 sendok gula"*.
  3. *Execute:* Tangan juru masak benar-benar menuangkan gula ke adonan.
- **Urutan Mutlak:** Ambil $\rightarrow$ Baca $\rightarrow$ Jalankan (FDE). Tidak pernah terbalik!

### 4.4 Eksplorasi Simulasi Tebak Langkah (Step Simulation)
Pengguna menebak tahap berikutnya pada simulasi jalannya CPU:
1. *Saat program kalkulator baru dimulai:* Pengguna memilih **"Ambil instruksi 1 dari memori RAM (Fetch)"**.
2. *Saat instruksi 1 sudah berada di CPU:* Pengguna memilih **"Unit Kendali membaca dan menerjemahkan instruksi (Decode)"**.
3. *Saat instruksi 2 `ADD 3` sedang di-execute:* Pengguna memilih **"Komponen ALU menjumlahkan angka"**.
4. *Saat instruksi 3 `STORE` dieksekusi:* Pengguna memilih **"Memori RAM menerima dan menampung hasil 8"**.
*(4 tebakan benar = +20 Poin).*

### 4.5 Refleksi Unit 3
- **Pertanyaan 1 (Skala 1–4):** Seberapa paham kamu menjelaskan urutan siklus Fetch – Decode – Execute?
- **Pertanyaan 2 (Bagian Tersulit):** Membedakan peran tiap tahap / Peran memori saat fetch / Alasan siklus berulang / Tidak ada.
- **Pertanyaan 3 (Esai Singkat):** Ceritakan dengan bahasamu sendiri apa yang terjadi di CPU saat mengeksekusi satu baris instruksi! (+10 Poin)

---

## 5. Ringkasan Penguatan Materi (Buku Saku Digital)

Tiga kartu ringkasan intisari yang dapat disalin pengguna dengan satu klik tombol `Salin Intisari`:

1. **01. Komponen Dasar (Arsitektur Von Neumann):**
   > *Komputer Von Neumann menyatukan penyimpanan data dan instruksi program pada Memori Utama (RAM) bersama. Terdiri atas Unit Input, CPU (Unit Kendali & ALU), Memori Utama, dan Unit Output yang dihubungkan melalui sistem bus data, alamat, dan kontrol.*
2. **02. Alur Kerja IPO (Input – Process – Output):**
   > *Setiap sistem komputasi beroperasi deterministik: Sinyal fisik ditangkap oleh perangkat Input, diolah dan dikalkulasi secara biner oleh CPU pada tahap Proses, dan ditampilkan atau disampaikan dalam format visual/suara/cetak lewat perangkat Output.*
3. **03. Eksekusi CPU (Siklus Fetch – Decode – Execute):**
   > *CPU menjalankan program secara berulang baris demi baris: Mengambil kode dari RAM (Fetch), menerjemahkan maksud operasi oleh Unit Kendali (Decode), dan mengeksekusi operasi pada ALU atau bus memori (Execute) hingga seluruh perintah tuntas.*
