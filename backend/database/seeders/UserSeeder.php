<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Hash;

class UserSeeder extends Seeder
{
    public function run(): void
    {
        $users = [
            [
                'nama'      => 'Administrator DKM',
                'email'     => 'admin@siapmu.id',
                'password'  => Hash::make('password123'),
                'role'      => 'admin',
                'no_hp'     => '081200000001',
                'is_active' => true,
            ],
            [
                'nama'      => 'Budi Santoso',
                'email'     => 'pengurus1@siapmu.id',
                'password'  => Hash::make('password123'),
                'role'      => 'pengurus',
                'no_hp'     => '081200000002',
                'is_active' => true,
            ],
            [
                'nama'      => 'Siti Aminah',
                'email'     => 'pengurus2@siapmu.id',
                'password'  => Hash::make('password123'),
                'role'      => 'pengurus',
                'no_hp'     => '081200000003',
                'is_active' => true,
            ],
            [
                'nama'      => 'Ahmad Warga',
                'email'     => 'warga1@siapmu.id',
                'password'  => Hash::make('password123'),
                'role'      => 'warga',
                'no_hp'     => '081200000004',
                'is_active' => true,
            ],
            [
                'nama'      => 'Dewi Rahayu',
                'email'     => 'warga2@siapmu.id',
                'password'  => Hash::make('password123'),
                'role'      => 'warga',
                'no_hp'     => '081200000005',
                'is_active' => true,
            ],
            [
                'nama'      => 'Hasan Maulana',
                'email'     => 'warga3@siapmu.id',
                'password'  => Hash::make('password123'),
                'role'      => 'warga',
                'no_hp'     => '081200000006',
                'is_active' => true,
            ],
        ];

        foreach ($users as $user) {
            User::create($user);
        }
    }
}
