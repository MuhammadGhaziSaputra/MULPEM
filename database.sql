studio_informatikastudio_informatikastudio_informatika-- ========================================================
-- DATABASE: studio_informatika
-- SISTEM PEMBELAJARAN SISTEM KOMPUTER (FASE E)
-- SMA NEGERI 2 MAKASSAR • PTIK UNM
-- ========================================================

CREATE DATABASE IF NOT EXISTS `studio_informatika`
CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

USE `studio_informatika`;

-- 1. TABEL SISWA
CREATE TABLE IF NOT EXISTS `siswa` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `nama` VARCHAR(150) NOT NULL,
    `kelas` VARCHAR(50) NOT NULL,
    `total_poin` INT DEFAULT 0,
    `level_gamifikasi` INT DEFAULT 1,
    `nama_level` VARCHAR(50) DEFAULT 'Pemula',
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    INDEX `idx_siswa_kelas` (`kelas`),
    UNIQUE KEY `uk_siswa_nama_kelas` (`nama`, `kelas`)
) ENGINE=InnoDB;

-- 2. TABEL NILAI KUIS FORMATIF (CAPAIAN TP)
CREATE TABLE IF NOT EXISTS `nilai_kuis` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `siswa_id` INT NOT NULL,
    `unit_id` INT NOT NULL COMMENT '1: Von Neumann, 2: IPO, 3: FDE',
    `skor_kuis` INT NOT NULL COMMENT 'Skor 0-100',
    `status_tuntas` TINYINT(1) DEFAULT 0 COMMENT '1: Tuntas (>= KKM), 0: Belum',
    `poin_didapat` INT DEFAULT 0,
    `jumlah_percobaan` INT DEFAULT 1,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`siswa_id`) REFERENCES `siswa`(`id`) ON DELETE CASCADE,
    UNIQUE KEY `uk_siswa_unit` (`siswa_id`, `unit_id`)
) ENGINE=InnoDB;

-- 3. TABEL REFLEKSI BELAJAR MANDIRI
CREATE TABLE IF NOT EXISTS `refleksi_siswa` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `siswa_id` INT NOT NULL,
    `unit_id` INT NOT NULL,
    `pemahaman_skala` INT DEFAULT NULL COMMENT 'Skala 1-4',
    `bagian_sulit` TEXT,
    `strategi_belajar` TEXT,
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    `updated_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    FOREIGN KEY (`siswa_id`) REFERENCES `siswa`(`id`) ON DELETE CASCADE,
    UNIQUE KEY `uk_siswa_refleksi_unit` (`siswa_id`, `unit_id`)
) ENGINE=InnoDB;

-- 4. TABEL LOG AKTIVITAS INTERAKTIF
CREATE TABLE IF NOT EXISTS `log_aktivitas` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `siswa_id` INT NOT NULL,
    `unit_id` INT NOT NULL,
    `jenis_aktivitas` VARCHAR(50) COMMENT 'tantangan, eksplorasi, kuis, refleksi',
    `poin` INT DEFAULT 0,
    `keterangan` VARCHAR(255),
    `created_at` TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`siswa_id`) REFERENCES `siswa`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB;

-- ========================================================
-- DATA CONTOH AWAL (SEED DUMMY SISWA UNTUK DEMO)
-- ========================================================
INSERT INTO `siswa` (`id`, `nama`, `kelas`, `total_poin`, `level_gamifikasi`, `nama_level`) VALUES
(1, 'Ahmad Fauzan', 'X-2', 310, 4, 'Master Komputasi'),
(2, 'Nurul Hidayah', 'X-2', 240, 3, 'Arsitek Sistem'),
(3, 'Andi Rifqi Pratama', 'X-2', 150, 2, 'Penjelajah Logika')
ON DUPLICATE KEY UPDATE `updated_at` = NOW();

INSERT INTO `nilai_kuis` (`siswa_id`, `unit_id`, `skor_kuis`, `status_tuntas`, `poin_didapat`) VALUES
(1, 1, 90, 1, 50),
(1, 2, 85, 1, 50),
(1, 3, 95, 1, 60),
(2, 1, 80, 1, 45),
(2, 2, 75, 1, 40),
(2, 3, 70, 0, 35),
(3, 1, 75, 1, 40)
ON DUPLICATE KEY UPDATE `updated_at` = NOW();
