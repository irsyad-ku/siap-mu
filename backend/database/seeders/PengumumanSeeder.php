<?php

namespace Database\Seeders;

use App\Models\Pengumuman;
use Illuminate\Database\Seeder;

class PengumumanSeeder extends Seeder
{
    public function run(): void
    {
        $pengumuman = [
            ['judul' => 'Jadwal Imam dan Khatib Bulan Juni 2026', 'isi' => 'Berikut jadwal imam dan khatib shalat Jumat untuk bulan Juni 2026. Mohon para imam dan khatib mempersiapkan diri. Jadwal lengkap dapat dilihat di papan pengumuman masjid.', 'tanggal' => '2026-05-20', 'is_aktif' => true, 'id_user' => 1],
            ['judul' => 'Pendaftaran TPA Tahun Ajaran Baru', 'isi' => 'Dibuka pendaftaran peserta TPA tahun ajaran baru 2026/2027 untuk anak usia 5-12 tahun. Pendaftaran dibuka mulai 1 Juni - 30 Juni 2026 di kantor DKM. Biaya pendaftaran Rp 50.000. Kuota terbatas 40 anak.', 'tanggal' => '2026-05-18', 'is_aktif' => true, 'id_user' => 1],
            ['judul' => 'Pemberitahuan Renovasi Toilet Wudhu', 'isi' => 'Diberitahukan kepada jamaah bahwa toilet dan tempat wudhu sisi barat akan direnovasi mulai tanggal 1-15 Juni 2026. Selama renovasi, jamaah dapat menggunakan toilet dan tempat wudhu sisi timur. Mohon maaf atas ketidaknyamanannya.', 'tanggal' => '2026-05-15', 'is_aktif' => true, 'id_user' => 2],
            ['judul' => 'Laporan Keuangan Bulan April 2026', 'isi' => 'Laporan keuangan masjid bulan April 2026 sudah tersedia. Total pemasukan Rp 43.800.000 dan total pengeluaran Rp 11.150.000. Laporan lengkap dapat dilihat di papan pengumuman atau meminta salinan di kantor DKM.', 'tanggal' => '2026-05-01', 'is_aktif' => true, 'id_user' => 1],
        ];

        foreach ($pengumuman as $p) {
            Pengumuman::create($p);
        }
    }
}
