<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PemeliharaanRequest;
use App\Http\Resources\PemeliharaanResource;
use App\Models\Pemeliharaan;
use App\Models\Keuangan;
use Illuminate\Http\Request;

class PemeliharaanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Pemeliharaan::with(['aset', 'user']);

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        if ($request->has('jenis')) {
            $query->where('jenis', $request->jenis);
        }

        $pemeliharaan = $query->latest()->paginate(15);

        return PemeliharaanResource::collection($pemeliharaan);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PemeliharaanRequest $request)
    {
        $data = $request->validated();
        $data['id_user'] = $request->user()->id_user;
        $data['tanggal_lapor'] = now()->toDateString();
        $data['status'] = $data['status'] ?? 'dilaporkan';

        if ($request->hasFile('foto_kerusakan')) {
            $data['foto_kerusakan'] = $request->file('foto_kerusakan')->store('pemeliharaan', 'public');
        }

        $pemeliharaan = Pemeliharaan::create($data);

        // Update asset condition if needed
        if ($data['jenis'] === 'laporan_kerusakan') {
            $pemeliharaan->aset->update(['kondisi' => 'perlu_perawatan']);
        }

        // If completed at creation time with a positive cost, record it in finance
        if (isset($data['status']) && $data['status'] === 'selesai' && isset($data['biaya']) && $data['biaya'] > 0) {
            $pemeliharaan->load('aset');
            Keuangan::create([
                'jenis' => 'pengeluaran',
                'kategori' => 'Operasional',
                'jumlah' => $pemeliharaan->biaya,
                'keterangan' => "Biaya Pemeliharaan Aset: " . $pemeliharaan->aset->nama_aset . " (ID:" . $pemeliharaan->id_pemeliharaan . ")",
                'tanggal' => $pemeliharaan->tanggal_selesai ?? now()->toDateString(),
                'id_user' => $request->user()->id_user,
            ]);
        }

        return response()->json([
            'message' => 'Laporan pemeliharaan berhasil dibuat',
            'data'    => new PemeliharaanResource($pemeliharaan->load(['aset', 'user'])),
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Pemeliharaan $pemeliharaan)
    {
        return response()->json([
            'data' => new PemeliharaanResource($pemeliharaan->load(['aset', 'user'])),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PemeliharaanRequest $request, Pemeliharaan $pemeliharaan)
    {
        $data = $request->validated();

        if ($request->hasFile('foto_kerusakan')) {
            $data['foto_kerusakan'] = $request->file('foto_kerusakan')->store('pemeliharaan', 'public');
        }

        $pemeliharaan->update($data);
        $pemeliharaan->load('aset');

        // If completed, restore asset condition
        if (isset($data['status']) && $data['status'] === 'selesai') {
            $pemeliharaan->aset->update(['kondisi' => 'baik']);
        }

        // Financial log sync
        $descSearch = "%(ID:" . $pemeliharaan->id_pemeliharaan . ")%";
        $existingTx = Keuangan::where('keterangan', 'like', $descSearch)->first();

        if (isset($data['status']) && $data['status'] === 'selesai' && $pemeliharaan->biaya > 0) {
            $txData = [
                'jenis' => 'pengeluaran',
                'kategori' => 'Operasional',
                'jumlah' => $pemeliharaan->biaya,
                'keterangan' => "Biaya Pemeliharaan Aset: " . $pemeliharaan->aset->nama_aset . " (ID:" . $pemeliharaan->id_pemeliharaan . ")",
                'tanggal' => $pemeliharaan->tanggal_selesai ?? now()->toDateString(),
                'id_user' => $request->user()->id_user,
            ];
            if ($existingTx) {
                $existingTx->update($txData);
            } else {
                Keuangan::create($txData);
            }
        } else {
            if ($existingTx) {
                $existingTx->delete();
            }
        }

        return response()->json([
            'message' => 'Data pemeliharaan berhasil diupdate',
            'data'    => new PemeliharaanResource($pemeliharaan->load(['aset', 'user'])),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pemeliharaan $pemeliharaan)
    {
        $idPemeliharaan = $pemeliharaan->id_pemeliharaan;
        $pemeliharaan->delete();

        // Delete associated financial log
        $descSearch = "%(ID:" . $idPemeliharaan . ")%";
        Keuangan::where('keterangan', 'like', $descSearch)->delete();

        return response()->json([
            'message' => 'Data pemeliharaan berhasil dihapus',
        ]);
    }
}
