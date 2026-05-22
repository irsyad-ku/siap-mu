<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AsetRequest;
use App\Http\Resources\AsetResource;
use App\Models\Aset;
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
        $aset->delete();

        return response()->json([
            'message' => 'Aset berhasil dihapus',
        ]);
    }
}
