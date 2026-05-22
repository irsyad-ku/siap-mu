import React from 'react';

const Pengumuman = () => (
    <div className="bg-surface text-on-surface antialiased min-h-screen flex flex-col">
        <section className="relative bg-gradient-to-br from-primary via-primary-container to-secondary text-on-primary py-[100px] px-lg overflow-hidden">
            <div className="absolute top-0 right-0 w-96 h-96 bg-white/5 rounded-full blur-3xl -translate-y-1/2 translate-x-1/3"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-secondary-fixed/10 rounded-full blur-2xl translate-y-1/3 -translate-x-1/4"></div>
            <div className="relative z-10 max-w-4xl mx-auto text-center">
                <div className="inline-flex items-center gap-sm bg-white/10 backdrop-blur-sm px-md py-sm rounded-full mb-lg border border-white/20">
                    <span className="material-symbols-outlined text-sm">notifications_active</span>
                    <span className="font-label-md text-label-md">Pusat Informasi</span>
                </div>
                <h1 className="font-headline-xl text-headline-xl mb-md tracking-tight">Pengumuman Masjid</h1>
                <p className="font-body-lg text-body-lg text-on-primary/90 max-w-2xl mx-auto">Dapatkan informasi terbaru, jadwal kegiatan, dan pengumuman penting lainnya terkait operasional dan program Masjid Umat.</p>
            </div>
        </section>
        <main className="flex-grow max-w-7xl mx-auto w-full px-lg py-xl">
            <div className="flex flex-col md:flex-row justify-between items-center mb-xl gap-md">
                <h2 className="font-headline-md text-headline-md text-primary hidden md:block">Terbaru</h2>
                <div className="relative w-full md:w-auto">
                    <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-outline">search</span>
                    <input className="w-full md:w-80 pl-10 pr-4 py-2 rounded-full border border-outline-variant bg-surface-container-lowest focus:ring-2 focus:ring-primary focus:border-primary font-body-md text-body-md outline-none transition-shadow" placeholder="Cari pengumuman..." type="text" />
                </div>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-lg">
                {[
                    { title: 'Pendaftaran TPA Angkatan Baru Periode 2026/2027 Resmi Dibuka', date: '24 Okt 2026', desc: "Assalamu'alaikum. Pendaftaran santri baru TPA Masjid Umat telah dibuka mulai tanggal 1 November 2026. Kuota terbatas." },
                    { title: 'Kerja Bakti Rutin Membersihkan Area Masjid', date: '20 Okt 2026', desc: 'Mengundang seluruh warga untuk kerja bakti rutin hari Ahad pagi. Mari bersama menjaga kebersihan rumah Allah.' },
                    { title: 'Laporan Keuangan Infaq Bulanan - September 2026', date: '15 Okt 2026', desc: 'Alhamdulillah, berikut rekapitulasi laporan keuangan infaq masjid periode September 2026.' },
                    { title: "Kajian Rutin Ba'da Maghrib Bersama Ustadz Abdul Somad", date: '10 Okt 2026', desc: "Hadirilah kajian tematik Kamis malam ba'da Maghrib. Tema: Membangun Generasi Qur'ani." },
                    { title: 'Pemberitahuan Perbaikan Fasilitas Tempat Wudhu Pria', date: '05 Okt 2026', desc: 'Mohon maaf, sedang dilakukan renovasi tempat wudhu pria. Gunakan area wudhu sementara di sisi utara.' },
                ].map((item) => (
                    <article key={item.title} className="bg-surface-container-lowest rounded-xl border border-primary-fixed-dim p-lg shadow-[0_4px_12px_rgba(15,110,86,0.05)] hover:shadow-[0_8px_24px_rgba(15,110,86,0.1)] transition-all duration-300 relative group flex flex-col h-full">
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary to-secondary scale-x-0 group-hover:scale-x-100 origin-left transition-transform duration-300"></div>
                        <div className="flex justify-between items-start mb-md">
                            <div className="w-12 h-12 rounded-full bg-surface-container text-primary flex items-center justify-center group-hover:bg-primary group-hover:text-on-primary transition-colors duration-300">
                                <span className="material-symbols-outlined">campaign</span>
                            </div>
                            <div className="bg-surface-container-high px-sm py-xs rounded-md"><span className="font-label-md text-label-md text-on-surface-variant">{item.date}</span></div>
                        </div>
                        <h3 className="font-title-md text-title-md text-on-surface mb-sm line-clamp-2">{item.title}</h3>
                        <p className="font-body-md text-body-md text-on-surface-variant mb-lg line-clamp-3 flex-grow">{item.desc}</p>
                        <div className="pt-md border-t border-outline-variant/50 mt-auto">
                            <a href="#" className="inline-flex items-center gap-sm font-label-md text-label-md text-primary hover:text-secondary transition-colors">
                                Baca Selengkapnya <span className="material-symbols-outlined text-sm">arrow_forward</span>
                            </a>
                        </div>
                    </article>
                ))}
            </div>
        </main>
    </div>
);

export default Pengumuman;
