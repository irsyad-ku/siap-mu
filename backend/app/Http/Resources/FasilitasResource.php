<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class FasilitasResource extends JsonResource
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
            'id_fasilitas'   => $this->id_fasilitas,
            'nama_fasilitas' => $this->nama_fasilitas,
            'deskripsi'      => $this->deskripsi,
            'kapasitas'      => $this->kapasitas,
            'status'         => $this->status,
            'foto_url'       => $this->foto_url,
            'user'           => new UserResource($this->whenLoaded('user')),
            'created_at'     => $this->created_at->format('d M Y H:i'),
        ];
    }
}
