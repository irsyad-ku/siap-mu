import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import api from '../../../utils/api';
import { useToast } from '../../../contexts/ToastContext';

const AsetForm = () => {
    const { id } = useParams();
    const isEdit = !!id;
    const [form, setForm] = useState({
        nama_aset: '', kategori: '', kondisi: 'baik', jumlah: 1,
        satuan: 'unit', nilai_aset: 0, tahun_perolehan: '', lokasi_aset: '', keterangan: ''
    });
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        if (isEdit) {
            api.get(`/aset/${id}`).then(res => {
                const d = res.data.data || res.data;
                setForm({ nama_aset: d.nama_aset||'', kategori: d.kategori||'', kondisi: d.kondisi||'baik', jumlah: d.jumlah||1, satuan: d.satuan||'unit', nilai_aset: d.nilai_aset||0, tahun_perolehan: d.tahun_perolehan||'', lokasi_aset: d.lokasi_aset||'', keterangan: d.keterangan||'' });
            }).catch(() => toast.error('Gagal memuat data.'));
        }
    }, [id, isEdit, toast]);

    const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            if (isEdit) { await api.put(`/aset/${id}`, form); toast.success('Aset berhasil diperbarui!'); }
            else { await api.post('/aset', form); toast.success('Aset berhasil ditambahkan!'); }
            navigate('/admin/aset');
        } catch (err) { toast.error(err.response?.data?.message || 'Gagal menyimpan aset.'); }
        finally { setLoading(false); }
    };

    return (
        <>
            <h2 className="font-headline-xl text-headline-xl text-primary mb-xs">{isEdit ? 'Edit Aset' : 'Tambah Aset'}</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-xl">Catat aset baru milik masjid.</p>
            <div className="bg-white rounded-xl border border-[#D1FAE5] ambient-shadow-lvl1 p-lg max-w-3xl">
                <form onSubmit={handleSubmit} className="space-y-lg">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                        <div className="relative border border-outline-variant rounded-lg focus-within:border-primary transition-all"><label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-label-md text-primary">Nama Aset</label><input name="nama_aset" value={form.nama_aset} onChange={handleChange} className="w-full bg-transparent border-none focus:ring-0 p-md rounded-lg" type="text" required /></div>
                        <div className="relative border border-outline-variant rounded-lg focus-within:border-primary transition-all"><label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-label-md text-primary">Kategori</label><input name="kategori" value={form.kategori} onChange={handleChange} className="w-full bg-transparent border-none focus:ring-0 p-md rounded-lg" type="text" required /></div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-lg">
                        <div className="relative border border-outline-variant rounded-lg focus-within:border-primary transition-all"><label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-label-md text-primary">Kondisi</label><select name="kondisi" value={form.kondisi} onChange={handleChange} className="w-full bg-transparent border-none focus:ring-0 p-md rounded-lg"><option value="baik">Baik</option><option value="perlu_perawatan">Perlu Perawatan</option><option value="rusak">Rusak</option></select></div>
                        <div className="relative border border-outline-variant rounded-lg focus-within:border-primary transition-all"><label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-label-md text-primary">Jumlah</label><input name="jumlah" value={form.jumlah} onChange={handleChange} className="w-full bg-transparent border-none focus:ring-0 p-md rounded-lg" type="number" /></div>
                        <div className="relative border border-outline-variant rounded-lg focus-within:border-primary transition-all"><label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-label-md text-primary">Nilai Aset (Rp)</label><input name="nilai_aset" value={form.nilai_aset} onChange={handleChange} className="w-full bg-transparent border-none focus:ring-0 p-md rounded-lg" type="number" /></div>
                    </div>
                    <div className="relative border border-outline-variant rounded-lg focus-within:border-primary transition-all"><label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-label-md text-primary">Keterangan</label><textarea name="keterangan" value={form.keterangan} onChange={handleChange} className="w-full bg-transparent border-none focus:ring-0 p-md rounded-lg resize-none" rows="3"></textarea></div>
                    <div className="pt-lg border-t border-outline-variant flex justify-end gap-md">
                        <button type="button" onClick={() => navigate('/admin/aset')} className="px-6 py-2.5 rounded-lg border border-primary text-primary font-title-md hover:bg-primary-container/5 transition-colors">Batal</button>
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

export default AsetForm;
