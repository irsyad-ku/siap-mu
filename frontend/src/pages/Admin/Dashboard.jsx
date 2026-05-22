import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import { useAuth } from '../../contexts/AuthContext';

const Dashboard = () => {
    const { user } = useAuth();
    const [stats, setStats] = useState({ saldo: 0, aset: 0, peminjamanPending: 0, kegiatanMendatang: 0 });
    const [kegiatanList, setKegiatanList] = useState([]);
    const [peminjamanList, setPeminjamanList] = useState([]);
    const [loading, setLoading] = useState(true);

    const formatRupiah = (n) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);

    useEffect(() => {
        const fetchAll = async () => {
            setLoading(true);
            try {
                const [keuRes, asetRes, pinjamRes, kegRes] = await Promise.allSettled([
                    api.get('/keuangan'),
                    api.get('/aset'),
                    api.get('/peminjaman'),
                    api.get('/kegiatan'),
                ]);

                const keuData = keuRes.status === 'fulfilled' ? (keuRes.value.data.data || keuRes.value.data) : [];
                const asetData = asetRes.status === 'fulfilled' ? (asetRes.value.data.data || asetRes.value.data) : [];
                const pinjamData = pinjamRes.status === 'fulfilled' ? (pinjamRes.value.data.data || pinjamRes.value.data) : [];
                const kegData = kegRes.status === 'fulfilled' ? (kegRes.value.data.data || kegRes.value.data) : [];

                const pemasukan = keuData.filter(d => d.jenis === 'pemasukan').reduce((s, d) => s + parseFloat(d.jumlah || 0), 0);
                const pengeluaran = keuData.filter(d => d.jenis === 'pengeluaran').reduce((s, d) => s + parseFloat(d.jumlah || 0), 0);

                setStats({
                    saldo: pemasukan - pengeluaran,
                    aset: Array.isArray(asetData) ? asetData.length : 0,
                    peminjamanPending: Array.isArray(pinjamData) ? pinjamData.filter(p => p.status === 'menunggu').length : 0,
                    kegiatanMendatang: Array.isArray(kegData) ? kegData.filter(k => ['akan_datang', 'berlangsung'].includes(k.status)).length : 0,
                });

                setKegiatanList(Array.isArray(kegData) ? kegData.filter(k => ['akan_datang', 'berlangsung'].includes(k.status)).slice(0, 3) : []);
                setPeminjamanList(Array.isArray(pinjamData) ? pinjamData.slice(0, 3) : []);
            } catch {
                // Silently fail — dashboard will show zeros
            } finally {
                setLoading(false);
            }
        };
        fetchAll();
    }, []);

    const statusConfig = {
        menunggu: { label: 'PENDING', color: 'bg-[#E67E22]/10 text-[#E67E22]' },
        disetujui: { label: 'DISETUJUI', color: 'bg-[#27AE60]/10 text-[#27AE60]' },
        ditolak: { label: 'DITOLAK', color: 'bg-[#E74C3C]/10 text-[#E74C3C]' },
        selesai: { label: 'SELESAI', color: 'bg-surface-variant text-on-surface-variant' },
    };

    return (
        <>
            <section>
                <h2 className="font-headline-xl text-headline-xl text-primary mb-xs">Dashboard</h2>
                <p className="font-body-lg text-body-lg text-on-surface-variant">Selamat datang, {user?.nama || 'Administrator'}</p>
            </section>

            {/* Stat Cards */}
            <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-gutter">
                {[
                    { icon: 'account_balance_wallet', label: 'Saldo Kas', value: loading ? '...' : formatRupiah(stats.saldo), color: 'bg-primary-container', textColor: 'text-primary-container' },
                    { icon: 'inventory_2', label: 'Total Aset', value: loading ? '...' : `${stats.aset} Unit`, color: 'bg-secondary', textColor: 'text-secondary' },
                    { icon: 'pending_actions', label: 'Peminjaman Pending', value: loading ? '...' : `${stats.peminjamanPending} Req`, color: 'bg-[#E67E22]', textColor: 'text-[#E67E22]' },
                    { icon: 'event_upcoming', label: 'Kegiatan Mendatang', value: loading ? '...' : `${stats.kegiatanMendatang} Acara`, color: 'bg-[#3498DB]', textColor: 'text-[#3498DB]' },
                ].map((stat) => (
                    <div key={stat.label} className="bg-white rounded-lg border border-[#D1FAE5] ambient-shadow-lvl1 p-md flex items-center relative overflow-hidden group hover:ambient-shadow-lvl2 transition-shadow">
                        <div className={`absolute left-0 top-0 bottom-0 w-1 ${stat.color}`}></div>
                        <div className={`p-sm ${stat.color}/10 rounded-full ${stat.textColor} mr-md`}>
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{stat.icon}</span>
                        </div>
                        <div>
                            <p className="font-label-md text-label-md text-on-surface-variant mb-xs">{stat.label}</p>
                            <h3 className="font-headline-md text-headline-md text-on-surface">{stat.value}</h3>
                        </div>
                    </div>
                ))}
            </section>

            {/* Lists Row */}
            <section className="grid grid-cols-1 lg:grid-cols-2 gap-gutter">
                <div className="bg-white rounded-xl border border-[#D1FAE5] ambient-shadow-lvl1 p-lg">
                    <div className="flex justify-between items-center mb-md">
                        <h3 className="font-title-md text-title-md text-on-surface">Kegiatan Mendatang</h3>
                        <Link to="/admin/kegiatan" className="font-label-md text-label-md text-primary hover:underline">Lihat Semua</Link>
                    </div>
                    {loading ? (
                        <div className="flex items-center justify-center py-xl"><div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div></div>
                    ) : kegiatanList.length === 0 ? (
                        <p className="text-center text-on-surface-variant py-lg font-body-md">Tidak ada kegiatan mendatang.</p>
                    ) : (
                        <ul className="space-y-md">
                            {kegiatanList.map(k => {
                                const d = new Date(k.tanggal);
                                return (
                                    <li key={k.id_kegiatan} className="flex items-start space-x-md p-sm hover:bg-surface-container-low rounded-lg transition-colors cursor-pointer">
                                        <div className="bg-primary-container/10 text-primary-container p-sm rounded-lg flex flex-col items-center justify-center min-w-[3rem]">
                                            <span className="font-bold text-sm">{d.getDate()}</span>
                                            <span className="text-xs uppercase">{d.toLocaleDateString('id-ID', { month: 'short' })}</span>
                                        </div>
                                        <div className="flex-1">
                                            <h4 className="font-body-md text-body-md font-semibold text-on-surface">{k.nama_kegiatan}</h4>
                                            <p className="font-label-md text-label-md text-on-surface-variant flex items-center mt-xs">
                                                <span className="material-symbols-outlined text-[14px] mr-xs">schedule</span>
                                                {k.waktu_mulai?.slice(0, 5)}{k.waktu_selesai ? ` - ${k.waktu_selesai.slice(0, 5)}` : ''} WIB
                                            </p>
                                        </div>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
                <div className="bg-white rounded-xl border border-[#D1FAE5] ambient-shadow-lvl1 p-lg">
                    <div className="flex justify-between items-center mb-md">
                        <h3 className="font-title-md text-title-md text-on-surface">Peminjaman Terbaru</h3>
                        <Link to="/admin/peminjaman" className="font-label-md text-label-md text-primary hover:underline">Lihat Semua</Link>
                    </div>
                    {loading ? (
                        <div className="flex items-center justify-center py-xl"><div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div></div>
                    ) : peminjamanList.length === 0 ? (
                        <p className="text-center text-on-surface-variant py-lg font-body-md">Tidak ada peminjaman terbaru.</p>
                    ) : (
                        <ul className="space-y-md">
                            {peminjamanList.map(p => {
                                const sc = statusConfig[p.status] || statusConfig.menunggu;
                                return (
                                    <li key={p.id_pinjam} className="flex items-center justify-between p-sm hover:bg-surface-container-low rounded-lg transition-colors cursor-pointer">
                                        <div className="flex items-center space-x-md">
                                            <div className="w-10 h-10 rounded-full bg-surface-variant flex items-center justify-center text-outline">
                                                <span className="material-symbols-outlined">person</span>
                                            </div>
                                            <div>
                                                <h4 className="font-body-md text-body-md font-semibold text-on-surface">{p.user?.nama || 'Peminjam'}</h4>
                                                <p className="font-label-md text-label-md text-on-surface-variant">
                                                    {p.fasilitas?.nama_fasilitas || 'Fasilitas'} - {new Date(p.tanggal_pinjam).toLocaleDateString('id-ID', { day: '2-digit', month: 'short' })}
                                                </p>
                                            </div>
                                        </div>
                                        <span className={`px-2 py-1 rounded-full ${sc.color} font-label-md text-[10px] font-bold`}>{sc.label}</span>
                                    </li>
                                );
                            })}
                        </ul>
                    )}
                </div>
            </section>
        </>
    );
};

export default Dashboard;
