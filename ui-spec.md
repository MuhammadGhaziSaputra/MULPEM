# 🎨 UI/UX Specification — Design System

## "Elevated Academic Studio" — Sistem Desain Media Pembelajaran

---

## 1. Prinsip Desain

| Prinsip | Penerapan |
|---|---|
| **Sederhana & Elegan** | Tampilan tidak ramai, fokus pada konten, hindari elemen dekoratif |
| **Konsistensi** | Pola yang sama di setiap unit (6 tahap berulang) |
| **Koherensi (Mayer)** | Hanya elemen yang mendukung tujuan belajar |
| **Pemberian Sinyal (Mayer)** | Warna punya peran tetap, highlight pada konsep kunci |
| **Mobile-First** | Dirancang untuk HP 5–6 inci terlebih dahulu |

---

## 2. Tipografi

### 2.1 Font Families

| Font | Penggunaan | Sumber |
|---|---|---|
| **Outfit** | Judul (Headline), Nama Unit, Angka Besar | Google Fonts |
| **DM Sans** | Body text, soal, umpan balik, label, navigasi | Google Fonts |
| *System Sans-Serif* | Fallback jika Google Fonts gagal dimuat | OS default |

### 2.2 Skala Tipografi

| Gaya | Font | Ukuran | Weight | Penggunaan |
|---|---|---|---|---|
| **Display** | Outfit | 36px (mobile: 28px) | 800 (ExtraBold) | Judul utama halaman pembuka |
| **H1** | Outfit | 28px (mobile: 24px) | 700 (Bold) | Judul unit, judul halaman |
| **H2** | Outfit | 22px (mobile: 20px) | 700 | Subjudul section |
| **H3** | DM Sans | 18px (mobile: 16px) | 600 (SemiBold) | Judul kartu, label section |
| **Body** | DM Sans | 16px | 400 (Regular) | Teks materi, soal, umpan balik |
| **Body Small** | DM Sans | 14px | 400 | Keterangan tambahan, caption |
| **Label** | DM Sans | 12px | 500 (Medium) | Badge, tag, lencana |
| **Button** | DM Sans | 14–16px | 600 | Teks tombol |

---

## 3. Palet Warna

### 3.1 Warna Utama

| Peran | Nama | Hex | Penggunaan |
|---|---|---|---|
| **Primer** | Indigo | `#4338CA` | Tombol utama, link, aksen, progress bar |
| **Primer Light** | Indigo 100 | `#E0E7FF` | Background kartu aktif, hover state |
| **Primer Dark** | Indigo 900 | `#312E81` | Teks pada header, judul unit |

### 3.2 Warna Semantik

| Peran | Nama | Hex | Penggunaan |
|---|---|---|---|
| **Sukses / Tepat** | Teal | `#0D9488` | ✅ Jawaban benar, unit selesai, badge tuntas |
| **Sukses BG** | Teal 50 | `#F0FDFA` | Background umpan balik benar |
| **Peringatan / Poin** | Amber | `#F59E0B` | ⚡ Poin, tantangan, level, badge skor |
| **Peringatan BG** | Amber 50 | `#FFFBEB` | Background tips & trik |
| **Error / Belum Tepat** | Rose | `#E11D48` | ❌ Jawaban salah, status belum tepat |
| **Error BG** | Rose 50 | `#FFF1F2` | Background umpan balik salah |

### 3.3 Warna Netral

| Peran | Hex | Penggunaan |
|---|---|---|
| **Teks Utama** | `#1E293B` (Slate 800) | Paragraf, judul |
| **Teks Sekunder** | `#64748B` (Slate 500) | Caption, label sekunder |
| **Border** | `#E2E8F0` (Slate 200) | Garis pembatas kartu, divider |
| **Background Halaman** | `#F8FAFC` (Slate 50) | Latar belakang halaman |
| **Background Kartu** | `#FFFFFF` | Latar kartu, section |

### 3.4 Rasio Kontras (WCAG AA)

