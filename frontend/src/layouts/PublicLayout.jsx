import React, { useState, useEffect } from 'react';
import { Outlet, Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const PublicLayout = () => {
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [avatarFailed, setAvatarFailed] = useState(false);
    const location = useLocation();
    const { isAuthenticated, user, logout, isAdmin, isPengurus } = useAuth();
    const avatarUrl = !avatarFailed && user?.foto_url && !user.foto_url.includes('ui-avatars.com') && !user.foto_url.endsWith('default-avatar.png')
        ? user.foto_url
        : null;

    useEffect(() => {
        setAvatarFailed(false);
    }, [user?.foto_url]);

    useEffect(() => {
        const handleScroll = () => {
            const navbar = document.getElementById('public-navbar');
            const navTexts = document.querySelectorAll('.nav-text');
            if (window.scrollY > 50) {
                navbar?.classList.add('nav-scrolled');
                navTexts.forEach(el => {
                    if (!el.classList.contains('nav-btn-outline')) {
                        el.classList.remove('text-on-primary', 'text-on-primary/90');
                    }
                });
            } else {
                navbar?.classList.remove('nav-scrolled');
                navTexts.forEach(el => {
                    if (!el.classList.contains('nav-btn-outline')) {
                        el.classList.add('text-on-primary');
                    }
                });
            }
        };

        window.addEventListener('scroll', handleScroll);
        // Ensure menu is closed when route changes
        setMobileMenuOpen(false);
        return () => window.removeEventListener('scroll', handleScroll);
    }, [location]);

    return (
        <div className="bg-surface text-on-surface font-body-md antialiased overflow-x-hidden min-h-screen flex flex-col">
            <style>{`
                .nav-scrolled {
                    background-color: rgba(255, 255, 255, 0.95);
                    backdrop-filter: blur(8px);
                    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
                }
                .nav-scrolled .nav-text {
                    color: #005440; 
                }
                .nav-scrolled .nav-btn-outline {
                    border-color: #005440;
                    color: #005440;
                }
            `}</style>
            
            <nav id="public-navbar" className="fixed top-0 w-full z-50 transition-all duration-300 py-md px-margin-mobile md:px-margin-desktop">
                <div className="max-w-7xl mx-auto flex justify-between items-center">
                    <Link to="/" className="flex items-center gap-sm">
                        <span className="material-symbols-outlined text-headline-xl text-on-primary nav-text transition-colors duration-300" style={{ fontVariationSettings: "'FILL' 1" }}>mosque</span>
                        <span className="font-headline-md text-headline-md font-bold text-on-primary nav-text transition-colors duration-300">SIAP-MU</span>
                    </Link>
                    
                    {/* Desktop Navigation Links */}
                    <div className="hidden md:flex gap-lg items-center">
                        <Link to="/" className="font-title-md text-title-md text-on-primary/90 hover:text-on-primary nav-text transition-colors duration-300">Beranda</Link>
                        <Link to="/kegiatan" className="font-title-md text-title-md text-on-primary/90 hover:text-on-primary nav-text transition-colors duration-300">Jadwal Kegiatan</Link>
                        <Link to="/pengumuman" className="font-title-md text-title-md text-on-primary/90 hover:text-on-primary nav-text transition-colors duration-300">Pengumuman</Link>
                        <Link to="/peminjaman/ajukan" className="font-title-md text-title-md text-on-primary/90 hover:text-on-primary nav-text transition-colors duration-300">Ajukan Peminjaman</Link>
                        <Link to="/peminjaman/status" className="font-title-md text-title-md text-on-primary/90 hover:text-on-primary nav-text transition-colors duration-300">Status Peminjaman</Link>
                    </div>

                    <div className="flex gap-sm items-center">
                        {/* Desktop Auth Links */}
                        {isAuthenticated ? (
                            <>
                                <Link to="/profil" className="hidden md:inline-flex items-center gap-xs font-title-md text-title-md text-on-primary nav-text transition-colors duration-300 hover:opacity-80">
                                    <div className="w-7 h-7 rounded-full overflow-hidden border-2 border-white/50 flex-shrink-0">
                                        {avatarUrl ? (
                                            <img src={avatarUrl} alt={user.nama} className="w-full h-full object-cover" onError={() => setAvatarFailed(true)} />
                                        ) : (
                                            <div className="w-full h-full bg-white/20 flex items-center justify-center text-on-primary font-bold text-[11px]">
                                                {user?.nama?.charAt(0).toUpperCase()}
                                            </div>
                                        )}
                                    </div>
                                    {user?.nama}
                                </Link>
                                {(isAdmin || isPengurus) && (
                                    <Link to="/admin" className="hidden md:inline-flex items-center justify-center px-lg py-sm rounded-full bg-white/20 text-on-primary font-title-md text-title-md hover:bg-white/30 transition-colors nav-text">
                                        Panel Admin
                                    </Link>
                                )}
                                <button onClick={logout} className="hidden md:inline-flex items-center justify-center px-lg py-sm rounded-full border border-on-primary text-on-primary font-title-md text-title-md hover:bg-on-primary/10 transition-colors nav-btn-outline nav-text">
                                    Keluar
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="hidden md:inline-flex items-center justify-center px-lg py-sm rounded-full border border-on-primary text-on-primary font-title-md text-title-md hover:bg-on-primary/10 transition-colors nav-btn-outline nav-text">Masuk</Link>
                                <Link to="/register" className="hidden sm:inline-flex items-center justify-center px-lg py-sm rounded-full btn-primary-gradient text-on-primary font-title-md text-title-md transition-colors shadow-sm">Daftar</Link>
                            </>
                        )}
                        
                        {/* Mobile Toggle Button */}
                        <button 
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            className="md:hidden p-sm text-on-primary nav-text transition-colors duration-300 flex items-center justify-center"
                            aria-label="Toggle Navigation Menu"
                        >
                            <span className="material-symbols-outlined text-[28px]">{mobileMenuOpen ? 'close' : 'menu'}</span>
                        </button>
                    </div>
                </div>
            </nav>

            {/* Mobile Navigation Drawer */}
            <div 
                className={`fixed inset-0 bg-black/50 z-40 transition-opacity duration-300 md:hidden ${mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`} 
                onClick={() => setMobileMenuOpen(false)}
            ></div>
            <div className={`fixed right-0 top-0 h-full w-[280px] bg-surface-container-lowest z-50 shadow-2xl transition-transform duration-300 ease-in-out transform md:hidden p-xl flex flex-col gap-lg ${mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'}`}>
                <div className="flex items-center justify-between border-b border-outline-variant pb-md">
                    <div className="flex items-center gap-sm">
                        <span className="material-symbols-outlined text-primary text-headline-md" style={{ fontVariationSettings: "'FILL' 1" }}>mosque</span>
                        <span className="font-headline-md text-headline-md font-bold text-primary">SIAP-MU</span>
                    </div>
                    <button onClick={() => setMobileMenuOpen(false)} className="p-xs text-on-surface-variant hover:text-primary transition-colors">
                        <span className="material-symbols-outlined">close</span>
                    </button>
                </div>
                
                <div className="flex flex-col gap-sm">
                    <Link to="/" className="flex items-center gap-md p-sm rounded-lg hover:bg-primary-container/10 text-on-surface hover:text-primary transition-all">
                        <span className="material-symbols-outlined">home</span>
                        <span className="font-title-md text-title-md">Beranda</span>
                    </Link>
                    <Link to="/kegiatan" className="flex items-center gap-md p-sm rounded-lg hover:bg-primary-container/10 text-on-surface hover:text-primary transition-all">
                        <span className="material-symbols-outlined">calendar_month</span>
                        <span className="font-title-md text-title-md">Jadwal Kegiatan</span>
                    </Link>
                    <Link to="/pengumuman" className="flex items-center gap-md p-sm rounded-lg hover:bg-primary-container/10 text-on-surface hover:text-primary transition-all">
                        <span className="material-symbols-outlined">campaign</span>
                        <span className="font-title-md text-title-md">Pengumuman</span>
                    </Link>
                    <Link to="/peminjaman/ajukan" className="flex items-center gap-md p-sm rounded-lg hover:bg-primary-container/10 text-on-surface hover:text-primary transition-all">
                        <span className="material-symbols-outlined">edit_document</span>
                        <span className="font-title-md text-title-md">Ajukan Peminjaman</span>
                    </Link>
                    <Link to="/peminjaman/status" className="flex items-center gap-md p-sm rounded-lg hover:bg-primary-container/10 text-on-surface hover:text-primary transition-all">
                        <span className="material-symbols-outlined">fact_check</span>
                        <span className="font-title-md text-title-md">Status Peminjaman</span>
                    </Link>
                </div>
                
                <div className="mt-auto border-t border-outline-variant pt-lg flex flex-col gap-sm">
                    {isAuthenticated ? (
                        <>
                            <Link to="/profil" onClick={() => setMobileMenuOpen(false)} className="flex items-center gap-sm p-sm rounded-xl hover:bg-primary/5 transition-all group">
                                <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-primary/20 flex-shrink-0">
                                    {avatarUrl ? (
                                        <img src={avatarUrl} alt={user.nama} className="w-full h-full object-cover" onError={() => setAvatarFailed(true)} />
                                    ) : (
                                        <div className="w-full h-full bg-primary/10 flex items-center justify-center text-primary font-bold text-sm">
                                            {user?.nama?.charAt(0).toUpperCase()}
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1 min-w-0">
                                    <p className="font-title-md text-title-md text-on-surface truncate">{user?.nama}</p>
                                    <p className="text-xs text-primary font-semibold uppercase tracking-wide">{user?.role === 'warga' ? 'Jamaah' : user?.role}</p>
                                </div>
                                <span className="material-symbols-outlined text-on-surface-variant text-[18px] group-hover:text-primary transition-colors">chevron_right</span>
                            </Link>
                            {(isAdmin || isPengurus) && (
                                <Link to="/admin" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-sm rounded-full bg-primary/10 text-primary font-title-md text-title-md transition-colors">Panel Admin</Link>
                            )}
                            <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="w-full text-center py-sm rounded-full border border-outline text-on-surface font-title-md text-title-md transition-colors">Keluar</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-sm rounded-full border border-primary text-primary font-title-md text-title-md hover:bg-primary-container/5 transition-colors">Masuk</Link>
                            <Link to="/register" onClick={() => setMobileMenuOpen(false)} className="w-full text-center py-sm rounded-full btn-primary-gradient text-white font-title-md text-title-md shadow-sm">Daftar</Link>
                        </>
                    )}
                </div>
            </div>

            <div className="flex-grow">
                <Outlet />
            </div>

            <footer className="bg-surface-container-low border-t border-outline-variant w-full py-md px-lg mt-xl">
                <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-md">
                    <div className="flex items-center gap-sm">
                        <span className="font-bold text-primary text-title-md">SIAP-MU</span>
                        <span className="text-on-surface-variant font-label-md text-label-md">© 2026 SIAP-MU - Sistem Informasi Administrasi Masjid. v1.2.0</span>
                    </div>
                    <div className="flex gap-lg">
                        <a href="#" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">Bantuan</a>
                        <a href="#" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">Kebijakan Privasi</a>
                        <a href="#" className="font-label-md text-label-md text-on-surface-variant hover:text-primary transition-colors">Kontak Kami</a>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default PublicLayout;
