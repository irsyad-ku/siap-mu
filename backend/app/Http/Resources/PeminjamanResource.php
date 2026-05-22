<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class PeminjamanResource extends JsonResource
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
            'id_pinjam'           => $this->id_pinjam,
            'tanggal_pinjam'      => $this->tanggal_pinjam->format('d M Y'),
            'tanggal_pinjam_raw'  => $this->tanggal_pinjam->format('Y-m-d'),
            'tanggal_kembali'     => $this->tanggal_kembali->format('d M Y'),
            'tanggal_kembali_raw' => $this->tanggal_kembali->format('Y-m-d'),
            'waktu_mulai'         => $this->waktu_mulai,
            'waktu_selesai'       => $this->waktu_selesai,
            'keperluan'           => $this->keperluan,
            'jumlah_peserta'      => $this->jumlah_peserta,
            'status'              => $this->status,
            'catatan_pengurus'    => $this->catatan_pengurus,
            'tanggal_proses'      => $this->tanggal_proses?->format('d M Y H:i'),
            'user'                => new UserResource($this->whenLoaded('user')),
            'fasilitas'           => new FasilitasResource($this->whenLoaded('fasilitas')),
            'diproses_oleh'       => new UserResource($this->whenLoaded('diprosesoleh')),
            'created_at'          => $this->created_at->format('d M Y H:i'),
        ];
    }
}
