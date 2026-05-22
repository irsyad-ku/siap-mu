<?php

namespace Database\Seeders;

use App\Models\Kegiatan;
use Illuminate\Database\Seeder;

class KegiatanSeeder extends Seeder
{
    public function run(): void
    {
        $kegiatan = [
            ['nama_kegiatan' => 'Shalat Jumat Berjamaah', 'deskripsi' => 'Shalat Jumat rutin setiap minggu', 'tanggal' => '2025-05-23', 'waktu_mulai' => '11:30', 'waktu_selesai' => '12:30', 'lokasi' => 'Masjid Al-Ikhlas', 'status' => 'akan_datang', 'is_publik' => true, 'id_user' => 1],
            ['nama_kegiatan' => 'Kajian Akbar Bulanan', 'deskripsi' => 'Kajian Islam bulanan bersama Ustadz Abdullah', 'tanggal' => '2025-05-25', 'waktu_mulai' => '08:00', 'waktu_selesai' => '11:00', 'lokasi' => 'Aula Masjid', 'status' => 'akan_datang', 'is_publik' => true, 'id_user' => 2],
            ['nama_kegiatan' => 'Tahsin Al-Quran', 'deskripsi' => 'Kelas tahsin untuk dewasa setiap Selasa & Kamis', 'tanggal' => '2025-05-27', 'waktu_mulai' => '18:30', 'waktu_selesai' => '20:00', 'lokasi' => 'Ruang Kelas 1', 'status' => 'akan_datang', 'is_publik' => true, 'id_user' => 3],
            ['nama_kegiatan' => 'TPA Anak-anak', 'deskripsi' => 'Taman Pendidikan Al-Quran untuk anak usia 5-12 tahun', 'tanggal' => '2025-05-26', 'waktu_mulai' => '15:30', 'waktu_selesai' => '17:00', 'lokasi' => 'Ruang Kelas 2', 'status' => 'akan_datang', 'is_publik' => true, 'id_user' => 3],
            ['nama_kegiatan' => 'Rapat Pengurus DKM', 'deskripsi' => 'Rapat koordinasi bulanan pengurus DKM', 'tanggal' => '2025-05-28', 'waktu_mulai' => '19:30', 'waktu_selesai' => '21:00', 'lokasi' => 'Ruang Rapat', 'status' => 'akan_datang', 'is_publik' => false, 'id_user' => 1],
            ['nama_kegiatan' => 'Bakti Sosial', 'deskripsi' => 'Pembagian sembako untuk warga kurang mampu', 'tanggal' => '2025-06-01', 'waktu_mulai' => '07:00', 'waktu_selesai' => '12:00', 'lokasi' => 'Halaman Masjid', 'status' => 'akan_datang', 'is_publik' => true, 'id_user' => 2],
            ['nama_kegiatan' => 'Isra Miraj 1446 H', 'deskripsi' => 'Peringatan Isra Miraj Nabi Muhammad SAW', 'tanggal' => '2025-01-27', 'waktu_mulai' => '19:00', 'waktu_selesai' => '21:30', 'lokasi' => 'Masjid Al-Ikhlas', 'status' => 'selesai', 'is_publik' => true, 'id_user' => 1],
            ['nama_kegiatan' => 'Buka Puasa Bersama', 'deskripsi' => 'Buka puasa bersama warga sekitar masjid', 'tanggal' => '2025-03-20', 'waktu_mulai' => '17:00', 'waktu_selesai' => '19:30', 'lokasi' => 'Halaman Masjid', 'status' => 'selesai', 'is_publik' => true, 'id_user' => 2],
            ['nama_kegiatan' => 'Shalat Tarawih Berjamaah', 'deskripsi' => 'Shalat Tarawih selama bulan Ramadhan', 'tanggal' => '2025-03-01', 'waktu_mulai' => '19:30', 'waktu_selesai' => '21:00', 'lokasi' => 'Masjid Al-Ikhlas', 'status' => 'selesai', 'is_publik' => true, 'id_user' => 1],
            ['nama_kegiatan' => 'Lomba Ramadhan Anak', 'deskripsi' => 'Lomba hafalan surat pendek, adzan, dan mewarnai untuk anak-anak', 'tanggal' => '2025-03-22', 'waktu_mulai' => '08:00', 'waktu_selesai' => '12:00', 'lokasi' => 'Aula Masjid', 'status' => 'selesai', 'is_publik' => true, 'id_user' => 3],
        ];

        foreach ($kegiatan as $k) {
            Kegiatan::create($k);
        }
    }
}
