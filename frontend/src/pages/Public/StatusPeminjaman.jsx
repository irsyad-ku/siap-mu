import React from 'react';

const StatusPeminjaman = () => {
    const data = [
        { id: 'PJ-2026-001', fasilitas: 'Aula Utama', tanggal: '10 Okt 2026', waktu: '08:00 - 12:00', keperluan: 'Acara Pengajian Akbar', status: 'menunggu' },
        { id: 'PJ-2026-002', fasilitas: 'Sound System', tanggal: '08 Okt 2026', waktu: '19:00 - 21:00', keperluan: 'Kegiatan Remaja Masjid', status: 'disetujui' },
        { id: 'PJ-2026-003', fasilitas: 'Ruang Rapat', tanggal: '05 Okt 2026', waktu: '14:00 - 16:00', keperluan: 'Rapat Koordinasi RT', status: 'ditolak' },
        { id: 'PJ-2026-004', fasilitas: 'Tenda Kerucut', tanggal: '01 Okt 2026', waktu: '07:00 - 17:00', keperluan: 'Bazaar Amal', status: 'selesai' },
    ];

    const statusConfig = {
        menunggu: { label: 'MENUNGGU', color: 'bg-[#E67E22]/10 text-[#E67E22]', icon: 'hourglass_top' },
        disetujui: { label: 'DISETUJUI', color: 'bg-[#27AE60]/10 text-[#27AE60]', icon: 'check_circle' },
        ditolak: { label: 'DITOLAK', color: 'bg-[#E74C3C]/10 text-[#E74C3C]', icon: 'cancel' },
        selesai: { label: 'SELESAI', color: 'bg-surface-variant text-on-surface-variant', icon: 'task_alt' },
    };

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
                    <p className="font-body-lg text-body-lg text-on-primary/90 max-w-2xl mx-auto">Pantau status pengajuan peminjaman fasilitas masjid Anda di sini.</p>
                </div>
            </section>

            <main className="max-w-5xl mx-auto px-lg -mt-xl relative z-20 pb-xl">
                {/* Summary Cards */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-md mb-xl">
                    {[
                        { icon: 'hourglass_top', value: '1', label: 'Menunggu', bg: 'bg-[#E67E22]/10', text: 'text-[#E67E22]' },
                        { icon: 'check_circle', value: '1', label: 'Disetujui', bg: 'bg-[#27AE60]/10', text: 'text-[#27AE60]' },
                        { icon: 'cancel', value: '1', label: 'Ditolak', bg: 'bg-[#E74C3C]/10', text: 'text-[#E74C3C]' },
                        { icon: 'task_alt', value: '1', label: 'Selesai', bg: 'bg-surface-variant', text: 'text-on-surface-variant' },
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
                            <input type="text" placeholder="Cari peminjaman..." className="w-full bg-surface-container-low border border-outline-variant rounded-full py-2 pl-xl pr-sm text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                        </div>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-surface-container-low font-label-md text-label-md text-on-surface-variant border-b border-outline-variant">
                                    <th className="py-md px-lg font-semibold">ID</th>
                                    <th className="py-md px-lg font-semibold">Fasilitas</th>
                                    <th className="py-md px-lg font-semibold">Tanggal</th>
                                    <th className="py-md px-lg font-semibold">Waktu</th>
                                    <th className="py-md px-lg font-semibold">Keperluan</th>
                                    <th className="py-md px-lg font-semibold">Status</th>
                                </tr>
                            </thead>
                            <tbody className="font-body-md text-body-md">
                                {data.map((row) => {
                                    const sc = statusConfig[row.status];
                                    return (
                                        <tr key={row.id} className="border-b border-outline-variant/50 hover:bg-surface-container-lowest transition-colors">
                                            <td className="py-md px-lg text-primary font-semibold">{row.id}</td>
                                            <td className="py-md px-lg text-on-surface">{row.fasilitas}</td>
                                            <td className="py-md px-lg text-on-surface-variant">{row.tanggal}</td>
                                            <td className="py-md px-lg text-on-surface-variant">{row.waktu}</td>
                                            <td className="py-md px-lg text-on-surface-variant max-w-[200px] truncate">{row.keperluan}</td>
                                            <td className="py-md px-lg">
                                                <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-full ${sc.color} font-label-md text-[10px] font-bold`}>
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
        </div>
    );
};

export default StatusPeminjaman;
