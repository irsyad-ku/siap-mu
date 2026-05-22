<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class KeuanganResource extends JsonResource
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
            'id_transaksi'  => $this->id_transaksi,
            'jenis'         => $this->jenis,
            'kategori'      => $this->kategori,
            'jumlah'        => (float) $this->jumlah,
            'jumlah_format' => 'Rp ' . number_format($this->jumlah, 0, ',', '.'),
            'keterangan'    => $this->keterangan,
            'tanggal'       => $this->tanggal->format('d M Y'),
            'tanggal_raw'   => $this->tanggal->format('Y-m-d'),
            'bukti_url'     => $this->bukti_url,
            'user'          => new UserResource($this->whenLoaded('user')),
            'created_at'    => $this->created_at->format('d M Y H:i'),
        ];
    }
}
