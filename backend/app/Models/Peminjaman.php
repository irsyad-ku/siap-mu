<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Peminjaman extends Model
{
    use HasFactory;

    protected $table      = 'peminjaman';
    protected $primaryKey = 'id_pinjam';

    protected $fillable = [
        'id_user',
        'id_fasilitas',
        'tanggal_pinjam',
        'tanggal_kembali',
        'waktu_mulai',
        'waktu_selesai',
        'keperluan',
        'jumlah_peserta',
        'status',
        'catatan_pengurus',
        'diproses_oleh',
        'tanggal_proses',
    ];

    protected $casts = [
        'tanggal_pinjam'  => 'date',
        'tanggal_kembali' => 'date',
        'tanggal_proses'  => 'datetime',
    ];

    /**
     * Get the user who made this borrowing request.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user', 'id_user');
    }

    /**
     * Get the facility being borrowed.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function fasilitas()
    {
        return $this->belongsTo(Fasilitas::class, 'id_fasilitas', 'id_fasilitas');
    }

    /**
     * Get the pengurus who processed this request.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function diprosesoleh()
    {
        return $this->belongsTo(User::class, 'diproses_oleh', 'id_user');
    }

    /**
     * Scope: only pending borrowings.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeMenunggu($query)
    {
        return $query->where('status', 'menunggu');
    }

    /**
     * Scope: active borrowings (pending or approved).
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeAktif($query)
    {
        return $query->whereIn('status', ['menunggu', 'disetujui']);
    }
}
