<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('aset', function (Blueprint $table) {
            $table->id('id_aset');
            $table->string('nama_aset', 150);
            $table->string('kategori', 100);
            $table->enum('kondisi', ['baik', 'perlu_perawatan', 'rusak'])->default('baik');
            $table->year('tahun_perolehan')->nullable();
            $table->decimal('nilai_aset', 15, 2)->default(0);
            $table->integer('jumlah')->default(1);
            $table->string('satuan', 30)->default('unit');
            $table->string('lokasi_aset', 150)->nullable();
            $table->string('foto')->nullable();
            $table->text('keterangan')->nullable();
            $table->foreignId('id_user')
                  ->constrained('users', 'id_user')
                  ->restrictOnDelete();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('aset');
    }
};
