# ABHISARA · Lap Timer Dashboard

Aplikasi **Lap Timer berbasis web** untuk mencatat waktu lap, menghitung penilaian secara otomatis, dan mengelola riwayat sesi pengujian. Dikembangkan untuk mendukung pengujian performa kapal **ABHISARA** dengan antarmuka responsif, autentikasi pengguna, dan sinkronisasi riwayat sesi antaranggota.

![Version](https://img.shields.io/badge/version-1.0-blue)
![Status](https://img.shields.io/badge/status-active-success)
![License](https://img.shields.io/badge/license-MIT-green)
![Platform](https://img.shields.io/badge/platform-web-lightgrey)

---

## Demo

Aplikasi di-host menggunakan Netlify dengan autentikasi melalui Netlify Identity sesuai konfigurasi yang digunakan.

**[Buka ABHISARA Lap Timer](https://abhisara.netlify.app)**

> **Catatan keamanan:** Akses aplikasi memerlukan akun yang telah terdaftar atau diundang oleh administrator sesuai pengaturan autentikasi yang aktif.

## Fitur Utama

### 1. Timer dan Pencatatan Lap

- Timer dengan presisi tampilan hingga centisecond (0,01 detik).
- Kontrol timer: START, PAUSE, dan LANJUT.
- Tombol LAP untuk mencatat waktu setiap lap.
- Timer dapat direset untuk memulai pengukuran berikutnya.

### 2. Penilaian Otomatis

Sistem menghitung nilai berdasarkan waktu dan jumlah lap yang dicapai.

| Komponen | Rumus |
|---|---|
| **NT (Nilai Kecepatan)** | `(T_tercepat / T_aktual) × 100` |
| **NKL (Nilai Ketahanan Lap)** | `(KL_aktual / KL_terbanyak) × 100` |
| **NA (Nilai Akhir)** | `0.5 × NT + 0.5 × NKL` |

Indikator nilai ditampilkan berdasarkan kategori:

- Hijau: nilai ≥ 80.
- Kuning: nilai ≥ 60 dan < 80.
- Merah: nilai < 60.

### 3. Riwayat Sesi Pengujian

- Penyimpanan sesi ketika pengguna melakukan reset sesi.
- Penyimpanan riwayat bersama melalui Netlify Blobs.
- Riwayat dapat diakses oleh anggota yang login sesuai implementasi autentikasi dan hak akses.
- Informasi pembuat sesi ditampilkan bersama tanggal sesi.
- Tampilan detail waktu lap untuk setiap sesi.
- Fitur pemulihan (*restore*) sesi ke timer.
- Ekspor data untuk setiap sesi maupun seluruh riwayat.
- Pembatasan jumlah riwayat sesuai implementasi aplikasi.

### 4. Sinkronisasi Riwayat Antaranggota

- Riwayat sesi disimpan di server agar dapat diakses lintas perangkat dan akun yang berhak.
- Data diperbarui saat pengguna login, membuka tab History, atau koneksi internet kembali.
- Pembaruan berkala dilakukan ketika tab History terbuka.
- Sesi baru yang dibuat saat offline dapat masuk antrean untuk dikirim ketika koneksi kembali tersedia.
- Status sinkronisasi ditampilkan pada antarmuka.
- Riwayat lama yang tersimpan di perangkat dapat ditawarkan untuk diimpor ke penyimpanan bersama.

**Catatan:** Timer yang sedang berjalan tetap bersifat lokal pada perangkat. Sinkronisasi riwayat tidak berarti timer aktif dibagikan secara real-time.

### 5. Pengelolaan dan Penghapusan Sesi

- Pembuat sesi dapat menghapus sesi miliknya sesuai validasi backend.
- Admin dapat menghapus sesi sesuai hak akses yang diberikan.
- Fitur Hapus Semua mengikuti aturan hak akses: pengguna biasa hanya menghapus sesi miliknya, sedangkan admin dapat menghapus seluruh riwayat bersama.
- Hak akses harus divalidasi oleh backend, bukan hanya disembunyikan atau ditampilkan melalui antarmuka.

### 6. Grafik Waktu Lap

- Grafik garis untuk memvisualisasikan waktu setiap lap.
- Grafik berbasis SVG tanpa memerlukan library grafik tambahan.
- Penanda khusus untuk lap tercepat.

### 7. Catatan Setiap Lap

- Catatan teks untuk setiap lap.
- Mendukung catatan multi-baris.
- Penyimpanan otomatis ketika pengguna mengetik, sesuai implementasi aplikasi.

### 8. Autentikasi Pengguna

- Login menggunakan email dan password melalui sistem autentikasi yang dikonfigurasi.
- Pengelolaan akun melalui dashboard penyedia autentikasi.
- Hak akses admin digunakan untuk mengatur operasi penghapusan riwayat bersama.
- Pengguna harus terautentikasi untuk mengakses fitur yang memerlukan login.

### 9. Penyimpanan Lokal

Data tertentu tetap disimpan di browser menggunakan `localStorage`, meliputi:

- Data waktu lap dan catatan lokal.
- Setelan karburator Low/High.
- Riwayat lokal atau cache yang digunakan aplikasi.
- Antrean data yang menunggu sinkronisasi, sesuai implementasi.

Data lokal dapat tetap tersedia setelah browser ditutup atau halaman dimuat ulang, selama data browser tidak dihapus.

Penyimpanan lokal berbeda dari penyimpanan bersama di server. Data lokal tidak otomatis tersedia di perangkat lain tanpa proses sinkronisasi.

### 10. Ekspor dan Backup Data

- **CSV:** mengekspor data untuk pengolahan lebih lanjut di spreadsheet.
- **Salin:** menyalin data ke clipboard.
- **JPG:** menyimpan tangkapan layar dashboard.
- **Export All History:** mengekspor riwayat sesi ke dalam satu file CSV.

---

## Cara Menggunakan

### 1. Buka Aplikasi

Akses aplikasi melalui browser komputer atau perangkat seluler.

https://abhisara.netlify.app

### 2. Login

Masukkan email dan password akun yang telah terdaftar atau diundang oleh administrator.

### 3. Mulai Pengujian

1. Masukkan nama sesi pengujian, misalnya `Uji-01`.
2. Masukkan setelan karburator Low/High jika diperlukan.
3. Tekan **START** untuk memulai timer.
4. Tekan **LAP** setiap kali kapal melewati garis finis.
5. Ulangi pengukuran sesuai kebutuhan.

### 4. Tambahkan Catatan

Gunakan kolom catatan pada setiap lap untuk mencatat kondisi atau informasi yang relevan selama pengujian.

### 5. Simpan Sesi

Tekan tombol **Reset sesi** untuk menyimpan sesi ke riwayat dan memulai sesi baru.

Sesi yang tersimpan akan diproses untuk masuk ke riwayat bersama sesuai status koneksi dan implementasi sinkronisasi.

### 6. Lihat Riwayat Bersama

Buka tab **History** untuk melihat sesi yang tersedia bagi akun yang login. Pastikan status sinkronisasi menunjukkan bahwa data telah tersinkron sebelum menganggap sesi berhasil tersimpan di server.

### 7. Ekspor Data

Gunakan fitur ekspor untuk menyimpan data lap, menyalin data ke clipboard, atau mengambil tangkapan layar dashboard.

---

## Manajemen Pengguna

Pengelolaan pengguna dilakukan melalui layanan autentikasi yang terhubung dengan aplikasi.

Untuk instalasi yang menggunakan Netlify Identity:

1. Buka [Netlify Dashboard](https://app.netlify.com/).
2. Pilih situs `abhisara`.
3. Buka menu Identity jika tersedia.
4. Kelola pengguna melalui bagian Users.
5. Atur registrasi atau undangan sesuai kebutuhan.
6. Berikan role `admin` kepada pengguna yang berwenang jika fitur tersebut telah dikonfigurasi dan divalidasi oleh backend.

**Penting:** Pemberian role admin harus disertai validasi identitas dan hak akses pada endpoint backend. Konfigurasi autentikasi dan role harus sesuai dengan layanan yang benar-benar aktif pada situs.

---

## Struktur Proyek

```text
abhisara/
├── index.html
├── logo-ferc.png
├── netlify.toml
├── package.json
├── README.md
└── netlify/
    └── functions/
        └── sessions.mjs
```

| File atau Folder | Fungsi |
|---|---|
| `index.html` | Aplikasi utama, termasuk HTML, CSS, dan JavaScript frontend |
| `logo-ferc.png` | Logo FERC |
| `netlify.toml` | Konfigurasi build dan deployment Netlify |
| `package.json` | Metadata proyek dan dependensi yang diperlukan |
| `netlify/functions/sessions.mjs` | Backend serverless untuk menangani operasi riwayat sesi |
| `README.md` | Dokumentasi proyek |

---

## Teknologi

| Teknologi | Kegunaan |
|---|---|
| HTML5 | Struktur aplikasi |
| CSS3 | Tampilan dan responsivitas |
| JavaScript (Vanilla) | Logika timer, penilaian, dan interaksi |
| Local Storage | Penyimpanan lokal dan cache browser |
| SVG | Visualisasi grafik waktu lap |
| Netlify Identity | Autentikasi pengguna, jika aktif pada deployment |
| Netlify Functions | Backend serverless untuk pengelolaan riwayat |
| Netlify Blobs | Penyimpanan riwayat sesi bersama |
| Netlify | Hosting dan deployment aplikasi |
| html2canvas | Pembuatan tangkapan layar, jika digunakan |

---

## Deployment

Proyek menggunakan Netlify untuk hosting frontend dan menjalankan backend serverless.

Langkah deployment:

1. Simpan seluruh file sesuai struktur proyek.
2. Pastikan `package.json` mencantumkan dependensi yang diperlukan, termasuk `@netlify/blobs`.
3. Pastikan `netlify.toml` memiliki konfigurasi yang sesuai.
4. Push perubahan ke repository GitHub.
5. Hubungkan repository tersebut dengan situs Netlify.
6. Jalankan deployment melalui integrasi Git agar Netlify dapat membangun frontend dan fungsi backend.
7. Uji autentikasi, penyimpanan sesi, sinkronisasi lintas akun, dan hak akses setelah deployment.

**Catatan:** Deployment menggunakan drag-and-drop folder statis tidak menjalankan proses build fungsi serverless seperti deployment yang terhubung dengan repository.

---

## Kompatibilitas

Aplikasi ditujukan untuk browser modern yang mendukung `localStorage`, `requestAnimationFrame`, dan fitur JavaScript yang digunakan aplikasi.

| Browser | Target Dukungan |
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
