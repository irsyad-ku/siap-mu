import React from 'react';
import AdminCrudPage from '../../../components/AdminCrudPage';

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

const PeminjamanIndex = () => (
    <AdminCrudPage
        title="Daftar Peminjaman"
        subtitle="Kelola dan proses pengajuan peminjaman fasilitas."
        icon="handshake"
        apiEndpoint="/peminjaman"
        idField="id_pinjam"
        columns={['Peminjam', 'Fasilitas', 'Tanggal', 'Waktu', 'Keperluan', 'Status']}
        searchFields={['keperluan']}
        renderRow={(item) => (
            <>
                <td className="py-md px-lg text-on-surface font-medium">{item.user?.nama || `User #${item.id_user}`}</td>
                <td className="py-md px-lg text-on-surface-variant">{item.fasilitas?.nama_fasilitas || `Fasilitas #${item.id_fasilitas}`}</td>
                <td className="py-md px-lg text-on-surface-variant">{new Date(item.tanggal_pinjam).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                <td className="py-md px-lg text-on-surface-variant">{item.waktu_mulai?.slice(0, 5)} - {item.waktu_selesai?.slice(0, 5)}</td>
                <td className="py-md px-lg text-on-surface-variant max-w-[150px] truncate">{item.keperluan}</td>
                <td className="py-md px-lg">{statusBadge(item.status)}</td>
            </>
        )}
    />
);

export default PeminjamanIndex;
