import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../../utils/api';

const KeuanganIndex = () => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        setLoading(true);
        try {
            const res = await api.get('/keuangan');
            setData(res.data.data || res.data);
        } catch {
            setData([]);
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        if (!window.confirm('Yakin ingin menghapus transaksi ini?')) return;
        try {
            await api.delete(`/keuangan/${id}`);
            setData(prev => prev.filter(item => item.id_transaksi !== id));
        } catch {
            alert('Gagal menghapus transaksi.');
        }
    };

    const formatRupiah = (n) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);
    const formatDate = (d) => new Date(d).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' });

    const filtered = data.filter(item =>
        (item.kategori?.toLowerCase().includes(search.toLowerCase())) ||
        (item.keterangan?.toLowerCase().includes(search.toLowerCase()))
    );

    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-md">
                <div>
                    <h2 className="font-headline-xl text-headline-xl text-primary mb-xs">Laporan Keuangan</h2>
                    <p className="font-body-lg text-body-lg text-on-surface-variant">Kelola dan pantau arus kas keuangan masjid.</p>
                </div>
                <Link to="/admin/keuangan/input" className="btn-primary px-lg py-sm rounded-lg font-title-md text-title-md flex items-center gap-sm self-start shadow-md">
                    <span className="material-symbols-outlined text-[20px]">add</span>Input Transaksi
                </Link>
            </div>

            {/* Summary Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-gutter">
                {(() => {
                    const pemasukan = data.filter(d => d.jenis === 'pemasukan').reduce((s, d) => s + parseFloat(d.jumlah || 0), 0);
                    const pengeluaran = data.filter(d => d.jenis === 'pengeluaran').reduce((s, d) => s + parseFloat(d.jumlah || 0), 0);
                    return [
                        { label: 'Total Pemasukan', value: formatRupiah(pemasukan), icon: 'trending_up', color: 'text-[#27AE60]', bg: 'bg-[#27AE60]/10' },
                        { label: 'Total Pengeluaran', value: formatRupiah(pengeluaran), icon: 'trending_down', color: 'text-[#E74C3C]', bg: 'bg-[#E74C3C]/10' },
                        { label: 'Saldo', value: formatRupiah(pemasukan - pengeluaran), icon: 'account_balance_wallet', color: 'text-primary', bg: 'bg-primary/10' },
                    ].map(s => (
                        <div key={s.label} className="bg-white rounded-lg border border-[#D1FAE5] ambient-shadow-lvl1 p-md flex items-center gap-md">
                            <div className={`p-sm ${s.bg} rounded-full ${s.color}`}>
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{s.icon}</span>
                            </div>
                            <div>
                                <p className="font-label-md text-label-md text-on-surface-variant">{s.label}</p>
                                <h3 className="font-headline-sm text-headline-sm text-on-surface">{s.value}</h3>
                            </div>
                        </div>
                    ));
                })()}
            </div>

            <div className="bg-white rounded-xl border border-[#D1FAE5] ambient-shadow-lvl1 overflow-hidden">
                <div className="p-md border-b border-outline-variant">
                    <div className="relative max-w-md">
                        <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline">search</span>
                        <input type="text" placeholder="Cari transaksi..." value={search} onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-surface-container-low border border-outline-variant rounded-full py-2 pl-xl pr-sm text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                    </div>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-surface-container-low font-label-md text-label-md text-on-surface-variant border-b border-outline-variant">
                                <th className="py-md px-lg font-semibold">Tanggal</th>
                                <th className="py-md px-lg font-semibold">Jenis</th>
                                <th className="py-md px-lg font-semibold">Kategori</th>
                                <th className="py-md px-lg font-semibold">Jumlah</th>
                                <th className="py-md px-lg font-semibold">Keterangan</th>
                                <th className="py-md px-lg font-semibold text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="font-body-md text-body-md">
                            {loading ? (
                                <tr><td colSpan="6" className="py-xl text-center text-on-surface-variant">
                                    <div className="flex items-center justify-center gap-sm"><div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>Memuat data...</div>
                                </td></tr>
                            ) : filtered.length === 0 ? (
                                <tr><td colSpan="6" className="py-xl text-center text-on-surface-variant">
                                    <span className="material-symbols-outlined text-[48px] text-outline-variant block mb-sm">receipt_long</span>
                                    Belum ada data transaksi.
                                </td></tr>
                            ) : filtered.map((item) => (
                                <tr key={item.id_transaksi} className="border-b border-outline-variant/50 hover:bg-surface-container-lowest transition-colors">
                                    <td className="py-md px-lg text-on-surface-variant">{formatDate(item.tanggal)}</td>
                                    <td className="py-md px-lg">
                                        <span className={`px-2 py-1 rounded-full font-label-md text-[10px] font-bold ${
                                            item.jenis === 'pemasukan' ? 'bg-[#27AE60]/10 text-[#27AE60]' : 'bg-[#E74C3C]/10 text-[#E74C3C]'
                                        }`}>{item.jenis?.toUpperCase()}</span>
                                    </td>
                                    <td className="py-md px-lg text-on-surface">{item.kategori}</td>
                                    <td className={`py-md px-lg font-semibold ${item.jenis === 'pemasukan' ? 'text-[#27AE60]' : 'text-[#E74C3C]'}`}>
                                        {item.jenis === 'pemasukan' ? '+' : '-'}{formatRupiah(item.jumlah)}
                                    </td>
                                    <td className="py-md px-lg text-on-surface-variant max-w-[200px] truncate">{item.keterangan || '-'}</td>
                                    <td className="py-md px-lg text-right space-x-xs">
                                        <button className="p-xs text-outline hover:text-primary transition-colors"><span className="material-symbols-outlined text-[20px]">edit</span></button>
                                        <button onClick={() => handleDelete(item.id_transaksi)} className="p-xs text-outline hover:text-error transition-colors"><span className="material-symbols-outlined text-[20px]">delete</span></button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default KeuanganIndex;
