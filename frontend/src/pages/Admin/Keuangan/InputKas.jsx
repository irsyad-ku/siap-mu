import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../../../utils/api';
import { useToast } from '../../../contexts/ToastContext';

const InputKas = () => {
    const [form, setForm] = useState({
        jenis: 'pemasukan', tanggal: '', kategori: '', jumlah: '', keterangan: ''
    });
    const [bukti, setBukti] = useState(null);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const toast = useToast();

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        try {
            const formData = new FormData();
            Object.entries(form).forEach(([key, val]) => formData.append(key, val));
            if (bukti) formData.append('bukti', bukti);

            await api.post('/keuangan', formData, {
                headers: { 'Content-Type': 'multipart/form-data' }
            });
            toast.success('Transaksi berhasil disimpan!');
            navigate('/admin/keuangan');
        } catch (err) {
            toast.error(err.response?.data?.message || 'Gagal menyimpan transaksi.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <>
            <div>
                <h2 className="text-headline-xl font-headline-xl text-primary mb-sm">Input Transaksi Kas</h2>
                <p className="text-body-md font-body-md text-on-surface-variant">Catat pemasukan atau pengeluaran kas masjid dengan detail.</p>
            </div>
            <div className="bg-white rounded-xl border border-[#D1FAE5] ambient-shadow-lvl1 p-lg max-w-3xl">
                <form onSubmit={handleSubmit} className="space-y-lg">
                    <div>
                        <label className="block text-title-md font-title-md text-primary mb-md">Jenis Transaksi</label>
                        <div className="grid grid-cols-2 gap-md">
                            <label className="relative cursor-pointer">
                                <input checked={form.jenis === 'pemasukan'} className="peer sr-only" name="jenis" type="radio" value="pemasukan" onChange={handleChange} />
                                <div className="rounded-lg border-2 border-outline-variant p-md flex flex-col items-center justify-center gap-sm transition-all hover:bg-surface-container-low peer-checked:border-[#27AE60] peer-checked:bg-[#27AE60]/5">
                                    <div className="w-10 h-10 rounded-full bg-[#27AE60]/10 flex items-center justify-center text-[#27AE60]"><span className="material-symbols-outlined">arrow_downward</span></div>
                                    <span className="font-title-md text-title-md text-primary">Pemasukan</span>
                                </div>
                                <div className="absolute top-2 right-2 opacity-0 peer-checked:opacity-100 text-[#27AE60] transition-opacity"><span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span></div>
                            </label>
                            <label className="relative cursor-pointer">
                                <input checked={form.jenis === 'pengeluaran'} className="peer sr-only" name="jenis" type="radio" value="pengeluaran" onChange={handleChange} />
                                <div className="rounded-lg border-2 border-outline-variant p-md flex flex-col items-center justify-center gap-sm transition-all hover:bg-surface-container-low peer-checked:border-[#E74C3C] peer-checked:bg-[#E74C3C]/5">
                                    <div className="w-10 h-10 rounded-full bg-[#E74C3C]/10 flex items-center justify-center text-[#E74C3C]"><span className="material-symbols-outlined">arrow_upward</span></div>
                                    <span className="font-title-md text-title-md text-primary">Pengeluaran</span>
                                </div>
                                <div className="absolute top-2 right-2 opacity-0 peer-checked:opacity-100 text-[#E74C3C] transition-opacity"><span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span></div>
                            </label>
                        </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                        <div className="relative border border-outline-variant rounded-lg focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                            <label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-label-md text-primary">Tanggal</label>
                            <input name="tanggal" value={form.tanggal} onChange={handleChange} className="w-full bg-transparent border-none focus:ring-0 text-body-lg font-body-lg text-on-surface p-md rounded-lg" type="date" required />
                        </div>
                        <div className="relative border border-outline-variant rounded-lg focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                            <label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-label-md text-primary">Kategori</label>
                            <select name="kategori" value={form.kategori} onChange={handleChange} className="w-full bg-transparent border-none focus:ring-0 text-body-lg font-body-lg text-on-surface p-md rounded-lg" required>
                                <option disabled value="">Pilih Kategori...</option>
                                <option value="Infaq Jamaah">Infaq Jamaah</option>
                                <option value="Zakat Fitrah/Mal">Zakat Fitrah/Mal</option>
                                <option value="Donasi Kegiatan">Donasi Kegiatan</option>
                                <option value="Operasional">Operasional (Listrik/Air)</option>
                                <option value="Biaya Kegiatan">Biaya Kegiatan</option>
                                <option value="Lainnya">Lainnya</option>
                            </select>
                        </div>
                    </div>
                    <div className="relative border border-outline-variant rounded-lg focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all flex items-center">
                        <label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-label-md text-primary">Jumlah</label>
                        <span className="pl-md py-md text-body-lg font-body-lg text-on-surface-variant bg-surface-container-low rounded-l-lg border-r border-outline-variant px-3">Rp</span>
                        <input name="jumlah" value={form.jumlah} onChange={handleChange} className="w-full bg-transparent border-none focus:ring-0 text-body-lg font-body-lg text-on-surface p-md rounded-r-lg" type="number" min="0" placeholder="0" required />
                    </div>
                    <div className="relative border border-outline-variant rounded-lg focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                        <label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-label-md text-primary">Keterangan</label>
                        <textarea name="keterangan" value={form.keterangan} onChange={handleChange} className="w-full bg-transparent border-none focus:ring-0 text-body-lg font-body-lg text-on-surface p-md rounded-lg resize-none" placeholder="Tuliskan detail transaksi..." rows="3" required></textarea>
                    </div>
                    <div>
                        <label className="block text-title-md font-title-md text-primary mb-md">Bukti Transaksi (Opsional)</label>
                        <div
                            className="border-2 border-dashed border-outline-variant rounded-lg p-xl flex flex-col items-center justify-center text-center cursor-pointer hover:bg-surface-container-low transition-colors group relative"
                            onClick={() => document.getElementById('bukti-input').click()}
                        >
                            <input id="bukti-input" type="file" accept="image/*,.pdf" className="hidden" onChange={(e) => setBukti(e.target.files[0])} />
                            <div className="w-12 h-12 rounded-full bg-primary-container/10 flex items-center justify-center text-primary-container mb-sm group-hover:scale-110 transition-transform">
                                <span className="material-symbols-outlined text-3xl">cloud_upload</span>
                            </div>
                            {bukti ? (
                                <p className="text-body-md font-body-md text-primary font-semibold">{bukti.name}</p>
                            ) : (
                                <>
                                    <p className="text-body-md font-body-md text-on-surface-variant"><span className="font-semibold text-primary">Klik untuk unggah</span> atau seret file ke sini</p>
                                    <p className="text-label-md font-label-md text-outline mt-1">PNG, JPG, PDF (Maks. 5MB)</p>
                                </>
                            )}
                        </div>
                    </div>
                    <div className="pt-lg border-t border-outline-variant flex justify-end gap-md">
                        <button type="button" onClick={() => navigate('/admin/keuangan')} className="px-6 py-2.5 rounded-lg border border-primary text-primary font-title-md text-title-md hover:bg-primary-container/5 transition-colors">Batal</button>
                        <button type="submit" disabled={loading} className="px-6 py-2.5 rounded-lg btn-primary text-white font-title-md text-title-md transition-all shadow-md flex items-center gap-sm disabled:opacity-50">
                            {loading && <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>}
                            {loading ? 'Menyimpan...' : 'Simpan Transaksi'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
};

export default InputKas;
