@echo off
title Impor Database Otomatis ke Laragon
color 0A
echo ========================================================
echo   IMPOR DATABASE STUDIO INFORMATIKA KE LARAGON (D:\laragon8)
echo ========================================================
echo.

set MYSQL_BIN=""

if exist "D:\laragon8\bin\mysql\mysql-8.0.30-winx64\bin\mysql.exe" (
    set MYSQL_BIN="D:\laragon8\bin\mysql\mysql-8.0.30-winx64\bin\mysql.exe"
)
if exist "D:\laragon8\bin\mysql\mysql-8.4.3-winx64\bin\mysql.exe" (
    set MYSQL_BIN="D:\laragon8\bin\mysql\mysql-8.4.3-winx64\bin\mysql.exe"
)

if %MYSQL_BIN%=="" (
    echo [ERROR] Binary MySQL tidak ditemukan di D:\laragon8\bin\mysql\
    pause
    exit /b
)

echo [1/3] Menghubungkan ke MySQL di Laragon...
%MYSQL_BIN% -u root -e "CREATE DATABASE IF NOT EXISTS studio_informatika CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;" 2>nul

if %ERRORLEVEL% NEQ 0 (
    echo.
    echo [PERHATIAN] Gagal terhubung ke MySQL!
    echo Pastikan Anda sudah membuka Laragon (D:\laragon8\laragon.exe)
    echo dan sudah mengklik tombol 'Start All'.
    echo.
    pause
    exit /b
)

echo [2/3] Mengimpor struktur tabel dan data ke 'studio_informatika'...
%MYSQL_BIN% -u root studio_informatika < "D:\laragon8\www\studio-api\database.sql"

if %ERRORLEVEL% EQU 0 (
    echo [3/3] BERHASIL! Database 'studio_informatika' sudah siap digunakan.
    echo.
    echo ========================================================
    echo   KONEKSI DATABASE SIAP!
    echo   Silakan buka browser di: http://localhost/studio-api/status.php
    echo ========================================================
) else (
    echo [ERROR] Terjadi kesalahan saat mengimpor SQL.
)

echo.
pause
