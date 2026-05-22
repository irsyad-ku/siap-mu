<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

use App\Http\Controllers\Api\AuthController;
use App\Http\Controllers\Api\UserController;
use App\Http\Controllers\Api\KeuanganController;
use App\Http\Controllers\Api\KegiatanController;
use App\Http\Controllers\Api\AsetController;
use App\Http\Controllers\Api\FasilitasController;
use App\Http\Controllers\Api\PeminjamanController;
use App\Http\Controllers\Api\PemeliharaanController;
use App\Http\Controllers\Api\PengumumanController;
use App\Http\Controllers\Api\DashboardController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
*/

Route::post('/login', [AuthController::class, 'login']);
Route::post('/register', [AuthController::class, 'register']);
Route::get('/public-stats', [DashboardController::class, 'publicStats']);

Route::middleware('auth:sanctum')->group(function () {
    Route::post('/logout', [AuthController::class, 'logout']);
    Route::get('/profile', [AuthController::class, 'profile']);
    Route::get('/user', [AuthController::class, 'profile']);
    
    Route::get('/dashboard', [DashboardController::class, 'index']);

    // Users (Admin only for full access, though roles should ideally be middleware)
    Route::apiResource('users', UserController::class);

    // Keuangan (Admin/Pengurus)
    Route::apiResource('keuangan', KeuanganController::class);

    // Kegiatan
    Route::apiResource('kegiatan', KegiatanController::class);

    // Aset
    Route::apiResource('aset', AsetController::class);

    // Fasilitas
    Route::apiResource('fasilitas', FasilitasController::class);

    // Peminjaman
    Route::apiResource('peminjaman', PeminjamanController::class);

    // Pemeliharaan
    Route::apiResource('pemeliharaan', PemeliharaanController::class);

    // Pengumuman
    Route::apiResource('pengumuman', PengumumanController::class);
});
