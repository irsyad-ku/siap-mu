<?php

namespace App\Http\Requests\Keuangan;

use Illuminate\Foundation\Http\FormRequest;

class StoreKeuanganRequest extends FormRequest
{
    public function authorize(): bool { return true; }

    public function rules(): array
    {
        return [
            'jenis'      => 'required|in:pemasukan,pengeluaran',
            'kategori'   => 'required|string|max:100',
            'jumlah'     => 'required|numeric|min:1',
            'keterangan' => 'nullable|string',
            'tanggal'    => 'required|date',
            'bukti'      => 'nullable|file|mimes:jpg,jpeg,png,pdf|max:2048',
        ];
    }

    public function messages(): array
    {
        return [
            'jenis.required'   => 'Jenis transaksi wajib dipilih.',
            'jenis.in'         => 'Jenis transaksi tidak valid.',
            'jumlah.required'  => 'Jumlah wajib diisi.',
            'jumlah.numeric'   => 'Jumlah harus berupa angka.',
            'jumlah.min'       => 'Jumlah minimal Rp 1.',
            'tanggal.required' => 'Tanggal wajib diisi.',
            'bukti.mimes'      => 'Bukti harus berformat JPG, PNG, atau PDF.',
            'bukti.max'        => 'Ukuran bukti maksimal 2MB.',
        ];
    }
}
