<?php

namespace Database\Seeders;

use App\Models\Peminjaman;
use Illuminate\Database\Seeder;

class PeminjamanSeeder extends Seeder
{
    public function run(): void
    {
        $peminjaman = [
            ['id_user' => 4, 'id_fasilitas' => 1, 'tanggal_pinjam' => '2025-05-25', 'tanggal_kembali' => '2025-05-25', 'waktu_mulai' => '08:00', 'waktu_selesai' => '12:00', 'keperluan' => 'Acara syukuran keluarga', 'jumlah_peserta' => 100, 'status' => 'disetujui', 'catatan_pengurus' => 'Harap menjaga kebersihan', 'diproses_oleh' => 2, 'tanggal_proses' => '2025-05-20 10:00:00'],
            ['id_user' => 5, 'id_fasilitas' => 2, 'tanggal_pinjam' => '2025-05-26', 'tanggal_kembali' => '2025-05-26', 'waktu_mulai' => '13:00', 'waktu_selesai' => '15:00', 'keperluan' => 'Les privat mengaji anak', 'jumlah_peserta' => 15, 'status' => 'disetujui', 'catatan_pengurus' => 'Disetujui', 'diproses_oleh' => 2, 'tanggal_proses' => '2025-05-21 09:00:00'],
            ['id_user' => 6, 'id_fasilitas' => 1, 'tanggal_pinjam' => '2025-06-01', 'tanggal_kembali' => '2025-06-01', 'waktu_mulai' => '14:00', 'waktu_selesai' => '17:00', 'keperluan' => 'Seminar kesehatan warga', 'jumlah_peserta' => 80, 'status' => 'menunggu', 'catatan_pengurus' => null, 'diproses_oleh' => null, 'tanggal_proses' => null],
            ['id_user' => 4, 'id_fasilitas' => 4, 'tanggal_pinjam' => '2025-05-28', 'tanggal_kembali' => '2025-05-28', 'waktu_mulai' => '10:00', 'waktu_selesai' => '12:00', 'keperluan' => 'Rapat RT 05', 'jumlah_peserta' => 12, 'status' => 'menunggu', 'catatan_pengurus' => null, 'diproses_oleh' => null, 'tanggal_proses' => null],
            ['id_user' => 5, 'id_fasilitas' => 5, 'tanggal_pinjam' => '2025-06-05', 'tanggal_kembali' => '2025-06-05', 'waktu_mulai' => '06:00', 'waktu_selesai' => '11:00', 'keperluan' => 'Senam pagi dan jalan sehat warga', 'jumlah_peserta' => 200, 'status' => 'menunggu', 'catatan_pengurus' => null, 'diproses_oleh' => null, 'tanggal_proses' => null],
            ['id_user' => 6, 'id_fasilitas' => 3, 'tanggal_pinjam' => '2025-04-20', 'tanggal_kembali' => '2025-04-20', 'waktu_mulai' => '09:00', 'waktu_selesai' => '11:00', 'keperluan' => 'Kelas parenting islami', 'jumlah_peserta' => 20, 'status' => 'selesai', 'catatan_pengurus' => 'Selesai dengan baik', 'diproses_oleh' => 3, 'tanggal_proses' => '2025-04-18 14:00:00'],
            ['id_user' => 4, 'id_fasilitas' => 6, 'tanggal_pinjam' => '2025-04-10', 'tanggal_kembali' => '2025-04-10', 'waktu_mulai' => '08:00', 'waktu_selesai' => '14:00', 'keperluan' => 'Masak untuk acara maulid', 'jumlah_peserta' => 8, 'status' => 'selesai', 'catatan_pengurus' => 'Dapur sudah dibersihkan', 'diproses_oleh' => 2, 'tanggal_proses' => '2025-04-08 08:00:00'],
        ];

        foreach ($peminjaman as $p) {
            Peminjaman::create($p);
        }
    }
}
