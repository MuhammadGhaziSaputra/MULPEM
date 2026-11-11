<?php
require_once __DIR__ . '/db.php';

$kelasFilter = isset($_GET['kelas']) ? trim($_GET['kelas']) : '';

try {
    $sql = "
        SELECT 
            s.id,
            s.nama,
            s.kelas,
            s.total_poin,
            s.level_gamifikasi,
            s.nama_level,
            MAX(CASE WHEN nk.unit_id = 1 THEN nk.skor_kuis ELSE NULL END) AS unit1_skor,
            MAX(CASE WHEN nk.unit_id = 1 THEN nk.status_tuntas ELSE 0 END) AS unit1_tuntas,
            MAX(CASE WHEN nk.unit_id = 2 THEN nk.skor_kuis ELSE NULL END) AS unit2_skor,
            MAX(CASE WHEN nk.unit_id = 2 THEN nk.status_tuntas ELSE 0 END) AS unit2_tuntas,
            MAX(CASE WHEN nk.unit_id = 3 THEN nk.skor_kuis ELSE NULL END) AS unit3_skor,
            MAX(CASE WHEN nk.unit_id = 3 THEN nk.status_tuntas ELSE 0 END) AS unit3_tuntas,
            ROUND(AVG(nk.skor_kuis), 1) AS rata_rata_kuis,
            COUNT(DISTINCT CASE WHEN nk.status_tuntas = 1 THEN nk.unit_id END) AS unit_tuntas_count,
            s.updated_at AS waktu_terakhir
        FROM siswa s
        LEFT JOIN nilai_kuis nk ON s.id = nk.siswa_id
    ";

    $params = [];
    if (!empty($kelasFilter)) {
        $sql .= " WHERE s.kelas = ? ";
        $params[] = $kelasFilter;
    }

    $sql .= " GROUP BY s.id ORDER BY s.kelas ASC, s.nama ASC ";

    $stmt = $pdo->prepare($sql);
    $stmt->execute($params);
    $students = $stmt->fetchAll();

    // Ambil daftar kelas unik untuk filter
    $stmtKelas = $pdo->query("SELECT DISTINCT kelas FROM siswa ORDER BY kelas ASC");
    $listKelas = $stmtKelas->fetchAll(PDO::FETCH_COLUMN);

    echo json_encode([
        "status" => "success",
        "totalSiswa" => count($students),
        "daftarKelas" => $listKelas,
        "data" => $students,
        "generatedAt" => date('Y-m-d H:i:s')
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Gagal mengambil data rekap: " . $e->getMessage()
    ]);
}
