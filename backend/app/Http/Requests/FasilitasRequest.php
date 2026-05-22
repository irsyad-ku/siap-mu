<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class FasilitasRequest extends FormRequest
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
            'nama_fasilitas' => ['required', 'string', 'max:150'],
            'deskripsi'      => ['nullable', 'string'],
            'kapasitas'      => ['nullable', 'integer', 'min:1'],
            'status'         => ['required', Rule::in(['tersedia', 'dipinjam', 'dalam_perawatan'])],
            'foto'           => ['nullable', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
        ];
    }
}
