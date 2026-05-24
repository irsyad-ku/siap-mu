import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import api from '../../utils/api';

const Profil = () => {
    const { user, setUser } = useAuth();
    const toast = useToast();
    const avatarUrl = user?.foto_url && !user.foto_url.includes('ui-avatars.com') && !user.foto_url.endsWith('default-avatar.png')
        ? user.foto_url
        : null;
    const [form, setForm] = useState({
        nama: user?.nama || '',
        email: user?.email || '',
        no_hp: user?.no_hp || '',
        password: '',
        password_confirmation: ''
    });
    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password && form.password.length < 8) {
            toast.error('Kata sandi baru minimal harus 8 karakter.');
            return;
        }

        if (form.password && form.password !== form.password_confirmation) {
            toast.error('Konfirmasi kata sandi baru tidak cocok.');
            return;
        }

        setLoading(true);
        try {
            const payload = {
                nama: form.nama,
                email: form.email,
                no_hp: form.no_hp || null,
                role: user.role, // preserve role
                is_active: user.is_active // preserve status
            };

            if (form.password) {
                payload.password = form.password;
                payload.password_confirmation = form.password_confirmation;
            }

            const res = await api.put(`/users/${user.id_user}`, payload);
            const updatedUser = res.data.data || res.data;

            // Update local state and storage
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));

            toast.success('Profil Anda berhasil diperbarui!');
            
            // Clear password fields
            setForm(prev => ({ ...prev, password: '', password_confirmation: '' }));
        } catch (err) {
            toast.error(err.response?.data?.message || 'Gagal memperbarui profil.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="max-w-4xl mx-auto space-y-xl">
            <div>
                <h2 className="font-headline-xl text-headline-xl text-primary mb-xs">Profil Saya</h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant">Kelola informasi pribadi, kontak, dan kata sandi akun Anda.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-xl items-start">
                {/* Left Side: Avatar Card */}
                <div className="bg-white rounded-xl border border-[#D1FAE5] ambient-shadow-lvl1 p-lg flex flex-col items-center text-center space-y-md">
                    <div className="relative group">
                        <div className="w-28 h-28 rounded-full overflow-hidden border-4 border-primary/20 bg-primary-container/20 flex items-center justify-center shadow-md">
                            {avatarUrl ? (
                                <img src={avatarUrl} alt={user?.nama} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-bold text-4xl">
                                    {user?.nama?.charAt(0).toUpperCase() || 'U'}
                                </div>
                            )}
                        </div>
                    </div>
                    <div>
                        <h3 className="font-headline-md text-headline-md font-bold text-on-surface">{user?.nama}</h3>
                        <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider mt-xs">{user?.role}</p>
                    </div>
                    
                    <div className="w-full border-t border-outline-variant pt-md space-y-sm text-left">
                        <div className="flex justify-between items-center text-body-md">
                            <span className="text-on-surface-variant">Status Akun:</span>
                            <span className="px-2 py-0.5 rounded-full bg-[#27AE60]/10 text-[#27AE60] font-bold text-[10px]">AKTIF</span>
                        </div>
                        <div className="flex justify-between items-center text-body-md">
                            <span className="text-on-surface-variant">Terdaftar Pada:</span>
                            <span className="text-on-surface font-medium">{user?.created_at ? new Date(user.created_at).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'}</span>
                        </div>
                        <div className="flex justify-between items-center text-body-md">
                            <span className="text-on-surface-variant">Login Terakhir:</span>
                            <span className="text-on-surface font-medium text-xs truncate max-w-[150px]">{user?.last_login ? new Date(user.last_login).toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' }) : 'Baru saja'}</span>
                        </div>
                    </div>
                </div>

                {/* Right Side: Update Form Card */}
                <div className="bg-white rounded-xl border border-[#D1FAE5] ambient-shadow-lvl1 p-lg md:col-span-2">
                    <form onSubmit={handleSubmit} className="space-y-lg">
                        <h4 className="font-title-lg text-title-lg text-primary border-b border-outline-variant pb-xs">Informasi Pribadi</h4>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
                            <div className="relative border border-outline-variant rounded-lg focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                                <label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-label-md text-primary">Nama Lengkap</label>
                                <input name="nama" value={form.nama} onChange={handleChange} className="w-full bg-transparent border-none focus:ring-0 text-body-lg font-body-lg text-on-surface p-md rounded-lg" type="text" placeholder="Masukkan nama" required />
                            </div>
                            <div className="relative border border-outline-variant rounded-lg focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                                <label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-label-md text-primary">Alamat Email</label>
                                <input name="email" value={form.email} onChange={handleChange} className="w-full bg-transparent border-none focus:ring-0 text-body-lg font-body-lg text-on-surface p-md rounded-lg" type="email" placeholder="Masukkan email" required />
                            </div>
                        </div>

                        <div className="relative border border-outline-variant rounded-lg focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                            <label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-label-md text-primary">Nomor Handphone (HP)</label>
                            <input name="no_hp" value={form.no_hp} onChange={handleChange} className="w-full bg-transparent border-none focus:ring-0 text-body-lg font-body-lg text-on-surface p-md rounded-lg" type="text" placeholder="Contoh: 08123456789" />
                        </div>

                        <h4 className="font-title-lg text-title-lg text-primary border-b border-outline-variant pb-xs pt-md">Keamanan & Kata Sandi</h4>
                        <p className="font-label-md text-label-md text-on-surface-variant">Kosongkan kolom sandi di bawah ini jika tidak ingin mengubah kata sandi masuk Anda.</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
                            <div className="relative border border-outline-variant rounded-lg focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                                <label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-label-md text-primary">Kata Sandi Baru</label>
                                <input name="password" value={form.password} onChange={handleChange} className="w-full bg-transparent border-none focus:ring-0 text-body-lg font-body-lg text-on-surface p-md rounded-lg" type="password" placeholder="Minimal 8 karakter" />
                            </div>
                            <div className="relative border border-outline-variant rounded-lg focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                                <label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-label-md text-primary">Konfirmasi Sandi Baru</label>
                                <input name="password_confirmation" value={form.password_confirmation} onChange={handleChange} className="w-full bg-transparent border-none focus:ring-0 text-body-lg font-body-lg text-on-surface p-md rounded-lg" type="password" placeholder="Ulangi kata sandi baru" />
                            </div>
                        </div>

                        <div className="pt-lg border-t border-outline-variant flex justify-end gap-md">
                            <button type="submit" disabled={loading} className="px-lg py-2.5 rounded-lg btn-primary text-white font-title-md shadow-md flex items-center gap-sm disabled:opacity-50">
                                {loading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                                {loading ? 'Menyimpan Perubahan...' : 'Simpan Perubahan'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Profil;
