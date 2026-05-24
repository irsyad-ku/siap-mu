import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import api from '../../utils/api';

const Profil = () => {
    const { isAuthenticated, user, setUser } = useAuth();
    const toast = useToast();
    const navigate = useNavigate();
    const fileInputRef = useRef(null);

    const [form, setForm] = useState({
        nama: '',
        email: '',
        no_hp: '',
        password: '',
        password_confirmation: ''
    });

    const [fotoFile, setFotoFile] = useState(null);
    const [fotoPreview, setFotoPreview] = useState(null);
    const [loading, setLoading] = useState(false);

    // Guard route: redirect if not authenticated
    useEffect(() => {
        if (!isAuthenticated) {
            toast.error('Silakan login terlebih dahulu untuk mengakses halaman profil.');
            navigate('/login');
        }
    }, [isAuthenticated, navigate, toast]);

    // Prefill form only when the user object changes
    useEffect(() => {
        if (user) {
            setForm({
                nama: user.nama || '',
                email: user.email || '',
                no_hp: user.no_hp || '',
                password: '',
                password_confirmation: ''
            });
            const hasCustom = user.foto_url && !user.foto_url.endsWith('default-avatar.png');
            setFotoPreview(hasCustom ? user.foto_url : null);
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;

        // Validation: Must be image
        if (!file.type.startsWith('image/')) {
            toast.error('Berkas harus berupa gambar (JPG, PNG, atau GIF).');
            return;
        }

        // Validation: Max 2MB
        if (file.size > 2 * 1024 * 1024) {
            toast.error('Ukuran gambar maksimal adalah 2MB.');
            return;
        }

        setFotoFile(file);
        setFotoPreview(URL.createObjectURL(file));
        toast.info('Pratinjau foto profil berhasil dimuat.');
    };

    const triggerFileSelect = () => {
        fileInputRef.current.click();
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (form.password && form.password.length < 6) {
            toast.error('Kata sandi baru minimal harus 6 karakter.');
            return;
        }

        if (form.password && form.password !== form.password_confirmation) {
            toast.error('Konfirmasi kata sandi baru tidak cocok.');
            return;
        }

        setLoading(true);
        try {
            const formData = new FormData();
            formData.append('nama', form.nama);
            formData.append('email', form.email);
            formData.append('no_hp', form.no_hp || '');
            
            if (form.password) {
                formData.append('password', form.password);
                formData.append('password_confirmation', form.password_confirmation);
            }

            if (fotoFile) {
                formData.append('foto', fotoFile);
            }

            const res = await api.post('/profile', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            const updatedUser = res.data.data;

            // Sync with global auth state and localStorage
            setUser(updatedUser);
            localStorage.setItem('user', JSON.stringify(updatedUser));

            toast.success('Profil Anda berhasil diperbarui!');
            
            // Reset passwords
            setForm(prev => ({
                ...prev,
                password: '',
                password_confirmation: ''
            }));
            setFotoFile(null);
        } catch (err) {
            console.error(err);
            toast.error(err.response?.data?.message || 'Gagal memperbarui profil.');
        } finally {
            setLoading(false);
        }
    };

    if (!user) return null;

    const hasCustomAvatar = user.foto_url && !user.foto_url.endsWith('default-avatar.png');

    return (
        <div className="pt-28 pb-16 px-margin-mobile md:px-margin-desktop bg-gradient-to-br from-[#E8F5EF] via-[#F4FCF7] to-[#FFFFFF] min-h-screen relative overflow-hidden">
            {/* Ambient Background Decorative Blobs */}
            <div className="absolute -top-10 -left-10 w-80 h-80 bg-[#005440]/5 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#0A7C5F]/5 rounded-full blur-[100px] pointer-events-none"></div>
            <div className="absolute bottom-10 left-10 w-80 h-80 bg-[#27AE60]/5 rounded-full blur-[80px] pointer-events-none"></div>

            {/* Header section with gradient background card */}
            <div className="max-w-4xl mx-auto mb-lg relative overflow-hidden rounded-2xl bg-gradient-to-r from-[#005440] to-[#0A7C5F] text-white p-lg md:p-xl shadow-lg border border-[#A7F3D0]/20">
                <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-xl"></div>
                <div className="relative z-10">
                    <span className="bg-white/10 text-white text-[11px] font-bold tracking-widest uppercase px-sm py-1 rounded-full mb-sm inline-block">Halaman Akun</span>
                    <h1 className="font-headline-lg text-headline-lg md:text-headline-xl font-bold">Profil Jamaah</h1>
                    <p className="font-body-md text-body-md text-white/80 mt-xs">Kelola data pribadi, nomor kontak, kata sandi, dan foto profil Anda secara mandiri.</p>
                </div>
            </div>

            <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-lg items-start relative z-10">
                
                {/* Left Panel: Circular Profile Picture & General Info */}
                <div className="bg-white/85 backdrop-blur-md rounded-2xl border border-[#A7F3D0]/60 shadow-md p-lg flex flex-col items-center text-center space-y-md relative overflow-hidden transition-all duration-300 hover:shadow-lg">
                    {/* Decorative Top Accent */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#005440] to-[#0A7C5F]"></div>

                    <div className="relative group cursor-pointer pt-md" onClick={triggerFileSelect}>
                        {/* Circle Avatar Wrapper with pulsing glow effect */}
                        <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-[#005440]/20 bg-[#005440]/5 flex items-center justify-center shadow-lg relative transition-all duration-300 group-hover:scale-105 group-hover:border-[#005440]/40">
                            {fotoPreview ? (
                                <img 
                                    src={fotoPreview} 
                                    alt="Foto Profil" 
                                    className="w-full h-full object-cover" 
                                />
                            ) : (
                                <div className="w-full h-full bg-[#005440]/10 flex items-center justify-center">
                                    <span className="text-[44px] font-bold text-[#005440]">
                                        {user.nama ? user.nama.charAt(0).toUpperCase() : 'J'}
                                    </span>
                                </div>
                            )}

                            {/* Camera Edit Hover Overlay */}
                            <div className="absolute inset-0 bg-[#005440]/70 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center text-white">
                                <span className="material-symbols-outlined text-headline-md">photo_camera</span>
                                <span className="text-[10px] uppercase font-bold tracking-wider mt-1">Ubah Foto</span>
                            </div>
                        </div>

                        {/* Floating Action Button */}
                        <div className="absolute bottom-1 right-1 bg-[#005440] text-white p-xs rounded-full shadow-md flex items-center justify-center border-2 border-white hover:bg-[#0A7C5F] transition-all duration-200">
                            <span className="material-symbols-outlined text-[16px]">edit</span>
                        </div>
                    </div>

                    {/* Hidden Native File Input */}
                    <input 
                        type="file" 
                        ref={fileInputRef} 
                        onChange={handleFileChange} 
                        accept="image/*" 
                        className="hidden" 
                    />

                    <div className="w-full">
                        <h3 className="font-headline-md text-headline-md font-bold text-on-surface truncate px-sm">{user.nama}</h3>
                        <div className="flex items-center justify-center gap-xs mt-xs">
                            <span className="text-xs bg-[#005440]/10 text-[#005440] px-sm py-0.5 rounded-full uppercase font-bold tracking-wide">
                                {user.role === 'warga' ? 'Jamaah / Warga' : user.role}
                            </span>
                        </div>
                    </div>
                    
                    <div className="w-full border-t border-[#A7F3D0]/60 pt-md space-y-sm text-left">
                        <div className="flex justify-between items-center text-body-md">
                            <span className="text-on-surface-variant text-sm">Status Akun:</span>
                            <span className="px-2.5 py-0.5 rounded-full bg-[#27AE60]/10 text-[#27AE60] font-bold text-[10px] tracking-wide">AKTIF</span>
                        </div>
                        <div className="flex justify-between items-center text-body-md">
                            <span className="text-on-surface-variant text-sm">Anggota Sejak:</span>
                            <span className="text-on-surface text-sm font-medium">{user.created_at || '-'}</span>
                        </div>
                        <div className="flex justify-between items-center text-body-md">
                            <span className="text-on-surface-variant text-sm">Login Terakhir:</span>
                            <span className="text-on-surface text-sm font-medium truncate max-w-[150px]">{user.last_login || 'Baru saja'}</span>
                        </div>
                    </div>
                </div>

                {/* Right Panel: Identity & Security Forms */}
                <div className="bg-white/90 backdrop-blur-md rounded-2xl border border-[#A7F3D0]/60 shadow-md p-lg md:col-span-2 relative overflow-hidden transition-all duration-300 hover:shadow-lg">
                    {/* Decorative Top Accent */}
                    <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#0A7C5F] to-[#005440]"></div>

                    <form onSubmit={handleSubmit} className="space-y-lg pt-sm">
                        
                        <div className="flex items-center gap-xs border-b border-[#A7F3D0]/60 pb-xs">
                            <span className="material-symbols-outlined text-[#005440]">badge</span>
                            <h4 className="font-title-lg text-title-lg text-[#005440] font-bold">Informasi Pribadi</h4>
                        </div>
                        
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
                            <div className="relative border border-[#A7F3D0] rounded-xl focus-within:border-[#005440] focus-within:ring-2 focus-within:ring-[#005440]/10 transition-all bg-white/50 focus-within:bg-white">
                                <label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-semibold text-[#005440]">Nama Lengkap</label>
                                <input 
                                    name="nama" 
                                    value={form.nama} 
                                    onChange={handleChange} 
                                    className="w-full bg-transparent border-none focus:ring-0 text-body-lg font-body-lg text-on-surface p-md rounded-xl" 
                                    type="text" 
                                    placeholder="Masukkan nama" 
                                    required 
                                />
                            </div>
                            <div className="relative border border-[#A7F3D0] rounded-xl focus-within:border-[#005440] focus-within:ring-2 focus-within:ring-[#005440]/10 transition-all bg-white/50 focus-within:bg-white">
                                <label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-semibold text-[#005440]">Alamat Email</label>
                                <input 
                                    name="email" 
                                    value={form.email} 
                                    onChange={handleChange} 
                                    className="w-full bg-transparent border-none focus:ring-0 text-body-lg font-body-lg text-on-surface p-md rounded-xl" 
                                    type="email" 
                                    placeholder="Masukkan email" 
                                    required 
                                />
                            </div>
                        </div>

                        <div className="relative border border-[#A7F3D0] rounded-xl focus-within:border-[#005440] focus-within:ring-2 focus-within:ring-[#005440]/10 transition-all bg-white/50 focus-within:bg-white">
                            <label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-semibold text-[#005440]">Nomor Handphone (HP)</label>
                            <input 
                                name="no_hp" 
                                value={form.no_hp} 
                                onChange={handleChange} 
                                className="w-full bg-transparent border-none focus:ring-0 text-body-lg font-body-lg text-on-surface p-md rounded-xl" 
                                type="text" 
                                placeholder="Contoh: 08123456789" 
                            />
                        </div>

                        <div className="flex items-center gap-xs border-b border-[#A7F3D0]/60 pb-xs pt-md">
                            <span className="material-symbols-outlined text-[#005440]">security</span>
                            <h4 className="font-title-lg text-title-lg text-[#005440] font-bold">Keamanan & Sandi</h4>
                        </div>
                        <p className="font-label-md text-label-md text-on-surface-variant bg-[#005440]/5 p-sm rounded-lg border-l-4 border-[#005440]/30">Kosongkan kolom di bawah ini jika Anda tidak ingin merubah kata sandi login saat ini.</p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-md">
                            <div className="relative border border-[#A7F3D0] rounded-xl focus-within:border-[#005440] focus-within:ring-2 focus-within:ring-[#005440]/10 transition-all bg-white/50 focus-within:bg-white">
                                <label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-semibold text-[#005440]">Kata Sandi Baru</label>
                                <input 
                                    name="password" 
                                    value={form.password} 
                                    onChange={handleChange} 
                                    className="w-full bg-transparent border-none focus:ring-0 text-body-lg font-body-lg text-on-surface p-md rounded-xl" 
                                    type="password" 
                                    placeholder="Minimal 6 karakter" 
                                />
                            </div>
                            <div className="relative border border-[#A7F3D0] rounded-xl focus-within:border-[#005440] focus-within:ring-2 focus-within:ring-[#005440]/10 transition-all bg-white/50 focus-within:bg-white">
                                <label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-semibold text-[#005440]">Konfirmasi Sandi Baru</label>
                                <input 
                                    name="password_confirmation" 
                                    value={form.password_confirmation} 
                                    onChange={handleChange} 
                                    className="w-full bg-transparent border-none focus:ring-0 text-body-lg font-body-lg text-on-surface p-md rounded-xl" 
                                    type="password" 
                                    placeholder="Ulangi sandi baru" 
                                />
                            </div>
                        </div>

                        <div className="pt-lg border-t border-[#A7F3D0]/60 flex justify-end">
                            <button 
                                type="submit" 
                                disabled={loading} 
                                className="px-lg py-md rounded-xl bg-gradient-to-r from-[#005440] to-[#0A7C5F] hover:from-[#004030] hover:to-[#08634C] text-white font-title-md shadow-md flex items-center gap-xs disabled:opacity-50 hover:shadow-lg transition-all transform active:scale-95 duration-200"
                            >
                                {loading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                                <span className="material-symbols-outlined text-[20px]">save</span>
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
