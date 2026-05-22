import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';
import { useToast } from '../../contexts/ToastContext';

const Notifikasi = () => {
    const [notifications, setNotifications] = useState([]);
    const [loading, setLoading] = useState(true);
    const toast = useToast();

    useEffect(() => {
        const fetchUpdates = async () => {
            setLoading(true);
            try {
                // Fetch recent events in parallel from multiple modules
                const [peminjamanRes, pemeliharaanRes, keuanganRes] = await Promise.all([
                    api.get('/peminjaman').catch(() => ({ data: { data: [] } })),
                    api.get('/pemeliharaan').catch(() => ({ data: { data: [] } })),
                    api.get('/keuangan').catch(() => ({ data: { data: [] } }))
                ]);

                const loans = peminjamanRes.data.data || peminjamanRes.data || [];
                const maintenance = pemeliharaanRes.data.data || pemeliharaanRes.data || [];
                const financial = keuanganRes.data.data || keuanganRes.data || [];

                const feed = [];

                // Format Loan Notifications
                loans.forEach(item => {
                    if (item.status === 'menunggu') {
                        feed.push({
                            id: `loan-${item.id_pinjam}`,
                            title: 'Pengajuan Peminjaman Fasilitas Baru',
                            description: `Pengguna mendaftarkan pengajuan peminjaman fasilitas "${item.fasilitas?.nama_fasilitas || 'Fasilitas'}" untuk keperluan: "${item.keperluan}".`,
                            date: new Date(item.created_at || item.tanggal_pinjam),
                            type: 'peminjaman',
                            icon: 'handshake',
                            badgeColor: 'bg-[#3498DB]/10 text-[#3498DB]',
                            link: '/admin/peminjaman'
                        });
                    }
                });

                // Format Maintenance Notifications
                maintenance.forEach(item => {
                    if (item.status === 'dilaporkan') {
                        feed.push({
                            id: `maint-${item.id_pemeliharaan}`,
                            title: 'Laporan Kerusakan Aset Baru',
                            description: `Laporan kerusakan aset "${item.aset?.nama_aset || 'Aset'}" dilaporkan dengan keterangan: "${item.deskripsi}".`,
                            date: new Date(item.created_at || item.tanggal_lapor),
                            type: 'pemeliharaan',
                            icon: 'build',
                            badgeColor: 'bg-[#E74C3C]/10 text-[#E74C3C]',
                            link: '/admin/pemeliharaan'
                        });
                    }
                });

                // Format Financial Notifications
                financial.slice(0, 5).forEach(item => {
                    feed.push({
                        id: `fin-${item.id_transaksi}`,
                        title: `Transaksi Kas Baru (${item.jenis === 'pemasukan' ? 'Pemasukan' : 'Pengeluaran'})`,
                        description: `Kas sebesar Rp ${Number(item.jumlah).toLocaleString('id-ID')} dicatat untuk kategori "${item.kategori}". Keterangan: "${item.keterangan || '-'}".`,
                        date: new Date(item.created_at || item.tanggal),
                        type: 'keuangan',
                        icon: item.jenis === 'pemasukan' ? 'trending_up' : 'trending_down',
                        badgeColor: item.jenis === 'pemasukan' ? 'bg-[#27AE60]/10 text-[#27AE60]' : 'bg-[#F39C12]/10 text-[#F39C12]',
                        link: '/admin/keuangan'
                    });
                });

                // Sort by date descending
                feed.sort((a, b) => b.date - a.date);

                // Add static fallback welcome notification if empty
                if (feed.length === 0) {
                    feed.push({
                        id: 'welcome',
                        title: 'Selamat Datang di Portal SIAP-MU',
                        description: 'Sistem Informasi Administrasi Masjid Umat berhasil terhubung. Anda akan menerima notifikasi aktivitas di sini.',
                        date: new Date(),
                        type: 'system',
                        icon: 'notifications_active',
                        badgeColor: 'bg-primary/10 text-primary',
                        link: '/admin'
                    });
                }

                setNotifications(feed);
            } catch {
                toast.error('Gagal mengambil pembaruan notifikasi.');
            } finally {
                setLoading(false);
            }
        };

        fetchUpdates();
    }, [toast]);

    const handleClear = () => {
        setNotifications([{
            id: 'clear-all',
            title: 'Notifikasi Dibersihkan',
            description: 'Semua notifikasi telah dibaca.',
            date: new Date(),
            type: 'system',
            icon: 'done_all',
            badgeColor: 'bg-primary/10 text-primary',
            link: '/admin'
        }]);
        toast.info('Notifikasi dibersihkan.');
    };

    return (
        <div className="max-w-4xl mx-auto space-y-xl">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-md">
                <div>
                    <h2 className="font-headline-xl text-headline-xl text-primary mb-xs">Notifikasi Aktivitas</h2>
                    <p className="font-body-lg text-body-lg text-on-surface-variant">Lacak seluruh pembaruan transaksi, pengajuan, dan pemeliharaan masjid secara real-time.</p>
                </div>
                {notifications.length > 1 && (
                    <button 
                        onClick={handleClear}
                        className="px-lg py-sm rounded-lg border border-primary text-primary font-title-md hover:bg-primary-container/5 transition-colors flex items-center gap-xs self-start"
                    >
                        <span className="material-symbols-outlined text-[20px]">drafts</span> Tandai Semua Dibaca
                    </button>
                )}
            </div>

            <div className="bg-white rounded-xl border border-[#D1FAE5] ambient-shadow-lvl1 overflow-hidden">
                <div className="p-md border-b border-outline-variant flex justify-between items-center bg-surface-container-low">
                    <span className="font-title-md text-title-md text-primary font-bold">Aktivitas Terbaru</span>
                    <span className="px-2 py-0.5 rounded-full bg-primary/10 text-primary font-label-md text-xs font-bold">{notifications.length} Pembaruan</span>
                </div>

                <div className="divide-y divide-outline-variant">
                    {loading ? (
                        <div className="py-xl text-center text-on-surface-variant">
                            <div className="flex items-center justify-center gap-sm">
                                <div className="w-6 h-6 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>
                                <span>Menghimpun notifikasi...</span>
                            </div>
                        </div>
                    ) : notifications.length === 0 ? (
                        <div className="py-xl text-center text-on-surface-variant">
                            <span className="material-symbols-outlined text-[48px] text-outline-variant block mb-sm">notifications_off</span>
                            Tidak ada notifikasi aktif saat ini.
                        </div>
                    ) : (
                        notifications.map(item => (
                            <div key={item.id} className="p-lg hover:bg-surface-container-lowest transition-all flex gap-md items-start">
                                <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 ${item.badgeColor}`}>
                                    <span className="material-symbols-outlined">{item.icon}</span>
                                </div>
                                <div className="flex-1 space-y-xs min-w-0">
                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-xs">
                                        <h4 className="font-title-md text-title-md font-bold text-on-surface truncate">{item.title}</h4>
                                        <span className="font-label-md text-label-md text-on-surface-variant text-xs flex-shrink-0">
                                            {item.date.toLocaleString('id-ID', { dateStyle: 'short', timeStyle: 'short' })}
                                        </span>
                                    </div>
                                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">{item.description}</p>
                                    <div className="pt-xs">
                                        <Link 
                                            to={item.link} 
                                            className="inline-flex items-center gap-xs font-label-md text-label-md text-primary hover:text-primary-dark transition-colors font-bold"
                                        >
                                            <span>Buka Halaman</span>
                                            <span className="material-symbols-outlined text-[16px]">chevron_right</span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        ))
                    )}
                </div>
            </div>
        </div>
    );
};

export default Notifikasi;
