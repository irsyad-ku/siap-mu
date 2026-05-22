import React from 'react';
import AdminCrudPage from '../../../components/AdminCrudPage';

const kondisiBadge = (kondisi) => {
    const map = {
        baik: { label: 'BAIK', color: 'bg-[#27AE60]/10 text-[#27AE60]' },
        perlu_perawatan: { label: 'PERLU PERAWATAN', color: 'bg-[#E67E22]/10 text-[#E67E22]' },
        rusak: { label: 'RUSAK', color: 'bg-[#E74C3C]/10 text-[#E74C3C]' },
    };
    const s = map[kondisi] || { label: kondisi, color: 'bg-surface-variant text-on-surface-variant' };
    return <span className={`px-2 py-1 rounded-full ${s.color} font-label-md text-[10px] font-bold`}>{s.label}</span>;
};

const formatRupiah = (n) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);

const AsetIndex = () => (
    <AdminCrudPage
        title="Daftar Aset"
        subtitle="Kelola inventaris dan aset masjid."
        icon="inventory_2"
        apiEndpoint="/aset"
        idField="id_aset"
        columns={['Nama Aset', 'Kategori', 'Kondisi', 'Jumlah', 'Nilai']}
        searchFields={['nama_aset', 'kategori']}
        addLabel="Tambah Aset"
        addLink="/admin/aset/form"
        renderRow={(item) => (
            <>
                <td className="py-md px-lg text-on-surface font-medium">{item.nama_aset}</td>
                <td className="py-md px-lg text-on-surface-variant">{item.kategori}</td>
                <td className="py-md px-lg">{kondisiBadge(item.kondisi)}</td>
                <td className="py-md px-lg text-on-surface-variant">{item.jumlah} {item.satuan}</td>
                <td className="py-md px-lg text-on-surface-variant">{formatRupiah(item.nilai_aset)}</td>
            </>
        )}
    />
);

export default AsetIndex;
