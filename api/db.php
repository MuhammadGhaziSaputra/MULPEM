<?php
// ========================================================
// KONEKSI DATABASE & CORS HEADERS
// STUDIO INFORMATIKA — LARAGON / XAMPP BACKEND
// ========================================================

// Izinkan CORS dari React (Vite port 3000, 4173, 5173, dll.)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type, Authorization, X-Requested-With");
header("Access-Control-Allow-Methods: GET, POST, OPTIONS");
header("Content-Type: application/json; charset=UTF-8");

// Tangani preflight request OPTIONS
if (isset($_SERVER['REQUEST_METHOD']) && $_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

$host = 'localhost';
$user = 'root';
$pass = ''; // Default Laragon & XAMPP kosong
$db   = 'studio_informatika';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$db;charset=utf8mb4", $user, $pass, [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION,
        PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
        PDO::ATTR_TIMEOUT => 3
    ]);
} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode([
        "status" => "error",
        "message" => "Gagal terhubung ke MySQL: " . $e->getMessage(),
        "hint" => "Pastikan Apache & MySQL di Laragon / XAMPP sudah di-START, dan database 'studio_informatika' sudah dibuat."
    ]);
    exit();
}
