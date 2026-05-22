import React from 'react';
import AdminCrudPage from '../../../components/AdminCrudPage';

const statusBadge = (status) => {
    const map = {
        tersedia: { label: 'TERSEDIA', color: 'bg-[#27AE60]/10 text-[#27AE60]' },
        dipinjam: { label: 'DIPINJAM', color: 'bg-[#E67E22]/10 text-[#E67E22]' },
        dalam_perawatan: { label: 'DALAM PERAWATAN', color: 'bg-[#E74C3C]/10 text-[#E74C3C]' },
    };
    const s = map[status] || { label: status, color: 'bg-surface-variant text-on-surface-variant' };
    return <span className={`px-2 py-1 rounded-full ${s.color} font-label-md text-[10px] font-bold`}>{s.label}</span>;
};

const FasilitasIndex = () => (
    <AdminCrudPage
        title="Daftar Fasilitas"
        subtitle="Kelola fasilitas masjid yang tersedia untuk dipinjam."
        icon="mosque"
        apiEndpoint="/fasilitas"
        idField="id_fasilitas"
        columns={['Nama Fasilitas', 'Kapasitas', 'Status', 'Deskripsi']}
        searchFields={['nama_fasilitas', 'deskripsi']}
        addLabel="Tambah Fasilitas"
        addLink="/admin/fasilitas/form"
        renderRow={(item) => (
            <>
                <td className="py-md px-lg text-on-surface font-medium">{item.nama_fasilitas}</td>
                <td className="py-md px-lg text-on-surface-variant">{item.kapasitas ? `${item.kapasitas} orang` : '-'}</td>
                <td className="py-md px-lg">{statusBadge(item.status)}</td>
                <td className="py-md px-lg text-on-surface-variant max-w-[200px] truncate">{item.deskripsi || '-'}</td>
            </>
        )}
    />
);

export default FasilitasIndex;
