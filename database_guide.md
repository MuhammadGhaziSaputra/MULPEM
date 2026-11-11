# 🗄️ Panduan Lengkap Integrasi Database MySQL + Laragon

Panduan ini disiapkan untuk menghubungkan aplikasi **Studio Informatika** ke basis data terpusat menggunakan **Laragon** (Windows) dengan backend API PHP sederhana (ringan & tanpa konfigurasi rumit).

> 🔐 **FITUR KEAMANAN & ONBOARDING TERBARU:**
> - **Pop-up Nama Siswa Otomatis**: Setiap siswa baru yang membuka website langsung diarahkan untuk memasukkan Nama & Kelas. Saat tombol "Mulai Belajar" diklik, data siswa **langsung masuk ke database MySQL secara instan**.
> - **Proteksi PIN Portal Guru**: Portal guru diamankan dengan PIN Rahasia (**Default: `guru2026`** atau `2026`) agar siswa tidak dapat mengintip rekap nilai kelas.

---

## 1. Persiapan di Laragon

1. Buka aplikasi **Laragon** di komputermu.
2. Klik tombol **Start All** (Apache & MySQL akan aktif).
3. Klik tombol **Database** (atau buka HeidiSQL / phpMyAdmin bawaan Laragon).
4. Buat database baru dengan nama:
   ```sql
   CREATE DATABASE studio_informatika CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
   ```

---

## 2. Struktur Tabel SQL (DDL Schema)

Jalankan query SQL berikut pada database `studio_informatika`:

```sql
USE studio_informatika;

-- 1. Tabel Siswa
CREATE TABLE IF NOT EXISTS siswa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    nama VARCHAR(150) NOT NULL,
    kelas VARCHAR(50) NOT NULL,
    total_poin INT DEFAULT 0,
    level_gamifikasi INT DEFAULT 1,
    nama_level VARCHAR(50) DEFAULT 'Pemula',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB;

-- 2. Tabel Capaian Kuis Formatif (Tujuan Pembelajaran)
CREATE TABLE IF NOT EXISTS nilai_kuis (
    id INT AUTO_INCREMENT PRIMARY KEY,
    siswa_id INT NOT NULL,
    unit_id INT NOT NULL COMMENT '1: Von Neumann, 2: Alur IPO, 3: Siklus FDE',
    skor_kuis INT NOT NULL COMMENT 'Skor 0-100',
    status_tuntas TINYINT(1) DEFAULT 0 COMMENT '1: Tuntas (>= KKM), 0: Belum',
    jumlah_percobaan INT DEFAULT 1,
    poin_didapat INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (siswa_id) REFERENCES siswa(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 3. Tabel Refleksi Belajar Mandiri
CREATE TABLE IF NOT EXISTS refleksi_siswa (
    id INT AUTO_INCREMENT PRIMARY KEY,
    siswa_id INT NOT NULL,
    unit_id INT NOT NULL,
    jawaban_json TEXT COMMENT 'Menyimpan jawaban refleksi dalam format JSON',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (siswa_id) REFERENCES siswa(id) ON DELETE CASCADE
) ENGINE=InnoDB;

-- 4. Tabel Log Aktivitas Interaktif
CREATE TABLE IF NOT EXISTS log_aktivitas (
    id INT AUTO_INCREMENT PRIMARY KEY,
    siswa_id INT NOT NULL,
    unit_id INT NOT NULL,
    jenis_aktivitas VARCHAR(50) COMMENT 'tantangan / eksplorasi / kuis / refleksi',
    poin INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (siswa_id) REFERENCES siswa(id) ON DELETE CASCADE
) ENGINE=InnoDB;
```

---

## 3. Skrip Backend API (PHP Ringan di Folder `laragon/www/`)

Buat folder baru di dalam direktori Laragon:
`C:\laragon\www\studio-api\`

### A. File Koneksi: `db.php`
```php
<?php
// Izinkan akses CORS agar React frontend bisa mengirim data
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$host = 'localhost';
$user = 'root';
$pass = ''; // Default Laragon biasanya kosong
$db   = 'studio_informatika';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC
    ]);
} catch (PDOException $e) {
    echo json_encode(["status" => "error", "message" => "Koneksi database gagal: " . $e->getMessage()]);
    exit();
}
```

### B. Endpoint Simpan Progres Siswa: `simpan_progres.php`
```php
<?php
require_once 'db.php';

$data = json_decode(file_get_contents("php://input"), true);

if (!$data || !isset($data['nama']) || !isset($data['kelas'])) {
    echo json_encode(["status" => "error", "message" => "Data tidak lengkap"]);
    exit();
}

$nama = trim($data['nama']);
$kelas = trim($data['kelas']);
$totalPoin = $data['totalPoin'] ?? 0;
$level = $data['level'] ?? 1;
$levelName = $data['levelName'] ?? 'Pemula';

