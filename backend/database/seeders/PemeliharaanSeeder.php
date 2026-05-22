<?php

namespace Database\Seeders;

use App\Models\Pemeliharaan;
use Illuminate\Database\Seeder;

class PemeliharaanSeeder extends Seeder
{
    public function run(): void
    {
        $pemeliharaan = [
            ['id_aset' => 2, 'id_user' => 2, 'jenis' => 'pemeliharaan_rutin', 'deskripsi' => 'Service AC rutin per 3 bulan, cuci filter dan cek freon', 'tanggal_lapor' => '2026-05-01', 'tanggal_selesai' => '2026-05-03', 'biaya' => 600000, 'status' => 'selesai', 'catatan_teknisi' => 'Semua AC berfungsi normal'],
            ['id_aset' => 13, 'id_user' => 3, 'jenis' => 'laporan_kerusakan', 'deskripsi' => 'Kipas angin mati total, motor tidak berputar', 'tanggal_lapor' => '2026-05-10', 'tanggal_selesai' => null, 'biaya' => 0, 'status' => 'dilaporkan', 'catatan_teknisi' => null],
            ['id_aset' => 11, 'id_user' => 2, 'jenis' => 'laporan_kerusakan', 'deskripsi' => 'Keran dispenser bocor saat ditekan', 'tanggal_lapor' => '2026-05-08', 'tanggal_selesai' => null, 'biaya' => 150000, 'status' => 'dalam_proses', 'catatan_teknisi' => 'Sudah dipesan sparepart kerannya'],
            ['id_aset' => 7, 'id_user' => 3, 'jenis' => 'laporan_kerusakan', 'deskripsi' => '5 kursi plastik kaki patah dan tidak bisa dipakai', 'tanggal_lapor' => '2026-04-25', 'tanggal_selesai' => null, 'biaya' => 0, 'status' => 'dilaporkan', 'catatan_teknisi' => null],
            ['id_aset' => 1, 'id_user' => 2, 'jenis' => 'pemeliharaan_rutin', 'deskripsi' => 'Cek kabel dan setting sound system, pembersihan speaker', 'tanggal_lapor' => '2026-04-15', 'tanggal_selesai' => '2026-04-15', 'biaya' => 300000, 'status' => 'selesai', 'catatan_teknisi' => 'Semua speaker dan mic berfungsi baik'],
            ['id_aset' => 9, 'id_user' => 2, 'jenis' => 'pemeliharaan_rutin', 'deskripsi' => 'Cek recording CCTV dan bersihkan lensa kamera', 'tanggal_lapor' => '2026-05-15', 'tanggal_selesai' => null, 'biaya' => 0, 'status' => 'dalam_proses', 'catatan_teknisi' => 'Proses pengecekan 8 titik kamera'],
            ['id_aset' => 8, 'id_user' => 2, 'jenis' => 'pemeliharaan_rutin', 'deskripsi' => 'Test run genset bulanan dan cek oli', 'tanggal_lapor' => '2026-05-01', 'tanggal_selesai' => '2026-05-01', 'biaya' => 200000, 'status' => 'selesai', 'catatan_teknisi' => 'Genset berfungsi normal, oli masih cukup'],
        ];

        foreach ($pemeliharaan as $p) {
            Pemeliharaan::create($p);
        }
    }
}
