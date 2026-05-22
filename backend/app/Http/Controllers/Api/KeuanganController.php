<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\KeuanganRequest;
use App\Http\Resources\KeuanganResource;
use App\Models\Keuangan;
use Illuminate\Http\Request;

class KeuanganController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Keuangan::with('user');

        if ($request->has('jenis')) {
            $query->where('jenis', $request->jenis);
        }

        if ($request->has('bulan') && $request->has('tahun')) {
            $query->whereMonth('tanggal', $request->bulan)
                  ->whereYear('tanggal', $request->tahun);
        }

        $keuangan = $query->orderBy('tanggal', 'desc')->paginate(15);

        return KeuanganResource::collection($keuangan);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(KeuanganRequest $request)
    {
        $data = $request->validated();
        $data['id_user'] = $request->user()->id_user;

        if ($request->hasFile('bukti')) {
            $data['bukti'] = $request->file('bukti')->store('keuangan', 'public');
        }

        $keuangan = Keuangan::create($data);

        return response()->json([
            'message' => 'Data keuangan berhasil ditambahkan',
            'data'    => new KeuanganResource($keuangan->load('user')),
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Keuangan $keuangan)
    {
        return response()->json([
            'data' => new KeuanganResource($keuangan->load('user')),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(KeuanganRequest $request, Keuangan $keuangan)
    {
        $data = $request->validated();

        if ($request->hasFile('bukti')) {
            $data['bukti'] = $request->file('bukti')->store('keuangan', 'public');
        }

        $keuangan->update($data);

        return response()->json([
            'message' => 'Data keuangan berhasil diupdate',
            'data'    => new KeuanganResource($keuangan->load('user')),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Keuangan $keuangan)
    {
        $keuangan->delete();

        return response()->json([
            'message' => 'Data keuangan berhasil dihapus',
        ]);
    }
}
