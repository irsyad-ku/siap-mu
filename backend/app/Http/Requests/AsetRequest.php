<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class AsetRequest extends FormRequest
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
            'nama_aset'       => ['required', 'string', 'max:150'],
            'kategori'        => ['required', 'string', 'max:100'],
            'kondisi'         => ['required', Rule::in(['baik', 'perlu_perawatan', 'rusak'])],
            'tahun_perolehan' => ['nullable', 'date_format:Y'],
            'nilai_aset'      => ['nullable', 'numeric', 'min:0'],
            'jumlah'          => ['required', 'integer', 'min:1'],
            'satuan'          => ['required', 'string', 'max:30'],
            'lokasi_aset'     => ['nullable', 'string', 'max:150'],
            'foto'            => ['nullable', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
            'keterangan'      => ['nullable', 'string'],
        ];
    }
}
