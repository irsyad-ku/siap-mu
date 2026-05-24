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
                    <svg className="absolute left-1/2 top-[45%] h-[360px] w-[760px] -translate-x-1/2 -translate-y-1/2 text-white/10 md:h-[440px] md:w-[940px]" viewBox="0 0 940 440" fill="none" aria-hidden="true">
                        <path d="M128 332H812V382H128V332Z" fill="currentColor" />
                        <path d="M172 212H768V332H172V212Z" fill="currentColor" />
                        <path d="M302 212C324 132 394 84 470 84C546 84 616 132 638 212H302Z" fill="currentColor" />
                        <path d="M252 212C252 166 216 130 172 130C128 130 92 166 92 212V332H252V212Z" fill="currentColor" />
                        <path d="M848 212C848 166 812 130 768 130C724 130 688 166 688 212V332H848V212Z" fill="currentColor" />
                        <path d="M84 142H132V332H84V142Z" fill="currentColor" />
                        <path d="M808 142H856V332H808V142Z" fill="currentColor" />
                        <path d="M98 92L132 142H64L98 92Z" fill="currentColor" />
                        <path d="M832 92L866 142H798L832 92Z" fill="currentColor" />
                        <path d="M432 262C432 238 449 220 470 220C491 220 508 238 508 262V332H432V262Z" fill="#045340" fillOpacity="0.42" />
                        <path d="M280 262C280 242 294 226 312 226C330 226 344 242 344 262V332H280V262Z" fill="#045340" fillOpacity="0.36" />
                        <path d="M596 262C596 242 610 226 628 226C646 226 660 242 660 262V332H596V262Z" fill="#045340" fillOpacity="0.36" />
                    </svg>
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
