<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class KegiatanResource extends JsonResource
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
            'id_kegiatan'   => $this->id_kegiatan,
            'nama_kegiatan' => $this->nama_kegiatan,
            'deskripsi'     => $this->deskripsi,
            'tanggal'       => $this->tanggal->format('d M Y'),
            'tanggal_raw'   => $this->tanggal->format('Y-m-d'),
            'waktu_mulai'   => $this->waktu_mulai,
            'waktu_selesai' => $this->waktu_selesai,
            'lokasi'        => $this->lokasi,
            'status'        => $this->status,
            'is_publik'     => $this->is_publik,
            'user'          => new UserResource($this->whenLoaded('user')),
            'created_at'    => $this->created_at->format('d M Y H:i'),
        ];
    }
}
