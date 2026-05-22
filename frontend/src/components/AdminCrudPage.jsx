import React, { useState, useEffect, useCallback } from 'react';
import { Link } from 'react-router-dom';
import api from '../utils/api';
import { useToast } from '../contexts/ToastContext';

const AdminCrudPage = ({
    title, subtitle, icon, apiEndpoint, idField,
    columns, renderRow, addLabel, addLink, editLink,
    searchFields = [],
}) => {
    const [data, setData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState('');
    const toast = useToast();

    const fetchData = useCallback(async () => {
        setLoading(true);
        try {
            const res = await api.get(apiEndpoint);
            setData(res.data.data || res.data);
        } catch {
            setData([]);
        } finally {
            setLoading(false);
        }
    }, [apiEndpoint]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    const handleDelete = async (id) => {
        if (!window.confirm('Yakin ingin menghapus data ini?')) return;
        try {
            await api.delete(`${apiEndpoint}/${id}`);
            setData(prev => prev.filter(item => item[idField] !== id));
            toast.success('Data berhasil dihapus.');
        } catch {
            toast.error('Gagal menghapus data.');
        }
    };

    const filtered = data.filter(item => {
        if (!search) return true;
        const lower = search.toLowerCase();
        return searchFields.some(field => String(item[field] || '').toLowerCase().includes(lower));
    });

    return (
        <>
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-md">
                <div>
                    <h2 className="font-headline-xl text-headline-xl text-primary mb-xs">{title}</h2>
                    <p className="font-body-lg text-body-lg text-on-surface-variant">{subtitle}</p>
                </div>
                {addLabel && (
                    <Link to={addLink || '#'} className="btn-primary px-lg py-sm rounded-lg font-title-md text-title-md flex items-center gap-sm self-start shadow-md">
                        <span className="material-symbols-outlined text-[20px]">add</span>{addLabel}
                    </Link>
                )}
            </div>
            <div className="bg-white rounded-xl border border-[#D1FAE5] ambient-shadow-lvl1 overflow-hidden">
                <div className="p-md border-b border-outline-variant flex flex-col sm:flex-row sm:items-center justify-between gap-md">
                    <div className="relative max-w-md w-full">
                        <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline">search</span>
                        <input type="text" placeholder="Cari..." value={search} onChange={(e) => setSearch(e.target.value)}
                            className="w-full bg-surface-container-low border border-outline-variant rounded-full py-2 pl-xl pr-sm text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                    </div>
                    <p className="font-label-md text-label-md text-on-surface-variant">{filtered.length} data ditemukan</p>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse">
                        <thead>
                            <tr className="bg-surface-container-low font-label-md text-label-md text-on-surface-variant border-b border-outline-variant">
                                {columns.map(col => <th key={col} className="py-md px-lg font-semibold">{col}</th>)}
                                <th className="py-md px-lg font-semibold text-right">Aksi</th>
                            </tr>
                        </thead>
                        <tbody className="font-body-md text-body-md">
                            {loading ? (
                                <tr><td colSpan={columns.length + 1} className="py-xl text-center text-on-surface-variant">
                                    <div className="flex items-center justify-center gap-sm"><div className="w-5 h-5 border-2 border-primary/30 border-t-primary rounded-full animate-spin"></div>Memuat data...</div>
                                </td></tr>
                            ) : filtered.length === 0 ? (
                                <tr><td colSpan={columns.length + 1} className="py-xl text-center text-on-surface-variant">
                                    <span className="material-symbols-outlined text-[48px] text-outline-variant block mb-sm">{icon || 'inbox'}</span>
                                    Belum ada data.
                                </td></tr>
                            ) : filtered.map((item, i) => (
                                <tr key={item[idField] || i} className="border-b border-outline-variant/50 hover:bg-surface-container-lowest transition-colors">
                                    {renderRow(item)}
                                    <td className="py-md px-lg text-right space-x-xs">
                                        {addLink ? (
                                            <Link to={`${editLink || addLink}/${item[idField]}`} className="p-xs text-outline hover:text-primary transition-colors inline-flex align-middle">
                                                <span className="material-symbols-outlined text-[20px]">edit</span>
                                            </Link>
                                        ) : (
                                            <button className="p-xs text-outline hover:text-primary transition-colors align-middle">
                                                <span className="material-symbols-outlined text-[20px]">edit</span>
                                            </button>
                                        )}
                                        <button onClick={() => handleDelete(item[idField])} className="p-xs text-outline hover:text-error transition-colors align-middle">
                                            <span className="material-symbols-outlined text-[20px]">delete</span>
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </>
    );
};

export default AdminCrudPage;
