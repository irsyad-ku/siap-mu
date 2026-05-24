import React, { useState, useEffect } from 'react';
import api from '../../utils/api';

const KegiatanPublik = () => {
    const [kegiatan, setKegiatan] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const [filterStatus, setFilterStatus] = useState('semua');

    useEffect(() => {
        setLoading(true);
        const endpoint = filterStatus === 'semua' ? '/public-kegiatan' : `/public-kegiatan?status=${filterStatus}`;
        api.get(endpoint)
            .then(res => {
                if (res.data) {
                    setKegiatan(res.data.data || res.data);
                }
            })
            .catch(err => {
                console.error("Gagal mengambil data kegiatan:", err);
            })
            .finally(() => {
                setLoading(false);
            });
    }, [filterStatus]);

    const filteredKegiatan = kegiatan.filter(item => 
        item.nama_kegiatan.toLowerCase().includes(search.toLowerCase()) ||
        (item.deskripsi && item.deskripsi.toLowerCase().includes(search.toLowerCase())) ||
        (item.lokasi && item.lokasi.toLowerCase().includes(search.toLowerCase()))
    );

    const statusBadgeMap = {
        akan_datang: 'bg-primary/10 text-primary border border-primary/20',
        berlangsung: 'bg-secondary-container text-on-secondary-container border border-secondary-fixed-dim',
        selesai: 'bg-outline-variant/30 text-on-surface-variant border border-outline-variant',
        dibatalkan: 'bg-error/10 text-error border border-error/20'
    };

    const statusLabelMap = {
        akan_datang: 'Akan Datang',
        berlangsung: 'Berlangsung',
        selesai: 'Selesai',
        dibatalkan: 'Dibatalkan'
    };

    return (
        <div className="bg-surface text-on-surface antialiased min-h-screen flex flex-col relative overflow-hidden bg-gradient-to-br from-[#E8F5EF] via-[#F4FCF7] to-[#FFFFFF]">
            {/* Ambient Background Decorative Blobs */}
            <div className="absolute -top-10 -left-10 w-80 h-80 bg-[#005440]/5 rounded-full blur-[80px] pointer-events-none"></div>
            <div className="absolute top-1/3 right-10 w-96 h-96 bg-[#0A7C5F]/5 rounded-full blur-[100px] pointer-events-none"></div>

            <section className="relative bg-gradient-to-r from-[#005440] to-[#0A7C5F] text-white py-[100px] px-lg overflow-hidden border-b border-[#A7F3D0]/20 shadow-md">
                <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/5 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4"></div>
                
                <div className="relative z-10 max-w-4xl mx-auto text-center">
                    <div className="inline-flex items-center gap-sm bg-white/10 backdrop-blur-sm px-md py-sm rounded-full mb-lg border border-white/20">
                        <span className="material-symbols-outlined text-sm">calendar_month</span>
                        <span className="font-label-md text-label-md">Jadwal Agenda Umat</span>
                    </div>
                    <h1 className="font-headline-xl text-headline-xl mb-md tracking-tight font-bold">Jadwal Kegiatan Masjid</h1>
                    <p className="font-body-lg text-body-lg text-white/90 max-w-2xl mx-auto">Pantau terus agenda kajian rutin, shalat berjamaah, perayaan hari besar Islam, dan aktivitas sosial keumatan di Masjid Umat.</p>
                </div>
            </section>

            <main className="flex-grow max-w-7xl mx-auto w-full px-lg py-xl relative z-10">
                {/* Search & Filter Section */}
                <div className="bg-white/80 backdrop-blur-md p-lg rounded-2xl border border-[#A7F3D0]/60 shadow-md flex flex-col md:flex-row justify-between items-center mb-xl gap-md transition-all">
                    {/* Status Tabs */}
                    <div className="flex flex-wrap gap-xs w-full md:w-auto">
                        {[
                            { key: 'semua', label: 'Semua Agenda' },
                            { key: 'akan_datang', label: 'Akan Datang' },
                            { key: 'berlangsung', label: 'Sedang Berlangsung' },
                            { key: 'selesai', label: 'Telah Selesai' }
                        ].map(tab => (
                            <button
                                key={tab.key}
                                onClick={() => setFilterStatus(tab.key)}
                                className={`px-lg py-sm rounded-full text-label-md font-semibold transition-all duration-200 ${
                                    filterStatus === tab.key
                                        ? 'bg-[#005440] text-white shadow-sm'
                                        : 'bg-white text-on-surface-variant border border-[#A7F3D0] hover:bg-[#005440]/5'
                                }`}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>

                    {/* Search Field */}
                    <div className="relative w-full md:w-80">
                        <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
                        <input 
                            className="w-full pl-10 pr-4 py-sm rounded-full border border-[#A7F3D0] bg-white focus:ring-2 focus:ring-[#005440]/20 focus:border-[#005440] font-body-md text-body-md outline-none transition-all" 
                            placeholder="Cari nama atau deskripsi..." 
                            type="text" 
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <div className="w-10 h-10 border-4 border-[#005440]/30 border-t-[#005440] rounded-full animate-spin mb-md"></div>
                        <p className="font-title-md text-title-md text-on-surface-variant animate-pulse">Memuat agenda kegiatan...</p>
                    </div>
                ) : filteredKegiatan.length === 0 ? (
                    <div className="bg-white/80 backdrop-blur-md border border-[#A7F3D0]/60 rounded-2xl p-xl text-center max-w-md mx-auto shadow-md">
                        <span className="material-symbols-outlined text-[48px] text-on-surface-variant/40 mb-sm">event_busy</span>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface font-bold">Tidak Ada Kegiatan</h3>
                        <p className="font-body-md text-body-md text-on-surface-variant mt-xs">Maaf, saat ini belum ada agenda kegiatan yang terdaftar untuk kategori ini.</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
                        {filteredKegiatan.map((item) => (
                            <article key={item.id_kegiatan} className="bg-white/90 backdrop-blur-md rounded-2xl border border-[#A7F3D0]/60 p-lg shadow-sm hover:shadow-md transition-all duration-300 relative group flex flex-col h-full overflow-hidden">
                                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-[#005440] to-[#0A7C5F] scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></div>
                                
                                <div className="flex justify-between items-start mb-md">
                                    <div className="w-12 h-12 rounded-xl bg-[#005440]/5 text-[#005440] flex items-center justify-center group-hover:bg-[#005440] group-hover:text-white transition-colors duration-300">
                                        <span className="material-symbols-outlined">event</span>
                                    </div>
                                    <span className={`px-sm py-xs rounded-full font-label-md text-[11px] font-bold uppercase tracking-wider ${statusBadgeMap[item.status] || 'bg-surface-variant'}`}>
                                        {statusLabelMap[item.status] || item.status}
                                    </span>
                                </div>

                                <h3 className="font-title-lg text-title-lg text-on-surface mb-xs font-bold line-clamp-2 leading-snug group-hover:text-[#005440] transition-colors">{item.nama_kegiatan}</h3>
                                <p className="font-body-md text-body-md text-on-surface-variant mb-md line-clamp-3 flex-grow">{item.deskripsi || 'Tidak ada deskripsi kegiatan.'}</p>
                                
                                <div className="pt-md border-t border-[#A7F3D0]/60 space-y-sm text-body-md text-on-surface-variant mt-auto">
                                    <div className="flex items-center gap-xs">
                                        <span className="material-symbols-outlined text-[18px] text-[#005440]">calendar_today</span>
                                        <span>{item.tanggal}</span>
                                    </div>
                                    <div className="flex items-center gap-xs">
                                        <span className="material-symbols-outlined text-[18px] text-[#005440]">schedule</span>
                                        <span>{item.waktu_mulai.substring(0, 5)} {item.waktu_selesai ? `- ${item.waktu_selesai.substring(0, 5)}` : ''} WIB</span>
                                    </div>
                                    <div className="flex items-center gap-xs">
                                        <span className="material-symbols-outlined text-[18px] text-[#005440]">location_on</span>
                                        <span className="truncate">{item.lokasi}</span>
                                    </div>
                                </div>
                            </article>
                        ))}
                    </div>
                )}
            </main>
        </div>
    );
};

export default KegiatanPublik;
