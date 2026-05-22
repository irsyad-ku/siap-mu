<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     */
    public function run(): void
    {
        $this->call([
            UserSeeder::class,
            AsetSeeder::class,
            FasilitasSeeder::class,
            KegiatanSeeder::class,
            KeuanganSeeder::class,
            PeminjamanSeeder::class,
            PemeliharaanSeeder::class,
            PengumumanSeeder::class,
        ]);
    }
}
