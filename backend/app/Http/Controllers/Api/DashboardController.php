<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Aset;
use App\Models\Kegiatan;
use App\Models\Keuangan;
use App\Models\Peminjaman;
use App\Models\User;
use Illuminate\Http\Request;

class DashboardController extends Controller
{
    /**
     * Get dashboard summary statistics.
     */
    public function index(Request $request)
    {
        $currentMonth = now()->month;
        $currentYear  = now()->year;

        // Keuangan Summary
        $pemasukan = Keuangan::where('jenis', 'pemasukan')
            ->whereMonth('tanggal', $currentMonth)
            ->whereYear('tanggal', $currentYear)
            ->sum('jumlah');

        $pengeluaran = Keuangan::where('jenis', 'pengeluaran')
            ->whereMonth('tanggal', $currentMonth)
            ->whereYear('tanggal', $currentYear)
            ->sum('jumlah');

        $saldoBulanIni = $pemasukan - $pengeluaran;

        $totalSaldo = Keuangan::where('jenis', 'pemasukan')->sum('jumlah') - 
                      Keuangan::where('jenis', 'pengeluaran')->sum('jumlah');

        // Kegiatan
        $kegiatanMendatang = Kegiatan::mendatang()->count();

        // Peminjaman
        $peminjamanMenunggu = Peminjaman::menunggu()->count();

        // Aset
        $totalAset = Aset::count();

        return response()->json([
            'data' => [
                'keuangan' => [
                    'pemasukan_bulan_ini'   => (float) $pemasukan,
                    'pengeluaran_bulan_ini' => (float) $pengeluaran,
                    'saldo_bulan_ini'       => (float) $saldoBulanIni,
                    'total_saldo'           => (float) $totalSaldo,
                ],
                'kegiatan_mendatang'  => $kegiatanMendatang,
                'peminjaman_menunggu' => $peminjamanMenunggu,
                'total_aset'          => $totalAset,
            ]
        ]);
    }

    /**
     * Get public landing page summary statistics.
     */
    public function publicStats()
    {
        $totalAset = Aset::count();
        $kegiatanAktif = Kegiatan::whereIn('status', ['akan_datang', 'berlangsung'])->count();
        $jamaahTerdaftar = User::count();
        
        $totalPemasukan = Keuangan::where('jenis', 'pemasukan')->sum('jumlah');
        $totalPengeluaran = Keuangan::where('jenis', 'pengeluaran')->sum('jumlah');
        $saldo = $totalPemasukan - $totalPengeluaran;

        return response()->json([
            'status' => 'success',
            'data' => [
                'total_aset' => $totalAset,
                'kegiatan_aktif' => $kegiatanAktif,
                'jamaah_terdaftar' => $jamaahTerdaftar,
                'saldo' => (float) $saldo,
                'formatted_saldo' => 'Rp ' . number_format($saldo, 0, ',', '.'),
            ]
        ]);
    }
}
