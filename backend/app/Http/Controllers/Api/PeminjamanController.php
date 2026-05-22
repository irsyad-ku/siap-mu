<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PeminjamanRequest;
use App\Http\Resources\PeminjamanResource;
use App\Models\Fasilitas;
use App\Models\Peminjaman;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;

class PeminjamanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Peminjaman::with(['user', 'fasilitas', 'diprosesoleh']);

        // Warga only sees their own requests
        if ($request->user()->role === 'warga') {
            $query->where('id_user', $request->user()->id_user);
        }

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $peminjaman = $query->latest()->paginate(15);

        return PeminjamanResource::collection($peminjaman);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PeminjamanRequest $request)
    {
        $data = $request->validated();
        
        $fasilitas = Fasilitas::findOrFail($data['id_fasilitas']);

        // Check availability
        if (!$fasilitas->isAvailable($data['tanggal_pinjam'], $data['waktu_mulai'], $data['waktu_selesai'])) {
            throw ValidationException::withMessages([
                'waktu_mulai' => ['Fasilitas tidak tersedia pada waktu tersebut.'],
            ]);
        }

        $data['id_user'] = $request->user()->id_user;
        $data['status'] = 'menunggu';

        $peminjaman = Peminjaman::create($data);

        return response()->json([
            'message' => 'Pengajuan peminjaman berhasil dibuat',
            'data'    => new PeminjamanResource($peminjaman->load(['user', 'fasilitas'])),
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Request $request, Peminjaman $peminjaman)
    {
        // Check authorization
        if ($request->user()->role === 'warga' && $peminjaman->id_user !== $request->user()->id_user) {
            abort(403, 'Unauthorized action.');
        }

        return response()->json([
            'data' => new PeminjamanResource($peminjaman->load(['user', 'fasilitas', 'diprosesoleh'])),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PeminjamanRequest $request, Peminjaman $peminjaman)
    {
        $data = $request->validated();

        if (in_array($request->user()->role, ['admin', 'pengurus'])) {
            if (isset($data['status']) && $data['status'] !== $peminjaman->status) {
                $data['diproses_oleh']  = $request->user()->id_user;
                $data['tanggal_proses'] = now();
            }
        }

        // Re-check availability if dates changed
        if (
            (isset($data['tanggal_pinjam']) && $data['tanggal_pinjam'] !== $peminjaman->tanggal_pinjam->format('Y-m-d')) ||
            (isset($data['waktu_mulai']) && $data['waktu_mulai'] !== $peminjaman->waktu_mulai) ||
            (isset($data['waktu_selesai']) && $data['waktu_selesai'] !== $peminjaman->waktu_selesai)
        ) {
            $tgl = $data['tanggal_pinjam'] ?? $peminjaman->tanggal_pinjam->format('Y-m-d');
            $mulai = $data['waktu_mulai'] ?? $peminjaman->waktu_mulai;
            $selesai = $data['waktu_selesai'] ?? $peminjaman->waktu_selesai;

            $fasilitas = Fasilitas::findOrFail($peminjaman->id_fasilitas);
            if (!$fasilitas->isAvailable($tgl, $mulai, $selesai, $peminjaman->id_pinjam)) {
                throw ValidationException::withMessages([
                    'waktu_mulai' => ['Fasilitas tidak tersedia pada waktu tersebut.'],
                ]);
            }
        }

        $peminjaman->update($data);

        // Update the status of the associated facility dynamically
        if (isset($data['status'])) {
            $fasilitas = Fasilitas::find($peminjaman->id_fasilitas);
            if ($fasilitas) {
                if ($data['status'] === 'disetujui') {
                    $fasilitas->update(['status' => 'dipinjam']);
                } elseif (in_array($data['status'], ['selesai', 'ditolak', 'menunggu'])) {
                    // Check if there are other active approved loans for this facility
                    $hasOtherActive = Peminjaman::where('id_fasilitas', $peminjaman->id_fasilitas)
                        ->where('id_pinjam', '!=', $peminjaman->id_pinjam)
                        ->where('status', 'disetujui')
                        ->exists();
                    if (!$hasOtherActive) {
                        $fasilitas->update(['status' => 'tersedia']);
                    }
                }
            }
        }

        return response()->json([
            'message' => 'Peminjaman berhasil diupdate',
            'data'    => new PeminjamanResource($peminjaman->load(['user', 'fasilitas', 'diprosesoleh'])),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Peminjaman $peminjaman)
    {
        $idFasilitas = $peminjaman->id_fasilitas;
        $statusPeminjaman = $peminjaman->status;

        $peminjaman->delete();

        if ($statusPeminjaman === 'disetujui') {
            $fasilitas = Fasilitas::find($idFasilitas);
            if ($fasilitas) {
                $hasOtherActive = Peminjaman::where('id_fasilitas', $idFasilitas)
                    ->where('status', 'disetujui')
                    ->exists();
                if (!$hasOtherActive) {
                    $fasilitas->update(['status' => 'tersedia']);
                }
            }
        }

        return response()->json([
            'message' => 'Data peminjaman berhasil dihapus',
        ]);
    }
}
