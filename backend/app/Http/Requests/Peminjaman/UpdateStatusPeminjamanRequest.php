<?php

namespace App\Http\Requests\Peminjaman;

use Illuminate\Foundation\Http\FormRequest;

class UpdateStatusPeminjamanRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'status'           => 'required|in:disetujui,ditolak,selesai',
            'catatan_pengurus' => 'nullable|string',
        ];
    }

    public function messages(): array
    {
        return [
            'status.required' => 'Status wajib dipilih.',
            'status.in'       => 'Status tidak valid.',
        ];
    }
}
