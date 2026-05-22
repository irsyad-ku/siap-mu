import React from 'react';
import AdminCrudPage from '../../../components/AdminCrudPage';

const PengumumanIndex = () => (
    <AdminCrudPage
        title="Kelola Pengumuman"
        subtitle="Buat dan kelola pengumuman untuk jamaah masjid."
        icon="campaign"
        apiEndpoint="/pengumuman"
        idField="id_pengumuman"
        columns={['Judul', 'Tanggal', 'Status', 'Dibuat Oleh']}
        searchFields={['judul', 'isi']}
        addLabel="Buat Pengumuman"
        addLink="/admin/pengumuman/form"
        renderRow={(item) => (
            <>
                <td className="py-md px-lg text-on-surface font-medium max-w-[250px] truncate">{item.judul}</td>
                <td className="py-md px-lg text-on-surface-variant">{new Date(item.tanggal).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                <td className="py-md px-lg">
                    <span className={`px-2 py-1 rounded-full font-label-md text-[10px] font-bold ${
                        item.is_aktif ? 'bg-[#27AE60]/10 text-[#27AE60]' : 'bg-surface-variant text-on-surface-variant'
                    }`}>{item.is_aktif ? 'AKTIF' : 'NONAKTIF'}</span>
                </td>
                <td className="py-md px-lg text-on-surface-variant">{item.user?.nama || 'Admin'}</td>
            </>
        )}
    />
);

export default PengumumanIndex;
