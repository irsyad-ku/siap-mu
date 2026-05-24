import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../utils/api';
import { useToast } from '../../../contexts/ToastContext';

const KegiatanForm = () => {
    const { id } = useParams();
    const isEdit = !!id;
    const [form, setForm] = useState({
        nama_kegiatan: '', deskripsi: '', tanggal: '',
        waktu_mulai: '', waktu_selesai: '', lokasi: 'Masjid', is_publik: true, status: 'akan_datang'
    });
    const [loading, setLoading] = useState(false);
    const [fetching, setFetching] = useState(isEdit);
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        if (isEdit) {
            setFetching(true);
            api.get(`/kegiatan/${id}`).then(res => {
                const d = res.data.data || res.data;
                setForm({
                    nama_kegiatan: d.nama_kegiatan || '',
                    deskripsi: d.deskripsi || '',
                    tanggal: d.tanggal?.slice(0, 10) || '',
                    waktu_mulai: d.waktu_mulai || '',
                    waktu_selesai: d.waktu_selesai || '',
                    lokasi: d.lokasi || 'Masjid',
                    is_publik: d.is_publik ?? true,
                    status: d.status || 'akan_datang',
                });
            }).catch(() => toast.error('Gagal memuat data.')).finally(() => setFetching(false));
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
                await api.put(`/kegiatan/${id}`, form);
                toast.success('Kegiatan berhasil diperbarui!');
            } else {
                await api.post('/kegiatan', form);
                toast.success('Kegiatan berhasil ditambahkan!');
            }
            navigate('/admin/kegiatan');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Gagal menyimpan kegiatan.');
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
            <h2 className="font-headline-xl text-headline-xl text-primary mb-xs">{isEdit ? 'Edit Kegiatan' : 'Tambah Kegiatan'}</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-xl">Isi detail kegiatan di bawah ini.</p>
            <div className="bg-white rounded-xl border border-[#D1FAE5] ambient-shadow-lvl1 p-lg max-w-3xl">
                <form onSubmit={handleSubmit} className="space-y-lg">
                    <div className="relative border border-outline-variant rounded-lg focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                        <label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-label-md text-primary">Nama Kegiatan</label>
                        <input name="nama_kegiatan" value={form.nama_kegiatan} onChange={handleChange} className="w-full bg-transparent border-none focus:ring-0 text-body-lg font-body-lg text-on-surface p-md rounded-lg" type="text" placeholder="Masukkan nama kegiatan" required />
                    </div>
                    <div className="relative border border-outline-variant rounded-lg focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                        <label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-label-md text-primary">Deskripsi</label>
                        <textarea name="deskripsi" value={form.deskripsi} onChange={handleChange} className="w-full bg-transparent border-none focus:ring-0 text-body-lg font-body-lg text-on-surface p-md rounded-lg resize-none" rows="3" placeholder="Deskripsi kegiatan..."></textarea>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-md">
                        <div className="relative border border-outline-variant rounded-lg focus-within:border-primary transition-all">
                            <label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-label-md text-primary">Tanggal</label>
                            <input name="tanggal" value={form.tanggal} onChange={handleChange} className="w-full bg-transparent border-none focus:ring-0 p-md rounded-lg" type="date" required />
                        </div>
                        <div className="relative border border-outline-variant rounded-lg focus-within:border-primary transition-all">
                            <label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-label-md text-primary">Waktu Mulai</label>
                            <input name="waktu_mulai" value={form.waktu_mulai} onChange={handleChange} className="w-full bg-transparent border-none focus:ring-0 p-md rounded-lg" type="time" required />
                        </div>
                        <div className="relative border border-outline-variant rounded-lg focus-within:border-primary transition-all">
                            <label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-label-md text-primary">Waktu Selesai</label>
                            <input name="waktu_selesai" value={form.waktu_selesai} onChange={handleChange} className="w-full bg-transparent border-none focus:ring-0 p-md rounded-lg" type="time" />
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                        <div className="relative border border-outline-variant rounded-lg focus-within:border-primary transition-all">
                            <label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-label-md text-primary">Lokasi</label>
                            <input name="lokasi" value={form.lokasi} onChange={handleChange} className="w-full bg-transparent border-none focus:ring-0 p-md rounded-lg" type="text" />
                        </div>
                        <div className="relative border border-outline-variant rounded-lg focus-within:border-primary transition-all">
                            <label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-label-md text-primary">Status Kegiatan</label>
                            <select name="status" value={form.status} onChange={handleChange} className="w-full bg-transparent border-none focus:ring-0 p-md rounded-lg text-body-lg font-body-lg text-on-surface">
                                <option value="akan_datang">Akan Datang</option>
                                <option value="berlangsung">Berlangsung</option>
                                <option value="selesai">Selesai</option>
                                <option value="dibatalkan">Dibatalkan</option>
                            </select>
                        </div>
                    </div>
                    <div className="flex items-center gap-sm">
                        <input type="checkbox" id="is_publik" name="is_publik" checked={form.is_publik} onChange={handleChange} className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary" />
                        <label htmlFor="is_publik" className="font-body-md text-body-md text-on-surface">Tampilkan di halaman publik</label>
                    </div>
                    <div className="pt-lg border-t border-outline-variant flex justify-end gap-md">
                        <button type="button" onClick={() => navigate('/admin/kegiatan')} className="px-6 py-2.5 rounded-lg border border-primary text-primary font-title-md hover:bg-primary-container/5 transition-colors">Batal</button>
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

export default KegiatanForm;
