<?php

namespace App\Http\Requests\Pengumuman;

use Illuminate\Foundation\Http\FormRequest;

class StorePengumumanRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'judul'    => 'required|string|max:200',
            'isi'      => 'required|string',
            'tanggal'  => 'required|date',
            'is_aktif' => 'nullable|boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'judul.required'   => 'Judul wajib diisi.',
            'isi.required'     => 'Isi pengumuman wajib diisi.',
            'tanggal.required' => 'Tanggal wajib diisi.',
        ];
    }
}
