import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, roles }) => {
    const { isAuthenticated, user, loading } = useAuth();
    const location = useLocation();

    if (loading) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-surface">
                <div className="flex flex-col items-center gap-md">
                    <div className="w-12 h-12 border-4 border-primary-container border-t-primary rounded-full animate-spin"></div>
                    <p className="font-body-md text-body-md text-on-surface-variant">Memuat...</p>
                </div>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    if (roles && !roles.includes(user?.role)) {
        return <Navigate to="/" replace />;
    }

    return children;
};

export default ProtectedRoute;
