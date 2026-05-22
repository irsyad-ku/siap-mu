<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PemeliharaanRequest extends FormRequest
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
            'id_aset'        => ['required', 'exists:aset,id_aset'],
            'jenis'          => ['required', Rule::in(['laporan_kerusakan', 'pemeliharaan_rutin'])],
            'deskripsi'      => ['required', 'string'],
            'foto_kerusakan' => ['nullable', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
        ];

        if (in_array(request()->user()->role, ['admin', 'pengurus'])) {
            $rules['tanggal_selesai'] = ['nullable', 'date', 'after_or_equal:today'];
            $rules['biaya']           = ['nullable', 'numeric', 'min:0'];
            $rules['status']          = ['nullable', Rule::in(['dilaporkan', 'dalam_proses', 'selesai'])];
            $rules['catatan_teknisi'] = ['nullable', 'string'];
        }

        return $rules;
    }
}
