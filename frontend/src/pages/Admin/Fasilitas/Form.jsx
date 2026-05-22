import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../utils/api';
import { useToast } from '../../../contexts/ToastContext';

const FasilitasForm = () => {
    const { id } = useParams();
    const isEdit = !!id;
    const [form, setForm] = useState({ nama_fasilitas: '', kapasitas: '', deskripsi: '', status: 'tersedia' });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        if (isEdit) {
            api.get(`/fasilitas/${id}`).then(res => {
                const d = res.data.data || res.data;
                setForm({ nama_fasilitas: d.nama_fasilitas||'', kapasitas: d.kapasitas||'', deskripsi: d.deskripsi||'', status: d.status||'tersedia' });
            }).catch(() => toast.error('Gagal memuat data.'));
        }
    }, [id, isEdit, toast]);

    const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isEdit) { await api.put(`/fasilitas/${id}`, form); toast.success('Fasilitas berhasil diperbarui!'); }
            else { await api.post('/fasilitas', form); toast.success('Fasilitas berhasil ditambahkan!'); }
            navigate('/admin/fasilitas');
        } catch (err) { toast.error(err.response?.data?.message || 'Gagal menyimpan fasilitas.'); }
        finally { setLoading(false); }
    };

    return (
        <>
            <h2 className="font-headline-xl text-headline-xl text-primary mb-xs">{isEdit ? 'Edit Fasilitas' : 'Tambah Fasilitas'}</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-xl">Daftarkan fasilitas baru masjid.</p>
            <div className="bg-white rounded-xl border border-[#D1FAE5] ambient-shadow-lvl1 p-lg max-w-3xl">
                <form onSubmit={handleSubmit} className="space-y-lg">
                    <div className="relative border border-outline-variant rounded-lg focus-within:border-primary transition-all"><label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-label-md text-primary">Nama Fasilitas</label><input name="nama_fasilitas" value={form.nama_fasilitas} onChange={handleChange} className="w-full bg-transparent border-none focus:ring-0 p-md rounded-lg" type="text" required /></div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                        <div className="relative border border-outline-variant rounded-lg focus-within:border-primary transition-all"><label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-label-md text-primary">Kapasitas</label><input name="kapasitas" value={form.kapasitas} onChange={handleChange} className="w-full bg-transparent border-none focus:ring-0 p-md rounded-lg" type="number" /></div>
                        <div className="relative border border-outline-variant rounded-lg focus-within:border-primary transition-all"><label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-label-md text-primary">Status</label><select name="status" value={form.status} onChange={handleChange} className="w-full bg-transparent border-none focus:ring-0 p-md rounded-lg"><option value="tersedia">Tersedia</option><option value="dipinjam">Dipinjam</option><option value="dalam_perawatan">Dalam Perawatan</option></select></div>
                    </div>
                    <div className="relative border border-outline-variant rounded-lg focus-within:border-primary transition-all"><label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-label-md text-primary">Deskripsi</label><textarea name="deskripsi" value={form.deskripsi} onChange={handleChange} className="w-full bg-transparent border-none focus:ring-0 p-md rounded-lg resize-none" rows="3"></textarea></div>
                    <div className="pt-lg border-t border-outline-variant flex justify-end gap-md">
                        <button type="button" onClick={() => navigate('/admin/fasilitas')} className="px-6 py-2.5 rounded-lg border border-primary text-primary font-title-md hover:bg-primary-container/5 transition-colors">Batal</button>
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

export default FasilitasForm;
