<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('fasilitas', function (Blueprint $table) {
            $table->id('id_fasilitas');
            $table->string('nama_fasilitas', 150);
            $table->text('deskripsi')->nullable();
            $table->integer('kapasitas')->nullable();
            $table->enum('status', [
                'tersedia',
                'dipinjam',
                'dalam_perawatan'
            ])->default('tersedia');
            $table->string('foto')->nullable();
            $table->foreignId('id_user')
                  ->constrained('users', 'id_user')
                  ->restrictOnDelete();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('fasilitas');
    }
};