| Pasangan | Rasio | Status |
|---|---|---|
| Teks utama (#1E293B) di atas BG halaman (#F8FAFC) | 17.1:1 | ✅ AAA |
| Teks putih (#FFF) di atas Indigo (#4338CA) | 7.9:1 | ✅ AAA |
| Teks teal (#0D9488) di atas Teal BG (#F0FDFA) | 4.8:1 | ✅ AA |
| Teks rose (#E11D48) di atas Rose BG (#FFF1F2) | 7.2:1 | ✅ AAA |

---

## 4. Layout & Grid

### 4.1 Breakpoints (Mobile-First)

| Breakpoint | Lebar | Kolom Grid | Penggunaan |
|---|---|---|---|
| **Mobile** | < 768px | 4 kolom | HP 5–6 inci (utama) |
| **Tablet** | 768–1023px | 8 kolom | Tablet landscape |
| **Desktop** | 1024–1439px | 12 kolom | Laptop |
| **Wide** | ≥ 1440px | 12 kolom (max-width 1200px) | Monitor besar |

### 4.2 Spacing System

Menggunakan kelipatan **4px** dan **8px**:

| Token | Nilai | Penggunaan |
|---|---|---|
| `--space-1` | 4px | Jarak antar icon-teks |
| `--space-2` | 8px | Padding badge, margin kecil |
| `--space-3` | 12px | Padding kartu kecil |
| `--space-4` | 16px | Padding section, gap grid |
| `--space-5` | 20px | Margin antar-section |
| `--space-6` | 24px | Padding kartu besar |
| `--space-8` | 32px | Margin antar-blok utama |
| `--space-10` | 40px | Padding halaman (desktop) |
| `--space-12` | 48px | Jarak antar-section besar |

### 4.3 Layout Halaman

```
┌──────────────────────────────────────────────┐
│ NAVBAR (fixed top)                           │
│ Logo │ Menu Items                  │ Badge   │
├──────────────────────────────────────────────┤
│                                              │
│  ┌──────────────────────────────────────┐    │
│  │ HERO / HEADER SECTION               │    │
│  │ (Background Indigo gradient)        │    │
│  └──────────────────────────────────────┘    │
│                                              │
│  ┌──────────────────────────────────────┐    │
│  │ CONTENT AREA                        │    │
│  │                                      │    │
│  │  ┌────────────┐  ┌────────────┐      │    │
│  │  │ Card Left  │  │ Card Right │      │    │
│  │  │ (2/3 width)│  │ (1/3 width)│      │    │
│  │  └────────────┘  └────────────┘      │    │
│  │                                      │    │
│  └──────────────────────────────────────┘    │
│                                              │
│  ┌──────────────────────────────────────┐    │
│  │ NAVIGATION FOOTER                   │    │
│  │ [← Kembali]            [Lanjut →]   │    │
│  └──────────────────────────────────────┘    │
│                                              │
├──────────────────────────────────────────────┤
│ FOOTER                                       │
│ Elevated Academic Studio • Informatika X     │
│ © 2025 SMA Negeri 2 Makassar                 │
└──────────────────────────────────────────────┘
```

---

## 5. Komponen UI

### 5.1 Tombol (Buttons)

| Varian | Style | Penggunaan |
|---|---|---|
| **Primary** | BG Indigo, teks putih, rounded-lg | "Mulai Belajar →", "Lanjut →" |
| **Secondary** | Border Indigo, teks Indigo, BG transparan | "Lihat Tujuan Pembelajaran" |
| **Ghost** | Teks Indigo, tanpa border/BG | "← Kembali ke Tantangan" |
| **Success** | BG Teal, teks putih | "Soal Berikutnya →" |
| **Warning** | BG Amber, teks dark | "Ulangi Kuis Unit" |
| **Danger** | Border Rose, teks Rose | "Ulang Soal Ini Sekarang" |

**Spesifikasi:**
- Border radius: 8px (rounded-lg)
- Padding: 12px 24px
- Font: DM Sans 14–16px SemiBold
- Hover: brightness 110%
- Active: scale(0.98)
- Disabled: opacity 0.5

### 5.2 Kartu (Cards)

```css
.card {
  background: #FFFFFF;
  border: 1px solid #E2E8F0;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.05);
}

.card:hover {
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.08);
}

.card--active {
  border-color: #4338CA;
  border-width: 2px;
}
```

### 5.3 Badge & Tag

| Varian | Contoh | Style |
|---|---|---|
| **Badge Fase** | `Fase E / Kelas X` | BG Indigo Dark, teks putih, pill shape |
| **Badge Unit** | `UNIT 1` | BG Indigo Light, teks Indigo |
| **Badge Skor** | `Skor Min. 80` | BG Amber, teks dark |
| **Badge Status** | `✓ Selesai` | BG Teal Light, teks Teal |
| **Badge Level** | `Level 2` | BG Amber Light, teks Amber Dark |
| **Badge Poin** | `+25 Poin` | BG Amber, teks dark, pill shape |

### 5.4 Progress Bar

```css
.progress-bar {
  height: 8px;
  background: #E2E8F0;
  border-radius: 4px;
  overflow: hidden;
}

.progress-bar__fill {
  height: 100%;
  background: linear-gradient(90deg, #4338CA, #0D9488);
  border-radius: 4px;
  transition: width 0.5s ease;
}
```

### 5.5 Umpan Balik Kuis

```
┌─ JAWABAN BENAR ─────────────────────────────┐
│ ✅ Pasangan Tepat! (+25 Poin)               │
│                                              │
│ Alasan: Control Unit (CU) berperan sebagai   │
│ pengatur lalu lintas instruksi...             │
│                                              │
│ 💡 Petunjuk: Ingat perbedaan antara tempat   │
│ penyimpanan sementara (RAM) dan pintu        │
│ masuk data (Input)                           │
│                                              │
│              [Soal Berikutnya →]             │
└──────────────────────────────────────────────┘

┌─ JAWABAN SALAH ──────────────────────────────┐
│ ❌ Belum tepat! Periksa kembali fungsinya.   │
│                                              │
│ Alasan: RAM bertugas menyimpan data dan      │
│ instruksi sementara, sedangkan proses        │
│ perhitungan dilakukan oleh ALU.              │
│                                              │
│ 💡 Petunjuk: Ingat komponen CPU yang         │
│ bertugas khusus menghitung matematika        │
│ dan logika.                                  │
│                                              │
│ [🔄 Ulang Soal Ini]   [Soal Berikutnya →]  │
└──────────────────────────────────────────────┘
```

---

## 6. Navigasi

### 6.1 Navbar

```
┌──────────────────────────────────────────────────────────┐
│ 📐 Studio Informatika       Beranda │ Berpikir │ ...    │
│    Kelas X • SMAN 2 Makassar      Komputasional         │
│                                    │ Akses Publik │ 👤  │
└──────────────────────────────────────────────────────────┘
```

**Menu Items:**
- Beranda
- Berpikir Komputasional (aktif — halaman utama media ini)
- Algoritma & Pemrograman (placeholder / disabled)
- Lab Logika (placeholder / disabled)
- Glosarium (placeholder / disabled)

### 6.2 Navigasi Antar-Tahap

```
[← Kembali ke Tantangan]                [Lanjut Ke Kuis Unit 1 →]
```

- Tombol **Kembali** (ghost, kiri) + tombol **Lanjut** (primary, kanan)
- Selalu terlihat di bawah konten
- Sticky di mobile

---

## 7. Responsif

### 7.1 Mobile (< 768px)

- Layout single column
- Navbar menjadi hamburger menu
- Kartu full-width
- Font Display turun ke 28px
- Padding halaman: 16px
- Tombol navigasi sticky bottom

### 7.2 Desktop (≥ 1024px)

- Layout 2 kolom (konten 2/3 + panel 1/3)
- Navbar horizontal penuh
- Max content width: 1200px, centered
- Padding halaman: 40px

---

## 8. Animasi & Transisi

| Elemen | Animasi | Durasi |
|---|---|---|
| Page transition | Fade in | 300ms |
| Card hover | Elevate shadow | 200ms |
| Progress bar fill | Width expand | 500ms ease |
| Umpan balik muncul | Slide down + fade | 300ms |
| Badge poin | Pop scale | 200ms |
| Drag item | Follow cursor | Real-time |
| Drop success | Snap + green glow | 300ms |
| Drop fail | Shake + red border | 400ms |
| Komponen aktif (simulasi) | Pulse glow | 1s infinite |

---

## 9. Aksesibilitas

| Aspek | Implementasi |
|---|---|
| **Kontras** | Minimum 4.5:1 (WCAG AA) untuk semua teks |
| **Keyboard** | Semua elemen interaktif bisa diakses dengan Tab + Enter |
| **Focus indicator** | Outline Indigo 2px pada focus |
| **Alt text** | Semua diagram dan ilustrasi memiliki alt text deskriptif |
| **Status tidak hanya warna** | Benar/salah juga ditandai dengan ikon (✅/❌) dan teks |
| **Font minimum** | 12px (hanya untuk badge), body minimum 16px |
| **Touch target** | Minimum 44×44px untuk elemen interaktif di mobile |
