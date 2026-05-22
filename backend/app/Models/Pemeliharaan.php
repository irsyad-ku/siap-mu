<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Pemeliharaan extends Model
{
    use HasFactory;

    protected $table      = 'pemeliharaan';
    protected $primaryKey = 'id_pemeliharaan';

    protected $fillable = [
        'id_aset',
        'id_user',
        'jenis',
        'deskripsi',
        'foto_kerusakan',
        'tanggal_lapor',
        'tanggal_selesai',
        'biaya',
        'status',
        'catatan_teknisi',
    ];

    protected $casts = [
        'tanggal_lapor'   => 'date',
        'tanggal_selesai' => 'date',
        'biaya'           => 'decimal:2',
    ];

    /**
     * Get the asset being maintained.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function aset()
    {
        return $this->belongsTo(Aset::class, 'id_aset', 'id_aset');
    }

    /**
     * Get the user who reported this maintenance.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user', 'id_user');
    }

    /**
     * Get full URL for the damage photo.
     */
    public function getFotoKerusakanUrlAttribute(): ?string
    {
        return $this->foto_kerusakan
            ? asset('storage/' . $this->foto_kerusakan)
            : null;
    }

    /**
     * Scope: only active (non-completed) maintenance records.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeAktif($query)
    {
        return $query->where('status', '!=', 'selesai');
    }
}
