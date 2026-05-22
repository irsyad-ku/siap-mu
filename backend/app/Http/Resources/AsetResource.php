<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class AsetResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array<string, mixed>
     */
    public function toArray(Request $request): array
    {
        return [
            'id_aset'           => $this->id_aset,
            'nama_aset'         => $this->nama_aset,
            'kategori'          => $this->kategori,
            'kondisi'           => $this->kondisi,
            'tahun_perolehan'   => $this->tahun_perolehan,
            'nilai_aset'        => (float) $this->nilai_aset,
            'nilai_aset_format' => 'Rp ' . number_format($this->nilai_aset, 0, ',', '.'),
            'jumlah'            => $this->jumlah,
            'satuan'            => $this->satuan,
            'lokasi_aset'       => $this->lokasi_aset,
            'foto_url'          => $this->foto_url,
            'keterangan'        => $this->keterangan,
            'user'              => new UserResource($this->whenLoaded('user')),
            'pemeliharaan'      => PemeliharaanResource::collection($this->whenLoaded('pemeliharaan')),
            'created_at'        => $this->created_at->format('d M Y H:i'),
        ];
    }
}
