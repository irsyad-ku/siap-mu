<?php

namespace Database\Seeders;

use App\Models\Fasilitas;
use Illuminate\Database\Seeder;

class FasilitasSeeder extends Seeder
{
    public function run(): void
    {
        $fasilitas = [
            ['nama_fasilitas' => 'Aula Utama', 'deskripsi' => 'Aula serbaguna lantai 2 untuk kajian dan acara besar', 'kapasitas' => 200, 'status' => 'tersedia', 'id_user' => 1],
            ['nama_fasilitas' => 'Ruang Kelas 1', 'deskripsi' => 'Ruang kelas untuk TPA dan tahsin', 'kapasitas' => 30, 'status' => 'tersedia', 'id_user' => 1],
            ['nama_fasilitas' => 'Ruang Kelas 2', 'deskripsi' => 'Ruang kelas tambahan untuk kegiatan belajar', 'kapasitas' => 25, 'status' => 'tersedia', 'id_user' => 1],
            ['nama_fasilitas' => 'Ruang Rapat', 'deskripsi' => 'Ruang rapat pengurus dengan AC dan proyektor', 'kapasitas' => 15, 'status' => 'tersedia', 'id_user' => 1],
            ['nama_fasilitas' => 'Halaman Masjid', 'deskripsi' => 'Area terbuka untuk kegiatan outdoor dan parkir', 'kapasitas' => 500, 'status' => 'tersedia', 'id_user' => 1],
            ['nama_fasilitas' => 'Dapur Umum', 'deskripsi' => 'Dapur untuk menyiapkan konsumsi acara masjid', 'kapasitas' => 10, 'status' => 'tersedia', 'id_user' => 2],
            ['nama_fasilitas' => 'Kantor DKM', 'deskripsi' => 'Kantor sekretariat pengurus DKM', 'kapasitas' => 8, 'status' => 'tersedia', 'id_user' => 1],
            ['nama_fasilitas' => 'Gudang Peralatan', 'deskripsi' => 'Gudang penyimpanan peralatan dan inventaris', 'kapasitas' => null, 'status' => 'tersedia', 'id_user' => 2],
        ];

        foreach ($fasilitas as $f) {
            Fasilitas::create($f);
        }
    }
}
