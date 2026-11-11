<?php
require_once __DIR__ . '/db.php';

$rawInput = file_get_contents("php://input");
$data = json_decode($rawInput, true);

if (!$data) {
    http_response_code(400);
    echo json_encode(["status" => "error", "message" => "Payload JSON tidak valid"]);
    exit();
}

$nama = trim($data['nama'] ?? 'Siswa Mandiri');
$kelas = trim($data['kelas'] ?? 'X-2');
$totalPoin = (int)($data['totalPoin'] ?? 0);
$level = (int)($data['level'] ?? 1);
$levelName = trim($data['levelName'] ?? 'Pemula');

if (empty($nama)) {
    $nama = 'Siswa Mandiri';
}
if (empty($kelas)) {
    $kelas = 'X-2';
}

try {
    $pdo->beginTransaction();

    // 1. Simpan atau perbarui data siswa (Upsert)
    $stmtSiswa = $pdo->prepare("
        INSERT INTO siswa (nama, kelas, total_poin, level_gamifikasi, nama_level)
        VALUES (?, ?, ?, ?, ?)
        ON DUPLICATE KEY UPDATE
            total_poin = VALUES(total_poin),
            level_gamifikasi = VALUES(level_gamifikasi),
            nama_level = VALUES(nama_level),
            updated_at = NOW()
    ");
    $stmtSiswa->execute([$nama, $kelas, $totalPoin, $level, $levelName]);

    // Ambil ID siswa
    $stmtId = $pdo->prepare("SELECT id FROM siswa WHERE nama = ? AND kelas = ?");
    $stmtId->execute([$nama, $kelas]);
    $studentRow = $stmtId->fetch();
    $studentId = $studentRow ? (int)$studentRow['id'] : 0;

    // 2. Simpan nilai kuis per unit
    if ($studentId > 0 && isset($data['units']) && is_array($data['units'])) {
        $stmtKuis = $pdo->prepare("
            INSERT INTO nilai_kuis (siswa_id, unit_id, skor_kuis, status_tuntas, poin_didapat, jumlah_percobaan)
            VALUES (?, ?, ?, ?, ?, 1)
            ON DUPLICATE KEY UPDATE
                skor_kuis = VALUES(skor_kuis),
                status_tuntas = VALUES(status_tuntas),
                poin_didapat = VALUES(poin_didapat),
                jumlah_percobaan = jumlah_percobaan + 1,
                updated_at = NOW()
        ");

        foreach ($data['units'] as $unitKey => $unitData) {
            $unitId = 1;
            if (is_numeric($unitKey)) {
                $unitId = (int)$unitKey;
            } elseif ($unitKey === 'unit1') {
                $unitId = 1;
            } elseif ($unitKey === 'unit2') {
                $unitId = 2;
            } elseif ($unitKey === 'unit3') {
                $unitId = 3;
            }

            if (isset($unitData['quizScore']) && $unitData['quizScore'] !== null) {
                $score = (int)$unitData['quizScore'];
                $passingScore = ($unitId === 3) ? 80 : 75;
                $isPassed = ($score >= $passingScore) ? 1 : 0;
                $pts = (int)($unitData['points'] ?? 0);

                $stmtKuis->execute([$studentId, $unitId, $score, $isPassed, $pts]);
            }

            // Simpan refleksi jika ada
            if (isset($unitData['reflection']) && is_array($unitData['reflection'])) {
                $refl = $unitData['reflection'];
                $scale = isset($refl['scale']) ? (int)$refl['scale'] : null;
                $difficult = $refl['difficultPart'] ?? null;
                $strategy = $refl['strategy'] ?? null;

                $stmtRefl = $pdo->prepare("
                    INSERT INTO refleksi_siswa (siswa_id, unit_id, pemahaman_skala, bagian_sulit, strategi_belajar)
                    VALUES (?, ?, ?, ?, ?)
                    ON DUPLICATE KEY UPDATE
                        pemahaman_skala = VALUES(pemahaman_skala),
                        bagian_sulit = VALUES(bagian_sulit),
                        strategi_belajar = VALUES(strategi_belajar),
                        updated_at = NOW()
                ");
                $stmtRefl->execute([$studentId, $unitId, $scale, $difficult, $strategy]);
            }
        }
    }

    $pdo->commit();

    echo json_encode([
        "status" => "success",
        "message" => "Progres berhasil disinkronkan ke database MySQL",
        "studentId" => $studentId,
        "syncTime" => date('Y-m-d H:i:s')
    ]);
} catch (Exception $e) {
    if ($pdo->inTransaction()) {
        $pdo->rollBack();
    }
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Gagal menyimpan ke database: " . $e->getMessage()
    ]);
}
