// Data Konten Lengkap Media Pembelajaran Sistem Komputer
// Fase E / Kelas X SMA Negeri 2 Makassar

export const unitsData = [
  {
    id: 1,
    unitCode: "unit1",
    title: "Unit 1: Arsitektur Von Neumann & Eksplorasi",
    subtitle: "Komponen Utama Arsitektur Von Neumann",
    shortName: "Arsitektur Von Neumann",
    badge: "Fase E • Modul 1.1",
    estTime: "15 Menit Belajar",
    tpLabel: "TP 1: Membedakan Fungsi Komponen Utama",
    tpDesc: "Mengidentifikasi peranan Unit Pemrosesan (ALU, CU), Unit Memori, dan piranti I/O pada arsitektur Von Neumann secara komprehensif.",
    minPassingScore: 75,
    
    // Tahap 1: Tantangan Pembuka
    challenge: {
      question: "Bayangkan komputer sebagai dapur restoran. Siapa yang menerima pesanan, siapa yang memasak, siapa yang mengatur urutan pekerjaan koki, dan di mana bahan masakan disimpan? Tuliskan tebakanmu!",
      placeholder: "Contoh: Menurut saya pelayan yang mencatat pesanan, koki yang memasak...",
      feedback: "Terima kasih, tebakanmu sudah tersimpan! Di akhir unit ini kamu akan melihat bagian komputer mana yang cocok dengan tiap peran di dapur restoran.",
      rewardPoints: 10
    },

    // Tahap 2: Materi & Diagram
    segments: [
      {
        id: 1,
        title: "Ide Brilian John von Neumann (1945)",
        content: "Pada pertengahan tahun 1940-an, matematikawan John von Neumann mengusulkan konsep revolusioner: Stored-Program Concept. Konsep ini menyatukan instruksi program dan data kerja di dalam satu memori bersama (RAM), yang dieksekusi CPU secara berurutan.",
        keyPoints: [
          "Dipublikasikan oleh matematikawan John von Neumann (1945)",
          "Instruksi dan data disimpan bersamaan di dalam satu memori utama (RAM)",
          "CPU memproses data secara sekuensial (berurutan) melalui siklus instruksi"
        ],
        conceptBadge: "Prinsip: Stored-Program Concept"
      },
      {
        id: 2,
        title: "Pintu Masuk & Pintu Keluar: Unit Input dan Output",
        content: "Komputer membutuhkan sarana untuk berkomunikasi dengan dunia luar. Unit Input adalah pintu masuk sinyal eksternal (seperti keyboard, mouse, kamera, atau mikrofon). Unit Output adalah pintu keluar yang menyajikan hasil pemrosesan kepada manusia (seperti monitor, printer, atau speaker).",
        keyPoints: [
          "Unit Input: Mengubah aksi fisik pengguna menjadi sinyal biner",
          "Unit Output: Mengubah hasil komputasi digital menjadi wujud yang dipahami panca indra"
        ],
        conceptBadge: "Piranti I/O (Input/Output)"
      },
      {
        id: 3,
        title: "Otak Pemrosesan: Central Processing Unit (CPU)",
        content: "CPU adalah inti komputasi yang mengeksekusi instruksi program. Pada model Von Neumann, CPU terdiri dari dua divisi kerja utama: Unit Kendali (Control Unit) dan Unit Aritmatika & Logika (Arithmetic Logic Unit/ALU).",
        keyPoints: [
          "Rumus Komposisi: CPU = Unit Kendali (CU) + ALU",
          "Memori Utama dan piranti I/O berada di LUAR sirkuit CPU",
          "Keduanya berkolaborasi mengeksekusi instruksi mikro"
        ],
        conceptBadge: "Komponen Inti CPU"
      },
      {
        id: 4,
        title: "Membelah Dua Divisi CPU: CU vs ALU",
        content: "Control Unit (CU) bertindak sebagai 'polisi lalu lintas' yang mengatur jadwal dan mengarahkan komponen lain. Sedangkan ALU bertindak sebagai 'kalkulator' yang mengeksekusi perhitungan matematika (+, -, ×, ÷) serta perbandingan logika (AND, OR, NOT, <, >).",
        keyPoints: [
          "Control Unit (CU): Mengatur, mengarahkan, dan mengendalikan jalannya siklus instruksi",
          "ALU: Menghitung operasi aritmatika numerik dan menguji kondisi logika perbandingan biner"
        ],
        conceptBadge: "Pembagian Tugas: CU & ALU"
      },
      {
        id: 5,
        title: "Meja Kerja CPU: Memori Utama (RAM)",
        content: "Memori utama bertugas menampung instruksi program dan data yang sedang aktif digunakan. Bayangkan memori sebagai meja kerja: semua data dan resep yang ada di atas meja dapat dijangkau dan diolah oleh CPU dengan sangat cepat.",
        keyPoints: [
          "Menyimpan kode instruksi yang sedang dijalankan",
          "Menyimpan nilai variabel dan data sementara sebelum/sesudah diolah ALU",
          "Sifatnya volatil (data hilang jika aliran listrik terputus)"
        ],
        conceptBadge: "Penyimpanan Utama (RAM)"
      },
      {
        id: 6,
        title: "Bekerja Harmonis & Analogi Dapur Restoran",
        content: "Data masuk melalui unit input, ditampung di memori. CPU mengambil instruksi: CU mengarahkan, ALU mengkalkulasi. Hasil akhir disimpan kembali ke memori sebelum disalurkan ke unit output melalui sistem Bus terpadu.",
        tableAnalogy: [
          { role: "Pelayan penerima pesanan", part: "Unit Input", desc: "Menerima pesanan dari pelanggan luar" },
          { role: "Kepala koki restoran", part: "Control Unit (CU)", desc: "Mengatur alur dan urutan memasak masakan" },
          { role: "Juru masak pengolah", part: "ALU", desc: "Memotong, memasak, dan meracik bahan" },
          { role: "Meja dapur & lemari bahan", part: "Memori Utama (RAM)", desc: "Menampung bahan dan resep sebelum diolah" },
          { role: "Pelayan pengantar makanan", part: "Unit Output", desc: "Menyajikan makanan yang sudah jadi ke meja tamu" }
        ],
        conceptBadge: "Sistem Komputer Terpadu"
      }
    ],

    // Tips & Trik
    tips: [
      "Ingat tiga huruf K-A-M: Kendali mengatur, ALU menghitung, Memori menyimpan.",
      "Rumus CPU: CPU = Unit Kendali + ALU. Memori dan piranti I/O berada di luar CPU.",
      "Rancangan Von Neumann menyimpan program dan data di memori yang sama sehingga mengganti aplikasi tidak perlu merombak sirkuit kabel!"
    ],

    // Tahap 3: Eksplorasi (Label Interaktif)
    exploration: {
      type: "interactive-labels",
      instruction: "Ketuk setiap kotak komponen arsitektur pada diagram untuk membedah peran perangkat kerasnya!",
      pointsPerItem: 4,
      totalPoints: 20,
      components: [
        {
          id: "input",
          name: "1. Unit Input",
          badge: "Pemasukan Sinyal",
          desc: "Pemasukan sinyal eksternal dari dunia nyata ke dalam sistem komputer.",
          details: "Mengonversi ketukan keyboard, gerakan mouse, suara mikrofon, atau citra kamera menjadi format biner digital.",
          examples: "Keyboard, Mouse, Mikrofon, Scanner, Kamera"
        },
        {
          id: "cpu",
          name: "2. CPU (CU & ALU)",
          badge: "Pusat Komputasi & Kendali",
          desc: "Otak utama yang menjalankan instruksi tersimpan dengan membedah tugas ke dua divisi.",
          details: "Control Unit (CU) mengarahkan lalu lintas instruksi, sedangkan Arithmetic Logic Unit (ALU) mengeksekusi hitungan numerik dan komparasi logika.",
          examples: "Intel Core, AMD Ryzen, Apple Silicon, ARM"
        },
        {
          id: "memory",
          name: "3. Memori Utama (RAM)",
          badge: "Penampung Sementara",
          desc: "Tempat menyimpan instruksi program dan data sementara yang sedang aktif digunakan.",
          details: "Berfungsi seperti meja kerja CPU. Seluruh data yang hendak dihitung ALU harus dimuat di sini terlebih dahulu.",
          examples: "RAM DDR4/DDR5, Cache L1/L2/L3"
        },
        {
          id: "output",
          name: "4. Unit Output",
          badge: "Penyajian Hasil Olahan",
          desc: "Terminal penyajian data olahan komputer kepada panca indra manusia.",
          details: "Menerjemahkan hasil komputasi biner menjadi gelombang cahaya piksel, getaran audio, atau cetakan fisik di kertas.",
          examples: "Monitor LCD/OLED, Printer, Speaker, Proyektor"
        },
        {
          id: "bus",
          name: "5. Sistem Bus (Data, Alamat, Kendali)",
          badge: "Jalur Komunikasi Data",
          desc: "Kabel sirkuit penghubung yang mengalirkan data, alamat memori, dan sinyal kendali antarkomponen.",
          details: "Data Bus membawa data biner, Address Bus menentukan alamat RAM yang dituju, Control Bus mengirim sinyal clock dan sinkronisasi.",
          examples: "System Bus, Front Side Bus, PCIe Bus"
        }
      ]
    },

    // Tahap 5: Refleksi
    reflection: {
      scaleQuestion: "Seberapa yakin kamu dalam membedakan fungsi komponen utama Arsitektur Von Neumann?",
      hardestQuestion: "Bagian mana yang menurutmu paling menantang atau membingungkan?",
      hardestOptions: [
        "Membedakan ALU dan Unit Kendali (CU)",
        "Memahami fungsi Memori Utama (RAM)",
        "Mengingat kelima komponen utama",
        "Tidak ada, sudah paham dengan baik"
      ],
      selfExplanationPrompt: "Jelaskan dengan kata-katamu sendiri bagaimana pembagian tugas antara CPU dan Memori saat komputer bekerja!",
      points: 10
    },

    // Tahap 6: Ringkasan Materi (Buku Saku Digital)
    summaryCards: [
      {
        tag: "01. Komponen Dasar",
        title: "Komponen Von Neumann",
        content: "Terdiri dari Unit Input, CPU (CU & ALU), Memori Utama (RAM), dan Unit Output yang saling terhubung oleh sistem bus terpadu.",
        subtext: "Struktur perangkat keras terstandarisasi"
      },
      {
        tag: "02. Prinsip Kerja",
        title: "Stored-Program Concept",
        content: "Instruksi program dan data aplikasi disimpan bersama-sama dalam satu memori utama yang sama, dieksekusi secara sekuensial.",
        subtext: "Fondasi komputasi modern sejak 1945"
      },
      {
        tag: "03. Organisasi CPU",
        title: "Dua Organ CPU",
        content: "Control Unit (CU) mengatur urutan dan jalannya instruksi, sedangkan ALU mengeksekusi perhitungan angka dan logika biner.",
        subtext: "CPU = Unit Kendali + ALU"
      }
    ]
  },

  {
    id: 2,
    unitCode: "unit2",
    title: "Unit 2: Alur Kerja Input – Process – Output (IPO)",
    subtitle: "Materi dan Latihan Skenario Alur Data IPO",
    shortName: "Alur Kerja IPO",
    badge: "Fase E • Modul 2.1",
    estTime: "15 Menit Belajar",
    tpLabel: "TP 2: Menyusun Alur Input – Process – Output (IPO)",
    tpDesc: "Menganalisis dan menyusun tahapan alur IPO secara tepat dari berbagai skenario kasus komputasi sehari-hari.",
    minPassingScore: 75,

    challenge: {
      question: "Saat kamu mengetik pesan di HP dan hasilnya langsung muncul seketika di layar, menurutmu apa yang sebenarnya terjadi di baliknya?",
      placeholder: "Contoh: Jari menekan layar, sinyal dikirim ke chip, lalu lampu layar menyala...",
      feedback: "Terima kasih, jawabanmu tersimpan! Mari kita telusuri bagaimana sinyal fisik ketukan jarimu diubah menjadi bit biner dan diproses hingga tampil.",
      rewardPoints: 10
    },

    segments: [
      {
        id: 1,
        title: "Tiga Langkah Pasti: Alur Kerja Komputer",
        content: "Setiap perangkat komputer dari smartphone terkecil hingga superkomputer raksasa bekerja dengan prinsip alur yang sama: menerima masukan (Input), memprosesnya secara komputasi (Process), lalu mengeluarkan hasilnya (Output).",
        keyPoints: [
          "Alur IPO selalu bersifat satu arah dan deterministik",
          "Tahap Input: Menangkap rangsangan fisik atau instruksi",
          "Tahap Process: Manipulasi dan kalkulasi matematis di CPU",
          "Tahap Output: Penyampaian hasil olahan ke indra manusia"
        ],
        conceptBadge: "Siklus Input - Process - Output"
      },
      {
        id: 2,
        title: "Tahap 1: Input (Data Masuk)",
        content: "Input adalah gerbang masuknya data mentah ke sistem. Contoh nyata: menekan tuts keyboard, menggeser mouse di meja, berbicara ke mikrofon, memindai barcode, atau sensor accelerometer mendeteksi putaran layar HP.",
        keyPoints: [
          "Sumber data: Interaksi fisik manusia atau sensor lingkungan",
          "Data analog dikonversi menjadi representasi sinyal digital biner (0 dan 1)"
        ],
        conceptBadge: "Tahap Input"
      },
      {
        id: 3,
        title: "Tahap 2: Process (Data Diolah)",
        content: "Tahap Process adalah saat data diolah mengikuti instruksi kode program. Pengolahan ini dikerjakan oleh CPU, seperti menjumlahkan angka, membandingkan kecocokan password, mengompresi gambar, atau menerapkan filter foto.",
        keyPoints: [
          "Terjadi di dalam CPU dan memori utama",
          "Mengubah data mentah menjadi informasi yang bernilai guna"
        ],
        conceptBadge: "Tahap Process"
      },
      {
        id: 4,
        title: "Tahap 3: Output (Hasil Keluar)",
        content: "Output adalah penyajian informasi hasil olahan kepada pengguna. Contoh: deretan teks di layar monitor, alunan musik merdu dari speaker, atau selembar laporan tercetak dari mesin printer.",
        keyPoints: [
          "Format hasil: Visual (layar), Audio (speaker/headset), Fisik (printer)",
          "Menutup satu siklus interaksi komputasi"
        ],
        conceptBadge: "Tahap Output"
      },
      {
        id: 5,
        title: "Contoh Kasus Nyata: Mengetik Huruf 'A'",
        content: "1. Kamu menekan tombol tuts 'A' pada keyboard (Input). 2. Keyboard mengirim kode ASCII (01000001) ke komputer, lalu CPU mengolah font vector dan mengalokasikan memori piksel (Process). 3. Huruf 'A' menyala di layar monitormu (Output).",
        keyPoints: [
          "Input: Jari menekan tuts 'A'",
          "Process: CPU memproses kode biner dan memetakan piksel font",
          "Output: Huruf 'A' dirender di layar monitor"
        ],
        conceptBadge: "Skenario Komputasi Teks"
      },
      {
        id: 6,
        title: "Karakteristik Unik: Peranti Ganda (I/O)",
        content: "Beberapa piranti modern berfungsi ganda sebagai input sekaligus output. Contoh paling nyata adalah layar sentuh (touchscreen) pada smartphone: kamu menyentuhnya untuk memberi perintah (input), dan panel layarnya menampilkan hasil gambar (output).",
        keyPoints: [
          "Touchscreen menggabungkan sensor sentuh kapasitif (input) dan panel display (output)",
          "Kamera video call menangkap cahaya wajah (input), monitor menampilkan wajah teman (output)"
        ],
        conceptBadge: "Perangkat Multi-Fungsi"
      }
    ],

    tips: [
      "Tanyakan dua hal: Apakah data sedang masuk ke komputer (Input)? Ataukah informasi keluar untuk manusia (Output)? Segala hal di antaranya adalah Proses.",
      "Layar sentuh smartphone berperan sebagai input dan output sekaligus.",
      "Satu skenario sehari-hari pasti memuat ketiga tahap. Latih dirimu menganalisis IPO saat memesan ojek online atau scan QR."
    ],

    exploration: {
      type: "drag-and-drop",
      instruction: "Seret dan tempatkan setiap kartu contoh peristiwa ke kelompok yang tepat (Input, Proses, atau Output)!",
      pointsPerItem: 3.33,
      totalPoints: 20,
      cards: [
        { id: "c1", text: "Mengetik huruf di keyboard laptop", targetGroup: "input", hint: "Data dimasukkan lewat tombol fisik" },
        { id: "c2", text: "Merekam suara pidato lewat mikrofon", targetGroup: "input", hint: "Menangkap gelombang suara dari luar" },
        { id: "c3", text: "CPU mengkalkulasi total belanjaan kasir", targetGroup: "process", hint: "Melakukan operasi hitung aritmatika" },
        { id: "c4", text: "Aplikasi menerapkan filter foto hitam-putih", targetGroup: "process", hint: "Mengubah nilai piksel foto di memori" },
        { id: "c5", text: "Hasil nilai ujian akhir tampil di monitor", targetGroup: "output", hint: "Informasi disajikan di layar untuk dibaca" },
        { id: "c6", text: "Mesin printer mencetak selembar bukti transfer", targetGroup: "output", hint: "Hasil keluar dalam bentuk cetakan kertas" }
      ]
    },

    reflection: {
      scaleQuestion: "Seberapa paham kamu dalam menganalisis dan menyusun alur Input – Proses – Output?",
      hardestQuestion: "Bagian alur IPO mana yang paling sering membuatmu ragu?",
      hardestOptions: [
        "Membedakan apakah piranti adalah Input atau Output",
        "Menentukan apa saja aktivitas yang termasuk tahap Proses",
        "Menyusun urutan alur secara kronologis",
        "Tidak ada, semuanya sudah jelas"
      ],
      selfExplanationPrompt: "Tuliskan satu contoh peristiwa teknologi sehari-hari dan jelaskan mana tahap Input, Proses, serta Output-nya!",
      points: 10
    },

    summaryCards: [
      {
        tag: "01. Alur Deterministik",
        title: "Tiga Langkah IPO",
        content: "Data fisik masuk lewat Input, diolah secara terstruktur oleh CPU pada tahap Proses, dan disajikan lewat Output.",
        subtext: "Alur konsisten di semua komputer"
      },
      {
        tag: "02. Transformasi Data",
        title: "Perubahan Bentuk Data",
        content: "Input mengubah aksi fisik ke biner, Proses memanipulasi biner di register, dan Output mengonversi biner ke persepsi manusia.",
        subtext: "Dari dunia nyata ➔ biner ➔ persepsi"
      },
      {
        tag: "03. Peranti Gabungan",
        title: "Dual Role Device",
        content: "Layar sentuh smartphone adalah contoh nyata peranti hibrida: menerima sentuhan (input) dan memancarkan piksel (output).",
        subtext: "Efisiensi antarmuka modern"
      }
    ]
  },

  {
    id: 3,
    unitCode: "unit3",
    title: "Unit 3: Siklus Instruksi Fetch–Decode–Execute",
    subtitle: "Simulasi Langkah demi Langkah di Dalam CPU",
    shortName: "Siklus Fetch-Decode-Execute",
    badge: "Fase E • Modul 3.1",
    estTime: "15 Menit Belajar",
    tpLabel: "TP 3: Menentukan Siklus Fetch – Decode – Execute (Skor Min. 80)",
    tpDesc: "Menentukan urutan instruksi mikro di dalam register dan mengeksekusi simulasi logika hingga mencapai ketuntasan minimum.",
    minPassingScore: 80,

    challenge: {
      question: "Saat kamu menekan angka 5 + 3 = di kalkulator, bagaimana prosesor di dalam komputer 'tahu' langkah apa yang harus dikerjakan lebih dulu?",
      placeholder: "Contoh: Komputer membaca tombol 5, menyimpan dulu, lalu membaca tombol +, baru menghitung...",
      feedback: "Terima kasih, tebakanmu tersimpan! Sebentar lagi kamu akan melihat sendiri bagaimana siklus Ambil, Baca, dan Jalankan berlangsung di dalam CPU.",
      rewardPoints: 10
    },

    segments: [
      {
        id: 1,
        title: "Program Adalah Barisan Instruksi Mikro",
        content: "Sebuah program perangkat lunak tersusun atas jutaan instruksi biner sederhana. Komputer menjalankannya satu per satu secara sekuensial. Untuk memahami cara kerjanya, kita gunakan simulasi program mini: (1) Ambil angka 5, (2) Tambahkan 3, (3) Simpan hasil ke RAM.",
        keyPoints: [
          "Instruksi 1: LOAD R1, 5 (Ambil angka 5)",
          "Instruksi 2: ADD R1, 3 (Jumlahkan angka 3)",
          "Instruksi 3: STORE RAM, R1 (Simpan hasil 8 ke memori)"
        ],
        conceptBadge: "Program Mini 3 Instruksi"
      },
      {
        id: 2,
        title: "Tahap 1: Ambil (Fetch)",
        content: "Unit Kendali (CU) membaca alamat memori dari Program Counter (PC), lalu mengambil instruksi biner dari memori utama (RAM) dan menaruhnya ke Instruction Register (IR) di dalam CPU.",
        keyPoints: [
          "Lokasi: Jalur data dari RAM menuju CPU",
          "Komponen aktif: Program Counter (PC), Bus Alamat, Instruction Register",
          "CPU juga otomatis menyiapkan alamat instruksi berikutnya"
        ],
        conceptBadge: "Langkah 1: Fetch"
      },
      {
        id: 3,
        title: "Tahap 2: Baca / Terjemahkan (Decode)",
        content: "Setelah instruksi berada di CPU, Unit Kendali (CU) membedah kode biner opcode tersebut: Operasi apa yang diminta? Nilai atau register apa yang harus dipersiapkan? Sirkuit kendali dinyalakan.",
        keyPoints: [
          "Lokasi: Di dalam Unit Kendali (Control Unit)",
          "Mengurai opcode biner (misal: 'ADD' berarti perintah menjumlahkan)",
          "Menyiapkan jalur bus kendali menuju ALU"
        ],
        conceptBadge: "Langkah 2: Decode"
      },
      {
        id: 4,
        title: "Tahap 3: Jalankan (Execute)",
        content: "Komponen yang bersangkutan mengeksekusi perintah. Jika perintahnya penjumlahan matematika, sirkuit adder ALU yang menghitung (5 + 3 = 8). Jika perintahnya menyimpan, nilai ditulis ke alamat RAM.",
        keyPoints: [
          "Lokasi: Sirkuit ALU atau port Memori RAM",
          "Hasil perhitungan ditempatkan di Register akumulator",
          "Perintah mikro selesai dieksekusi secara nyata"
        ],
        conceptBadge: "Langkah 3: Execute"
      },
      {
        id: 5,
        title: "Mengapa Disebut Sebagai Siklus?",
        content: "Setelah satu instruksi selesai dieksekusi pada tahap Jalankan (Execute), CPU tidak berhenti bekerja. Program Counter berpindah ke alamat berikutnya dan CPU langsung kembali ke tahap Ambil (Fetch). Siklus ini berulang miliaran kali per detik (frekuensi clock GHz).",
        keyPoints: [
          "Alur melingkar: Ambil ➔ Baca ➔ Jalankan ➔ Kembali ke Ambil",
          "Berulang terus hingga program menemui perintah STOP / HALT"
        ],
        conceptBadge: "Siklus Tak Berhenti"
      },
      {
        id: 6,
        title: "Analogi Resep Kue & Hubungan CPU-RAM",
        content: "Bayangkan kamu membuat kue dari buku resep: 1. Ambil satu lembar kartu resep dari laci (Fetch). 2. Baca kalimat resep: 'Masukkan 3 butir telur' (Decode). 3. Tanganmu memecahkan telur ke wadah adonan (Execute).",
        keyPoints: [
          "Memori RAM bertindak sebagai lemari resep dan tempat bahan",
          "CPU adalah juru masak yang bolak-balik membaca dan mengerjakan langkah satu per satu"
        ],
        conceptBadge: "Analogi Resep Kue"
      }
    ],

    tips: [
      "Ingat tiga kata baku: Ambil (Fetch), Baca (Decode), Jalankan (Execute) — urutannya mutlak!",
      "Bayangkan resep kue: Ambil kartu resep ➔ Baca petunjuk ➔ Kerjakan aksinya.",
      "Setelah tahap Jalankan selesai, CPU selalu kembali ke tahap Ambil untuk instruksi berikutnya."
    ],

    exploration: {
      type: "step-simulation",
      instruction: "Uji intuisimu! Tebak komponen mana yang aktif dan aksi apa yang terjadi di setiap langkah siklus CPU!",
      pointsPerItem: 5,
      totalPoints: 20,
      steps: [
        {
          id: "s1",
          situation: "Program kalkulator baru saja dimulai. Di mana instruksi 1 berada dan apa langkah pertamanya?",
          options: [
            "Ambil instruksi 1 dari memori RAM ke CPU (Fetch)",
            "ALU langsung menjumlahkan angka 5 dan 3",
            "Layar langsung menampilkan angka 8"
          ],
          correctIndex: 0,
          explanation: "Tepat! Sebelum CPU bisa mengolah apapun, instruksi harus diambil (Fetch) terlebih dahulu dari memori utama."
        },
        {
          id: "s2",
          situation: "Instruksi 1 ('Ambil angka 5') sudah tiba di dalam CPU. Apa yang dilakukan Unit Kendali selanjutnya?",
          options: [
            "Unit Kendali membaca dan menerjemahkan arti perintah (Decode)",
            "CPU mengembalikan instruksi ke RAM tanpa dibaca",
            "Speaker membunyikan alarm selesai"
          ],
          correctIndex: 0,
          explanation: "Tepat! Setelah instruksi diambil, Unit Kendali harus membaca dan menerjemahkan opcode (Decode) agar tahu apa yang harus disiapkan."
        },
        {
          id: "s3",
          situation: "Instruksi 2 'Tambahkan 3' sudah selesai di-Decode. Komponen manakah yang aktif mengeksekusi perhitungan 5 + 3?",
          options: [
            "Arithmetic Logic Unit (ALU)",
            "Keyboard laptop",
            "Monitor layar"
          ],
          correctIndex: 0,
          explanation: "Tepat! ALU adalah bagian CPU yang bertugas khusus mengeksekusi operasi matematika dan logika pada tahap Execute."
        },
        {
          id: "s4",
          situation: "Instruksi 3 'Simpan hasil ke memori' sedang berada di tahap Execute. Siapa yang menerima data angka 8?",
          options: [
            "Memori Utama (RAM) menerima dan menyimpan nilai 8",
            "Unit Input meminta ketukan keyboard ulang",
            "ALU mengulangi hitungan dari nol"
          ],
          correctIndex: 0,
          explanation: "Tepat! Perintah menyimpan hasil olahan dieksekusi dengan menuliskan nilai biner ke alamat memori utama (RAM)."
        }
      ]
    },

    reflection: {
      scaleQuestion: "Seberapa paham kamu dalam menjelaskan siklus Ambil (Fetch), Baca (Decode), Jalankan (Execute)?",
      hardestQuestion: "Bagian siklus instruksi mana yang paling sulit dibayangkan?",
      hardestOptions: [
        "Membedakan tugas tahap Ambil vs tahap Baca",
        "Memahami fungsi Program Counter dan Memori",
        "Memahami mengapa siklus harus berulang terus",
        "Tidak ada, alurnya sudah sangat jelas"
      ],
      selfExplanationPrompt: "Jelaskan dengan kata-katamu sendiri apa yang terjadi di CPU dan memori ketika komputer menjalankan satu baris perintah!",
      points: 10
    },

    summaryCards: [
      {
        tag: "01. Siklus Tiga Tahap",
        title: "Fetch - Decode - Execute",
        content: "Setiap instruksi program diambil dari RAM (Fetch), diterjemahkan oleh Unit Kendali (Decode), dan dikerjakan oleh ALU/Memori (Execute).",
        subtext: "Urutan mutlak tidak pernah tertukar"
      },
      {
        tag: "02. Kerja Sama CPU & RAM",
        title: "Simbiosis Komputasi",
        content: "Memori menyimpan barisan kode program dan data; CPU bolak-balik mengambil, membaca, dan menjalankannya instruksi demi instruksi.",
        subtext: "Penyimpan vs Eksekutor"
      },
      {
        tag: "03. Perulangan Kontinu",
        title: "Clock & Loop",
        content: "Setelah instruksi selesai dieksekusi, CPU langsung kembali ke tahap Fetch berikutnya hingga instruksi selesai atau daya dimatikan.",
        subtext: "Miliaran siklus per detik (GHz)"
      }
    ]
  }
];
