<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PemeliharaanResource extends JsonResource
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
            'id_pemeliharaan'    => $this->id_pemeliharaan,
            'jenis'              => $this->jenis,
            'deskripsi'          => $this->deskripsi,
            'foto_kerusakan_url' => $this->foto_kerusakan_url,
            'tanggal_lapor'      => $this->tanggal_lapor->format('d M Y'),
            'tanggal_lapor_raw'  => $this->tanggal_lapor->format('Y-m-d'),
            'tanggal_selesai'    => $this->tanggal_selesai?->format('d M Y'),
            'biaya'              => (float) $this->biaya,
            'biaya_format'       => 'Rp ' . number_format($this->biaya, 0, ',', '.'),
            'status'             => $this->status,
            'catatan_teknisi'    => $this->catatan_teknisi,
            'aset'               => new AsetResource($this->whenLoaded('aset')),
            'user'               => new UserResource($this->whenLoaded('user')),
            'created_at'         => $this->created_at->format('d M Y H:i'),
        ];
    }
}
