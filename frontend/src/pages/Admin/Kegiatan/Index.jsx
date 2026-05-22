import React from 'react';
import AdminCrudPage from '../../../components/AdminCrudPage';

const statusBadge = (status) => {
    const map = {
        akan_datang: { label: 'AKAN DATANG', color: 'bg-[#3498DB]/10 text-[#3498DB]' },
        berlangsung: { label: 'BERLANGSUNG', color: 'bg-[#27AE60]/10 text-[#27AE60]' },
        selesai: { label: 'SELESAI', color: 'bg-surface-variant text-on-surface-variant' },
        dibatalkan: { label: 'DIBATALKAN', color: 'bg-[#E74C3C]/10 text-[#E74C3C]' },
    };
    const s = map[status] || { label: status, color: 'bg-surface-variant text-on-surface-variant' };
    return <span className={`px-2 py-1 rounded-full ${s.color} font-label-md text-[10px] font-bold`}>{s.label}</span>;
};

const KegiatanIndex = () => (
    <AdminCrudPage
        title="Daftar Kegiatan"
        subtitle="Kelola jadwal kegiatan dan program masjid."
        icon="event"
        apiEndpoint="/kegiatan"
        idField="id_kegiatan"
        columns={['Nama Kegiatan', 'Tanggal', 'Waktu', 'Lokasi', 'Status']}
        searchFields={['nama_kegiatan', 'lokasi']}
        addLabel="Tambah Kegiatan"
        addLink="/admin/kegiatan/form"
        renderRow={(item) => (
            <>
                <td className="py-md px-lg text-on-surface font-medium">{item.nama_kegiatan}</td>
                <td className="py-md px-lg text-on-surface-variant">{new Date(item.tanggal).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                <td className="py-md px-lg text-on-surface-variant">{item.waktu_mulai?.slice(0, 5)}{item.waktu_selesai ? ` - ${item.waktu_selesai.slice(0, 5)}` : ''}</td>
                <td className="py-md px-lg text-on-surface-variant">{item.lokasi}</td>
                <td className="py-md px-lg">{statusBadge(item.status)}</td>
            </>
        )}
    />
);

export default KegiatanIndex;
