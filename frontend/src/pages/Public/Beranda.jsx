import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../../utils/api';

const Beranda = () => {
    const [stats, setStats] = useState({
        total_aset: 0,
        kegiatan_aktif: 0,
        jamaah_terdaftar: 0,
        saldo: 0,
        formatted_saldo: 'Rp 0'
    });
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        api.get('/public-stats')
            .then(res => {
                if (res.data && res.data.status === 'success') {
                    setStats(res.data.data);
                }
            })
            .catch(err => {
                console.error("Gagal mengambil data statistik:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, []);

    return (
        <>
            <header className="relative w-full min-h-[82vh] flex items-center justify-center overflow-hidden bg-[#EAF7F1]">
                <div className="absolute inset-0 z-0 bg-[#045340]">
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-[0.28] grayscale contrast-125"
                        style={{ backgroundImage: "url('https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=1800&q=80')" }}
                    ></div>
                    <div className="absolute inset-0 bg-[linear-gradient(180deg,rgba(3,79,62,0.84)_0%,rgba(5,93,72,0.72)_38%,rgba(61,133,114,0.42)_68%,rgba(234,247,241,0.92)_100%)]"></div>
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_38%,rgba(0,0,0,0.02)_0%,rgba(0,60,45,0.18)_58%,rgba(0,60,45,0.08)_100%)]"></div>
                    <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-t from-[#F6FBF8] via-[#F6FBF8]/72 to-transparent"></div>
                    <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-[#034B3B]/90 to-transparent"></div>
                </div>
                <div className="relative z-10 text-center px-margin-mobile md:px-margin-desktop max-w-4xl mx-auto mt-xl">
                    <h1 className="font-headline-xl text-headline-xl md:text-[52px] md:leading-[60px] text-white mb-md tracking-tight drop-shadow-[0_2px_18px_rgba(0,0,0,0.18)]">Selamat Datang di SIAP-MU</h1>
                    <p className="font-body-lg text-body-lg text-[#D5F4E7] mb-xl max-w-2xl mx-auto">Sistem Informasi Administrasi Masjid Umat yang modern, transparan, dan terintegrasi. Memudahkan pengurus dan jamaah dalam mengelola kegiatan serta keuangan masjid.</p>
                    <div className="flex flex-col sm:flex-row gap-md justify-center items-center">
                        <a href="#jadwal" className="w-full sm:w-auto inline-flex items-center justify-center px-xl py-md rounded-full bg-[#007F4E] text-white font-title-md text-title-md shadow-[0_16px_32px_rgba(0,64,45,0.22)] hover:bg-[#006A42] transition-all hover:-translate-y-0.5">
                            Lihat Jadwal
                            <span className="material-symbols-outlined ml-sm text-lg">arrow_forward</span>
                        </a>
                        <a href="#tentang" className="w-full sm:w-auto inline-flex items-center justify-center px-xl py-md rounded-full border border-white/60 text-[#DFF8ED] font-title-md text-title-md bg-white/8 hover:bg-white/14 transition-all">
                            Pelajari Lebih Lanjut
                        </a>
                    </div>
                </div>
            </header>

            <section className="relative z-20 -mt-xl px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-md md:gap-lg bg-surface-container-lowest rounded-xl shadow-lg border border-outline-variant p-lg md:p-xl">
                    {[
                        { icon: 'inventory_2', value: loading ? '...' : stats.total_aset, label: 'Total Aset' },
                        { icon: 'event', value: loading ? '...' : stats.kegiatan_aktif, label: 'Kegiatan Aktif' },
                        { icon: 'group', value: loading ? '...' : stats.jamaah_terdaftar, label: 'Jamaah Terdaftar' },
                        { icon: 'payments', value: loading ? '...' : stats.formatted_saldo, label: 'Laporan Saldo' },
                    ].map((stat) => (
                        <div key={stat.label} className="text-center">
                            <div className="w-12 h-12 mx-auto bg-surface-container rounded-full flex items-center justify-center mb-sm text-primary">
                                <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>{stat.icon}</span>
                            </div>
                            <h3 className="font-headline-sm text-headline-sm text-primary">{stat.value}</h3>
                            <p className="font-label-md text-label-md text-on-surface-variant uppercase tracking-wider">{stat.label}</p>
                        </div>
                    ))}
                </div>
            </section>

            <section id="tentang" className="py-xl md:py-[64px] px-margin-mobile md:px-margin-desktop max-w-7xl mx-auto">
                <div className="text-center mb-xl">
                    <h2 className="font-headline-lg text-headline-lg text-primary mb-xs">Layanan Utama</h2>
                    <p className="font-body-lg text-body-lg text-on-surface-variant max-w-2xl mx-auto">Fasilitas dan informasi terpadu untuk kemudahan jamaah masjid.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-lg">
                    {[
                        { icon: 'payments', title: 'Keuangan', desc: 'Laporan pemasukan dan pengeluaran dana infaq secara real-time.', to: '/admin/keuangan' },
                        { icon: 'event', title: 'Jadwal Kegiatan', desc: 'Informasi kajian rutin, shalat jumat, dan acara hari besar Islam.', to: '/kegiatan' },
                        { icon: 'handshake', title: 'Peminjaman', desc: 'Sistem reservasi fasilitas masjid untuk keperluan umat.', to: '/peminjaman/ajukan' },
                        { icon: 'campaign', title: 'Pengumuman', desc: 'Berita dan informasi terkini dari takmir masjid untuk jamaah.', to: '/pengumuman' },
                    ].map((svc) => (
                        <Link to={svc.to} key={svc.title} className="bg-surface-container-lowest rounded-xl p-lg border border-outline-variant shadow-sm hover:shadow-md hover:border-primary/30 transition-all duration-300 hover:-translate-y-1 group block">
                            <div className="w-14 h-14 bg-surface-container-low rounded-lg flex items-center justify-center mb-md group-hover:bg-primary-container transition-colors">
                                <span className="material-symbols-outlined text-[28px] text-primary group-hover:text-on-primary transition-colors">{svc.icon}</span>
                            </div>
                            <h3 className="font-title-md text-title-md text-on-surface mb-xs group-hover:text-primary transition-colors">{svc.title}</h3>
                            <p className="font-body-md text-body-md text-on-surface-variant">{svc.desc}</p>
                        </Link>
                    ))}
                </div>
            </section>
        </>
    );
};

export default Beranda;
