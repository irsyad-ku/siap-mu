<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\FasilitasRequest;
use App\Http\Resources\FasilitasResource;
use App\Models\Fasilitas;
use Illuminate\Http\Request;

class FasilitasController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index(Request $request)
    {
        $query = Fasilitas::with('user');

        if ($request->has('status')) {
            $query->where('status', $request->status);
        }

        $fasilitas = $query->latest()->paginate(15);

        return FasilitasResource::collection($fasilitas);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(FasilitasRequest $request)
    {
        $data = $request->validated();
        $data['id_user'] = $request->user()->id_user;

        if ($request->hasFile('foto')) {
            $data['foto'] = $request->file('foto')->store('fasilitas', 'public');
        }

        $fasilitas = Fasilitas::create($data);

        return response()->json([
            'message' => 'Fasilitas berhasil ditambahkan',
            'data'    => new FasilitasResource($fasilitas->load('user')),
        ], 201);
    }

    /**
     * Display the specified resource.
     */
    public function show(Fasilitas $fasilita)
    {
        return response()->json([
            'data' => new FasilitasResource($fasilita->load('user')),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(FasilitasRequest $request, Fasilitas $fasilita)
    {
        $data = $request->validated();

        if ($request->hasFile('foto')) {
            $data['foto'] = $request->file('foto')->store('fasilitas', 'public');
        }

        $fasilita->update($data);

        return response()->json([
            'message' => 'Fasilitas berhasil diupdate',
            'data'    => new FasilitasResource($fasilita->load('user')),
        ]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Fasilitas $fasilita)
    {
        $fasilita->delete();

        return response()->json([
            'message' => 'Fasilitas berhasil dihapus',
        ]);
    }
}
