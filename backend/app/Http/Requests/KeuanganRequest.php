<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class KeuanganRequest extends FormRequest
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
            'jenis'      => ['required', Rule::in(['pemasukan', 'pengeluaran'])],
            'kategori'   => ['required', 'string', 'max:100'],
            'jumlah'     => ['required', 'numeric', 'min:0'],
            'keterangan' => ['nullable', 'string'],
            'tanggal'    => ['required', 'date'],
            'bukti'      => ['nullable', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
        ];
    }
}
