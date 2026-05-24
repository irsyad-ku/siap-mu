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
            <header className="relative w-full min-h-[80vh] flex items-center justify-center bg-primary overflow-hidden">
                <div className="absolute inset-0 z-0">
                    <div className="absolute inset-0 bg-gradient-to-b from-primary/80 via-primary to-surface"></div>
                </div>
                <div className="relative z-10 text-center px-margin-mobile md:px-margin-desktop max-w-4xl mx-auto mt-xl">
                    <h1 className="font-headline-xl text-headline-xl md:text-[48px] md:leading-[56px] text-on-primary mb-md tracking-tight">Selamat Datang di SIAP-MU</h1>
                    <p className="font-body-lg text-body-lg text-primary-fixed mb-xl max-w-2xl mx-auto opacity-90">Sistem Informasi Administrasi Masjid Umat yang modern, transparan, and terintegrasi. Memudahkan pengurus dan jamaah dalam mengelola kegiatan serta keuangan masjid.</p>
                    <div className="flex flex-col sm:flex-row gap-md justify-center items-center">
                        <a href="#jadwal" className="w-full sm:w-auto inline-flex items-center justify-center px-xl py-md rounded-full btn-primary-gradient text-on-primary font-title-md text-title-md shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5">
                            Lihat Jadwal
                            <span className="material-symbols-outlined ml-sm text-lg">arrow_forward</span>
                        </a>
                        <a href="#tentang" className="w-full sm:w-auto inline-flex items-center justify-center px-xl py-md rounded-full border border-primary-fixed text-primary-fixed font-title-md text-title-md hover:bg-primary-fixed/10 transition-all">
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
