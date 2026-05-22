<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PengumumanResource extends JsonResource
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
            'id_pengumuman' => $this->id_pengumuman,
            'judul'         => $this->judul,
            'isi'           => $this->isi,
            'tanggal'       => $this->tanggal->format('d M Y'),
            'tanggal_raw'   => $this->tanggal->format('Y-m-d'),
            'is_aktif'      => $this->is_aktif,
            'user'          => new UserResource($this->whenLoaded('user')),
            'created_at'    => $this->created_at->format('d M Y H:i'),
        ];
    }
}
