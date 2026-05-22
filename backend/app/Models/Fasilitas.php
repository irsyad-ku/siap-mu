<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Fasilitas extends Model
{
    use HasFactory, SoftDeletes;

    protected $table      = 'fasilitas';
    protected $primaryKey = 'id_fasilitas';

    protected $fillable = [
        'nama_fasilitas',
        'deskripsi',
        'kapasitas',
        'status',
        'foto',
        'id_user',
    ];

    /**
     * Get the user who registered this facility.
     *
     * @return \Illuminate\Database\Eloquent\Relations\BelongsTo
     */
    public function user()
    {
        return $this->belongsTo(User::class, 'id_user', 'id_user');
    }

    /**
     * Get all borrowing records for this facility.
     *
     * @return \Illuminate\Database\Eloquent\Relations\HasMany
     */
    public function peminjaman()
    {
        return $this->hasMany(Peminjaman::class, 'id_fasilitas', 'id_fasilitas');
    }

    /**
     * Get full URL for the facility photo.
     */
    public function getFotoUrlAttribute(): ?string
    {
        return $this->foto ? asset('storage/' . $this->foto) : null;
    }

    /**
     * Scope: only available facilities.
     *
     * @param \Illuminate\Database\Eloquent\Builder $query
     * @return \Illuminate\Database\Eloquent\Builder
     */
    public function scopeTersedia($query)
    {
        return $query->where('status', 'tersedia');
    }

    /**
     * Check if this facility is available on a given date and time range.
     *
     * @param string   $tanggalPinjam
     * @param string   $waktuMulai
     * @param string   $waktuSelesai
     * @param int|null $exceptPinjamId
     * @return bool
     */
    public function isAvailable(
        string $tanggalPinjam,
        string $waktuMulai,
        string $waktuSelesai,
        ?int $exceptPinjamId = null
    ): bool {
        $query = $this->peminjaman()
            ->where('tanggal_pinjam', $tanggalPinjam)
            ->whereIn('status', ['menunggu', 'disetujui'])
            ->where(function ($q) use ($waktuMulai, $waktuSelesai) {
                $q->whereBetween('waktu_mulai', [$waktuMulai, $waktuSelesai])
                  ->orWhereBetween('waktu_selesai', [$waktuMulai, $waktuSelesai])
                  ->orWhere(function ($q2) use ($waktuMulai, $waktuSelesai) {
                      $q2->where('waktu_mulai', '<=', $waktuMulai)
                         ->where('waktu_selesai', '>=', $waktuSelesai);
                  });
            });

        if ($exceptPinjamId) {
            $query->where('id_pinjam', '!=', $exceptPinjamId);
        }

        return $query->count() === 0;
    }
}
