import React from 'react';
import { Link } from 'react-router-dom';

const AdminPageStub = ({ title, subtitle, icon, columns, data, addLabel, addLink }) => (
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
            <div className="p-md border-b border-outline-variant">
                <div className="relative max-w-md">
                    <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline">search</span>
                    <input type="text" placeholder="Cari..." className="w-full bg-surface-container-low border border-outline-variant rounded-full py-2 pl-xl pr-sm text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                </div>
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
                        {data.map((row, i) => (
                            <tr key={i} className="border-b border-outline-variant/50 hover:bg-surface-container-lowest transition-colors">
                                {row.map((cell, j) => <td key={j} className="py-md px-lg text-on-surface">{cell}</td>)}
                                <td className="py-md px-lg text-right space-x-xs">
                                    <button className="p-xs text-outline hover:text-primary transition-colors"><span className="material-symbols-outlined text-[20px]">edit</span></button>
                                    <button className="p-xs text-outline hover:text-error transition-colors"><span className="material-symbols-outlined text-[20px]">delete</span></button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    </>
);

export default AdminPageStub;
