<?php

namespace App\Http\Requests\Fasilitas;

use Illuminate\Foundation\Http\FormRequest;

class StoreFasilitasRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'nama_fasilitas' => 'required|string|max:150',
            'deskripsi'      => 'nullable|string',
            'kapasitas'      => 'nullable|integer|min:1',
            'status'         => 'nullable|in:tersedia,dipinjam,dalam_perawatan',
            'foto'           => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ];
    }

    public function messages(): array
    {
        return [
            'nama_fasilitas.required' => 'Nama fasilitas wajib diisi.',
            'foto.mimes'              => 'Foto harus berformat JPG atau PNG.',
            'foto.max'                => 'Ukuran foto maksimal 2MB.',
        ];
    }
}
