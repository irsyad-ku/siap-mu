<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Pengumuman extends Model
{
    use HasFactory, SoftDeletes;

    protected $table      = 'pengumuman';
    protected $primaryKey = 'id_pengumuman';

    protected $fillable = [
        'judul',
        'isi',
        'tanggal',
        'is_aktif',
        'id_user',
    ];

    protected $casts = [
        'tanggal'  => 'date',
        'is_aktif' => 'boolean',
    ];

    /**
     * Get the user who posted this announcement.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user', 'id_user');
    }

    /**
     * Scope: only active announcements.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeAktif($query)
    {
        return $query->where('is_aktif', true);
    }
}
