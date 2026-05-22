import React from 'react';
import AdminCrudPage from '../../../components/AdminCrudPage';

const roleBadge = (role) => {
    const map = {
        admin: { label: 'ADMIN', color: 'bg-primary/10 text-primary' },
        pengurus: { label: 'PENGURUS', color: 'bg-[#3498DB]/10 text-[#3498DB]' },
        warga: { label: 'WARGA', color: 'bg-surface-variant text-on-surface-variant' },
    };
    const s = map[role] || { label: role, color: 'bg-surface-variant text-on-surface-variant' };
    return <span className={`px-2 py-1 rounded-full ${s.color} font-label-md text-[10px] font-bold`}>{s.label}</span>;
};

const PenggunaIndex = () => (
    <AdminCrudPage
        title="Manajemen Pengguna"
        subtitle="Kelola akun pengguna dan hak akses sistem."
        icon="manage_accounts"
        apiEndpoint="/users"
        idField="id_user"
        columns={['Nama', 'Email', 'Role', 'Status']}
        searchFields={['nama', 'email']}
        addLabel="Tambah Pengguna"
        addLink="/admin/pengguna/form"
        renderRow={(item) => (
            <>
                <td className="py-md px-lg text-on-surface font-medium">
                    <div className="flex items-center gap-sm">
                        <img src={`https://ui-avatars.com/api/?name=${encodeURIComponent(item.nama)}&background=27AE60&color=fff&size=32`} alt="" className="w-8 h-8 rounded-full" />
                        {item.nama}
                    </div>
                </td>
                <td className="py-md px-lg text-on-surface-variant">{item.email}</td>
                <td className="py-md px-lg">{roleBadge(item.role)}</td>
                <td className="py-md px-lg">
                    <span className={`px-2 py-1 rounded-full font-label-md text-[10px] font-bold ${
                        item.is_active ? 'bg-[#27AE60]/10 text-[#27AE60]' : 'bg-[#E74C3C]/10 text-[#E74C3C]'
                    }`}>{item.is_active ? 'AKTIF' : 'NONAKTIF'}</span>
                </td>
            </>
        )}
    />
);

export default PenggunaIndex;
