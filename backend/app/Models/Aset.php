<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Aset extends Model
{
    use HasFactory, SoftDeletes;

    protected $table      = 'aset';
    protected $primaryKey = 'id_aset';

    protected $fillable = [
        'nama_aset',
        'kategori',
        'kondisi',
        'tahun_perolehan',
        'nilai_aset',
        'jumlah',
        'satuan',
        'lokasi_aset',
        'foto',
        'keterangan',
        'id_user',
    ];

    protected $casts = [
        'nilai_aset' => 'decimal:2',
        'jumlah'     => 'integer',
    ];

    /**
     * Get the user who registered this asset.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user', 'id_user');
    }

    /**
     * Get all maintenance records for this asset.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function pemeliharaan()
    {
        return $this->hasMany(Pemeliharaan::class, 'id_aset', 'id_aset');
    }

    /**
     * Get full URL for the asset photo.
     */
    public function getFotoUrlAttribute(): ?string
    {
        return $this->foto ? asset('storage/' . $this->foto) : null;
    }
}
