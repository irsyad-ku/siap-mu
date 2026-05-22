import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';
import api from '../../utils/api';

const AjukanPeminjaman = () => {
    const { isAuthenticated, loading: authLoading } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const toast = useToast();

    const [form, setForm] = useState({
        fasilitas: '', tanggal_pinjam: '', tanggal_kembali: '',
        waktu_mulai: '', waktu_selesai: '', keperluan: '', jumlah_peserta: ''
    });

    const [facilities, setFacilities] = useState([]);
    const [facilitiesLoading, setFacilitiesLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);

    // Guard route: redirect to login if not authenticated
    useEffect(() => {
        if (!authLoading && !isAuthenticated) {
            toast.error('Silakan login terlebih dahulu untuk mengajukan peminjaman.');
            navigate('/login', { replace: true });
        }
    }, [isAuthenticated, authLoading]);

    // Fetch active facilities
    useEffect(() => {
        if (isAuthenticated) {
            const fetchFacilities = async () => {
                try {
                    const res = await api.get('/fasilitas');
                    // Check if paginated or direct array
                    setFacilities(res.data.data || res.data || []);
                } catch (err) {
                    toast.error('Gagal mengambil daftar fasilitas.');
                } finally {
                    setFacilitiesLoading(false);
                }
            };
            fetchFacilities();
        }
    }, [isAuthenticated, toast]);

    const handleChange = (e) => {
        setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setSubmitting(true);
        try {
            await api.post('/peminjaman', {
                id_fasilitas: form.fasilitas,
                tanggal_pinjam: form.tanggal_pinjam,
                tanggal_kembali: form.tanggal_kembali,
                waktu_mulai: form.waktu_mulai,
                waktu_selesai: form.waktu_selesai,
                keperluan: form.keperluan,
                jumlah_peserta: form.jumlah_peserta ? parseInt(form.jumlah_peserta) : null,
            });
            toast.success('Pengajuan peminjaman berhasil dikirim!');
            navigate('/peminjaman/status');
        } catch (err) {
            console.error(err);
            const msg = err.response?.data?.message || 'Gagal mengirim pengajuan peminjaman.';
            const errors = err.response?.data?.errors;
            if (errors) {
                const firstErr = Object.values(errors)[0]?.[0];
                toast.error(firstErr || msg);
            } else {
                toast.error(msg);
            }
        } finally {
            setSubmitting(false);
        }
    };

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
                        <span className="material-symbols-outlined text-sm">handshake</span>
                        <span className="font-label-md text-label-md">Layanan Fasilitas</span>
                    </div>
                    <h1 className="font-headline-xl text-headline-xl mb-md tracking-tight">Ajukan Peminjaman Fasilitas</h1>
                    <p className="font-body-lg text-body-lg text-on-primary/90 max-w-2xl mx-auto">Isi formulir di bawah ini untuk mengajukan peminjaman fasilitas masjid. Pengurus akan memproses pengajuan Anda dalam 1x24 jam.</p>
                </div>
            </section>

            <main className="max-w-3xl mx-auto px-lg -mt-xl relative z-20 pb-xl">
                <div className="bg-surface-container-lowest rounded-xl border border-[#D1FAE5] shadow-lg p-lg md:p-xl">
                    <div className="flex items-center gap-md mb-xl pb-md border-b border-outline-variant">
                        <div className="w-12 h-12 rounded-full bg-primary-container/10 flex items-center justify-center text-primary">
                            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>edit_document</span>
                        </div>
                        <div>
                            <h2 className="font-title-md text-title-md text-on-surface">Formulir Peminjaman</h2>
                            <p className="font-body-md text-body-md text-on-surface-variant">Lengkapi semua data yang diperlukan</p>
                        </div>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-lg">
                        <div className="relative border border-outline-variant rounded-lg focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                            <label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-label-md text-primary">Pilih Fasilitas</label>
                            <select name="fasilitas" value={form.fasilitas} onChange={handleChange} className="w-full bg-transparent border-none focus:ring-0 text-body-lg font-body-lg text-on-surface p-md rounded-lg" required disabled={facilitiesLoading}>
                                <option value="">{facilitiesLoading ? 'Memuat daftar fasilitas...' : 'Pilih Fasilitas...'}</option>
                                {facilities.map(f => (
                                    <option key={f.id_fasilitas} value={f.id_fasilitas}>
                                        {f.nama_fasilitas} {f.kapasitas ? `(Kapasitas: ${f.kapasitas} orang)` : ''}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                            <div className="relative border border-outline-variant rounded-lg focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                                <label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-label-md text-primary">Tanggal Pinjam</label>
                                <input type="date" name="tanggal_pinjam" value={form.tanggal_pinjam} onChange={handleChange} className="w-full bg-transparent border-none focus:ring-0 text-body-lg font-body-lg text-on-surface p-md rounded-lg" required />
                            </div>
                            <div className="relative border border-outline-variant rounded-lg focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                                <label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-label-md text-primary">Tanggal Kembali</label>
                                <input type="date" name="tanggal_kembali" value={form.tanggal_kembali} onChange={handleChange} className="w-full bg-transparent border-none focus:ring-0 text-body-lg font-body-lg text-on-surface p-md rounded-lg" required />
                            </div>
                        </div>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-lg">
                            <div className="relative border border-outline-variant rounded-lg focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                                <label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-label-md text-primary">Waktu Mulai</label>
                                <input type="time" name="waktu_mulai" value={form.waktu_mulai} onChange={handleChange} className="w-full bg-transparent border-none focus:ring-0 text-body-lg font-body-lg text-on-surface p-md rounded-lg" required />
                            </div>
                            <div className="relative border border-outline-variant rounded-lg focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                                <label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-label-md text-primary">Waktu Selesai</label>
                                <input type="time" name="waktu_selesai" value={form.waktu_selesai} onChange={handleChange} className="w-full bg-transparent border-none focus:ring-0 text-body-lg font-body-lg text-on-surface p-md rounded-lg" required />
                            </div>
                        </div>

                        <div className="relative border border-outline-variant rounded-lg focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                            <label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-label-md text-primary">Jumlah Peserta</label>
                            <input type="number" name="jumlah_peserta" value={form.jumlah_peserta} onChange={handleChange} className="w-full bg-transparent border-none focus:ring-0 text-body-lg font-body-lg text-on-surface p-md rounded-lg" placeholder="Perkiraan jumlah peserta" />
                        </div>

                        <div className="relative border border-outline-variant rounded-lg focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                            <label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-label-md text-primary">Keperluan</label>
                            <textarea name="keperluan" value={form.keperluan} onChange={handleChange} className="w-full bg-transparent border-none focus:ring-0 text-body-lg font-body-lg text-on-surface p-md rounded-lg resize-none" rows="4" placeholder="Jelaskan keperluan peminjaman fasilitas..." required></textarea>
                        </div>

                        <div className="bg-surface-container-low rounded-lg p-md flex items-start gap-md">
                            <span className="material-symbols-outlined text-primary mt-xs">info</span>
                            <div>
                                <p className="font-body-md text-body-md text-on-surface-variant">Pengajuan akan diproses oleh pengurus masjid dalam <strong className="text-primary">1x24 jam</strong>. Anda dapat memantau status pengajuan di halaman <strong>Status Peminjaman</strong>.</p>
                            </div>
                        </div>

                        <div className="pt-lg border-t border-outline-variant flex flex-col sm:flex-row justify-end gap-md">
                            <button type="button" onClick={() => navigate('/peminjaman/status')} className="px-6 py-2.5 rounded-lg border border-primary text-primary font-title-md text-title-md hover:bg-primary-container/5 transition-colors">Batal</button>
                            <button type="submit" disabled={submitting} className="px-6 py-2.5 rounded-lg btn-primary text-white font-title-md text-title-md transition-all shadow-md flex items-center justify-center gap-sm disabled:opacity-70">
                                {submitting ? (
                                    <>
                                        <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                        Mengirim...
                                    </>
                                ) : (
                                    <>
                                        <span className="material-symbols-outlined text-[20px]">send</span>
                                        Kirim Pengajuan
                                    </>
                                )}
                            </button>
                        </div>
                    </form>
                </div>
            </main>
        </div>
    );
};

export default AjukanPeminjaman;
