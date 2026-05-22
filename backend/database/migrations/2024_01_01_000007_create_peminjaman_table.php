<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('peminjaman', function (Blueprint $table) {
            $table->id('id_pinjam');
            $table->foreignId('id_user')
                  ->constrained('users', 'id_user')
                  ->restrictOnDelete();
            $table->foreignId('id_fasilitas')
                  ->constrained('fasilitas', 'id_fasilitas')
                  ->restrictOnDelete();
            $table->date('tanggal_pinjam');
            $table->date('tanggal_kembali');
            $table->time('waktu_mulai');
            $table->time('waktu_selesai');
            $table->text('keperluan');
            $table->integer('jumlah_peserta')->nullable();
            $table->enum('status', [
                'menunggu',
                'disetujui',
                'ditolak',
                'selesai'
            ])->default('menunggu');
            $table->text('catatan_pengurus')->nullable();
            $table->foreignId('diproses_oleh')
                  ->nullable()
                  ->constrained('users', 'id_user')
                  ->nullOnDelete();
            $table->timestamp('tanggal_proses')->nullable();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('peminjaman');
    }
};
