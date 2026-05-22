<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Keuangan extends Model
{
    use HasFactory;

    protected $table      = 'keuangan';
    protected $primaryKey = 'id_transaksi';

    protected $fillable = [
        'jenis',
        'kategori',
        'jumlah',
        'keterangan',
        'tanggal',
        'bukti',
        'id_user',
    ];

    protected $casts = [
        'jumlah'  => 'decimal:2',
        'tanggal' => 'date',
    ];

    /**
     * Get the user who created this transaction.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user', 'id_user');
    }

    /**
     * Get full URL for the bukti (proof) file.
     */
    public function getBuktiUrlAttribute(): ?string
    {
        return $this->bukti ? asset('storage/' . $this->bukti) : null;
    }
}
