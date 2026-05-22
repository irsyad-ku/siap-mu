import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../utils/api';
import { useToast } from '../../../contexts/ToastContext';

const PemeliharaanForm = () => {
    const [asetList, setAsetList] = useState([]);
    const [form, setForm] = useState({
        id_aset: '', jenis: 'laporan_kerusakan', deskripsi: '', tanggal_lapor: '', biaya: 0
    });
    const [foto, setFoto] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();

    useEffect(() => {
        api.get('/aset').then(res => setAsetList(res.data.data || res.data)).catch(() => {});
    }, []);

    const handleChange = (e) => setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            Object.entries(form).forEach(([k, v]) => formData.append(k, v));
            if (foto) formData.append('foto_kerusakan', foto);

            await api.post('/pemeliharaan', formData, { headers: { 'Content-Type': 'multipart/form-data' } });
            toast.success('Laporan pemeliharaan berhasil dikirim!');
            navigate('/admin/pemeliharaan');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Gagal mengirim laporan.');
        } finally { setLoading(false); }
    };

    return (
        <>
            <h2 className="font-headline-xl text-headline-xl text-primary mb-xs">Lapor Kerusakan / Pemeliharaan</h2>
            <p className="font-body-lg text-body-lg text-on-surface-variant mb-xl">Laporkan kerusakan aset atau jadwalkan pemeliharaan rutin.</p>
            <div className="bg-white rounded-xl border border-[#D1FAE5] ambient-shadow-lvl1 p-lg max-w-3xl">
                <form onSubmit={handleSubmit} className="space-y-lg">
                    <div className="relative border border-outline-variant rounded-lg focus-within:border-primary transition-all">
                        <label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-label-md text-primary">Pilih Aset</label>
                        <select name="id_aset" value={form.id_aset} onChange={handleChange} className="w-full bg-transparent border-none focus:ring-0 p-md rounded-lg" required>
                            <option value="">Pilih Aset...</option>
                            {asetList.map(a => <option key={a.id_aset} value={a.id_aset}>{a.nama_aset} ({a.kategori})</option>)}
                        </select>
                    </div>
                    <div className="relative border border-outline-variant rounded-lg focus-within:border-primary transition-all">
                        <label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-label-md text-primary">Jenis</label>
                        <select name="jenis" value={form.jenis} onChange={handleChange} className="w-full bg-transparent border-none focus:ring-0 p-md rounded-lg">
                            <option value="laporan_kerusakan">Laporan Kerusakan</option>
                            <option value="pemeliharaan_rutin">Pemeliharaan Rutin</option>
                        </select>
                    </div>
                    <div className="relative border border-outline-variant rounded-lg focus-within:border-primary transition-all">
                        <label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-label-md text-primary">Deskripsi</label>
                        <textarea name="deskripsi" value={form.deskripsi} onChange={handleChange} className="w-full bg-transparent border-none focus:ring-0 p-md rounded-lg resize-none" rows="4" placeholder="Jelaskan detail..." required></textarea>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                        <div className="relative border border-outline-variant rounded-lg focus-within:border-primary transition-all"><label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-label-md text-primary">Tanggal Lapor</label><input name="tanggal_lapor" value={form.tanggal_lapor} onChange={handleChange} className="w-full bg-transparent border-none focus:ring-0 p-md rounded-lg" type="date" required /></div>
                        <div className="relative border border-outline-variant rounded-lg focus-within:border-primary transition-all"><label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-label-md text-primary">Estimasi Biaya (Rp)</label><input name="biaya" value={form.biaya} onChange={handleChange} className="w-full bg-transparent border-none focus:ring-0 p-md rounded-lg" type="number" /></div>
                    </div>
                    <div>
                        <label className="block text-title-md font-title-md text-primary mb-md">Foto Kerusakan (Opsional)</label>
                        <div className="border-2 border-dashed border-outline-variant rounded-lg p-xl flex flex-col items-center justify-center text-center cursor-pointer hover:bg-surface-container-low transition-colors group" onClick={() => document.getElementById('foto-input').click()}>
                            <input id="foto-input" type="file" accept="image/*" className="hidden" onChange={(e) => setFoto(e.target.files[0])} />
                            <div className="w-12 h-12 rounded-full bg-primary-container/10 flex items-center justify-center text-primary-container mb-sm group-hover:scale-110 transition-transform"><span className="material-symbols-outlined text-3xl">add_a_photo</span></div>
                            {foto ? <p className="text-body-md font-body-md text-primary font-semibold">{foto.name}</p> : <p className="text-body-md font-body-md text-on-surface-variant"><span className="font-semibold text-primary">Klik untuk unggah</span></p>}
                        </div>
                    </div>
                    <div className="pt-lg border-t border-outline-variant flex justify-end gap-md">
                        <button type="button" onClick={() => navigate('/admin/pemeliharaan')} className="px-6 py-2.5 rounded-lg border border-primary text-primary font-title-md hover:bg-primary-container/5 transition-colors">Batal</button>
                        <button type="submit" disabled={loading} className="px-6 py-2.5 rounded-lg btn-primary text-white font-title-md shadow-md flex items-center gap-sm disabled:opacity-50">
                            {loading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                            {loading ? 'Mengirim...' : 'Kirim Laporan'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default PemeliharaanForm;
