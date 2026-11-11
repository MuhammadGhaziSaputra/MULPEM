// Bank Soal Lengkap 48 Butir (24 Kuis Formatif + 24 Latihan Soal)
// Diacak dinamis setiap sesi (5 soal acak per sesi kuis/latihan)
// Sistem Komputer Kelas X SMA Negeri 2 Makassar

export const quizBank = {
  unit1: {
    // 5 Soal Kuis Formatif Unit 1 (Penilaian TP 1)
    quiz: [
      {
        id: "K1-1",
        code: "K1-1",
        type: "multiple-choice",
        level: "C2 (Pemahaman)",
        question: "Pernyataan manakah yang paling tepat tentang alur kerja sebuah sistem komputer?",
        options: [
          { key: "A", text: "Komputer menerima data (input), mengolahnya (proses), lalu menampilkan hasil (output)." },
          { key: "B", text: "Komputer mengolah data lebih dulu di CPU, baru menerimanya dari masukan pengguna." },
          { key: "C", text: "Komputer hanya menampilkan data visual tanpa melalui tahapan pengolahan apapun." },
          { key: "D", text: "Output adalah perangkat tempat data mentah pertama kali dimanipulasi dan diolah." }
        ],
        correctKey: "A",
        scoreWeight: 1.0,
        points: 12,
        feedback: {
          correct: "Tepat! Urutan kerja komputer selalu input, proses, lalu output: data masuk, diolah di CPU, kemudian hasilnya keluar.",
          incorrect: "Belum tepat. Urutan kerja komputer selalu deterministik: data harus masuk terlebih dahulu (Input), baru bisa diolah (Proses), dan disajikan (Output)."
        },
        hint: "Ingat urutan baku cara kerja komputer sejak data fisik dimasukkan hingga informasi tersaji ke layar."
      },
      {
        id: "K1-2",
        code: "K1-2",
        type: "multiple-choice",
        level: "C2 (Pemahaman)",
        question: "Kamu menekan tuts huruf 'A' pada keyboard laptop dan huruf 'A' seketika muncul di layar. Dalam peristiwa tersebut, keyboard berperan sebagai …",
        options: [
          { key: "A", text: "Unit Input (Masukan)" },
          { key: "B", text: "Unit Proses (Pemroses)" },
          { key: "C", text: "Unit Output (Keluaran)" },
          { key: "D", text: "Unit Penyimpan Hasil" }
        ],
        correctKey: "A",
        scoreWeight: 1.0,
        points: 12,
        feedback: {
          correct: "Tepat! Keyboard memasukkan sinyal ketukan ke komputer sehingga berperan sebagai piranti input.",
          incorrect: "Belum tepat. Keyboard tidak mengolah data dan tidak menampilkan visual, melainkan mengirimkan sinyal masukkan dari jari pengguna."
        },
        hint: "Apakah keyboard berfungsi memasukkan data, mengolahnya, atau menampilkan hasilnya?"
      },
      {
        id: "K1-3",
        code: "K1-3",
        type: "ordering",
        level: "C2 (Aplikasi)",
        question: "Susun alur berikut dari langkah pertama sampai terakhir saat kamu mengetik huruf pada komputer:",
        items: [
          { id: "step1", text: "Kamu menekan tombol huruf pada keyboard" },
          { id: "step2", text: "Keyboard mengirim kode sinyal tombol ke komputer" },
          { id: "step3", text: "CPU memproses kode tombol yang diterima" },
          { id: "step4", text: "Huruf menyala dan tampil di layar monitor" }
        ],
        correctOrder: ["step1", "step2", "step3", "step4"],
        scoreWeight: 1.0,
        points: 12,
        feedback: {
          correct: "Tepat! Data masuk lebih dulu (ketuk tombol), dikirim sinyalnya, diproses oleh CPU, dan hasilnya tampil terakhir di layar.",
          incorrect: "Belum tepat. Mulai dari tindakan fisik pengguna, pengiriman sinyal elektrik, pengolahan oleh CPU, dan terakhir penyajian ke layar."
        },
        hint: "Pikirkan pergerakan data: dari jari pengguna → sinyal kabel → otak CPU → mata pengguna."
      },
      {
        id: "K1-4",
        code: "K1-4",
        type: "matching",
        level: "C1-C2 (Penjodohan)",
        question: "Pasangkan setiap komponen atau perangkat berikut dengan fungsinya yang paling tepat dalam arsitektur Von Neumann:",
        leftItems: [
          { id: "l1", label: "Control Unit (CU)", subtext: "Pengendali Alur Pusat" },
          { id: "l2", label: "Arithmetic Logic Unit (ALU)", subtext: "Kalkulasi & Komparasi" },
          { id: "l3", label: "Memori Utama (RAM)", subtext: "Penyimpanan Kerja" },
          { id: "l4", label: "Unit Input", subtext: "Gerbang Masukan Pengguna" }
        ],
        rightItems: [
          { id: "r1", text: "Mengatur dan mengendalikan jalannya instruksi serta aliran data di dalam CPU." },
          { id: "r2", text: "Melakukan seluruh perhitungan aritmatika dan perbandingan logika biner." },
          { id: "r3", text: "Menyimpan data dan instruksi program sementara selama komputer bekerja." },
          { id: "r4", text: "Menerima data dan perintah masukan dari pengguna ke dalam sistem komputer." }
        ],
        correctPairs: { "l1": "r1", "l2": "r2", "l3": "r3", "l4": "r4" },
        scoreWeight: 1.0,
        points: 12,
        feedback: {
          correct: "Pasangan Tepat! (+25 Poin per pasangan). Setiap komponen memiliki pembagian peran yang sangat tegas dalam arsitektur Von Neumann.",
          incorrect: "Belum tepat! Periksa kembali perbedaan antara pengatur instruksi (CU), kalkulator (ALU), meja kerja (RAM), dan pintu masuk (Input)."
        },
        hint: "Ingat rumus K-A-M: Kendali mengatur, ALU menghitung, Memori menyimpan."
      },
      {
        id: "K1-5",
        code: "K1-5",
        type: "multiple-choice",
        level: "C2 (Studi Kasus)",
        question: "Kamu memindai kode QR pembayaran di kantin sekolah. Kamera menangkap kode QR, aplikasi kasir memeriksa saldo di sistem, lalu layar HP menampilkan notifikasi 'Pembayaran Berhasil'. Analisis pasangan IPO yang tepat adalah …",
        options: [
          { key: "A", text: "Kamera = Input, Aplikasi memeriksa saldo = Proses, Layar HP = Output" },
          { key: "B", text: "Kamera = Proses, Aplikasi memeriksa saldo = Input, Layar HP = Output" },
          { key: "C", text: "Kamera = Output, Aplikasi memeriksa saldo = Proses, Layar HP = Input" },
          { key: "D", text: "Kamera = Input, Aplikasi memeriksa saldo = Output, Layar HP = Proses" }
        ],
        correctKey: "A",
        scoreWeight: 1.0,
        points: 12,
        feedback: {
          correct: "Tepat! Kamera menangkap data dari dunia luar (Input), aplikasi memvalidasi dan memproses data (Proses), dan layar menyajikan hasil (Output).",
          incorrect: "Belum tepat. Kamera adalah mata komputer (Input), validasi saldo adalah olah data (Proses), dan tulisan di layar adalah hasil akhir (Output)."
        },
        hint: "Bedakan perangkat sensor penangkap data, program penguji logika saldo, dan media penampil status."
      },
      {
        id: "K1-6",
        code: "K1-6",
        type: "multiple-choice",
        level: "C2 (Studi Kasus)",
        question: "Sebuah smartphone menggunakan layar sentuh (touchscreen) yang mampu mendeteksi ketukan jari sekaligus menampilkan tampilan antarmuka aplikasi. Berdasarkan mekanisme kerjanya, layar sentuh berperan sebagai …",
        options: [
          { key: "A", text: "Peranti Input sekaligus peranti Output (peranti hibrida)" },
          { key: "B", text: "Hanya unit Pemroses Utama (CPU)" },
          { key: "C", text: "Hanya media penyimpan sementara (RAM)" },
          { key: "D", text: "Sistem Bus pengatur daya baterai" }
        ],
        correctKey: "A",
        scoreWeight: 1.0,
        points: 12,
        feedback: {
          correct: "Tepat! Layar sentuh memiliki sensor sentuh untuk menerima data masukan (Input) sekaligus panel display untuk menampilkan informasi visual (Output).",
          incorrect: "Belum tepat. Perhatikan dua fungsi layar sentuh: menangkap sentuhan jari (Input) dan memancarkan gambar layar (Output)."
        },
        hint: "Apakah layar HP hanya menerima sentuhan, atau juga menampilkan gambar ke mata pengguna?"
      },
      {
        id: "K1-7",
        code: "K1-7",
        type: "multiple-choice",
        level: "C2 (Pemahaman)",
        question: "Ketika aliran listrik laptop tiba-tiba terputus sebelum dokumen sempat disimpan, seluruh data yang sedang aktif dikerjakan di Memori Utama (RAM) ikut lenyap. Hal ini terjadi karena sifat RAM yaitu …",
        options: [
          { key: "A", text: "Volatil (memori kerja sementara yang membutuhkan aliran daya agar data bertahan)" },
          { key: "B", text: "Permanen (menyimpan seluruh berkas secara tetap walau daya dimatikan)" },
          { key: "C", text: "Mekanis (menggunakan piringan optik berkecepatan rendah)" },
          { key: "D", text: "Eksternal (berada di luar rangkaian sistem komputer utama)" }
        ],
        correctKey: "A",
        scoreWeight: 1.0,
        points: 12,
        feedback: {
          correct: "Tepat! RAM bersifat volatil: sangat cepat diakses CPU sebagai meja kerja sementara, namun isinya langsung kosong begitu listrik padam.",
          incorrect: "Belum tepat. Memori yang tetap menyimpan data saat listrik mati adalah penyimpanan sekunder (SSD/HDD), sedangkan RAM bersifat sementara (volatil)."
        },
        hint: "Ingat istilah khusus untuk memori yang datanya hilang saat arus listrik terputus."
      },
      {
        id: "K1-8",
        code: "K1-8",
        type: "multiple-choice",
        level: "C1-C2 (Arsitektur)",
        question: "Pada arsitektur Von Neumann, komponen apa yang bertugas menjadi jalur sirkuit kabel penghubung agar data biner, alamat memori, dan sinyal kendali dapat mengalir antara CPU, RAM, dan piranti I/O?",
        options: [
          { key: "A", text: "Sistem Bus (Data Bus, Address Bus, dan Control Bus)" },
          { key: "B", text: "Arithmetic Logic Unit (ALU)" },
          { key: "C", text: "Monitor LCD / OLED" },
          { key: "D", text: "Mesin Printer Tinta" }
        ],
        correctKey: "A",
        scoreWeight: 1.0,
        points: 12,
        feedback: {
          correct: "Tepat! Sistem Bus menjadi jalur lalu lintas elektronik yang menghubungkan CPU, Memori Utama, dan piranti I/O secara terpadu.",
          incorrect: "Belum tepat. ALU hanya menghitung dan Monitor hanya menampilkan gambar, sedangkan jalur komunikasi datanya adalah Sistem Bus."
        },
        hint: "Ingat istilah jalur transportasi elektron yang menghubungkan seluruh komponen hardware komputer."
      }
    ],

    // 8 Soal Bank Latihan Unit 1 (Diacak 5 soal per sesi, Bonus +2 Poin per soal)
    practice: [
      {
        id: "L1-1",
        type: "true-false",
        level: "C2",
        question: "Layar sentuh (touchscreen) pada smartphone dapat berperan sebagai peranti input sekaligus peranti output.",
        options: [
          { key: "Benar", text: "Benar" },
          { key: "Salah", text: "Salah" }
        ],
        correctKey: "Benar",
        bonusPoints: 2,
        explanation: "Tepat! Layar sentuh menerima sentuhan jari (input) dan panel layarnya menampilkan gambar visual (output)."
      },
      {
        id: "L1-2",
        type: "multiple-choice",
        level: "C1",
        question: "Manakah di antara perangkat keras berikut yang berfungsi khusus sebagai piranti Output?",
        options: [
          { key: "A", text: "Mouse optik" },
          { key: "B", text: "Mesin Printer" },
          { key: "C", text: "Kamera Web (Webcam)" },
          { key: "D", text: "Mikrofon headset" }
        ],
        correctKey: "B",
        bonusPoints: 2,
        explanation: "Tepat! Printer mengeluarkan hasil pemrosesan komputer dalam bentuk cetakan tinta fisik di kertas."
      },
      {
        id: "L1-3",
        type: "ordering",
        level: "C2",
        question: "Susun alur pengolahan saat kamu mengubah foto berwarna menjadi hitam-putih di aplikasi HP:",
        items: [
          { id: "p1", text: "Kamu memotret objek menggunakan kamera HP" },
          { id: "p2", text: "Aplikasi foto mengolah dan mengubah warna piksel menjadi skala abu-abu" },
          { id: "p3", text: "Foto hitam-putih tampil di layar HP" }
        ],
        correctOrder: ["p1", "p2", "p3"],
        bonusPoints: 2,
        explanation: "Tepat! Objek dipotret (Input) → algoritma mengubah piksel (Proses) → hasil tampak di layar (Output)."
      },
      {
        id: "L1-4",
        type: "multiple-choice",
        level: "C2",
        question: "Perangkat pemindai dokumen (Scanner) mengonversi kertas fisik menjadi berkas PDF digital. Dalam sistem komputer, scanner berperan sebagai …",
        options: [
          { key: "A", text: "Perangkat Input" },
          { key: "B", text: "Perangkat Proses" },
          { key: "C", text: "Perangkat Output" },
          { key: "D", text: "Perangkat Jaringan" }
        ],
        correctKey: "A",
        bonusPoints: 2,
        explanation: "Tepat! Scanner membaca dokumen dari luar dan memasukkan datanya ke dalam komputer."
      },
      {
        id: "L1-5",
        type: "multiple-choice",
        level: "C2",
        question: "Saat mendengarkan lagu di laptop, alunan musik terdengar merdu dari speaker. Komponen yang berperan sebagai output adalah …",
        options: [
          { key: "A", text: "Speaker" },
          { key: "B", text: "Berkas lagu MP3 di memori" },
          { key: "C", text: "CPU yang memproses file audio" },
          { key: "D", text: "Jari yang mengklik tombol play" }
        ],
        correctKey: "A",
        bonusPoints: 2,
        explanation: "Tepat! Speaker mengonversi data audio digital menjadi gelombang suara yang dapat didengar telinga manusia."
      },
      {
        id: "L1-6",
        type: "multiple-choice",
        level: "C2",
        question: "Saat melakukan panggilan video (video call) di laptop, webcam menangkap wajahmu dan speaker mengeluarkan suara temanmu. Pasangan fungsi yang tepat adalah …",
        options: [
          { key: "A", text: "Webcam = Input, Speaker = Output" },
          { key: "B", text: "Webcam = Output, Speaker = Input" },
          { key: "C", text: "Webcam = Proses, Speaker = Memori" },
          { key: "D", text: "Webcam = Memori, Speaker = Proses" }
        ],
        correctKey: "A",
        bonusPoints: 2,
        explanation: "Tepat! Webcam memasukkan citra visual wajah ke sistem (Input), sedangkan speaker mengeluarkan suara kepada pengguna (Output)."
      },
      {
        id: "L1-7",
        type: "true-false",
        level: "C2",
        question: "Pada arsitektur Von Neumann, Memori Utama (RAM) berada di dalam sirkuit inti prosesor bersama ALU dan Control Unit.",
        options: [
          { key: "Benar", text: "Benar" },
          { key: "Salah", text: "Salah" }
        ],
        correctKey: "Salah",
        bonusPoints: 2,
        explanation: "Tepat! Pernyataan itu salah, karena isi inti CPU hanyalah Control Unit (CU) dan ALU, sedangkan Memori Utama (RAM) berada di luar CPU."
      },
      {
        id: "L1-8",
        type: "multiple-choice",
        level: "C1",
        question: "Mikrofon headset yang kamu pakai untuk merekam tugas presentasi suara termasuk dalam kelompok …",
        options: [
          { key: "A", text: "Unit Input" },
          { key: "B", text: "Unit Output" },
          { key: "C", text: "Unit Aritmatika" },
          { key: "D", text: "Unit Kendali" }
        ],
        correctKey: "A",
        bonusPoints: 2,
        explanation: "Tepat! Mikrofon menangkap gelombang suara dari dunia luar dan mengubahnya menjadi sinyal digital masuk ke komputer."
      }
    ]
  },

  unit2: {
    // 8 Soal Bank Kuis Formatif Unit 2 (Diacak 5 soal per sesi, Penilaian TP 2)
    quiz: [
      {
        id: "K2-1",
        code: "K2-1",
        type: "multiple-choice",
        level: "C1 (Pengetahuan)",
        question: "Bagian di dalam prosesor yang bertugas mengatur urutan pelaksanaan instruksi dan mengarahkan kerja komponen lain adalah …",
        options: [
          { key: "A", text: "Arithmetic Logic Unit (ALU)" },
          { key: "B", text: "Control Unit (Unit Kendali)" },
          { key: "C", text: "Memori Utama (RAM)" },
          { key: "D", text: "Unit Output (Display)" }
        ],
        correctKey: "B",
        scoreWeight: 1.0,
        points: 12,
        feedback: {
          correct: "Tepat! Unit Kendali (CU) bertugas mengatur urutan jalannya instruksi kerja, bertindak seperti kepala koki di dapur restoran.",
          incorrect: "Belum tepat. ALU bertugas menghitung, Memori bertugas menyimpan, sedangkan pengatur alur komando adalah Control Unit (CU)."
        },
        hint: "Ingat komponen yang berfungsi sebagai 'polisi lalu lintas' di dalam inti prosesor."
      },
      {
        id: "K2-2",
        code: "K2-2",
        type: "matching",
        level: "C1-C2 (Penjodohan)",
        question: "Jodohkan komponen berikut dengan fungsi utamanya dalam arsitektur komputer:",
        leftItems: [
          { id: "l1", label: "ALU (Arithmetic Logic Unit)", subtext: "Komputasi Inti" },
          { id: "l2", label: "Control Unit (CU)", subtext: "Pengatur Jadwal" },
          { id: "l3", label: "Memori RAM", subtext: "Meja Kerja CPU" },
          { id: "l4", label: "Unit Output", subtext: "Penyaji Hasil" }
        ],
        rightItems: [
          { id: "r1", text: "Mengeksekusi perhitungan matematika numerik dan komparasi logika." },
          { id: "r2", text: "Mengatur ritme dan urutan kerja seluruh komponen sistem komputer." },
          { id: "r3", text: "Menyimpan instruksi program dan variabel data sementara yang sedang aktif." },
          { id: "r4", text: "Menyajikan hasil olahan komputasi kepada pengguna (monitor, audio, cetak)." }
        ],
        correctPairs: { "l1": "r1", "l2": "r2", "l3": "r3", "l4": "r4" },
        scoreWeight: 1.0,
        points: 12,
        feedback: {
          correct: "Tepat! Pembagian kerja antara ALU, CU, Memori, dan Output telah kamu pahami dengan sempurna.",
          incorrect: "Belum tepat. Pastikan kamu membedakan mana yang menghitung (ALU), mana yang mengatur (CU), dan mana yang menyimpan (RAM)."
        },
        hint: "ALU = kalkulator, CU = mandor pengatur, RAM = tempat simpan sementara."
      },
      {
        id: "K2-3",
        code: "K2-3",
        type: "multiple-choice",
        level: "C2 (Prinsip Desain)",
        question: "Apa gagasan revolusioner utama dari rancangan Arsitektur Komputer John von Neumann (1945)?",
        options: [
          { key: "A", text: "Program (instruksi) dan data disimpan bersama di dalam satu memori utama yang sama." },
          { key: "B", text: "Setiap aplikasi memiliki sirkuit kabel fisik tersendiri yang terpisah dari memori data." },
          { key: "C", text: "CPU tidak memerlukan memori utama dan langsung membaca instruksi dari monitor." },
          { key: "D", text: "Hasil perhitungan CPU langsung dialirkan ke printer tanpa pernah disimpan sementara." }
        ],
        correctKey: "A",
        scoreWeight: 1.0,
        points: 12,
        feedback: {
          correct: "Tepat! Konsep 'Stored-Program Concept' memungkinkan program dan data berada di memori bersama, sehingga mengganti aplikasi cukup mengganti isi memori.",
          incorrect: "Belum tepat. Inti Von Neumann adalah menyimpan instruksi program dan data bersama-sama di memori utama (RAM)."
        },
        hint: "Mengapa komputer modern bisa menjalankan game, pengolah kata, dan web browser tanpa perlu mengganti mesin fisiknya?"
      },
      {
        id: "K2-4",
        code: "K2-4",
        type: "multiple-choice",
        level: "C2 (Skenario Eksekusi)",
        question: "Sebuah program kasir sedang menjumlahkan harga barang: Rp 25.000 + Rp 17.000. Komponen di dalam komputer yang melakukan proses penjumlahan numerik tersebut adalah …",
        options: [
          { key: "A", text: "Unit Input (Keyboard barcode)" },
          { key: "B", text: "Control Unit (Unit Kendali)" },
          { key: "C", text: "Arithmetic Logic Unit (ALU)" },
          { key: "D", text: "Memori Utama (RAM)" }
        ],
        correctKey: "C",
        scoreWeight: 1.0,
        points: 12,
        feedback: {
          correct: "Tepat! ALU adalah bagian CPU yang bertugas mengeksekusi operasi matematika seperti penjumlahan.",
          incorrect: "Belum tepat. Keyboard hanya memasukkan angka, CU hanya mengatur alur, dan RAM hanya menampung angka. Yang menghitung adalah ALU."
        },
        hint: "Ingat nama organ CPU yang memiliki kata 'Arithmetic' (Aritmatika)."
      },
      {
        id: "K2-5",
        code: "K2-5",
        type: "multiple-choice",
        level: "C1-C2 (Arsitektur)",
        question: "Pada model Arsitektur Von Neumann standar, Central Processing Unit (CPU) secara internal tersusun atas …",
        options: [
          { key: "A", text: "ALU dan Unit Kendali (Control Unit)" },
          { key: "B", text: "Memori Utama dan Unit Output" },
          { key: "C", text: "Unit Input dan Unit Output" },
          { key: "D", text: "Memori Utama dan ALU" }
        ],
        correctKey: "A",
        scoreWeight: 1.0,
        points: 12,
        feedback: {
          correct: "Tepat! Rumus CPU Von Neumann: CPU = CU + ALU. Memori utama, input, dan output berada di luar CPU.",
          incorrect: "Belum tepat. Memori utama berada di luar CPU. CPU hanya terdiri dari ALU (penghitung) dan Unit Kendali (pengatur)."
        },
        hint: "Ingat rumus: CPU = Unit Kendali + ALU."
      },
      {
        id: "K2-6",
        code: "K2-6",
        type: "ordering",
        level: "C2 (Aplikasi IPO)",
        question: "Susunlah urutan tahapan alur kerja komputasi (IPO) yang tepat saat kamu memesan makanan lewat aplikasi ojek online hingga muncul konfirmasi driver:",
        items: [
          { id: "u2_1", text: "Kamu mengetik alamat tujuan dan menekan tombol 'Pesan' di layar sentuh (Input)" },
          { id: "u2_2", text: "Sistem memproses tarif ongkos kirim dan mencocokkan posisi driver terdekat (Process)" },
          { id: "u2_3", text: "Aplikasi menampilkan peta rute dan nama driver di layar HP (Output)" }
        ],
        correctOrder: ["u2_1", "u2_2", "u2_3"],
        scoreWeight: 1.0,
        points: 12,
        feedback: {
          correct: "Tepat! Urutan kerja sistem selalu dimulai dari masukan pengguna (Input), pengolahan data sistem (Process), lalu tampilan layar (Output).",
          incorrect: "Belum tepat. Data alamat harus dimasukkan lebih dulu (Input), baru diproses oleh sistem (Process), dan hasilnya muncul di layar (Output)."
        },
        hint: "Mulai dari tindakan fisik pengguna → pengolahan oleh komputer/server → tampilan informasi ke pengguna."
      },
      {
        id: "K2-7",
        code: "K2-7",
        type: "multiple-choice",
        level: "C2 (Analisis)",
        question: "Saat membuka foto di galeri HP lalu memilih efek 'Putar 90 Derajat', aktivitas komputasi yang termasuk ke dalam tahap Process adalah …",
        options: [
          { key: "A", text: "CPU menghitung ulang koordinat posisi setiap piksel foto di memori" },
          { key: "B", text: "Jari tangan mengetuk ikon tombol putar di permukaan layar" },
          { key: "C", text: "Panel layar memancarkan cahaya gambar yang sudah berputar" },
          { key: "D", text: "Kamera menangkap cahaya objek di depan lensa" }
        ],
        correctKey: "A",
        scoreWeight: 1.0,
        points: 12,
        feedback: {
          correct: "Tepat! Mengubah dan menghitung ulang susunan piksel gambar adalah pekerjaan komputasi tahap Process oleh CPU.",
          incorrect: "Belum tepat. Ketukan jari adalah Input, cahaya gambar di layar adalah Output, sedangkan penghitungan piksel di memori adalah Process."
        },
        hint: "Tahap Process terjadi di dalam chip prosesor & memori saat memanipulasi data."
      },
      {
        id: "K2-8",
        code: "K2-8",
        type: "multiple-choice",
        level: "C2 (Analogi Sistem)",
        question: "Dalam analogi dapur restoran untuk arsitektur komputer, jika lemari bahan makanan diibaratkan sebagai Memori Utama (RAM), maka apakah yang setara dengan juru masak yang langsung mengolah dan meracik bahan?",
        options: [
          { key: "A", text: "Arithmetic Logic Unit (ALU)" },
          { key: "B", text: "Unit Input (Keyboard)" },
          { key: "C", text: "Unit Output (Monitor)" },
          { key: "D", text: "Lampu penerangan dapur" }
        ],
        correctKey: "A",
        scoreWeight: 1.0,
        points: 12,
        feedback: {
          correct: "Tepat! Juru masak pengolah bahan setara dengan ALU yang memproses angka dan logika komputasi.",
          incorrect: "Belum tepat. Keyboard = penerima pesanan (Input), Monitor = pengantar sajian (Output), sedangkan pengolah bahan adalah ALU."
        },
        hint: "Siapa yang secara langsung mengolah angka atau bahan masakan hingga matang?"
      }
    ],

    // 8 Soal Bank Latihan Unit 2 (Diacak 5 soal per sesi, Bonus +2 Poin)
    practice: [
      {
        id: "L2-1",
        type: "true-false",
        level: "C2",
        question: "Pada model Von Neumann, memori utama hanya boleh menyimpan data angka, sedangkan instruksi program harus disimpan pada sirkuit terpisah.",
        options: [
          { key: "Benar", text: "Benar" },
          { key: "Salah", text: "Salah" }
        ],
        correctKey: "Salah",
        bonusPoints: 2,
        explanation: "Tepat! Salah, karena gagasan utama Von Neumann adalah program dan data disimpan bersama-sama di memori yang sama."
      },
      {
        id: "L2-2",
        type: "multiple-choice",
        level: "C2",
        question: "Pada analogi dapur restoran, posisi 'Kepala Koki' yang bertugas membagi pesanan dan mengatur urutan memasak setara dengan …",
        options: [
          { key: "A", text: "Pelayan kasir (Input)" },
          { key: "B", text: "Control Unit (Unit Kendali)" },
          { key: "C", text: "Juru masak bahan (ALU)" },
          { key: "D", text: "Lemari bahan (Memori)" }
        ],
        correctKey: "B",
        bonusPoints: 2,
        explanation: "Tepat! Kepala koki mengatur dan mengarahkan jalannya pekerjaan, persis seperti fungsi Unit Kendali (CU)."
      },
      {
        id: "L2-3",
        type: "multiple-choice",
        level: "C1",
        question: "Manakah di antara komponen berikut yang terletak di LUAR inti sirkuit CPU pada arsitektur Von Neumann?",
        options: [
          { key: "A", text: "Arithmetic Logic Unit (ALU)" },
          { key: "B", text: "Control Unit (CU)" },
          { key: "C", text: "Memori Utama (RAM)" },
          { key: "D", text: "Register Instruksi" }
        ],
        correctKey: "C",
        bonusPoints: 2,
        explanation: "Tepat! Memori Utama (RAM) berada di luar CPU dan terhubung via bus sistem."
      },
      {
        id: "L2-4",
        type: "multiple-choice",
        level: "C2",
        question: "Sebuah program membandingkan apakah nilai ujian A (85) > B (70). Bagian komputer yang membandingkan nilai logika ini adalah …",
        options: [
          { key: "A", text: "Arithmetic Logic Unit (ALU)" },
          { key: "B", text: "Harddisk drive" },
          { key: "C", text: "Unit Input" },
          { key: "D", text: "Layar monitor" }
        ],
        correctKey: "A",
        bonusPoints: 2,
        explanation: "Tepat! Huruf 'L' pada ALU adalah singkatan dari Logic (Logika komparasi lebih besar, lebih kecil, sama dengan)."
      },
      {
        id: "L2-5",
        type: "multiple-choice",
        level: "C2",
        question: "Jika komputer tidak memiliki memori utama (RAM) sama sekali, apa yang akan terjadi?",
        options: [
          { key: "A", text: "CPU tidak punya tempat mengambil instruksi dan data sehingga sistem tidak dapat bekerja." },
          { key: "B", text: "Komputer tetap berjalan lancar dengan kecepatan penuh." },
          { key: "C", text: "Layar komputer akan otomatis berubah menjadi hitam-putih." },
          { key: "D", text: "ALU akan berubah fungsi menjadi keyboard." }
        ],
        correctKey: "A",
        bonusPoints: 2,
        explanation: "Tepat! Tanpa memori utama sebagai meja kerja, CPU tidak memiliki tempat menampung kode instruksi yang hendak dieksekusi."
      },
      {
        id: "L2-6",
        type: "ordering",
        level: "C2",
        question: "Susun urutan tahapan kerja komputer saat mesin ATM memproses penarikan uang tunai:",
        items: [
          { id: "p2_1", text: "Nasabah memasukkan kartu ATM, mengetik PIN, dan memilih nominal penarikan (Input)" },
          { id: "p2_2", text: "Komputer ATM memverifikasi keaslian PIN dan memotong saldo rekening (Process)" },
          { id: "p2_3", text: "Mesin mengeluarkan uang tunai dan struk kertas saldo (Output)" }
        ],
        correctOrder: ["p2_1", "p2_2", "p2_3"],
        bonusPoints: 2,
        explanation: "Tepat! Urutan kerja mesin ATM selalu mengikuti prinsip IPO: Input kartu & PIN → Process validasi saldo → Output uang & struk."
      },
      {
        id: "L2-7",
        type: "true-false",
        level: "C2",
        question: "Tahap Process dalam sistem komputer bertugas menyajikan hasil cetakan ke kertas agar dapat dibaca manusia.",
        options: [
          { key: "Benar", text: "Benar" },
          { key: "Salah", text: "Salah" }
        ],
        correctKey: "Salah",
        bonusPoints: 2,
        explanation: "Tepat! Pernyataan tersebut salah, karena menyajikan hasil ke pengguna (seperti cetakan kertas atau tampilan layar) adalah tugas tahap Output, bukan Process."
      },
      {
        id: "L2-8",
        type: "multiple-choice",
        level: "C2",
        question: "Sensor sidik jari (fingerprint) di HP membaca pola garis jarimu saat membuka kunci layar. Dalam alur IPO, pembacaan pola oleh sensor termasuk tahap …",
        options: [
          { key: "A", text: "Input" },
          { key: "B", text: "Output" },
          { key: "C", text: "Penyimpanan Permanen" },
          { key: "D", text: "Penyajian Akhir" }
        ],
        correctKey: "A",
        bonusPoints: 2,
        explanation: "Tepat! Sensor menangkap data biometrik fisik dari luar dan memasukkannya ke sistem, sehingga tergolong tahap Input."
      }
    ]
  },

  unit3: {
    // 8 Soal Bank Kuis Formatif Unit 3 (Diacak 5 soal per sesi, Penilaian TP 3)
    quiz: [
      {
        id: "K3-1",
        code: "K3-1",
        type: "multiple-choice",
        level: "C1 (Urutan Siklus)",
        question: "Urutan tahapan yang benar dan mutlak pada siklus instruksi di dalam CPU adalah …",
        options: [
          { key: "A", text: "Jalankan (Execute) → Ambil (Fetch) → Baca (Decode)" },
          { key: "B", text: "Ambil (Fetch) → Baca (Decode) → Jalankan (Execute)" },
          { key: "C", text: "Baca (Decode) → Ambil (Fetch) → Jalankan (Execute)" },
          { key: "D", text: "Ambil (Fetch) → Jalankan (Execute) → Baca (Decode)" }
        ],
        correctKey: "B",
        scoreWeight: 1.0,
        points: 12,
        feedback: {
          correct: "Tepat! Urutan siklus selalu: Ambil (Fetch) dari RAM, Baca/Terjemahkan (Decode) oleh CU, lalu Jalankan (Execute) oleh ALU/Memori.",
          incorrect: "Belum tepat. Instruksi harus diambil terlebih dahulu dari memori (Fetch), kemudian dibaca artinya (Decode), baru bisa dijalankan (Execute)."
        },
        hint: "Ingat singkatan F-D-E: Fetch → Decode → Execute."
      },
      {
        id: "K3-2",
        code: "K3-2",
        type: "multiple-choice",
        level: "C2 (Tahap Fetch)",
        question: "Pada tahap Ambil (Fetch), aktivitas apakah yang dikerjakan oleh sistem komputer?",
        options: [
          { key: "A", text: "Menampilkan hasil perhitungan ke layar monitor pengguna" },
          { key: "B", text: "Menerjemahkan arti kode instruksi biner menjadi sinyal listrik" },
          { key: "C", text: "Mengambil instruksi biner dari memori utama (RAM) menuju register di CPU" },
          { key: "D", text: "Menghitung hasil operasi matematika pada rangkaian ALU" }
        ],
        correctKey: "C",
        scoreWeight: 1.0,
        points: 12,
        feedback: {
          correct: "Tepat! Pada tahap Ambil (Fetch), instruksi biner diambil dari RAM dan disalin ke register CPU.",
          incorrect: "Belum tepat. Menerjemahkan terjadi di Decode, menghitung terjadi di Execute, sedangkan Fetch bertugas menyalin instruksi dari RAM ke CPU."
        },
        hint: "Kata 'Fetch' berarti mengambil sesuatu dari tempat penyimpanan."
      },
      {
        id: "K3-3",
        code: "K3-3",
        type: "ordering",
        level: "C2 (Aplikasi FDE)",
        question: "Terdapat instruksi mikro: 'Tambahkan 3'. Susun urutan langkah siklus instruksinya dari awal hingga akhir:",
        items: [
          { id: "f1", text: "CPU mengambil instruksi 'Tambahkan 3' dari alamat RAM (Fetch)" },
          { id: "f2", text: "Unit Kendali membaca dan menerjemahkan bahwa perintahnya adalah penambahan (Decode)" },
          { id: "f3", text: "Sirkuit ALU mengeksekusi penjumlahan nilai register dengan angka 3 (Execute)" }
        ],
        correctOrder: ["f1", "f2", "f3"],
        scoreWeight: 1.0,
        points: 12,
        feedback: {
          correct: "Tepat! Urutan selalu Ambil (Fetch) ➔ Baca (Decode) ➔ Jalankan (Execute).",
          incorrect: "Belum tepat. Instruksi harus tiba di CPU (Fetch), diartikan oleh Unit Kendali (Decode), baru dikalkulasi oleh ALU (Execute)."
        },
        hint: "Ikuti urutan baku: Fetch dari RAM → Decode oleh CU → Execute oleh ALU."
      },
      {
        id: "K3-4",
        code: "K3-4",
        type: "multiple-choice",
        level: "C2 (Prediksi Simulasi)",
        question: "Instruksi 1 ('Ambil angka 5') baru saja selesai dieksekusi di CPU. Menurut karakteristik siklus instruksi, apakah yang akan dilakukan CPU selanjutnya?",
        options: [
          { key: "A", text: "CPU langsung berhenti bekerja dan mematikan daya komputer" },
          { key: "B", text: "CPU mengulangi instruksi 1 dari awal secara terus-menerus" },
          { key: "C", text: "CPU langsung mencetak hasil akhir ke printer" },
          { key: "D", text: "CPU kembali ke tahap Fetch untuk mengambil instruksi berikutnya (Instruksi 2) dari RAM" }
        ],
        correctKey: "D",
        scoreWeight: 1.0,
        points: 12,
        feedback: {
          correct: "Tepat! Siklus bersifat kontinu: setelah tahap Execute selesai, CPU langsung kembali ke tahap Fetch untuk mengambil instruksi berikutnya.",
          incorrect: "Belum tepat. Komputer belum berhenti karena masih ada instruksi selanjutnya di daftar program. CPU kembali ke tahap Fetch."
        },
        hint: "Mengapa proses ini dinamakan 'Siklus' (Loop)?"
      },
      {
        id: "K3-5",
        code: "K3-5",
        type: "multiple-choice",
        level: "C2 (Konseptual)",
        question: "Pernyataan manakah yang paling akurat menggambarkan hubungan kerja sama antara Memori Utama (RAM) dan CPU saat sebuah program dijalankan?",
        options: [
          { key: "A", text: "CPU menyimpan seluruh kode program aplikasi, sedangkan memori yang mengeksekusi hitungannya." },
          { key: "B", text: "Memori menyimpan barisan instruksi dan data, sedangkan CPU mengambil, menerjemahkan, dan mengeksekusinya." },
          { key: "C", text: "Memori mengatur alur instruksi, sedangkan CPU hanya bertugas menampilkan gambar ke monitor." },
          { key: "D", text: "Memori dan CPU hanya bekerja saat pengguna mematikan laptop." }
        ],
        correctKey: "B",
        scoreWeight: 1.0,
        points: 12,
        feedback: {
          correct: "Tepat! Memori adalah lumbung penyimpanan (meja kerja), sedangkan CPU adalah motor pemroses yang aktif menjalankan siklus FDE.",
          incorrect: "Belum tepat. Peran keduanya tidak tertukar. Memori bertugas menyimpan, sedangkan CPU yang bolak-balik mengambil dan mengeksekusinya."
        },
        hint: "Siapa yang menjadi tempat penyimpanan dan siapa yang menjadi aktor pemroses?"
      },
      {
        id: "K3-6",
        code: "K3-6",
        type: "matching",
        level: "C2 (Penjodohan Siklus)",
        question: "Pasangkan tahapan siklus instruksi atau register berikut dengan tugas utamanya di dalam komputer:",
        leftItems: [
          { id: "l1", label: "Tahap Fetch (Ambil)", subtext: "Fase 1 Siklus" },
          { id: "l2", label: "Tahap Decode (Baca)", subtext: "Fase 2 Siklus" },
          { id: "l3", label: "Tahap Execute (Jalankan)", subtext: "Fase 3 Siklus" },
          { id: "l4", label: "Program Counter (PC)", subtext: "Register Penunjuk" }
        ],
        rightItems: [
          { id: "r1", text: "Mengambil instruksi biner dari alamat memori utama (RAM) menuju register CPU." },
          { id: "r2", text: "Unit Kendali (CU) membedah arti kode opcode instruksi yang baru diterima." },
          { id: "r3", text: "ALU melakukan perhitungan matematika atau hasil operasi ditulis ke memori." },
          { id: "r4", text: "Register yang mencatat alamat memori instruksi berikutnya agar urutan tidak tersesat." }
        ],
        correctPairs: { "l1": "r1", "l2": "r2", "l3": "r3", "l4": "r4" },
        scoreWeight: 1.0,
        points: 12,
        feedback: {
          correct: "Pasangan Tepat! Fetch mengambil instruksi dari RAM, Decode menerjemahkan opcode, Execute menjalankan aksi, dan PC menunjuk alamat berikutnya.",
          incorrect: "Belum tepat. Cocokkan ulang peran masing-masing tahap Fetch, Decode, Execute, serta fungsi Program Counter."
        },
        hint: "Fetch = Ambil dari RAM, Decode = Terjemahkan di CU, Execute = Kerjakan di ALU, PC = Penunjuk alamat."
      },
      {
        id: "K3-7",
        code: "K3-7",
        type: "multiple-choice",
        level: "C2 (Tahap Decode)",
        question: "Pada tahap Baca/Terjemahkan (Decode), bagian CPU manakah yang bertugas membongkar makna kode biner instruksi (misal membedakan perintah 'LOAD' dengan 'ADD')?",
        options: [
          { key: "A", text: "Control Unit (Unit Kendali)" },
          { key: "B", text: "Monitor Layar" },
          { key: "C", text: "Unit Input Keyboard" },
          { key: "D", text: "Speaker Audio" }
        ],
        correctKey: "A",
        scoreWeight: 1.0,
        points: 12,
        feedback: {
          correct: "Tepat! Control Unit (CU) membedah kode opcode pada tahap Decode agar jalur sirkuit yang tepat bisa dinyalakan.",
          incorrect: "Belum tepat. Monitor, keyboard, dan speaker adalah piranti I/O di luar CPU. Pengurai makna instruksi di CPU adalah Control Unit (CU)."
        },
        hint: "Divisi CPU yang bertugas mengatur dan mengurai makna kode perintah adalah sang pengatur lalu lintas."
      },
      {
        id: "K3-8",
        code: "K3-8",
        type: "multiple-choice",
        level: "C2 (Frekuensi Clock)",
        question: "Spesifikasi sebuah prosesor mencantumkan kecepatan '3.0 GHz'. Dalam kaitannya dengan siklus Fetch–Decode–Execute, angka Gigahertz (miliaran Hertz) tersebut menunjukkan …",
        options: [
          { key: "A", text: "Kecepatan detak clock CPU dalam mengulang siklus instruksi miliaran kali setiap detik" },
          { key: "B", text: "Kapasitas penyimpanan permanen harddisk dalam satuan gigabyte" },
          { key: "C", text: "Jumlah tombol huruf yang terpasang pada keyboard laptop" },
          { key: "D", text: "Lebar resolusi piksel layar monitor utama" }
        ],
        correctKey: "A",
        scoreWeight: 1.0,
        points: 12,
        feedback: {
          correct: "Tepat! Semakin tinggi frekuensi clock (GHz), semakin cepat CPU mengulang siklus Fetch-Decode-Execute per detiknya.",
          incorrect: "Belum tepat. GHz bukan ukuran kapasitas harddisk atau piksel monitor, melainkan jumlah detak siklus instruksi per detik."
        },
        hint: "Ingat istilah frekuensi clock dan seberapa sering siklus FDE berputar dalam 1 detik."
      }
    ],

    // 8 Soal Bank Latihan Unit 3 (Diacak 5 soal per sesi, Bonus +2 Poin)
    practice: [
      {
        id: "L3-1",
        type: "true-false",
        level: "C2",
        question: "Tahap Baca (Decode) dilakukan oleh Unit Kendali (CU) untuk memahami maksud kode instruksi biner sebelum dikerjakan.",
        options: [
          { key: "Benar", text: "Benar" },
          { key: "Salah", text: "Salah" }
        ],
        correctKey: "Benar",
        bonusPoints: 2,
        explanation: "Tepat! Unit Kendali membedah opcode instruksi agar sirkuit yang sesuai siap dinyalakan."
      },
      {
        id: "L3-2",
        type: "multiple-choice",
        level: "C2",
        question: "CPU baru saja selesai menerjemahkan (Decode) instruksi perkalian: 'MUL 4, 2'. Tahap berikutnya yang akan dilakukan adalah …",
        options: [
          { key: "A", text: "Mengambil instruksi baru dari RAM" },
          { key: "B", text: "Menjalankan instruksi (Execute): ALU mengalikan 4 × 2 menghasilkan 8" },
          { key: "C", text: "Menghapus instruksi dari sistem" },
          { key: "D", text: "Menerjemahkan ulang instruksi yang sama" }
        ],
        correctKey: "B",
        bonusPoints: 2,
        explanation: "Tepat! Setelah tahap Decode selesai, instruksi harus langsung di-Execute sebelum CPU mengambil instruksi baru."
      },
      {
        id: "L3-3",
        type: "multiple-choice",
        level: "C2",
        question: "Pada instruksi 'Simpan hasil ke memori', komponen manakah yang aktif menerima data angka pada tahap Execute?",
        options: [
          { key: "A", text: "Mesin Printer" },
          { key: "B", text: "Keyboard laptop" },
          { key: "C", text: "Memori Utama (RAM)" },
          { key: "D", text: "Layar monitor" }
        ],
        correctKey: "C",
        bonusPoints: 2,
        explanation: "Tepat! Perintah menyimpan hasil kalkulasi ditujukan ke alamat memori utama (RAM)."
      },
      {
        id: "L3-4",
        type: "multiple-choice",
        level: "C2",
        question: "Mengapa siklus Fetch – Decode – Execute harus berulang terus-menerus selama program aplikasi berjalan?",
        options: [
          { key: "A", text: "Karena memori komputer cepat kehabisan daya listrik" },
          { key: "B", text: "Karena CPU sering melupakan perintah yang telah dikerjakan" },
          { key: "C", text: "Karena program tersusun atas banyak instruksi mikro yang harus dikerjakan satu per satu secara berurutan" },
          { key: "D", text: "Karena ALU hanya sanggup melakukan satu kali hitungan saja" }
        ],
        correctKey: "C",
        bonusPoints: 2,
        explanation: "Tepat! Program terdiri atas ribuan hingga jutaan baris instruksi mikro, sehingga CPU mengerjakannya baris demi baris melalui siklus yang berulang."
      },
      {
        id: "L3-5",
        type: "multiple-choice",
        level: "C2",
        question: "Pada analogi resep masakan, tindakan 'Membaca kalimat resep: Masukkan 2 butir telur' setara dengan tahap …",
        options: [
          { key: "A", text: "Tahap Fetch (Ambil)" },
          { key: "B", text: "Tahap Decode (Baca/Terjemahkan)" },
          { key: "C", text: "Tahap Execute (Jalankan)" },
          { key: "D", text: "Tahap Reset" }
        ],
        correctKey: "B",
        bonusPoints: 2,
        explanation: "Tepat! Membaca dan memahami langkah petunjuk resep adalah analogi dari tahap Decode di dalam Unit Kendali."
      },
      {
        id: "L3-6",
        type: "true-false",
        level: "C2",
        question: "Setelah tahap Execute selesai pada satu perintah mikro, CPU otomatis mematikan diri dan tidak kembali ke tahap Fetch.",
        options: [
          { key: "Benar", text: "Benar" },
          { key: "Salah", text: "Salah" }
        ],
        correctKey: "Salah",
        bonusPoints: 2,
        explanation: "Tepat! Pernyataan itu salah, karena selama program belum menemui instruksi HALT/STOP, CPU langsung kembali ke tahap Fetch untuk mengambil instruksi berikutnya."
      },
      {
        id: "L3-7",
        type: "ordering",
        level: "C2",
        question: "Susun analogi pembuatan kue berikut agar mencerminkan urutan Fetch ➔ Decode ➔ Execute yang benar:",
        items: [
          { id: "p3_1", text: "Mengambil kartu resep langkah ke-1 dari meja bahan (Fetch)" },
          { id: "p3_2", text: "Membaca dan memahami perintah di kartu: 'Aduk 200g tepung' (Decode)" },
          { id: "p3_3", text: "Menggerakkan tangan untuk mengaduk tepung di mangkuk (Execute)" }
        ],
        correctOrder: ["p3_1", "p3_2", "p3_3"],
        bonusPoints: 2,
        explanation: "Tepat! Mengambil kartu = Fetch, membaca maksud perintah = Decode, dan melakukan tindakannya = Execute."
      },
      {
        id: "L3-8",
        type: "multiple-choice",
        level: "C2",
        question: "Register di dalam CPU yang bertugas mencatat alamat memori dari instruksi berikutnya yang hendak diambil adalah …",
        options: [
          { key: "A", text: "Program Counter (PC)" },
          { key: "B", text: "Printer Spooler" },
          { key: "C", text: "Sound Card" },
          { key: "D", text: "Keyboard Buffer" }
        ],
        correctKey: "A",
        bonusPoints: 2,
        explanation: "Tepat! Program Counter (PC) selalu menyimpan nomor alamat instruksi berikutnya agar siklus eksekusi berjalan berurutan."
      }
    ]
  }
};
