<?php

namespace App\Http\Requests\Peminjaman;

use Illuminate\Foundation\Http\FormRequest;

class StorePeminjamanRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'id_fasilitas'    => 'required|exists:fasilitas,id_fasilitas',
            'tanggal_pinjam'  => 'required|date|after_or_equal:today',
            'tanggal_kembali' => 'required|date|after_or_equal:tanggal_pinjam',
            'waktu_mulai'     => 'required|date_format:H:i',
            'waktu_selesai'   => 'required|date_format:H:i|after:waktu_mulai',
            'keperluan'       => 'required|string',
            'jumlah_peserta'  => 'nullable|integer|min:1',
        ];
    }

    public function messages(): array
    {
        return [
            'id_fasilitas.required'    => 'Fasilitas wajib dipilih.',
            'id_fasilitas.exists'      => 'Fasilitas tidak ditemukan.',
            'tanggal_pinjam.required'  => 'Tanggal pinjam wajib diisi.',
            'tanggal_pinjam.after_or_equal' => 'Tanggal pinjam tidak boleh kurang dari hari ini.',
            'tanggal_kembali.after_or_equal' => 'Tanggal kembali harus sama atau setelah tanggal pinjam.',
            'waktu_mulai.required'     => 'Waktu mulai wajib diisi.',
            'waktu_selesai.required'   => 'Waktu selesai wajib diisi.',
            'waktu_selesai.after'      => 'Waktu selesai harus setelah waktu mulai.',
            'keperluan.required'       => 'Keperluan wajib diisi.',
        ];
    }
}
