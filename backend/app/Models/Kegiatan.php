<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Kegiatan extends Model
{
    use HasFactory;

    protected $table      = 'kegiatan';
    protected $primaryKey = 'id_kegiatan';

    protected $fillable = [
        'nama_kegiatan',
        'deskripsi',
        'tanggal',
        'waktu_mulai',
        'waktu_selesai',
        'lokasi',
        'status',
        'is_publik',
        'id_user',
    ];

    protected $casts = [
        'tanggal'   => 'date',
        'is_publik' => 'boolean',
    ];

    /**
     * Get the user who created this activity.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user', 'id_user');
    }

    /**
     * Scope: only public activities.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopePublik($query)
    {
        return $query->where('is_publik', true);
    }

    /**
     * Scope: upcoming and ongoing activities.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeMendatang($query)
    {
        return $query->where('tanggal', '>=', now()->toDateString())
                     ->whereIn('status', ['akan_datang', 'berlangsung']);
    }
}
