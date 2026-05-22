<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('keuangan', function (Blueprint $table) {
            $table->id('id_transaksi');
            $table->enum('jenis', ['pemasukan', 'pengeluaran']);
            $table->string('kategori', 100);
            $table->decimal('jumlah', 15, 2);
            $table->text('keterangan')->nullable();
            $table->date('tanggal');
            $table->string('bukti')->nullable();
            $table->foreignId('id_user')
                  ->constrained('users', 'id_user')
                  ->restrictOnDelete();
            $table->timestamps();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('keuangan');
    }
};
