<?php
require_once __DIR__ . '/db.php';

try {
    $stmt = $pdo->query("SELECT COUNT(*) AS total_siswa FROM siswa");
    $row = $stmt->fetch();
    
    echo json_encode([
        "status" => "online",
        "database" => "connected",
        "serverTime" => date('Y-m-d H:i:s'),
        "totalSiswa" => (int)$row['total_siswa']
    ]);
} catch (Exception $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "database" => "disconnected",
        "message" => $e->getMessage()
    ]);
}
