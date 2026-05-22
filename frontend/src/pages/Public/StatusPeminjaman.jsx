import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import api from '../../utils/api';

const StatusPeminjaman = () => {
    const { isAuthenticated, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const toast = useToast();

    const [loans, setLoans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [selectedLoan, setSelectedLoan] = useState(null);

    // Guard route: redirect if not logged in
    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            toast.error('Silakan login terlebih dahulu untuk melihat status peminjaman.');
            navigate('/login', { replace: true });
        }
    }, [isAuthenticated, authLoading]);

    // Fetch user loan history
    useEffect(() => {
        if (isAuthenticated) {
            const fetchLoans = async () => {
                try {
                    setLoading(true);
                    const res = await api.get('/peminjaman');
                    setLoans(res.data.data || res.data || []);
                } catch (err) {
                    toast.error('Gagal mengambil riwayat peminjaman.');
                } finally {
                    setLoading(false);
                }
            };
            fetchLoans();
        }
    }, [isAuthenticated, toast]);

    const statusConfig = {
        menunggu: { label: 'MENUNGGU', color: 'bg-[#E67E22]/10 text-[#E67E22]', icon: 'hourglass_top' },
        disetujui: { label: 'DISETUJUI', color: 'bg-[#27AE60]/10 text-[#27AE60]', icon: 'check_circle' },
        ditolak: { label: 'DITOLAK', color: 'bg-[#E74C3C]/10 text-[#E74C3C]', icon: 'cancel' },
        selesai: { label: 'SELESAI', color: 'bg-surface-variant text-on-surface-variant', icon: 'task_alt' },
    };

    // Calculate dynamic stats
    const stats = {
        menunggu: loans.filter(l => l.status === 'menunggu').length,
        disetujui: loans.filter(l => l.status === 'disetujui').length,
        ditolak: loans.filter(l => l.status === 'ditolak').length,
        selesai: loans.filter(l => l.status === 'selesai').length,
    };

    // Filter loans based on search input
    const filteredLoans = loans.filter(l => {
        if (!search) return true;
        const lower = search.toLowerCase();
        const facilityName = l.fasilitas?.nama_fasilitas || '';
        const purpose = l.keperluan || '';
        return facilityName.toLowerCase().includes(lower) || purpose.toLowerCase().includes(lower);
    });

    if (authLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-surface">
                <div className="flex flex-col items-center gap-md">
                    <div className="w-12 h-12 border-4 border-primary-container border-t-primary rounded-full animate-spin"></div>
                    <p className="font-body-md text-body-md text-on-surface-variant">Memuat...</p>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-surface">
            {/* Hero */}
            <section className="relative bg-gradient-to-br from-primary via-primary-container to-secondary text-on-primary py-[100px] px-lg overflow-hidden">
                <div className="absolute top-0 right-0 w-80 h-80 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-sm bg-white/10 backdrop-blur-sm px-md py-sm rounded-full mb-lg border border-white/20">
                        <span className="material-symbols-outlined text-sm">fact_check</span>
                        <span className="font-label-md text-label-md">Lacak Peminjaman</span>
                    </div>
                    <h1 className="font-headline-xl text-headline-xl mb-md tracking-tight">Status Peminjaman</h1>
                    <p className="font-body-lg text-body-lg text-on-primary/90 max-w-2xl mx-auto">Pantau status pengajuan peminjaman fasilitas masjid Anda di sini secara langsung.</p>
                </div>
            </section>

            <main className="max-w-5xl mx-auto px-lg -mt-xl relative z-20 pb-xl">
                {/* Summary Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-md mb-xl">
                    {[
                        { icon: 'hourglass_top', value: stats.menunggu, label: 'Menunggu', bg: 'bg-[#E67E22]/10', text: 'text-[#E67E22]' },
                        { icon: 'check_circle', value: stats.disetujui, label: 'Disetujui', bg: 'bg-[#27AE60]/10', text: 'text-[#27AE60]' },
                        { icon: 'cancel', value: stats.ditolak, label: 'Ditolak', bg: 'bg-[#E74C3C]/10', text: 'text-[#E74C3C]' },
                        { icon: 'task_alt', value: stats.selesai, label: 'Selesai', bg: 'bg-surface-variant', text: 'text-on-surface-variant' },
                    ].map((s) => (
                        <div key={s.label} className="bg-surface-container-lowest rounded-xl border border-[#D1FAE5] shadow-sm p-md text-center">
                            <div className={`w-10 h-10 mx-auto rounded-full ${s.bg} ${s.text} flex items-center justify-center mb-sm`}>
                                <span className="material-symbols-outlined text-[20px]">{s.icon}</span>
                            </div>
                            <h3 className="font-headline-md text-headline-md text-on-surface">{s.value}</h3>
                            <p className="font-label-md text-label-md text-on-surface-variant">{s.label}</p>
                        </div>
                    ))}
                </div>

                {/* Table */}
                <div className="bg-surface-container-lowest rounded-xl border border-[#D1FAE5] shadow-lg overflow-hidden">
                    <div className="p-lg border-b border-outline-variant flex flex-col md:flex-row md:items-center justify-between gap-md">
                        <h2 className="font-title-md text-title-md text-on-surface">Riwayat Peminjaman</h2>
                        <div className="relative max-w-xs w-full">
                            <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline">search</span>
                            <input type="text" placeholder="Cari peminjaman..." value={search} onChange={(e) => setSearch(e.target.value)} className="w-full bg-surface-container-low border border-outline-variant rounded-full py-2 pl-xl pr-sm text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-surface-container-low font-label-md text-label-md text-on-surface-variant border-b border-outline-variant">
                                    <th className="py-md px-lg font-semibold">ID</th>
                                    <th className="py-md px-lg font-semibold">Fasilitas</th>
                                    <th className="py-md px-lg font-semibold">Tanggal Pinjam</th>
                                    <th className="py-md px-lg font-semibold">Waktu</th>
                                    <th className="py-md px-lg font-semibold">Keperluan</th>
                                    <th className="py-md px-lg font-semibold">Status</th>
                                </tr>
                            </thead>
                            <tbody className="font-body-md text-body-md">
                                {loading ? (
                                    <tr>
                                        <td colSpan="6" className="py-xl text-center text-on-surface-variant">
                                            <div className="flex items-center justify-center gap-sm">
                                                <div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                                                Memuat riwayat peminjaman...
                                            </div>
                                        </td>
                                    </tr>
                                ) : filteredLoans.length === 0 ? (
                                    <tr>
                                        <td colSpan="6" className="py-xl text-center text-on-surface-variant">
                                            <span className="material-symbols-outlined text-[48px] text-outline-variant block mb-sm">inbox</span>
                                            Belum ada pengajuan peminjaman.
                                        </td>
                                    </tr>
                                ) : filteredLoans.map((row) => {
                                    const sc = statusConfig[row.status] || { label: row.status.toUpperCase(), color: 'bg-surface-variant text-on-surface-variant', icon: 'info' };
                                    return (
                                        <tr key={row.id_pinjam} onClick={() => setSelectedLoan(row)} className="border-b border-outline-variant/50 hover:bg-surface-container-lowest transition-colors cursor-pointer">
                                            <td className="py-md px-lg text-primary font-semibold">PJ-{String(row.id_pinjam).padStart(4, '0')}</td>
                                            <td className="py-md px-lg text-on-surface font-medium">{row.fasilitas?.nama_fasilitas || `Fasilitas #${row.id_fasilitas}`}</td>
                                            <td className="py-md px-lg text-on-surface-variant">{row.tanggal_pinjam}</td>
                                            <td className="py-md px-lg text-on-surface-variant">{row.waktu_mulai.slice(0, 5)} - {row.waktu_selesai.slice(0, 5)}</td>
                                            <td className="py-md px-lg text-on-surface-variant max-w-[200px] truncate">{row.keperluan}</td>
                                            <td className="py-md px-lg">
                                                <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full ${sc.color} font-label-md text-[10px] font-bold`}>
                                                    <span className="material-symbols-outlined text-[12px]">{sc.icon}</span>
                                                    {sc.label}
                                                </span>
                                            </td>
                                        </tr>
                                    );
                                })}
                            </tbody>
                        </table>
                    </div>
                </div>
            </main>

            {/* Premium Detail Modal */}
            {selectedLoan && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-md bg-black/60 backdrop-blur-sm transition-opacity duration-300">
                    <div className="bg-white dark:bg-surface-container rounded-2xl max-w-lg w-full overflow-hidden border border-[#D1FAE5] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        {/* Header */}
                        <div className="relative bg-gradient-to-r from-primary to-primary-container text-white p-lg">
                            <button onClick={() => setSelectedLoan(null)} className="absolute top-md right-md text-white/80 hover:text-white hover:bg-white/10 p-xs rounded-full transition-all">
                                <span className="material-symbols-outlined text-[24px]">close</span>
                            </button>
                            <span className="font-label-md text-label-md text-white/85 tracking-wider block mb-xs">DETAIL PEMINJAMAN</span>
                            <h3 className="font-title-lg text-title-lg font-bold">PJ-{String(selectedLoan.id_pinjam).padStart(4, '0')}</h3>
                        </div>

                        {/* Content */}
                        <div className="p-lg space-y-md max-h-[70vh] overflow-y-auto">
                            <div className="grid grid-cols-2 gap-sm pb-md border-b border-outline-variant">
                                <div>
                                    <span className="font-label-md text-label-md text-outline block">Fasilitas</span>
                                    <span className="font-body-lg text-body-lg font-semibold text-on-surface">{selectedLoan.fasilitas?.nama_fasilitas || `Fasilitas #${selectedLoan.id_fasilitas}`}</span>
                                </div>
                                <div>
                                    <span className="font-label-md text-label-md text-outline block">Status Pengajuan</span>
                                    <span className={`inline-flex items-center gap-1 px-2.5 py-0.5 mt-xs rounded-full font-label-md text-[10px] font-bold ${(statusConfig[selectedLoan.status] || {}).color}`}>
                                        <span className="material-symbols-outlined text-[12px]">{(statusConfig[selectedLoan.status] || {}).icon}</span>
                                        {(statusConfig[selectedLoan.status] || {}).label}
                                    </span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-sm pb-md border-b border-outline-variant">
                                <div>
                                    <span className="font-label-md text-label-md text-outline block">Tanggal Pinjam</span>
                                    <span className="font-body-md text-body-md text-on-surface">{selectedLoan.tanggal_pinjam}</span>
                                </div>
                                <div>
                                    <span className="font-label-md text-label-md text-outline block">Tanggal Kembali</span>
                                    <span className="font-body-md text-body-md text-on-surface">{selectedLoan.tanggal_kembali}</span>
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-sm pb-md border-b border-outline-variant">
                                <div>
                                    <span className="font-label-md text-label-md text-outline block">Waktu Penggunaan</span>
                                    <span className="font-body-md text-body-md text-on-surface">{selectedLoan.waktu_mulai.slice(0, 5)} - {selectedLoan.waktu_selesai.slice(0, 5)}</span>
                                </div>
                                <div>
                                    <span className="font-label-md text-label-md text-outline block">Jumlah Peserta</span>
                                    <span className="font-body-md text-body-md text-on-surface">{selectedLoan.jumlah_peserta ? `${selectedLoan.jumlah_peserta} orang` : '-'}</span>
                                </div>
                            </div>

                            <div>
                                <span className="font-label-md text-label-md text-outline block">Keperluan / Keterangan</span>
                                <p className="font-body-md text-body-md text-on-surface bg-surface-container-lowest p-md rounded-lg border border-outline-variant mt-xs whitespace-pre-wrap">{selectedLoan.keperluan}</p>
                            </div>

                            {selectedLoan.catatan_pengurus && (
                                <div className="p-md rounded-lg border border-[#E67E22]/20 bg-[#E67E22]/5">
                                    <span className="font-label-md text-label-md text-[#E67E22] font-semibold block mb-xs">Catatan Pengurus</span>
                                    <p className="font-body-md text-body-md text-on-surface whitespace-pre-wrap">{selectedLoan.catatan_pengurus}</p>
                                    {selectedLoan.tanggal_proses && (
                                        <span className="text-[10px] text-on-surface-variant/75 block mt-sm">Diproses pada {selectedLoan.tanggal_proses} {selectedLoan.diproses_oleh?.nama ? `oleh ${selectedLoan.diproses_oleh.nama}` : ''}</span>
                                    )}
                                </div>
                            )}
                        </div>

                        {/* Footer */}
                        <div className="p-md bg-surface-container-low border-t border-outline-variant flex justify-end">
                            <button onClick={() => setSelectedLoan(null)} className="px-lg py-sm rounded-lg btn-primary text-white font-title-md text-title-md shadow-md transition-all">
                                Tutup
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default StatusPeminjaman;
