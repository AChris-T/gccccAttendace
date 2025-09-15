import { Navigate, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/auth.store';
import { useEffect } from 'react';

function ProtectedRoute() {
    const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
    const location = useLocation();
    const navigate = useNavigate()
    const url = `/login?redirect=${encodeURIComponent(location.pathname + location.search)}`

    const handleUnauthorized = () => {
        navigate(url, { replace: true })
    }

    useEffect(() => {
        window.addEventListener('unauthorized', handleUnauthorized);
        return () => window.removeEventListener('unauthorized', handleUnauthorized);
    })

    if (!isAuthenticated) return <Navigate to={url} replace />

    return <Outlet />;
}

export default ProtectedRoute;