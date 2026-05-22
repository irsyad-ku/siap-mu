<?php

namespace Database\Seeders;

use App\Models\Keuangan;
use Illuminate\Database\Seeder;

class KeuanganSeeder extends Seeder
{
    public function run(): void
    {
        $transaksi = [
            ['jenis' => 'pemasukan', 'kategori' => 'Infaq Jumat', 'jumlah' => 3500000, 'keterangan' => 'Infaq Shalat Jumat Minggu 1', 'tanggal' => '2025-05-02', 'id_user' => 1],
            ['jenis' => 'pemasukan', 'kategori' => 'Infaq Jumat', 'jumlah' => 4200000, 'keterangan' => 'Infaq Shalat Jumat Minggu 2', 'tanggal' => '2025-05-09', 'id_user' => 1],
            ['jenis' => 'pemasukan', 'kategori' => 'Donasi', 'jumlah' => 10000000, 'keterangan' => 'Donasi H. Ahmad untuk renovasi', 'tanggal' => '2025-05-10', 'id_user' => 2],
            ['jenis' => 'pemasukan', 'kategori' => 'Zakat', 'jumlah' => 15000000, 'keterangan' => 'Pengumpulan zakat fitrah', 'tanggal' => '2025-03-28', 'id_user' => 1],
            ['jenis' => 'pemasukan', 'kategori' => 'Infaq Jumat', 'jumlah' => 3800000, 'keterangan' => 'Infaq Shalat Jumat Minggu 3', 'tanggal' => '2025-05-16', 'id_user' => 1],
            ['jenis' => 'pemasukan', 'kategori' => 'Donasi', 'jumlah' => 5000000, 'keterangan' => 'Donasi keluarga Bpk. Hasan', 'tanggal' => '2025-04-15', 'id_user' => 2],
            ['jenis' => 'pemasukan', 'kategori' => 'Kotak Amal', 'jumlah' => 2300000, 'keterangan' => 'Kotak amal bulanan April', 'tanggal' => '2025-04-30', 'id_user' => 1],
            ['jenis' => 'pengeluaran', 'kategori' => 'Listrik & Air', 'jumlah' => 1500000, 'keterangan' => 'Pembayaran listrik bulan Mei', 'tanggal' => '2025-05-05', 'id_user' => 1],
            ['jenis' => 'pengeluaran', 'kategori' => 'Kebersihan', 'jumlah' => 800000, 'keterangan' => 'Gaji petugas kebersihan Mei', 'tanggal' => '2025-05-01', 'id_user' => 2],
            ['jenis' => 'pengeluaran', 'kategori' => 'Perbaikan', 'jumlah' => 3500000, 'keterangan' => 'Perbaikan atap bocor sisi timur', 'tanggal' => '2025-04-20', 'id_user' => 1],
            ['jenis' => 'pengeluaran', 'kategori' => 'Kegiatan', 'jumlah' => 2000000, 'keterangan' => 'Konsumsi buka puasa bersama', 'tanggal' => '2025-03-25', 'id_user' => 2],
            ['jenis' => 'pengeluaran', 'kategori' => 'ATK', 'jumlah' => 350000, 'keterangan' => 'Pembelian alat tulis kantor', 'tanggal' => '2025-05-12', 'id_user' => 1],
            ['jenis' => 'pengeluaran', 'kategori' => 'Honor Ustadz', 'jumlah' => 2500000, 'keterangan' => 'Honor penceramah bulan Mei', 'tanggal' => '2025-05-15', 'id_user' => 2],
            ['jenis' => 'pengeluaran', 'kategori' => 'Internet', 'jumlah' => 500000, 'keterangan' => 'Pembayaran wifi bulan Mei', 'tanggal' => '2025-05-03', 'id_user' => 1],
        ];

        foreach ($transaksi as $t) {
            Keuangan::create($t);
        }
    }
}
