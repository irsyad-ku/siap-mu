<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\PengumumanRequest;
use App\Http\Resources\PengumumanResource;
use App\Models\Pengumuman;
use Illuminate\Http\Request;

class PengumumanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Pengumuman::with('user');

        // Non-admins might only see active announcements
        if (!in_array($request->user()->role ?? '', ['admin', 'pengurus'])) {
            $query->aktif();
        }

        if ($request->has('is_aktif')) {
            $query->where('is_aktif', filter_var($request->is_aktif, FILTER_VALIDATE_BOOLEAN));
        }

        $pengumuman = $query->latest()->paginate(15);

        return PengumumanResource::collection($pengumuman);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(PengumumanRequest $request)
    {
        $data = $request->validated();
        $data['id_user'] = $request->user()->id_user;

        $pengumuman = Pengumuman::create($data);

        return response()->json([
            'message' => 'Pengumuman berhasil ditambahkan',
            'data'    => new PengumumanResource($pengumuman->load('user')),
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Pengumuman $pengumuman)
    {
        return response()->json([
            'data' => new PengumumanResource($pengumuman->load('user')),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(PengumumanRequest $request, Pengumuman $pengumuman)
    {
        $pengumuman->update($request->validated());

        return response()->json([
            'message' => 'Pengumuman berhasil diupdate',
            'data'    => new PengumumanResource($pengumuman->load('user')),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Pengumuman $pengumuman)
    {
        $pengumuman->delete();

        return response()->json([
            'message' => 'Pengumuman berhasil dihapus',
        ]);
    }
}
