<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserRequest extends FormRequest
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
        $userId = $this->route('user');

        $rules = [
            'nama'      => ['required', 'string', 'max:100'],
            'email'     => ['required', 'email', 'max:100', Rule::unique('users', 'email')->ignore($userId, 'id_user')],
            'role'      => ['required', Rule::in(['admin', 'pengurus', 'warga'])],
            'no_hp'     => ['nullable', 'string', 'max:20'],
            'foto'      => ['nullable', 'image', 'mimes:jpeg,png,jpg', 'max:2048'],
            'is_active' => ['boolean'],
        ];

        if ($this->isMethod('post')) {
            $rules['password'] = ['required', 'string', 'min:8', 'confirmed'];
        } else {
            $rules['password'] = ['nullable', 'string', 'min:8', 'confirmed'];
        }

        return $rules;
    }
}
