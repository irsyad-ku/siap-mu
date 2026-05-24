<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class KegiatanRequest extends FormRequest
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
        return [
            'nama_kegiatan' => ['required', 'string', 'max:150'],
            'deskripsi'     => ['nullable', 'string'],
            'tanggal'       => ['required', 'date'],
            'waktu_mulai'   => ['required', 'date_format:H:i'],
            'waktu_selesai' => ['nullable', 'date_format:H:i', 'after:waktu_mulai'],
            'lokasi'        => ['required', 'string', 'max:150'],
            'status'        => ['sometimes', Rule::in(['akan_datang', 'berlangsung', 'selesai', 'dibatalkan'])],
            'is_publik'     => ['boolean'],
        ];
    }
}
