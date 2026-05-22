import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { useToast } from '../../contexts/ToastContext';

const Register = () => {
    const [form, setForm] = useState({ nama: '', no_hp: '', email: '', password: '', password_confirmation: '' });
    const [showPassword, setShowPassword] = useState(false);
    const [strength, setStrength] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    const [fieldErrors, setFieldErrors] = useState({});
    const [agreed, setAgreed] = useState(false);
    const navigate = useNavigate();
    const { register } = useAuth();
    const toast = useToast();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
        if (name === 'password') checkStrength(value);
        // Clear field error when user types
        if (fieldErrors[name]) {
            setFieldErrors(prev => ({ ...prev, [name]: null }));
        }
    };

    const checkStrength = (pw) => {
        let s = 0;
        if (pw.length >= 8) s++;
        if (/[A-Z]/.test(pw) && /[a-z]/.test(pw)) s++;
        if (/[0-9]/.test(pw)) s++;
        if (/[^a-zA-Z0-9]/.test(pw)) s++;
        setStrength(pw.length === 0 ? 0 : s);
    };

    const strengthLabel = ['', 'Lemah', 'Sedang', 'Kuat', 'Sangat Kuat'];
    const strengthColor = ['', 'bg-error', 'bg-[#F39C12]', 'bg-secondary-fixed-dim', 'bg-secondary-fixed-dim'];
    const strengthTextColor = ['text-outline-variant', 'text-error', 'text-[#F39C12]', 'text-secondary', 'text-secondary'];
    const passwordMismatch = form.password_confirmation.length > 0 && form.password !== form.password_confirmation;

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (passwordMismatch || !agreed) return;
        setLoading(true);
        setError('');
        setFieldErrors({});
        try {
            await register(form);
            toast.success('Registrasi berhasil! Silakan login dengan akun baru Anda.');
            navigate('/login');
        } catch (err) {
            const data = err.response?.data;
            if (data?.errors) {
                setFieldErrors(data.errors);
                const firstError = Object.values(data.errors)[0];
                setError(Array.isArray(firstError) ? firstError[0] : firstError);
            } else {
                setError(data?.message || 'Registrasi gagal.');
            }
            toast.error('Registrasi gagal. Periksa kembali data Anda.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-surface min-h-screen flex overflow-x-hidden">
            {/* Left Panel */}
            <div className="hidden lg:flex lg:w-5/12 bg-gradient-to-br from-primary-container to-primary relative overflow-hidden flex-col justify-between p-xl">
                <div className="absolute inset-0 opacity-10 bg-cover bg-center" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1584551246679-0daf3d275d0f?auto=format&fit=crop&w=800&q=80')" }}></div>
                <div className="relative z-10 flex items-center gap-sm">
                    <span className="material-symbols-outlined text-[40px] text-on-primary" style={{ fontVariationSettings: "'FILL' 1" }}>mosque</span>
                    <span className="font-headline-xl text-headline-xl text-on-primary">SIAP-MU</span>
                </div>
                <div className="relative z-10 space-y-xl mb-xl">
                    <div>
                        <h1 className="font-headline-lg text-headline-lg text-on-primary mb-sm">Modernisasi Administrasi Masjid Anda</h1>
                        <p className="font-body-lg text-body-lg text-primary-fixed-dim">Kelola semua aspek operasional masjid dalam satu platform yang aman, transparan, dan terintegrasi.</p>
                    </div>
                    <div className="space-y-lg">
                        {[{icon:'payments',title:'Keuangan',desc:'Laporan transparan & akuntabel'},{icon:'event',title:'Kegiatan',desc:'Jadwal kajian & program jamaah'},{icon:'mosque',title:'Fasilitas',desc:'Manajemen aset & pemeliharaan'},{icon:'campaign',title:'Pengumuman',desc:'Komunikasi efektif ke jamaah'}].map(f => (
                            <div key={f.icon} className="flex items-center gap-md">
                                <div className="w-12 h-12 rounded-xl bg-white/10 backdrop-blur-sm flex items-center justify-center border border-white/20">
                                    <span className="material-symbols-outlined text-secondary-fixed">{f.icon}</span>
                                </div>
                                <div>
                                    <h3 className="font-title-md text-title-md text-on-primary">{f.title}</h3>
                                    <p className="font-body-md text-body-md text-primary-fixed-dim">{f.desc}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="relative z-10 font-label-md text-label-md text-primary-fixed-dim">© 2026 SIAP-MU. Sistem Informasi Administrasi Masjid.</div>
            </div>
            {/* Right Panel */}
            <div className="w-full lg:w-7/12 bg-surface-container-lowest flex items-center justify-center p-md lg:p-xl relative">
                <div className="absolute top-md left-md lg:hidden flex items-center gap-sm">
                    <span className="material-symbols-outlined text-[32px] text-primary" style={{ fontVariationSettings: "'FILL' 1" }}>mosque</span>
                    <span className="font-title-md text-title-md text-primary">SIAP-MU</span>
                </div>
                <div className="w-full max-w-[480px] p-md lg:p-0">
                    <div className="mb-xl mt-lg lg:mt-0">
                        <h2 className="font-headline-lg-mobile lg:font-headline-lg text-headline-lg-mobile lg:text-headline-lg text-on-surface mb-xs">Daftar Akun Baru</h2>
                        <p className="font-body-md text-body-md text-on-surface-variant">Lengkapi data di bawah ini untuk memulai pengelolaan masjid.</p>
                    </div>
                    {error && <div className="mb-md p-sm rounded-lg bg-error-container text-on-error-container font-body-md flex items-center gap-sm"><span className="material-symbols-outlined text-[18px]">error</span>{error}</div>}
                    <form onSubmit={handleSubmit} className="space-y-md">
                        <div className={`form-floating relative rounded-lg border ${fieldErrors.nama ? 'border-error' : 'border-outline-variant'} bg-surface focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all`}>
                            <input className="block w-full bg-transparent border-none text-on-surface font-body-md focus:ring-0 rounded-lg peer p-4 pt-6 pb-2 placeholder-transparent" name="nama" placeholder=" " type="text" value={form.nama} onChange={handleChange} required />
                            <label className="absolute left-4 top-4 text-on-surface-variant transition-all pointer-events-none origin-left font-body-md peer-focus:scale-[0.85] peer-focus:-translate-y-2 peer-focus:text-primary peer-[:not(:placeholder-shown)]:scale-[0.85] peer-[:not(:placeholder-shown)]:-translate-y-2">Nama Lengkap</label>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-md">
                            <div className={`form-floating relative rounded-lg border ${fieldErrors.no_hp ? 'border-error' : 'border-outline-variant'} bg-surface focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all`}>
                                <input className="block w-full bg-transparent border-none text-on-surface font-body-md focus:ring-0 rounded-lg peer p-4 pt-6 pb-2 placeholder-transparent" name="no_hp" placeholder=" " type="tel" value={form.no_hp} onChange={handleChange} />
                                <label className="absolute left-4 top-4 text-on-surface-variant transition-all pointer-events-none origin-left font-body-md peer-focus:scale-[0.85] peer-focus:-translate-y-2 peer-focus:text-primary peer-[:not(:placeholder-shown)]:scale-[0.85] peer-[:not(:placeholder-shown)]:-translate-y-2">Nomor HP</label>
                            </div>
                            <div className={`form-floating relative rounded-lg border ${fieldErrors.email ? 'border-error' : 'border-outline-variant'} bg-surface focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all`}>
                                <input className="block w-full bg-transparent border-none text-on-surface font-body-md focus:ring-0 rounded-lg peer p-4 pt-6 pb-2 placeholder-transparent" name="email" placeholder=" " type="email" value={form.email} onChange={handleChange} required />
                                <label className="absolute left-4 top-4 text-on-surface-variant transition-all pointer-events-none origin-left font-body-md peer-focus:scale-[0.85] peer-focus:-translate-y-2 peer-focus:text-primary peer-[:not(:placeholder-shown)]:scale-[0.85] peer-[:not(:placeholder-shown)]:-translate-y-2">Email Aktif</label>
                            </div>
                        </div>
                        <div>
                            <div className={`form-floating relative rounded-lg border ${fieldErrors.password ? 'border-error' : 'border-outline-variant'} bg-surface focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all`}>
                                <input className="block w-full bg-transparent border-none text-on-surface font-body-md focus:ring-0 rounded-lg peer p-4 pt-6 pb-2 pr-12 placeholder-transparent" name="password" placeholder=" " type={showPassword ? 'text' : 'password'} value={form.password} onChange={handleChange} required />
                                <label className="absolute left-4 top-4 text-on-surface-variant transition-all pointer-events-none origin-left font-body-md peer-focus:scale-[0.85] peer-focus:-translate-y-2 peer-focus:text-primary peer-[:not(:placeholder-shown)]:scale-[0.85] peer-[:not(:placeholder-shown)]:-translate-y-2">Password</label>
                                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-1/2 -translate-y-1/2 text-outline hover:text-on-surface-variant">
                                    <span className="material-symbols-outlined">{showPassword ? 'visibility' : 'visibility_off'}</span>
                                </button>
                            </div>
                            <div className="mt-sm space-y-xs">
                                <div className="flex gap-xs h-1 w-full rounded-full overflow-hidden">
                                    {[1,2,3,4].map(i => <div key={i} className={`h-full w-1/4 transition-colors ${strength >= i ? strengthColor[strength] : 'bg-outline-variant'}`}></div>)}
                                </div>
                                <span className={`font-label-md text-label-md ${strengthTextColor[strength]}`}>{strength === 0 ? 'Kekuatan password' : strengthLabel[strength]}</span>
                            </div>
                        </div>
                        <div>
                            <div className={`form-floating relative rounded-lg border ${passwordMismatch ? 'border-error bg-error-container/10' : 'border-outline-variant bg-surface'} focus-within:border-primary focus-within:ring-1 focus-within:ring-primary transition-all`}>
                                <input className="block w-full bg-transparent border-none text-on-surface font-body-md focus:ring-0 rounded-lg peer p-4 pt-6 pb-2 pr-12 placeholder-transparent" name="password_confirmation" placeholder=" " type="password" value={form.password_confirmation} onChange={handleChange} required />
                                <label className={`absolute left-4 top-4 transition-all pointer-events-none origin-left font-body-md peer-focus:scale-[0.85] peer-focus:-translate-y-2 peer-[:not(:placeholder-shown)]:scale-[0.85] peer-[:not(:placeholder-shown)]:-translate-y-2 ${passwordMismatch ? 'text-error peer-focus:text-error' : 'text-on-surface-variant peer-focus:text-primary'}`}>Konfirmasi Password</label>
                                {passwordMismatch && <span className="material-symbols-outlined absolute right-3 top-1/2 -translate-y-1/2 text-error">error</span>}
                            </div>
                            {passwordMismatch && <p className="font-label-md text-label-md text-error mt-xs ml-sm">Password tidak cocok.</p>}
                        </div>
                        <div className="flex items-start gap-sm pt-xs pb-sm">
                            <input type="checkbox" id="terms" checked={agreed} onChange={(e) => setAgreed(e.target.checked)} className="w-4 h-4 rounded border-outline-variant text-primary focus:ring-primary mt-0.5" />
                            <label htmlFor="terms" className="font-body-md text-body-md text-on-surface-variant">
                                Saya menyetujui <a href="#" className="text-primary font-semibold hover:underline">Syarat &amp; Ketentuan</a> dan <a href="#" className="text-primary font-semibold hover:underline">Kebijakan Privasi</a> SIAP-MU.
                            </label>
                        </div>
                        <button type="submit" disabled={loading || !agreed || passwordMismatch}
                                className="w-full rounded-lg bg-gradient-to-r from-primary-container to-secondary-fixed-dim text-on-primary font-title-md text-title-md py-md px-lg shadow-sm hover:shadow-md hover:brightness-105 transition-all flex items-center justify-center gap-sm disabled:opacity-50">
                            {loading ? (
                                <>
                                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                                    Memproses...
                                </>
                            ) : (
                                <>
                                    Daftar Sekarang
                                    <span className="material-symbols-outlined text-[20px]">arrow_forward</span>
                                </>
                            )}
                        </button>
                    </form>
                    <p className="mt-xl text-center font-body-md text-body-md text-on-surface-variant">
                        Sudah memiliki akun? <Link to="/login" className="text-primary font-title-md text-title-md hover:underline">Masuk di sini</Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default Register;
