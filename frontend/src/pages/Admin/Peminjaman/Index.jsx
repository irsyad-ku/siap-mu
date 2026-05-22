import React, { useState } from 'react';
import AdminCrudPage from '../../../components/AdminCrudPage';
import api from '../../../utils/api';
import { useToast } from '../../../contexts/ToastContext';

const statusBadge = (status) => {
    const map = {
        menunggu: { label: 'MENUNGGU', color: 'bg-[#E67E22]/10 text-[#E67E22]' },
        disetujui: { label: 'DISETUJUI', color: 'bg-[#27AE60]/10 text-[#27AE60]' },
        ditolak: { label: 'DITOLAK', color: 'bg-[#E74C3C]/10 text-[#E74C3C]' },
        selesai: { label: 'SELESAI', color: 'bg-surface-variant text-on-surface-variant' },
    };
    const s = map[status] || { label: status, color: 'bg-surface-variant text-on-surface-variant' };
    return <span className={`px-2 py-1 rounded-full ${s.color} font-label-md text-[10px] font-bold`}>{s.label}</span>;
};

const PeminjamanIndex = () => {
    const [selectedPeminjaman, setSelectedPeminjaman] = useState(null);
    const [status, setStatus] = useState('');
    const [catatan, setCatatan] = useState('');
    const [saving, setSaving] = useState(false);
    const [refreshKey, setRefreshKey] = useState(0);
    const toast = useToast();

    const handleEdit = (item) => {
        setSelectedPeminjaman(item);
        setStatus(item.status);
        setCatatan(item.catatan_pengurus || '');
    };

    const handleSave = async (e) => {
        e.preventDefault();
        setSaving(true);
        try {
            await api.put(`/peminjaman/${selectedPeminjaman.id_pinjam}`, {
                status,
                catatan_pengurus: catatan,
            });
            toast.success('Peminjaman berhasil diupdate.');
            setRefreshKey(prev => prev + 1);
            setSelectedPeminjaman(null);
        } catch (err) {
            toast.error(err.response?.data?.message || 'Gagal mengupdate peminjaman.');
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="relative">
            <AdminCrudPage
                key={refreshKey}
                title="Daftar Peminjaman"
                subtitle="Kelola dan proses pengajuan peminjaman fasilitas."
                icon="handshake"
                apiEndpoint="/peminjaman"
                idField="id_pinjam"
                columns={['Peminjam', 'Fasilitas', 'Tanggal', 'Waktu', 'Keperluan', 'Status']}
                searchFields={['keperluan']}
                onEdit={handleEdit}
                renderRow={(item) => (
                    <>
                        <td className="py-md px-lg text-on-surface font-medium">{item.user?.nama || `User #${item.id_user}`}</td>
                        <td className="py-md px-lg text-on-surface-variant">{item.fasilitas?.nama_fasilitas || `Fasilitas #${item.id_fasilitas}`}</td>
                        <td className="py-md px-lg text-on-surface-variant">{item.tanggal_pinjam}</td>
                        <td className="py-md px-lg text-on-surface-variant">{item.waktu_mulai?.slice(0, 5)} - {item.waktu_selesai?.slice(0, 5)}</td>
                        <td className="py-md px-lg text-on-surface-variant max-w-[150px] truncate">{item.keperluan}</td>
                        <td className="py-md px-lg">{statusBadge(item.status)}</td>
                    </>
                )}
            />

            {/* Premium Approval Modal */}
            {selectedPeminjaman && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-md bg-black/60 backdrop-blur-sm transition-opacity duration-300">
                    <div className="bg-white rounded-2xl max-w-lg w-full overflow-hidden border border-[#D1FAE5] shadow-2xl animate-in fade-in zoom-in-95 duration-200">
                        {/* Header */}
                        <div className="relative bg-gradient-to-r from-primary to-primary-container text-white p-lg">
                            <button onClick={() => setSelectedPeminjaman(null)} className="absolute top-md right-md text-white/80 hover:text-white hover:bg-white/10 p-xs rounded-full transition-all">
                                <span className="material-symbols-outlined text-[24px]">close</span>
                            </button>
                            <span className="font-label-md text-label-md text-white/85 tracking-wider block mb-xs">PROSES PEMINJAMAN</span>
                            <h3 className="font-title-lg text-title-lg font-bold">PJ-{String(selectedPeminjaman.id_pinjam).padStart(4, '0')}</h3>
                        </div>

                        <form onSubmit={handleSave}>
                            {/* Content */}
                            <div className="p-lg space-y-md max-h-[60vh] overflow-y-auto">
                                <div className="grid grid-cols-2 gap-sm pb-md border-b border-outline-variant">
                                    <div>
                                        <span className="font-label-md text-label-md text-outline block">Peminjam</span>
                                        <span className="font-body-lg text-body-lg font-semibold text-on-surface">{selectedPeminjaman.user?.nama || `User #${selectedPeminjaman.id_user}`}</span>
                                        {selectedPeminjaman.user?.no_hp && (
                                            <span className="text-[11px] text-on-surface-variant block mt-xs">{selectedPeminjaman.user.no_hp}</span>
                                        )}
                                    </div>
                                    <div>
                                        <span className="font-label-md text-label-md text-outline block">Fasilitas</span>
                                        <span className="font-body-lg text-body-lg font-semibold text-on-surface">{selectedPeminjaman.fasilitas?.nama_fasilitas || `Fasilitas #${selectedPeminjaman.id_fasilitas}`}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-2 gap-sm pb-md border-b border-outline-variant">
                                    <div>
                                        <span className="font-label-md text-label-md text-outline block">Tanggal Pinjam</span>
                                        <span className="font-body-md text-body-md text-on-surface">{selectedPeminjaman.tanggal_pinjam}</span>
                                    </div>
                                    <div>
                                        <span className="font-label-md text-label-md text-outline block">Waktu Penggunaan</span>
                                        <span className="font-body-md text-body-md text-on-surface">{selectedPeminjaman.waktu_mulai?.slice(0, 5)} - {selectedPeminjaman.waktu_selesai?.slice(0, 5)}</span>
                                    </div>
                                </div>

                                <div>
                                    <span className="font-label-md text-label-md text-outline block">Keperluan</span>
                                    <p className="font-body-md text-body-md text-on-surface bg-surface-container-lowest p-md rounded-lg border border-outline-variant mt-xs whitespace-pre-wrap">{selectedPeminjaman.keperluan}</p>
                                </div>

                                {/* Form Fields */}
                                <div className="pt-md border-t border-outline-variant space-y-md">
                                    <div className="relative border border-outline-variant rounded-lg focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                                        <label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-label-md text-primary">Status Peminjaman</label>
                                        <select value={status} onChange={(e) => setStatus(e.target.value)} className="w-full bg-transparent border-none focus:ring-0 text-body-lg font-body-lg text-on-surface p-md rounded-lg" required>
                                            <option value="menunggu">Menunggu Persetujuan</option>
                                            <option value="disetujui">Disetujui</option>
                                            <option value="ditolak">Ditolak</option>
                                            <option value="selesai">Selesai / Selesai Digunakan</option>
                                        </select>
                                    </div>

                                    <div className="relative border border-outline-variant rounded-lg focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all">
                                        <label className="absolute -top-2.5 left-3 bg-white px-1 text-label-md font-label-md text-primary">Catatan Pengurus</label>
                                        <textarea value={catatan} onChange={(e) => setCatatan(e.target.value)} className="w-full bg-transparent border-none focus:ring-0 text-body-lg font-body-lg text-on-surface p-md rounded-lg resize-none" rows="3" placeholder="Tulis catatan, instruksi pengambilan kunci, atau alasan penolakan..."></textarea>
                                    </div>
                                </div>
                            </div>

                            {/* Footer */}
                            <div className="p-md bg-surface-container-low border-t border-outline-variant flex justify-end gap-md">
                                <button type="button" onClick={() => setSelectedPeminjaman(null)} className="px-lg py-sm rounded-lg border border-primary text-primary font-title-md text-title-md hover:bg-primary-container/5 transition-colors">Batal</button>
                                <button type="submit" disabled={saving} className="px-lg py-sm rounded-lg btn-primary text-white font-title-md text-title-md shadow-md transition-all flex items-center justify-center gap-sm disabled:opacity-70">
                                    {saving ? (
                                        <>
                                            <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                            Menyimpan...
                                        </>
                                    ) : (
                                        <>
                                            <span className="material-symbols-outlined text-[20px]">save</span>
                                            Simpan Perubahan
                                        </>
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PeminjamanIndex;
