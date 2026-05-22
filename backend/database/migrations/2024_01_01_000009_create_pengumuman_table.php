<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    public function up(): void
    {
        Schema::create('pengumuman', function (Blueprint $table) {
            $table->id('id_pengumuman');
            $table->string('judul', 200);
            $table->text('isi');
            $table->date('tanggal');
            $table->boolean('is_aktif')->default(true);
            $table->foreignId('id_user')
                  ->constrained('users', 'id_user')
                  ->restrictOnDelete();
            $table->timestamps();
            $table->softDeletes();
        });
    }

    public function down(): void
    {
        Schema::dropIfExists('pengumuman');
    }
};
