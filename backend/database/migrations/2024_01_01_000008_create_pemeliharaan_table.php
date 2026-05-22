<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pemeliharaan', function (Blueprint $table) {
            $table->id('id_pemeliharaan');
            $table->foreignId('id_aset')
                  ->constrained('aset', 'id_aset')
                  ->restrictOnDelete();
            $table->foreignId('id_user')
                  ->constrained('users', 'id_user')
                  ->restrictOnDelete();
            $table->enum('jenis', [
                'laporan_kerusakan',
                'pemeliharaan_rutin'
            ]);
            $table->text('deskripsi');
            $table->string('foto_kerusakan')->nullable();
            $table->date('tanggal_lapor');
            $table->date('tanggal_selesai')->nullable();
            $table->decimal('biaya', 15, 2)->default(0);
            $table->enum('status', [
                'dilaporkan',
                'dalam_proses',
                'selesai'
            ])->default('dilaporkan');
            $table->text('catatan_teknisi')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pemeliharaan');
    }
};
