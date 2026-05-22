<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class UserResource extends JsonResource
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
            'id_user'    => $this->id_user,
            'nama'       => $this->nama,
            'email'      => $this->email,
            'role'       => $this->role,
            'no_hp'      => $this->no_hp,
            'foto_url'   => $this->foto_url,
            'is_active'  => $this->is_active,
            'last_login' => $this->last_login?->format('d M Y H:i'),
            'created_at' => $this->created_at->format('d M Y'),
        ];
    }
}
