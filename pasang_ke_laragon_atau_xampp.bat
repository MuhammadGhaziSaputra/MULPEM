@echo off
title Pasang API Studio Informatika ke Laragon / XAMPP
color 0A
echo ========================================================
echo   PASANG BACKEND API STUDIO INFORMATIKA KE WEB SERVER
echo ========================================================
echo.

set COPIED=0

:: Cek D:\laragon8\www (Lokasi Laragon pengguna)
if exist "D:\laragon8\www" (
    echo [OK] Menemukan folder Laragon di D:\laragon8\www
    if not exist "D:\laragon8\www\studio-api" mkdir "D:\laragon8\www\studio-api"
    xcopy /E /I /Y "api\*" "D:\laragon8\www\studio-api\" >nul
    echo [BERHASIL] Seluruh berkas API disalin ke D:\laragon8\www\studio-api\
    set COPIED=1
)

:: Cek D:\laragon\www
if exist "D:\laragon\www" (
    echo [OK] Menemukan folder Laragon di D:\laragon\www
    if not exist "D:\laragon\www\studio-api" mkdir "D:\laragon\www\studio-api"
    xcopy /E /I /Y "api\*" "D:\laragon\www\studio-api\" >nul
    echo [BERHASIL] Seluruh berkas API disalin ke D:\laragon\www\studio-api\
    set COPIED=1
)

:: Cek C:\laragon\www
if exist "C:\laragon\www" (
    echo [OK] Menemukan folder Laragon di C:\laragon\www
    if not exist "C:\laragon\www\studio-api" mkdir "C:\laragon\www\studio-api"
    xcopy /E /I /Y "api\*" "C:\laragon\www\studio-api\" >nul
    echo [BERHASIL] Seluruh berkas API disalin ke C:\laragon\www\studio-api\
    set COPIED=1
)

:: Cek C:\xampp\htdocs
if exist "C:\xampp\htdocs" (
    echo [OK] Menemukan folder XAMPP di C:\xampp\htdocs
    if not exist "C:\xampp\htdocs\studio-api" mkdir "C:\xampp\htdocs\studio-api"
    xcopy /E /I /Y "api\*" "C:\xampp\htdocs\studio-api\" >nul
    echo [BERHASIL] Seluruh berkas API disalin ke C:\xampp\htdocs\studio-api\
    set COPIED=1
)

if %COPIED%==0 (
    echo [PERHATIAN] Laragon belum ditemukan otomatis.
    echo Silakan salin folder 'api' ini secara manual ke folder 'www' Laragon Anda.
) else (
    echo.
    echo ========================================================
    echo   SELESAI! Langkah Selanjutnya:
    echo   1. Buka Laragon (D:\laragon8\laragon.exe) lalu klik 'Start All'.
    echo   2. Buka database di Laragon, buat database 'studio_informatika'.
    echo   3. Impor berkas 'database.sql' ke database tersebut.
    echo   4. Buka peramban di: http://localhost/studio-api/status.php
    echo ========================================================
)

echo.
pause
