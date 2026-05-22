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
        $isUpdate = $this->isMethod('put') || $this->isMethod('patch');
        $reqRule = $isUpdate ? 'sometimes' : 'required';

        $rules = [
            'id_fasilitas'    => [$reqRule, 'exists:fasilitas,id_fasilitas'],
            'tanggal_pinjam'  => [$reqRule, 'date'],
            'tanggal_kembali' => [$reqRule, 'date'],
            'waktu_mulai'     => [$reqRule, 'date_format:H:i'],
            'waktu_selesai'   => [$reqRule, 'date_format:H:i'],
            'keperluan'       => [$reqRule, 'string'],
            'jumlah_peserta'  => ['nullable', 'integer', 'min:1'],
        ];

        if (!$isUpdate) {
            $rules['tanggal_pinjam'][] = 'after_or_equal:today';
            $rules['tanggal_kembali'][] = 'after_or_equal:tanggal_pinjam';
            $rules['waktu_selesai'][] = 'after:waktu_mulai';
        } else {
            // Apply conditional validations for updates if dates are actively provided
            if ($this->has('tanggal_pinjam') && !$this->user()->role === 'admin' && !$this->user()->role === 'pengurus') {
                $rules['tanggal_pinjam'][] = 'after_or_equal:today';
            }
            if ($this->has('tanggal_kembali')) {
                $refDate = $this->input('tanggal_pinjam') ?? 'today';
                $rules['tanggal_kembali'][] = 'after_or_equal:' . $refDate;
            }
            if ($this->has('waktu_selesai') && $this->has('waktu_mulai')) {
                $rules['waktu_selesai'][] = 'after:waktu_mulai';
            }
        }

        // If admin/pengurus is updating, they might send status or notes
        if ($this->user() && in_array($this->user()->role, ['admin', 'pengurus'])) {
            $rules['status']           = ['nullable', Rule::in(['menunggu', 'disetujui', 'ditolak', 'selesai'])];
            $rules['catatan_pengurus'] = ['nullable', 'string'];
        }

        return $rules;
    }
}
