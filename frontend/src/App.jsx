import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// Providers
import { AuthProvider } from './contexts/AuthContext';
import { ToastProvider } from './contexts/ToastContext';

// Components
import ProtectedRoute from './components/ProtectedRoute';

// Layouts
import PublicLayout from './layouts/PublicLayout';
import AdminLayout from './layouts/AdminLayout';

// Auth Pages
import Login from './pages/Auth/Login';
import Register from './pages/Auth/Register';

// Public Pages
import Beranda from './pages/Public/Beranda';
import PengumumanPublik from './pages/Public/Pengumuman';
import AjukanPeminjaman from './pages/Public/AjukanPeminjaman';
import StatusPeminjaman from './pages/Public/StatusPeminjaman';
import KegiatanPublik from './pages/Public/Kegiatan';

// Admin Pages
import Dashboard from './pages/Admin/Dashboard';

import KeuanganIndex from './pages/Admin/Keuangan/Index';
import InputKas from './pages/Admin/Keuangan/InputKas';

import KegiatanIndex from './pages/Admin/Kegiatan/Index';
import KegiatanForm from './pages/Admin/Kegiatan/Form';

import AsetIndex from './pages/Admin/Aset/Index';
import AsetForm from './pages/Admin/Aset/Form';

import FasilitasIndex from './pages/Admin/Fasilitas/Index';
import FasilitasForm from './pages/Admin/Fasilitas/Form';

import PemeliharaanIndex from './pages/Admin/Pemeliharaan/Index';
import PemeliharaanForm from './pages/Admin/Pemeliharaan/Form';

import PeminjamanIndex from './pages/Admin/Peminjaman/Index';

import PengumumanIndex from './pages/Admin/Pengumuman/Index';
import PengumumanForm from './pages/Admin/Pengumuman/Form';

import PenggunaIndex from './pages/Admin/Pengguna/Index';
import PenggunaForm from './pages/Admin/Pengguna/Form';

import Profil from './pages/Public/Profil';
import Notifikasi from './pages/Admin/Notifikasi';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ToastProvider>
          <Routes>
            {/* Public Routes */}
            <Route element={<PublicLayout />}>
              <Route path="/" element={<Beranda />} />
              <Route path="/pengumuman" element={<PengumumanPublik />} />
              <Route path="/peminjaman/ajukan" element={<AjukanPeminjaman />} />
              <Route path="/peminjaman/status" element={<StatusPeminjaman />} />
              <Route path="/kegiatan" element={<KegiatanPublik />} />
              <Route path="/profil" element={<Profil />} />
            </Route>

            {/* Auth Routes */}
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />

            {/* Admin Routes — Protected */}
            <Route
              path="/admin"
              element={
                <ProtectedRoute roles={['admin', 'pengurus']}>
                  <AdminLayout />
                </ProtectedRoute>
              }
            >
              <Route index element={<Dashboard />} />

              <Route path="keuangan" element={<KeuanganIndex />} />
              <Route path="keuangan/input" element={<InputKas />} />
              <Route path="keuangan/input/:id" element={<InputKas />} />

              <Route path="kegiatan" element={<KegiatanIndex />} />
              <Route path="kegiatan/form" element={<KegiatanForm />} />
              <Route path="kegiatan/form/:id" element={<KegiatanForm />} />

              <Route path="aset" element={<AsetIndex />} />
              <Route path="aset/form" element={<AsetForm />} />
              <Route path="aset/form/:id" element={<AsetForm />} />

              <Route path="fasilitas" element={<FasilitasIndex />} />
              <Route path="fasilitas/form" element={<FasilitasForm />} />
              <Route path="fasilitas/form/:id" element={<FasilitasForm />} />

              <Route path="pemeliharaan" element={<PemeliharaanIndex />} />
              <Route path="pemeliharaan/form" element={<PemeliharaanForm />} />
              <Route path="pemeliharaan/form/:id" element={<PemeliharaanForm />} />

              <Route path="peminjaman" element={<PeminjamanIndex />} />

              <Route path="pengumuman" element={<PengumumanIndex />} />
              <Route path="pengumuman/form" element={<PengumumanForm />} />
              <Route path="pengumuman/form/:id" element={<PengumumanForm />} />

              <Route path="pengguna" element={<PenggunaIndex />} />
              <Route path="pengguna/form" element={<PenggunaForm />} />
              <Route path="pengguna/form/:id" element={<PenggunaForm />} />

              <Route path="profil" element={<Navigate to="/profil" replace />} />
              <Route path="notifikasi" element={<Notifikasi />} />
            </Route>

            {/* Fallback */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </ToastProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
