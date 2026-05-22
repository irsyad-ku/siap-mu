# 🕋 SIAP-MU (Sistem Informasi Administrasi Masjid)

[![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)](https://react.dev/)
[![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)](https://laravel.com/)
[![MySQL](https://img.shields.io/badge/MySQL-00758F?style=for-the-badge&logo=mysql&logoColor=white)](https://www.mysql.com/)
[![Vercel](https://img.shields.io/badge/Vercel-000000?style=for-the-badge&logo=vercel&logoColor=white)](https://vercel.com/)
[![Railway](https://img.shields.io/badge/Railway-131415?style=for-the-badge&logo=railway&logoColor=white)](https://railway.app/)

**SIAP-MU** adalah platform sistem informasi administrasi masjid modern yang dibangun dengan arsitektur terpisah (*decoupled architecture*). Aplikasi ini dirancang untuk memudahkan manajemen operasional masjid secara digital, transparan, dan real-time bagi pengurus (takmir) serta warga (jamaah).

*   **Live Demo (Frontend Vercel):** [siap-mu.vercel.app](https://siap-mu.vercel.app)
*   **Production API (Backend Railway):** [siap-mu-production.up.railway.app](https://siap-mu-production.up.railway.app)

---

## 🌟 Fitur Utama

1.  **Dashboard & Landing Page Publik (Statistik Real-time):**
    *   Menampilkan ringkasan statistik terkini (Jumlah Aset, Kegiatan Aktif, Jamaah Terdaftar, dan Total Kas Masjid) secara dinamis dari database tanpa harus login.
    *   Publikasi pengumuman masjid terbaru secara real-time.
2.  **Sistem Autentikasi Keamanan:**
    *   Registrasi mandiri warga/jamaah dengan enkripsi password (Bcrypt).
    *   Proteksi sesi login multi-role menggunakan token API **Laravel Sanctum**.
3.  **Manajemen Kas & Keuangan Masjid:**
    *   Pencatatan transparan transaksi pemasukan (infaq, sedekah) dan pengeluaran operasional.
    *   Dukungan unggah bukti transaksi serta grafik analisis kas bulanan.
4.  **Aset & Pemeliharaan Inventaris:**
    *   Pendataan aset masjid lengkap dengan kondisi fisik, nilai ekonomis, dan kuantitas.
    *   Sistem pelaporan kerusakan aset oleh warga terintegrasi dengan persetujuan takmir serta pencatatan otomatis biaya perbaikan ke laporan keuangan.
5.  **Peminjaman Fasilitas Masjid:**
    *   Pengajuan peminjaman aula/ruang kelas oleh warga untuk kegiatan keagamaan.
    *   Fitur deteksi tabrakan jadwal (*double-booking protection*) dan persetujuan pengurus.
6.  **Manajemen Pengguna (Multi-Role):**
    *   Pembatasan hak akses berbasis peran: **Admin**, **Pengurus (Takmir)**, dan **Warga (Jamaah)**.

---

## 💻 Tech Stack & Arsitektur

Aplikasi ini menggunakan pendekatan arsitektur modern terpisah untuk performa, portabilitas, dan skalabilitas maksimal:

*   **Frontend (React JS):**
    *   UI dinamis dan interaktif berbasis komponen modular.
    *   CSS modern dengan micro-animations dan tata letak responsif (*mobile-friendly*).
    *   Build tool menggunakan **Vite** untuk kompilasi super cepat.
*   **Backend (Laravel RESTful API):**
    *   REST API bersih dengan arsitektur MVC.
    *   Autentikasi token aman berbasis **Laravel Sanctum**.
    *   Sistem migrasi database modular dan proteksi integritas data (*Foreign Keys & Cascades*).
*   **Database:** MySQL (Relasional).

---

## 📂 Struktur Repositori

```text
siap-mu/
├── frontend/       # Aplikasi React JS (Dideploy di Vercel)
└── backend/        # RESTful API Laravel 11 (Dideploy di Railway)
```

---

## 🚀 Panduan Instalasi Lokal

### 1. Prasyarat Sistem
*   PHP >= 8.2 (dengan ekstensi pdo_mysql, bcmath, dll.)
*   Composer
*   Node.js & npm
*   MySQL Server

---

### 2. Setup Backend (Laravel API)
1.  Masuk ke direktori backend:
    ```bash
    cd backend
    ```
2.  Instal seluruh dependensi PHP:
    ```bash
    composer install
    ```
3.  Salin file konfigurasi lingkungan:
    ```bash
    cp .env.example .env
    ```
4.  Konfigurasikan database MySQL Anda pada file `.env`:
    ```env
    DB_CONNECTION=mysql
    DB_HOST=127.0.0.1
    DB_PORT=3306
    DB_DATABASE=siap_mu_db
    DB_USERNAME=root
    DB_PASSWORD=
    ```
5.  Generate kunci enkripsi aplikasi:
    ```bash
    php artisan key:generate
    ```
6.  Jalankan migrasi database beserta data awal (seeders):
    ```bash
    php artisan migrate:fresh --seed
    ```
7.  Jalankan server pengembangan lokal backend:
    ```bash
    php artisan serve
    ```
    *(Backend sekarang dapat diakses di `http://127.0.0.1:8000`)*

---

### 3. Setup Frontend (React JS)
1.  Buka terminal baru dan masuk ke direktori frontend:
    ```bash
    cd frontend
    ```
2.  Instal seluruh paket Node.js:
    ```bash
    npm install
    ```
3.  Buat file `.env` di root folder frontend:
    ```env
    VITE_API_URL=http://127.0.0.1:8000/api
    ```
4.  Jalankan aplikasi frontend lokal:
    ```bash
    npm run dev
    ```
    *(Frontend sekarang berjalan di `http://localhost:5173` atau `http://localhost:3000`)*

---

## ☁️ Deployment Produksi

*   **Frontend (Vercel):** Otomatis melakukan *Continuous Integration* (CI) setiap kali ada push ke branch `main`, dengan memanggil API endpoint yang mengarah ke Railway.
*   **Backend (Railway):** Terintegrasi otomatis menggunakan Nixpacks untuk kompilasi gambar Docker dari folder `/backend`. Pre-deploy command menjalankan `php artisan migrate --force` untuk memperbarui database MySQL Railway secara aman.

---

## 📄 Lisensi
Proyek ini dilisensikan di bawah Lisensi MIT - Lihat file [LICENSE](LICENSE) untuk detailnya.
