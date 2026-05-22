<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PemeliharaanRequest;
use App\Http\Resources\PemeliharaanResource;
use App\Models\Pemeliharaan;
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
        $data['status'] = 'dilaporkan';

        if ($request->hasFile('foto_kerusakan')) {
            $data['foto_kerusakan'] = $request->file('foto_kerusakan')->store('pemeliharaan', 'public');
        }

        $pemeliharaan = Pemeliharaan::create($data);

        // Update asset condition if needed
        if ($data['jenis'] === 'laporan_kerusakan') {
            $pemeliharaan->aset->update(['kondisi' => 'perlu_perawatan']);
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

        // If completed, maybe restore asset condition
        if (isset($data['status']) && $data['status'] === 'selesai') {
            $pemeliharaan->aset->update(['kondisi' => 'baik']);
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
        $pemeliharaan->delete();

        return response()->json([
            'message' => 'Data pemeliharaan berhasil dihapus',
        ]);
    }
}
