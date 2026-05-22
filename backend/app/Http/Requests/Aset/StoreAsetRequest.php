<?php

namespace App\Http\Requests\Aset;

use Illuminate\Foundation\Http\FormRequest;

class StoreAsetRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'nama_aset'       => 'required|string|max:150',
            'kategori'        => 'required|string|max:100',
            'kondisi'         => 'nullable|in:baik,perlu_perawatan,rusak',
            'tahun_perolehan' => 'nullable|digits:4|integer|min:1900|max:' . (date('Y') + 1),
            'nilai_aset'      => 'nullable|numeric|min:0',
            'jumlah'          => 'nullable|integer|min:1',
            'satuan'          => 'nullable|string|max:30',
            'lokasi_aset'     => 'nullable|string|max:150',
            'foto'            => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'keterangan'      => 'nullable|string',
        ];
    }

    public function messages(): array
    {
        return [
            'nama_aset.required' => 'Nama aset wajib diisi.',
            'kategori.required'  => 'Kategori aset wajib diisi.',
            'foto.mimes'         => 'Foto harus berformat JPG atau PNG.',
            'foto.max'           => 'Ukuran foto maksimal 2MB.',
        ];
    }
}
