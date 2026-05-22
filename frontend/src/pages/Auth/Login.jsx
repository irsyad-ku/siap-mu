import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const navigate = useNavigate();
    const location = useLocation();
    const { login, isAuthenticated, user } = useAuth();
    const toast = useToast();

    // Redirect if already logged in
    React.useEffect(() => {
        if (isAuthenticated && user) {
            if (user.role === 'admin' || user.role === 'pengurus') {
                navigate('/admin', { replace: true });
            } else {
                navigate('/', { replace: true });
            }
        }
    }, [isAuthenticated, user, navigate]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        try {
            const userData = await login(email, password);
            toast.success(`Selamat datang, ${userData.nama}!`);
            
            // Redirect based on role
            let targetPath = '/';
            if (userData?.role === 'admin' || userData?.role === 'pengurus') {
                targetPath = '/admin';
            }
            
            const from = location.state?.from?.pathname;
            // Hanya izinkan redirect ke 'from' jika rute tersebut bukan /admin untuk warga
            const finalPath = (from && (from !== '/admin' || targetPath === '/admin')) ? from : targetPath;
            
            navigate(finalPath, { replace: true });
        } catch (err) {
            const msg = err.response?.data?.message || 'Login gagal. Periksa kembali email dan password.';
            setError(msg);
            toast.error(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col justify-center items-center p-md text-on-surface font-body-lg relative"
             style={{ background: 'linear-gradient(135deg, #085041 0%, #0f6e56 50%, #27ae60 100%)' }}>
            <style>{`
                .mosque-pattern::before {
                    content: "";
                    position: absolute;
                    top: 0; left: 0; right: 0; bottom: 0;
                    background-image: radial-gradient(circle at 2px 2px, rgba(255,255,255,0.05) 1px, transparent 0);
                    background-size: 32px 32px;
                    pointer-events: none;
                }
                .floating-input:focus + .floating-label,
                .floating-input:not(:placeholder-shown) + .floating-label {
                    transform: translateY(-120%) scale(0.85);
                    color: #0f6e56;
                }
                .floating-input { border-color: #bec9c3; }
                .floating-input:focus {
                    border-color: #0f6e56;
                    box-shadow: 0 0 0 2px rgba(15, 110, 86, 0.2);
                }
            `}</style>
            <div className="mosque-pattern absolute inset-0"></div>

            <main className="w-full max-w-[440px] bg-surface-container-lowest rounded-xl shadow-[0_8px_32px_rgba(8,80,65,0.2)] p-xl relative z-10 border border-[#D1FAE5]">
                <div className="flex flex-col items-center text-center mb-xl">
                    <div className="w-16 h-16 bg-[#085041] rounded-full flex items-center justify-center mb-md shadow-md">
                        <span className="material-symbols-outlined text-white text-[32px]" style={{ fontVariationSettings: "'FILL' 1" }}>mosque</span>
                    </div>
                    <h1 className="font-headline-xl text-headline-xl text-primary mb-sm">SIAP-MU</h1>
                    <p className="font-body-md text-body-md text-on-surface-variant max-w-[280px]">Sistem Informasi Administrasi dan Pengelolaan Masjid Umat</p>
                </div>

                {error && (
                    <div className="mb-md p-sm rounded-lg bg-error-container text-on-error-container font-body-md text-body-md flex items-center gap-sm">
                        <span className="material-symbols-outlined text-[18px]">error</span>
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="flex flex-col gap-md">
                    <div className="relative w-full h-14">
                        <input className="floating-input peer w-full h-full px-md pt-lg pb-sm border rounded-lg bg-transparent text-on-surface outline-none transition-all placeholder-transparent"
                               id="email" placeholder="Email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                        <label className="floating-label absolute left-md top-4 text-on-surface-variant transition-all pointer-events-none origin-left font-body-md" htmlFor="email">Email / Username</label>
                    </div>
                    <div className="relative w-full h-14">
                        <input className="floating-input peer w-full h-full px-md pt-lg pb-sm pr-12 border rounded-lg bg-transparent text-on-surface outline-none transition-all placeholder-transparent"
                               id="password" placeholder="Password" type={showPassword ? 'text' : 'password'} value={password} onChange={(e) => setPassword(e.target.value)} required />
                        <label className="floating-label absolute left-md top-4 text-on-surface-variant transition-all pointer-events-none origin-left font-body-md" htmlFor="password">Password</label>
                        <button type="button" onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-md top-1/2 -translate-y-1/2 text-on-surface-variant hover:text-primary transition-colors focus:outline-none"
                                aria-label="Toggle password visibility">
                            <span className="material-symbols-outlined">{showPassword ? 'visibility' : 'visibility_off'}</span>
                        </button>
                    </div>
                    <div className="flex justify-end mt-xs">
                        <a className="font-label-md text-label-md text-primary hover:text-primary-container transition-colors" href="#">Lupa Password?</a>
                    </div>
                    <button type="submit" disabled={loading}
                            className="w-full mt-sm py-md px-lg rounded-lg bg-gradient-to-r from-[#0F6E56] to-[#27AE60] text-white font-title-md text-title-md shadow-md hover:shadow-lg hover:brightness-110 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary-container disabled:opacity-50 flex items-center justify-center gap-sm">
                        {loading ? (
                            <>
                                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                Memproses...
                            </>
                        ) : 'Masuk'}
                    </button>
                </form>
                <div className="mt-xl text-center">
                    <p className="font-body-md text-body-md text-on-surface-variant">
                        Belum memiliki akun?{' '}
                        <Link to="/register" className="font-title-md text-title-md text-primary hover:text-primary-container transition-colors">Daftar di sini</Link>
                    </p>
                </div>
            </main>
            <footer className="mt-xl text-center relative z-10 text-white/80 font-label-md text-label-md">
                <p>© 2026 SIAP-MU - Sistem Informasi Administrasi Masjid. v1.2.0</p>
            </footer>
        </div>
    );
};

export default Login;
