<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PeminjamanRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array|string>
     */
    public function rules(): array
    {
        $rules = [
            'id_fasilitas'    => ['required', 'exists:fasilitas,id_fasilitas'],
            'tanggal_pinjam'  => ['required', 'date', 'after_or_equal:today'],
            'tanggal_kembali' => ['required', 'date', 'after_or_equal:tanggal_pinjam'],
            'waktu_mulai'     => ['required', 'date_format:H:i'],
            'waktu_selesai'   => ['required', 'date_format:H:i', 'after:waktu_mulai'],
            'keperluan'       => ['required', 'string'],
            'jumlah_peserta'  => ['nullable', 'integer', 'min:1'],
        ];

        // If admin/pengurus is updating, they might send status or notes
        if (in_array(request()->user()->role, ['admin', 'pengurus'])) {
            $rules['status']           = ['nullable', Rule::in(['menunggu', 'disetujui', 'ditolak', 'selesai'])];
            $rules['catatan_pengurus'] = ['nullable', 'string'];
        }

        return $rules;
    }
}
