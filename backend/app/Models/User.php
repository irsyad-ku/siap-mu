<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Foundation\Auth\User as Authenticatable;
use Illuminate\Notifications\Notifiable;
use Laravel\Sanctum\HasApiTokens;

class User extends Authenticatable
{
    use HasApiTokens, HasFactory, Notifiable;

    protected $primaryKey = 'id_user';

    protected $fillable = [
        'nama',
        'email',
        'password',
        'role',
        'no_hp',
        'foto',
        'is_active',
        'last_login',
    ];

    protected $hidden = [
        'password',
        'remember_token',
    ];

    protected $casts = [
        'password'   => 'hashed',
        'is_active'  => 'boolean',
        'last_login' => 'datetime',
    ];

    /** @return \Illuminate\Database\Eloquent\Relations\HasMany */
    public function keuangan()
    {
        return $this->hasMany(Keuangan::class, 'id_user', 'id_user');
    }

    /** @return \Illuminate\Database\Eloquent\Relations\HasMany */
    public function kegiatan()
    {
        return $this->hasMany(Kegiatan::class, 'id_user', 'id_user');
    }

    /** @return \Illuminate\Database\Eloquent\Relations\HasMany */
    public function aset()
    {
        return $this->hasMany(Aset::class, 'id_user', 'id_user');
    }

    /** @return \Illuminate\Database\Eloquent\Relations\HasMany */
    public function fasilitas()
    {
        return $this->hasMany(Fasilitas::class, 'id_user', 'id_user');
    }

    /** @return \Illuminate\Database\Eloquent\Relations\HasMany */
    public function peminjaman()
    {
        return $this->hasMany(Peminjaman::class, 'id_user', 'id_user');
    }

    /** @return \Illuminate\Database\Eloquent\Relations\HasMany */
    public function pemeliharaan()
    {
        return $this->hasMany(Pemeliharaan::class, 'id_user', 'id_user');
    }

    /** @return \Illuminate\Database\Eloquent\Relations\HasMany */
    public function pengumuman()
    {
        return $this->hasMany(Pengumuman::class, 'id_user', 'id_user');
    }

    /**
     * Get full URL for user avatar photo.
     */
    public function getFotoUrlAttribute(): ?string
    {
        return $this->foto ? asset('storage/' . $this->foto) : null;
    }

    /**
     * Check if user has admin role.
     */
    public function isAdmin(): bool
    {
        return $this->role === 'admin';
    }

    /**
     * Check if user has pengurus role.
     */
    public function isPengurus(): bool
    {
        return $this->role === 'pengurus';
    }

    /**
     * Check if user has warga role.
     */
    public function isWarga(): bool
    {
        return $this->role === 'warga';
    }
}
