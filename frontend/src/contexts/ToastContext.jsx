import React, { createContext, useContext, useState, useCallback } from 'react';

const ToastContext = createContext(null);

export const useToast = () => {
    const context = useContext(ToastContext);
    if (!context) throw new Error('useToast must be used within ToastProvider');
    return context;
};

export const ToastProvider = ({ children }) => {
    const [toasts, setToasts] = useState([]);

    const addToast = useCallback((message, type = 'info', duration = 4000) => {
        const id = Date.now() + Math.random();
        setToasts(prev => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts(prev => prev.filter(t => t.id !== id));
        }, duration);
    }, []);

    const success = useCallback((msg) => addToast(msg, 'success'), [addToast]);
    const error = useCallback((msg) => addToast(msg, 'error'), [addToast]);
    const info = useCallback((msg) => addToast(msg, 'info'), [addToast]);
    const warning = useCallback((msg) => addToast(msg, 'warning'), [addToast]);

    const iconMap = {
        success: 'check_circle',
        error: 'error',
        warning: 'warning',
        info: 'info',
    };

    const colorMap = {
        success: 'bg-[#27AE60] text-white',
        error: 'bg-error text-on-error',
        warning: 'bg-[#E67E22] text-white',
        info: 'bg-primary text-on-primary',
    };

    return (
        <ToastContext.Provider value={{ success, error, info, warning }}>
            {children}
            {/* Toast container */}
            <div className="fixed bottom-lg right-lg z-[9999] flex flex-col gap-sm max-w-sm">
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        className={`${colorMap[toast.type]} px-lg py-md rounded-lg shadow-lg flex items-center gap-sm animate-slide-in font-body-md text-body-md`}
                        style={{ animation: 'slideIn 0.3s ease-out' }}
                    >
                        <span className="material-symbols-outlined text-[20px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                            {iconMap[toast.type]}
                        </span>
                        <span className="flex-1">{toast.message}</span>
                        <button
                            onClick={() => setToasts(prev => prev.filter(t => t.id !== toast.id))}
                            className="opacity-70 hover:opacity-100 transition-opacity ml-sm"
                        >
                            <span className="material-symbols-outlined text-[18px]">close</span>
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
};

export default ToastContext;
