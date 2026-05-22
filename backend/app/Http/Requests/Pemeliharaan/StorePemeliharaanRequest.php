<?php

namespace App\Http\Requests\Pemeliharaan;

use Illuminate\Foundation\Http\FormRequest;

class StorePemeliharaanRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'id_aset'         => 'required|exists:aset,id_aset',
            'jenis'           => 'required|in:laporan_kerusakan,pemeliharaan_rutin',
            'deskripsi'       => 'required|string',
            'foto_kerusakan'  => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
            'tanggal_lapor'   => 'required|date',
            'tanggal_selesai' => 'nullable|date|after_or_equal:tanggal_lapor',
            'biaya'           => 'nullable|numeric|min:0',
            'status'          => 'nullable|in:dilaporkan,dalam_proses,selesai',
            'catatan_teknisi' => 'nullable|string',
        ];
    }

    public function messages(): array
    {
        return [
            'id_aset.required'    => 'Aset wajib dipilih.',
            'id_aset.exists'      => 'Aset tidak ditemukan.',
            'jenis.required'      => 'Jenis pemeliharaan wajib dipilih.',
            'deskripsi.required'  => 'Deskripsi wajib diisi.',
            'tanggal_lapor.required' => 'Tanggal lapor wajib diisi.',
            'foto_kerusakan.mimes'   => 'Foto harus berformat JPG atau PNG.',
            'foto_kerusakan.max'     => 'Ukuran foto maksimal 2MB.',
        ];
    }
}
