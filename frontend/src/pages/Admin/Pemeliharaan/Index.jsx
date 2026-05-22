import React from 'react';
import AdminCrudPage from '../../../components/AdminCrudPage';

const statusBadge = (status) => {
    const map = {
        dilaporkan: { label: 'DILAPORKAN', color: 'bg-surface-variant text-on-surface-variant' },
        dalam_proses: { label: 'DALAM PROSES', color: 'bg-[#E67E22]/10 text-[#E67E22]' },
        selesai: { label: 'SELESAI', color: 'bg-[#27AE60]/10 text-[#27AE60]' },
    };
    const s = map[status] || { label: status, color: 'bg-surface-variant text-on-surface-variant' };
    return <span className={`px-2 py-1 rounded-full ${s.color} font-label-md text-[10px] font-bold`}>{s.label}</span>;
};

const formatRupiah = (n) => new Intl.NumberFormat('id-ID', { style: 'currency', currency: 'IDR', minimumFractionDigits: 0 }).format(n);

const PemeliharaanIndex = () => (
    <AdminCrudPage
        title="Daftar Pemeliharaan"
        subtitle="Kelola laporan kerusakan dan pemeliharaan rutin aset masjid."
        icon="build"
        apiEndpoint="/pemeliharaan"
        idField="id_pemeliharaan"
        columns={['Aset', 'Jenis', 'Tanggal Lapor', 'Status', 'Biaya']}
        searchFields={['deskripsi']}
        addLabel="Lapor Kerusakan"
        addLink="/admin/pemeliharaan/form"
        renderRow={(item) => (
            <>
                <td className="py-md px-lg text-on-surface font-medium">{item.aset?.nama_aset || `Aset #${item.id_aset}`}</td>
                <td className="py-md px-lg text-on-surface-variant capitalize">{item.jenis?.replace('_', ' ')}</td>
                <td className="py-md px-lg text-on-surface-variant">{new Date(item.tanggal_lapor).toLocaleDateString('id-ID', { day: '2-digit', month: 'short', year: 'numeric' })}</td>
                <td className="py-md px-lg">{statusBadge(item.status)}</td>
                <td className="py-md px-lg text-on-surface-variant">{formatRupiah(item.biaya)}</td>
            </>
        )}
    />
);

export default PemeliharaanIndex;
