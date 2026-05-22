<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AsetRequest;
use App\Http\Resources\AsetResource;
use App\Models\Aset;
use App\Models\Keuangan;
use Illuminate\Http\Request;

class AsetController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Aset::with('user');

        if ($request->has('kategori')) {
            $query->where('kategori', $request->kategori);
        }

        if ($request->has('kondisi')) {
            $query->where('kondisi', $request->kondisi);
        }

        $aset = $query->latest()->paginate(15);

        return AsetResource::collection($aset);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(AsetRequest $request)
    {
        $data = $request->validated();
        $data['id_user'] = $request->user()->id_user;

        if ($request->hasFile('foto')) {
            $data['foto'] = $request->file('foto')->store('aset', 'public');
        }

        $aset = Aset::create($data);

        // Sync with finance (Keuangan) if there is a cost associated
        $totalBiaya = $aset->nilai_aset * $aset->jumlah;
        if ($totalBiaya > 0) {
            Keuangan::create([
                'jenis' => 'pengeluaran',
                'kategori' => 'Lainnya',
                'jumlah' => $totalBiaya,
                'keterangan' => "Pembelian Aset: " . $aset->nama_aset . " (ID:" . $aset->id_aset . ")",
                'tanggal' => now()->toDateString(),
                'id_user' => $request->user()->id_user,
            ]);
        }

        return response()->json([
            'message' => 'Aset berhasil ditambahkan',
            'data'    => new AsetResource($aset->load('user')),
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Aset $aset)
    {
        return response()->json([
            'data' => new AsetResource($aset->load(['user', 'pemeliharaan'])),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(AsetRequest $request, Aset $aset)
    {
        $data = $request->validated();

        if ($request->hasFile('foto')) {
            $data['foto'] = $request->file('foto')->store('aset', 'public');
        }

        $aset->update($data);

        // Sync with finance (Keuangan)
        $totalBiaya = $aset->nilai_aset * $aset->jumlah;
        $descSearch = "%(ID:" . $aset->id_aset . ")%";
        $existingTx = Keuangan::where('keterangan', 'like', $descSearch)->first();

        if ($totalBiaya > 0) {
            $txData = [
                'jenis' => 'pengeluaran',
                'kategori' => 'Lainnya',
                'jumlah' => $totalBiaya,
                'keterangan' => "Pembelian Aset: " . $aset->nama_aset . " (ID:" . $aset->id_aset . ")",
                'tanggal' => $aset->created_at->toDateString(),
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
            'message' => 'Aset berhasil diupdate',
            'data'    => new AsetResource($aset->load('user')),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Aset $aset)
    {
        $idAset = $aset->id_aset;
        $aset->delete();

        // Remove associated transaction from finance
        $descSearch = "%(ID:" . $idAset . ")%";
        Keuangan::where('keterangan', 'like', $descSearch)->delete();

        return response()->json([
            'message' => 'Aset berhasil dihapus',
        ]);
    }
}
