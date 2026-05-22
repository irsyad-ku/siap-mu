import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../utils/api';
import { useToast } from '../../../contexts/ToastContext';

const PengumumanForm = () => {
    const { id } = useParams();
    const isEdit = !!id;
    const [form, setForm] = useState({
        judul: '',
        isi: '',
        tanggal: new Date().toISOString().slice(0, 10),
        is_aktif: true
    });
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(isEdit);
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        if (isEdit) {
            setFetching(true);
            api.get(`/pengumuman/${id}`).then(res => {
                const d = res.data.data || res.data;
                setForm({
                    judul: d.judul || '',
                    isi: d.isi || '',
                    tanggal: d.tanggal?.slice(0, 10) || '',
                    is_aktif: d.is_aktif ?? true,
                });
            }).catch(() => toast.error('Gagal memuat data pengumuman.'))
              .finally(() => setFetching(false));
        }
    }, [id, isEdit, toast]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isEdit) {
                await api.put(`/pengumuman/${id}`, form);
                toast.success('Pengumuman berhasil diperbarui!');
            } else {
                await api.post('/pengumuman', form);
                toast.success('Pengumuman berhasil ditambahkan!');
            }
            navigate('/admin/pengumuman');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Gagal menyimpan pengumuman.');
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
            <h2 className="font-headline-xl text-headline-xl text-primary mb-xs">{isEdit ? 'Edit Pengumuman' : 'Buat Pengumuman'}</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-xl">Isi judul dan konten pengumuman untuk disebarkan kepada jamaah.</p>
            <div className="bg-white rounded-xl border border-[#D1FAE5] ambient-shadow-lvl1 p-lg max-w-3xl">
                <form onSubmit={handleSubmit} className="space-y-lg">
                    <div className="relative border border-outline-variant rounded-lg focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                        <label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-label-md text-primary">Judul Pengumuman</label>
                        <input name="judul" value={form.judul} onChange={handleChange} className="w-full bg-transparent border-none focus:ring-0 text-body-lg font-body-lg text-on-surface p-md rounded-lg" type="text" placeholder="Masukkan judul pengumuman" required />
                    </div>
                    
                    <div className="relative border border-outline-variant rounded-lg focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                        <label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-label-md text-primary">Isi Pengumuman</label>
                        <textarea name="isi" value={form.isi} onChange={handleChange} className="w-full bg-transparent border-none focus:ring-0 text-body-lg font-body-lg text-on-surface p-md rounded-lg resize-none" rows="8" placeholder="Tulis pengumuman secara detail di sini..." required></textarea>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                        <div className="relative border border-outline-variant rounded-lg focus-within:border-primary transition-all">
                            <label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-label-md text-primary">Tanggal Publikasi</label>
                            <input name="tanggal" value={form.tanggal} onChange={handleChange} className="w-full bg-transparent border-none focus:ring-0 p-md rounded-lg" type="date" required />
                        </div>
                        <div className="flex items-center gap-sm px-sm">
                            <input type="checkbox" id="is_aktif" name="is_aktif" checked={form.is_aktif} onChange={handleChange} className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary" />
                            <label htmlFor="is_aktif" className="font-body-md text-body-md text-on-surface">Aktifkan pengumuman (langsung terbit)</label>
                        </div>
                    </div>

                    <div className="pt-lg border-t border-outline-variant flex justify-end gap-md">
                        <button type="button" onClick={() => navigate('/admin/pengumuman')} className="px-6 py-2.5 rounded-lg border border-primary text-primary font-title-md hover:bg-primary-container/5 transition-colors">Batal</button>
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

export default PengumumanForm;
