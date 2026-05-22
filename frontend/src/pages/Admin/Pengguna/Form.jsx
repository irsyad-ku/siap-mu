import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../utils/api';
import { useToast } from '../../../contexts/ToastContext';

const PenggunaForm = () => {
    const { id } = useParams();
    const isEdit = !!id;
    const [form, setForm] = useState({
        nama: '',
        email: '',
        role: 'warga',
        no_hp: '',
        is_active: true,
        password: '',
        password_confirmation: ''
    });
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(isEdit);
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        if (isEdit) {
            setFetching(true);
            api.get(`/users/${id}`).then(res => {
                const d = res.data.data || res.data;
                setForm({
                    nama: d.nama || '',
                    email: d.email || '',
                    role: d.role || 'warga',
                    no_hp: d.no_hp || '',
                    is_active: d.is_active ?? true,
                    password: '',
                    password_confirmation: ''
                });
            }).catch(() => toast.error('Gagal memuat data pengguna.'))
              .finally(() => setFetching(false));
        }
    }, [id, isEdit, toast]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Validation for new user password
        if (!isEdit && (!form.password || form.password.length < 8)) {
            toast.error('Password minimal 8 karakter.');
            return;
        }

        if (form.password && form.password !== form.password_confirmation) {
            toast.error('Konfirmasi password tidak cocok.');
            return;
        }

        setLoading(true);
        try {
            // Prepare payload
            const payload = {
                nama: form.nama,
                email: form.email,
                role: form.role,
                no_hp: form.no_hp || null,
                is_active: form.is_active
            };
            if (form.password) {
                payload.password = form.password;
                payload.password_confirmation = form.password_confirmation;
            }

            if (isEdit) {
                await api.put(`/users/${id}`, payload);
                toast.success('Pengguna berhasil diperbarui!');
            } else {
                await api.post('/users', payload);
                toast.success('Pengguna berhasil ditambahkan!');
            }
            navigate('/admin/pengguna');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Gagal menyimpan data pengguna.');
        } finally {
            setLoading(false);
        }
    };

    if (fetching) {
        return (
            <div className="flex items-center justify-center py-xl">
                <div className="w-8 h-8 border-3 border-primary/30 border-t-primary rounded-full animate-spin"></div>
            </div>
        );
    }

    return (
        <>
            <h2 className="font-headline-xl text-headline-xl text-primary mb-xs">{isEdit ? 'Edit Pengguna' : 'Tambah Pengguna'}</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-xl">Atur informasi akun, peranan (role), dan hak akses sistem.</p>
            <div className="bg-white rounded-xl border border-[#D1FAE5] ambient-shadow-lvl1 p-lg max-w-3xl">
                <form onSubmit={handleSubmit} className="space-y-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                        <div className="relative border border-outline-variant rounded-lg focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                            <label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-label-md text-primary">Nama Lengkap</label>
                            <input name="nama" value={form.nama} onChange={handleChange} className="w-full bg-transparent border-none focus:ring-0 text-body-lg font-body-lg text-on-surface p-md rounded-lg" type="text" placeholder="Nama lengkap" required />
                        </div>
                        <div className="relative border border-outline-variant rounded-lg focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                            <label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-label-md text-primary">Alamat Email</label>
                            <input name="email" value={form.email} onChange={handleChange} className="w-full bg-transparent border-none focus:ring-0 text-body-lg font-body-lg text-on-surface p-md rounded-lg" type="email" placeholder="Email aktif" required />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                        <div className="relative border border-outline-variant rounded-lg focus-within:border-primary transition-all">
                            <label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-label-md text-primary">Role Pengguna</label>
                            <select name="role" value={form.role} onChange={handleChange} className="w-full bg-transparent border-none focus:ring-0 p-md rounded-lg text-body-lg font-body-lg text-on-surface">
                                <option value="warga">Warga</option>
                                <option value="pengurus">Pengurus</option>
                                <option value="admin">Admin</option>
                            </select>
                        </div>
                        <div className="relative border border-outline-variant rounded-lg focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                            <label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-label-md text-primary">Nomor HP</label>
                            <input name="no_hp" value={form.no_hp} onChange={handleChange} className="w-full bg-transparent border-none focus:ring-0 text-body-lg font-body-lg text-on-surface p-md rounded-lg" type="text" placeholder="Contoh: 08123456789" />
                        </div>
                    </div>

                    <div className="flex items-center gap-sm px-sm">
                        <input type="checkbox" id="is_active" name="is_active" checked={form.is_active} onChange={handleChange} className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary" />
                        <label htmlFor="is_active" className="font-body-md text-body-md text-on-surface">Akun aktif (bisa digunakan untuk login)</label>
                    </div>

                    <div className="pt-md border-t border-outline-variant">
                        <h3 className="font-title-lg text-title-lg text-primary mb-sm">{isEdit ? 'Ubah Kata Sandi (Opsional)' : 'Kata Sandi Baru'}</h3>
                        <p className="font-label-md text-label-md text-on-surface-variant mb-md">{isEdit ? 'Biarkan kosong jika tidak ingin mengganti kata sandi.' : 'Tentukan sandi masuk pengguna.'}</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                            <div className="relative border border-outline-variant rounded-lg focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                                <label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-label-md text-primary">Kata Sandi</label>
                                <input name="password" value={form.password} onChange={handleChange} className="w-full bg-transparent border-none focus:ring-0 text-body-lg font-body-lg text-on-surface p-md rounded-lg" type="password" placeholder="Kata sandi" required={!isEdit} />
                            </div>
                            <div className="relative border border-outline-variant rounded-lg focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                                <label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-label-md text-primary">Konfirmasi Sandi</label>
                                <input name="password_confirmation" value={form.password_confirmation} onChange={handleChange} className="w-full bg-transparent border-none focus:ring-0 text-body-lg font-body-lg text-on-surface p-md rounded-lg" type="password" placeholder="Konfirmasi kata sandi" required={!isEdit} />
                            </div>
                        </div>
                    </div>

                    <div className="pt-lg border-t border-outline-variant flex justify-end gap-md">
                        <button type="button" onClick={() => navigate('/admin/pengguna')} className="px-6 py-2.5 rounded-lg border border-primary text-primary font-title-md hover:bg-primary-container/5 transition-colors">Batal</button>
                        <button type="submit" disabled={loading} className="px-6 py-2.5 rounded-lg btn-primary text-white font-title-md shadow-md flex items-center gap-sm disabled:opacity-50">
                            {loading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                            {loading ? 'Menyimpan...' : 'Simpan'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default PenggunaForm;
