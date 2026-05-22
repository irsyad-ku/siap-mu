<?php

namespace Database\Seeders;

use App\Models\Aset;
use Illuminate\Database\Seeder;

class AsetSeeder extends Seeder
{
    public function run(): void
    {
        $aset = [
            ['nama_aset' => 'Sound System TOA', 'kategori' => 'Elektronik', 'kondisi' => 'baik', 'tahun_perolehan' => 2022, 'nilai_aset' => 15000000, 'jumlah' => 1, 'satuan' => 'set', 'lokasi_aset' => 'Ruang Sound', 'keterangan' => 'Sound system utama masjid', 'id_user' => 1],
            ['nama_aset' => 'AC Split 2 PK', 'kategori' => 'Elektronik', 'kondisi' => 'baik', 'tahun_perolehan' => 2023, 'nilai_aset' => 7500000, 'jumlah' => 4, 'satuan' => 'unit', 'lokasi_aset' => 'Ruang Utama Masjid', 'keterangan' => 'AC untuk ruang shalat utama', 'id_user' => 1],
            ['nama_aset' => 'Karpet Sajadah', 'kategori' => 'Inventaris', 'kondisi' => 'baik', 'tahun_perolehan' => 2023, 'nilai_aset' => 25000000, 'jumlah' => 20, 'satuan' => 'roll', 'lokasi_aset' => 'Ruang Utama Masjid', 'keterangan' => 'Karpet sajadah premium tebal', 'id_user' => 1],
            ['nama_aset' => 'Mimbar Kayu Jati', 'kategori' => 'Furnitur', 'kondisi' => 'baik', 'tahun_perolehan' => 2020, 'nilai_aset' => 12000000, 'jumlah' => 1, 'satuan' => 'unit', 'lokasi_aset' => 'Ruang Utama Masjid', 'keterangan' => 'Mimbar khotbah kayu jati ukir', 'id_user' => 1],
            ['nama_aset' => 'Proyektor Epson', 'kategori' => 'Elektronik', 'kondisi' => 'baik', 'tahun_perolehan' => 2024, 'nilai_aset' => 8500000, 'jumlah' => 1, 'satuan' => 'unit', 'lokasi_aset' => 'Aula', 'keterangan' => 'Proyektor untuk kajian dan presentasi', 'id_user' => 2],
            ['nama_aset' => 'Meja Lipat', 'kategori' => 'Furnitur', 'kondisi' => 'baik', 'tahun_perolehan' => 2022, 'nilai_aset' => 500000, 'jumlah' => 20, 'satuan' => 'unit', 'lokasi_aset' => 'Gudang', 'keterangan' => 'Meja lipat untuk acara', 'id_user' => 2],
            ['nama_aset' => 'Kursi Plastik', 'kategori' => 'Furnitur', 'kondisi' => 'perlu_perawatan', 'tahun_perolehan' => 2021, 'nilai_aset' => 150000, 'jumlah' => 50, 'satuan' => 'unit', 'lokasi_aset' => 'Gudang', 'keterangan' => 'Beberapa kursi perlu diperbaiki', 'id_user' => 2],
            ['nama_aset' => 'Genset Portable', 'kategori' => 'Elektronik', 'kondisi' => 'baik', 'tahun_perolehan' => 2023, 'nilai_aset' => 18000000, 'jumlah' => 1, 'satuan' => 'unit', 'lokasi_aset' => 'Ruang Genset', 'keterangan' => 'Genset cadangan listrik 5000 watt', 'id_user' => 1],
            ['nama_aset' => 'CCTV Hikvision', 'kategori' => 'Elektronik', 'kondisi' => 'baik', 'tahun_perolehan' => 2024, 'nilai_aset' => 12000000, 'jumlah' => 8, 'satuan' => 'unit', 'lokasi_aset' => 'Seluruh Area', 'keterangan' => 'Kamera CCTV 8 titik', 'id_user' => 1],
            ['nama_aset' => 'Rak Sepatu Aluminium', 'kategori' => 'Furnitur', 'kondisi' => 'baik', 'tahun_perolehan' => 2022, 'nilai_aset' => 3000000, 'jumlah' => 4, 'satuan' => 'unit', 'lokasi_aset' => 'Teras Masjid', 'keterangan' => 'Rak sepatu jamaah', 'id_user' => 2],
            ['nama_aset' => 'Dispenser Air Galon', 'kategori' => 'Elektronik', 'kondisi' => 'perlu_perawatan', 'tahun_perolehan' => 2021, 'nilai_aset' => 1500000, 'jumlah' => 3, 'satuan' => 'unit', 'lokasi_aset' => 'Teras Masjid', 'keterangan' => 'Satu unit perlu ganti keran', 'id_user' => 2],
            ['nama_aset' => 'Lemari Arsip', 'kategori' => 'Furnitur', 'kondisi' => 'baik', 'tahun_perolehan' => 2020, 'nilai_aset' => 3500000, 'jumlah' => 2, 'satuan' => 'unit', 'lokasi_aset' => 'Kantor DKM', 'keterangan' => 'Lemari besi penyimpanan arsip', 'id_user' => 1],
            ['nama_aset' => 'Kipas Angin Berdiri', 'kategori' => 'Elektronik', 'kondisi' => 'rusak', 'tahun_perolehan' => 2019, 'nilai_aset' => 750000, 'jumlah' => 2, 'satuan' => 'unit', 'lokasi_aset' => 'Gudang', 'keterangan' => 'Motor kipas rusak, perlu diganti', 'id_user' => 2],
            ['nama_aset' => 'Tandon Air 2000L', 'kategori' => 'Bangunan', 'kondisi' => 'baik', 'tahun_perolehan' => 2023, 'nilai_aset' => 5000000, 'jumlah' => 2, 'satuan' => 'unit', 'lokasi_aset' => 'Atap Masjid', 'keterangan' => 'Tandon air wudhu dan toilet', 'id_user' => 1],
            ['nama_aset' => 'Al-Quran dan Iqro', 'kategori' => 'Inventaris', 'kondisi' => 'baik', 'tahun_perolehan' => 2024, 'nilai_aset' => 100000, 'jumlah' => 100, 'satuan' => 'eksemplar', 'lokasi_aset' => 'Rak Al-Quran', 'keterangan' => 'Al-Quran besar dan Iqro untuk TPA', 'id_user' => 1],
        ];

        foreach ($aset as $a) {
            Aset::create($a);
        }
    }
}
