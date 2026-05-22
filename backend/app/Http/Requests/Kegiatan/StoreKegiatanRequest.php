<?php

namespace App\Http\Requests\Kegiatan;

use Illuminate\Foundation\Http\FormRequest;

class StoreKegiatanRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'nama_kegiatan' => 'required|string|max:150',
            'deskripsi'     => 'nullable|string',
            'tanggal'       => 'required|date',
            'waktu_mulai'   => 'required|date_format:H:i',
            'waktu_selesai' => 'nullable|date_format:H:i|after:waktu_mulai',
            'lokasi'        => 'nullable|string|max:150',
            'status'        => 'nullable|in:akan_datang,berlangsung,selesai,dibatalkan',
            'is_publik'     => 'nullable|boolean',
        ];
    }

    public function messages(): array
    {
        return [
            'nama_kegiatan.required' => 'Nama kegiatan wajib diisi.',
            'tanggal.required'       => 'Tanggal wajib diisi.',
            'waktu_mulai.required'   => 'Waktu mulai wajib diisi.',
            'waktu_selesai.after'    => 'Waktu selesai harus setelah waktu mulai.',
        ];
    }
}
