# ABHISARA · Lap Timer Dashboard

Aplikasi **Lap Timer berbasis web** untuk mencatat waktu lap, menghitung penilaian secara otomatis, dan menyimpan riwayat sesi pengujian. Dikembangkan untuk mendukung pengujian performa kapal **ABHISARA** dengan antarmuka responsif dan sistem autentikasi terpusat.

![Version](https://img.shields.io/badge/version-1.0-blue)
![Status](https://img.shields.io/badge/status-active-success)
![License](https://img.shields.io/badge/license-MIT-green)
![Platform](https://img.shields.io/badge/platform-web-lightgrey)

---

## Demo

Aplikasi di-host menggunakan Netlify dan menggunakan Netlify Identity untuk autentikasi pengguna.

**[Buka ABHISARA Lap Timer](https://abhisara.netlify.app)**

> **Catatan keamanan:** Autentikasi dikelola melalui Netlify Identity. Akses aplikasi memerlukan akun yang telah terdaftar atau diundang oleh administrator, sesuai dengan konfigurasi registrasi yang berlaku.

---

## Fitur Utama

### 1. Timer dan Pencatatan Lap

- Timer dengan presisi hingga centisecond (0,01 detik).
- Kontrol timer: START, PAUSE, dan LANJUT.
- Tombol LAP untuk mencatat waktu setiap lap.
- Timer kembali ke nol setelah pencatatan lap untuk pengukuran berikutnya.

### 2. Penilaian Otomatis

Sistem menghitung nilai berdasarkan waktu dan jumlah lap yang dicapai.

| Komponen | Rumus |
|---|---|
| **NT (Nilai Kecepatan)** | `(T_tercepat / T_aktual) × 100` |
| **NKL (Nilai Ketahanan Lap)** | `(KL_aktual / KL_terbanyak) × 100` |
| **NA (Nilai Akhir)** | `0.5 × NT + 0.5 × NKL` |

Indikator nilai ditampilkan berdasarkan kategori berikut:

- Hijau: nilai ≥ 80.
- Kuning: nilai ≥ 60 dan < 80.
- Merah: nilai < 60.

### 3. Riwayat Sesi Pengujian

- Penyimpanan sesi ketika pengguna melakukan reset sesi.
- Penyimpanan hingga 50 sesi terakhir.
- Tampilan detail waktu lap untuk setiap sesi.
- Fitur pemulihan (*restore*) sesi ke timer.
- Ekspor data untuk setiap sesi maupun seluruh riwayat.

### 4. Grafik Waktu Lap

- Grafik garis untuk memvisualisasikan waktu setiap lap.
- Grafik berbasis SVG tanpa memerlukan library grafik tambahan.
- Penanda khusus untuk lap tercepat.

### 5. Catatan Setiap Lap

- Catatan teks untuk setiap lap.
- Mendukung catatan multi-baris.
- Penyimpanan otomatis ketika pengguna mengetik.

### 6. Autentikasi Pengguna

- Login menggunakan email dan password melalui Netlify Identity.
- Pengelolaan akun melalui dashboard Netlify.
- Mendukung konfigurasi registrasi terbuka atau undangan saja, sesuai pengaturan situs.

### 7. Penyimpanan Lokal

Data tertentu disimpan secara otomatis di browser menggunakan `localStorage`, meliputi:

- Data waktu lap dan catatan.
- Setelan karburator Low/High.
- Riwayat sesi pengujian.
- Status atau informasi sesi aplikasi yang disimpan oleh implementasi.

Data lokal dapat tetap tersedia setelah browser ditutup atau halaman dimuat ulang, selama data browser tidak dihapus. Penyimpanan lokal tidak otomatis menyinkronkan data antarperangkat.

### 8. Ekspor dan Backup Data

- **CSV:** mengekspor data untuk pengolahan lebih lanjut di spreadsheet.
- **Salin:** menyalin data ke clipboard.
- **JPG:** menyimpan tangkapan layar dashboard.
- **Export All History:** mengekspor seluruh riwayat sesi ke dalam satu file CSV.

---

## Cara Menggunakan

### 1. Buka Aplikasi

Akses aplikasi melalui browser di komputer atau perangkat seluler.

https://abhisara.netlify.app

### 2. Login

Masukkan email dan password akun yang telah terdaftar atau diundang oleh administrator.

### 3. Mulai Pengujian

1. Masukkan nama sesi pengujian, misalnya `Uji-01`.
2. Masukkan setelan karburator Low/High jika diperlukan.
3. Tekan **START** untuk memulai timer.
4. Tekan **LAP** setiap kali kapal melewati garis finis.
5. Timer akan kembali ke nol untuk pengukuran lap berikutnya.

### 4. Tambahkan Catatan

Gunakan kolom catatan pada setiap lap untuk mencatat kondisi atau informasi yang relevan selama pengujian.

### 5. Simpan Sesi

Tekan tombol **Reset sesi** untuk menyimpan sesi ke riwayat dan memulai sesi baru.

### 6. Ekspor Data

Gunakan fitur ekspor yang tersedia untuk menyimpan data lap, menyalin data ke clipboard, atau mengambil tangkapan layar dashboard.

---

## Manajemen Pengguna

Pengelolaan pengguna dilakukan melalui Netlify Identity.

1. Buka [Netlify Dashboard](https://app.netlify.com).
2. Pilih situs atau proyek `abhisara`.
3. Buka menu Identity jika tersedia pada konfigurasi situs.
4. Kelola akun melalui bagian pengguna (*Users*).
5. Gunakan fitur undangan pengguna atau pengaturan registrasi sesuai kebutuhan.

**Catatan:** Nama menu dan ketersediaan fitur dapat berbeda bergantung pada konfigurasi situs dan layanan autentikasi yang digunakan. Pastikan konfigurasi autentikasi yang aktif sesuai dengan implementasi aplikasi.

---

## Struktur Proyek

```text
abhisara/
├── index.html       # Aplikasi utama: HTML, CSS, dan JavaScript
├── logo-ferc.png    # Logo FERC
└── README.md        # Dokumentasi proyek
```

Struktur di atas menggambarkan berkas utama yang digunakan dalam dokumentasi ini. Jika proyek memiliki berkas atau konfigurasi tambahan, sesuaikan struktur tersebut dengan kondisi repositori sebenarnya.

---

## Teknologi

| Teknologi | Kegunaan |
|---|---|
| HTML5 | Struktur aplikasi |
| CSS3 | Tampilan, responsivitas, dan tema |
| JavaScript (Vanilla) | Logika timer, penilaian, dan riwayat |
| Local Storage | Penyimpanan data lokal pada browser |
| SVG | Grafik waktu lap dan elemen visual |
| Netlify Identity | Autentikasi pengguna |
| html2canvas | Pembuatan tangkapan layar, jika digunakan |
| Netlify | Hosting aplikasi web |

---

## Kompatibilitas

Aplikasi ditujukan untuk browser modern yang mendukung `localStorage` dan `requestAnimationFrame`.

| Browser | Target dukungan |
|---|---|
| Google Chrome | Desktop dan Android |
| Safari | macOS dan iOS |
| Mozilla Firefox | Desktop |
| Microsoft Edge | Desktop |

Kompatibilitas aktual bergantung pada implementasi aplikasi dan fitur browser yang tersedia.

---

## Tema Warna

Aplikasi menggunakan tema biru dengan aksen warna untuk membedakan komponen antarmuka.

| Warna | Kode | Penggunaan |
|---|---|---|
| Biru utama | `#4f46e5` | Tombol dan elemen utama |
| Ungu | `#6d5bf0` | Aksen visual |
| Emas | `#f5a524` | Highlight dan lap tercepat |
| Hijau | `#12b76a` | Indikator nilai tinggi |
| Merah | `#ef4444` | Indikator nilai rendah dan aksi penghapusan |

---

## Lisensi

Proyek ini menggunakan **MIT License**.

```text
MIT License

Copyright (c) 2026 Linda Anggara

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```

---

## Author

**Linda Anggara**

- GitHub: [@lindanggara](https://github.com/lindanggara)
- Repository: [abhisara](https://github.com/lindanggara/abhisara)

---

<p align="center">
  <strong>ABHISARA · Lap Timer Dashboard</strong><br>
  <em>Precision Timing untuk Performa Terbaik</em>
</p>