import React, { useState } from 'react';
import { Outlet, NavLink, useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { useToast } from '../contexts/ToastContext';

const AdminLayout = () => {
    const [sidebarOpen, setSidebarOpen] = useState(false);
    const { user, logout } = useAuth();
    const toast = useToast();
    const navigate = useNavigate();
    const avatarUrl = user?.foto_url && !user.foto_url.includes('ui-avatars.com') && !user.foto_url.endsWith('default-avatar.png')
        ? user.foto_url
        : null;

    const handleLogout = async () => {
        await logout();
        toast.info('Anda telah keluar dari sistem.');
        navigate('/login', { replace: true });
    };

    return (
        <div className="bg-[#F0FAF5] text-on-surface font-body-md min-h-screen overflow-x-hidden flex">
            {/* Mobile Overlay */}
            {sidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 md:hidden"
                    onClick={() => setSidebarOpen(false)}
                ></div>
            )}

            {/* SideNavBar */}
            <nav className={`w-[280px] h-screen fixed left-0 top-0 bg-[#085041] shadow-xl flex-col py-xl z-50 transition-transform duration-300 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} md:translate-x-0 md:flex`}>
                <div className="px-md mb-xl flex items-center justify-between">
                    <div className="flex items-center space-x-md">
                        <div className="w-12 h-12 rounded-full bg-white/20 flex items-center justify-center">
                            <span className="material-symbols-outlined text-white" style={{ fontVariationSettings: "'FILL' 1" }}>mosque</span>
                        </div>
                        <div>
                            <h1 className="text-headline-md font-headline-md font-bold text-on-primary">SIAP-MU</h1>
                            <p className="text-label-md font-label-md text-white/80">Masjid Umat</p>
                        </div>
                    </div>
                    <button
                        className="md:hidden p-sm text-white/80 hover:text-white rounded-full"
                        onClick={() => setSidebarOpen(false)}
                    >
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                <ul className="flex-1 space-y-sm px-sm overflow-y-auto">
                    <NavItem to="/admin" icon="dashboard" label="Dashboard" end onClick={() => setSidebarOpen(false)} />
                    <NavItem to="/admin/keuangan" icon="payments" label="Keuangan" onClick={() => setSidebarOpen(false)} />
                    <NavItem to="/admin/kegiatan" icon="event" label="Kegiatan" onClick={() => setSidebarOpen(false)} />
                    <NavItem to="/admin/aset" icon="inventory_2" label="Aset" onClick={() => setSidebarOpen(false)} />
                    <NavItem to="/admin/fasilitas" icon="mosque" label="Fasilitas" onClick={() => setSidebarOpen(false)} />
                    <NavItem to="/admin/pemeliharaan" icon="build" label="Pemeliharaan" onClick={() => setSidebarOpen(false)} />
                    <NavItem to="/admin/peminjaman" icon="handshake" label="Peminjaman" onClick={() => setSidebarOpen(false)} />
                    <NavItem to="/admin/pengumuman" icon="campaign" label="Pengumuman" onClick={() => setSidebarOpen(false)} />
                    <NavItem to="/admin/pengguna" icon="manage_accounts" label="Manajemen Pengguna" onClick={() => setSidebarOpen(false)} />
                </ul>

                {/* User section at bottom */}
                <div className="px-md pt-md mt-md border-t border-white/10">
                    <Link to="/profil" className="flex items-center space-x-md mb-md hover:bg-white/5 p-xs rounded-lg transition-all group">
                        <div className="w-10 h-10 rounded-full bg-white/20 flex items-center justify-center overflow-hidden flex-shrink-0 border-2 border-white/20 group-hover:border-white/40 transition-colors">
                            {avatarUrl ? (
                                <img src={avatarUrl} alt={user?.nama} className="w-full h-full object-cover" />
                            ) : (
                                <span className="text-white font-bold text-sm">
                                    {user?.nama?.charAt(0).toUpperCase() || 'U'}
                                </span>
                            )}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="font-title-md text-title-md text-white truncate">{user?.nama || 'User'}</p>
                            <p className="font-label-md text-label-md text-white/60 truncate capitalize">{user?.role || 'admin'}</p>
                        </div>
                        <span className="material-symbols-outlined text-white/40 text-[16px] group-hover:text-white/80 transition-colors">edit</span>
                    </Link>
                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center justify-center space-x-sm px-md py-sm rounded-lg border border-white/20 text-white/80 hover:text-white hover:bg-white/10 transition-colors font-label-md text-label-md"
                    >
                        <span className="material-symbols-outlined text-[20px]">logout</span>
                        <span>Keluar</span>
                    </button>
                </div>
            </nav>

            {/* Main Content Wrapper */}
            <div className="flex-1 md:ml-[280px] flex flex-col min-h-screen">
                {/* TopAppBar */}
                <header className="h-16 fixed top-0 right-0 left-0 md:left-[280px] z-30 bg-white/80 backdrop-blur-md shadow-sm flex justify-between items-center px-lg w-auto transition-all">
                    <button
                        className="md:hidden p-sm text-on-surface-variant hover:bg-primary-container/10 rounded-full transition-colors"
                        onClick={() => setSidebarOpen(true)}
                    >
                        <span className="material-symbols-outlined">menu</span>
                    </button>
                    <div className="flex-1 max-w-md ml-sm md:ml-0 hidden sm:block">
                        <div className="relative">
                            <span className="material-symbols-outlined absolute left-sm top-1/2 -translate-y-1/2 text-outline">search</span>
                            <input type="text" placeholder="Search..." className="w-full bg-surface-container-low border border-outline-variant rounded-full py-2 pl-xl pr-sm text-body-md focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all" />
                        </div>
                    </div>
                    <div className="flex items-center space-x-sm">
                        <Link to="/admin/notifikasi" className="p-sm text-on-surface-variant hover:bg-primary-container/10 rounded-full transition-colors relative flex items-center justify-center">
                            <span className="material-symbols-outlined">notifications</span>
                            <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full"></span>
                        </Link>
                        <Link to="/profil" title="Profil Saya" className="h-9 w-9 rounded-full overflow-hidden border-2 border-primary/30 hover:border-primary/60 cursor-pointer ml-md flex-shrink-0 transition-all hover:scale-105">
                            {avatarUrl ? (
                                <img src={avatarUrl} alt={user?.nama} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                                    {user?.nama?.charAt(0).toUpperCase() || 'A'}
                                </div>
                            )}
                        </Link>
                    </div>
                </header>

                {/* Main Canvas */}
                <main className="flex-1 mt-16 p-margin-mobile md:p-margin-desktop space-y-xl">
                    <Outlet />
                </main>

                {/* Footer */}
                <footer className="w-full py-md px-lg bg-surface-container-low border-t border-outline-variant flex justify-between items-center text-on-surface-variant font-label-md text-label-md mt-auto">
                    <p>© 2026 SIAP-MU - Sistem Informasi Administrasi Masjid. v1.2.0</p>
                    <ul className="hidden sm:flex space-x-md">
                        <li><a href="#" className="hover:text-primary transition-colors">Bantuan</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Kebijakan Privasi</a></li>
                        <li><a href="#" className="hover:text-primary transition-colors">Kontak Kami</a></li>
                    </ul>
                </footer>
            </div>
        </div>
    );
};

const NavItem = ({ to, icon, label, end, onClick }) => {
    return (
        <li>
            <NavLink
                to={to}
                end={end}
                onClick={onClick}
                className={({ isActive }) =>
                    isActive
                        ? "flex items-center space-x-md px-md py-sm rounded-r-full border-l-4 border-secondary-fixed bg-white/10 text-white font-bold transition-transform"
                        : "flex items-center space-x-md px-md py-sm rounded-r-full border-l-4 border-transparent text-white/80 hover:text-white hover:bg-white/5 transition-colors"
                }
            >
                <span className="material-symbols-outlined">{icon}</span>
                <span className="font-label-md text-label-md">{label}</span>
            </NavLink>
        </li>
    );
};

export default AdminLayout;
