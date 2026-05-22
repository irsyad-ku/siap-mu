<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('kegiatan', function (Blueprint $table) {
            $table->id('id_kegiatan');
            $table->string('nama_kegiatan', 150);
            $table->text('deskripsi')->nullable();
            $table->date('tanggal');
            $table->time('waktu_mulai');
            $table->time('waktu_selesai')->nullable();
            $table->string('lokasi', 150)->default('Masjid');
            $table->enum('status', [
                'akan_datang',
                'berlangsung',
                'selesai',
                'dibatalkan'
            ])->default('akan_datang');
            $table->boolean('is_publik')->default(true);
            $table->foreignId('id_user')
                  ->constrained('users', 'id_user')
                  ->restrictOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('kegiatan');
    }
};