// 1. Cari atau buat record siswa
$stmt = $pdo->prepare("SELECT id FROM siswa WHERE nama = ? AND kelas = ?");
$stmt->execute([$nama, $kelas]);
$student = $stmt->fetch();

if ($student) {
    $studentId = $student['id'];
    $updateStmt = $pdo->prepare("UPDATE siswa SET total_poin = ?, level_gamifikasi = ?, nama_level = ? WHERE id = ?");
    $updateStmt->execute([$totalPoin, $level, $levelName, $studentId]);
} else {
    $insertStmt = $pdo->prepare("INSERT INTO siswa (nama, kelas, total_poin, level_gamifikasi, nama_level) VALUES (?, ?, ?, ?, ?)");
    $insertStmt->execute([$nama, $kelas, $totalPoin, $level, $levelName]);
    $studentId = $pdo->lastInsertId();
}

// 2. Simpan nilai kuis tiap unit jika ada
if (isset($data['units']) && is_array($data['units'])) {
    foreach ($data['units'] as $unitId => $u) {
        if (isset($u['quizScore'])) {
            $score = $u['quizScore'];
            $isPassed = $score >= ($unitId == 3 ? 80 : 75) ? 1 : 0;
            $points = $u['points'] ?? 0;

            // Cek apakah sudah pernah simpan percobaan pertama
            $check = $pdo->prepare("SELECT id FROM nilai_kuis WHERE siswa_id = ? AND unit_id = ?");
            $check->execute([$studentId, $unitId]);
            $existing = $check->fetch();

            if ($existing) {
                $upd = $pdo->prepare("UPDATE nilai_kuis SET skor_kuis = ?, status_tuntas = ?, poin_didapat = ? WHERE id = ?");
                $upd->execute([$score, $isPassed, $points, $existing['id']]);
            } else {
                $ins = $pdo->prepare("INSERT INTO nilai_kuis (siswa_id, unit_id, skor_kuis, status_tuntas, poin_didapat) VALUES (?, ?, ?, ?, ?)");
                $ins->execute([$studentId, $unitId, $score, $isPassed, $points]);
            }
        }
    }
}

echo json_encode(["status" => "success", "message" => "Progres berhasil disimpan ke MySQL", "studentId" => $studentId]);
```

### C. Endpoint Rekap Nilai Guru: `rekap_guru.php`
```php
<?php
require_once 'db.php';

$sql = "
    SELECT 
        s.id,
        s.nama,
        s.kelas,
        s.total_poin,
        s.nama_level,
        MAX(CASE WHEN nk.unit_id = 1 THEN nk.skor_kuis ELSE NULL END) AS unit_1_skor,
        MAX(CASE WHEN nk.unit_id = 2 THEN nk.skor_kuis ELSE NULL END) AS unit_2_skor,
        MAX(CASE WHEN nk.unit_id = 3 THEN nk.skor_kuis ELSE NULL END) AS unit_3_skor,
        ROUND(AVG(nk.skor_kuis), 1) AS rata_rata,
        s.updated_at AS waktu_terakhir
    FROM siswa s
    LEFT JOIN nilai_kuis nk ON s.id = nk.siswa_id
    GROUP BY s.id
    ORDER BY s.kelas ASC, s.nama ASC
";

$stmt = $pdo->query($sql);
$rows = $stmt->fetchAll();

echo json_encode(["status" => "success", "total_siswa" => count($rows), "data" => $rows]);
```

---

## 4. Cara Menghubungkan Frontend React ke API Laragon

Pada file utilitas `src/utils/storage.js`, tambahkan fungsi sinkronisasi otomatis:

```javascript
export async function syncToLaragonDatabase(state) {
  try {
    const payload = {
      nama: state.student?.name || 'Siswa Mandiri',
      kelas: state.student?.class || 'X-2',
      totalPoin: state.overall.totalPoints,
      level: state.overall.level,
      levelName: state.overall.levelName,
      units: {
        1: { quizScore: state.units.unit1?.quiz?.firstAttemptScorePercent, points: state.units.unit1?.totalPoints },
        2: { quizScore: state.units.unit2?.quiz?.firstAttemptScorePercent, points: state.units.unit2?.totalPoints },
        3: { quizScore: state.units.unit3?.quiz?.firstAttemptScorePercent, points: state.units.unit3?.totalPoints },
      }
    };

    const response = await fetch('http://localhost/studio-api/simpan_progres.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    });

    const resJson = await response.json();
    return resJson;
  } catch (err) {
    console.warn("Sinkronisasi database offline/gagal (data tetap aman di LocalStorage):", err);
  }
}
```

> **Keunggulan Konsep Hybrid ini:**
> Aplikasi tetap **100% jalan secara lokal (offline-first)**. Jika Laragon aktif, data otomatis terkirim ke MySQL; jika Laragon tidak aktif, aplikasi sama sekali tidak error dan siswa tetap bisa belajar lancar!
