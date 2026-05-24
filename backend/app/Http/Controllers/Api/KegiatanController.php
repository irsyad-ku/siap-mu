<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\KegiatanRequest;
use App\Http\Resources\KegiatanResource;
use App\Models\Kegiatan;
use Illuminate\Http\Request;

class KegiatanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Kegiatan::with('user');

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        // If not admin/pengurus, only show public activities
        if (!in_array($request->user()->role ?? '', ['admin', 'pengurus'])) {
            $query->publik();
        }

        $kegiatan = $query->orderBy('tanggal', 'desc')
                          ->orderBy('waktu_mulai', 'desc')
                          ->paginate(15);

        return KegiatanResource::collection($kegiatan);
    }

    /**
     * Display a listing of public activities for guests.
     */
    public function publicIndex(Request $request)
    {
        $query = Kegiatan::publik()->with('user');

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $kegiatan = $query->orderBy('tanggal', 'desc')
                          ->orderBy('waktu_mulai', 'desc')
                          ->paginate(15);

        return KegiatanResource::collection($kegiatan);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(KegiatanRequest $request)
    {
        $data = $request->validated();
        $data['id_user'] = $request->user()->id_user;

        $kegiatan = Kegiatan::create($data);

        return response()->json([
            'message' => 'Kegiatan berhasil ditambahkan',
            'data'    => new KegiatanResource($kegiatan->load('user')),
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Kegiatan $kegiatan)
    {
        return response()->json([
            'data' => new KegiatanResource($kegiatan->load('user')),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(KegiatanRequest $request, Kegiatan $kegiatan)
    {
        $kegiatan->update($request->validated());

        return response()->json([
            'message' => 'Kegiatan berhasil diupdate',
            'data'    => new KegiatanResource($kegiatan->load('user')),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Kegiatan $kegiatan)
    {
        $kegiatan->delete();

        return response()->json([
            'message' => 'Kegiatan berhasil dihapus',
        ]);
    }
}
